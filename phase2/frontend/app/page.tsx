import Navbar from '@/src/components/landing/navbar';
import Hero from '@/src/components/landing/hero';
import FeatureCard from '@/src/components/landing/feature-card';
import HowItWorks from '@/src/components/landing/how-it-works';
import Benefits from '@/src/components/landing/benefits';
import Stats from '@/src/components/landing/stats';
import CTASection from '@/src/components/landing/cta-section';

/**
 * Landing Page
 *
 * Enhanced public landing page that introduces the application to first-time visitors.
 * Features a modern navbar, hero section, feature highlights, how it works guide,
 * benefits showcase, statistics, and call-to-action sections.
 * Accessible without authentication with smooth scroll navigation.
 *
 * Sections:
 * - Navbar: Fixed navigation with smooth scroll
 * - Hero: Main headline and primary CTA
 * - Features: Key feature highlights
 * - How It Works: Step-by-step guide
 * - Benefits: Value propositions
 * - Stats: Social proof and contact
 * - CTA: Final conversion section
 */

// Feature data for the landing page
const features = [
  {
    icon: '✓',
    title: 'Easy Task Management',
    description: 'Create, organize, and complete tasks with a simple, intuitive interface that gets out of your way',
    learnMoreHref: '#how-it-works',
  },
  {
    icon: '🔒',
    title: 'Secure & Private',
    description: 'Your data is protected with secure authentication and private user accounts. We never share your information',
    learnMoreHref: '#benefits',
  },
  {
    icon: '🌐',
    title: 'Always Accessible',
    description: 'Access your tasks from anywhere, on any device, at any time. Your data syncs automatically',
    learnMoreHref: '#benefits',
  },
  {
    icon: '📋',
    title: 'Stay Organized',
    description: 'Keep track of what matters with a clean, distraction-free workspace designed for focus',
    learnMoreHref: '#how-it-works',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero
        headline="Organize Your Tasks, Amplify Your Productivity"
        subheadline="Simple, secure, and powerful todo management for everyone. Start achieving more today."
        ctaText="Get Started Free"
        ctaHref="/register"
      />

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-black scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Everything You Need to Stay Productive
            </h2>
            <p className="text-lg sm:text-xl text-[#d4d4d4] max-w-3xl mx-auto">
              Powerful features designed to help you manage tasks efficiently and achieve your goals
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                learnMoreHref={feature.learnMoreHref}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Benefits Section */}
      <Benefits />

      {/* Stats & Contact Section */}
      <Stats />

      {/* Final CTA Section */}
      <CTASection
        message="Ready to get organized? Start managing your tasks today!"
        primaryText="Get Started Free"
        primaryHref="/register"
        secondaryText="Sign In"
        secondaryHref="/login"
      />
    </div>
  );
}
