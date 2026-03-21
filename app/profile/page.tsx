"use client";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-black px-4 pb-24 pt-8 text-white">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">

        {/* PROFILE CARD */}
        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-6">

          <div className="flex flex-col items-center text-center">

            {/* PROFILE IMAGE */}
            <img
              src="/fracturelight.png"
              alt="Profile"
              className="h-28 w-28 rounded-full object-cover border border-[#D4AF37]/30"
            />

            {/* USERNAME */}
            <h1 className="mt-4 text-2xl font-semibold">
              Your Name
            </h1>

            {/* BIO */}
            <p className="mt-2 text-sm text-white/70">
              This is your space. Build your identity. Share your story.
            </p>

            {/* FRIEND COUNT */}
            <div className="mt-4 text-sm text-[#D4AF37]">
              0 Friends
            </div>

            {/* EDIT BUTTON */}
            <button className="mt-5 rounded-xl border border-[#D4AF37]/30 px-5 py-2 text-sm text-[#D4AF37] hover:bg-[#D4AF37]/10">
              Edit Profile
            </button>

          </div>
        </div>

        {/* FUTURE SECTION */}
        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-5">
          <p className="text-sm text-white/70 text-center">
            Your activity, posts, and recovery journey will appear here.
          </p>
        </div>

      </div>
    </main>
  );
}