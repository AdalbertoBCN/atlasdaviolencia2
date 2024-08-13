import { useEffect, useState, useCallback } from "react";
import { State } from "@/types/State.interface";
import { useQuery } from "@tanstack/react-query";

const URL_GET_STATES = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

export function useQueryStates() {

  return useQuery<State[]>({
    queryKey: ["get-states"],
    queryFn: async () => {
      const response = await fetch(URL_GET_STATES);

      const data = await response.json();
      
      console.log(data);
      
      return data;
    }
  })
  
}
