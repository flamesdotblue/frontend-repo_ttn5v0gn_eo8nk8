import React, { useRef, useState } from 'react';
import Hero from './components/Hero';
import PromptGenerator from './components/PromptGenerator';
import ConfidenceMeter from './components/ConfidenceMeter';
import TemplatesLibrary from './components/TemplatesLibrary';

export default function App() {
  const workbenchRef = useRef(null);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleGetStarted = () => {
    const el = document.getElementById('workbench');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Hero onGetStarted={handleGetStarted} />

      <section id="workbench" ref={workbenchRef} className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Prompt Workbench</h2>
            <p className="mt-1 text-sm text-white/70">
              Generate prompts for code and images, then refine using the confidence meter.
            </p>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-xl border border-white/10 bg-white/5">
            <PromptGenerator onPromptChange={setCurrentPrompt} incomingTemplate={selectedTemplate} />
          </div>
          <div className="lg:col-span-1">
            <ConfidenceMeter prompt={currentPrompt} />
            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
              <div className="mb-2 text-white/90">Export</div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => navigator.clipboard.writeText(currentPrompt)}
                  className="rounded-md border border-white/10 px-3 py-1.5 transition hover:bg-white/10"
                >
                  Copy Markdown
                </button>
                <button
                  onClick={() => {
                    const blob = new Blob([JSON.stringify({ prompt: currentPrompt }, null, 2)], {
                      type: 'application/json',
                    });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'prompt.json';
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="rounded-md border border-white/10 px-3 py-1.5 transition hover:bg-white/10"
                >
                  Download JSON
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TemplatesLibrary onSelect={(tpl) => setSelectedTemplate(tpl)} />

      <footer className="mx-auto max-w-6xl px-6 py-10 text-center text-xs text-white/60">
        <div>PromptForge — Forge perfect prompts with AI</div>
        <div className="mt-2">Trippy galaxy rollercoaster theme courtesy of 3D Spline scene.</div>
      </footer>
    </div>
  );
}
