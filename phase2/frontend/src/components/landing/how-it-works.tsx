/**
 * HowItWorks Component
 *
 * Displays a step-by-step guide showing users how to get started with the application.
 * Features numbered steps with icons, titles, and descriptions in a responsive grid layout.
 *
 * @component
 * @example
 * ```tsx
 * <HowItWorks />
 * ```
 */

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: '👤',
      title: 'Create Your Account',
      description: 'Sign up in seconds with your email. No credit card required, no commitments.',
    },
    {
      number: '02',
      icon: '📝',
      title: 'Add Your Tasks',
      description: 'Start adding tasks immediately. Organize them with titles, descriptions, and priorities.',
    },
    {
      number: '03',
      icon: '✅',
      title: 'Track Progress',
      description: 'Mark tasks as complete, edit them anytime, and watch your productivity soar.',
    },
    {
      number: '04',
      icon: '🎯',
      title: 'Stay Focused',
      description: 'Access your tasks from anywhere and keep your goals in sight every day.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg sm:text-xl text-[#d4d4d4] max-w-3xl mx-auto">
            Get started in minutes and transform the way you manage your tasks
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative bg-gradient-to-br from-[#1a1a1a] to-[#111111] rounded-xl shadow-2xl shadow-black/70 p-8 hover:shadow-3xl hover:shadow-black/80 hover:scale-105 hover:-translate-y-2 transition-all duration-300 ease-in-out cursor-pointer border border-[#2a2a2a] hover:border-[#333333]"
            >
              {/* Step Number Badge */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/50">
                {step.number}
              </div>

              {/* Icon */}
              <div className="text-5xl mb-6 text-center" aria-hidden="true">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-white mb-3 text-center">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-base text-[#d4d4d4] text-center leading-relaxed">
                {step.description}
              </p>

              {/* Connector Line (hidden on mobile, shown on larger screens between steps) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#333333] to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
