"use client";

import { TrendingDown, TrendingUp } from "lucide-react";

import { useCountUp } from "@/hooks/use-count-up";
import { calculateMetrics, monthlyData } from "@/lib/sales-data";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const CARD_STAGGER_MS = 80;

export function SectionCards() {
	const metrics = calculateMetrics(monthlyData);

	// Revenue (in thousands for display)
	const revenue = useCountUp(metrics.currentRevenue / 1000, {
		format: "currency",
		duration: 1000,
		delay: CARD_STAGGER_MS * 0,
		start: 0
	});
	const revenueBadge = useCountUp(metrics.revenueMoMGrowth, {
		format: "percent",
		duration: 800,
		delay: CARD_STAGGER_MS * 0 + 200
	});

	// Cash Collected
	const cashCollected = useCountUp(metrics.currentCashCollected / 1000, {
		format: "currency",
		duration: 1000,
		delay: CARD_STAGGER_MS * 1,
		start: 0
	});
	const cashBadge = useCountUp(metrics.cashMoMGrowth, {
		format: "percent",
		duration: 800,
		delay: CARD_STAGGER_MS * 1 + 200
	});

	// Gross Margin
	const grossMargin = useCountUp(metrics.currentGrossMargin, {
		format: "percentage",
		duration: 1000,
		delay: CARD_STAGGER_MS * 2,
		start: 0
	});
	const marginChange = metrics.marginChange;
	const marginBadge = useCountUp(Math.abs(marginChange), {
		format: "decimal",
		duration: 800,
		delay: CARD_STAGGER_MS * 2 + 200,
		start: 0
	});

	// Installment Share
	const installmentShare = useCountUp(metrics.currentInstallmentShare, {
		format: "percentage",
		duration: 1000,
		delay: CARD_STAGGER_MS * 3,
		start: 0
	});

	// Cash Coverage
	const cashCoverage = useCountUp(metrics.currentCashCoverage, {
		format: "percentage",
		duration: 1000,
		delay: CARD_STAGGER_MS * 4,
		start: 0
	});

	return (
		<div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid w-full grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
			{/* Total Revenue */}
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Общая выручка</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{revenue}K</CardTitle>
					<div className="flex flex-wrap items-center gap-1.5 pt-0.5">
						<Badge variant="outline">
							<TrendingUp className="size-3.5" />
							{revenueBadge}
						</Badge>
					</div>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						Рост выручки МкМ <TrendingUp className="size-4" />
					</div>
					<div className="text-muted-foreground">Январь 2026</div>
				</CardFooter>
			</Card>

			{/* Cash Collected */}
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Собранные деньги</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{cashCollected}K</CardTitle>
					<div className="flex flex-wrap items-center gap-1.5 pt-0.5">
						<Badge variant="outline">
							{metrics.cashMoMGrowth > 0 ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
							{cashBadge}
						</Badge>
					</div>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						{metrics.cashMoMGrowth < metrics.revenueMoMGrowth ? (
							<>
								Отстаёт от выручки <TrendingDown className="size-4" />
							</>
						) : (
							<>
								Рост денег МкМ <TrendingUp className="size-4" />
							</>
						)}
					</div>
					<div className="text-muted-foreground">Разрыв между деньгами и выручкой растёт</div>
				</CardFooter>
			</Card>

			{/* Gross Margin */}
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Валовая маржа</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{grossMargin}</CardTitle>
					<div className="flex flex-wrap items-center gap-1.5 pt-0.5">
						<Badge variant="outline" className={marginChange < 0 ? "border-destructive text-destructive" : ""}>
							<TrendingDown className="size-3.5" />
							{marginBadge} п.п.
						</Badge>
					</div>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						Маржа снижается <TrendingDown className="size-4" />
					</div>
					<div className="text-muted-foreground">от базового уровня (Ноябрь)</div>
				</CardFooter>
			</Card>

			{/* Installment Share */}
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Доля рассрочки</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{installmentShare}</CardTitle>
					<div className="flex flex-wrap items-center gap-1.5 pt-0.5">
						<Badge variant="outline">
							<TrendingUp className="size-3.5" />
							Растёт
						</Badge>
					</div>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						Рассрочка увеличивается <TrendingUp className="size-4" />
					</div>
					<div className="text-muted-foreground">Доля от общих продаж</div>
				</CardFooter>
			</Card>

			{/* Cash Coverage */}
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Покрытие деньгами</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{cashCoverage}</CardTitle>
					<div className="flex flex-wrap items-center gap-1.5 pt-0.5">
						<Badge variant="outline" className="border-yellow-500 text-yellow-600 dark:text-yellow-500">
							<TrendingDown className="size-3.5" />
							Снижается
						</Badge>
					</div>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						Покрытие уменьшается <TrendingDown className="size-4" />
					</div>
					<div className="text-muted-foreground">Соотношение Деньги / Выручка</div>
				</CardFooter>
			</Card>
		</div>
	);
}
