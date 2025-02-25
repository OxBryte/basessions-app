import { useState } from "react";
import { BiCaretDown } from "react-icons/bi";
import { PiPaperPlaneTiltFill } from "react-icons/pi";
import { TbMessage } from "react-icons/tb";
import { useComment } from "../hooks/useComment";
import moment from "moment";
import Spinner from "../ui/Spinner";

// eslint-disable-next-line react/prop-types
export default function Comments({ id, singleMedia }) {
  const { commentFn, isPending: isCommentPending } = useComment(); // Use the comment function and loading state
  const [comment, setComment] = useState(""); // State for the comment input


  const handleCommentSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!comment) return; // Do not submit if comment is empty
    console.log(comment, id);

    try {
      await commentFn({ comment: comment, mediaId: id }); // Call the comment function
      setComment(""); // Clear the comment input after submission
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  return (
    <div className="w-full py-5 space-y-6 relative">
      <p className="text-xl">Comments</p>
      {/* Comment */}
      {singleMedia?.comments?.map((comment, index) => (
        <div key={index} className="w-full flex gap-5 items-top">
          <div className="w-12 h-12 bg-white/30 rounded-full"></div>
          <div className="space-y-3">
            <h1>
              Brack Ibam{" "}
              <span className="text-xs text-white/30">
                {moment(comment?.created_at).startOf("min").fromNow()}
              </span>
            </h1>
            <p className="text-sm text-white/70 max-w-[420px]">
              {comment?.comment}
            </p>
            <div className="flex items-center gap-2">
              <TbMessage size={23} className="text-white/40" />
              <span className="text-sm"> Reply</span>
            </div>

            <div className="flex items-center gap-2 text-[#0052FE]">
              <BiCaretDown size={23} />
              <span className="text-sm">
                See {comment?.children?.length} replies
              </span>
            </div>
          </div>
        </div>
      ))}

      <div className="sticky bottom-0 w-full bg-[#131313] py-2 border-t border-t-white/10">
        <form
          onSubmit={handleCommentSubmit}
          className="flex w-full items-center gap-2"
        >
          <input
            type="text"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)} // Update comment state on input change
            className="w-full bg-[#FFFFFF08] px-4 py-2.5 rounded-lg"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-lg bg-[#0052FE] hover:bg-white/40 text-sm"
            disabled={isCommentPending} // Disable button while pending
          >
            {isCommentPending ? (
              <Spinner />
            ) : (
              <PiPaperPlaneTiltFill size={20} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
