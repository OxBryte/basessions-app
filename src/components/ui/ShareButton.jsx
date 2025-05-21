/* eslint-disable react/prop-types */
import toast from "react-hot-toast";
import { RiShareCircleLine } from "react-icons/ri";

export default function ShareButton({ singleMedia }) {
  const shareUrl = `${window.location.origin}/session/${singleMedia?.id}`;

  const onShare = async (e) => {
    e.preventDefault();
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Check out this session",
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  return (
    <>
      <div className="" onClick={onShare}>
        <RiShareCircleLine size={21} className="text-white/60" />
      </div>
    </>
  );
}
