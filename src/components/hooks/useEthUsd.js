import { useEffect, useState } from "react";
import { fetchEthUsdRate } from "../libs/utils";

export function useEthUsdRate(refreshIntervalMs = null) {
  const [rate, setRate] = useState(null);

  useEffect(() => {
    let intervalId;

    async function loadRate() {
      const r = await fetchEthUsdRate();
      setRate(r);
    }

    loadRate();

    if (refreshIntervalMs) {
      intervalId = setInterval(loadRate, refreshIntervalMs);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [refreshIntervalMs]);

  return rate;
}

/**
 * Hook that returns the USDC equivalent for a given ETH amount.
 * Recalculates whenever `ethAmount` or the rate changes.
 */
export function useEthToUsdc(ethAmount) {
    const rate = useEthUsdRate();
    const [usdcValue, setUsdcValue] = useState(0);

    useEffect(() => {
        if (rate === null) return;
        setUsdcValue(ethAmount * rate);
    }, [ethAmount, rate]);

    return usdcValue;
}