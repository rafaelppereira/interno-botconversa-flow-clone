import { Handle, Position } from "reactflow";
import { Rocket, ChevronRight } from "lucide-react";

export function InitialNode() {
  return (
    <div className="border border-emerald-200 px-5 py-4 bg-emerald-50 rounded-md max-w-xs">
      <Handle
        id="right"
        type="source"
        position={Position.Right}
        className="-right-3 w-5 h-5 bg-blue-500 text-white flex items-center justify-items-center p-0 hover:brightness-75 transition-all"
      >
        <ChevronRight className="size-3 relative left-[3.6px] pointer-events-none" />
      </Handle>

      <div>
        <div className="text-zinc-800 font-semibold flex items-center text-lg">
          <Rocket className="text-emerald-500 size-5 mr-2" /> Bloco Inicial
        </div>
        <p className="text-zinc-600 mt-2 ">
          Seu fluxo começa por este bloco. <br /> Conecte-o com o outro bloco.
        </p>
      </div>
    </div>
  );
}
