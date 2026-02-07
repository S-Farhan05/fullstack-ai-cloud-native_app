---
name: frontend-components
description: Create frontend components, design layouts, and build pages. Useful for building modern web interfaces.
---

# Frontend Components & Page Design Skill

## Instructions

1. **Component Structure**
   - Break UI into reusable components (e.g., buttons, cards, headers)
   - Organize components by feature or page
   - Pass props to make components dynamic

2. **Layout & Styling**
   - Use CSS, Tailwind, or CSS-in-JS for styling
   - Implement responsive design for mobile, tablet, and desktop
   - Structure layouts using grids, flexbox, or stacks

3. **Page Composition**
   - Combine components to build full pages
   - Manage navigation between pages
   - Ensure consistent design and spacing

## Best Practices
- Keep components small and reusable
- Follow naming conventions for files and classes
- Use a mobile-first approach
- Ensure accessibility and semantic HTML
- Maintain consistency in colors, fonts, and spacing

## Example Structure (React + Tailwind)
```jsx
// components/Hero.js
export default function Hero({ title, subtitle, ctaText }) {
  return (
    <section className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-5xl font-bold animate-fade-in">{title}</h1>
      <p className="mt-4 text-xl animate-fade-in-delay">{subtitle}</p>
      <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-200">
        {ctaText}
      </button>
    </section>
  );
}

// pages/Home.js
import Hero from "../components/Hero";

export default function Home() {
  return (
    <main>
      <Hero 
        title="Welcome to Our Site" 
        subtitle="Build modern web apps easily" 
        ctaText="Get Started" 
      />
      {/* Add more components for other sections */}
    </main>
  );
}
