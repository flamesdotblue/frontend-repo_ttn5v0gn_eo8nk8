import React, { useEffect, useMemo, useState } from 'react';
import { Sparkles, Wand2 } from 'lucide-react';

function buildProjectPrompt({ domain, goal, tech, complexity }) {
  return `Context: You are an expert ${domain} assistant.
Goal: ${goal}.
Tech Stack: ${tech}.
Complexity: ${complexity}.
Constraints: Provide a high-quality prompt for Amazon Q, GitHub Copilot, or ChatGPT that includes:
- Context and assumptions
- Step-by-step plan with modules and suggested architecture
- Coding standards, testing strategy, and performance considerations
- Output format: markdown with sections (Project Name, Modules, Architecture, Tasks)
Evaluation: The prompt should be unambiguous, actionable, and scoped for a ${complexity} developer.`.trim();
}

function buildImagePrompt({ scene, style, mood, resolution }) {
  return `Context: You are a world-class image prompt engineer.
Scene description: ${scene}.
Style: ${style}.
Tone/Mood: ${mood}.
Resolution: ${resolution}.
Constraints: Use concise, vivid language; specify composition, lighting, camera/lens, and color palette when helpful.
Output: A single, copy-ready prompt suitable for Midjourney, DALL·E, or Stable Diffusion.`.trim();
}

export default function PromptGenerator({ onPromptChange, incomingTemplate }) {
  const [tab, setTab] = useState('project');

  const [project, setProject] = useState({
    domain: '',
    goal: '',
    tech: '',
    complexity: 'intermediate',
  });
  const [image, setImage] = useState({
    scene: '',
    style: 'realistic',
    mood: 'inspiring',
    resolution: '1024x1024',
  });
  const [result, setResult] = useState('');

  useEffect(() => {
    if (!incomingTemplate) return;
    if (incomingTemplate.kind === 'project') {
      setTab('project');
      setProject((p) => ({ ...p, ...incomingTemplate.payload }));
    } else if (incomingTemplate.kind === 'image') {
      setTab('image');
      setImage((s) => ({ ...s, ...incomingTemplate.payload }));
    }
  }, [incomingTemplate]);

  useEffect(() => {
    onPromptChange && onPromptChange(result);
  }, [result, onPromptChange]);

  const disabled = useMemo(() => {
    if (tab === 'project') return !(project.domain && project.goal);
    return !image.scene;
  }, [tab, project, image]);

  function handleGenerate() {
    if (tab === 'project') {
      setResult(buildProjectPrompt(project));
    } else {
      setResult(buildImagePrompt(image));
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-10 text-white">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex rounded-lg bg-white/10 p-1">
          {['project', 'image'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-md px-4 py-2 text-sm capitalize transition ${
                tab === t ? 'bg-white/20' : 'text-white/80 hover:bg-white/10'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="hidden text-sm text-white/70 md:block">
          Tip: Use templates below to prefill the form.
        </div>
      </div>

      {tab === 'project' ? (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-white/70">Domain</label>
              <input
                value={project.domain}
                onChange={(e) => setProject({ ...project, domain: e.target.value })}
                placeholder="e.g., AI, web dev, mobile"
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-white/40 focus:border-white/20"
              />
            </div>
            <div>
              <label className="block text-xs text-white/70">Goal</label>
              <textarea
                value={project.goal}
                onChange={(e) => setProject({ ...project, goal: e.target.value })}
                placeholder="Describe what you want to build"
                rows={3}
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-white/40 focus:border-white/20"
              />
            </div>
            <div>
              <label className="block text-xs text-white/70">Tech Stack</label>
              <input
                value={project.tech}
                onChange={(e) => setProject({ ...project, tech: e.target.value })}
                placeholder="e.g., React, Tailwind, FastAPI, Postgres"
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-white/40 focus:border-white/20"
              />
            </div>
            <div>
              <label className="block text-xs text-white/70">Complexity</label>
              <select
                value={project.complexity}
                onChange={(e) => setProject({ ...project, complexity: e.target.value })}
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-white/20"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="mb-3 text-sm font-semibold text-white/90">Result</div>
              <textarea
                value={result}
                onChange={(e) => setResult(e.target.value)}
                placeholder="Generated prompt will appear here"
                rows={12}
                className="w-full rounded-lg border border-white/10 bg-black/30 p-3 text-sm outline-none placeholder:text-white/40 focus:border-white/20"
              />
              <div className="mt-3 flex items-center justify-end gap-3">
                <button
                  onClick={() => navigator.clipboard.writeText(result)}
                  className="rounded-md border border-white/10 px-3 py-1.5 text-xs text-white/80 transition hover:bg-white/10"
                >
                  Copy
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={disabled}
                  className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 px-4 py-2 text-xs font-semibold shadow-lg shadow-fuchsia-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:brightness-90"
                >
                  <Wand2 className="h-4 w-4" /> Generate
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-white/70">Scene Description</label>
              <textarea
                value={image.scene}
                onChange={(e) => setImage({ ...image, scene: e.target.value })}
                placeholder="Describe the subject, composition, and setting"
                rows={3}
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-white/40 focus:border-white/20"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-white/70">Style</label>
                <input
                  value={image.style}
                  onChange={(e) => setImage({ ...image, style: e.target.value })}
                  placeholder="e.g., anime, cyberpunk, realistic"
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-white/40 focus:border-white/20"
                />
              </div>
              <div>
                <label className="block text-xs text-white/70">Mood</label>
                <input
                  value={image.mood}
                  onChange={(e) => setImage({ ...image, mood: e.target.value })}
                  placeholder="e.g., serene, dramatic, playful"
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-white/40 focus:border-white/20"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-white/70">Resolution</label>
              <input
                value={image.resolution}
                onChange={(e) => setImage({ ...image, resolution: e.target.value })}
                placeholder="e.g., 1024x1024"
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-white/40 focus:border-white/20"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="mb-3 text-sm font-semibold text-white/90">Result</div>
              <textarea
                value={result}
                onChange={(e) => setResult(e.target.value)}
                placeholder="Generated prompt will appear here"
                rows={12}
                className="w-full rounded-lg border border-white/10 bg-black/30 p-3 text-sm outline-none placeholder:text-white/40 focus:border-white/20"
              />
              <div className="mt-3 flex items-center justify-end gap-3">
                <button
                  onClick={() => navigator.clipboard.writeText(result)}
                  className="rounded-md border border-white/10 px-3 py-1.5 text-xs text-white/80 transition hover:bg-white/10"
                >
                  Copy
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={disabled}
                  className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 px-4 py-2 text-xs font-semibold shadow-lg shadow-fuchsia-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:brightness-90"
                >
                  <Sparkles className="h-4 w-4" /> Generate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
