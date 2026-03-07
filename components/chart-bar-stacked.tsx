"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

import { formatTJS } from "@/lib/format";
import { monthlyData } from "@/lib/sales-data";

const barData = monthlyData.map((m) => ({
	month: m.month,
	cash: m.cashSales,
	installment: m.installmentSales
}));

const chartConfig = {
	cash: {
		label: "Наличные",
		color: "var(--chart-4)"
	},
	installment: {
		label: "Рассрочка",
		color: "var(--chart-3)"
	}
} satisfies ChartConfig;

export function ChartBarStacked() {
	return (
		<Card className="pt-0">
			<CardHeader className="space-y-0 border-b py-5">
				<CardTitle>Наличные vs Рассрочка</CardTitle>
				<CardDescription>Структура продаж по месяцам</CardDescription>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
					<BarChart data={barData} margin={{ left: 0, right: 0 }}>
						<CartesianGrid vertical={false} />
						<XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
						<YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
						<ChartTooltip cursor={false} content={<ChartTooltipContent formatter={(value) => formatTJS(Number(value))} indicator="dot" />} />
						<ChartLegend content={<ChartLegendContent />} />
						<Bar dataKey="cash" stackId="stack" fill="var(--color-cash)" radius={[0, 0, 0, 0]} />
						<Bar dataKey="installment" stackId="stack" fill="var(--color-installment)" radius={[4, 4, 0, 0]} />
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
