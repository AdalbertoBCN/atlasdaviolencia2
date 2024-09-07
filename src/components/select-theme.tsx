"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn, createQueryString, getSlugFromString } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useQueryTheme } from "@/hooks/useQueryTheme";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Theme } from "@/types/Theme.interface";
import { TooltipChild } from "./tooltip";

export function SelectTheme() {
  const [open, setOpen] = React.useState(false);
  const [filter, setFilter] = React.useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedTheme = searchParams.get("theme");

  const { data: theme } = useQueryTheme();

  const handleThemeChange = (selectedTheme: string) => {
    const queryString = createQueryString(searchParams, "theme", selectedTheme, ["series"]);
    router.push(pathname + "?" + queryString);
  };

  React.useEffect(() => {
    const currentTheme = theme?.find(
      (theme: Theme) => getSlugFromString(theme.titulo) === selectedTheme
    );
    setFilter(currentTheme?.titulo ?? "");
  }, [selectedTheme, theme]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[180px] justify-between"
        >
          {filter
            ? <TooltipChild title={theme?.find((theme:Theme) => getSlugFromString(theme.titulo) === selectedTheme )?.titulo ?? ""}><span className="text-nowrap overflow-hidden text-ellipsis">{theme?.find((theme:Theme) => getSlugFromString(theme.titulo) === selectedTheme )?.titulo}</span></TooltipChild>
            : "Selecionar tema..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-0">
        <Command>
          <CommandInput placeholder="Procurar tema..." />
          <CommandList>
            <CommandEmpty>Nenhum tema encontrado.</CommandEmpty>
            <CommandGroup>
              {theme?.map((theme: Theme) => (
                <CommandItem
                  key={theme.id}
                  value={theme.titulo ?? ""}
                  onSelect={(currentValue: string) => {
                    const slug = getSlugFromString(currentValue);
                    setFilter(slug === selectedTheme ? "" : currentValue);
                    setOpen(false);
                    handleThemeChange(slug);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      filter === theme.titulo ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {theme.titulo}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
