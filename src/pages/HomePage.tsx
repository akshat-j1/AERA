import { useEffect } from 'react';
import { useStudio } from '../lib/StudioContext';
import { getRouteSeo } from '../lib/seo';
import { HeroSection } from '../components/sections/HeroSection';
import { EthosSpacer } from '../components/sections/EthosSpacer';
import { LivingMirrorWall } from '../components/sections/LivingMirrorWall';
import { TransformationSection } from '../components/sections/TransformationSection';
import { ArtisansPreview } from '../components/sections/ArtisansPreview';
import { InMotionSection } from '../components/sections/InMotionSection';
import { ChairSanctuarySection } from '../components/sections/ChairSanctuarySection';

export function HomePage() {
  const seo = getRouteSeo('/');
  const { enterHome } = useStudio();

  useEffect(enterHome, [enterHome]);

  useEffect(() => {
    document.title = seo.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', seo.description);
  }, [seo.title, seo.description]);

  return (
    <>
      <HeroSection />
      <EthosSpacer />
      <LivingMirrorWall />
      <TransformationSection />
      <ArtisansPreview />
      <InMotionSection />
      <ChairSanctuarySection />
    </>
  );
}
