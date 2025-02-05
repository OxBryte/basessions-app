import { useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";

export default function SelectAccount() {
  const [selectedAccount, setSelectedAccount] = useState(null);

  const handleAccountSelect = (accountType) => {
    setSelectedAccount(accountType);
  };
  return (
    <div className="w-full max-w-[780px] mx-auto px-4 my-10">
      <div className="w-full h-screen flex flex-col items-center gap-8">
        <p className="font-semibold">Account Type</p>

        <div className="flex flex-col gap-4 items-center w-full">
          <div
            className={`flex gap-3 items-center w-full px-4 py-3 ${
              selectedAccount === "creator"
                ? "bg-gradient-to-r from-[rgba(0,82,254,1)] to-[rgba(255,255,255,0.5)]"
                : "bg-white/10"
            } rounded-lg`}
            onClick={() => handleAccountSelect("creator")}
          >
            <img src="icon_1.svg" alt="" className="w-8" />
            <p>I&apos;m a Creator</p>
            {selectedAccount === "creator" && (
              <div className="ml-auto">
                <BsFillCheckCircleFill size={20} />
              </div>
            )}
          </div>
          <div
            className={`flex gap-3 items-center w-full px-4 py-3 ${
              selectedAccount === "fan"
                ? "bg-gradient-to-r from-[rgba(0,82,254,1)] to-[rgba(255,255,255,0.5)]"
                : "bg-white/10"
            } rounded-lg`}
            onClick={() => handleAccountSelect("fan")}
          >
            <img src="icon_2.svg" alt="" className="w-8" />
            <p>I&apos;m a Fan</p>
            {selectedAccount === "fan" && (
              <div className="ml-auto">
                <BsFillCheckCircleFill size={20} />
              </div>
            )}
          </div>
        </div>
        <button className="mt-5 bg-[#0052FE] hover:bg-[#0052FE]/80 w-full rounded-2xl px-6 py-4">
          Continue
        </button>
      </div>
    </div>
  );
}
