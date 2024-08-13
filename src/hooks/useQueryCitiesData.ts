import { useQuery } from "@tanstack/react-query";

interface DataItem {
  cod: string;
  sigla: string;
  valor: string;
  periodo: string;
}

export interface QueryDataCities{
  id: string,
  date: string,
  value: number
}

interface UseChartDataProps {
  selectedCityId: string;
}

export function useQueryCitiesData({ selectedCityId }: UseChartDataProps) {
  const URL_CITY_DATA = `https://ipea.gov.br/atlasviolencia/api/v1/valores-series-por-regioes/328/4/${selectedCityId}`;
  const PROXY_URL =
    "https://corsproxy.io/?" + encodeURIComponent(URL_CITY_DATA);

  return useQuery<QueryDataCities[]>({
    queryKey: ["get-data", selectedCityId],
    queryFn: async () => {
      const response = await fetch(PROXY_URL);

      const data:DataItem[] = await response.json();

      const formatData = data.map(item => {
        return {
          id: item.cod,
          date: item.periodo,
          value: Number(item.valor)
        }
      })

      return formatData;
    },
  });
}
