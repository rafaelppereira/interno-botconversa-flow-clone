import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Input } from "./ui/input";
import { useReactFlowContext } from "@/hooks/useReactFlowContext";
import { useReactFlow } from "reactflow";
import { INITIAL_NODES } from "@/contexts/ReactFlowContext";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

export function ClearFlowAlertDialog() {
  const { setEdges, setNodes } = useReactFlowContext();
  const { setCenter } = useReactFlow();

  const [isOpen, setIsOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const resetGraph = () => {
    setEdges([]);
    setNodes(INITIAL_NODES);
    setCenter(250, 200, { zoom: 2, duration: 500 });
    toast.success("Fluxo resetado com sucesso!");
    localStorage.setItem(
      "@flowbuilder:workflowDefinition",
      JSON.stringify({
        nodes: INITIAL_NODES,
        edges: [],
        viewport: {  x: 100, y: 100, zoom: 2 }
      })
    );
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button className="flex items-center gap-2 text-white bg-rose-500">
          <Trash2 size={16} />
          Limpar fluxo
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="text-center">
          <AlertDialogTitle>
            Você tem certeza que deseja limpar o fluxo?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Se você limpar este fluxo, você não será capaz de recuperá-lo!
            <div className="flex flex-col gap-2">
              <p>
                se você tem certeza digite <b>limpar meu fluxo</b> para
                confirmar:
              </p>
              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                onPaste={(e) => e.preventDefault()}
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setConfirmText("")}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={confirmText.toLowerCase().trim() !== "limpar meu fluxo"}
            onClick={resetGraph}
          >
            Limpar fluxo
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
