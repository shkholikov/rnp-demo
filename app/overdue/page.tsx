import { ChartOverdue30Trend } from "@/components/chart-overdue-30-trend";
import { ChartOverdueAging } from "@/components/chart-overdue-aging";
import { SectionOverdueCards } from "@/components/section-overdue-cards";
import { SectionOverdueTable } from "@/components/section-overdue-table";

export default function OverduePage() {
	return (
		<div className="flex flex-1 flex-col gap-6 p-4">
			<div>
				<h1 className="text-2xl font-semibold">Просрочка. До 30 и более</h1>
				<p className="text-muted-foreground">
					Увидеть риск: что скоро станет потерями. Все суммы в TJS.
				</p>
			</div>
			{/* 1. KPI карточки */}
			<SectionOverdueCards />
			{/* 2. Графики */}
			<ChartOverdueAging />
			<ChartOverdue30Trend />
			{/* 3. Таблица действий */}
			<SectionOverdueTable />
		</div>
	);
}
