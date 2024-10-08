"use client";

import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn, createQueryString } from '@/lib/utils';
import { useQueryStates } from '@/hooks/useQueryStates';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Skeleton } from '@/components/ui/skeleton';

export default function SelectState() {
  const { data: states, isLoading: isLoadingStates } = useQueryStates();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedFilter = searchParams.get("filter");
  const selectedState = searchParams.get("state");

  const [open, setOpen] = React.useState(false);
  const [filter, setFilter] = React.useState("");

  const handleStateChange = (selectedState: string) => {
    const queryString = createQueryString(searchParams, "state", selectedState, ["city"]);
    router.push(`${pathname}?${queryString}`);
  };

  React.useEffect(() => {
    const stateName = states?.find(state => state.sigla === selectedState)?.nome;
    setFilter(stateName ?? "");
  }, [selectedState, states]);

  return (
    <>
      {isLoadingStates ? (
        <Skeleton className='w-[200px] h-10 bg-neutral-300'/>
      ) : (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild disabled={!["cidade", "estado"].includes(selectedFilter ?? "")}>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {filter && selectedState && ["cidade", "estado"].includes(selectedFilter ?? "")
                ? states?.find((state) => state.nome === filter)?.nome
                : "Selecione um estado..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Procurar estado..." />
              <CommandList>
                <CommandEmpty>Nenhum estado encontrado.</CommandEmpty>
                <CommandGroup>
                  {states?.map((state) => (
                    <CommandItem
                      key={state.id}
                      value={state.nome}
                      onSelect={(currentValue: any) => {
                        setFilter(currentValue === filter ? "" : currentValue);
                        setOpen(false);
                        handleStateChange(state.sigla.toString());
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          filter === state.nome ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {state.nome}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}
