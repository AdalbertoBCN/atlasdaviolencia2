import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface TooltipChildProps {
    children: React.ReactNode,
    title: string
}

export function TooltipChild({ children, title }: TooltipChildProps) {
    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side="right">
                    {title}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
