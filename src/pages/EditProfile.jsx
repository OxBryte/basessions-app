import { BiEditAlt } from "react-icons/bi";
import { IoChevronBack } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useUpdateProfile } from "../components/features/auth/queries/useUpdateProfile";
import { goBack } from "../components/libs/utils";
import { useState } from "react";
import Spinner from "../components/ui/Spinner";

export default function EditProfile() {
  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm();
  const { updateProfileFn, isPending } = useUpdateProfile();
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    updateProfileFn({ ...data, avatar: imageFile || "" });
  };

  return (
    <div className="w-full max-w-[620px] mx-auto px-4">
      <div className="space-y-4">
        <div className="flex items-center gap-5 py-3">
          <div onClick={goBack} className="cursor-pointer">
            <IoChevronBack size={24} />
          </div>
          <p>Edit Profile</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 items-center"
        >
          <div className="relative">
            <div
              className="w-24 h-24 bg-gray-300 rounded-full cursor-pointer"
              onClick={() => document.getElementById("imageUpload").click()}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <div className="absolute bottom-0 right-0 bg-[#131313] border border-2 border-[#131313] rounded-full p-1 cursor-pointer">
              <BiEditAlt />
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="displayName" className="font-light">
              Display Name*
            </label>
            <input
              type="text"
              placeholder="Enter display name"
              className="bg-[#FFFFFF08] px-4 py-2.5 rounded-lg"
              {...register("display_name")}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="userName" className="font-light">
              Username*
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="bg-[#FFFFFF08] px-4 py-2.5 rounded-lg"
              {...register("username")}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="Bio" className="font-light">
              Bio*
            </label>
            <textarea
              rows={6}
              placeholder="Write a short bio under 40 words"
              className="bg-[#FFFFFF08] px-4 py-2.5 rounded-lg"
              {...register("bio")}
            />
            <span className="self-end text-xs font-light">0/40</span>
          </div>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="twitter" className="font-light">
              Twitter (X)
            </label>
            <input
              type="text"
              placeholder="Enter X username"
              className="bg-[#FFFFFF08] px-4 py-2.5 rounded-lg"
              {...register("twitter_id")}
            />
          </div>
          <button
            // onClick={handleSubmit(onSubmit)}
            type="submit"
            className="bg-[#0052FE] px-4 py-3 w-full rounded-full"
          >
            {isPending ? <Spinner /> : "Complete Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
