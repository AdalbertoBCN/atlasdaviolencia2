"use client";

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Skeleton } from '@/components/ui/skeleton';
import { useQueryCities } from '@/hooks/useQueryCities';
import { cn, createQueryString } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

export default function SelectCities() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedState = searchParams.get("state");
  const selectedCity = searchParams.get("city");
  const selectedFilter = searchParams.get("filter");

  const [open, setOpen] = React.useState(false);
  const [filter, setFilter] = React.useState(selectedCity ?? "");

  const { data: cities, isLoading: isLoadingCities } = useQueryCities({ selectedState: selectedState ?? "default" });

  const handleCitiesChange = (selectedCity: string) => {
    const city = cities?.find(city => city.id === Number(selectedCity));
    if (city) {
      const queryString = createQueryString(searchParams, "city", city.nome);
      router.push(`${pathname}?${queryString}`);
    }
  };

  return (
    <>
      {isLoadingCities ? (
        <Skeleton className='w-[225px] h-10' />
      ) : (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild disabled={!selectedState || selectedFilter !== "cidade"}>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[225px] justify-between text-primary bg-primary-foreground"
            >
              {filter && selectedCity && selectedFilter === "cidade"
                ? cities?.find((city) => city.nome === filter)?.nome
                : "Selecione uma cidade..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[225px] p-0">
            <Command>
              <CommandInput placeholder="Procurar cidade..." />
              <CommandList>
                <CommandEmpty>Nenhuma cidade encontrada.</CommandEmpty>
                <CommandGroup>
                  {cities?.map((city) => (
                    <CommandItem
                      key={city.id}
                      value={city.nome}
                      onSelect={(currentValue: any) => {
                        handleCitiesChange(city.id.toString());
                        setFilter(currentValue === filter ? "" : currentValue);
                        setOpen(false);
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
