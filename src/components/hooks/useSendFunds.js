// useWithdraw.js
import { useState, useCallback, useEffect } from "react";
import { web3 } from "../../Provider";
import { useUser } from "./useUser";

export function useWithdraw() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [txHash, setTxHash] = useState(null);

  const { user } = useUser();
  const fromAddress = user?.data?.wallet_address;
  const privateKey = user?.data?.wallet_private_key;

  // Add the account to web3 wallet so signTransaction works
  useEffect(() => {
    if (privateKey) {
      const account = web3.eth.accounts.privateKeyToAccount(privateKey);
      web3.eth.accounts.wallet.add(account);
    }
  }, [web3, privateKey]);

  const withdraw = useCallback(
    async (to, amountEth) => {
      setLoading(true);
      setError(null);
      setTxHash(null);

      try {
        // Convert to wei
        const value = web3.utils.toWei(amountEth, "ether");

        // Get nonce
        const nonce = await web3.eth.getTransactionCount(
          fromAddress,
          "pending"
        );

        // Optionally estimate gas (21000 is typical for plain ETH transfer)
        let gasLimit;
        try {
          gasLimit = await web3.eth.estimateGas({
            from: fromAddress,
            to,
            value,
          });
        } catch {
          gasLimit = 21000;
        }

        // Get current gas price
        const gasPrice = await web3.eth.getGasPrice();

        // Build transaction object
        const txParams = {
          from: fromAddress,
          to,
          value,
          nonce,
          gas: web3.utils.toHex(gasLimit),
          gasPrice: web3.utils.toHex(gasPrice),
        };

        // Sign it
        const { rawTransaction } = await web3.eth.accounts.signTransaction(
          txParams,
          privateKey
        );

        // Send signed transaction
        return new Promise((resolve, reject) => {
          web3.eth
            .sendSignedTransaction(rawTransaction)
            .once("transactionHash", (hash) => {
              setTxHash(hash);
            })
            .once("receipt", (receipt) => {
              setLoading(false);
              resolve(receipt);
            })
            .once("error", (err) => {
              setError(err.message || "Transaction failed");
              setLoading(false);
              reject(err);
            });
        });
      } catch (err) {
        setError(err.message || "Unknown error");
        setLoading(false);
        return Promise.reject(err);
      }
    },
    [web3, fromAddress, privateKey]
  );

  return { withdraw, loading, error, txHash };
}
