
import { useState } from "react";
import {
  LayoutDashboard,
  Blocks,
  Settings,
  CircleHelp,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export type SidebarPage =
  | "Builder"
  | "Components"
  | "Settings"
  | "Help & Support";

interface SidebarProps {
  activePage: SidebarPage;
  onNavigate: (page: SidebarPage) => void;
}

const navigationItems = [
  { label: "Builder", icon: LayoutDashboard },
  { label: "Components", icon: Blocks },
  { label: "Settings", icon: Settings },
  { label: "Help & Support", icon: CircleHelp },
] as const;

export default function Sidebar({
  activePage,
  onNavigate,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`app-sidebar flex h-full shrink-0 flex-col border-r transition-all duration-200 ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      <div className="flex h-14 shrink-0 items-center justify-between border-b px-3">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Sparkles size={19} className="text-blue-500" />
            <span className="text-sm font-semibold">Workspace</span>
          </div>
        )}

        <button
          type="button"
          onClick={() => setCollapsed((value) => !value)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="app-icon-button rounded-lg border-0 p-2"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.label;

          return (
            <button
              key={item.label}
              type="button"
              title={collapsed ? item.label : undefined}
              aria-current={isActive ? "page" : undefined}
              onClick={() => onNavigate(item.label)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
                isActive
                  ? "bg-blue-600 font-medium text-white shadow-sm"
                  : "app-sidebar-link"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <Icon size={19} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="border-t p-4">
          <p className="text-xs font-semibold">UI-Maker</p>
          <p className="mt-1 text-xs opacity-60">
            AI-powered UI builder
          </p>
        </div>
      )}
    </aside>
  );
}
