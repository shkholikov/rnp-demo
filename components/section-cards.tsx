"use client"

import { TrendingDown, TrendingUp } from "lucide-react"

import { useCountUp } from "@/hooks/use-count-up"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const CARD_STAGGER_MS = 80

export function SectionCards() {
  const revenue = useCountUp(1250, {
    format: "currency",
    duration: 1000,
    delay: CARD_STAGGER_MS * 0,
  })
  const revenueBadge = useCountUp(12.5, {
    format: "percent",
    duration: 800,
    delay: CARD_STAGGER_MS * 0 + 200,
  })

  const customers = useCountUp(1234, {
    format: "number",
    duration: 1000,
    delay: CARD_STAGGER_MS * 1,
  })
  const customersBadge = useCountUp(-20, {
    format: "percent",
    duration: 800,
    delay: CARD_STAGGER_MS * 1 + 200,
  })

  const accounts = useCountUp(45678, {
    format: "number",
    duration: 1200,
    delay: CARD_STAGGER_MS * 2,
  })
  const accountsBadge = useCountUp(12.5, {
    format: "percent",
    duration: 800,
    delay: CARD_STAGGER_MS * 2 + 200,
  })

  const growth = useCountUp(4.5, {
    format: "decimal",
    duration: 1000,
    delay: CARD_STAGGER_MS * 3,
  })
  const growthBadge = useCountUp(4.5, {
    format: "percent",
    duration: 800,
    delay: CARD_STAGGER_MS * 3 + 200,
  })

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid w-full grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs sm:grid-cols-2 xl:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {revenue}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp className="size-3.5" />
              {revenueBadge}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>New Customers</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {customers}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingDown className="size-3.5" />
              {customersBadge}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Down 20% this period <TrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Acquisition needs attention
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Accounts</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {accounts}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp className="size-3.5" />
              {accountsBadge}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong user retention <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Engagement exceed targets</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {growth}%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp className="size-3.5" />
              {growthBadge}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady performance increase <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>
  )
}
