import { useEffect } from 'react';
import { useStudio } from '../lib/StudioContext';
import { HeroSection } from '../components/sections/HeroSection';
import { EthosSpacer } from '../components/sections/EthosSpacer';
import { LivingMirrorWall } from '../components/sections/LivingMirrorWall';
import { TransformationSection } from '../components/sections/TransformationSection';
import { ArtisansPreview } from '../components/sections/ArtisansPreview';
import { InMotionSection } from '../components/sections/InMotionSection';
import { ChairSanctuarySection } from '../components/sections/ChairSanctuarySection';

export function HomePage() {
  const { enterHome } = useStudio();

  useEffect(enterHome, [enterHome]);

  return (
    <>
      <div className="aera-arrival">
        <HeroSection />
        <EthosSpacer />
        <LivingMirrorWall />
      </div>
      <TransformationSection />
      <ArtisansPreview />
      <InMotionSection />
      <ChairSanctuarySection />
    </>
  );
}
