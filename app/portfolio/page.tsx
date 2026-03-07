import { ChartPortfolioByTerm } from "@/components/chart-portfolio-by-term";
import { ChartPortfolioPareto } from "@/components/chart-portfolio-pareto";
import { ChartPortfolioTrend } from "@/components/chart-portfolio-trend";
import { SectionPortfolioCards } from "@/components/section-portfolio-cards";
import { SectionPortfolioTable } from "@/components/section-portfolio-table";

export default function PortfolioPage() {
	return (
		<div className="flex flex-1 flex-col gap-6 p-4">
			<div>
				<h1 className="text-2xl font-semibold">Портфель рассрочки</h1>
				<p className="text-muted-foreground">
					Сколько денег под риском и насколько портфель опасный. Все суммы в TJS.
				</p>
			</div>
			{/* 1. KPI карточки */}
			<SectionPortfolioCards />
			{/* 2. Графики */}
			<ChartPortfolioTrend />
			<ChartPortfolioByTerm />
			<ChartPortfolioPareto />
			{/* 3. Таблица */}
			<SectionPortfolioTable />
		</div>
	);
}
