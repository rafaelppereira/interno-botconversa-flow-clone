/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Handle, NodeProps, Position, useReactFlow } from "reactflow";
import { Star, ChevronRight, Trash, Pencil } from "lucide-react";
import { useReactFlowContext } from "@/hooks/useReactFlowContext";
import { useSearchParams } from "react-router-dom";

export function ContentNode(props: NodeProps) {
  const { removeNode } = useReactFlowContext();
  const { getNode, setCenter } = useReactFlow();

  const [_, setSearchParams] = useSearchParams();

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
      className={`${props.data.steps ? 'pb-4' : 'pb-16'} border border-red-200 px-5 pt-4 bg-red-50 rounded-xl max-w-xs group`}
    >
      <Handle
        id="left"
        type="target"
        position={Position.Left}
        className="z-[999] size-6 bg-white text-blue-500 border border-blue-500 flex items-center justify-center p-0 hover:brightness-75 transition-all"
        style={{
          transform: "translate(-30%, -300%)",
        }}
      >
        <ChevronRight className="size-4 relative left-[0.6px] pointer-events-none" />
      </Handle>

      <Handle
        id="right"
        type="source"
        position={Position.Right}
        className="z-[999] size-6 bg-red-500 text-white flex items-center justify-center p-0 hover:brightness-75 transition-all"
        style={{
          transform: "translate(30%, 160%)",
        }}
      >
        <ChevronRight className="size-4 relative left-[0.6px] pointer-events-none" />
      </Handle>

      <div>
        <div className="flex items-center justify-between">
          <div className="text-zinc-800 font-semibold flex items-center text-lg">
            <Star className="text-red-500 size-5 mr-2 fill-red-500" /> Conteúdo
          </div>
          <div className="opacity-0 group-hover:opacity-100 invisible group-hover:visible space-x-2 transition-all">
            <button
              type="button"
              onClick={() => {
                setSearchParams((state) => {
                  state.set("nodeId", props.id);
                  return state;
                });
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
            >
              <Pencil className="size-4 text-zinc-700 hover:text-emerald-500 transition-all" />
            </button>
            <button type="button" onClick={() => removeNode(props.id)}>
              <Trash className="size-4 text-zinc-700 hover:text-red-500 transition-all" />
            </button>
          </div>
        </div>
        <p className="text-zinc-600 mt-2">
          Adicione um conteúdo para sua etapa. Assim personalize seu fluxo.
        </p>

        {props.data.steps && (
          <div>
            {props.data.steps.map((step: any) => {
              if (step.type === "text") {
                return (
                  <div className="bg-red-100 mt-3 rounded-md p-3 text-zinc-600">
                    {step.content}
                  </div>
                );
              }

              if (step.type === "delay") {
                return (
                  <div className="bg-red-100 mt-3 rounded-md p-3 text-zinc-600">
                    <h2 className="text-rose-500 text-sm">Atraso</h2>
                    <p className="text-zinc-500 text-sm font-medium tracking-tight">
                      Digitando {step.delayValue} segundos
                    </p>
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
}
