import { Cities } from "@/types/Cities.interface";
import { useQuery } from "@tanstack/react-query";

interface QueryCitiesProps {
  selectedState: string;
}

export function useQueryCities({ selectedState }: QueryCitiesProps) {
  return useQuery<Cities[]>({
    queryKey: ["get-cities", selectedState],
    queryFn: async () => {
      const response = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios`
      );

      const data = await response.json();

      return data;
    },
  });
}
