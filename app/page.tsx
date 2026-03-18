export default function Home() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6 text-center">
      <div className="max-w-xl">

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

        <button className="bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg hover:bg-yellow-400 transition">
          Request Early Access
        </button>

        <p className="text-gray-500 text-xs mt-6">
          This isn’t just a platform. It’s a movement.
        </p>

      </div>
    </main>
  );
}