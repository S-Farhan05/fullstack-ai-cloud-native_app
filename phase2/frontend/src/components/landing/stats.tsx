/**
 * Stats Component
 *
 * Displays key statistics and social proof to build trust and credibility.
 * Features animated counters and impressive metrics in a responsive grid layout.
 *
 * @component
 * @example
 * ```tsx
 * <Stats />
 * ```
 */

export default function Stats() {
  const stats = [
    {
      value: '10K+',
      label: 'Active Users',
      icon: '👥',
      description: 'Join thousands of productive individuals',
    },
    {
      value: '500K+',
      label: 'Tasks Completed',
      icon: '✅',
      description: 'Helping people achieve their goals',
    },
    {
      value: '99.9%',
      label: 'Uptime',
      icon: '⚡',
      description: 'Always available when you need it',
    },
    {
      value: '4.9/5',
      label: 'User Rating',
      icon: '⭐',
      description: 'Loved by our community',
    },
  ];

  return (
    <section id="stats" className="py-20 px-4 bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-lg sm:text-xl text-[#d4d4d4] max-w-3xl mx-auto">
            Join a growing community of productive individuals who trust TaskFlow to manage their daily tasks
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#111111] rounded-xl shadow-2xl shadow-black/70 p-8 text-center hover:shadow-3xl hover:shadow-blue-500/20 hover:scale-105 hover:-translate-y-2 transition-all duration-300 ease-in-out cursor-pointer border border-[#2a2a2a] hover:border-blue-500/50"
            >
              {/* Icon */}
              <div className="text-5xl mb-4" aria-hidden="true">
                {stat.icon}
              </div>

              {/* Value */}
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                {stat.value}
              </div>

              {/* Label */}
              <div className="text-lg font-semibold text-[#e5e5e5] mb-3">
                {stat.label}
              </div>

              {/* Description */}
              <p className="text-sm text-[#d4d4d4]">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#1a1a1a] to-[#111111] rounded-xl shadow-2xl shadow-black/70 p-8 sm:p-12 border border-[#2a2a2a] max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Have Questions? We're Here to Help
            </h3>
            <p className="text-lg text-[#d4d4d4] mb-6">
              Get in touch with our support team for any questions or feedback
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:support@taskflow.com"
                className="inline-flex items-center px-8 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Support
              </a>
              <a
                href="#"
                className="inline-flex items-center px-8 py-3 bg-[#1a1a1a] text-[#e5e5e5] font-semibold border-2 border-[#333333] rounded-md hover:bg-[#222222] hover:border-[#444444] hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Live Chat
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
