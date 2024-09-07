"use client"
import { ChartArea, ChartColumnDecreasing, ChartLine } from "lucide-react"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"
import { cn } from "@/lib/utils"

export default function RadioTypeChart() {
  const [type, setType] = useState("bar")

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  return (
    <ToggleGroup type="single" value={type} onValueChange={setType} className="bg-primary/10 rounded-md">
      <ToggleGroupItem value="bar" aria-label="Toggle bar" className={cn({
        "border border-primary/60": type === "bar",
      })}
        onClick={(e) => {
          e.preventDefault()
          setType("bar");
          router.push(pathname + "?" + createQueryString("type", "bar"))
        }}
      >
        <ChartColumnDecreasing className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="line" aria-label="Toggle line" className={cn({
        "border border-primary/60": type === "line",
      })}
        onClick={(e) => {
          e.preventDefault()
          setType("line");
          router.push(pathname + "?" + createQueryString("type", "line"))
        }}
      >
        <ChartLine className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="area" aria-label="Toggle area" className={cn({
        "border border-primary/60": type === "area",
      })}
        onClick={(e) => {
          e.preventDefault()
          setType("area");
          router.push(pathname + "?" + createQueryString("type", "area"));
        }}
      >
        <ChartArea className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
