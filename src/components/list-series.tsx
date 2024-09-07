"use client"
import { useQuerySeries } from '@/hooks/useQuerySeries';
import { useQueryTheme } from '@/hooks/useQueryTheme';
import { cn, getSlugFromString } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { TooltipChild } from './tooltip';
import { Skeleton } from './ui/skeleton';

export default function ListSeries() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const { data: themes } = useQueryTheme();

    const selectedTheme = searchParams.get("theme");

    const selectedSeries = searchParams.get("series");

    const selectedThemeId = themes?.find(theme => getSlugFromString(theme.titulo) === selectedTheme)?.id

    const { data: series, isLoading} = useQuerySeries({ selectedThemeId });

    const createQueryString = React.useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    function handleSeriesChange(selectedSeries: string) {
        router.push(pathname + "?" + createQueryString("series", selectedSeries))
    }

    return (
        <>
            {isLoading && (
                <div className='flex flex-col gap-2'>
                    <Skeleton className="h-3 w-40" />
                    <Skeleton className="h-3 w-44" />
                    <Skeleton className="h-3 w-36" />
                    <Skeleton className="h-3 w-40" />
                    <Skeleton className="h-3 w-44" />
                    <Skeleton className="h-3 w-40" />
                    <Skeleton className="h-3 w-44" />
                    <Skeleton className="h-3 w-36" />
                    <Skeleton className="h-3 w-40" />
                    <Skeleton className="h-3 w-44" />
                    <Skeleton className="h-3 w-40" />
                    <Skeleton className="h-3 w-44" />
                    <Skeleton className="h-3 w-36" />
                    <Skeleton className="h-3 w-40" />
                    <Skeleton className="h-3 w-44" />
                </div>


            )}
        
            {series && (
                series.map((serie) => (
                    <TooltipChild key={serie.id} title={serie.titulo}>
                        <span key={serie.id} onClick={() => handleSeriesChange(getSlugFromString(serie.titulo))} className={cn("cursor-pointer block text-xs text-nowrap overflow-hidden text-ellipsis px-2", {
                            "text-background bg-foreground rounded-md py-1 transition-all duration-75": getSlugFromString(serie.titulo) === selectedSeries
                        })}>
                            {serie.titulo}
                        </span>
                    </TooltipChild>
                ))
            )}
        </>
    )
}
