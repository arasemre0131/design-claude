type Props = {
  left?: string;
  right?: string;
};

export default function SplitView({ left, right }: Props) {
  return (
    <div className="grid grid-cols-2 h-screen w-screen fixed inset-0">
      <div className="border-r border-black/10 overflow-hidden">
        {left ? (
          <iframe
            src={`/preview/${left}`}
            className="w-full h-full border-0"
            title={left}
          />
        ) : (
          <EmptyHalf side="left" />
        )}
      </div>
      <div className="overflow-hidden">
        {right ? (
          <iframe
            src={`/preview/${right}`}
            className="w-full h-full border-0"
            title={right}
          />
        ) : (
          <EmptyHalf side="right" />
        )}
      </div>
    </div>
  );
}

function EmptyHalf({ side }: { side: "left" | "right" }) {
  return (
    <div className="flex items-center justify-center h-full text-sm opacity-50">
      <div>
        <div className="font-mono mb-2">?{side === "left" ? "a" : "b"}=&lt;preset-id&gt;</div>
        <a href="/gallery" className="underline">gallery'den sec</a>
      </div>
    </div>
  );
}
