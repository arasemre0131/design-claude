import { notFound } from "next/navigation";
import PresetRenderer from "@/components/PresetRenderer";
import { listPresets, loadPreset } from "@/lib/preset-loader";

export async function generateStaticParams() {
  return listPresets().map((id) => ({ preset: id }));
}

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
