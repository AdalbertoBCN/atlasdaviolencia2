"use client"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function SelectFilter(){
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const selectedFilter = searchParams.get("filter");

    const createQueryString = useCallback(
        (name: string, value: string) => {
          const params = new URLSearchParams(searchParams.toString())
          params.set(name, value)
    
          return params.toString()
        },
        [searchParams]
      )

      function handleFilterChange(selectedFilter: string) {
        router.push(pathname + "?" + createQueryString("filter", selectedFilter))
      }

    return (
        <Select onValueChange={handleFilterChange} defaultValue={selectedFilter ?? "país"}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por..."/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="cidade">Cidade</SelectItem>
              <SelectItem value="estado">Estado</SelectItem>
              <SelectItem value="país">País</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
    )
}