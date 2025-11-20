"use client";

import { useMemo, useState } from 'react';
import { generateLinkedInPost, type GeneratorOptions } from '@/lib/generator';

const tones = [
  'Professional',
  'Conversational',
  'Inspirational',
  'Analytical',
  'Storytelling',
  'Bold',
];

const lengths = [
  { id: 'short', label: 'Short (80-120 words)' },
  { id: 'medium', label: 'Medium (120-200 words)' },
  { id: 'long', label: 'Long (200-300 words)' },
];

const defaultOptions: GeneratorOptions = {
  topic: '',
  audience: 'Tech professionals',
  industry: 'Technology',
  tone: 'Professional',
  length: 'medium',
  includeEmojis: true,
  includeBullets: true,
  hashtagsCount: 5,
  callToAction: 'What do you think?',
  variationSeed: 1,
  linkUrl: '',
};

export default function PostForm() {
  const [options, setOptions] = useState<GeneratorOptions>(defaultOptions);
  const [post, setPost] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const counts = useMemo(() => {
    const words = post.trim() ? post.trim().split(/\s+/).length : 0;
    const chars = post.length;
    return { words, chars };
  }, [post]);

  function update<K extends keyof GeneratorOptions>(key: K, value: GeneratorOptions[K]) {
    setOptions((o) => ({ ...o, [key]: value }));
  }

  async function onGenerate(seed?: number) {
    setLoading(true);
    try {
      const result = generateLinkedInPost({ ...options, variationSeed: seed ?? options.variationSeed });
      setPost(result.post);
    } finally {
      setLoading(false);
    }
  }

  function onCopy() {
    if (!post) return;
    navigator.clipboard.writeText(post);
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium">Topic</label>
            <input
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              placeholder="e.g. Lessons from shipping an MVP in 2 weeks"
              value={options.topic}
              onChange={(e) => update('topic', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">Audience</label>
              <input
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                placeholder="e.g. Startup founders, data scientists"
                value={options.audience}
                onChange={(e) => update('audience', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Industry</label>
              <input
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                placeholder="e.g. SaaS, Healthcare, Fintech"
                value={options.industry}
                onChange={(e) => update('industry', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">Tone</label>
              <select
                className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                value={options.tone}
                onChange={(e) => update('tone', e.target.value as any)}
              >
                {tones.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Length</label>
              <select
                className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                value={options.length}
                onChange={(e) => update('length', e.target.value as any)}
              >
                {lengths.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">CTA</label>
              <input
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                placeholder="e.g. What do you think?"
                value={options.callToAction}
                onChange={(e) => update('callToAction', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Hashtags (0-10)</label>
              <input
                type="number"
                min={0}
                max={10}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                value={options.hashtagsCount}
                onChange={(e) => update('hashtagsCount', Math.max(0, Math.min(10, Number(e.target.value))))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={options.includeEmojis}
                onChange={(e) => update('includeEmojis', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
              />
              <span className="text-sm">Include emojis</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={options.includeBullets}
                onChange={(e) => update('includeBullets', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
              />
              <span className="text-sm">Include bullet list</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium">Optional link to reference</label>
            <input
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              placeholder="https://example.com/blog-post"
              value={options.linkUrl}
              onChange={(e) => update('linkUrl', e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => onGenerate(Date.now() % 10000)}
              disabled={loading || !options.topic.trim()}
              className="inline-flex items-center justify-center rounded-md bg-brand-600 px-4 py-2 text-white shadow-sm hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Generating?' : 'Generate post'}
            </button>
            <button
              onClick={() => onGenerate((options.variationSeed + 1) % 10000)}
              disabled={loading || !post}
              className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Regenerate variation
            </button>
            <button
              onClick={onCopy}
              disabled={!post}
              className="ml-auto inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Copy
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Preview</h2>
          <div className="text-xs text-gray-500">
            {counts.words} words ? {counts.chars} chars
          </div>
        </div>
        <textarea
          className="mt-3 h-[520px] w-full resize-none rounded-md border border-gray-300 px-3 py-2 font-medium tracking-tight focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
        <p className="mt-2 text-xs text-gray-500">Tip: You can edit the generated text before copying.</p>
      </section>
    </div>
  );
}
