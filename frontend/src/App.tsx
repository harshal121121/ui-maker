
import { useEffect, useState } from "react";
import { Settings, CircleHelp } from "lucide-react";
import Navbar, {
  type AppTheme,
} from "./components/Navbar/Navbar";

import Sidebar, {
  type SidebarPage,
} from "./components/Sidebar/Sidebar";

import ComponentLibrary, {
  type ComponentType,
} from "./components/ComponentLibrary/ComponentLibrary";

import PromptPanel from "./components/PromptPanel/PromptPanel";
import Canvas from "./components/Canvas/Canvas";

import PropertiesPanel, {
  type ComponentProperties,
  defaultProperties,
} from "./components/PropertiesPanel/PropertiesPanel";

import { generateUI } from "./services/aiService";

function getInitialProperties(
  type: ComponentType
): ComponentProperties {
  const textByType: Record<ComponentType, string> = {
    button: "My Button",
    input: "",
    card: "My Card",
    heading: "My Heading",
    text: "My paragraph text",
    image: "",
    container: "My Container",
    divider: "",
    badge: "New",
    avatar: "UI",
    checkbox: "Accept terms and conditions",
    select: "Choose an option",
    textarea: "",
    link: "Learn more",
    navbar: "My Brand",
    list: "First item",
    hero: "Build something amazing",
    video: "Video placeholder",
  };

  return {
    ...defaultProperties,
    text: textByType[type],
    placeholder: "Enter your text",
    imageUrl: "",
    altText: "Image description",
    inputType: "text",
    backgroundColor:
      type === "button" ? "#2563eb" : "#ffffff",
    textColor:
      type === "button" ? "#ffffff" : "#111827",
    borderWidth: type === "button" ? 0 : 1,
    borderRadius: 8,
    disabled: false,
  };
}

function App() {
  const [activePage, setActivePage] =
    useState<SidebarPage>("Builder");

  const [selectedType, setSelectedType] =
    useState<ComponentType | null>(null);

  const [properties, setProperties] =
    useState<ComponentProperties>(defaultProperties);

  const [isGenerating, setIsGenerating] = useState(false);

  const [theme, setTheme] = useState<AppTheme>(() => {
    const savedTheme = localStorage.getItem("ui-maker-theme");
    return savedTheme === "dark" ? "dark" : "light";
  });

  // Apply the theme to the entire document.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;

    localStorage.setItem("ui-maker-theme", theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((current) =>
      current === "light" ? "dark" : "light"
    );
  };

  const handleSelectComponent = (type: ComponentType) => {
    setSelectedType(type);
    setProperties(getInitialProperties(type));
  };

  const handleResetProperties = () => {
    if (selectedType) {
      setProperties(getInitialProperties(selectedType));
    }
  };

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true);

    try {
      const result = await generateUI(prompt);

      console.log("Generated components:", result.components);

      alert(
        `Received ${result.components.length} components from the backend. ` +
        "Connecting generated output to the canvas is a separate step."
      );
    } catch (error) {
      console.error("UI generation failed:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Unable to generate UI. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePreview = () => {
    alert("Full-page preview mode will be implemented next.");
  };

  const handleExport = () => {
    if (!selectedType) {
      alert("Select a component before exporting.");
      return;
    }

    const exportData = {
      componentType: selectedType,
      properties,
    };

    const blob = new Blob(
      [JSON.stringify(exportData, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${selectedType}-component.json`;
    link.click();

    URL.revokeObjectURL(url);
  };

  const renderOtherPage = () => {
    if (activePage === "Components") {
      return (
        <main className="app-workspace-page min-w-0 flex-1 overflow-hidden">
          <ComponentLibrary
            onSelectComponent={(type) => {
              handleSelectComponent(type);
              setActivePage("Builder");
            }}
          />
        </main>
      );
    }

    if (activePage === "Settings") {
      return (
        <main className="app-workspace-page min-w-0 flex-1 overflow-y-auto p-6 sm:p-10">
          <div className="mx-auto max-w-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Settings size={23} />
            </div>

            <h2 className="mt-5 text-2xl font-bold">Settings</h2>
            <p className="mt-2 text-sm text-gray-500">
              Customize your UI-Maker workspace.
            </p>

            <div className="mt-8 flex items-center justify-between gap-4 rounded-xl border border-gray-200 p-5">
              <div>
                <h3 className="font-semibold">Appearance</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Current theme: {theme === "light" ? "Light" : "Dark"}
                </p>
              </div>

              <button
                type="button"
                onClick={handleToggleTheme}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Switch theme
              </button>
            </div>

            <div className="mt-4 rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold">Workspace</h3>
              <p className="mt-2 text-sm text-gray-500">
                You can continue editing in the same builder workspace.
                Your current component selection stays in memory while
                you navigate between pages.
              </p>
            </div>
          </div>
        </main>
      );
    }

    return (
      <main className="app-workspace-page min-w-0 flex-1 overflow-y-auto p-6 sm:p-10">
        <div className="mx-auto max-w-2xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <CircleHelp size={23} />
          </div>

          <h2 className="mt-5 text-2xl font-bold">Help & Support</h2>
          <p className="mt-2 text-sm text-gray-500">
            Learn how to use the UI-Maker editor.
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold">Build a design</h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Open Builder, select a component, and customize its
                appearance in the Properties panel.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold">Preview your design</h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Use Desktop, Tablet, and Mobile controls to inspect
                your design at different viewport widths. Zoom controls
                affect only the canvas page.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold">Use AI generation</h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Describe the interface you want in the prompt panel.
                AI generation requires a working backend API.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActivePage("Builder")}
            className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Return to Builder
          </button>
        </div>
      </main>
    );
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-100">
      <Navbar
  projectName="Current Design"
  theme={theme}
  onToggleTheme={handleToggleTheme}
  onPreview={handlePreview}
  onExport={handleExport}
/>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <div className="hidden shrink-0 sm:block">
          <Sidebar
            activePage={activePage}
            onNavigate={setActivePage}
          />
        </div>

        {activePage === "Builder" ? (
          <main className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
            {/* Component library on the left */}
            <div className="w-56 shrink-0 overflow-hidden border-r border-gray-200 xl:w-64">
              <ComponentLibrary
                onSelectComponent={handleSelectComponent}
              />
            </div>

            {/* Canvas takes priority; prompt stays at the bottom */}
            <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
              <Canvas
                selectedComponent={selectedType}
                properties={properties}
              />

              <div className="app-prompt-dock shrink-0 border-t">
                <PromptPanel
                  onGenerate={handleGenerate}
                  isGenerating={isGenerating}
                />
              </div>
            </div>

            {/* Properties panel on the right */}
            <div className="hidden shrink-0 xl:block">
              <PropertiesPanel
                componentType={selectedType}
                properties={properties}
                onChange={setProperties}
                onReset={handleResetProperties}
              />
            </div>
          </main>
        ) : (
          renderOtherPage()
        )}
      </div>
    </div>
  );
}

export default App;
