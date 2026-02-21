"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { monthlyData } from "@/lib/sales-data";

// Convert monthly data to daily data for the area chart (Revenue vs Cash)
const chartData = monthlyData.flatMap((month, index) => {
	const daysInMonth = index === 0 ? 30 : index === 1 ? 31 : 31; // Nov=30, Dec=31, Jan=31
	const dailyRevenue = month.revenue / daysInMonth;
	const dailyCash = month.cashCollected / daysInMonth;
	const monthNum = index === 0 ? 11 : index === 1 ? 12 : 1; // Nov=11, Dec=12, Jan=1
	const year = index === 2 ? 2026 : 2025;

	return Array.from({ length: daysInMonth }, (_, day) => ({
		date: `${year}-${String(monthNum).padStart(2, "0")}-${String(day + 1).padStart(2, "0")}`,
		revenue: Math.round(dailyRevenue + (Math.random() - 0.5) * dailyRevenue * 0.2),
		cashCollected: Math.round(dailyCash + (Math.random() - 0.5) * dailyCash * 0.2)
	}));
});

const chartConfig = {
	revenue: {
		label: "Выручка",
		color: "var(--chart-1)"
	},
	cashCollected: {
		label: "Собранные деньги",
		color: "var(--chart-2)"
	}
} satisfies ChartConfig;

export function ChartAreaInteractive() {
	const [timeRange, setTimeRange] = React.useState("90d");

	const filteredData = chartData.filter((item) => {
		const date = new Date(item.date);
		const referenceDate = new Date("2026-01-31");
		let daysToSubtract = 90;
		if (timeRange === "30d") {
			daysToSubtract = 30;
		} else if (timeRange === "7d") {
			daysToSubtract = 7;
		}
		const startDate = new Date(referenceDate);
		startDate.setDate(startDate.getDate() - daysToSubtract);
		return date >= startDate;
	});

	return (
		<Card className="pt-0">
			<CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
				<div className="grid flex-1 gap-1">
					<CardTitle>Выручка vs Собранные деньги</CardTitle>
					<CardDescription>Отслеживание разрыва между продажами и сбором денег</CardDescription>
				</div>
				<Select value={timeRange} onValueChange={setTimeRange}>
					<SelectTrigger className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex" aria-label="Выберите период">
						<SelectValue placeholder="Последние 3 месяца" />
					</SelectTrigger>
					<SelectContent className="rounded-xl">
						<SelectItem value="90d" className="rounded-lg">
							Последние 3 месяца
						</SelectItem>
						<SelectItem value="30d" className="rounded-lg">
							Последние 30 дней
						</SelectItem>
						<SelectItem value="7d" className="rounded-lg">
							Последние 7 дней
						</SelectItem>
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
					<AreaChart data={filteredData}>
						<defs>
							<linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.8} />
								<stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.1} />
							</linearGradient>
							<linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="var(--color-cashCollected)" stopOpacity={0.8} />
								<stop offset="95%" stopColor="var(--color-cashCollected)" stopOpacity={0.1} />
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) => {
								const date = new Date(value);
								return date.toLocaleDateString("ru-RU", {
									month: "short",
									day: "numeric"
								});
							}}
						/>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									labelFormatter={(value) => {
										return new Date(value).toLocaleDateString("ru-RU", {
											month: "short",
											day: "numeric"
										});
									}}
									formatter={(value) =>
										`${Number(value).toLocaleString("ru-RU", {
											minimumFractionDigits: 0,
											maximumFractionDigits: 0
										})} ₽`
									}
									indicator="dot"
								/>
							}
						/>
						<Area dataKey="cashCollected" type="natural" fill="url(#fillMobile)" stroke="var(--color-cashCollected)" stackId="a" />
						<Area dataKey="revenue" type="natural" fill="url(#fillDesktop)" stroke="var(--color-revenue)" stackId="a" />
						<ChartLegend content={<ChartLegendContent />} />
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
