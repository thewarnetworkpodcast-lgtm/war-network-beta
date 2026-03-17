"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Community Feed", href: "/community" },
  { label: "Experience Rooms", href: "/rooms" },
  { label: "Rebuild Rooms", href: "/rebuild-rooms" },
  { label: "Recovery Log", href: "/recovery-log" },
  { label: "Profile", href: "/profile" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-full rounded-3xl border border-yellow-700/30 bg-zinc-950/95 p-4 text-white">
      <div className="mb-6">
        <h2 className="text-lg font-bold tracking-wide text-yellow-400">
          W.A.R. Network
        </h2>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-2xl px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "border border-yellow-500/40 bg-yellow-500/10 text-yellow-300"
                  : "text-zinc-300 hover:border hover:border-yellow-500/20 hover:bg-zinc-900 hover:text-yellow-200"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}