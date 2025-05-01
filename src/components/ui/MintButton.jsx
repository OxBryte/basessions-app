

// eslint-disable-next-line react/prop-types
export default function MintButton({ onMint }) {
  return (
    <>
      <button
        className="px-6 py-2.5 bg-[#0052FE] hover:opacity-80 rounded-full text-xs"
        onClick={onMint}
      >
        Mint
      </button>
    </>
  );
}
