import Link from "next/link";
import type { Preset } from "@/lib/preset-loader";
import { loadPaletteAtom, loadTypographyAtom, resolvePaletteTokens, extractFontNames } from "@/lib/preset-loader";

type Props = {
  preset: Preset;
};

export default function PresetCard({ preset }: Props) {
  let colors, fonts, paletteName, typoName;
  try {
    const paletteAtom = loadPaletteAtom(preset.atoms.palette);
    const typoAtom = loadTypographyAtom(preset.atoms.typography);
    colors = resolvePaletteTokens(paletteAtom);
    fonts = extractFontNames(typoAtom);
    paletteName = paletteAtom.name || preset.atoms.palette;
    typoName = typoAtom.name || preset.atoms.typography;
  } catch {
    return (
      <div className="p-4 border border-red-300 rounded text-xs">
        <strong>{preset.id}</strong> — atom yukleme hatasi
      </div>
    );
  }

  return (
    <Link
      href={`/preview/${preset.id}`}
      className="block group relative overflow-hidden border transition-all hover:shadow-lg"
      style={{ borderColor: "var(--color-border)" }}
    >
      {/* Mini preview */}
      <div className="aspect-[4/3] p-4 flex flex-col justify-between" style={{ background: colors.bg, color: colors.ink, fontFamily: `"${fonts.body}"` }}>
        {/* Mini masthead */}
        <div className="flex justify-between items-start text-[9px] opacity-60 uppercase tracking-wider">
          <span>{preset.sector}</span>
          <span>{preset.tier}</span>
        </div>

        {/* Big title preview */}
        <div className="flex-1 flex items-center justify-center -mt-2">
          <div
            className="text-3xl leading-none text-center"
            style={{ fontFamily: `"${fonts.display}", serif`, letterSpacing: "-0.02em" }}
          >
            Aa
          </div>
        </div>

        {/* Palette swatches */}
        <div className="flex gap-1 pt-2">
          {[colors.bg, colors.ink, colors.accent, colors.secondary].map((c, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-sm"
              style={{ background: c, border: `1px solid ${colors.border}` }}
            />
          ))}
        </div>
      </div>

      {/* Metadata */}
      <div
        className="p-3 border-t"
        style={{
          borderColor: "var(--color-border)",
          background: "var(--color-canvas)",
          color: "var(--color-ink)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div className="font-mono text-xs truncate">{preset.id}</div>
        <div className="text-[10px] opacity-60 mt-1 truncate">
          {preset.atoms.palette} · {preset.atoms.typography}
        </div>
      </div>
    </Link>
  );
}
