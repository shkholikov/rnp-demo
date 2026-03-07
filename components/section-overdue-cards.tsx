"use client";

import { AlertCircle } from "lucide-react";

import { useCountUp } from "@/hooks/use-count-up";
import { overdueMetrics } from "@/lib/overdue-data";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const CARD_STAGGER_MS = 80;

export function SectionOverdueCards() {
	const m = overdueMetrics;

	const upTo30TJS = useCountUp(m.overdueUpTo30 / 1000, {
		format: "currency",
		duration: 1000,
		delay: CARD_STAGGER_MS * 0,
		start: 0
	});
	const upTo30Pct = useCountUp(m.overdueUpTo30Percent, {
		format: "decimal",
		duration: 800,
		delay: CARD_STAGGER_MS * 0 + 200,
		start: 0
	});

	const over30TJS = useCountUp(m.overdue30Plus / 1000, {
		format: "currency",
		duration: 1000,
		delay: CARD_STAGGER_MS * 1,
		start: 0
	});
	const over30Pct = useCountUp(m.overdue30PlusPercent, {
		format: "decimal",
		duration: 800,
		delay: CARD_STAGGER_MS * 1 + 200,
		start: 0
	});

	const totalPct = useCountUp(m.totalOverduePercent, {
		format: "decimal",
		duration: 1000,
		delay: CARD_STAGGER_MS * 2,
		start: 0
	});

	const contracts = useCountUp(m.contractsInOverdue, {
		format: "number",
		duration: 1000,
		delay: CARD_STAGGER_MS * 3,
		start: 0
	});

	return (
		<div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid w-full grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs sm:grid-cols-2 lg:grid-cols-4">
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Просрочка до 30 дней</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{upTo30TJS}K</CardTitle>
					<div className="flex flex-wrap items-center gap-1.5 pt-0.5">
						<Badge variant="outline">
							<AlertCircle className="size-3.5" />
							{upTo30Pct}% портфеля
						</Badge>
					</div>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="text-muted-foreground">Сумма и доля портфеля (TJS)</div>
				</CardFooter>
			</Card>

			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Просрочка 30+ дней</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{over30TJS}K</CardTitle>
					<div className="flex flex-wrap items-center gap-1.5 pt-0.5">
						<Badge variant="outline" className="border-destructive/50 text-destructive">
							<AlertCircle className="size-3.5" />
							{over30Pct}% портфеля
						</Badge>
					</div>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="text-muted-foreground">Риск потерь (TJS)</div>
				</CardFooter>
			</Card>

			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Общая просрочка %</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{totalPct}%</CardTitle>
					<div className="flex flex-wrap items-center gap-1.5 pt-0.5">
						<Badge variant="outline">от портфеля</Badge>
					</div>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="text-muted-foreground">Доля просроченной задолженности</div>
				</CardFooter>
			</Card>

			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Договоров в просрочке</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{contracts}</CardTitle>
					<div className="flex flex-wrap items-center gap-1.5 pt-0.5">
						<Badge variant="outline">шт.</Badge>
					</div>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="text-muted-foreground">Количество договоров</div>
				</CardFooter>
			</Card>
		</div>
	);
}
