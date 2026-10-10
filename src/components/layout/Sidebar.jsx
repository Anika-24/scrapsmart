import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FolderOpen, BookOpen, ScanLine,
  GitCompare, Settings as SettingsIcon, Leaf, ChevronLeft, ChevronRight,
} from 'lucide-react';

const NAV = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/saved', label: 'Saved Projects', icon: FolderOpen },
  { to: '/materials-guide', label: 'Materials Guide', icon: BookOpen },
  { to: '/scanner', label: 'Scrap Scanner', icon: ScanLine },
  { to: '/compare', label: 'Compare Layouts', icon: GitCompare },
  { to: '/settings', label: 'Settings', icon: SettingsIcon },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={`${collapsed ? 'w-20' : 'w-64'} shrink-0 transition-all duration-300 flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border relative`}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 h-20 border-b border-sidebar-border">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary-accent flex items-center justify-center shadow-lg shrink-0">
          <Leaf className="w-5 h-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="leading-tight">
            <div className="font-display font-bold text-lg tracking-tight">ScrapSmart</div>
            <div className="text-[11px] text-sidebar-foreground/70 font-medium">Cut smarter. Waste less.</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV.map(({ to, label, icon: Icon }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              title={collapsed ? label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active ? 'bg-primary text-primary-foreground' : 'text-sidebar-foreground/70 hover:bg-sidebar-hover hover:text-sidebar-foreground'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="px-5 py-4 border-t border-sidebar-border bg-sidebar-footer text-sidebar-footer-foreground">
          <p className="text-[11px] text-sidebar-footer-foreground/70 italic leading-snug">
            Less waste today.<br />More resources tomorrow.
          </p>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="absolute -right-3 top-24 w-6 h-6 rounded-full bg-card border border-border text-secondary-accent flex items-center justify-center shadow-md hover:bg-card transition-colors"
      >
        {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
      </button>
    </aside>
  );
}
