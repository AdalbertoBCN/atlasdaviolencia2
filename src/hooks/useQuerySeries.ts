import { Series } from "@/types/Series.interface";
import { useQuery } from "@tanstack/react-query";

interface QuerySeriesProps {
  selectedThemeId: number | undefined;
}
export function useQuerySeries({ selectedThemeId }: QuerySeriesProps) {
    
  const URL = `https://ipea.gov.br/atlasviolencia/api/v1/series/${selectedThemeId}`;
  const PROXY_URL = `https://corsproxy.io/?${encodeURIComponent(URL)}`;

  return useQuery<Series[]>({
    queryKey: ["get-series", selectedThemeId],
    queryFn: async () => {
      const response = await fetch(PROXY_URL);
      
      const data = await response.json();
      return data;
    },
    enabled: !!selectedThemeId
  });
}
