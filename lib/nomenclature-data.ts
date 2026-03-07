// Nomenclature & margin data — продажи по номенклатуре, все суммы в TJS

export interface NomenclatureMetrics {
	top10ProfitSharePercent: number;
	lossMakingCount: number;
	averageMarginPercent: number;
	top1ProductName: string;
	top1ProfitAmount: number;
}

export interface ScatterPoint {
	name: string;
	revenue: number;
	marginPercent: number;
	profit: number;
	segment: "hero" | "traffic" | "poison"; // герои / трафик / яд
}

export interface TopProductByProfit {
	name: string;
	profit: number;
}

export interface LossMakingRow {
	product: string;
	revenue: number;
	marginPercent: number;
	profit: number;
	reason: string;
}

// KPI metrics (mock)
export const nomenclatureMetrics: NomenclatureMetrics = {
	top10ProfitSharePercent: 72.4,
	lossMakingCount: 8,
	averageMarginPercent: 22.5,
	top1ProductName: "Цемент М500 (мешок 50 кг)",
	top1ProfitAmount: 85_200
};

// Scatter: X=revenue, Y=margin (matrix heroes/traffic/poison)
export const scatterData: ScatterPoint[] = [
	{ name: "Цемент М500", revenue: 420_000, marginPercent: 28, profit: 117_600, segment: "hero" },
	{ name: "Арматура 12мм", revenue: 385_000, marginPercent: 24, profit: 92_400, segment: "hero" },
	{ name: "Пиломатериал обрезной", revenue: 310_000, marginPercent: 26, profit: 80_600, segment: "hero" },
	{ name: "Кирпич керамический", revenue: 280_000, marginPercent: 18, profit: 50_400, segment: "traffic" },
	{ name: "Гипсокартон", revenue: 195_000, marginPercent: 22, profit: 42_900, segment: "traffic" },
	{ name: "Утеплитель", revenue: 168_000, marginPercent: 8, profit: 13_440, segment: "traffic" },
	{ name: "Клей плиточный", revenue: 85_000, marginPercent: -2, profit: -1_700, segment: "poison" },
	{ name: "Краска водоэмульсионная", revenue: 72_000, marginPercent: 5, profit: 3_600, segment: "traffic" },
	{ name: "Саморезы", revenue: 48_000, marginPercent: -5, profit: -2_400, segment: "poison" },
	{ name: "Грунтовка", revenue: 35_000, marginPercent: -1, profit: -350, segment: "poison" }
];

// Top 10 products by gross profit (for bar chart)
const _byProfit = [...scatterData].sort((a, b) => b.profit - a.profit).slice(0, 10);
export const topProductsByProfitData: TopProductByProfit[] = _byProfit.map((p) => ({
	name: p.name.length > 20 ? p.name.slice(0, 18) + "…" : p.name,
	profit: p.profit
}));

// Loss-making positions (for table)
export const lossMakingData: LossMakingRow[] = [
	{ product: "Клей плиточный", revenue: 85_000, marginPercent: -2, profit: -1_700, reason: "Акция, закуп дороже продажи" },
	{ product: "Саморезы 3,5×45", revenue: 48_000, marginPercent: -5, profit: -2_400, reason: "Драйвер трафика, убыток заложен" },
	{ product: "Грунтовка универсальная", revenue: 35_000, marginPercent: -1, profit: -350, reason: "Ошибка ценообразования" },
	{ product: "Дюбель-гвозди", revenue: 28_000, marginPercent: -3, profit: -840, reason: "Распродажа остатков" },
	{ product: "Лента монтажная", revenue: 18_000, marginPercent: -8, profit: -1_440, reason: "Закуп по завышенной цене" },
	{ product: "Сетка штукатурная", revenue: 15_000, marginPercent: -4, profit: -600, reason: "Конкуренция, сбита цена" },
	{ product: "Уголок перфорированный", revenue: 12_000, marginPercent: -2, profit: -240, reason: "Акционный товар" },
	{ product: "Клей для блоков", revenue: 9_500, marginPercent: -6, profit: -570, reason: "Новый поставщик, пересчёт" }
];

export function getLossMaking(limit = 10): LossMakingRow[] {
	return lossMakingData.slice(0, limit);
}
