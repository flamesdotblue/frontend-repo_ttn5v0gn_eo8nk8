import React, { useMemo } from 'react';

function scorePrompt(prompt) {
  if (!prompt || prompt.trim().length === 0) return { score: 0, tips: ['Describe the goal and constraints to begin.'] };

  const length = prompt.trim().length;
  let score = 40 + Math.min(40, Math.floor(length / 12));

  const signals = [
    /constraints?:/i,
    /style:/i,
    /tone|mood:/i,
    /acceptance criteria|evaluation/i,
    /step-by-step|steps/i,
    /tools?:/i,
    /context:/i,
  ];
  let bonus = 0;
  signals.forEach((re) => {
    if (re.test(prompt)) bonus += 6;
  });
  score = Math.min(100, score + Math.min(24, bonus));

  const tips = [];
  if (!/context:/i.test(prompt)) tips.push('Add context: audience, domain, or prior work.');
  if (!/constraints?:/i.test(prompt)) tips.push('Specify constraints: length, format, tools, deadlines.');
  if (!/evaluation|acceptance criteria/i.test(prompt)) tips.push('Define evaluation or acceptance criteria.');
  if (!/style:|tone|mood:/i.test(prompt)) tips.push('Clarify desired style, tone, or mood.');

  return { score, tips };
}

export default function ConfidenceMeter({ prompt }) {
  const { score, tips } = useMemo(() => scorePrompt(prompt), [prompt]);

  const color = score > 80 ? 'from-emerald-500 to-lime-500' : score > 60 ? 'from-yellow-400 to-amber-500' : 'from-rose-500 to-pink-600';

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-white backdrop-blur">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white/90">Prompt Confidence</h3>
        <span className="text-xs text-white/70">Auto-evaluated</span>
      </div>
      <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full bg-gradient-to-r ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <div className="mt-2 text-sm text-white/80">Score: {score}/100</div>
      {tips.length > 0 && (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-white/70">
          {tips.slice(0, 4).map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
