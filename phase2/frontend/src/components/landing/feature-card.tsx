/**
 * FeatureCard Component
 *
 * Displays a single feature highlight with icon, title, description, and optional learn more link.
 * Used in a grid layout on the landing page to showcase key application features.
 * Enhanced with richer shadows, smooth hover effects, and interactive elements.
 *
 * @component
 * @example
 * ```tsx
 * <FeatureCard
 *   icon="✓"
 *   title="Easy Task Management"
 *   description="Create, organize, and complete tasks with a simple, intuitive interface"
 *   learnMoreHref="#features"
 * />
 * ```
 */

export interface FeatureCardProps {
  /** Icon emoji or identifier (e.g., "✓", "🔒") */
  icon: string;
  /** Feature title */
  title: string;
  /** Feature description (1-2 sentences) */
  description: string;
  /** Optional learn more link */
  learnMoreHref?: string;
}

export default function FeatureCard({ icon, title, description, learnMoreHref }: FeatureCardProps) {
  return (
    <div className="group bg-gradient-to-br from-[#1a1a1a] to-[#111111] rounded-xl shadow-2xl shadow-black/70 p-8 hover:shadow-3xl hover:shadow-blue-500/20 hover:scale-105 hover:-translate-y-2 transition-all duration-300 ease-in-out cursor-pointer border border-[#2a2a2a] hover:border-blue-500/50">
      {/* Icon with gradient background */}
      <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center text-5xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
        <span aria-hidden="true">{icon}</span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-white mb-4 text-center group-hover:text-blue-400 transition-colors duration-300">
        {title}
      </h3>

      {/* Description */}
      <p className="text-base text-[#d4d4d4] text-center leading-relaxed mb-6">
        {description}
      </p>

      {/* Learn More Link */}
      {learnMoreHref && (
        <div className="text-center">
          <a
            href={learnMoreHref}
            className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 cursor-pointer"
          >
            Learn More
            <svg
              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}
