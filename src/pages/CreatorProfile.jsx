import { useCreatorProfile } from "../components/hooks/useUser";
import { useParams } from "react-router-dom";
import { goBack } from "../components/libs/utils";
import { BiChevronLeft } from "react-icons/bi";
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
      <div className="bg-[#2C2C2C]">
        <div className="max-w-[620px] mx-auto flex gap-4 justify-between items-center w-full p-4 min-h-[80px] bg-[#2C2C2C] ">
          <div onClick={goBack} className="cursor-pointer">
            <BiChevronLeft size={28} />
          </div>
        </div>
      </div>
      <div className="w-full max-w-[620px] mx-auto px-4 py-4">
        <CreatorProfileDetails creator={creatorProfile?.data} />
        <CreatorProfileSection userId={id} />
      </div>
    </div>
  );
}
