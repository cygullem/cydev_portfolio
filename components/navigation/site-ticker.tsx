import { tickerItems } from "@/lib/nav";

function TickerRow() {
  return (
    <ul className="flex shrink-0 items-center gap-8 pr-8">
      {tickerItems.map((item) => (
        <li
          key={item.text}
          className="flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-foreground/80"
        >
          {item.dir === "up" ? (
            <span className="text-hero-orange" aria-hidden>
              ▲
            </span>
          ) : null}
          {item.text}
        </li>
      ))}
    </ul>
  );
}

export function SiteTicker() {
  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-0 z-60 overflow-hidden border-b border-foreground/10 bg-[#f4efe6] py-2"
    >
      <div className="site-ticker-track flex w-max">
        <TickerRow />
        <TickerRow />
      </div>
    </div>
  );
}
