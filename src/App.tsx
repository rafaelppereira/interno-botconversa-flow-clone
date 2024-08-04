import ReactFlow, { Controls } from "reactflow";
import { Toolbar } from "./components/Toolbar";
import { useReactFlowContext } from "./hooks/useReactFlowContext";

// Nodes: São os blocos
// Edges: São as conexões das linhas entre cada bloco

export function App() {
  const {
    edges,
    nodes,
    onConnect,
    NODE_TYPES,
    EDGE_TYPES,
    onEdgesChange,
    onNodesChangePosition,
  } = useReactFlowContext();

  return (
    <>
      <section className="w-screen h-screen flex">
        {/* <ContentEditable /> */}

        <div className="relative w-full h-full transition-all">
          <ReactFlow
            edges={edges}
            nodes={nodes}
            onConnect={onConnect}
            nodeTypes={NODE_TYPES}
            edgeTypes={EDGE_TYPES}
            onEdgesChange={onEdgesChange}
            onNodesChange={onNodesChangePosition}
            defaultEdgeOptions={{
              type: "default",
            }}
            fitView
          >
            <Controls />
          </ReactFlow>

          <Toolbar />
        </div>

        <div className="fixed right-0 bottom-0 bg-white z-50 w-20 h-10 pointer-events-none select-none" />
      </section>
    </>
  );
}
