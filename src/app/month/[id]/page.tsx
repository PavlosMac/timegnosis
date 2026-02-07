export const dynamic = "force-static";
import { notFound } from "next/navigation";
import StaticPlanet from "@/components/StaticPlanet";
import { fetchMonthGnosis } from "@/lib/fetchLocalGnosis";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const monthId = parseInt(resolvedParams.id, 10);
  const data = await fetchMonthGnosis(monthId);
  if (!data) {
    return { title: "Not Found | TimeGnosis" };
  }
  return {
    title: data.title || `Month ${resolvedParams.id} | TimeGnosis`,
    description: data.subtitle || data.body?.slice(0, 160) || `Numerology and astrology for month energy ${resolvedParams.id}`,
    openGraph: {
      title: data.title || `Month ${resolvedParams.id} | TimeGnosis`,
      description: data.subtitle || data.body?.slice(0, 160) || `Numerology and astrology for month energy ${resolvedParams.id}`,
    }
  };
}

export default async function MonthPage({ params }: Props) {
  const resolvedParams = await params;
  const monthId = parseInt(resolvedParams.id, 10);
  const data = await fetchMonthGnosis(monthId);

  if (!data) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 animate-fade-in">
      {/* Main mystical container */}
      <div className="mystical-container ornate-corners relative p-6 sm:p-10">
        {/* Bottom ornate corners */}
        <div className="ornate-corners-bottom absolute inset-0 pointer-events-none" />

        {/* Corner star decorations */}
        <div className="absolute top-3 left-3 text-[#d4af37]/60 text-sm">✦</div>
        <div className="absolute top-3 right-3 text-[#d4af37]/60 text-sm">✦</div>
        <div className="absolute bottom-3 left-3 text-[#d4af37]/60 text-sm">✦</div>
        <div className="absolute bottom-3 right-3 text-[#d4af37]/60 text-sm">✦</div>

        {/* Inner mystical glow */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none rounded-xl"
          style={{
            background: 'radial-gradient(circle at 50% 30%, rgba(212,175,55,0.15), transparent 70%)'
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Title */}
          <h1 className="mystical-heading text-2xl sm:text-3xl md:text-4xl text-center mb-6">
            {data.title}
          </h1>

          {/* Mystical divider */}
          <div className="mystical-divider my-6">
            <span className="text-[#d4af37] text-xl">✦</span>
          </div>

          {/* Planet section with mystical background */}
          <div className="relative my-8">
            <div
              className="absolute inset-0 rounded-lg opacity-40"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(45,27,78,0.8) 0%, transparent 70%)'
              }}
            />
            <StaticPlanet energy={monthId} />
          </div>

          {/* Mystical divider */}
          <div className="mystical-divider my-6">
            <span className="text-[#d4af37] text-xl">✦</span>
          </div>

          {/* Subtitle */}
          <div className="mt-8">
            <h2 className="mystical-subheading text-lg sm:text-xl md:text-2xl mb-6 text-center">
              {data.subtitle}
            </h2>

            {/* Body content with gold border accent */}
            <div
              className="relative p-6 sm:p-8 rounded-lg mt-6"
              style={{
                background: 'linear-gradient(135deg, rgba(26,0,51,0.6) 0%, rgba(45,27,78,0.4) 100%)',
                border: '1px solid rgba(212,175,55,0.3)'
              }}
            >
              {/* Inner corner stars */}
              <div className="absolute top-2 left-2 text-[#d4af37]/40 text-xs">✦</div>
              <div className="absolute top-2 right-2 text-[#d4af37]/40 text-xs">✦</div>
              <div className="absolute bottom-2 left-2 text-[#d4af37]/40 text-xs">✦</div>
              <div className="absolute bottom-2 right-2 text-[#d4af37]/40 text-xs">✦</div>

              <p className="mystical-body text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
                {data.body}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
