export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-black text-white border-r border-yellow-500 p-4">
      <h1 className="text-xl font-bold text-yellow-500 mb-6">
        W.A.R. Network
      </h1>

      <nav className="space-y-4">
        <div className="cursor-pointer hover:text-yellow-400">Dashboard</div>
        <div className="cursor-pointer hover:text-yellow-400">Experience Rooms</div>
        <div className="cursor-pointer hover:text-yellow-400">Rebuild Rooms</div>
        <div className="cursor-pointer hover:text-yellow-400">Recovery Log</div>
        <div className="cursor-pointer hover:text-yellow-400">Profile</div>
      </nav>
    </div>
  );
}