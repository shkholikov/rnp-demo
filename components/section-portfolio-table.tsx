"use client";

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
import { getTopClients } from "@/lib/portfolio-data";

export function SectionPortfolioTable() {
	const rows = getTopClients(10);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Топ клиентов по портфелю</CardTitle>
				<CardDescription>
					Клиенты с наибольшим остатком рассрочки и их доля от общего портфеля (TJS)
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Клиент</TableHead>
							<TableHead className="text-right">Портфель (TJS)</TableHead>
							<TableHead className="text-right">% от общего</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{rows.map((row) => (
							<TableRow key={row.client}>
								<TableCell className="font-medium">{row.client}</TableCell>
								<TableCell className="text-right tabular-nums">{formatTJS(row.amount)}</TableCell>
								<TableCell className="text-right tabular-nums">{row.sharePercent.toFixed(1)}%</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
