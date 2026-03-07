// Sales data for Page 1 — стройматериалы, 3 months (Nov 2025, Dec 2025, Jan 2026)

export interface MonthlySalesData {
	month: string;
	revenue: number;
	cashCollected: number;
	grossProfit: number;
	grossMarginPercent: number;
	installmentSales: number;
	cashSales: number;
}

export const monthlyData: MonthlySalesData[] = [
	{
		month: "Nov 2025",
		revenue: 1200000,
		cashCollected: 1050000,
		grossProfit: 360000,
		grossMarginPercent: 30.0,
		installmentSales: 420000,
		cashSales: 780000
	},
	{
		month: "Dec 2025",
		revenue: 1450000,
		cashCollected: 1100000,
		grossProfit: 392000,
		grossMarginPercent: 27.0,
		installmentSales: 650000,
		cashSales: 800000
	},
	{
		month: "Jan 2026",
		revenue: 1680000,
		cashCollected: 1180000,
		grossProfit: 403000,
		grossMarginPercent: 24.0,
		installmentSales: 840000,
		cashSales: 840000
	}
];

// Mock category-level margin data — категории стройматериалов (топ по марже / причины падения маржи)
export interface CategoryMarginRow {
	name: string;
	marginPercent: number;
	marginChangePp: number; // change in percentage points vs base period
	revenue: number;
}

export const categoryMarginData: CategoryMarginRow[] = [
	{ name: "Цемент и смеси", marginPercent: 16.8, marginChangePp: -5.2, revenue: 450000 },
	{ name: "Арматура и металл", marginPercent: 19.5, marginChangePp: -4.1, revenue: 380000 },
	{ name: "Пиломатериалы", marginPercent: 21.0, marginChangePp: -3.5, revenue: 320000 },
	{ name: "Кровля и изоляция", marginPercent: 23.2, marginChangePp: -2.8, revenue: 280000 },
	{ name: "Сантехника и электрика", marginPercent: 25.5, marginChangePp: -2.0, revenue: 240000 },
	{ name: "Отделочные материалы", marginPercent: 27.0, marginChangePp: -1.2, revenue: 200000 },
	{ name: "Инструменты", marginPercent: 30.5, marginChangePp: 0.5, revenue: 170000 }
];

/** Top categories by margin (worst margin first = main drivers of margin drop) */
export function getTopCategoriesByMargin(limit = 6): CategoryMarginRow[] {
	return [...categoryMarginData]
		.sort((a, b) => a.marginPercent - b.marginPercent)
		.slice(0, limit);
}

// Calculate derived metrics
export function calculateMetrics(data: MonthlySalesData[]) {
	const current = data[data.length - 1];
	const previous = data[data.length - 2];
	const first = data[0];

	return {
		// Current month values
		currentRevenue: current.revenue,
		currentCashCollected: current.cashCollected,
		currentGrossMargin: current.grossMarginPercent,
		currentInstallmentShare: (current.installmentSales / current.revenue) * 100,
		currentCashCoverage: (current.cashCollected / current.revenue) * 100,

		// MoM Growth
		revenueMoMGrowth: previous ? ((current.revenue - previous.revenue) / previous.revenue) * 100 : 0,
		cashMoMGrowth: previous ? ((current.cashCollected - previous.cashCollected) / previous.cashCollected) * 100 : 0,

		// Margin change vs first month
		marginChange: current.grossMarginPercent - first.grossMarginPercent
	};
}
