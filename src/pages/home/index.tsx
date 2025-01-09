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
import colors from "tailwindcss/colors";
import { useCallback, useEffect, useState } from "react";
import {
  AudioLines,
  CircleUserRound,
  Clock,
  Download,
  File,
  Image,
  List,
  Plus,
  Power,
  Rss,
  Save,
  Star,
  Text,
  Video,
  Workflow,
  X,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Slider } from "../../components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useReactFlowContext } from "@/hooks/useReactFlowContext";
import { Header } from "@/components/Header";
import { Toolbar } from "@/components/Toolbar";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

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
  content: "Conteúdo",
  integration: "Integração",
  menu: "Menu de opções",
};

export function HomePage() {
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

  const [searchParams, setSearchParams] = useSearchParams();

  const [nodeDataEditSelected, setNodeDataEditSelected] = useState<any>(null);

  const [contentDataList, setContentDataList] = useState<any>([
    {
      type: "text",
      content: "",
    },
  ]);

  const [menuDataList, setMenuDataList] = useState({
    questionMenu: "",
    titleMenu: "VER OPÇÕES",
    buttons: [],
  });

  function handleAddContentDataInList(type: string) {
    switch (type) {
      case "text":
        setContentDataList([
          ...contentDataList,
          {
            type,
            content: "",
          },
        ]);
        break;

      case "delay":
        setContentDataList([
          ...contentDataList,
          {
            type,
            delayValue: 0,
          },
        ]);
        break;
    }
  }

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

  const nodeId = searchParams.get("nodeId");

  useEffect(() => {
    if (nodeId) {
      const nodeData = nodes.find((n: any) => n.id === nodeId);
      if (nodeData) {
        setNodeDataEditSelected(nodeData);

        if (nodeData.data.steps) {
          setContentDataList(nodeData.data.steps);
        }

        if (nodeData.data.menuOptions) {
          setMenuDataList(nodeData.data.menuOptions);
        }
      }
    }
  }, [nodes, nodeId]);

  const handleSave = () => {
    if (!nodeDataEditSelected) return; // Verifica se há um node selecionado para editar

    if (nodeDataEditSelected.type === "content") {
      const updatedNodes = nodes.map((node: any) => {
        if (node.id === nodeDataEditSelected.id) {
          return {
            ...node,
            data: {
              ...node.data,
              steps: [...contentDataList],
            },
          };
        }
        return node;
      });

      setNodes(updatedNodes);
    }

    if (nodeDataEditSelected.type === "menu") {
      const updatedNodes = nodes.map((node: any) => {
        if (node.id === nodeDataEditSelected.id) {
          return {
            ...node,
            data: {
              ...node.data,
              menuOptions: menuDataList,
            },
          };
        }
        return node;
      });

      setNodes(updatedNodes);
    }

    toast.success("Conteúdo salvo com sucesso!");
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col">
        <Header />

        <div className="flex w-full h-full">
          {nodeDataEditSelected && (
            <aside className="bg-zinc-50 border-r w-[370px] flex flex-col h-full">
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <div className="flex items-center">
                  {nodeDataEditSelected.type === "content" ? (
                    <Star className="text-red-500 fill-red-500 size-4 mr-2" />
                  ) : nodeDataEditSelected.type === "menu" ? (
                    <List className="text-purple-500 fill-purple-500 size-4 mr-2" />
                  ) : nodeDataEditSelected.type === "integration" ? (
                    <Rss className="text-purple-500 size-4 mr-2" />
                  ) : (
                    <Workflow className="text-blue-500 fill-blue-500 size-4 mr-2" />
                  )}
                  <h2 className="tracking-tight font-semibold text-zinc-600">
                    {convertData[nodeDataEditSelected.type]}
                  </h2>
                </div>

                <Button
                  type="button"
                  size="icon"
                  className="size-8"
                  variant="outline"
                  onClick={() => {
                    setSearchParams((state) => {
                      state.delete("nodeId");
                      return state;
                    });
                    setNodeDataEditSelected(null);
                    setContentDataList([
                      {
                        type: "text",
                        content: "",
                      },
                    ]);
                  }}
                >
                  <X className="size-4" />
                </Button>
              </div>

              <div className="px-4 py-3 space-y-2 overflow-y-auto">
                <Button
                  type="button"
                  onClick={handleSave}
                  className="text-xs bg-blue-500 w-full"
                  size="sm"
                >
                  <Save className="size-4 mr-2" />
                  Salvar
                </Button>

                {nodeDataEditSelected.type === "content" &&
                  contentDataList.map((content: any, i: number) => {
                    if (content.type === "text") {
                      return (
                        <div key={i} className="space-y-2">
                          <Textarea
                            className="resize-none"
                            value={content.content}
                            onChange={(e) => {
                              const newContentDataList = [...contentDataList];
                              newContentDataList[i].content = e.target.value;
                              setContentDataList(newContentDataList);
                            }}
                          />

                          <div className="relative flex justify-center">
                            <h2 className="text-xs text-rose-400 bg-zinc-50 z-20 px-3">
                              Etapa de texto
                            </h2>
                            <div className="w-full absolute left-0 top-1/2 -translate-y-1/2 h-[2px] rounded-full bg-red-400" />
                          </div>
                        </div>
                      );
                    }

                    if (content.type === "delay") {
                      return (
                        <div
                          key={i}
                          className="bg-red-50 border border-red-200 rounded-md p-3"
                        >
                          <h2 className="text-rose-500 text-sm">
                            Atraso digitando
                          </h2>
                          <p className="text-zinc-500 text-xs font-medium tracking-tight">
                            Por favor selecione a duração do atraso
                          </p>

                          <div className="flex mt-3 items-center gap-2">
                            <Slider
                              max={10}
                              step={1}
                              value={[content.delayValue]}
                              onValueChange={(e) => {
                                const newContentDataList = [...contentDataList];
                                newContentDataList[i].delayValue = e[0];
                                setContentDataList(newContentDataList);
                              }}
                            />
                            <span className="text-zinc-500">
                              {content.delayValue || 0} seg
                            </span>
                          </div>
                        </div>
                      );
                    }
                  })}

                {nodeDataEditSelected.type === "menu" && (
                  <div className="flex flex-col gap-2">
                    <div className="space-y-1">
                      <Label className="text-zinc-600 text-sm">
                        Texto da pergunta
                      </Label>
                      <Textarea
                        className="resize-none"
                        value={menuDataList.questionMenu}
                        onChange={(e) => {
                          const newContentDataList: any = menuDataList;
                          console.log(newContentDataList);
                          newContentDataList.questionMenu = e.target.value;
                          setMenuDataList(newContentDataList);
                        }}
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-zinc-600 text-sm">
                        Título do botão
                      </Label>
                      <Textarea
                        className="resize-none"
                        value={menuDataList.titleMenu}
                        onChange={(e) => {
                          const newContentDataList: any = menuDataList;
                          newContentDataList.titleMenu = e.target.value;
                          setMenuDataList(newContentDataList);
                        }}
                      />
                    </div>

                    <div className="relative flex justify-center my-3">
                      <h2 className="text-xs text-blue-400 bg-zinc-50 z-20 px-3">
                        Respostas possíveis
                      </h2>
                      <div className="w-full absolute left-0 top-1/2 -translate-y-1/2 h-[2px] rounded-full bg-blue-400" />
                    </div>

                    <Button
                      size="sm"
                      type="button"
                      onClick={() => {
                        const newContentDataList: any = menuDataList;
                        newContentDataList.buttons = [...newContentDataList.buttons, { content: '' }];
                        setMenuDataList(newContentDataList);
                      }}
                      className="text-xs bg-blue-500 w-full"
                    >
                      <Plus className="size-4 mr-2" />
                      Adicionar nova resposta
                    </Button>

                    {menuDataList.buttons.map((b: any, i: number) => {
                      return (
                        <div key={i}>
                          <Textarea className="resize-none" />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {nodeDataEditSelected.type === "content" && (
                <div className="px-4 py-3 grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => handleAddContentDataInList("text")}
                    className="bg-red-50 border-dashed text-sm text-red-500 hover:brightness-90 transition-all border-2 border-red-200 rounded-md p-3 flex flex-col justify-center items-center gap-1"
                  >
                    <Text className="size-6 shrink-0" />
                    Texto
                  </button>

                  <button
                    type="button"
                    className="bg-red-50 border-dashed text-sm text-red-500 hover:brightness-90 transition-all border-2 border-red-200 rounded-md p-3 flex flex-col justify-center items-center gap-1"
                  >
                    <Image className="size-6 shrink-0" />
                    Imagem
                  </button>

                  <button
                    type="button"
                    className="bg-red-50 border-dashed text-sm text-red-500 hover:brightness-90 transition-all border-2 border-red-200 rounded-md p-3 flex flex-col justify-center items-center gap-1"
                  >
                    <Video className="size-6 shrink-0" />
                    Vídeo
                  </button>

                  <button
                    type="button"
                    className="bg-red-50 border-dashed text-sm text-red-500 hover:brightness-90 transition-all border-2 border-red-200 rounded-md p-3 flex flex-col justify-center items-center gap-1"
                  >
                    <File className="size-6 shrink-0" />
                    Arquivo
                  </button>

                  <button
                    type="button"
                    className="bg-red-50 border-dashed text-sm text-red-500 hover:brightness-90 transition-all border-2 border-red-200 rounded-md p-3 flex flex-col justify-center items-center gap-1"
                  >
                    <AudioLines className="size-6 shrink-0" />
                    Áudio
                  </button>

                  <button
                    type="button"
                    className="bg-red-50 border-dashed text-sm text-red-500 hover:brightness-90 transition-all border-2 border-red-200 rounded-md p-3 flex flex-col justify-center items-center gap-1"
                  >
                    <Download className="size-6 shrink-0" />
                    Salvar
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAddContentDataInList("delay")}
                    className="bg-red-50 border-dashed text-sm text-red-500 hover:brightness-90 transition-all border-2 border-red-200 rounded-md p-3 flex flex-col justify-center items-center gap-1"
                  >
                    <Clock className="size-6 shrink-0" />
                    Atraso
                  </button>

                  <button
                    type="button"
                    className="bg-red-50 border-dashed text-sm text-red-500 hover:brightness-90 transition-all border-2 border-red-200 rounded-md p-3 flex flex-col justify-center items-center gap-1"
                  >
                    <Power className="size-6 shrink-0" />
                    AutoOff
                  </button>

                  <button
                    type="button"
                    className="bg-red-50 border-dashed text-sm text-red-500 hover:brightness-90 transition-all border-2 border-red-200 rounded-md p-3 flex flex-col justify-center items-center gap-1"
                  >
                    <CircleUserRound className="size-6 shrink-0" />
                    Contato
                  </button>
                </div>
              )}
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
