import { useState, useEffect, useMemo, useCallback } from "react";
import Web3 from "web3";
import { USDC_ABI } from "../../contract/USDCAbi";
import { useUser } from "./useUser";

export function useWallet() {
  const [balances, setBalances] = useState({ eth: "0", usdc: "0" });
  const [ethPrice, setEthPrice] = useState(0); // USD per ETH
  const [ethUsdValue, setEthUsdValue] = useState("0.00");
  const [isLoading, setIsLoading] = useState(true);

    const { user } = useUser();
    const address = user?.data?.wallet_address;
    const privateKey = user?.data?.wallet_private_key;

  const rpcUrl = import.meta.env.VITE_RPC_URL;
  const usdcAddress = import.meta.env.VITE_PUBLIC_USDC_ADDRESS;

  const web3 = useMemo(
    () => new Web3(new Web3.providers.HttpProvider(rpcUrl)),
    [rpcUrl]
  );
  const account = useMemo(
    () =>
      privateKey ? web3.eth.accounts.privateKeyToAccount(privateKey) : null,
    [web3, privateKey]
  );
  const usdcContract = useMemo(
    () => new web3.eth.Contract(USDC_ABI, usdcAddress),
    [web3, usdcAddress]
  );

  const fetchBalances = useCallback(async () => {
    if (!address) {
      console.warn("[useWallet] no address provided skipping balance fetch");
      return;
    }
    setIsLoading(true);
    try {
      const rawEth = await web3.eth.getBalance(address);
      const eth = web3.utils.fromWei(rawEth, "ether");

      let usdc = "0";
      try {
       const rawUsdc = await usdcContract.methods.balanceOf(address).call();
        const usdcBalance = web3.utils.fromWei(rawUsdc, "mwei"); 
        usdc = usdcBalance || "0";
      } catch (usdcErr) {
        console.error("[useWallet] USDC fetch error:", usdcErr);
      }

      setBalances({ eth, usdc });
      // console.log("[useWallet] Balances set →", { eth, usdc });
      setIsLoading(false);
    } catch (err) {
      console.error("[useWallet] error fetching ETH balance:", err);
      setIsLoading(false);
    }
  }, [web3, address, usdcContract, rpcUrl]);

  const fetchEthPrice = useCallback(async () => {
    try {
      const resp = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      );
      const data = await resp.json();
      const price = data.ethereum?.usd;
      if (typeof price === "number") setEthPrice(price);
    } catch (err) {
      console.error("[useWallet] price fetch error:", err);
    }
  }, []);

  // 3) Recompute USD value whenever balance or price changes
  useEffect(() => {
    const ethNum = Number(balances.eth);
    if (!isNaN(ethNum) && ethPrice > 0) {
      setEthUsdValue((ethNum * ethPrice).toFixed(2));
    }
  }, [balances.eth, ethPrice]);

  useEffect(() => {
    fetchBalances();
    fetchEthPrice();
  }, [fetchBalances, fetchEthPrice]);

  const withdrawETH = useCallback(
    async (to, amountEth) => {
      if (!account) throw new Error("Wallet not initialized");
      const value = web3.utils.toWei(amountEth, "ether");
      const tx = { from: account.address, to, value, gas: 21000 };
      const signed = await account.signTransaction(tx);
      return web3.eth.sendSignedTransaction(signed.rawTransaction);
    },
    [account, web3]
  );

  const withdrawUSDC = useCallback(
    async (to, amountUsdc) => {
      if (!account) throw new Error("Wallet not initialized");
      const decimals = await usdcContract.methods.decimals().call();
      const units = BigInt(
        Math.round(parseFloat(amountUsdc) * 10 ** decimals)
      ).toString();
      const data = usdcContract.methods.transfer(to, units).encodeABI();
      const tx = { from: account.address, to: usdcAddress, data, gas: 100000 };
      const signed = await account.signTransaction(tx);
      return web3.eth.sendSignedTransaction(signed.rawTransaction);
    },
    [account, usdcContract, usdcAddress, web3]
  );

  return {
    balances,
    ethPrice, // e.g. 3,128.54
    ethUsdValue, // e.g. "19.02"
    isLoading,
    refreshBalances: fetchBalances,
    refreshPrice: fetchEthPrice,
    withdrawETH,
    withdrawUSDC,
  };
}
