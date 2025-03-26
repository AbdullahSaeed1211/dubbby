import { HeroSection } from '@/app/components/landing/hero-section';
import { ComparisonSection } from '@/app/components/landing/comparison-section';
import { FeaturesSection } from '@/app/components/landing/features-section';
import { PricingSection } from '@/app/components/landing/pricing-section';
import { CTASection } from '@/app/components/landing/cta-section';

const defaultAvatarUsers = [
  {
    imageUrl: '/avatars/user1.png',
    profileUrl: '#'
  },
  {
    imageUrl: '/avatars/user2.png',
    profileUrl: '#'
  },
  {
    imageUrl: '/avatars/user3.png',
    profileUrl: '#'
  },
  {
    imageUrl: '/avatars/user4.png',
    profileUrl: '#'
  }
];

export default function Home() {
  return (
    <main>
      <HeroSection avatarUsers={defaultAvatarUsers} />
      <ComparisonSection />
      <FeaturesSection />
      <PricingSection />
      <CTASection />
    </main>
  );
}
