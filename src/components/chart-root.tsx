import { useQueryCities } from "@/hooks/useQueryCities";
import { useQueryCitiesData } from "@/hooks/useQueryCitiesData";
import { useSearchParams } from "next/navigation";

export default function ChartRoot() {
    const searchParams = useSearchParams();
    const selectedState = searchParams.get("state") ?? "";
    const selectedCity = searchParams.get("city") ?? "";

    const { data: cities } = useQueryCities({ selectedState });
    const selectedCityId = String(
        cities?.find((city) => city.nome === selectedCity)?.id
    );
    
    const { data } = useQueryCitiesData({ selectedCityId });

    return (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}
