import { Plus, RefreshCcw, Smartphone } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";

export function PreviewFlowPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="text-zinc-600"
        >
          <Smartphone className="size-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="p-0">
        <div>
          <div className="px-3">
            <div className="flex items-center justify-between text-zinc-600">
              <h2>Visualização do fluxo</h2>
              <Button type="button" variant="ghost" size="icon">
                <RefreshCcw className="size-4" />
              </Button>
            </div>
          </div>

          <div className="bg-[url(/background.jpg)] bg-cover bg-center bg-no-repeat h-[25rem] p-3 overflow-y-auto">
            
          </div>

          <div className="flex items-center gap-2 px-3 py-1">
            <Button type="button" variant="outline" className="rounded-lg shrink-0" size="icon">
              <Plus className="size-4" />
            </Button>
            <Input className="w-full" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
