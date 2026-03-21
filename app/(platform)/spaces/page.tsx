"use client";

import Link from "next/link";

type SpaceCard = {
  title: string;
  slug: string;
  description: string;
  tag: string;
};

const featuredSpaces: SpaceCard[] = [
  {
    title: "Combat Veterans",
    slug: "combat-veterans",
    description: "A place for veterans to speak openly about service, transition, identity, and recovery.",
    tag: "Service",
  },
  {
    title: "PTSD & Trauma",
    slug: "ptsd-trauma",
    description: "For those navigating flashbacks, anxiety, triggers, nightmares, and the work of healing.",
    tag: "Healing",
  },
  {
    title: "Addiction Recovery",
    slug: "addiction-recovery",
    description: "A room for honesty, accountability, relapse prevention, and rebuilding one day at a time.",
    tag: "Recovery",
  },
  {
    title: "Grief & Loss",
    slug: "grief-loss",
    description: "For anyone carrying loss, mourning change, or trying to breathe through heartbreak.",
    tag: "Support",
  },
  {
    title: "Autism Parents",
    slug: "autism-parents",
    description: "A room for parents raising autistic children and carrying the beautiful weight of that journey.",
    tag: "Family",
  },
  {
    title: "Childhood Trauma",
    slug: "childhood-trauma",
    description: "For those healing from early pain, survival patterns, and the long shadow of what happened young.",
    tag: "Inner Work",
  },
  {
    title: "Incarceration & Reentry",
    slug: "incarceration-reentry",
    description: "A place for rebuilding after prison, reclaiming identity, and creating a new path.",
    tag: "Rebuild",
  },
  {
    title: "Founding Members",
    slug: "founding-members",
    description: "For the early builders helping shape the culture, direction, and heartbeat of W.A.R. Network.",
    tag: "Alpha",
  },
];

const supportLinks = [
  {
    title: "988 Suicide & Crisis Lifeline",
    description: "Call or text 988 in the U.S. for immediate crisis support.",
  },
  {
    title: "Veterans Crisis Line",
    description: "Veterans can call 988 then press 1, text 838255, or chat online.",
  },
  {
    title: "Grounding Reset",
    description: "Pause. Breathe in for 4, hold for 4, out for 6. Repeat until your body slows down.",
  },
];

export default function SpacesPage() {
  return (
    <main className="min-h-screen bg-black px-4 pb-24 pt-8 text-white">
      <div className="mx-auto flex w-full max-w-md flex-col gap-5">
        {/* HERO */}
        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] px-6 py-7">
          <div className="flex flex-col items-center text-center">
            <img
              src="/fracturelight.png"
              alt="Fracturelight"
              className="h-14 w-14 object-contain mix-blend-screen"
            />

            <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-[#D4AF37]">
              W.A.R. SPACES
            </p>

            <h1 className="mt-3 text-2xl font-semibold text-white">
              Explore Rooms
            </h1>

            <p className="mt-3 max-w-[280px] text-sm leading-7 text-white/75">
              Find the room that speaks to your story. You do not have to carry this alone.
            </p>
          </div>
        </div>

        {/* QUICK ACTION */}
        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] px-5 py-5">
          <p className="text-center text-sm font-semibold text-[#D4AF37]">
            Start Exploring
          </p>

          <div className="mt-4 flex flex-col gap-3">
            <Link
              href="/feed"
              className="flex h-12 w-full items-center justify-center rounded-2xl bg-[#D4AF37] text-sm font-semibold text-black transition hover:opacity-90"
            >
              Enter Community Feed
            </Link>

            <Link
              href="/recovery-log"
              className="flex h-12 w-full items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-sm font-semibold text-white"
            >
              Open Recovery Log
            </Link>
          </div>
        </div>

        {/* PREMADE ROOMS */}
        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] px-5 py-5">
          <p className="text-sm font-semibold text-[#D4AF37]">
            Featured Rooms
          </p>

          <div className="mt-4 flex flex-col gap-3">
            {featuredSpaces.map((space) => (
              <Link
                key={space.slug}
                href={`/spaces/${space.slug}`}
                className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 transition hover:border-[#D4AF37]/30"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-semibold text-white">
                      {space.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-white/70">
                      {space.description}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-[#D4AF37]">
                    {space.tag}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* SUPPORT */}
        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] px-5 py-5">
          <p className="text-sm font-semibold text-[#D4AF37]">
            Support Right Now
          </p>

          <div className="mt-4 flex flex-col gap-3">
            {supportLinks.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4"
              >
                <h3 className="text-sm font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CUSTOM ROOM */}
        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] px-5 py-5">
          <p className="text-sm font-semibold text-[#D4AF37]">
            Create Your Own Private Room
          </p>

          <p className="mt-3 text-sm leading-7 text-white/75">
            Need a smaller space with more privacy? Create a room around your story, your circle, or your mission.
          </p>

          <button className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-sm font-semibold text-white">
            Private Room Builder Coming Next
          </button>
        </div>
      </div>
    </main>
  );
}