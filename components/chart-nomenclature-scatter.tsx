"use client";

import { CartesianGrid, Scatter, ScatterChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig
} from "@/components/ui/chart";

import { formatTJS } from "@/lib/format";
import { scatterData } from "@/lib/nomenclature-data";

const heroData = scatterData.filter((d) => d.segment === "hero");
const trafficData = scatterData.filter((d) => d.segment === "traffic");
const poisonData = scatterData.filter((d) => d.segment === "poison");

const chartConfig = {
	revenue: { label: "Выручка (TJS)", color: "var(--chart-1)" },
	marginPercent: { label: "Маржа %", color: "var(--chart-2)" },
	hero: { label: "Герои", color: "var(--chart-1)" },
	traffic: { label: "Трафик", color: "var(--chart-3)" },
	poison: { label: "Яд", color: "var(--chart-4)" }
} satisfies ChartConfig;

export function ChartNomenclatureScatter() {
	return (
		<Card className="pt-0">
			<CardHeader className="space-y-0 border-b py-5">
				<CardTitle>Матрица: выручка × маржа</CardTitle>
				<CardDescription>
					Герои (высокая выручка и маржа) / Трафик (выручка без маржи) / Яд (убыточные)
				</CardDescription>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer config={chartConfig} className="aspect-auto h-[280px] w-full">
					<ScatterChart margin={{ left: 0, right: 0 }}>
						<CartesianGrid vertical={false} />
						<XAxis
							type="number"
							dataKey="revenue"
							name="Выручка"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
						/>
						<YAxis
							type="number"
							dataKey="marginPercent"
							name="Маржа %"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(v) => `${v}%`}
						/>
						<ChartTooltip
							cursor={{ strokeDasharray: "3 3" }}
							content={
								<ChartTooltipContent
									formatter={(value, name) => {
										if (name === "marginPercent" || name === "Маржа %") return `${Number(value)}%`;
										return formatTJS(Number(value));
									}}
									labelFormatter={(_, payload) => payload?.[0]?.payload?.name ?? ""}
									indicator="dot"
								/>
							}
						/>
						<Scatter data={heroData} fill="var(--color-hero)" name="Герои" />
						<Scatter data={trafficData} fill="var(--color-traffic)" name="Трафик" />
						<Scatter data={poisonData} fill="var(--color-poison)" name="Яд" />
					</ScatterChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
