import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4 pt-10 pb-16">
      <section className="w-full max-w-2xl text-center py-16">
        
        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <Image
            src="/fracturelight.png"
            alt="Fracturelight symbol"
            width={120}
            height={120}
            priority
            className="object-contain"
          />
        </div>

        {/* TOP LABEL */}
        <p className="text-[10px] tracking-[0.3em] text-[#D4AF37]/70 uppercase mb-2">
          Founding Member Alpha
        </p>

        {/* TITLE */}
        <h1 className="text-4xl sm:text-5xl font-bold text-[#D4AF37] leading-tight">
          Welcome Home
        </h1>

        {/* BRAND */}
        <p className="mt-3 text-lg font-semibold">
          W.A.R. Network
        </p>

        <p className="text-[11px] tracking-[0.25em] text-[#D4AF37] uppercase mt-1">
          We&apos;re All Recovering
        </p>

        {/* DESCRIPTION */}
        <p className="mt-6 text-base text-white/80 leading-relaxed px-2">
          The new social platform for healing, rebuilding, discipline, and real connection.
        </p>

        {/* FEATURE BOX */}
        <div className="mt-8 border border-[#D4AF37]/20 rounded-xl p-5">
          <p className="text-[#D4AF37] font-semibold text-sm">
            Private rooms. Recovery Log. Member messaging.
          </p>
          <p className="text-white/70 text-sm mt-2 leading-relaxed">
            Built for people who are done pretending and ready to rebuild for real.
          </p>
        </div>

      </section>
    </main>
  );
}