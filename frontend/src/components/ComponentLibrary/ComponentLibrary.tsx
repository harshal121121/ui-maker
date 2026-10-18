
import { useMemo, useState } from "react";
import {
  Search,
  MousePointerClick,
  TextCursorInput,
  Square,
  Heading,
  Image as ImageIcon,
  LayoutGrid,
  Type,
  AlignLeft,
  Minus,
  Tag,
  CircleUserRound,
  CheckSquare,
  ListFilter,
  TextCursor,
  Link as LinkIcon,
  PanelsTopLeft,
  List,
  Video,
  LayoutTemplate,
  X,
} from "lucide-react";

export type ComponentType =
  | "button"
  | "input"
  | "card"
  | "heading"
  | "text"
  | "image"
  | "container"
  | "divider"
  | "badge"
  | "avatar"
  | "checkbox"
  | "select"
  | "textarea"
  | "link"
  | "navbar"
  | "list"
  | "hero"
  | "video";

interface LibraryItem {
  type: ComponentType;
  label: string;
  description: string;
  category: string;
  icon: typeof Square;
}

interface ComponentLibraryProps {
  onSelectComponent: (type: ComponentType) => void;
}

const libraryItems: LibraryItem[] = [
  { type: "button", label: "Button", description: "Primary actions", category: "Basic", icon: MousePointerClick },
  { type: "input", label: "Input", description: "Single-line field", category: "Forms", icon: TextCursorInput },
  { type: "textarea", label: "Textarea", description: "Multi-line field", category: "Forms", icon: TextCursor },
  { type: "checkbox", label: "Checkbox", description: "Boolean selection", category: "Forms", icon: CheckSquare },
  { type: "select", label: "Select", description: "Dropdown options", category: "Forms", icon: ListFilter },
  { type: "heading", label: "Heading", description: "Page titles", category: "Text", icon: Heading },
  { type: "text", label: "Paragraph", description: "Body text", category: "Text", icon: AlignLeft },
  { type: "link", label: "Link", description: "Navigation link", category: "Text", icon: LinkIcon },
  { type: "card", label: "Card", description: "Grouped content", category: "Layout", icon: Square },
  { type: "container", label: "Container", description: "Content wrapper", category: "Layout", icon: LayoutGrid },
  { type: "navbar", label: "Navbar", description: "Site navigation", category: "Layout", icon: PanelsTopLeft },
  { type: "hero", label: "Hero section", description: "Prominent introduction", category: "Layout", icon: LayoutTemplate },
  { type: "list", label: "List", description: "Bulleted items", category: "Layout", icon: List },
  { type: "divider", label: "Divider", description: "Section separator", category: "Basic", icon: Minus },
  { type: "badge", label: "Badge", description: "Status or label", category: "Basic", icon: Tag },
  { type: "avatar", label: "Avatar", description: "Profile placeholder", category: "Media", icon: CircleUserRound },
  { type: "image", label: "Image", description: "Image element", category: "Media", icon: ImageIcon },
  { type: "video", label: "Video", description: "Video embed placeholder", category: "Media", icon: Video },
];

const categories = ["All", "Basic", "Forms", "Text", "Layout", "Media"];

export default function ComponentLibrary({
  onSelectComponent,
}: ComponentLibraryProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return libraryItems.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;

      const matchesSearch =
        !query ||
        `${item.label} ${item.description} ${item.category}`
          .toLowerCase()
          .includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <section className="app-panel flex h-full min-h-0 flex-col">
      <div className="shrink-0 border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold">Components</h2>
            <p className="mt-1 text-xs text-gray-500">
              Add elements to your design
            </p>
          </div>
          <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">
            {filteredItems.length}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
          <Search size={16} className="shrink-0 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search components..."
            aria-label="Search components"
            className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-gray-400"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="text-gray-400 hover:text-gray-700"
            >
              <X size={15} />
            </button>
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-2.5 py-1.5 text-xs font-medium transition ${
                activeCategory === category
                  ? "bg-blue-600 text-white"
                  : "app-chip"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        <div className="grid grid-cols-2 gap-2">
          {filteredItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.type}
                type="button"
                onClick={() => onSelectComponent(item.type)}
                title={`Add ${item.label}`}
                className="app-component-tile flex min-h-24 flex-col items-center justify-center gap-2 rounded-xl border p-3 text-center transition"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Icon size={19} />
                </span>
                <span className="text-sm font-medium">{item.label}</span>
                <span className="text-xs text-gray-500">
                  {item.description}
                </span>
              </button>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="py-10 text-center">
            <Search size={24} className="mx-auto text-gray-300" />
            <p className="mt-3 text-sm font-medium">No components found</p>
            <p className="mt-1 text-xs text-gray-500">
              Try another search or category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-3 text-sm font-medium text-blue-600 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      <div className="shrink-0 border-t border-gray-200 p-3">
        <p className="text-center text-xs text-gray-500">
          Select an element to edit it
        </p>
      </div>
    </section>
  );
}
