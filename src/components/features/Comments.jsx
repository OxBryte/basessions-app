/* eslint-disable react/prop-types */
import { useState } from "react";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import { PiPaperPlaneTiltFill } from "react-icons/pi";
import { TbMessage } from "react-icons/tb";
import { useComment, useGetRepliedComment } from "../hooks/useComment";
import moment from "moment";
import Spinner from "../ui/Spinner";
import { useUser } from "../hooks/useUser";

// Single Comment Component (can be recursive)
const CommentItem = ({
  comment,
  mediaId,
  level = 0,
  onReplySubmit,
  refetch,
}) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const { user } = useUser();
  const { commentFn, isPending: isCommentPending } = useComment();

  const { repliedComment } = useGetRepliedComment(
    mediaId,
    comment.id
  );

  const commentLength = repliedComment?.comment?.length;

  const hasReplies = commentLength > 0;

  // Calculate indentation - limit max indent level for smaller screens
  const indentStyle =
    level > 0 ? { marginLeft: `${Math.min(level * 16, 48)}px` } : {};

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyText) return;

    try {
      await commentFn({
        comment: replyText,
        mediaId: mediaId,
        parent_id: comment.id, // Send parent comment ID for nesting
      });
      refetch();
      setReplyText("");
      setIsReplying(false);
      setShowReplies(true); // Show replies after adding a new one
    } catch (error) {
      console.error("Failed to submit reply:", error);
    }
  };

  return (
    <div className="space-y-3 mb-4" style={indentStyle}>
      <div className="w-full flex gap-5 items-start justify-between">
        <div className="flex gap-3 items-top flex-1">
          <div
            className="min-w-10 h-10 bg-white/30 rounded-full"
            style={{
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url(${comment?.user?.avatar_url})`,
            }}
          ></div>
          <div className="space-y-3 flex-1">
            <div className="flex gap-2 items-center w-full">
              <h1 className="text-xs">{comment?.user?.display_name} </h1>
              <span className="text-[10px] text-white/60">
                {moment(comment?.created_at).startOf("min").fromNow()}
              </span>
            </div>
            <p className="text-sm text-white/70 max-w-[420px]">
              {comment?.comment}
            </p>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setIsReplying(!isReplying)}
            >
              <TbMessage size={20} className="text-white/40" />
              <span className="text-xs">{isReplying ? "Cancel" : "Reply"}</span>
            </div>
          </div>
        </div>

        {hasReplies && (
          <div
            className="flex items-center gap-2 text-white cursor-pointer"
            onClick={() => setShowReplies(!showReplies)}
          >
            {showReplies ? <BiCaretUp size={23} /> : <BiCaretDown size={23} />}
            <span className="text-xs">
              {showReplies
                ? "Hide replies"
                : `See ${commentLength} repl${commentLength > 1 ? "ies" : "y"}`}
            </span>
          </div>
        )}
      </div>

      {/* Reply input area */}
      {isReplying && (
        <div className="ml-12">
          <form
            onSubmit={handleReplySubmit}
            className="flex w-full items-top gap-2"
          >
            <div
              className="min-w-8 h-8 bg-white/30 rounded-full"
              style={{
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${user?.data?.avatar_url})`,
              }}
            ></div>
            <textarea
              type="text"
              placeholder="Add a reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full bg-[#FFFFFF08] px-4 py-2.5 text-xs focused:outliine-none rounded-lg"
            />
            <button
              type="submit"
              className="px-3 py-2 h-fit rounded-lg bg-[#0052FE] hover:bg-[#0040CC] text-sm"
              disabled={isCommentPending || !replyText.trim()}
            >
              {isCommentPending ? (
                <Spinner />
              ) : (
                <PiPaperPlaneTiltFill size={16} />
              )}
            </button>
          </form>
        </div>
      )}

      {/* Nested replies - recursive rendering */}
      {showReplies && hasReplies && (
        <div className="mt-2">
          {repliedComment.comment.map((reply, index) => (
            <CommentItem
              key={`${reply.id}-${index}`}
              comment={reply}
              mediaId={mediaId}
              level={level + 1}
              onReplySubmit={onReplySubmit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Comments({ id, singleMedia, refetch }) {
  const [comment, setComment] = useState("");
  const { commentFn, isPending: isCommentPending } = useComment();
  const { user } = useUser();

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment) return;

    try {
      await commentFn({ comment: comment, mediaId: id });
      setComment("");
      refetch();
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  // Count total comments including all nested replies
  const getTotalCommentCount = (comments) => {
    if (!comments) return 0;

    return comments.reduce((total, comment) => {
      // Count this comment
      let count = 1;
      // Add counts of all children recursively
      if (comment.children && comment.children.length > 0) {
        count += getTotalCommentCount(comment.children);
      }
      return total + count;
    }, 0);
  };

  const totalComments = getTotalCommentCount(singleMedia?.comments);

  return (
    <div className="w-full py-5 space-y-5 relative">
      <p className="text-sm">Comments ({totalComments || 0})</p>

      {/* Comments List */}
      {singleMedia?.comments?.map((comment, index) => (
        <CommentItem
          key={`${comment.id}-${index}`}
          comment={comment}
          mediaId={id}
          refetch={refetch}
        />
      ))}

      {/* Add new top-level comment */}
      <div className="sticky bottom-0 w-full bg-[#131313] pt-4">
        <form
          onSubmit={handleCommentSubmit}
          className="flex w-full items-top gap-2"
        >
          <div
            className="min-w-10 h-10 bg-white/30 rounded-full"
            style={{
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url(${user?.data?.avatar_url})`,
            }}
          ></div>
          <textarea
            type="text"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full bg-[#FFFFFF08] px-4 py-2.5 text-xs focused:outliine-none rounded-lg"
          />
          <button
            type="submit"
            className="px-3 py-2 h-fit rounded-lg bg-[#0052FE] hover:bg-[#0040CC] text-sm"
            disabled={isCommentPending || !comment.trim()}
          >
            {isCommentPending ? (
              <Spinner />
            ) : (
              <PiPaperPlaneTiltFill size={16} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
