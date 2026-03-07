"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

import { formatTJS } from "@/lib/format";
import { portfolioByTermData } from "@/lib/portfolio-data";

const chartConfig = {
	amount: {
		label: "Сумма (TJS)",
		color: "var(--chart-3)"
	}
} satisfies ChartConfig;

export function ChartPortfolioByTerm() {
	return (
		<Card className="pt-0">
			<CardHeader className="space-y-0 border-b py-5">
				<CardTitle>Распределение по срокам</CardTitle>
				<CardDescription>3 / 6 / 9 / 12 месяцев (TJS)</CardDescription>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
					<BarChart data={portfolioByTermData} margin={{ left: 0, right: 0 }}>
						<CartesianGrid vertical={false} />
						<XAxis dataKey="term" tickLine={false} axisLine={false} tickMargin={8} />
						<YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
						<ChartTooltip cursor={false} content={<ChartTooltipContent formatter={(value) => formatTJS(Number(value))} indicator="dot" />} />
						<Bar dataKey="amount" fill="var(--color-amount)" radius={[4, 4, 0, 0]} />
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
