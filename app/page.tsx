import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <section className="mx-auto flex min-h-[80vh] w-full max-w-[980px] items-center justify-center">
        <div className="w-full text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative flex h-[160px] w-[160px] items-center justify-center">
              <div className="absolute h-[220px] w-[220px] rounded-full bg-[#D4AF37]/8 blur-3xl" />
              <Image
                src="/fracturelight.png"
                alt="Fracturelight symbol"
                width={170}
                height={170}
                priority
                className="relative block h-[150px] w-[150px] object-contain mix-blend-screen"
              />
            </div>
          </div>

          <p className="block text-center text-[12px] font-semibold uppercase tracking-[0.35em] text-[#D4AF37]/70">
            Founding Member Alpha
          </p>

          <h1 className="mt-4 block text-center text-[64px] font-extrabold leading-none tracking-tight text-[#D4AF37]">
            Welcome Home
          </h1>

          <p className="mt-5 block text-center text-[34px] font-semibold leading-tight text-white">
            W.A.R. Network
          </p>

          <p className="mt-3 block text-center text-[15px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">
            WE&apos;RE ALL RECOVERING
          </p>

          <p className="mx-auto mt-8 block max-w-[760px] text-center text-[28px] leading-[1.45] text-white/80">
            The new social platform for healing, rebuilding, discipline, and real
            connection.
          </p>

          <div className="mx-auto mt-10 max-w-[760px] rounded-[28px] border border-[#D4AF37]/25 bg-white/[0.03] px-8 py-7">
            <p className="block text-center text-[28px] font-semibold leading-[1.35] text-[#D4AF37]">
              Private rooms. Recovery Log. Member messaging.
            </p>
            <p className="mx-auto mt-4 block max-w-[680px] text-center text-[24px] leading-[1.45] text-white/72">
              Built for people who are done pretending and ready to rebuild for
              real.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <a
              href="mailto:thewarnetworkpodcast@gmail.com?subject=Early%20Access%20Request%20-%20W.A.R.%20Network&body=Name:%0AEmail:%0AWhy%20do%20you%20want%20access:"
              className="inline-flex min-w-[260px] whitespace-nowrap items-center justify-center rounded-full bg-[#D4AF37] px-10 py-5 text-[22px] font-bold text-black transition hover:opacity-90"
            >
              Request Early Access
            </a>

            <button
              type="button"
              className="inline-flex min-w-[260px] whitespace-nowrap items-center justify-center rounded-full border border-[#D4AF37]/35 px-10 py-5 text-[22px] font-bold text-[#D4AF37] transition hover:bg-[#D4AF37]/10"
            >
              Explore the Vision
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}