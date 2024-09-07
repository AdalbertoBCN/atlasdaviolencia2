import { Filter } from "@/types/Filter.enum";
import { useQuery } from "@tanstack/react-query";

interface DataItem {
  cod: string;
  sigla: string;
  valor: string;
  periodo: string;
}

export interface QueryDataCities {
  id: string;
  date: string;
  value: number;
}

interface UseChartDataProps {
  selectedCityId: string;
  filterId: number;
  selectedState: string;
  selectedSeriesId: number;
}

export function useQueryChartData({ selectedCityId, selectedState, filterId, selectedSeriesId }: UseChartDataProps) {
  const baseUrl = "https://ipea.gov.br/atlasviolencia/api/v1/valores-series-por-regioes";
  
  const url = (() => {
    switch (filterId) {
      case Filter.estado:
        return `${baseUrl}/${selectedSeriesId}/${filterId}/${selectedState}`;
      case Filter.cidade:
        return `${baseUrl}/${selectedSeriesId}/${filterId}/${selectedCityId}`;
      default:
        return `${baseUrl}/${selectedSeriesId}/${filterId}/BRA`;
    }
  })();

  const PROXY_URL = `https://corsproxy.io/?${encodeURIComponent(url)}`;

  return useQuery<QueryDataCities[]>({
    queryKey: ["get-data", selectedCityId, filterId, selectedState, selectedSeriesId],
    queryFn: async () => {
      const response = await fetch(PROXY_URL);
      const data: DataItem[] = await response.json();
 
      return data
        .filter(({ sigla }) => filterId === Filter.estado ? sigla === selectedState : true)
        .map(({ cod, periodo, valor }) => ({
          id: cod,
          date: periodo,
          value: Number(valor),
        }));
    },
    enabled: !!filterId && !!selectedSeriesId
  });
}
