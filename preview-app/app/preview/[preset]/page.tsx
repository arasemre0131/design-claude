import { notFound } from "next/navigation";
import PresetRenderer from "@/components/PresetRenderer";
import { loadPreset } from "@/lib/preset-loader";

export const dynamic = "force-dynamic";

export async function generateMetadata(props: {
  params: Promise<{ preset: string }>;
}) {
  const { preset: presetId } = await props.params;
  try {
    const p = loadPreset(presetId);
    return {
      title: `${p.id} · preview`,
      description: `${p.sector} × ${p.style} · ${p.tier} tier`,
    };
  } catch {
    return { title: "preset bulunamadi" };
  }
}

export default async function PreviewPage(props: {
  params: Promise<{ preset: string }>;
}) {
  const { preset: presetId } = await props.params;

  try {
    loadPreset(presetId);
  } catch {
    notFound();
  }

  return <PresetRenderer presetId={presetId} />;
}
