import { ReactFlowContext } from "@/contexts/ReactFlowContext";
import { useContext } from "react";

export function useReactFlowContext() {
  const value = useContext(ReactFlowContext)
  return value
}