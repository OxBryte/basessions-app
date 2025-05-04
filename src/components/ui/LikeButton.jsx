/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { useLike } from "../hooks/useLike";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";

export default function LikeButton({ media, onLiked }) {
  const { user } = useUser();
  const userId = user?.data?.id;
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const { likeFn, isPending } = useLike();

  // Sync local state whenever the media prop changes
  useEffect(() => {
    setLiked(
      userId ? media?.liked_by?.some((l) => l || l?.id === userId) ?? false : false
    );
    setCount(media?.liked_by?.length || 0);
  }, [media?.liked_by, userId]);

  const handleLike = () => {
    const next = !liked;
    // optimistic UI
    setLiked(next);
    setCount((c) => c + (next ? 1 : -1));

    likeFn(
      { mediaId: media.id, status: next },
      {
        onError: () => {
          // rollback if API fails
          setLiked(!next);
          setCount((c) => c + (next ? -1 : 1));
        },
        onSuccess: () => {
          // let parent know, so it can refetch if needed
          onLiked?.();
        },
      }
    );
  };

  return (
    <div className="flex gap-2 items-center text-white/60">
      <button
        onClick={handleLike}
        disabled={isPending}
        className={`${liked && "text-red-500"}`}
      >
        {liked ? <HiHeart size={21} /> : <HiOutlineHeart size={21} />}
      </button>
      <span className="text-sm text-white/90">{count}</span>
    </div>
  );
}
