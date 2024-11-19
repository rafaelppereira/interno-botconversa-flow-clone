/* eslint-disable react-hooks/exhaustive-deps */
import { Loader2, RefreshCcw, Save, SquareDashedMousePointer } from "lucide-react";
import { Button } from "./ui/button";
import { useReactFlow } from "reactflow";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { useCallback, useEffect, useState } from "react";
import { useReactFlowContext } from "@/hooks/useReactFlowContext";
import { ClearFlowAlertDialog } from "./clear-flow-alert-dialog";

export function Header() {
  const { nodes, edges } = useReactFlowContext()
  const { toObject } = useReactFlow();
  const [flowStatus, setFlowStatus] = useState("save");
  const [savedFlow, setSavedFlow] = useState(
    () =>
      JSON.parse(
        localStorage.getItem("@flowbuilder:workflowDefinition") || "{}"
      )
  );

  const [isLoadingStatus, setIsLoadingStatus] = useState(true)

  const updateFlowStatus = useCallback(() => {
    const currentFlow = toObject();
    const isSame = JSON.stringify(currentFlow) === JSON.stringify(savedFlow);

    setFlowStatus(isSame ? "save" : "unsave");
  }, [savedFlow, toObject]);

  useEffect(() => {
    updateFlowStatus();
  }, [nodes, edges]);
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoadingStatus(false)
    }, 500)
  }, [])

  const handleSave = () => {
    const workflowDefinition = toObject();
    localStorage.setItem(
      "@flowbuilder:workflowDefinition",
      JSON.stringify(workflowDefinition)
    );
    setSavedFlow(workflowDefinition);
    toast.success("Fluxo salvo com sucesso!");
    setFlowStatus("save");
  };

  return (
    <header className="h-20 bg-zinc-50 border-b">
      <div className="px-10 h-20 flex items-center justify-between">
        <a href="/" className="text-2xl font-extrabold flex items-center gap-2">
          <div className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-2">
            <SquareDashedMousePointer size={20} className="stroke-white" />
          </div>
          <div>
            <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
              Flow
            </span>
            <span className="text-stone-700 dark:text-stone-300">Builder</span>
          </div>
        </a>

        <div className="flex items-center gap-2">
          {isLoadingStatus ? (
            <Loader2 className="size-4 animate-spin text-zinc-600" />
          ) : flowStatus === "save" ? (
            <Badge className="bg-emerald-500">Fluxo salvo</Badge>
          ) : (
            <Badge className="bg-rose-500">Fluxo com alterações</Badge>
          )}

          <Button
            type="button"
            size="icon"
            variant="outline"
            className="text-zinc-600"
            onClick={() => window.location.reload()}
          >
            <RefreshCcw className="size-4" />
          </Button>

        <ClearFlowAlertDialog />

          <Button
            variant={"outline"}
            onClick={handleSave}
            className="flex items-center gap-2 text-zinc-600"
          >
            <Save size={16} />
            Salvar fluxo
          </Button>
        </div>
      </div>
    </header>
  );
}
