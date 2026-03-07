"use client";

import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

import { formatTJS } from "@/lib/format";
import { agingBarData } from "@/lib/overdue-data";

// One row in data = one period; we have one row "На дату" → 4 bars (one per bucket)
const barData = [
	{ bucket: "Без просрочки", amount: agingBarData[0].onTime, fill: "var(--chart-2)" },
	{ bucket: "1–30 дн.", amount: agingBarData[0].days1To30, fill: "var(--chart-3)" },
	{ bucket: "31–60 дн.", amount: agingBarData[0].days31To60, fill: "var(--chart-4)" },
	{ bucket: "60+ дн.", amount: agingBarData[0].days60Plus, fill: "var(--chart-1)" }
];

const chartConfig = {
	amount: { label: "Сумма (TJS)", color: "var(--chart-1)" },
	chart2: { label: "1–30", color: "var(--chart-2)" },
	chart3: { label: "31–60", color: "var(--chart-3)" },
	chart4: { label: "60+", color: "var(--chart-4)" }
} satisfies ChartConfig;

export function ChartOverdueAging() {
	return (
		<Card className="pt-0">
			<CardHeader className="space-y-0 border-b py-5">
				<CardTitle>Корзины просрочки</CardTitle>
				<CardDescription>Без просрочки / 1–30 / 31–60 / 60+ дней (на дату)</CardDescription>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer config={chartConfig} className="aspect-auto h-[260px] w-full">
					<BarChart data={barData} layout="vertical" margin={{ left: 0, right: 24 }}>
						<CartesianGrid horizontal={false} />
						<XAxis type="number" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
						<YAxis type="category" dataKey="bucket" tickLine={false} axisLine={false} width={90} />
						<ChartTooltip cursor={false} content={<ChartTooltipContent formatter={(value) => formatTJS(Number(value))} indicator="dot" />} />
						<Bar dataKey="amount" radius={[0, 4, 4, 0]}>
							{barData.map((entry, i) => (
								<Cell key={entry.bucket} fill={entry.fill} />
							))}
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
