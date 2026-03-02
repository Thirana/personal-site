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
    <div className="overflow-hidden rounded-xl bg-panel/30">
      <div className="hidden grid-cols-[0.8fr_1.45fr_1.35fr] border-b border-border/70 px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-neutral-400 sm:grid">
        <span>Domain</span>
        <span>Focus</span>
        <span>Strategies</span>
      </div>
      <div className="divide-y divide-border/60">
        {rows.map((row) => (
          <div
            key={row.domain}
            className="grid gap-2 px-4 py-3 sm:grid-cols-[0.8fr_1.45fr_1.35fr] sm:gap-3"
          >
            <p className="text-sm font-medium text-neutral-100">{row.domain}</p>
            <p className="text-sm text-neutral-300">{row.focus}</p>
            <p className="font-mono text-xs text-neutral-200">{row.signal}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
