// Sales data for Page 1 - 3 months (Nov 2025, Dec 2025, Jan 2026)

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
