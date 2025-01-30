import { useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";

export default function AuthLogin() {
  return (
    <div className="w-full h-screen space-y-4">
      <div
        className="h-[55vh] w-full bg-fill bg-no-repeat bg-top relative"
        style={{ backgroundImage: "url(/bg-login.png)" }}
      >
        <div className="before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:to-black"></div>
      </div>
      <div className="space-y-8 w-full max-w-lg mx-auto mt-4 px-6">
        <div className="flex flex-col gap-4 items-left">
          <div>
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter email address"
              className="w-full bg-white/10 py-4 px-6 rounded-lg placeholder:text-white/50"
            />
          </div>
          <div>
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter password"
              className="w-full bg-white/10 py-4 px-6 rounded-lg placeholder:text-white/50"
            />
          </div>
          <div className="text-sm text-white/40 hover:text-white cursor-pointer w-full">
            <p>Forgotten password?</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <button className="bg-[#0052FE] hover:bg-[#0052FE]/80 w-full rounded-2xl px-6 py-4">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export function SelectAccount() {
  const [selectedAccount, setSelectedAccount] = useState(null);

  const handleAccountSelect = (accountType) => {
    setSelectedAccount(accountType);
  };
  return (
    <div className="w-full max-w-[860px] mx-auto px-4 my-10">
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
