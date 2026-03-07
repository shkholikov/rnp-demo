import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { ChartBarStacked } from "@/components/chart-bar-stacked";
import { SectionCards } from "@/components/section-cards";
import { SectionMarginTable } from "@/components/section-margin-table";

export default function SalesPage() {
	return (
		<div className="flex flex-1 flex-col gap-6 p-4">
			<div>
				<h1 className="text-2xl font-semibold">Продажи, наценка и рассрочка</h1>
				<p className="text-muted-foreground">
					Стройматериалы: растём ли мы правильно и есть ли деньги — выручка, маржа, рассрочка и покрытие кэшем.
				</p>
			</div>
			{/* 1. KPI карточки — состояние сейчас */}
			<SectionCards />
			{/* 2. Графики — что происходит */}
			<ChartAreaInteractive />
			<ChartBarStacked />
			{/* 3. Таблица — где конкретно проблема / что делать */}
			<SectionMarginTable />
		</div>
	);
}
