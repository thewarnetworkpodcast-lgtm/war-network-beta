import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6 text-center">
      <div className="max-w-xl">

        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <Image
            src="/fracturelight.png"
            alt="W.A.R. Network Logo"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">
          W.A.R. Network
        </h1>

        <p className="text-lg text-gray-300 mb-2">
          WE’RE ALL RECOVERING
        </p>

        <p className="text-xl text-yellow-500 font-semibold mb-6">
          THE NEW SOCIAL PLATFORM
        </p>

        <p className="text-gray-400 mb-8">
          A private space for real people dealing with real life.
          Built for recovery, growth, discipline, and connection.
        </p>

        <div className="bg-neutral-900 border border-yellow-500 rounded-lg p-4 mb-6">
          <p className="text-yellow-500 font-semibold">
            Founding Member Alpha
          </p>
          <p className="text-gray-400 text-sm">
            Launching this week
          </p>
        </div>

        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=thewarnetworkpodcast@gmail.com&su=W.A.R.%20Network%20Early%20Access&body=I%20want%20early%20access%20to%20the%20W.A.R.%20Network."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg hover:bg-yellow-400 transition"
        >
          Request Early Access
        </a>

        <p className="text-gray-500 text-xs mt-6">
          This isn’t just a platform. It’s a movement.
        </p>

      </div>
    </main>
  );
}