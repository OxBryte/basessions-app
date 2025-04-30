import { useCreatorProfile } from "../components/hooks/useUser";
import { useParams } from "react-router-dom";
import CreatorProfileDetails from "../components/features/creatorProfile/CreatorProfileDetails";
import CreatorProfileSection from "../components/features/creatorProfile/CreatorProfileSection";

export default function CreatorProfile() {
  const { id } = useParams();
  const { creatorProfile, isLoading } = useCreatorProfile(id);

  if (isLoading) {
    return (
      <div className="w-full h-[90dvh] flex items-center justify-center">
        <img src="/session_logo.svg" alt="" className="animate-pulse" />
      </div>
    );
  }

  return (
    <div>
      <div className="w-full max-w-[620px] mx-auto px-4 py-4">
        <CreatorProfileDetails creator={creatorProfile?.data} />
        <CreatorProfileSection userId={id} />
      </div>
    </div>
  );
}
