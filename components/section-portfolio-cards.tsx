"use client";

import { FileText, Percent, Timer, Wallet } from "lucide-react";

import { useCountUp } from "@/hooks/use-count-up";
import { portfolioMetrics } from "@/lib/portfolio-data";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const CARD_STAGGER_MS = 80;

export function SectionPortfolioCards() {
	const m = portfolioMetrics;

	const balance = useCountUp(m.portfolioBalance / 1000, {
		format: "currency",
		duration: 1000,
		delay: CARD_STAGGER_MS * 0,
		start: 0
	});

	const contracts = useCountUp(m.activeContracts, {
		format: "number",
		duration: 1000,
		delay: CARD_STAGGER_MS * 1,
		start: 0
	});

	const avgTerm = useCountUp(m.averageTermMonths, {
		format: "decimal",
		duration: 1000,
		delay: CARD_STAGGER_MS * 2,
		start: 0
	});

	const avgTicket = useCountUp(m.averageTicket / 1000, {
		format: "currency",
		duration: 1000,
		delay: CARD_STAGGER_MS * 3,
		start: 0
	});

	const longShare = useCountUp(m.longInstallmentSharePercent, {
		format: "decimal",
		duration: 1000,
		delay: CARD_STAGGER_MS * 4,
		start: 0
	});

	return (
		<div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid w-full grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Портфель (остаток)</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{balance}K</CardTitle>
					<div className="flex flex-wrap items-center gap-1.5 pt-0.5">
						<Badge variant="outline">
							<Wallet className="size-3.5" />
							TJS
						</Badge>
					</div>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="text-muted-foreground">Остаток по рассрочке</div>
				</CardFooter>
			</Card>

			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Активные договоры</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{contracts}</CardTitle>
					<div className="flex flex-wrap items-center gap-1.5 pt-0.5">
						<Badge variant="outline">
							<FileText className="size-3.5" />
							шт.
						</Badge>
					</div>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="text-muted-foreground">Действующих договоров</div>
				</CardFooter>
			</Card>

			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Средний срок</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{avgTerm}</CardTitle>
					<div className="flex flex-wrap items-center gap-1.5 pt-0.5">
						<Badge variant="outline">
							<Timer className="size-3.5" />
							мес
						</Badge>
					</div>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="text-muted-foreground">Средняя длительность рассрочки</div>
				</CardFooter>
			</Card>

			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Средний чек</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{avgTicket}K</CardTitle>
					<div className="flex flex-wrap items-center gap-1.5 pt-0.5">
						<Badge variant="outline">TJS</Badge>
					</div>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="text-muted-foreground">На один договор</div>
				</CardFooter>
			</Card>

			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Доля длинных рассрочек (9–12 мес)</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{longShare}%</CardTitle>
					<div className="flex flex-wrap items-center gap-1.5 pt-0.5">
						<Badge variant="outline">
							<Percent className="size-3.5" />
							от портфеля
						</Badge>
					</div>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="text-muted-foreground">9 и 12 месяцев</div>
				</CardFooter>
			</Card>
		</div>
	);
}
