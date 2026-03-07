// Portfolio (Wallet) data — портфель рассрочки, все суммы в TJS

export interface PortfolioMetrics {
	portfolioBalance: number;
	activeContracts: number;
	averageTermMonths: number;
	averageTicket: number;
	longInstallmentSharePercent: number; // 9–12 мес
}

export interface PortfolioTrendPoint {
	month: string;
	balance: number;
}

export interface PortfolioByTermRow {
	term: string;
	amount: number;
	contracts: number;
}

export interface ParetoRow {
	client: string;
	amount: number;
	sharePercent: number;
	cumulativePercent: number;
}

export interface TopClientRow {
	client: string;
	amount: number;
	sharePercent: number;
}

// Current metrics (mock)
export const portfolioMetrics: PortfolioMetrics = {
	portfolioBalance: 4_200_000,
	activeContracts: 312,
	averageTermMonths: 7.2,
	averageTicket: 13_462,
	longInstallmentSharePercent: 28.5
};

// Portfolio over time (for line chart)
export const portfolioTrendData: PortfolioTrendPoint[] = [
	{ month: "Sep 2025", balance: 3_650_000 },
	{ month: "Oct 2025", balance: 3_820_000 },
	{ month: "Nov 2025", balance: 3_950_000 },
	{ month: "Dec 2025", balance: 4_080_000 },
	{ month: "Jan 2026", balance: 4_200_000 }
];

// Distribution by term (3 / 6 / 9 / 12 months)
export const portfolioByTermData: PortfolioByTermRow[] = [
	{ term: "3 мес", amount: 980_000, contracts: 95 },
	{ term: "6 мес", amount: 1_520_000, contracts: 128 },
	{ term: "9 мес", amount: 892_000, contracts: 52 },
	{ term: "12 мес", amount: 808_000, contracts: 37 }
];

// Pareto: top clients and cumulative share (for concentration chart)
const _paretoRaw = [
	{ client: "ООО «СтройДар»", amount: 420_000 },
	{ client: "ООО «МегаСтрой»", amount: 385_000 },
	{ client: "ИП Рахимов А.", amount: 298_000 },
	{ client: "ООО «РегионСтрой»", amount: 256_000 },
	{ client: "ИП Юсуфов М.", amount: 218_000 },
	{ client: "ООО «ХуджандСтрой»", amount: 195_000 },
	{ client: "ИП Каримова З.", amount: 172_000 },
	{ client: "ООО «КухандСтрой»", amount: 148_000 },
	{ client: "ИП Саидова Н.", amount: 125_000 },
	{ client: "ИП Файзов Т.", amount: 98_000 }
];
const _totalPareto = _paretoRaw.reduce((s, r) => s + r.amount, 0);

export const portfolioParetoData: ParetoRow[] = _paretoRaw.reduce<ParetoRow[]>((acc, row, i) => {
	const sharePercent = (row.amount / _totalPareto) * 100;
	const cumulativePercent = acc.length === 0 ? sharePercent : acc[acc.length - 1].cumulativePercent + sharePercent;
	acc.push({
		client: row.client.length > 18 ? row.client.slice(0, 16) + "…" : row.client,
		amount: row.amount,
		sharePercent,
		cumulativePercent
	});
	return acc;
}, []);

// Top clients by portfolio (for table) — use full portfolio balance for % calc
const _portfolioTotal = portfolioMetrics.portfolioBalance;

export const topClientsData: TopClientRow[] = [
	{ client: "ООО «СтройДар»", amount: 420_000, sharePercent: (420_000 / _portfolioTotal) * 100 },
	{ client: "ООО «МегаСтрой»", amount: 385_000, sharePercent: (385_000 / _portfolioTotal) * 100 },
	{ client: "ИП Рахимов А.", amount: 298_000, sharePercent: (298_000 / _portfolioTotal) * 100 },
	{ client: "ООО «РегионСтрой»", amount: 256_000, sharePercent: (256_000 / _portfolioTotal) * 100 },
	{ client: "ИП Юсуфов М.", amount: 218_000, sharePercent: (218_000 / _portfolioTotal) * 100 },
	{ client: "ООО «ХуджандСтрой»", amount: 195_000, sharePercent: (195_000 / _portfolioTotal) * 100 },
	{ client: "ИП Каримова З.", amount: 172_000, sharePercent: (172_000 / _portfolioTotal) * 100 },
	{ client: "ООО «КухандСтрой»", amount: 148_000, sharePercent: (148_000 / _portfolioTotal) * 100 },
	{ client: "ИП Саидова Н.", amount: 125_000, sharePercent: (125_000 / _portfolioTotal) * 100 },
	{ client: "ИП Файзов Т.", amount: 98_000, sharePercent: (98_000 / _portfolioTotal) * 100 }
];

export function getTopClients(limit = 10): TopClientRow[] {
	return topClientsData.slice(0, limit);
}
