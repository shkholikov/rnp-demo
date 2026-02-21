import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";

export default function SalesPage() {
	return (
		<div className="flex flex-1 flex-col gap-6 p-4">
			<div>
				<h1 className="text-2xl font-semibold">Продажи, наценка и рассрочка</h1>
				<p className="text-muted-foreground">Содержимое страницы продаж, наценки и рассрочки</p>
			</div>
			<SectionCards />
			<ChartAreaInteractive />
		</div>
	);
}
