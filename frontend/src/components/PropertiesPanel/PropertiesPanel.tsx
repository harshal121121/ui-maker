
import {
  Settings2,
  Palette,
  Type,
  Move,
  Box,
  Image as ImageIcon,
  RotateCcw,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import type { ComponentType } from "../ComponentLibrary/ComponentLibrary";

export interface ComponentProperties {
  text: string;
  placeholder: string;
  imageUrl: string;
  altText: string;
  inputType: string;

  backgroundColor: string;
  textColor: string;
  borderColor: string;
  opacity: number;

  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  lineHeight: number;
  letterSpacing: number;
  textAlign: string;

  width: string;
  height: string;
  display: string;
  flexDirection: string;
  justifyContent: string;
  alignItems: string;
  gap: number;

  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;

  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;

  borderWidth: number;
  borderRadius: number;
  boxShadow: string;

  disabled: boolean;
}

interface PropertiesPanelProps {
  componentType: ComponentType | null;
  properties: ComponentProperties;
  onChange: (properties: ComponentProperties) => void;
  onReset: () => void;
}

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function Section({
  title,
  icon,
  children,
  defaultOpen = true,
}: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="border-b border-gray-100">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-gray-50"
      >
        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-700">
          {icon}
          {title}
        </span>

        <ChevronDown
          size={15}
          className={`text-gray-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && <div className="space-y-4 px-4 pb-4">{children}</div>}
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-600">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const defaultProperties: ComponentProperties = {
  text: "My Button",
  placeholder: "Enter text",
  imageUrl: "",
  altText: "Image description",
  inputType: "text",

  backgroundColor: "#2563eb",
  textColor: "#ffffff",
  borderColor: "#d1d5db",
  opacity: 100,

  fontFamily: "Arial",
  fontSize: 16,
  fontWeight: "400",
  lineHeight: 1.5,
  letterSpacing: 0,
  textAlign: "center",

  width: "auto",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 8,

  paddingTop: 12,
  paddingRight: 20,
  paddingBottom: 12,
  paddingLeft: 20,

  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,

  borderWidth: 0,
  borderRadius: 8,
  boxShadow: "none",

  disabled: false,
};

export { defaultProperties };

export default function PropertiesPanel({
  componentType,
  properties,
  onChange,
  onReset,
}: PropertiesPanelProps) {
  const update = <K extends keyof ComponentProperties>(
    key: K,
    value: ComponentProperties[K]
  ) => {
    onChange({ ...properties, [key]: value });
  };

  if (!componentType) {
    return (
      <aside className="flex h-full w-80 shrink-0 flex-col items-center justify-center border-l border-gray-200 bg-white p-6 text-center">
        <Settings2 size={34} className="text-gray-300" />
        <h3 className="mt-3 text-sm font-semibold text-gray-800">
          No component selected
        </h3>
        <p className="mt-2 text-xs leading-5 text-gray-500">
          Select an element from the component library to edit its settings.
        </p>
      </aside>
    );
  }

  const isTextComponent =
    componentType === "button" ||
    componentType === "heading" ||
    componentType === "text" ||
    componentType === "card" ||
    componentType === "container" ||
    componentType === "badge" ||
  componentType === "link" ||
  componentType === "navbar" ||
  componentType === "hero" ||
  componentType === "list" ||
  componentType === "avatar";

  return (
    <aside className="flex h-full w-80 shrink-0 flex-col overflow-y-auto border-l border-gray-200 bg-white">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white p-4">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">
            Properties
          </h2>
          <p className="mt-1 text-xs capitalize text-gray-500">
            Editing: {componentType}
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          title="Reset properties"
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {isTextComponent && (
        <Section title="Content" icon={<Type size={15} />}>
          <Field label="Text content">
            <textarea
              rows={3}
              value={properties.text}
              onChange={(e) => update("text", e.target.value)}
              className={inputClass}
              placeholder="Enter component text"
            />
          </Field>

          {componentType === "container" && (
            <p className="text-xs text-gray-500">
              Container text is a preview label for now.
            </p>
          )}
        </Section>
      )}

      {componentType === "input" && (
        <Section title="Input settings" icon={<Type size={15} />}>
          <Field label="Placeholder">
            <input
              value={properties.placeholder}
              onChange={(e) => update("placeholder", e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Input type">
            <select
              value={properties.inputType}
              onChange={(e) => update("inputType", e.target.value)}
              className={inputClass}
            >
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="password">Password</option>
              <option value="number">Number</option>
              <option value="tel">Telephone</option>
              <option value="url">URL</option>
            </select>
          </Field>
        </Section>
      )}

      {(componentType === "image" || componentType === "avatar") && (
        <Section title="Image settings" icon={<ImageIcon size={15} />}>
          <Field label="Image URL">
            <input
              value={properties.imageUrl}
              onChange={(e) => update("imageUrl", e.target.value)}
              className={inputClass}
              placeholder="https://example.com/image.jpg"
            />
          </Field>

          <Field label="Alternative text">
            <input
              value={properties.altText}
              onChange={(e) => update("altText", e.target.value)}
              className={inputClass}
              placeholder="Describe the image"
            />
          </Field>
        </Section>
      )}

      <Section title="Appearance" icon={<Palette size={15} />}>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Background">
            <input
              type="color"
              value={properties.backgroundColor}
              onChange={(e) => update("backgroundColor", e.target.value)}
              className="h-10 w-full cursor-pointer rounded-lg border border-gray-200 p-1"
            />
          </Field>

          <Field label="Text color">
            <input
              type="color"
              value={properties.textColor}
              onChange={(e) => update("textColor", e.target.value)}
              className="h-10 w-full cursor-pointer rounded-lg border border-gray-200 p-1"
            />
          </Field>
        </div>

        <Field label="Border color">
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={properties.borderColor}
              onChange={(e) => update("borderColor", e.target.value)}
              className="h-9 w-12 cursor-pointer rounded border border-gray-200 p-1"
            />
            <span className="text-xs text-gray-500">
              {properties.borderColor}
            </span>
          </div>
        </Field>

        <Field label={`Opacity: ${properties.opacity}%`}>
          <input
            type="range"
            min="10"
            max="100"
            value={properties.opacity}
            onChange={(e) => update("opacity", Number(e.target.value))}
            className="w-full accent-blue-600"
          />
        </Field>

        <Field label="Shadow">
          <select
            value={properties.boxShadow}
            onChange={(e) => update("boxShadow", e.target.value)}
            className={inputClass}
          >
            <option value="none">None</option>
            <option value="0 1px 3px rgba(0,0,0,0.12)">Small</option>
            <option value="0 4px 12px rgba(0,0,0,0.12)">Medium</option>
            <option value="0 10px 25px rgba(0,0,0,0.15)">Large</option>
          </select>
        </Field>
      </Section>

      {isTextComponent && (
        <Section title="Typography" icon={<Type size={15} />}>
          <Field label="Font family">
            <select
              value={properties.fontFamily}
              onChange={(e) => update("fontFamily", e.target.value)}
              className={inputClass}
            >
              <option value="Arial">Arial</option>
              <option value="Inter, sans-serif">Inter</option>
              <option value="Georgia, serif">Georgia</option>
              <option value="'Times New Roman', serif">Times New Roman</option>
              <option value="'Courier New', monospace">Courier New</option>
            </select>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Font size">
              <input
                type="number"
                min="8"
                max="100"
                value={properties.fontSize}
                onChange={(e) =>
                  update("fontSize", Math.min(100, Math.max(8, Number(e.target.value) || 8)))
                }
                className={inputClass}
              />
            </Field>

            <Field label="Font weight">
              <select
                value={properties.fontWeight}
                onChange={(e) => update("fontWeight", e.target.value)}
                className={inputClass}
              >
                <option value="300">Light</option>
                <option value="400">Regular</option>
                <option value="500">Medium</option>
                <option value="600">Semibold</option>
                <option value="700">Bold</option>
                <option value="800">Extra bold</option>
              </select>
            </Field>
          </div>

          <Field label={`Line height: ${properties.lineHeight}`}>
            <input
              type="range"
              min="1"
              max="2.5"
              step="0.1"
              value={properties.lineHeight}
              onChange={(e) => update("lineHeight", Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </Field>

          <Field label={`Letter spacing: ${properties.letterSpacing}px`}>
            <input
              type="range"
              min="-2"
              max="10"
              step="0.5"
              value={properties.letterSpacing}
              onChange={(e) => update("letterSpacing", Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </Field>

          <Field label="Text alignment">
            <select
              value={properties.textAlign}
              onChange={(e) => update("textAlign", e.target.value)}
              className={inputClass}
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
              <option value="justify">Justify</option>
            </select>
          </Field>
        </Section>
      )}

      <Section title="Size and layout" icon={<Move size={15} />}>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Width">
            <input
              value={properties.width}
              onChange={(e) => update("width", e.target.value)}
              className={inputClass}
              placeholder="auto, 100%, 300px"
            />
          </Field>

          <Field label="Height">
            <input
              value={properties.height}
              onChange={(e) => update("height", e.target.value)}
              className={inputClass}
              placeholder="auto, 200px"
            />
          </Field>
        </div>

        <Field label="Display">
          <select
            value={properties.display}
            onChange={(e) => update("display", e.target.value)}
            className={inputClass}
          >
            <option value="block">Block</option>
            <option value="flex">Flex</option>
            <option value="inline-block">Inline block</option>
          </select>
        </Field>

        <Field label="Flex direction">
          <select
            value={properties.flexDirection}
            onChange={(e) => update("flexDirection", e.target.value)}
            className={inputClass}
          >
            <option value="row">Row</option>
            <option value="column">Column</option>
            <option value="row-reverse">Row reverse</option>
            <option value="column-reverse">Column reverse</option>
          </select>
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Justify content">
            <select
              value={properties.justifyContent}
              onChange={(e) => update("justifyContent", e.target.value)}
              className={inputClass}
            >
              <option value="flex-start">Start</option>
              <option value="center">Center</option>
              <option value="flex-end">End</option>
              <option value="space-between">Space between</option>
              <option value="space-around">Space around</option>
            </select>
          </Field>

          <Field label="Align items">
            <select
              value={properties.alignItems}
              onChange={(e) => update("alignItems", e.target.value)}
              className={inputClass}
            >
              <option value="stretch">Stretch</option>
              <option value="flex-start">Start</option>
              <option value="center">Center</option>
              <option value="flex-end">End</option>
            </select>
          </Field>
        </div>

        <Field label={`Gap: ${properties.gap}px`}>
          <input
            type="range"
            min="0"
            max="64"
            value={properties.gap}
            onChange={(e) => update("gap", Number(e.target.value))}
            className="w-full accent-blue-600"
          />
        </Field>
      </Section>

      <Section title="Spacing" icon={<Box size={15} />} defaultOpen={false}>
        <p className="text-xs font-medium text-gray-600">Padding (px)</p>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Top">
            <input
              type="number"
              min="0"
              value={properties.paddingTop}
              onChange={(e) => update("paddingTop", Math.max(0, Number(e.target.value)))}
              className={inputClass}
            />
          </Field>
          <Field label="Right">
            <input
              type="number"
              min="0"
              value={properties.paddingRight}
              onChange={(e) => update("paddingRight", Math.max(0, Number(e.target.value)))}
              className={inputClass}
            />
          </Field>
          <Field label="Bottom">
            <input
              type="number"
              min="0"
              value={properties.paddingBottom}
              onChange={(e) => update("paddingBottom", Math.max(0, Number(e.target.value)))}
              className={inputClass}
            />
          </Field>
          <Field label="Left">
            <input
              type="number"
              min="0"
              value={properties.paddingLeft}
              onChange={(e) => update("paddingLeft", Math.max(0, Number(e.target.value)))}
              className={inputClass}
            />
          </Field>
        </div>

        <p className="text-xs font-medium text-gray-600">Margin (px)</p>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Top">
            <input
              type="number"
              value={properties.marginTop}
              onChange={(e) => update("marginTop", Number(e.target.value))}
              className={inputClass}
            />
          </Field>
          <Field label="Right">
            <input
              type="number"
              value={properties.marginRight}
              onChange={(e) => update("marginRight", Number(e.target.value))}
              className={inputClass}
            />
          </Field>
          <Field label="Bottom">
            <input
              type="number"
              value={properties.marginBottom}
              onChange={(e) => update("marginBottom", Number(e.target.value))}
              className={inputClass}
            />
          </Field>
          <Field label="Left">
            <input
              type="number"
              value={properties.marginLeft}
              onChange={(e) => update("marginLeft", Number(e.target.value))}
              className={inputClass}
            />
          </Field>
        </div>
      </Section>

      <Section title="Border" icon={<Box size={15} />}>
        <Field label={`Border width: ${properties.borderWidth}px`}>
          <input
            type="range"
            min="0"
            max="12"
            value={properties.borderWidth}
            onChange={(e) => update("borderWidth", Number(e.target.value))}
            className="w-full accent-blue-600"
          />
        </Field>

        <Field label={`Border radius: ${properties.borderRadius}px`}>
          <input
            type="range"
            min="0"
            max="48"
            value={properties.borderRadius}
            onChange={(e) => update("borderRadius", Number(e.target.value))}
            className="w-full accent-blue-600"
          />
        </Field>
      </Section>

      {componentType === "button" && (
        <Section title="Button behavior" icon={<Settings2 size={15} />}>
          <label className="flex cursor-pointer items-center justify-between text-sm text-gray-700">
            Disabled
            <input
              type="checkbox"
              checked={properties.disabled}
              onChange={(e) => update("disabled", e.target.checked)}
              className="h-4 w-4 accent-blue-600"
            />
          </label>
        </Section>
      )}

      <div className="mt-auto border-t border-gray-200 p-4">
        <button
          type="button"
          onClick={onReset}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Reset all properties
        </button>
      </div>
    </aside>
  );
}
