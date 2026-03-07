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
import { getTopDebtors } from "@/lib/overdue-data";

export function SectionOverdueTable() {
	const rows = getTopDebtors(10);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Топ-10 должников по сумме просрочки</CardTitle>
				<CardDescription>
					Партнёр, сумма (TJS), дней просрочки, статус и контакт — кого звонить в первую очередь
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Партнёр / Договор</TableHead>
							<TableHead className="text-right">Сумма (TJS)</TableHead>
							<TableHead className="text-right">Дней</TableHead>
							<TableHead>Статус</TableHead>
							<TableHead>Контакт</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{rows.map((row) => (
							<TableRow key={row.contractId}>
								<TableCell>
									<div className="font-medium">{row.partner}</div>
									<div className="text-muted-foreground text-xs">{row.contractId}</div>
								</TableCell>
								<TableCell className="text-right tabular-nums font-medium">{formatTJS(row.amountTJS)}</TableCell>
								<TableCell className="text-right tabular-nums">{row.daysOverdue}</TableCell>
								<TableCell>{row.status}</TableCell>
								<TableCell className="tabular-nums text-muted-foreground">{row.contact}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
