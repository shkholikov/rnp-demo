"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig
} from "@/components/ui/chart";

import { formatTJS } from "@/lib/format";
import { topProductsByProfitData } from "@/lib/nomenclature-data";

const chartConfig = {
	profit: {
		label: "Валовая прибыль (TJS)",
		color: "var(--chart-2)"
	}
} satisfies ChartConfig;

export function ChartNomenclatureTopBar() {
	return (
		<Card className="pt-0">
			<CardHeader className="space-y-0 border-b py-5">
				<CardTitle>Топ-10 товаров по валовой прибыли</CardTitle>
				<CardDescription>Сумма прибыли в TJS</CardDescription>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer config={chartConfig} className="aspect-auto h-[280px] w-full">
					<BarChart data={topProductsByProfitData} margin={{ left: 0, right: 0 }}>
						<CartesianGrid vertical={false} />
						<XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} angle={-25} textAnchor="end" height={56} />
						<YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent formatter={(value) => formatTJS(Number(value))} indicator="dot" />}
						/>
						<Bar dataKey="profit" fill="var(--color-profit)" radius={[4, 4, 0, 0]} />
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
