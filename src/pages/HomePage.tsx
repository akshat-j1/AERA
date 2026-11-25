import { useEffect } from 'react';
import { getRouteSeo } from '../lib/seo';
import { GrandEntranceOverlay } from '../components/sections/GrandEntranceOverlay';
import { HeroSection } from '../components/sections/HeroSection';
import { EthosSpacer } from '../components/sections/EthosSpacer';
import { LivingMirrorWall } from '../components/sections/LivingMirrorWall';
import { TransformationSection } from '../components/sections/TransformationSection';
import { ArtisansPreview } from '../components/sections/ArtisansPreview';
import { LookbookSection } from '../components/sections/LookbookSection';
import { ChairSanctuarySection } from '../components/sections/ChairSanctuarySection';

export function HomePage() {
  const seo = getRouteSeo('/');

  useEffect(() => {
    document.title = seo.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', seo.description);
  }, [seo.title, seo.description]);

  return (
    <>
      <GrandEntranceOverlay />
      <HeroSection />
      <EthosSpacer />
      <LivingMirrorWall />
      <TransformationSection />
      <ArtisansPreview />
      <LookbookSection />
      <ChairSanctuarySection />
    </>
  );
}
