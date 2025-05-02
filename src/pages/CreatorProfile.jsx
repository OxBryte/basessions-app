import { useCreatorProfile, useUser } from "../components/hooks/useUser";
import { useNavigate, useParams } from "react-router-dom";
import CreatorProfileDetails from "../components/features/creatorProfile/CreatorProfileDetails";
import CreatorProfileSection from "../components/features/creatorProfile/CreatorProfileSection";
import { useEffect } from "react";

export default function CreatorProfile() {
  const { id } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();
  const userId = user?.data?.id;

  const { creatorProfile, isLoading } = useCreatorProfile(id);

  useEffect(() => {
    if (id === userId) {
      navigate("/profile");
    }
  });

  if (isLoading) {
    return (
      <div className="w-full h-[90dvh] flex items-center justify-center">
        <img src="/session_logo.png" alt="" className="animate-pulse w-16" />
      </div>
    );
  }

  return (
    <div>
      <div className="py-4">
        <CreatorProfileDetails creator={creatorProfile?.data} />
        <CreatorProfileSection userId={id} />
      </div>
    </div>
  );
}
