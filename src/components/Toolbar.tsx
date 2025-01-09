/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlignVerticalSpaceBetween, List, Rss, Star, Workflow } from "lucide-react";
import { Button } from "./ui/button";
import { useReactFlow } from "reactflow";

import dagre from "dagre";
import { useReactFlowContext } from "@/hooks/useReactFlowContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export function Toolbar() {
  const { setCenter, getNodes, getEdges } = useReactFlow();
  const { setNodes } = useReactFlowContext();

  const onDragStart = (event: React.DragEvent, type: any) => {
    if (!event.dataTransfer) return;

    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  };

  const centerGraph = () => {
    const nodes = getNodes();

    if (nodes.length === 0) {
      console.warn("Nenhum nó encontrado para centralizar.");
      return;
    }

    const bounds = nodes.reduce(
      (acc, node) => {
        const nodeLeft = node.position.x;
        const nodeRight = node.position.x + (node.width || 0);
        const nodeTop = node.position.y;
        const nodeBottom = node.position.y + (node.height || 0);

        acc.minX = Math.min(acc.minX, nodeLeft);
        acc.maxX = Math.max(acc.maxX, nodeRight);
        acc.minY = Math.min(acc.minY, nodeTop);
        acc.maxY = Math.max(acc.maxY, nodeBottom);

        return acc;
      },
      { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity }
    );

    const centerX = (bounds.minX + bounds.maxX) / 2;
    const centerY = (bounds.minY + bounds.maxY) / 2;

    const graphWidth = bounds.maxX - bounds.minX;
    const graphHeight = bounds.maxY - bounds.minY;

    const margin = 100;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const zoomX = (viewportWidth - margin) / graphWidth;
    const zoomY = (viewportHeight - margin) / graphHeight;
    const zoom = Math.min(zoomX, zoomY, 1);

    setCenter(centerX, centerY, {
      duration: 500,
      zoom,
    });
  };

  const organizeGraph = () => {
    const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(
      () => ({})
    );
    dagreGraph.setGraph({
      rankdir: "LR",
      nodesep: 100,
      edgesep: 100,
      ranksep: 300,
    });

    const nodes = getNodes();
    const edges = getEdges();

    nodes.forEach((node) => {
      const element = document.querySelector(`[data-id="${node.id}"]`);
      const rect = element?.getBoundingClientRect();

      dagreGraph.setNode(node.id, {
        width: rect?.width || 150,
        height: rect?.height || 50,
      });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const updatedNodes = nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      return {
        ...node,
        position: {
          x: nodeWithPosition.x - (nodeWithPosition.width || 0) / 2,
          y: nodeWithPosition.y - (nodeWithPosition.height || 0) / 2,
        },
        positionAbsolute: {
          x: nodeWithPosition.x - (nodeWithPosition.width || 0) / 2,
          y: nodeWithPosition.y - (nodeWithPosition.height || 0) / 2,
        },
      };
    });

    setNodes(updatedNodes);
  };

  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-10 flex">
      <div className="bg-white rounded-l-2xl border border-zinc-300 h-20 px-5 shrink-0 flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={centerGraph}
                type="button"
                variant="outline"
                size="icon"
              >
                <AlignVerticalSpaceBetween className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Visualizar fluxo completo</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={organizeGraph}
                type="button"
                variant="outline"
                size="icon"
              >
                <Workflow className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Organizar fluxo automaticamente</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className=" flex gap-2 bg-white shadow-lg border border-zinc-300 px-8 h-20 overflow-hidden rounded-r-2xl">
        <button
          draggable
          type="button"
          onDragStart={(event) => onDragStart(event, "content")}
          className="mt-4 w-32 h-32 bg-red-50/50 border border-red-200 rounded hover:-translate-y-2 transition-all flex justify-center"
        >
          <span className="text-zinc-600 mt-2 inline-flex items-center">
            {" "}
            <Star className="size-3 mr-1 text-red-500" /> Conteúdo
          </span>
        </button>

        <button
          draggable
          type="button"
          onDragStart={(event) => onDragStart(event, "menu")}
          className="mt-4 w-32 h-32 bg-purple-50/50 border border-purple-200 rounded hover:-translate-y-2 transition-all flex justify-center"
        >
          <span className="text-zinc-600 mt-2 inline-flex items-center">
            {" "}
            <List className="size-3 mr-1 text-purple-500" /> Menu
          </span>
        </button>

        <button
          draggable
          type="button"
          onDragStart={(event) => onDragStart(event, "integration")}
          className="mt-4 w-32 h-32 bg-pink-50/50 border border-pink-200 rounded hover:-translate-y-2 transition-all flex justify-center"
        >
          <span className="text-zinc-600 mt-2 inline-flex items-center">
            {" "}
            <Rss className="size-3 mr-1 text-pink-500" /> Integração
          </span>
        </button>

        <button
          draggable
          type="button"
          onDragStart={(event) => onDragStart(event, "conditional")}
          className="mt-4 w-32 h-32 bg-blue-50/50 border border-blue-200 rounded hover:-translate-y-2 transition-all flex justify-center"
        >
          <span className="text-zinc-600 mt-2 inline-flex items-center">
            {" "}
            <Workflow className="size-3 mr-1 text-blue-500" /> Condição
          </span>
        </button>
      </div>
    </div>
  );
}
