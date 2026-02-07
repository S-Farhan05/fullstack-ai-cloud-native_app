import Link from 'next/link';

/**
 * Hero Component
 *
 * Displays the main hero section on the landing page with headline,
 * subheadline, and primary call-to-action button.
 *
 * @component
 * @example
 * ```tsx
 * <Hero
 *   headline="Organize Your Tasks, Amplify Your Productivity"
 *   subheadline="Simple, secure, and powerful todo management"
 *   ctaText="Get Started"
 *   ctaHref="/register"
 * />
 * ```
 */

export interface HeroProps {
  /** Main headline text displayed prominently */
  headline: string;
  /** Supporting text below the headline */
  subheadline: string;
  /** Text for the primary CTA button */
  ctaText: string;
  /** Navigation target for the CTA button */
  ctaHref: string;
}

export default function Hero({ headline, subheadline, ctaText, ctaHref }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-black via-[#0a0a0a] to-[#111111] pt-32 pb-20 px-4 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium mb-8 hover:bg-blue-500/20 transition-colors duration-300 cursor-pointer">
          <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse" />
          New: AI-powered task suggestions coming soon
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight">
          {headline}
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl lg:text-2xl text-[#d4d4d4] mb-10 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
          {subheadline}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href={ctaHref}
            className="inline-flex items-center px-8 py-4 sm:px-10 sm:py-4 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-300 ease-in-out cursor-pointer"
          >
            {ctaText}
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex items-center px-8 py-4 sm:px-10 sm:py-4 bg-[#1a1a1a] text-[#e5e5e5] text-lg font-semibold border-2 border-[#333333] rounded-lg hover:bg-[#222222] hover:border-[#444444] hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-300 ease-in-out cursor-pointer"
          >
            Learn More
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 sm:mt-16 flex flex-wrap justify-center items-center gap-8 text-[#6b7280]">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">No credit card required</span>
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Free to start</span>
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Setup in 2 minutes</span>
          </div>
        </div>
      </div>
    </section>
  );
}
