/* eslint-disable @typescript-eslint/no-explicit-any */
import { DefaultEdge } from "@/components/edges/DefaultEdge";
import { ContentNode } from "@/components/nodes/ContentNode";
import { InitialNode } from "@/components/nodes/InitialNode";
import { IntegrationNode } from "@/components/nodes/IntegrationNode";
import { MenuNode } from "@/components/nodes/MenuNode";
import { ReactNode, createContext, useCallback } from "react";
import { Connection, Node, NodeChange, addEdge, useEdgesState, useNodesState } from "reactflow";

interface ReactFlowProviderProps {
  children: ReactNode
}

const INITIAL_NODES = [
  {
    type: "initial",
    data: { id: "" },
    position: { x: 100, y: 100 },
    id: String(crypto.randomUUID()),
  },
] satisfies Node[];

const NODE_TYPES = {
  initial: InitialNode,
  content: ContentNode,
  menu: MenuNode,
  integration: IntegrationNode,
};
const EDGE_TYPES = {
  default: DefaultEdge,
};

interface ReactFlowContextData {
  edges: any
  nodes: any
  onConnect: any
  NODE_TYPES: any
  EDGE_TYPES: any
  removeNode: any
  addSquareNode: any
  onEdgesChange: any
  nodesLocalStorage: any
  onNodesChangePosition: any
}

export const ReactFlowContext = createContext({} as ReactFlowContextData)

export function ReactFlowProvider({ children }: ReactFlowProviderProps) {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);

  const onConnect = useCallback((connection: Connection) => {
    return setEdges((edges) => addEdge(connection, edges));
  }, []);

  const nodesLocalStorage = JSON.parse(
    String(localStorage.getItem("@botconversa:nodes"))
  );

  function addSquareNode(type: string) {
    const id = crypto.randomUUID();

    localStorage.setItem(
      "@botconversa:nodes",
      JSON.stringify([
        ...nodes,
        {
          type,
          id,
          position: { x: 0, y: 0 },
          data: { id },
        },
      ])
    );

    setNodes((nodes) => [
      ...nodes,
      {
        type,
        id,
        position: { x: 0, y: 0 },
        data: { id },
      },
    ]);
  }

  function removeNode(nodeId: string) {
    const updateNodeList = nodes.filter(node => node.id !== nodeId)
    setNodes(updateNodeList);
  }

  function onNodesChangePosition(data: NodeChange[] | undefined) {
    if (data) {
      onNodesChange(data);
    }
  }
  
  return (
    <ReactFlowContext.Provider value={{
      edges,
      nodes,
      onConnect,
      NODE_TYPES,
      removeNode,
      EDGE_TYPES,
      addSquareNode,
      onEdgesChange,
      nodesLocalStorage,
      onNodesChangePosition,
    }}>
      {children}
    </ReactFlowContext.Provider>
  )
}