import { IoChevronBack } from "react-icons/io5";
import { goBack } from "../components/libs/utils";
import { useVerify } from "../components/features/auth/queries/useVerify";
import { useState } from "react";
import Spinner from "../components/ui/Spinner";

export default function VerifyEmail() {
  const userEmail = localStorage.getItem("userEmail");
  const token = localStorage.getItem("token");

  const { verifyFn, isPending } = useVerify();

  // State to hold each input of the OTP
  const [otp, setOtp] = useState(new Array(4).fill(""));

  // Handle OTP change
  const handleOtpChange = (element, index) => {
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Auto-focus to next input
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  // Handle OTP submit
  const handleVerify = () => {
    const otpInput = otp.join("");
    if (otpInput === token) {
      verifyFn({ email: userEmail, otp: otpInput });
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="w-full max-w-[620px] mx-auto px-4 my-10">
      <div className="w-full h-screen flex flex-col items-center gap-8">
        <div className="flex w-full items-center gap-4">
          <div onClick={goBack} className="cursor-pointer">
            <IoChevronBack size={24} />
          </div>
          <p className="font-semibold">Verify Email</p>
        </div>
        <div className="flex flex-col gap-4 items-center w-full py-6">
          <p className="text-center">
            Enter the 4-digit code sent to your email address{" "}
            <span className="text-[#0052FE]">{userEmail}</span>
          </p>
          <div className="flex justify-center space-x-2">
            {otp.map((data, index) => (
              <input
                key={index}
                className="w-12 h-12 text-center form-control !bg-white/10 text-black rounded-lg text-white"
                maxLength="1"
                value={data}
                onChange={(e) => handleOtpChange(e.target, index)}
                autoFocus={!index} // Auto-focus the first input
              />
            ))}
          </div>
          <button
            className="bg-[#0052FE] px-8 py-3 w-[60%] rounded-full"
            onClick={handleVerify}
          >
            {isPending ? <Spinner /> : "Verify"}
          </button>
        </div>
      </div>
    </div>
  );
}
