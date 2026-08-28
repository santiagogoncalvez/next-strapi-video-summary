import { Loader2 } from "lucide-react";

export default function GeneralLoading() {
   return (
      <div className="flex-1 w-full h-full flex justify-center items-center">
         <Loader2 className="size-8 animate-spin" strokeWidth={1.5} />
      </div>
   );
}
