import React from 'react';
import { TrendingUp, Percent, Layers, Package, PackageX, DollarSign, PiggyBank, Square } from 'lucide-react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  Tooltip, CartesianGrid,
} from 'recharts';
import { useProject } from '@/lib/ProjectContext';
import { areaInUnit } from '@/lib/geometry';

function MetricCard({ icon: Icon, label, value, sub, tone = 'green' }) {
  const tones = {
    green: 'bg-secondary-accent text-secondary-accent-foreground',
    amber: 'bg-alternate text-foreground',
    alert: 'bg-strong text-strong-foreground',
    slate: 'bg-card text-foreground',
  };
  return (
    <div className="bg-card rounded-2xl border border-border p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${tones[tone]}`}>
          <Icon className="w-4 h-4" />
        </span>
      </div>
      <div className="font-display text-2xl font-bold text-foreground">{value}</div>
      {sub && <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>}
    </div>
  );
}

export default function AnalyticsDashboard() {
  const { layout, baseline, material } = useProject();
  if (!layout) return null;

  const s = layout.stats;
  const b = baseline?.stats;
  const u = material.unit;
  const areaUnit = u === 'in' ? 'in²' : 'cm²';

  const utilizationData = [
    { name: 'Used', value: Number(s.utilization.toFixed(1)), color: 'var(--primary)' },
    { name: 'Waste', value: Number(s.waste.toFixed(1)), color: 'var(--muted-foreground)' },
  ];

  const beforeAfterUtil = [
    { name: 'Baseline', utilization: Number((b?.utilization || 0).toFixed(1)) },
    { name: 'Optimized', utilization: Number(s.utilization.toFixed(1)) },
  ];

  const costData = [
    { name: 'Baseline', cost: b?.totalCost || 0 },
    { name: 'Optimized', cost: s.totalCost },
  ];

  const sheetData = [
    { name: 'Baseline', sheets: b?.sheetsUsed || 0 },
    { name: 'Optimized', sheets: s.sheetsUsed },
  ];

  const savings = Math.max(0, (b?.totalCost || 0) - s.totalCost);
  const savedSheets = Math.max(0, (b?.sheetsUsed || 0) - s.sheetsUsed);

  return (
    <div className="space-y-4">
      {/* Metric cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard icon={Percent} label="Material utilization" value={`${s.utilization.toFixed(1)}%`} tone="green" />
        <MetricCard icon={TrendingUp} label="Waste" value={`${s.waste.toFixed(1)}%`} tone="amber" />
        <MetricCard icon={Layers} label="Sheets used" value={s.sheetsUsed} sub={`of ${material.sheetQuantity} available`} tone="slate" />
        <MetricCard icon={Package} label="Pieces placed" value={s.placedCount} sub={`of ${s.totalPieces} total`} tone="green" />
        <MetricCard icon={PackageX} label="Unplaced pieces" value={s.unplacedCount} tone={s.unplacedCount ? 'alert' : 'slate'} />
        <MetricCard icon={DollarSign} label="Material cost" value={`$${s.totalCost.toFixed(2)}`} sub={`$${material.pricePerSheet} / sheet`} tone="slate" />
        <MetricCard icon={PiggyBank} label="Estimated savings" value={`$${savings.toFixed(2)}`} sub={savedSheets ? `${savedSheets} fewer sheet${savedSheets > 1 ? 's' : ''}` : 'same sheet count'} tone={savings > 0 ? 'green' : 'slate'} />
        <MetricCard icon={Square} label="Leftover area" value={`${areaInUnit(s.leftoverArea, u).toFixed(0)} ${areaUnit}`} sub="geometric" tone="slate" />
      </div>

      {savings === 0 && (b?.sheetsUsed || 0) === s.sheetsUsed && (
        <div className="text-xs text-secondary-accent bg-card border border-border rounded-lg px-3 py-2">
          Both layouts use the same number of sheets, so material purchasing savings are $0 — even though packing efficiency improved.
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-2xl border border-border p-5">
          <h4 className="font-display font-semibold text-foreground mb-1">Utilization</h4>
          <p className="text-xs text-muted-foreground mb-3">Placed area vs. geometric leftover</p>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={utilizationData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={2}>
                  {utilizationData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-primary" /> Used {s.utilization.toFixed(1)}%</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-card" /> Waste {s.waste.toFixed(1)}%</span>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-5">
          <h4 className="font-display font-semibold text-foreground mb-1">Before / After utilization</h4>
          <p className="text-xs text-muted-foreground mb-3">Baseline vs. ScrapSmart optimized</p>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={beforeAfterUtil}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip formatter={(v) => `${v}%`} />
                <Bar dataKey="utilization" fill="var(--primary)" radius={[6, 6, 0, 0]} barSize={48} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-5">
          <h4 className="font-display font-semibold text-foreground mb-1">Cost comparison</h4>
          <p className="text-xs text-muted-foreground mb-3">Material purchasing cost</p>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={costData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip formatter={(v) => `$${Number(v).toFixed(2)}`} />
                <Bar dataKey="cost" radius={[6, 6, 0, 0]} barSize={48}>
                  <Cell fill="var(--primary-hover)" />
                  <Cell fill="var(--primary)" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-5">
          <h4 className="font-display font-semibold text-foreground mb-1">Sheet usage</h4>
          <p className="text-xs text-muted-foreground mb-3">Sheets required by each method</p>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sheetData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="sheets" radius={[6, 6, 0, 0]} barSize={48}>
                  <Cell fill="var(--primary-hover)" />
                  <Cell fill="var(--primary)" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
