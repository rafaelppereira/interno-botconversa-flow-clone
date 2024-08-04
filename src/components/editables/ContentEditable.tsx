import { AudioLines, Bold, BotOff, Camera, Clock, File, Image, Italic, Save, Star, Text, UserCircle, Variable, X } from "lucide-react";
import { Button } from "../ui/button";

export function ContentEditable() {
  return (
    <div className="shrink-0 h-full w-96 bg-white z-50 shadow-lg border-r border-r-zinc-300 flex flex-col">
      <div className="w-full p-4 border-b border-b-zinc-300 flex items-center justify-between">
        <div className="text-zinc-800 font-semibold flex items-center text-lg">
          <Star className="text-red-500 size-5 mr-2" /> Conteúdo
        </div>

        <button type="button">
          <X className="size-6 text-zinc-600" />
        </button>
      </div>

      <div className="flex-1 overflow-y-hidden p-4">
        <div className="relative">
          <textarea className="w-full h-32 p-3 resize-none bg-red-50/50 border-2 border-red-200 rounded-lg" />
          <div className="flex items-center gap-3 absolute left-4 bottom-5">
            <button type="button" className="hover:brightness-75 transition-all">
              <Bold className="size-4" />
            </button>
            <button type="button" className="hover:brightness-75 transition-all">
              <Italic className="size-4" />
            </button>
            <button type="button" className="hover:brightness-75 transition-all">
              <Variable className="size-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button className="flex-1" variant="destructive">Cancelar</Button>
          <Button className="flex-1 bg-emerald-600">Salvar</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 p-4">
        <button
          type="button"
          className="bg-red-50/50 border border-red-200 rounded-md py-3 flex items-center justify-center flex-col gap-2 text-red-500 hover:brightness-75 transition-all"
        >
          <Text className="size-5 text-red-500" />
          Texto
        </button>
        <button
          type="button"
          className="bg-red-50/50 border border-red-200 rounded-md py-3 flex items-center justify-center flex-col gap-2 text-red-500 hover:brightness-75 transition-all"
        >
          <Image className="size-5 text-red-500" />
          Imagem
        </button>
        <button
          type="button"
          className="bg-red-50/50 border border-red-200 rounded-md py-3 flex items-center justify-center flex-col gap-2 text-red-500 hover:brightness-75 transition-all"
        >
          <Camera className="size-5 text-red-500" />
          Vídeo
        </button>
        <button
          type="button"
          className="bg-red-50/50 border border-red-200 rounded-md py-3 flex items-center justify-center flex-col gap-2 text-red-500 hover:brightness-75 transition-all"
        >
          <File className="size-5 text-red-500" />
          Arquivo
        </button>
        <button
          type="button"
          className="bg-red-50/50 border border-red-200 rounded-md py-3 flex items-center justify-center flex-col gap-2 text-red-500 hover:brightness-75 transition-all"
        >
          <AudioLines className="size-5 text-red-500" />
          Áudio
        </button>
        <button
          type="button"
          className="bg-red-50/50 border border-red-200 rounded-md py-3 flex items-center justify-center flex-col gap-2 text-red-500 hover:brightness-75 transition-all"
        >
          <Save className="size-5 text-red-500" />
          Salvar
        </button>
        <button
          type="button"
          className="bg-red-50/50 border border-red-200 rounded-md py-3 flex items-center justify-center flex-col gap-2 text-red-500 hover:brightness-75 transition-all"
        >
          <Clock className="size-5 text-red-500" />
          Atraso
        </button>
        <button
          type="button"
          className="bg-red-50/50 border border-red-200 rounded-md py-3 flex items-center justify-center flex-col gap-2 text-red-500 hover:brightness-75 transition-all"
        >
          <BotOff className="size-5 text-red-500" />
          AutoOff
        </button>
        <button
          type="button"
          className="bg-red-50/50 border border-red-200 rounded-md py-3 flex items-center justify-center flex-col gap-2 text-red-500 hover:brightness-75 transition-all"
        >
          <UserCircle className="size-5 text-red-500" />
          Contato
        </button>
      </div>
    </div>
  );
}
