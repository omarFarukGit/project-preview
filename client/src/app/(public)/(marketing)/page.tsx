import { BuiltForEveryoneSection } from "@/components/Home/BuiltForEveryoneSection";
import { FinalCTASection } from "@/components/Home/FinalCTASection";
import { HeroSection } from "@/components/Home/Hero";
import { HowItWorksSection } from "@/components/Home/HowItWorksSection";
import { PlatformFeaturesSection } from "@/components/Home/PlatformFeaturesSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <HowItWorksSection />
      <PlatformFeaturesSection />
      <BuiltForEveryoneSection />
      <FinalCTASection />
    </div>
  );
}
