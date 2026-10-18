
import {
  Sparkles,
  Eye,
  Download,
  Sun,
  Moon,
} from "lucide-react";

export type AppTheme = "light" | "dark";

interface NavbarProps {
  projectName?: string;
  theme: AppTheme;
  onToggleTheme: () => void;
  onPreview: () => void;
  onExport: () => void;
}

export default function Navbar({
  projectName = "My First Project",
  theme,
  onToggleTheme,
  onPreview,
  onExport,
}: NavbarProps) {
  return (
    <header className="app-navbar flex h-16 shrink-0 items-center justify-between border-b px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
          <Sparkles size={22} />
        </div>

        <div className="min-w-0">
          <h1 className="text-lg font-bold tracking-tight">UI-Maker</h1>
          <p className="truncate text-xs text-gray-500">{projectName}</p>
        </div>
      </div>

      <div className="ml-3 flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={onToggleTheme}
          title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          aria-label="Toggle theme"
          className="app-icon-button rounded-lg border p-2.5 transition"
        >
          {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
        </button>

        <button
          type="button"
          onClick={onPreview}
          className="app-secondary-button inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition"
        >
          <Eye size={16} />
          <span className="hidden sm:inline">Preview</span>
        </button>

        <button
          type="button"
          onClick={onExport}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
        >
          <Download size={16} />
          <span>Export</span>
        </button>
      </div>
    </header>
  );
}
