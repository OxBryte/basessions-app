export default function AuthLogin() {
  return (
    <div className="w-full h-screen space-y-4">
      <div
        className="h-[55vh] w-full bg-fill bg-no-repeat bg-top relative"
        style={{ backgroundImage: "url(/bg-login.png)" }}
      >
        <div className="before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:to-black"></div>
      </div>
      <div className="space-y-8 w-full max-w-lg mx-auto mt-4 px-6">
        <div className="flex flex-col gap-4 items-left">
          <div>
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter email address"
              className="w-full bg-white/10 py-4 px-6 rounded-lg placeholder:text-white/50"
            />
          </div>
          <div>
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter password"
              className="w-full bg-white/10 py-4 px-6 rounded-lg placeholder:text-white/50"
            />
          </div>
          <div className="text-sm text-white/40 hover:text-white cursor-pointer w-full">
            <p>Forgotten password?</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <button className="bg-[#0052FE] hover:bg-[#0052FE]/80 w-full rounded-2xl px-6 py-4">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
