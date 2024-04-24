// Node
export type Node<T = any> = {
  id: string;
  data: T;
  type: string;
};

// Edge
export type Edge = {
  id: string;
  source: string;
  sourceHandle?: string | null;
  target: string;
  targetHandle?: string | null;
};

// ReactFlowJsonObject
export type ReactFlowJsonObject<NodeType extends Node = Node> = {
  nodes: NodeType[];
  edges: Edge[];
};
