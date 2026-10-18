
import { useState } from "react";
import {
  Monitor,
  Smartphone,
  Tablet,
  Sparkles,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import type { CSSProperties } from "react";
import type { ComponentType } from "../ComponentLibrary/ComponentLibrary";
import type { ComponentProperties } from "../PropertiesPanel/PropertiesPanel";

type Viewport = "desktop" | "tablet" | "mobile";

interface CanvasProps {
  selectedComponent: ComponentType | null;
  properties: ComponentProperties;
}

const viewportWidths: Record<Viewport, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "390px",
};

export default function Canvas({
  selectedComponent,
  properties,
}: CanvasProps) {
  const [zoom, setZoom] = useState(1);
  const [viewport, setViewport] = useState<Viewport>("desktop");

  const changeZoom = (amount: number) => {
    setZoom((current) =>
      Math.min(
        1.5,
        Math.max(0.5, Math.round((current + amount) * 100) / 100)
      )
    );
  };

  const elementStyle: CSSProperties = {
    backgroundColor: properties.backgroundColor,
    color: properties.textColor,
    opacity: properties.opacity / 100,
    fontFamily: properties.fontFamily,
    fontSize: `${properties.fontSize}px`,
    fontWeight: properties.fontWeight as CSSProperties["fontWeight"],
    lineHeight: properties.lineHeight,
    letterSpacing: `${properties.letterSpacing}px`,
    textAlign: properties.textAlign as CSSProperties["textAlign"],
    width: properties.width,
    height: properties.height,
    display: properties.display as CSSProperties["display"],
    flexDirection: properties.flexDirection as CSSProperties["flexDirection"],
    justifyContent: properties.justifyContent as CSSProperties["justifyContent"],
    alignItems: properties.alignItems as CSSProperties["alignItems"],
    gap: `${properties.gap}px`,
    padding: `${properties.paddingTop}px ${properties.paddingRight}px ${properties.paddingBottom}px ${properties.paddingLeft}px`,
    margin: `${properties.marginTop}px ${properties.marginRight}px ${properties.marginBottom}px ${properties.marginLeft}px`,
    borderWidth: `${properties.borderWidth}px`,
    borderStyle: "solid",
    borderColor: properties.borderColor,
    borderRadius: `${properties.borderRadius}px`,
    boxShadow: properties.boxShadow,
    boxSizing: "border-box",
  };

  const renderSelectedComponent = () => {
    if (!selectedComponent) return null;

    switch (selectedComponent) {
      case "button":
        return (
          <button
            type="button"
            disabled={properties.disabled}
            style={elementStyle}
            className="max-w-full cursor-pointer disabled:cursor-not-allowed"
          >
            {properties.text}
          </button>
        );

      case "input":
        return (
          <input
            type={properties.inputType}
            placeholder={properties.placeholder}
            disabled={properties.disabled}
            style={{ ...elementStyle, textAlign: "left" }}
            className="max-w-full outline-none placeholder:text-gray-400"
          />
        );

      case "textarea":
        return (
          <textarea
            placeholder={properties.placeholder}
            disabled={properties.disabled}
            style={{ ...elementStyle, textAlign: "left" }}
            className="max-w-full resize-y outline-none"
            rows={4}
          />
        );

      case "select":
        return (
          <select style={elementStyle} className="max-w-full">
            <option>Select an option</option>
            <option>Option one</option>
            <option>Option two</option>
            <option>Option three</option>
          </select>
        );

      case "checkbox":
        return (
          <label className="flex items-center gap-2" style={{ color: properties.textColor }}>
            <input type="checkbox" disabled={properties.disabled} />
            <span style={{ fontSize: `${properties.fontSize}px` }}>
              {properties.text || "Accept terms and conditions"}
            </span>
          </label>
        );

      case "heading":
        return <h2 style={elementStyle}>{properties.text}</h2>;

      case "text":
        return <p style={elementStyle}>{properties.text}</p>;

      case "link":
        return (
          <a
            href="#preview"
            onClick={(event) => event.preventDefault()}
            style={{ ...elementStyle, color: properties.textColor }}
            className="underline underline-offset-4"
          >
            {properties.text || "Learn more"}
          </a>
        );

      case "card":
        return (
          <article style={elementStyle} className="max-w-full">
            <h3 className="font-semibold">{properties.text || "Card title"}</h3>
            <p className="mt-2 text-sm">
              Add your description or supporting content here.
            </p>
            <button
              type="button"
              className="mt-4 rounded-lg bg-blue-600 px-3 py-2 text-sm text-white"
            >
              Learn more
            </button>
          </article>
        );

      case "container":
        return (
          <div
            style={{
              ...elementStyle,
              minWidth: properties.width === "auto" ? "180px" : undefined,
              minHeight: properties.height === "auto" ? "100px" : undefined,
              borderStyle: "dashed",
            }}
          >
            {properties.text || "Container"}
          </div>
        );

      case "divider":
        return (
          <hr
            style={{
              width: properties.width === "auto" ? "100%" : properties.width,
              borderTop: `${Math.max(1, properties.borderWidth)}px solid ${properties.borderColor}`,
              margin: `${properties.marginTop}px 0 ${properties.marginBottom}px`,
            }}
          />
        );

      case "badge":
        return (
          <span style={{ ...elementStyle, display: "inline-flex" }}>
            {properties.text || "New"}
          </span>
        );

      case "avatar":
        return properties.imageUrl ? (
          <img
            src={properties.imageUrl}
            alt={properties.altText}
            style={{
              width: properties.width === "auto" ? "56px" : properties.width,
              height: properties.height === "auto" ? "56px" : properties.height,
              borderRadius: "9999px",
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            style={{
              ...elementStyle,
              width: "56px",
              height: "56px",
              borderRadius: "9999px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {(properties.text || "UI").slice(0, 2).toUpperCase()}
          </div>
        );

      case "image":
        return properties.imageUrl ? (
          <img
            src={properties.imageUrl}
            alt={properties.altText}
            style={{ ...elementStyle, objectFit: "cover" }}
            className="max-w-full"
          />
        ) : (
          <div
            style={{
              ...elementStyle,
              minWidth: "180px",
              minHeight: "120px",
            }}
            className="flex items-center justify-center"
          >
            Add an image URL in Properties
          </div>
        );

      case "navbar":
        return (
          <nav style={elementStyle} className="flex flex-wrap items-center justify-between gap-4">
            <strong>{properties.text || "Brand"}</strong>
            <div className="flex flex-wrap gap-4 text-sm">
              <a href="#home" onClick={(e) => e.preventDefault()}>Home</a>
              <a href="#about" onClick={(e) => e.preventDefault()}>About</a>
              <a href="#contact" onClick={(e) => e.preventDefault()}>Contact</a>
            </div>
          </nav>
        );

      case "hero":
        return (
          <section style={elementStyle} className="max-w-full">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest">Welcome</p>
            <h1 className="text-3xl font-bold">
              {properties.text || "Build something amazing"}
            </h1>
            <p className="mt-3 text-sm">Describe your product, service, or idea here.</p>
            <button
              type="button"
              className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white"
            >
              Get started
            </button>
          </section>
        );

      case "list":
        return (
          <ul style={elementStyle} className="list-disc pl-6">
            <li>{properties.text || "First item"}</li>
            <li>Second item</li>
            <li>Third item</li>
          </ul>
        );

      case "video":
        return (
          <div
            style={{ ...elementStyle, minWidth: "200px", minHeight: "140px" }}
            className="flex items-center justify-center"
          >
            Video placeholder
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="app-canvas flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      <div className="app-toolbar flex min-h-14 shrink-0 flex-wrap items-center justify-between gap-2 border-b px-3 sm:px-4">
        <div>
          <h2 className="text-sm font-semibold">Canvas</h2>
          <p className="text-xs text-gray-500">
            {viewport.charAt(0).toUpperCase() + viewport.slice(1)} preview
          </p>
        </div>

        <div className="flex items-center gap-1">
          {([
            ["desktop", Monitor, "Desktop"],
            ["tablet", Tablet, "Tablet"],
            ["mobile", Smartphone, "Mobile"],
          ] as const).map(([value, Icon, label]) => (
            <button
              key={value}
              type="button"
              title={`${label} preview`}
              aria-pressed={viewport === value}
              onClick={() => setViewport(value)}
              className={`rounded-lg p-2 transition ${
                viewport === value
                  ? "bg-blue-100 text-blue-700"
                  : "app-icon-button"
              }`}
            >
              <Icon size={17} />
            </button>
          ))}

          <div className="mx-1 h-6 border-l border-gray-200" />

          <button
            type="button"
            onClick={() => changeZoom(-0.1)}
            disabled={zoom <= 0.5}
            title="Zoom out"
            className="app-icon-button rounded-lg p-2 disabled:opacity-30"
          >
            <ZoomOut size={17} />
          </button>

          <button
            type="button"
            onClick={() => setZoom(1)}
            title="Reset zoom to 100%"
            className="app-icon-button min-w-12 rounded-lg px-1 py-2 text-xs font-medium"
          >
            {Math.round(zoom * 100)}%
          </button>

          <button
            type="button"
            onClick={() => changeZoom(0.1)}
            disabled={zoom >= 1.5}
            title="Zoom in"
            className="app-icon-button rounded-lg p-2 disabled:opacity-30"
          >
            <ZoomIn size={17} />
          </button>

          <button
            type="button"
            onClick={() => {
              setZoom(1);
              setViewport("desktop");
            }}
            title="Reset canvas view"
            className="app-icon-button rounded-lg p-2"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Only this region scrolls. The navbar and prompt stay fixed. */}
      <div className="canvas-scroll-area min-h-0 flex-1 overflow-auto p-4 sm:p-6">
        <div className="flex min-h-full min-w-0 justify-center">
          <div
            className="canvas-page shrink-0 rounded-xl border p-6 shadow-sm"
            style={{
              width: viewportWidths[viewport],
              maxWidth: viewport === "desktop" ? "1200px" : "none",
              minHeight: "500px",
              zoom,
            }}
          >
            {selectedComponent ? (
              <div className="flex min-h-[400px] items-start justify-center pt-12">
                <div className="max-w-full">
                  {renderSelectedComponent()}
                </div>
              </div>
            ) : (
              <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Sparkles size={26} />
                </div>
                <h3 className="mt-4 text-lg font-semibold">
                  Your canvas is ready
                </h3>
                <p className="mt-2 max-w-sm text-sm text-gray-500">
                  Select a component from the library to start designing.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
