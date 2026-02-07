/**
 * Benefits Component
 *
 * Displays the key benefits and value propositions of using the application.
 * Features a two-column layout with icons, titles, and descriptions.
 *
 * @component
 * @example
 * ```tsx
 * <Benefits />
 * ```
 */

export default function Benefits() {
  const benefits = [
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Built with modern technology for instant loading and seamless interactions. No lag, no waiting.',
    },
    {
      icon: '🔐',
      title: 'Bank-Level Security',
      description: 'Your data is encrypted and protected with industry-standard security protocols. Your privacy matters.',
    },
    {
      icon: '📱',
      title: 'Cross-Platform',
      description: 'Works perfectly on desktop, tablet, and mobile. Your tasks sync automatically across all devices.',
    },
    {
      icon: '🎨',
      title: 'Beautiful Design',
      description: 'Clean, modern interface that stays out of your way. Focus on what matters without distractions.',
    },
    {
      icon: '🚀',
      title: 'Always Improving',
      description: 'Regular updates with new features and improvements based on user feedback. We listen to you.',
    },
    {
      icon: '💯',
      title: 'Free to Start',
      description: 'Get started immediately with no credit card required. Upgrade only when you need more features.',
    },
  ];

  return (
    <section id="benefits" className="py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Why Choose TaskFlow?
          </h2>
          <p className="text-lg sm:text-xl text-[#d4d4d4] max-w-3xl mx-auto">
            More than just a todo app. A complete productivity solution designed for modern professionals.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-xl shadow-2xl shadow-black/70 p-8 hover:shadow-3xl hover:shadow-blue-500/20 hover:scale-105 hover:-translate-y-2 transition-all duration-300 ease-in-out cursor-pointer border border-[#2a2a2a] hover:border-blue-500/50"
            >
              {/* Icon with gradient background */}
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-3xl mb-6 shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 group-hover:scale-110 transition-all duration-300">
                {benefit.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-base text-[#d4d4d4] leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
