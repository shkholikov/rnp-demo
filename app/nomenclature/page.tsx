import { ChartNomenclatureScatter } from "@/components/chart-nomenclature-scatter";
import { ChartNomenclatureTopBar } from "@/components/chart-nomenclature-top-bar";
import { SectionNomenclatureCards } from "@/components/section-nomenclature-cards";
import { SectionNomenclatureTable } from "@/components/section-nomenclature-table";

export default function NomenclaturePage() {
	return (
		<div className="flex flex-1 flex-col gap-6 p-4">
			<div>
				<h1 className="text-2xl font-semibold">Продажи по номенклатуре и маржинальность</h1>
				<p className="text-muted-foreground">
					Что реально приносит прибыль, а что «яд». Все суммы в TJS.
				</p>
			</div>
			{/* 1. KPI карточки */}
			<SectionNomenclatureCards />
			{/* 2. Графики */}
			<ChartNomenclatureScatter />
			<ChartNomenclatureTopBar />
			{/* 3. Таблица */}
			<SectionNomenclatureTable />
		</div>
	);
}
