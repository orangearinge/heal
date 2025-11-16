import { cn } from "@/lib/utils";
import { HyperText } from "../ui/hyper-text";


export const Logo = ({ className }: { className?: string; }) => {
    return (
        <div className="flex items-center gap-4">
            <HyperText className={cn(className, "font-medium")}>Heal</HyperText>
        </div>
    )
}

export const LogoIcon = ({ className }: { className?: string; }) => {
    return (
        <HyperText className={cn(className, "font-medium")}>Heal</HyperText>
    )
}
