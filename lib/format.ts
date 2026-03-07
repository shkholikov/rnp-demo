/**
 * TJS (Tajikistani Somoni) currency formatting for the app.
 * ISO 4217: TJS. Symbol: SM
 */
const TJS_FORMATTER = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "TJS",
	minimumFractionDigits: 0,
	maximumFractionDigits: 0
});

const TJS_FORMATTER_WITH_DECIMALS = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "TJS",
	minimumFractionDigits: 0,
	maximumFractionDigits: 2
});

/** Format a number as TJS (e.g. "TJS 1,234" or "TJS 1,234.56") */
export function formatTJS(value: number, decimals = false): string {
	return decimals ? TJS_FORMATTER_WITH_DECIMALS.format(value) : TJS_FORMATTER.format(value);
}
