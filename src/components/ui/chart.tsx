"use client"

import * as React from "react"
import {
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"

import { cn } from "@/lib/utils"

// --------------------
// TYPES
// --------------------

type PayloadItem = {
  name?: string
  value?: number | string
  color?: string
  dataKey?: string
  payload?: any
}

// --------------------
// CONFIG
// --------------------

const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [k: string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
    color?: string
    theme?: Record<"light" | "dark", string>
  }
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

// --------------------
// CONTAINER
// --------------------

export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    config: ChartConfig
    children: React.ReactNode
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})

ChartContainer.displayName = "Chart"

// --------------------
// STYLE
// --------------------

export function ChartStyle({
  id,
  config,
}: {
  id: string
  config: ChartConfig
}) {
  const entries = Object.entries(config)

  if (!entries.length) return null

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(([theme, prefix]) => {
            return `
${prefix} [data-chart=${id}] {
${entries
  .map(([key, item]) => {
    const color =
      item.theme?.[theme as "light" | "dark"] || item.color
    return color ? `--color-${key}: ${color};` : ""
  })
  .join("\n")}
}
`
          })
          .join("\n"),
      }}
    />
  )
}

// --------------------
// TOOLTIP
// --------------------

export const ChartTooltip = Tooltip

type TooltipProps = {
  active?: boolean
  payload?: PayloadItem[]
  label?: string
}

export const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  TooltipProps &
    React.HTMLAttributes<HTMLDivElement> & {
      hideLabel?: boolean
    }
>(({ active, payload, label, className, hideLabel }, ref) => {
  const { config } = useChart()

  if (!active || !payload || payload.length === 0) {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn(
        "min-w-32 rounded-lg border bg-white p-2 text-xs shadow",
        className
      )}
    >
      {!hideLabel && label && (
        <div className="font-medium mb-1">{label}</div>
      )}

      <div className="space-y-1">
        {payload.map((item: PayloadItem, index: number) => {
          const key = item.name || item.dataKey || "value"
          const itemConfig = config[key]

          return (
            <div
              key={index}
              className="flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded"
                  style={{ backgroundColor: item.color }}
                />
                <span>
                  {itemConfig?.label || item.name}
                </span>
              </div>

              <span className="font-mono">
                {item.value}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
})

ChartTooltipContent.displayName = "ChartTooltip"

// --------------------
// LEGEND
// --------------------

export const ChartLegend = Legend

type LegendPayloadItem = {
  value?: string
  color?: string
  dataKey?: string
}

export const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    payload?: LegendPayloadItem[]
  }
>(({ className, payload }, ref) => {
  const { config } = useChart()

  if (!payload || payload.length === 0) return null

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center gap-4 pt-3",
        className
      )}
    >
      {payload.map((item, index) => {
        const key = item.dataKey || item.value || "value"
        const itemConfig = config[key]

        return (
          <div
            key={index}
            className="flex items-center gap-1.5"
          >
            <div
              className="h-2 w-2 rounded"
              style={{ backgroundColor: item.color }}
            />
            <span>{itemConfig?.label || item.value}</span>
          </div>
        )
      })}
    </div>
  )
})

ChartLegendContent.displayName = "ChartLegend"