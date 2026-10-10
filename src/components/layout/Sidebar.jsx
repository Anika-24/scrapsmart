import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
<<<<<<< HEAD
  LayoutDashboard, FolderOpen, BookOpen, ScanLine,
  GitCompare, Settings as SettingsIcon, Leaf, ChevronLeft, ChevronRight,
} from 'lucide-react';
=======
  LayoutDashboard, FilePlus2, FolderOpen, BookOpen, ScanLine,
  GitCompare, Settings as SettingsIcon, Leaf, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { useProject } from '@/lib/ProjectContext';
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad

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
<<<<<<< HEAD

  return (
    <aside
      className={`${collapsed ? 'w-20' : 'w-64'} shrink-0 transition-all duration-300 flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border relative`}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 h-20 border-b border-sidebar-border">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary-accent flex items-center justify-center shadow-lg shrink-0">
          <Leaf className="w-5 h-5 text-primary-foreground" />
=======
  const { resetDemo, loadDemo } = useProject();

  return (
    <aside
      className={`${collapsed ? 'w-20' : 'w-64'} shrink-0 transition-all duration-300 flex flex-col bg-[#123D26] text-white relative`}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 h-20 border-b border-white/10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#16A34A] to-[#15803D] flex items-center justify-center shadow-lg shrink-0">
          <Leaf className="w-5 h-5 text-white" />
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
        </div>
        {!collapsed && (
          <div className="leading-tight">
            <div className="font-display font-bold text-lg tracking-tight">ScrapSmart</div>
<<<<<<< HEAD
            <div className="text-[11px] text-sidebar-foreground/70 font-medium">Cut smarter. Waste less.</div>
=======
            <div className="text-[11px] text-emerald-200/70 font-medium">Cut smarter. Waste less.</div>
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
<<<<<<< HEAD
=======
        <button
          onClick={loadDemo}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium bg-[#16A34A] hover:bg-[#15803D] transition-colors mb-2 ${collapsed ? 'justify-center' : ''}`}
        >
          <FilePlus2 className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Load Demo Project</span>}
        </button>
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
        {NAV.map(({ to, label, icon: Icon }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              title={collapsed ? label : undefined}
<<<<<<< HEAD
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium transition-colors duration-150 ${
                active ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm' : 'text-sidebar-foreground/75 hover:bg-sidebar-hover hover:text-sidebar-foreground'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              {active && <span aria-hidden="true" className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-primary" />}
=======
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active ? 'bg-white/10 text-white' : 'text-emerald-100/70 hover:bg-white/5 hover:text-white'
              } ${collapsed ? 'justify-center' : ''}`}
            >
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
              <Icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
<<<<<<< HEAD
        <div className="px-5 py-4 border-t border-sidebar-border bg-sidebar-footer text-sidebar-footer-foreground">
          <p className="text-[11px] text-sidebar-footer-foreground italic leading-snug">
=======
        <div className="px-5 py-4 border-t border-white/10">
          <p className="text-[11px] text-emerald-200/50 italic leading-snug">
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
            Less waste today.<br />More resources tomorrow.
          </p>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
<<<<<<< HEAD
        className="absolute -right-3 top-24 w-6 h-6 rounded-full bg-[var(--sidebar-toggle)] border border-sidebar-border text-sidebar-foreground flex items-center justify-center shadow-md hover:bg-sidebar-hover transition-colors duration-150"
=======
        className="absolute -right-3 top-24 w-6 h-6 rounded-full bg-white border border-[#E2E8E4] text-[#123D26] flex items-center justify-center shadow-md hover:bg-emerald-50 transition-colors"
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
      >
        {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
      </button>
    </aside>
  );
}
