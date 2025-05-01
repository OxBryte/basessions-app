import { HiOutlineCurrencyDollar } from "react-icons/hi";

// eslint-disable-next-line react/prop-types
export default function TipButton({ onTip }) {
  return (
    <>
      <button
        className="bg-[#FFFFFF0D] text-white/80 hover:bg-white/10 px-5 py-2.5 gap-2 text-sm rounded-full flex items-center"
        onClick={onTip}
      >
        <HiOutlineCurrencyDollar size={20} />
        Tip
      </button>
    </>
  );
}
