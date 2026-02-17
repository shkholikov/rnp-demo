import { ChartAreaInteractive } from "@/components/chart-area-interactive"

export default function SalesPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h1 className="text-2xl font-semibold">Продажи, наценка и рассрочка</h1>
      <p className="text-muted-foreground">
        Содержимое страницы продаж, наценки и рассрочки
      </p>
      <ChartAreaInteractive />
    </div>
  )
}
