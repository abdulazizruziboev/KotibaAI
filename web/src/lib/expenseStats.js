export const buildCategorySummary = (items) => {
  const totals = new Map()
  for (const item of items || []) {
    const category = (item.category || "Boshqa").trim() || "Boshqa"
    const amount = Number(item.amount) || 0
    totals.set(category, (totals.get(category) || 0) + amount)
  }

  return Array.from(totals.entries())
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total)
}

export const buildMonthlyTrend = (items) => {
  const totalsByMonth = new Map()
  for (const item of items || []) {
    const date = new Date(item.date || item.createdAt || Date.now())
    if (Number.isNaN(date.getTime())) continue
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
    const amount = Number(item.amount) || 0
    totalsByMonth.set(key, (totalsByMonth.get(key) || 0) + amount)
  }

  const sorted = Array.from(totalsByMonth.entries()).sort((a, b) => a[0].localeCompare(b[0]))
  let previous = null

  return sorted.map(([period, total]) => {
    const delta = previous === null ? null : total - previous
    previous = total
    return { period, total, delta }
  })
}
