"use client";

import { AlertTriangle, BarChart3, Package, Percent } from "lucide-react";

import { useCountUp } from "@/hooks/use-count-up";
import { nomenclatureMetrics } from "@/lib/nomenclature-data";
import { formatTJS } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const CARD_STAGGER_MS = 80;

export function SectionNomenclatureCards() {
	const m = nomenclatureMetrics;

	const top10Share = useCountUp(m.top10ProfitSharePercent, {
		format: "decimal",
		duration: 1000,
		delay: CARD_STAGGER_MS * 0,
		start: 0
	});

	const lossCount = useCountUp(m.lossMakingCount, {
		format: "number",
		duration: 1000,
		delay: CARD_STAGGER_MS * 1,
		start: 0
	});

	const avgMargin = useCountUp(m.averageMarginPercent, {
		format: "decimal",
		duration: 1000,
		delay: CARD_STAGGER_MS * 2,
		start: 0
	});

	const top1Amount = useCountUp(m.top1ProfitAmount / 1000, {
		format: "currency",
		duration: 1000,
		delay: CARD_STAGGER_MS * 3,
		start: 0
	});

	return (
		<div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid w-full grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs sm:grid-cols-2 lg:grid-cols-4">
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Топ-10 товаров дают % прибыли</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{top10Share}%</CardTitle>
					<div className="flex flex-wrap items-center gap-1.5 pt-0.5">
						<Badge variant="outline">
							<BarChart3 className="size-3.5" />
							от общей прибыли
						</Badge>
					</div>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="text-muted-foreground">Концентрация прибыли</div>
				</CardFooter>
			</Card>

			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Убыточных товаров</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{lossCount}</CardTitle>
					<div className="flex flex-wrap items-center gap-1.5 pt-0.5">
						<Badge variant="outline" className="border-destructive/50 text-destructive">
							<AlertTriangle className="size-3.5" />
							позиций
						</Badge>
					</div>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="text-muted-foreground">Маржа &lt; 0</div>
				</CardFooter>
			</Card>

			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Средняя маржа по ассортименту</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{avgMargin}%</CardTitle>
					<div className="flex flex-wrap items-center gap-1.5 pt-0.5">
						<Badge variant="outline">
							<Percent className="size-3.5" />
							среднее
						</Badge>
					</div>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="text-muted-foreground">По всем позициям</div>
				</CardFooter>
			</Card>

			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Товар №1 по прибыли</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{top1Amount}K</CardTitle>
					<div className="flex flex-wrap items-center gap-1.5 pt-0.5">
						<Badge variant="outline">
							<Package className="size-3.5" />
							TJS
						</Badge>
					</div>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-2 font-medium">{m.top1ProductName}</div>
					<div className="text-muted-foreground">{formatTJS(m.top1ProfitAmount)} прибыли</div>
				</CardFooter>
			</Card>
		</div>
	);
}
