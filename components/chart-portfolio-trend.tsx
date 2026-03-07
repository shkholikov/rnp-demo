"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig
} from "@/components/ui/chart";

import { formatTJS } from "@/lib/format";
import { portfolioTrendData } from "@/lib/portfolio-data";

const chartConfig = {
	balance: {
		label: "Портфель (TJS)",
		color: "var(--chart-3)"
	}
} satisfies ChartConfig;

export function ChartPortfolioTrend() {
	return (
		<Card className="pt-0">
			<CardHeader className="space-y-0 border-b py-5">
				<CardTitle>Портфель во времени</CardTitle>
				<CardDescription>Динамика остатка портфеля рассрочки по месяцам</CardDescription>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
					<AreaChart data={portfolioTrendData} margin={{ left: 0, right: 0 }}>
						<defs>
							<linearGradient id="fillPortfolioTrend" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="var(--color-balance)" stopOpacity={0.8} />
								<stop offset="95%" stopColor="var(--color-balance)" stopOpacity={0.1} />
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} />
						<XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
						<YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent formatter={(value) => formatTJS(Number(value))} indicator="dot" />}
						/>
						<ChartLegend content={<ChartLegendContent />} />
						<Area
							dataKey="balance"
							type="natural"
							fill="url(#fillPortfolioTrend)"
							stroke="var(--color-balance)"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
