export default function ActivityPanel() {
  return (
    <div className="w-64 h-screen bg-black text-white border-l border-yellow-500 p-4">
      <h2 className="text-lg font-bold text-yellow-500 mb-6">
        Live Activity
      </h2>

      <div className="space-y-4">
        <div className="border border-yellow-500 rounded-lg p-3 bg-zinc-950">
          New member joined Recovery Room
        </div>

        <div className="border border-yellow-500 rounded-lg p-3 bg-zinc-950">
          Recovery Log updated
        </div>

        <div className="border border-yellow-500 rounded-lg p-3 bg-zinc-950">
          New Rebuild Room created
        </div>
      </div>
    </div>
  );
}