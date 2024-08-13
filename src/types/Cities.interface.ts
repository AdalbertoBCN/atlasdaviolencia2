import { State } from "./State.interface";

export interface Cities {
    id: number;
    nome: string;
    microrregiao: {
        id: number;
        nome: string;
        mesorregiao: {
            id: number;
            nome: string;
            UF: State;
        };
    };
    "regiao-imediata": {
        id: number;
        nome: string;
        "regiao-intermediaria": {
            id: number;
            nome: string;
            UF: {
                id: number;
                sigla: string;
                nome: string;
                regiao: {
                    id: number;
                    sigla: string;
                    nome: string;
                };
            };
        };
    };
}