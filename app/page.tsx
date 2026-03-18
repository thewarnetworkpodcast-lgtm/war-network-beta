import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl text-center">
          <div className="mx-auto mb-8 flex items-center justify-center">
            <div className="relative flex items-center justify-center">
              <div className="absolute h-56 w-56 rounded-full bg-[#D4AF37]/8 blur-3xl" />
              <Image
                src="/fracturelight.png"
                alt="Fracturelight symbol"
                width={180}
                height={180}
                priority
                className="relative h-[150px] w-[150px] object-contain mix-blend-screen"
              />
            </div>
          </div>

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#D4AF37]/70">
            Founding Member Alpha
          </p>

          <h1 className="text-5xl font-extrabold tracking-tight text-[#D4AF37] sm:text-6xl">
            Welcome Home
          </h1>

          <p className="mt-4 text-2xl font-semibold text-white">
            W.A.R. Network
          </p>

          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.32em] text-[#D4AF37]">
            WE&apos;RE ALL RECOVERING
          </p>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/80">
            The new social platform for healing, rebuilding, discipline, and
            real connection.
          </p>

          <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-[#D4AF37]/25 bg-white/[0.03] px-6 py-6">
            <p className="text-lg font-semibold text-[#D4AF37]">
              Private rooms. Recovery Log. Member messaging.
            </p>
            <p className="mt-3 text-base leading-7 text-white/70">
              Built for people who are done pretending and ready to rebuild for
              real.
            </p>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="mailto:thewarnetworkpodcast@gmail.com?subject=Early%20Access%20Request%20-%20W.A.R.%20Network&body=Name:%0AEmail:%0AWhy%20do%20you%20want%20access:"
              className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-[#D4AF37] px-8 py-4 text-base font-bold text-black transition hover:opacity-90"
            >
              Request Early Access
            </a>

            <button
              type="button"
              className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-[#D4AF37]/35 px-8 py-4 text-base font-bold text-[#D4AF37] transition hover:bg-[#D4AF37]/10"
            >
              Explore the Vision
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}