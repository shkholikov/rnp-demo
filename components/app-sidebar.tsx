import * as React from "react"
import Link from "next/link"
import { AlertCircle, Package, TrendingUp, Wallet } from "lucide-react"

import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Навигация",
      items: [
        {
          title: "Продажи, наценка и рассрочка",
          url: "/sales",
          icon: TrendingUp,
        },
        {
          title: "Просрочка. До 30 и более",
          url: "/overdue",
          icon: AlertCircle,
        },
        {
          title: "Портфель рассрочки (Wallet)",
          url: "/portfolio",
          icon: Wallet,
        },
        {
          title: "Продажи по номенклатуре и маржинальность",
          url: "/nomenclature",
          icon: Package,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((navItem) => {
                  const Icon = navItem.icon
                  return (
                    <SidebarMenuItem key={navItem.title}>
                      <SidebarMenuButton asChild>
                        <Link href={navItem.url}>
                          <Icon className="size-4 shrink-0" />
                          <span>{navItem.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
