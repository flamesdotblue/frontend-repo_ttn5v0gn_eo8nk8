import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket } from 'lucide-react';

export default function Hero({ onGetStarted }) {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/7m4PRZ7kg6K1jPfF/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-medium backdrop-blur">
          <Rocket className="h-4 w-4 text-purple-300" />
          PromptForge – Forge perfect prompts with AI
        </span>
        <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          Craft high-impact prompts for code, images, and content
        </h1>
        <p className="mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
          Describe your goal, pick a style, and generate confident, ready-to-use prompts for your favorite AI tools.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onGetStarted}
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/50"
          >
            Get Started
          </button>
          <a
            href="#templates"
            className="rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
          >
            Explore Templates
          </a>
        </div>
      </div>
    </section>
  );
}
