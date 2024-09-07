import { useQueryCities } from "@/hooks/useQueryCities";
import { QueryDataCities, useQueryChartData } from "@/hooks/useQueryChartData";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import { placeholderData } from '../lib/placeholderDataChart';
import { Filter } from "@/types/Filter.enum";
import { useQueryTheme } from "@/hooks/useQueryTheme";
import { getSlugFromString } from "@/lib/utils";
import { useQuerySeries } from "@/hooks/useQuerySeries";
import { ChartConfig } from "./ui/chart";
import { GenericChart } from "./generic-chart";

export default function ChartRoot() {
    const searchParams = useSearchParams();

    const { data: themes } = useQueryTheme();

    const selectedTheme = searchParams.get("theme");

    const selectedSeries = searchParams.get("series");

    const selectedThemeId = themes?.find(theme => getSlugFromString(theme.titulo) === selectedTheme)?.id ?? 1

    const { data: series } = useQuerySeries({ selectedThemeId });

    const selectedSeriesId = series?.find(serie => getSlugFromString(serie.titulo) === selectedSeries)?.id ?? 328

    const typeChart = searchParams.get("type");

    const selectedState = String(searchParams.get("state"));

    const selectedCity = String(searchParams.get("city"));

    const filterId: Filter = Filter[searchParams.get("filter") as keyof typeof Filter] ?? Filter.país;

    const { data: cities } = useQueryCities({ selectedState });

    const selectedCityId = String(
        cities?.find((city) => city.nome === selectedCity)?.id
    );

    const { data, isLoading } = useQueryChartData({ filterId, selectedCityId, selectedState, selectedSeriesId });

    const NO_DATA_CITY = filterId === Filter.cidade && selectedCityId === "undefined";

    const NO_DATA_STATE = filterId === Filter.estado && selectedState === "null";

    const chartData = data && !NO_DATA_CITY && !NO_DATA_STATE && selectedSeries ? data : placeholderData;

    const chartConfig = {
        desktop: {
          label: selectedSeries ?? "",
          color: "hsl(var(--primary))",
        }
      } satisfies ChartConfig

    return (
        <div className="size-full">
            {!isLoading ? (
                <GenericChart data={chartData} type={typeChart as "line" | "bar" | "area" ?? "bar"} chartConfig={chartConfig} />
            ) :
                (
                    <Skeleton className="w-full h-[400px] bg-zinc-300 rounded-lg" />
                )}
        </div>
    );
}
