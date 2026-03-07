"use client";

import { Bar, CartesianGrid, ComposedChart, Line, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig
} from "@/components/ui/chart";

import { formatTJS } from "@/lib/format";
import { portfolioParetoData } from "@/lib/portfolio-data";

const chartConfig = {
	amount: {
		label: "Портфель (TJS)",
		color: "var(--chart-3)"
	},
	cumulativePercent: {
		label: "Накопленная %",
		color: "var(--chart-4)"
	}
} satisfies ChartConfig;

export function ChartPortfolioPareto() {
	return (
		<Card className="pt-0">
			<CardHeader className="space-y-0 border-b py-5">
				<CardTitle>Концентрация — Парето</CardTitle>
				<CardDescription>Топ клиентов и их доля (накопленная %)</CardDescription>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer config={chartConfig} className="aspect-auto h-[280px] w-full">
					<ComposedChart data={portfolioParetoData} margin={{ left: 0, right: 24 }}>
						<CartesianGrid vertical={false} />
						<XAxis dataKey="client" tickLine={false} axisLine={false} tickMargin={8} angle={-25} textAnchor="end" height={60} />
						<YAxis yAxisId="left" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
						<YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(v) => `${v}%`} />
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									formatter={(value, name) => {
										if (name === "cumulativePercent" || name === "Накопленная %") return `${Number(value).toFixed(1)}%`;
										return formatTJS(Number(value));
									}}
									indicator="dot"
								/>
							}
						/>
						<Bar yAxisId="left" dataKey="amount" fill="var(--color-amount)" radius={[4, 4, 0, 0]} />
						<Line yAxisId="right" type="monotone" dataKey="cumulativePercent" stroke="var(--color-cumulativePercent)" strokeWidth={2} dot={{ r: 3 }} />
					</ComposedChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
