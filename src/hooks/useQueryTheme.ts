import { Theme } from "@/types/Theme.interface";
import { useQuery } from "@tanstack/react-query";

const URL = `https://ipea.gov.br/atlasviolencia/api/v1/temas`;
const PROXY_URL = `https://corsproxy.io/?${encodeURIComponent(URL)}`;
export function useQueryTheme() {
  return useQuery<Theme[]>({
    queryKey: ["get-themes"],
    queryFn: async () => {

      const response = await fetch(
        PROXY_URL
      );

      const data = await response.json();

      const filteredData = data.filter((theme: Theme) => ![3].includes(theme.id));

      return filteredData;
    },
  });
}
