import React from 'react';
import { Star, Code, Image, PenTool, Share2 } from 'lucide-react';

const templates = [
  {
    id: 'coding-task',
    title: 'Coding Task',
    icon: Code,
    kind: 'project',
    payload: {
      domain: 'web development',
      goal: 'build a responsive dashboard with authentication',
      tech: 'React, Tailwind CSS, FastAPI, MongoDB',
      complexity: 'intermediate',
    },
    blurb:
      'Generate a robust coding prompt with clear acceptance criteria and architecture hints.',
  },
  {
    id: 'image-poster',
    title: 'Image – Neon Poster',
    icon: Image,
    kind: 'image',
    payload: {
      scene: 'futuristic city street with rain reflections and neon signage',
      style: 'cyberpunk, cinematic, high contrast',
      mood: 'moody, energetic',
      resolution: '1024x1536',
    },
    blurb: 'Compose a striking image prompt for Midjourney/DALL·E style engines.',
  },
  {
    id: 'marketing-copy',
    title: 'Marketing Copy',
    icon: PenTool,
    kind: 'project',
    payload: {
      domain: 'marketing',
      goal: 'write a product launch email and a short landing page hero copy',
      tech: 'copywriting frameworks (AIDA, PAS)',
      complexity: 'beginner',
    },
    blurb: 'Kickstart persuasive copy prompts with structure and tone.',
  },
  {
    id: 'shareable',
    title: 'Shareable Prompt',
    icon: Share2,
    kind: 'project',
    payload: {
      domain: 'AI collaboration',
      goal: 'create a reusable prompt for brainstorming product names',
      tech: 'any LLM',
      complexity: 'easy',
    },
    blurb: 'Great for collaboration and quick iterations.',
  },
];

export default function TemplatesLibrary({ onSelect }) {
  return (
    <section id="templates" className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Prompt Templates</h2>
        <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-white/80">
          <Star className="h-3.5 w-3.5 text-yellow-300" /> Curated
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => onSelect && onSelect(t)}
              className="group flex flex-col items-start rounded-xl border border-white/10 bg-white/5 p-5 text-left text-white transition hover:border-white/20 hover:bg-white/10"
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-500/40 to-indigo-500/40">
                    <Icon className="h-5 w-5 text-white" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold">{t.title}</div>
                    <div className="text-xs text-white/70 capitalize">{t.kind}</div>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-white/80">{t.blurb}</p>
              <div className="mt-4 w-full text-right">
                <span className="text-xs text-fuchsia-300 group-hover:underline">Use Template →</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
