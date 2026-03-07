"use client";

import { TrendingDown, TrendingUp } from "lucide-react";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { formatTJS } from "@/lib/format";
import { getTopCategoriesByMargin } from "@/lib/sales-data";

export function SectionMarginTable() {
	const rows = getTopCategoriesByMargin(6);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Топ категорий по марже</CardTitle>
				<CardDescription>
					Категории стройматериалов с самой низкой маржой — где конкретно просадка и на что смотреть
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Категория (стройматериалы)</TableHead>
							<TableHead className="text-right">Маржа %</TableHead>
							<TableHead className="text-right">Изменение (п.п.)</TableHead>
							<TableHead className="text-right">Выручка</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{rows.map((row) => (
							<TableRow key={row.name}>
								<TableCell className="font-medium">{row.name}</TableCell>
								<TableCell className="text-right tabular-nums">{row.marginPercent.toFixed(1)}%</TableCell>
								<TableCell className="text-right">
									<span
										className={
											row.marginChangePp >= 0
												? "text-emerald-600 dark:text-emerald-400"
												: "text-destructive"
										}
									>
										{row.marginChangePp >= 0 ? (
											<TrendingUp className="mr-1 inline size-3.5" />
										) : (
											<TrendingDown className="mr-1 inline size-3.5" />
										)}
										{row.marginChangePp >= 0 ? "+" : ""}
										{row.marginChangePp.toFixed(1)}
									</span>
								</TableCell>
								<TableCell className="text-right tabular-nums">{formatTJS(row.revenue)}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
