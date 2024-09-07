import * as React from "react";
import { AreaChart, BarChart, LineChart, CartesianGrid, XAxis, Area, Bar, Line } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import ChartHeader from "@/components/chart-header";
import { QueryDataCities } from "@/hooks/useQueryChartData";

const chartComponents = {
  area: AreaChart,
  bar: BarChart,
  line: LineChart,
};

interface GenericChartProps {
  data: QueryDataCities[] | undefined;
  type: "area" | "bar" | "line";
  chartConfig: ChartConfig;
}

export function GenericChart({ data, type, chartConfig }: GenericChartProps) {
  const ChartComponent = chartComponents[type];
  const total = React.useMemo(() => data?.reduce((acc, curr) => acc + curr.value, 0) ?? 0, [data]);

  return (
    <Card>
      <ChartHeader total={total} />
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-64 w-auto bg-primary-foreground p-2 rounded-md">
          <ChartComponent
            data={data}
            margin={{ top: 20, left: 12, right: 12, bottom: 0 }} 
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => new Date(value).toLocaleDateString("pt-BR", { year: "numeric" })}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => new Date(value).toLocaleDateString("pt-BR", { year: "numeric" })}
                />
              }
            />
            {type === "area" && <Area dataKey="value" type="natural" stroke="hsl(var(--primary))" fill="hsl(var(--primary))"/>}
            {type === "bar" && <Bar dataKey="value" fill="hsl(var(--primary))" />}
            {type === "line" && <Line dataKey="value" type="monotone" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />}
          </ChartComponent>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
