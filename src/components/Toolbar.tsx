import { useReactFlowContext } from "@/hooks/useReactFlowContext";
import { Menu, Rss, Star } from "lucide-react";

export function Toolbar() {
  const { addSquareNode } = useReactFlowContext()

  return (
    <div className="absolute flex gap-2 left-1/2 -translate-x-1/2 bottom-10 bg-white shadow-lg border border-zinc-300 px-8 h-20 w-[500px] overflow-hidden rounded-2xl">
      <button
        type="button"
        onClick={() => addSquareNode("content")}
        className="mt-4 w-32 h-32 bg-red-50/50 border border-red-200 rounded hover:-translate-y-2 transition-all flex justify-center"
      >
        <span className="text-zinc-600 mt-2 inline-flex items-center">
          {" "}
          <Star className="size-3 mr-1 text-red-500" /> Conteúdo
        </span>
      </button>

      <button
        type="button"
        onClick={() => addSquareNode("menu")}
        className="mt-4 w-32 h-32 bg-blue-50/50 border border-blue-200 rounded hover:-translate-y-2 transition-all flex justify-center"
      >
        <span className="text-zinc-600 mt-2 inline-flex items-center">
          <Menu className="mr-1 size-3 text-blue-500" /> Menu
        </span>
      </button>

      <button
        type="button"
        onClick={() => addSquareNode("integration")}
        className="mt-4 w-32 h-32 bg-purple-50/50 border border-purple-200 rounded hover:-translate-y-2 transition-all flex justify-center"
      >
        <span className="text-zinc-600 mt-2 inline-flex items-center">
          <Rss className="mr-1 size-3 text-purple-500" /> Integração
        </span>
      </button>
    </div>
  );
}
