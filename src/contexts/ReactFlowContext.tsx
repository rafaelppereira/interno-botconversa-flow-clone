/* eslint-disable @typescript-eslint/no-explicit-any */
import { DefaultEdge } from "@/components/edges/DefaultEdge";
import { ConditionalNode } from "@/components/nodes/ConditionalNode";
import { ContentNode } from "@/components/nodes/ContentNode";
import { InitialNode } from "@/components/nodes/InitialNode";
import { IntegrationNode } from "@/components/nodes/IntegrationNode";
import { MenuNode } from "@/components/nodes/menu-node";
import { ReactNode, createContext, useCallback } from "react";
import { Connection, Node, NodeChange, addEdge, useEdgesState, useNodesState } from "reactflow";

interface ReactFlowProviderProps {
  children: ReactNode
}

export const INITIAL_NODES = [
  {
    type: "initial",
    data: { id: crypto.randomUUID() },
    position: { x: 100, y: 100 },
    id: String(crypto.randomUUID()),
  },
] satisfies Node[];

const NODE_TYPES = {
  initial: InitialNode,
  content: ContentNode,
  menu: MenuNode,
  conditional: ConditionalNode,
  integration: IntegrationNode,
};
const EDGE_TYPES = {
  default: DefaultEdge,
};

interface ReactFlowContextData {
  edges: any
  nodes: any
  setNodes: any
  setEdges: any
  onConnect: any
  NODE_TYPES: any
  EDGE_TYPES: any
  removeNode: any
  addSquareNode: any
  onNodesChange: any
  onEdgesChange: any
  onNodesChangePosition: any
}

export const ReactFlowContext = createContext({} as ReactFlowContextData)

export function ReactFlowProvider({ children }: ReactFlowProviderProps) {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);

  const onConnect = useCallback((connection: Connection) => {
    return setEdges((edges) => addEdge(connection, edges));
  }, []);

  function addSquareNode(type: string) {
    const id = crypto.randomUUID();

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
    const updateEdgeList = edges.filter(edge => edge.target !== nodeId || edge.source !== nodeId)
    setNodes(updateNodeList);
    setEdges(updateEdgeList)
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
      setNodes,
      setEdges,
      onConnect,
      NODE_TYPES,
      removeNode,
      EDGE_TYPES,
      addSquareNode,
      onNodesChange,
      onEdgesChange,
      onNodesChangePosition,
    }}>
      {children}
    </ReactFlowContext.Provider>
  )
}