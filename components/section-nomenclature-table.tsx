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
import { getLossMaking } from "@/lib/nomenclature-data";

export function SectionNomenclatureTable() {
	const rows = getLossMaking(10);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Убыточные позиции</CardTitle>
				<CardDescription>
					Выручка, маржа, прибыль (TJS) и причина — что реально «яд» в ассортименте
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Товар</TableHead>
							<TableHead className="text-right">Выручка (TJS)</TableHead>
							<TableHead className="text-right">Маржа %</TableHead>
							<TableHead className="text-right">Прибыль (TJS)</TableHead>
							<TableHead>Причина / комментарий</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{rows.map((row) => (
							<TableRow key={row.product}>
								<TableCell className="font-medium">{row.product}</TableCell>
								<TableCell className="text-right tabular-nums">{formatTJS(row.revenue)}</TableCell>
								<TableCell className="text-right tabular-nums text-destructive">{row.marginPercent}%</TableCell>
								<TableCell className="text-right tabular-nums text-destructive">{formatTJS(row.profit)}</TableCell>
								<TableCell className="text-muted-foreground max-w-[240px] text-sm">{row.reason}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
