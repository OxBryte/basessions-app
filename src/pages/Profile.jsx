import ProfileDetails from "../components/features/profile/ProfileDetails";
import { useUser } from "../components/hooks/useUser";
import CreatorSection from "../components/features/profile/CreatorSection";
import FanSection from "../components/features/profile/FanSection";

export default function Profile() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    <div className="w-full h-[60dvh] flex items-center justify-center">
      <img src="session_logo.png" alt="" className="animate-pulse w-16" />
    </div>;
  }

  return (
    <div>
      <div className="py-4">
        <ProfileDetails />
        {user && user?.data?.type === "creator" && <CreatorSection />}
        {user && user?.data?.type === "fan" && <FanSection />}
      </div>
    </div>
  );
}
