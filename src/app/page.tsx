"use client";

import ChartRoot from "@/components/chart-root";
import SelectCities from "@/components/select-cities";
import SelectState from "@/components/select-states";

export default function Home() {
  return (
    <div className="flex flex-col h-screen p-2 gap-3">
      <header className="flex gap-2">
        <SelectState />
        <SelectCities />
      </header>

      <main className="border border-zinc-900 flex-1">
        <ChartRoot />
      </main>
    </div>
  );
}
