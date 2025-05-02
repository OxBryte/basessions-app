import { useFollowCreator } from "../hooks/useFollowCreator";
import { useUser } from "../hooks/useUser";
import Spinner from "./Spinner";

// eslint-disable-next-line react/prop-types
export default function FollowButton({ creatorId }) {
  const { user } = useUser();
  // console.log("FollowButton user", user);

  const alreadyFollowing = Boolean(
    user?.data?.following?.some((f) => f.following?.id === creatorId)
  );

  const { isFollowing, followFn } = useFollowCreator();

  const handleFollow = () => {
    followFn(creatorId);
  };

  return (
    <>
      <button
        className="bg-white hover:opacity-80 text-black text-sm px-6 py-2 gap-2 rounded-lg flex items-center"
        disabled={isFollowing || alreadyFollowing}
        onClick={handleFollow}
      >
        {isFollowing ? <Spinner /> : alreadyFollowing ? "Following" : "Follow"}
      </button>
    </>
  );
}
