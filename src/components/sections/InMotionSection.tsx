import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, ArrowRight, ExternalLink } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motionReelsConfig, type SalonMotionReel } from '../../config/videos.config';
import { useReducedMotion } from '../../lib/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

function ReelCard({
  reel,
  index,
  staggerClass,
  claimPlayback,
}: {
  reel: SalonMotionReel;
  index: number;
  staggerClass: string;
  claimPlayback: (video: HTMLVideoElement) => void;
}) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry && !entry.isIntersecting) video.pause();
    });
    observer.observe(video);

    const pauseOnHidden = () => {
      if (document.hidden) video.pause();
    };
    document.addEventListener('visibilitychange', pauseOnHidden);
    return () => {
      document.removeEventListener('visibilitychange', pauseOnHidden);
      observer.disconnect();
      video.pause();
    };
  }, []);

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) {
      video.pause();
      return;
    }

    setFailed(false);
    if (video.error) video.load();
    claimPlayback(video);
    try {
      await video.play();
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) setFailed(true);
    }
  };

  return (
    <article
      data-reel-card
      data-reel-col={index % 2 === 0 ? 'even' : 'odd'}
      className={`snap-start shrink-0 w-[72vw] max-w-[290px] sm:w-auto sm:max-w-none space-y-3 ${staggerClass}`}
    >
      <div className="relative aspect-[9/16] rounded-sm overflow-hidden bg-[#F2EEF1] border border-[#DCD2D8] shadow-[0_18px_42px_rgba(42,33,40,0.09)] group">
        <video
          ref={videoRef}
          id={reel.id}
          src={reel.videoSrc}
          poster={reel.posterSrc}
          muted
          playsInline
          loop
          preload="none"
          aria-label={`${reel.title}: ${reel.caption}`}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          onError={() => {
            setPlaying(false);
            setFailed(true);
          }}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />

        {/* Subtle Dark Contrast Gradient Under Bottom Caption */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#2A2128]/75 via-[#2A2128]/25 to-transparent"
        />

        {/* Clean Top Index Marker */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between text-[10px] uppercase tracking-[0.16em] pointer-events-none">
          <span className="px-2 py-0.5 rounded-xs bg-[#FAF8F7]/90 text-[#2A2128] font-semibold">
            {reel.indexCode} · {reel.category}
          </span>
          <span className="px-2 py-0.5 rounded-xs bg-[#2A2128]/65 text-[#FAF8F7] tabular">
            {reel.durationLabel}
          </span>
        </div>

        {/* Accessible Center Play / Pause Toggle */}
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={playing ? `Pause ${reel.title}` : failed ? `Retry ${reel.title}` : `Play ${reel.title}`}
          aria-controls={reel.id}
          className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#844D60]"
        >
          <span
            className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 ${
              playing
                ? 'bg-[#2A2128]/45 border-[#FAF8F7]/40 text-[#FAF8F7]'
                : 'bg-[#FAF8F7]/92 border-[#DCD2D8] text-[#2A2128] shadow-md group-hover:scale-105'
            }`}
          >
            {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </span>
        </button>

        {/* Bottom Caption Pill */}
        <div className="absolute bottom-3 inset-x-3 flex items-end justify-between gap-2 text-[#FAF8F7] pointer-events-none">
          <div className="space-y-0.5">
            <h3 className="font-campaign text-base font-bold leading-snug">{reel.title}</h3>
            <p className="text-[11px] text-[#FAF8F7]/90 leading-snug">{reel.caption}</p>
          </div>
          {reel.externalReelUrl && (
            <a
              href={reel.externalReelUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${reel.title} reel`}
              className="pointer-events-auto p-1.5 rounded-full bg-[#FAF8F7]/90 text-[#2A2128] hover:bg-[#E7DFEB]"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
      {failed && <p role="status" className="text-xs text-[#844D60]">This clip could not play. Tap or press Retry to try again.</p>}
    </article>
  );
}

export function InMotionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const activeVideo = useRef<HTMLVideoElement | null>(null);

  function claimPlayback(video: HTMLVideoElement) {
    if (activeVideo.current !== video) activeVideo.current?.pause();
    activeVideo.current = video;
  }

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current) return;

      gsap.from('[data-reel-card]', {
        opacity: 0,
        y: 44,
        scale: 0.96,
        duration: 0.85,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 76%',
          once: true,
        },
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true }
  );

  return (
    <section
      ref={sectionRef}
      id="aera-in-motion"
      aria-label="AERA in Motion"
      className="py-20 md:py-28 bg-[#FAF8F7] border-b border-[#DCD2D8] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 space-y-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#DCD2D8] pb-6">
          <div className="space-y-2 max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#844D60]">
              05 · {motionReelsConfig.eyebrow}
            </p>
            <h2 className="font-campaign text-3xl sm:text-4xl md:text-5xl font-bold text-[#2A2128] leading-[1.04]">
              {motionReelsConfig.heading}
            </h2>
            <p className="text-sm text-[#493D46] leading-relaxed">{motionReelsConfig.subcopy}</p>
          </div>

          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm border border-[#DCD2D8] bg-[#FAF8F7] text-xs uppercase tracking-[0.15em] text-[#2A2128] hover:border-[#844D60]/55 hover:bg-[#F2EEF1] transition-colors shrink-0"
          >
            Explore Lookbook <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Swipe Rail + Desktop Staggered 4-Up Editorial Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-5 px-5 pb-3 sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 md:gap-7 items-start no-scrollbar">
          {motionReelsConfig.reels.map((reel, idx) => (
            <ReelCard
              key={reel.id}
              reel={reel}
              index={idx}
              claimPlayback={claimPlayback}
              staggerClass={idx % 2 === 1 ? 'lg:mt-8' : ''}
            />
          ))}
        </div>

        <p className="sm:hidden text-[11px] uppercase tracking-[0.18em] text-[#844D60]">
          Swipe sideways to preview all four studio reels →
        </p>
      </div>
    </section>
  );
}
