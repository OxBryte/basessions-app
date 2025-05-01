import { HiOutlineCurrencyDollar } from "react-icons/hi";

// eslint-disable-next-line react/prop-types
export default function TipButton({ onTip }) {
  return (
    <>
      <button
        className="border border-white/80 text-white/80 hover:bg-white/10 px-4 py-1.5 gap-2 text-sm rounded-full flex items-center"
        onClick={onTip}
      >
        <HiOutlineCurrencyDollar size={20} />
        Tip
      </button>
    </>
  );
}
