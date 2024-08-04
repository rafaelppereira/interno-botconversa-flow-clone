import { Handle, Position } from "reactflow";
import { Rss, ChevronRight, Trash, Copy } from "lucide-react";

export function IntegrationNode() {
  return (
    <div className="border border-purple-200 px-5 py-4 bg-purple-50 rounded-md max-w-xs group">
      <Handle
        id="left"
        type="target"
        position={Position.Left}
        className="-left-3 w-5 h-5 bg-blue-500 text-white flex items-center justify-items-center p-0 hover:brightness-75 transition-all"
      >
        <ChevronRight className="size-3 relative left-[3.6px] pointer-events-none" />
      </Handle>

      <Handle
        id="right"
        type="source"
        position={Position.Right}
        className="-right-3 w-5 h-5 bg-blue-500 text-white flex items-center justify-items-center p-0 hover:brightness-75 transition-all"
      >
        <ChevronRight className="size-3 relative left-[3.6px] pointer-events-none" />
      </Handle>

      <div>
        <div className="flex items-center justify-between">
          <div className="text-zinc-800 font-semibold flex items-center text-lg">
            <Rss className="text-purple-500 size-5 mr-2" /> Integração
          </div>
          <div className="opacity-0 group-hover:opacity-100 invisible group-hover:visible space-x-2 transition-all">
            <button type="button">
              <Trash className="size-4 text-zinc-700 hover:text-red-500 transition-all" />
            </button>
            <button type="button">
              <Copy className="size-4 text-zinc-700 hover:text-green-500 transition-all" />
            </button>
          </div>
        </div>
        <p className="text-zinc-600 mt-2">
          Adicione uma integração para sua etapa. Assim personalize seu fluxo.
        </p>
      </div>
    </div>
  );
}
