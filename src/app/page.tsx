"use client";

import ChartRoot from "@/components/chart-root";
import ListSeries from "@/components/list-series";
import RadioTypeChart from "@/components/radio-type-chart";

import SelectCities from "@/components/select-cities";
import SelectFilter from "@/components/select-filter";
import SelectState from "@/components/select-states";
import { SelectTheme } from "@/components/select-theme";
import { ToggleTheme } from "@/components/toggle-theme";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  return (
    <div className="flex h-screen p-2 gap-30">
        <aside className="w-56">
          <div>
            <h1>Atlas da Violência</h1>
          </div>
          <SelectTheme/>
          <ScrollArea className="w-56 h-[600px] mt-2">
            
          <div className="w-52 flex flex-col gap-1">
            <ListSeries />
          </div>
          </ScrollArea>
        </aside>

      <div className="flex flex-col gap-2 flex-1">

        <header className="flex gap-2">
          <SelectFilter />
          <SelectState />
          <SelectCities />
          <RadioTypeChart/>
          <ToggleTheme/>
        </header>

        <main className="border-l border-primary/30 flex-1">
          <ChartRoot />
        </main>

      </div>
    </div>
  );
}
