/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable valid-typeof */
/* eslint-disable no-empty */
import ReactFlow, {
  Background,
  BackgroundVariant,
  ConnectionLineType,
  useReactFlow,
} from "reactflow";
import { Toolbar } from "./components/Toolbar";
import { useReactFlowContext } from "./hooks/useReactFlowContext";
import colors from "tailwindcss/colors";
import { Header } from "./components/Header";
import { useCallback, useEffect, useState } from "react";
import { Rss, Save, Star, Workflow, X } from "lucide-react";
import { Button } from "./components/ui/button";
import { getQueryParam } from "./lib/query-params";
import { Textarea } from "./components/ui/textarea";

export function CreateFlowNode(
  nodeType: any,
  position?: { x: number; y: number }
) {
  const id = crypto.randomUUID();
  return {
    id,
    type: nodeType,
    data: {
      id,
    },
    position: position ?? { x: 0, y: 0 },
  };
}

const convertData: any = {
  'content': 'Conteúdo',
  'integration': 'Integração',
}

export function App() {
  const {
    edges,
    nodes,
    setNodes,
    setEdges,
    onConnect,
    NODE_TYPES,
    EDGE_TYPES,
    onEdgesChange,
    onNodesChangePosition,
  } = useReactFlowContext();

  const [nodeDataEditSelected, setNodeDataEditSelected] = useState<any>(null)

  const { setViewport, screenToFlowPosition, getNodes, getEdges } =
    useReactFlow();

  useEffect(() => {
    try {
      const flow = JSON.parse(
        localStorage.getItem("@flowbuilder:workflowDefinition") as string
      );

      if (!flow) return;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      if (!flow.viewport) return;

      const { x, y, zoom } = flow.viewport;

      setViewport({ x, y, zoom });
    } catch (error) {}
  }, [setEdges, setNodes, setViewport]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    if (!event.dataTransfer) return;

    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback((event: React.DragEvent) => {
    if (!event.dataTransfer) return;

    event.preventDefault();
    const taskType = event.dataTransfer.getData("application/reactflow");
    if (typeof taskType === undefined || !taskType) return;

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode = CreateFlowNode(taskType as any, position);
    setNodes((nds: any) => nds.concat(newNode));
  }, []);

  const isValidConnection: any = useCallback((isConnection: any) => {
    if (isConnection.source === isConnection.target) {
      return false;
    }

    const nodesData: any = getNodes();
    const edgesData: any = getEdges();

    const findNodeData = nodesData.find(
      (n: any) => n.id === isConnection.source
    );

    if (findNodeData) {
      const existingEdge: any = edgesData.find(
        (edge: any) =>
          edge.source === isConnection.source &&
          edge.target === isConnection.target
      );

      const sourceEdges = edgesData.filter(
        (edge: any) => edge.source === isConnection.source
      );

      switch (findNodeData.type) {
        case "initial":
          if (existingEdge) {
            return false;
          }

          if (sourceEdges.length > 0) {
            return false;
          }

          return true;
        case "content":
          if (existingEdge) {
            return false;
          }

          if (sourceEdges.length > 0) {
            return false;
          }

          return true;
        case "integration":
          if (existingEdge) {
            return false;
          }

          if (sourceEdges.length > 0) {
            return false;
          }

          return true;
        case "conditional":
          return true;
        default:
          return false;
      }
    } else {
      return false;
    }
  }, []);

  const nodeId = getQueryParam('nodeId')

  useEffect(() => {
    if (nodeId) {
      const nodeData = nodes.find((n: any) => n.id === nodeId)
      if (nodeData) {
        setNodeDataEditSelected(nodeData)
      }
    }
  }, [nodes])

  return (
    <>
        <div className="w-screen h-screen flex flex-col">
          <Header />

          <div className="flex w-full h-full">
            {nodeDataEditSelected && (
              <aside className="bg-zinc-50 border-r w-80 flex flex-col">
                <div className="flex items-center justify-between px-4 py-3 border-b">
                  <div className="flex items-center">
                    {nodeDataEditSelected.type === 'content' ? (
                      <Star className="text-red-500 fill-red-500 size-4 mr-2" />
                    ) : nodeDataEditSelected.type === 'integration' ? (
                      <Rss className="text-purple-500 size-4 mr-2" />
                    ) : (
                      <Workflow className="text-blue-500 fill-blue-500 size-4 mr-2" />
                    )}
                    <h2 className="tracking-tight font-semibold text-zinc-600">{convertData[nodeDataEditSelected.type]}</h2>
                  </div>

                  <Button type="button" size="icon" className="size-8" variant="outline">
                    <X className="size-4" />
                  </Button>
                </div>

                <div className="flex-1 px-4 py-3">
                  <div className="space-y-2">
                    <Textarea className="resize-none" />
                    <Button type="button" className="text-xs bg-blue-500 w-full" size="sm">
                      <Save className="size-4 mr-2" />
                      Salvar
                    </Button>
                  </div>
                </div>

                <div>adw</div>
              </aside>
            )}

            <div className="relative w-full h-full transition-all">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onNodesChange={onNodesChangePosition}
                nodeTypes={NODE_TYPES}
                edgeTypes={EDGE_TYPES}
                onConnect={onConnect}
                onDragOver={onDragOver}
                onDrop={onDrop}
                defaultEdgeOptions={{
                  type: "default",
                }}
                isValidConnection={isValidConnection}
                connectionLineType={ConnectionLineType.Bezier}
                connectionLineStyle={{
                  stroke: colors.zinc["400"],
                  strokeWidth: 3,
                  strokeDasharray: "10 10",
                  strokeDashoffset: "0",
                  animation: "dashAnimation 0.5s linear infinite",
                }}
              >
                <Background
                  gap={50}
                  color={colors.zinc[300]}
                  size={2}
                  variant={BackgroundVariant.Dots}
                />
              </ReactFlow>
              <Toolbar />
            </div>

            <div className="fixed right-0 bottom-0 bg-white z-50 w-20 h-10 pointer-events-none select-none" />
          </div>

        </div>
    </>
  );
}
