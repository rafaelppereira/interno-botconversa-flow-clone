/* eslint-disable @typescript-eslint/no-explicit-any */
import { Handle, NodeProps, Position, useReactFlow } from "reactflow";
import { ChevronRight, Rocket } from "lucide-react";

export function InitialNode(props: NodeProps) {
  const { getNode, setCenter } = useReactFlow();

  return (
    <div
      onDoubleClick={() => {
        const node = getNode(props.id) as
          | {
              position?: { x: number; y: number };
              height: number;
              width: number;
            }
          | undefined;
        if (!node || !node.position) return;

        const { position, height, width } = node;
        const x = position.x + width! / 2;
        const y = position.y + height! / 2;

        if (!x || !y) return;
        setCenter(x, y, {
          zoom: 2,
          duration: 500,
        });
      }}
      className="border border-emerald-200 px-5 pt-4 pb-16 bg-emerald-50 rounded-xl max-w-xs"
    >
      <Handle
        id="right"
        type="source"
        position={Position.Right}
        className="z-[999] size-6 bg-emerald-500 text-white flex items-center justify-center p-0 hover:brightness-75 transition-all"
        style={{
          transform: "translate(30%, 160%)",
        }}
      >
        <ChevronRight className="size-4 relative left-[0.6px] pointer-events-none" />
      </Handle>

      <div>
        <div className="text-zinc-800 font-semibold flex items-center text-lg">
          <Rocket className="text-emerald-500 size-5 mr-2 fill-emerald-500" />{" "}
          Bloco Inicial
        </div>
        <p className="text-zinc-600 mt-2 ">
          Seu fluxo começa por este bloco. <br /> Conecte-o com o outro bloco.
        </p>
      </div>
    </div>
  );
}
