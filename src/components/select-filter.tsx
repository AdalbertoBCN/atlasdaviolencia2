"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { createQueryString } from '@/lib/utils';

export default function SelectFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedFilter = searchParams.get("filter");

  const handleFilterChange = (selectedFilter: string) => {
    const queryString = createQueryString(searchParams, "filter", selectedFilter, selectedFilter === "país" ? ["city", "state"] : selectedFilter === "estado" ? ["city"] : []);
    router.push(`${pathname}?${queryString}`);
  };

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
  );
}
