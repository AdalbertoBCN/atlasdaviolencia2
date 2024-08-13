import { useQuery } from "@tanstack/react-query";

interface DataItem {
  cod: string;
  sigla: string;
  valor: string;
  periodo: string;
}

interface UseChartDataProps {
  selectedCityId: string;
}

export function useQueryCitiesData({ selectedCityId }: UseChartDataProps) {
  const URL_CITY_DATA = `https://ipea.gov.br/atlasviolencia/api/v1/valores-series-por-regioes/328/4/${selectedCityId}`;
  const PROXY_URL =
    "https://corsproxy.io/?" + encodeURIComponent(URL_CITY_DATA);

  return useQuery<DataItem[]>({
    queryKey: ["get-data", selectedCityId],
    queryFn: async () => {
      const response = await fetch(PROXY_URL);

      const data = await response.json();

      return data;
    },
  });
}
