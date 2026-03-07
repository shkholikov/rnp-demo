// Overdue / delinquency data — стройматериалы, все суммы в TJS

/** Portfolio and overdue metrics (current snapshot) */
export interface OverdueMetrics {
	portfolioTotal: number;
	overdueUpTo30: number;
	overdue30Plus: number;
	overdueUpTo30Percent: number;
	overdue30PlusPercent: number;
	totalOverduePercent: number;
	contractsInOverdue: number;
}

/** Aging buckets for bar chart (amounts in TJS) */
export interface AgingBucket {
	label: string;
	onTime: number;
	days1To30: number;
	days31To60: number;
	days60Plus: number;
}

/** 30+ overdue trend over time */
export interface Overdue30TrendPoint {
	month: string;
	amount30Plus: number;
}

/** Top debtor row for actions table */
export interface TopDebtorRow {
	partner: string;
	contractId: string;
	amountTJS: number;
	daysOverdue: number;
	status: string;
	contact: string;
}

// Current metrics (mock)
const portfolioTotal = 4_200_000;

export const overdueMetrics: OverdueMetrics = {
	portfolioTotal,
	overdueUpTo30: 185_000,
	overdue30Plus: 92_000,
	overdueUpTo30Percent: (185_000 / portfolioTotal) * 100,
	overdue30PlusPercent: (92_000 / portfolioTotal) * 100,
	totalOverduePercent: ((185_000 + 92_000) / portfolioTotal) * 100,
	contractsInOverdue: 47
};

// Aging bar: one row = current snapshot (e.g. "на дату") — можно по месяцам для динамики, пока один срез
export const agingBarData: AgingBucket[] = [
	{
		label: "На дату",
		onTime: 3_650_000,
		days1To30: 185_000,
		days31To60: 62_000,
		days60Plus: 30_000
	}
];

// 30+ trend by month (for line chart)
export const overdue30TrendData: Overdue30TrendPoint[] = [
	{ month: "Sep 2025", amount30Plus: 58_000 },
	{ month: "Oct 2025", amount30Plus: 64_000 },
	{ month: "Nov 2025", amount30Plus: 71_000 },
	{ month: "Dec 2025", amount30Plus: 82_000 },
	{ month: "Jan 2026", amount30Plus: 92_000 }
];

// Top 10 debtors by overdue amount (TJS)
export const topDebtorsData: TopDebtorRow[] = [
	{ partner: "ООО «СтройДар»", contractId: "Д-2025-0841", amountTJS: 42_500, daysOverdue: 67, status: "В работе", contact: "+992 90 123 45 67" },
	{ partner: "ИП Рахимов А.", contractId: "Д-2025-0912", amountTJS: 28_100, daysOverdue: 45, status: "Ожидание", contact: "+992 91 234 56 78" },
	{ partner: "ООО «МегаСтрой»", contractId: "Д-2025-0788", amountTJS: 24_800, daysOverdue: 89, status: "В работе", contact: "+992 98 345 67 89" },
	{ partner: "ИП Юсуфов М.", contractId: "Д-2025-0955", amountTJS: 18_200, daysOverdue: 32, status: "Новый", contact: "+992 93 456 78 90" },
	{ partner: "ООО «РегионСтрой»", contractId: "Д-2025-0822", amountTJS: 15_600, daysOverdue: 54, status: "В работе", contact: "+992 90 567 89 01" },
	{ partner: "ИП Каримова З.", contractId: "Д-2025-0889", amountTJS: 12_400, daysOverdue: 41, status: "Ожидание", contact: "+992 91 678 90 12" },
	{ partner: "ООО «ХуджандСтрой»", contractId: "Д-2025-0766", amountTJS: 10_200, daysOverdue: 72, status: "В работе", contact: "+992 92 789 01 23" },
	{ partner: "ИП Саидова Н.", contractId: "Д-2025-0933", amountTJS: 8_900, daysOverdue: 28, status: "Новый", contact: "+992 93 890 12 34" },
	{ partner: "ООО «КухандСтрой»", contractId: "Д-2025-0811", amountTJS: 7_500, daysOverdue: 63, status: "В работе", contact: "+992 94 901 23 45" },
	{ partner: "ИП Файзов Т.", contractId: "Д-2025-0902", amountTJS: 6_100, daysOverdue: 36, status: "Ожидание", contact: "+992 98 012 34 56" }
];

export function getTopDebtors(limit = 10): TopDebtorRow[] {
	return topDebtorsData.slice(0, limit);
}
