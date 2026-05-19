type CapabilityRow = {
  domain: string;
  focus: string;
  signal: string;
};

type CapabilityMatrixProps = {
  rows: CapabilityRow[];
};

export default function CapabilityMatrix({ rows }: CapabilityMatrixProps) {
  return (
    <div className="glass-panel overflow-hidden rounded-xl bg-gl-surface-2">
      <div className="hidden grid-cols-[0.8fr_1.45fr_1.35fr] border-b border-gl-border px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-gl-text-faint sm:grid">
        <span>Domain</span>
        <span>Focus</span>
        <span>Strategies</span>
      </div>
      <div className="divide-y divide-gl-border">
        {rows.map((row) => (
          <div
            key={row.domain}
            className="grid gap-2 px-4 py-3 sm:grid-cols-[0.8fr_1.45fr_1.35fr] sm:gap-3"
          >
            <p className="text-sm font-medium text-gl-text">{row.domain}</p>
            <p className="text-sm text-gl-text-muted">{row.focus}</p>
            <p className="font-mono text-xs text-gl-primary">{row.signal}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
