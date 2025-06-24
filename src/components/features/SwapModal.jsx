import Web3 from "web3";
import {
  Token,
  CurrencyAmount,
  TradeType,
  Percent,

} from "@uniswap/sdk-core";
import {
  Pool,
  Route,
  Trade,
  SwapRouter,
  computePoolAddress,
} from "@uniswap/v3-sdk";
import JSBI from "jsbi";
import IUniswapV3PoolABI from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import { useUser } from "../hooks/useUser";
import { useState } from "react";

export default function SwapModal() {
  const [amount, setAmount] = useState("");
  const [direction, setDirection] = useState("ethToUsdc");
  const [status, setStatus] = useState("");

  const { user } = useUser();
  const privateKey = user?.data?.wallet_private_key;
  const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
  const WETH_ADDRESS = "0x4200000000000000000000000000000000000006";
  const UNISWAP_FACTORY = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
  const CHAIN_ID = 8453; // Base Mainnet
  const RPC_URL =
    "https://base-mainnet.g.alchemy.com/v2/pQJNhlm06A_AjUgN-rUwzFyt0p8HhSxs";

  const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));

  const USDC = new Token(CHAIN_ID, USDC_ADDRESS, 6, "USDC", "USD Coin");
  const WETH = new Token(CHAIN_ID, WETH_ADDRESS, 18, "WETH", "Wrapped Ether");


  const account = web3.eth.accounts.privateKeyToAccount(`${privateKey}`);
  web3.eth.accounts.wallet.add(account);
  web3.eth.defaultAccount = account.address;

  const getPoolState = async (poolAddress) => {
    const contract = new web3.eth.Contract(IUniswapV3PoolABI.abi, poolAddress);
    const [slot0, liquidity, token0, token1, fee] = await Promise.all([
      contract.methods.slot0().call(),
      contract.methods.liquidity().call(),
      contract.methods.token0().call(),
      contract.methods.token1().call(),
      contract.methods.fee().call(),
    ]);
    return {
      sqrtPriceX96: JSBI.BigInt(slot0.sqrtPriceX96),
      liquidity: JSBI.BigInt(liquidity),
      tick: parseInt(slot0.tick),
      token0,
      token1,
      fee: parseInt(fee),
    };
  };

  const getPoolAddress = () => {
    const fee = 500; // 0.05%
    return computePoolAddress({
      factoryAddress: UNISWAP_FACTORY,
      tokenA: USDC,
      tokenB: WETH,
      fee,
    });
  };

  const swap = async () => {
    try {
      setStatus("Fetching pool...");
      const poolAddress = getPoolAddress();
      const state = await getPoolState(poolAddress);
      const pool = new Pool(
        WETH,
        USDC,
        state.fee,
        state.sqrtPriceX96,
        state.liquidity,
        state.tick
      );

      const [inputToken, outputToken] =
        direction === "ethToUsdc" ? ['ETH', USDC] : [USDC, 'ETH'];
    
      const rawAmount =
        direction === "ethToUsdc"
          ? web3.utils.toWei(amount)
          : (parseFloat(amount) * 1e6).toString();

      const amountIn = CurrencyAmount.fromRawAmount(
        inputToken,
        JSBI.BigInt(rawAmount)
      );
      const route = new Route([pool], inputToken, outputToken);
      const trade = await Trade.fromRoute(
        route,
        amountIn,
        TradeType.EXACT_INPUT
      );

      const swapParams = SwapRouter.swapCallParameters([trade], {
        slippageTolerance: new Percent(50, 10000),
        recipient: account.address,
        deadline: Math.floor(Date.now() / 1000) + 600,
      });

      const tx = {
        from: account.address,
        to: SwapRouter.ADDRESS,
        data: swapParams.calldata,
        value: swapParams.value,
        gas: 500000,
      };

      setStatus("Sending transaction...");
      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
      const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );
      setStatus(`Swap successful: ${receipt.transactionHash}`);
    } catch (err) {
      console.error(err);
      setStatus("Swap failed: " + err.message);
    }
  };

  return (
    <div>
      <div className="p-4 max-w-md mx-auto bg-black shadow rounded">
        <h2 className="text-xl font-bold mb-2">Swap ETH ⇄ USDC</h2>
        <input
          className="border p-2 w-full mb-2 bg-white/20"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          className="border p-2 w-full mb-2 bg-white/20"
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
        >
          <option value="ethToUsdc">ETH → USDC</option>
          <option value="usdcToEth">USDC → ETH</option>
        </select>
        <button
          className="bg-blue-600 text-white p-2 w-full rounded"
          onClick={swap}
        >
          Swap
        </button>
        <p className="mt-2 text-sm text-gray-600">{status}</p>
      </div>
    </div>
  );
}
