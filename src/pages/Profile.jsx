import ProfileDetails from "../components/features/profile/ProfileDetails";
import ProfileNav from "../components/features/profile/ProfileNav";

export default function Profile() {
  return (
    <div>
      <ProfileNav />
      <div className="w-full max-w-[780px] mx-auto px-4 py-4">
        <ProfileDetails />
      </div>
    </div>
  );
}
