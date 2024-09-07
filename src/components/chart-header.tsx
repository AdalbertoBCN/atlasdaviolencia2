"use client"
import React from 'react'
import { CardDescription, CardHeader, CardTitle } from './ui/card'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useQueryTheme } from '@/hooks/useQueryTheme';
import { getSlugFromString } from '@/lib/utils';
import { useQuerySeries } from '@/hooks/useQuerySeries';

interface ChartHeaderProps {
    total: number;
}

export default function ChartHeader({ total }: ChartHeaderProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const { data: themes } = useQueryTheme();

    const selectedTheme = searchParams.get("theme");
    const selectedThemeId = themes?.find(theme => getSlugFromString(theme.titulo) === selectedTheme)?.id ?? 1
    
    const selectedThemeName = themes?.find(theme => getSlugFromString(theme.titulo) === selectedTheme)?.titulo

    const { data: series } = useQuerySeries({ selectedThemeId });

    const selectedSeries = searchParams.get("series");
    const selectedSeriesName = series?.find(serie => getSlugFromString(serie.titulo) === selectedSeries)?.titulo

    const selectedFilter = searchParams.get("filter");
    const selectedState = searchParams.get("state");
    const selectedCity = searchParams.get("city");

    let title = "Selecione um Tema...";

    if (selectedTheme) {
        if (selectedFilter === "estado" && !selectedState) {
            title = "Selecione um Estado...";
        } else if (selectedFilter === "cidade" && !selectedCity) {
            title = "Selecione uma Cidade...";
        } else {
            title = selectedSeriesName ?? "Selecione um Tema...";
        }
    }

    return (
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    {selectedThemeName ?? ""}
                </CardDescription>
            </div>
            <div className="flex flex-col-reverse items-center gap-2 p-3">
                <span>Total</span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                    {total.toLocaleString()}
                </span>
            </div>
        </CardHeader>
    )
}
