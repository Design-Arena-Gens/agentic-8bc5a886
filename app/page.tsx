import PostForm from '@/components/PostForm';

export default function Page() {
  return (
    <main>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">LinkedIn Post Agent</h1>
        <p className="mt-2 text-gray-600">Craft scroll-stopping LinkedIn posts with structured prompts, tones, and CTAs. No API key required.</p>
      </header>
      <PostForm />
    </main>
  );
}
