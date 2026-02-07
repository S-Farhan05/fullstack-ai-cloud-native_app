import Link from 'next/link';

/**
 * CTASection Component
 *
 * Displays a secondary call-to-action section for both new and returning users.
 * Provides options to either get started (register) or sign in (login).
 *
 * @component
 * @example
 * ```tsx
 * <CTASection
 *   message="Ready to get organized?"
 *   primaryText="Get Started"
 *   primaryHref="/register"
 *   secondaryText="Sign In"
 *   secondaryHref="/login"
 * />
 * ```
 */

export interface CTASectionProps {
  /** Message text displayed above the CTA buttons */
  message: string;
  /** Primary CTA button text */
  primaryText: string;
  /** Primary CTA navigation target */
  primaryHref: string;
  /** Secondary CTA button text */
  secondaryText: string;
  /** Secondary CTA navigation target */
  secondaryHref: string;
}

export default function CTASection({
  message,
  primaryText,
  primaryHref,
  secondaryText,
  secondaryHref,
}: CTASectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#0a0a0a] py-20 sm:py-24 px-4 overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2" aria-hidden="true" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2" aria-hidden="true" />

      <div className="relative max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#111111] rounded-2xl shadow-3xl shadow-black/80 p-8 sm:p-12 lg:p-16 border border-[#2a2a2a] text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-8 shadow-lg shadow-blue-500/50">
            🚀
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Ready to Transform Your Productivity?
          </h2>

          {/* Message */}
          <p className="text-lg sm:text-xl text-[#d4d4d4] mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
            {message}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={primaryHref}
              className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#111111] transition-all duration-300 ease-in-out cursor-pointer"
            >
              {primaryText}
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
              href={secondaryHref}
              className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 bg-[#1a1a1a] text-[#e5e5e5] text-lg font-semibold border-2 border-[#333333] rounded-lg hover:bg-[#222222] hover:border-[#444444] hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#111111] transition-all duration-300 ease-in-out cursor-pointer"
            >
              {secondaryText}
            </Link>
          </div>

          {/* Trust badge */}
          <div className="mt-8 pt-8 border-t border-[#2a2a2a]">
            <p className="text-sm text-[#6b7280]">
              Join 10,000+ users who trust TaskFlow for their daily productivity
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
