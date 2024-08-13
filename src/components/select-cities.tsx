"use client"

import { useQueryCities } from '@/hooks/useQueryCities';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';

export default function SelectCities() {

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedState = searchParams.get("state");
  const selectedCity = searchParams.get("city");
  const selectedFilter = searchParams.get("filter");

  const [open, setOpen] = React.useState(false)
  const [filter, setFilter] = React.useState(selectedCity ?? "")

  const { data: cities, isLoading: isLoadingCities } = useQueryCities({ selectedState: selectedState ?? "default" });

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  function handleCitiesChange(selectedCity: string) {
    const city = cities?.find(city => city.id === Number(selectedCity))
    if (city)
      router.push(pathname + "?" + createQueryString("city", city.nome))
  }

  return (
    <>
      {isLoadingCities ? (
        <Skeleton className='w-[225px] h-10 bg-neutral-300' />
      ) : (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild disabled={selectedState === null || selectedFilter !== "cidade"}>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[225px] justify-between"
            >
              {filter && selectedCity && selectedFilter === "cidade"
                ? cities?.find((city) => city.nome === filter)?.nome
                : "Selecione uma cidade..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[225px] p-0">
            <Command defaultValue="Uberaba">
              <CommandInput placeholder="Procurar cidade..." />
              <CommandList>
                <CommandEmpty>Nenhuma cidade encontrada.</CommandEmpty>
                <CommandGroup>
                  {cities?.map((city) => (
                    <CommandItem
                      key={city.id}
                      value={city.nome}
                      onSelect={(currentValue: any) => {
                        handleCitiesChange(city.id.toString())
                        console.log(currentValue)
                        setFilter(currentValue === filter ? "" : currentValue)
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          filter === city.nome ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {city.nome}
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
