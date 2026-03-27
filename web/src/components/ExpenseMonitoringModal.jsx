import * as React from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { buildCategorySummary, buildMonthlyTrend } from "@/lib/expenseStats"

const CATEGORY_COLORS = [
  "#6366f1",
  "#22c55e",
  "#f59e0b",
  "#ec4899",
  "#06b6d4",
  "#a855f7",
  "#f97316",
  "#94a3b8",
]

function formatUz(n) {
  return Number(n || 0).toLocaleString("uz-UZ")
}

export function ExpenseMonitoringModal({
  open,
  onOpenChange,
  expenses,
  totalExpenses,
  expenseLimit,
  trigger,
}) {
  const categoryRows = React.useMemo(() => {
    const rows = buildCategorySummary(expenses)
    if (rows.length <= 8) return rows
    const top = rows.slice(0, 7)
    const restSum = rows.slice(7).reduce((a, r) => a + r.total, 0)
    return [...top, { category: "Boshqa (qolganlari)", total: restSum }]
  }, [expenses])

  const categoryChartData = React.useMemo(
    () => categoryRows.map((r) => ({ name: r.category, value: r.total })),
    [categoryRows]
  )

  const monthlyChartData = React.useMemo(() => {
    const trend = buildMonthlyTrend(expenses)
    return trend.slice(-10).map((r) => ({
      label: r.period.slice(5),
      total: r.total,
    }))
  }, [expenses])

  const limitPieData = React.useMemo(() => {
    if (!expenseLimit || expenseLimit <= 0) return null
    const total = Number(totalExpenses) || 0
    const cap = Number(expenseLimit)
    const used = Math.min(total, cap)
    const left = Math.max(0, cap - used)
    return [
      { name: "Sarflangan", value: used, over: total > cap },
      { name: "Qolgan", value: left },
    ]
  }, [expenseLimit, totalExpenses])

  const hasData = (expenses || []).length > 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger}
      <DialogContent
        showCloseButton
        className="mx-2 max-h-[min(90vh,720px)] overflow-y-auto sm:max-w-xl"
      >
        <DialogHeader>
          <DialogTitle>Xarajat monitoringi</DialogTitle>
          <DialogDescription>
            Limit, kategoriyalar va oyma-oy sarflanish grafigi
          </DialogDescription>
        </DialogHeader>

        {!hasData ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            Grafiklar uchun kamida bitta xarajat qo&apos;shing.
          </p>
        ) : (
          <div className="space-y-8 pb-2">
            {limitPieData && (
              <div>
                <h3 className="mb-3 text-sm font-medium text-foreground">
                  Oylik limit (UZS)
                </h3>
                <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-start sm:gap-6">
                  <div className="relative h-[200px] w-[200px] shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={limitPieData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={62}
                          outerRadius={88}
                          startAngle={90}
                          endAngle={-270}
                          strokeWidth={0}
                        >
                          {limitPieData.map((entry, index) => (
                            <Cell
                              key={entry.name}
                              fill={
                                index === 0
                                  ? entry.over
                                    ? "#ef4444"
                                    : "#6366f1"
                                  : "#cbd5e1"
                              }
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${formatUz(value)} UZS`, ""]}
                          contentStyle={{ borderRadius: 12 }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-[11px] text-muted-foreground">
                        Jami
                      </span>
                      <span className="text-lg font-semibold tabular-nums">
                        {formatUz(totalExpenses)}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        / {formatUz(expenseLimit)}
                      </span>
                    </div>
                  </div>
                  <ul className="w-full space-y-2 text-sm">
                    <li className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Sarflangan</span>
                      <span className="font-medium tabular-nums">
                        {formatUz(Math.min(totalExpenses, expenseLimit))} UZS
                      </span>
                    </li>
                    <li className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Limitdan qolgan</span>
                      <span className="font-medium tabular-nums">
                        {formatUz(Math.max(0, expenseLimit - totalExpenses))} UZS
                      </span>
                    </li>
                    {totalExpenses > expenseLimit && (
                      <li className="rounded-lg bg-destructive/10 px-2 py-1.5 text-destructive">
                        Limitdan{" "}
                        <span className="font-semibold tabular-nums">
                          {formatUz(totalExpenses - expenseLimit)} UZS
                        </span>{" "}
                        oshib ketgan
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            )}

            {!expenseLimit && (
              <p className="rounded-lg border border-dashed border-border/80 bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
                Yumaloq progress uchun &quot;Limit sozlash&quot; orqali oylik limit
                belgilang.
              </p>
            )}

            <div>
              <h3 className="mb-3 text-sm font-medium text-foreground">
                Kategoriyalar bo&apos;yicha
              </h3>
              <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={88}
                      label={({ name, percent }) =>
                        `${name.slice(0, 12)}${name.length > 12 ? "…" : ""} ${(percent * 100).toFixed(0)}%`
                      }
                      labelLine={false}
                    >
                      {categoryChartData.map((_, i) => (
                        <Cell
                          key={i}
                          fill={CATEGORY_COLORS[i % CATEGORY_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${formatUz(value)} UZS`, ""]}
                      contentStyle={{ borderRadius: 12 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-medium text-foreground">
                Oyma-oy sarflanish
              </h3>
              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyChartData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border/60" />
                    <XAxis
                      dataKey="label"
                      tick={{ fontSize: 11 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11 }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => (v >= 1_000_000 ? `${(v / 1_000_000).toFixed(1)}M` : `${Math.round(v / 1000)}k`)}
                    />
                    <Tooltip
                      formatter={(value) => [`${formatUz(value)} UZS`, "Jami"]}
                      labelFormatter={(l) => `Oy: ${l}`}
                      contentStyle={{ borderRadius: 12 }}
                    />
                    <Bar dataKey="total" fill="#6366f1" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export function ExpenseMonitoringTrigger({ className, variant = "outline", ...props }) {
  return (
    <Button type="button" variant={variant} className={className} {...props} />
  )
}
