import { LOADING_STYLES } from "@/constants/styles";
import { Loader2 } from "lucide-react";


export default function Loading() {
  return (
    <div className={LOADING_STYLES.overlay}>
      <Loader2 className={LOADING_STYLES.spinner}/>
    </div>
  );
}