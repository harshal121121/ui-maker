import { useState } from "react";
import {
  Sparkles,
  Send,
  RotateCcw,
  Lightbulb,
  LoaderCircle,
} from "lucide-react";

interface PromptPanelProps {
  onGenerate: (prompt: string) => void;
  isGenerating?: boolean;
}

const examplePrompts = [
  "Create a modern login page with email and password fields",
  "Build a landing page for a fitness application",
  "Design a dashboard with statistics cards and a sidebar",
  "Create a pricing page with three subscription plans",
];

export default function PromptPanel({
  onGenerate,
  isGenerating = false,
}: PromptPanelProps) {
  const [prompt, setPrompt] = useState("");

  const handleGenerate = () => {
    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt || isGenerating) return;

    onGenerate(trimmedPrompt);
  };

  return (
    <section className="app-prompt-panel border-0 p-3 sm:p-4">
      <div className="mx-auto max-w-4xl">
        {/* Heading */}
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Sparkles size={19} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-900">
              AI UI Generator
            </h2>
            <p className="text-xs text-gray-500">
              Describe the interface you want to create
            </p>
          </div>
        </div>

        {/* Prompt input */}
        <div className="rounded-xl border border-gray-200 bg-white transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                !event.shiftKey &&
                !event.nativeEvent.isComposing
              ) {
                event.preventDefault();
                handleGenerate();
              }
            }}
            placeholder="Example: Create a modern SaaS landing page with a hero section, pricing cards, and a navigation bar..."
            rows={3}
            disabled={isGenerating}
            className="w-full resize-y rounded-t-xl bg-transparent px-4 py-3 text-sm leading-6 text-gray-800 outline-none placeholder:text-gray-400 disabled:opacity-60"
          />

          <div className="flex items-center justify-between gap-3 border-t border-gray-100 px-3 py-2">
            <span className="text-xs text-gray-400">
              Enter to generate · Shift + Enter for a new line
            </span>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isGenerating ? (
                <LoaderCircle size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}

              {isGenerating ? "Generating..." : "Generate UI"}
            </button>
          </div>
        </div>

        {/* Example prompts */}
        <div className="mt-4">
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-gray-500">
            <Lightbulb size={14} />
            Try an example
          </div>

          <div className="flex flex-wrap gap-2">
            {examplePrompts.map((example) => (
              <button
                key={example}
                type="button"
                disabled={isGenerating}
                onClick={() => setPrompt(example)}
                className="rounded-full border border-gray-200 px-3 py-1.5 text-left text-xs text-gray-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 disabled:opacity-50"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* Clear prompt */}
        {prompt.length > 0 && !isGenerating && (
          <button
            type="button"
            onClick={() => setPrompt("")}
            className="mt-3 inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700"
          >
            <RotateCcw size={12} />
            Clear prompt
          </button>
        )}
      </div>
    </section>
  );
}

