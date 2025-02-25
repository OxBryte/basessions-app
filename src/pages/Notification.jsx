import { IoChevronBack } from "react-icons/io5";
import { goBack } from "../components/libs/utils";
import { useState } from "react";

export default function Notifications() {
  const [uploads, setUploads] = useState(false);
  const [likes, setLikes] = useState(false);
  const [replies, setReplies] = useState(false);

  return (
    <>
      <div className="w-full max-w-[620px] mx-auto px-4 my-10">
        <div className="space-y-4">
          <div className="flex items-center gap-5">
            <div onClick={goBack} className="cursor-pointer">
              <IoChevronBack size={24} />
            </div>
            <p>Notification Settings</p>
          </div>
          <div className="w-full space-y-3">
            <div className="flex items-center gap-4 justify-between">
              <p className="text-md">New Uploads</p>
              <div
                className={`relative w-9 h-5 flex items-center rounded-full transition duration-300 ${
                  uploads ? "bg-blue-700" : "bg-gray-300"
                }`}
                onClick={() => setUploads(!uploads)}
              >
                <span
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition duration-300 ${
                    uploads ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </div>
            </div>
            <div className="flex items-center gap-4 justify-between">
              <p className="text-md">Replies</p>
              <div
                className={`relative w-9 h-5 flex items-center rounded-full transition duration-300 ${
                  replies ? "bg-blue-700" : "bg-gray-300"
                }`}
                onClick={() => setReplies(!replies)}
              >
                <span
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition duration-300 ${
                    replies ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </div>
            </div>
            <div className="flex items-center gap-4 justify-between">
              <p className="text-md">Likes</p>
              <div
                className={`relative w-9 h-5 flex items-center rounded-full transition duration-300 ${
                  likes ? "bg-blue-700" : "bg-gray-300"
                }`}
                onClick={() => setLikes(!likes)}
              >
                <span
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition duration-300 ${
                    likes ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
