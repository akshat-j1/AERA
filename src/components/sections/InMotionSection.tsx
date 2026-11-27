import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Pause, Play, RotateCcw } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { getReelMedia, motionReelsConfig, type SalonMotionReel } from '../../config/videos.config';
import { useReducedMotion } from '../../lib/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

function ReelCard({
  reel,
  claimPlayback,
}: {
  reel: SalonMotionReel;
  claimPlayback: (video: HTMLVideoElement) => void;
}) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { videoSrc, posterSrc, link } = getReelMedia(reel);
  const sourceName = reel.externalReelUrl ? 'Watch source clip' : 'Watch on Mixkit';

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

  async function togglePlayback() {
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
  }

  return (
    <article data-reel-card className="aera-reel-card snap-start shrink-0 min-w-0">
      <div data-reel-plate className="aera-reel-plate relative aspect-[9/14] overflow-hidden bg-[#F5F0F3]">
        {videoSrc ? (
          <>
            <video
              ref={videoRef}
              id={reel.id}
              src={videoSrc}
              poster={posterSrc}
              muted
              playsInline
              loop
              preload="none"
              aria-label={reel.title}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
              onError={() => {
                setPlaying(false);
                setFailed(true);
              }}
              className="size-full object-cover"
            />
            <button
              type="button"
              onClick={togglePlayback}
              aria-label={playing ? `Pause ${reel.title}` : failed ? `Retry ${reel.title}` : `Play ${reel.title}`}
              aria-controls={reel.id}
              className="absolute inset-0 size-full grid place-items-center cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#7B4A60]"
            >
              <span className="aera-reel-play grid size-12 place-items-center rounded-full bg-[#FCFAFA] text-[#40343D]">
                {playing ? <Pause aria-hidden="true" className="size-4" /> : failed ? <RotateCcw aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4 ml-0.5" />}
              </span>
            </button>
            <span className="absolute bottom-3 right-3 px-2 rounded-xs bg-[#2A2028]/85 text-[#FCFAFA] text-[11px] tabular pointer-events-none">
              {reel.durationLabel}
            </span>
          </>
        ) : (
          <>
            <img src={posterSrc} alt="" loading="lazy" decoding="async" className="size-full object-cover" />
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${sourceName} — ${reel.title}`}
              className="absolute inset-0 size-full grid place-items-center focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#7B4A60]"
            >
              <span className="aera-reel-play inline-flex items-center gap-2 rounded-full bg-[#FCFAFA] text-[#40343D] px-3.5 py-2.5 text-xs font-semibold">
                {sourceName} <ExternalLink aria-hidden="true" className="size-3.5" />
              </span>
            </a>
          </>
        )}
      </div>
      <div className="pt-3.5 space-y-1.5 pb-3">
        <p className="text-[11px] uppercase tracking-[0.13em] font-semibold text-[#7B4A60]">{reel.category}</p>
        <h3 className="font-campaign leading-snug text-lg font-bold">{reel.title}</h3>
        <p className="text-xs text-[#40343D] leading-relaxed">{reel.caption}</p>
        {failed && <p role="status" className="text-xs text-[#7B4A60]">This clip could not play. Use Retry or open the source clip.</p>}
        {failed && <a href={link} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold underline underline-offset-3">Open source clip</a>}
      </div>
    </article>
  );
}

export function InMotionSection() {
  const section = useRef<HTMLElement>(null);
  const activeVideo = useRef<HTMLVideoElement | null>(null);
  const reducedMotion = useReducedMotion();

  function claimPlayback(video: HTMLVideoElement) {
    if (activeVideo.current !== video) activeVideo.current?.pause();
    activeVideo.current = video;
  }

  useGSAP(() => {
    if (reducedMotion || !section.current) return;

    gsap.fromTo('[data-reel-plate]', {
      clipPath: 'inset(0 0 12% 0 round 42% 42% 0 0)',
      y: 18,
    }, {
      clipPath: 'inset(0 0 0 0 round 2px)',
      y: 0,
      stagger: 0.1,
      ease: 'none',
      scrollTrigger: { trigger: section.current, start: 'top 92%', end: 'top 36%', scrub: 0.4 },
    });
  }, { scope: section, dependencies: [reducedMotion], revertOnUpdate: true });

  return (
    <section ref={section} id="aera-in-motion" aria-label="AERA in Motion" className="aera-motion-section pt-10 pb-14 md:pt-14 md:pb-18 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-5 md:px-10 space-y-7">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#DED2DA] pb-5">
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#7B4A60]">{motionReelsConfig.eyebrow}</p>
            <h2 className="font-campaign text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.04]">{motionReelsConfig.heading}</h2>
          </div>
          <Link to="/gallery" className="inline-flex items-center gap-2 text-xs font-semibold underline underline-offset-4 hover:text-[#7B4A60]">
            Explore Lookbook <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>
        </div>
        <div data-reel-rail className="aera-reel-rail flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-5 px-5 pb-2 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
          {motionReelsConfig.reels.map((reel) => <ReelCard key={reel.id} reel={reel} claimPlayback={claimPlayback} />)}
        </div>
      </div>
    </section>
  );
}
