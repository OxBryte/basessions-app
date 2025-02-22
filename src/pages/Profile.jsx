import ProfileDetails from "../components/features/profile/ProfileDetails";
import ProfileNav from "../components/features/profile/ProfileNav";
import { useUser } from "../components/hooks/useUser";
import CreatorSection from "../components/features/profile/CreatorSection";
import FanSection from "../components/features/profile/FanSection";

export default function Profile() {
  const { user } = useUser();
  // console.log(user);

  return (
    <div>
      <ProfileNav />
      <div className="w-full max-w-[620px] mx-auto px-4 py-4">
        <ProfileDetails />
        {user && user?.data?.type === "creator" && <CreatorSection />}
        {user && user?.data?.type === "fan" && <FanSection />}
      </div>
    </div>
  );
}
