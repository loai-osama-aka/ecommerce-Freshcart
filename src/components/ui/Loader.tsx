import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type LoaderProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
};

export default function Loader({ size = "md", className, text }: LoaderProps) {
  const sizeMap = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-10 w-10",
  };

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <Loader2 className={cn("animate-spin text-emerald-600", sizeMap[size])} />
      {text && <span className="text-sm text-gray-500">{text}</span>}
    </div>
  );
}
