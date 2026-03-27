import React from "react"
import { 
  CreditCardIcon, 
  TrendingUpIcon, 
  ArrowUpRightIcon, 
  CalendarIcon, 
  Trash2Icon,
  MessageSquareIcon 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ExpenseAddModal } from "@/components/ExpenseAddModal"
import { ExpenseLimitModal } from "@/components/ExpenseLimitModal"

export function ExpensesPage({
  expenses,
  expenseLimit,
  persistExpenses,
  setExpenseLimit,
  normalizeExpense,
  BottomNav
}) {
  const totalSpent = expenses ? expenses.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0) : 0
  const limitPercent = expenseLimit > 0 ? Math.min(100, (totalSpent / expenseLimit) * 100) : 0
  const remaining = expenseLimit > 0 ? Math.max(0, expenseLimit - totalSpent) : 0

  const expensesList = expenses && expenses.length > 0 ? (
    <div className="space-y-3 mt-2">
      {expenses.map((exp) => (
        <div 
          key={exp.id} 
          className="group relative flex items-center justify-between gap-4 p-4 rounded-2xl bg-background/40 border border-border/30 hover:bg-background/70 transition-all !duration-0 shadow-xs"
        >
          <div className="flex items-center gap-3.5 flex-1 min-w-0">
            <div className="size-10 rounded-xl bg-foreground/5 flex items-center justify-center shrink-0">
              <span className="text-base">💸</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-[14px] text-foreground/90 truncate">{exp.title}</h4>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[11px] font-bold text-muted-foreground/60 flex items-center gap-1.5 uppercase tracking-wider">
                  <CalendarIcon className="size-3" />
                  {exp.date}
                </span>
                <span className="size-0.5 rounded-full bg-muted-foreground/30" />
                <span className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-wider">{exp.category || "Boshqa"}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <div className="font-bold text-[14px]">{(Number(exp.amount) || 0).toLocaleString("uz-UZ")} {exp.currency || "UZS"}</div>
            <Button
              size="icon"
              variant="ghost"
              className="size-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/10 hover:text-red-500"
              onClick={() => persistExpenses(expenses.filter(e => e.id !== exp.id))}
            >
              <Trash2Icon className="size-3" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in slide-in-from-bottom-4 !duration-0">
      <div className="size-14 rounded-2xl bg-muted/40 flex items-center justify-center mb-3">
        <CreditCardIcon className="size-7 text-muted-foreground/40" />
      </div>
      <h3 className="text-base font-medium text-foreground/70">Xarajatlar yo'q</h3>
      <p className="text-xs text-muted-foreground mt-1">Hozircha hech narsa xarid qilinmagan</p>
    </div>
  )

  return (
    <div className="flex flex-col flex-1 w-full max-w-[768px] px-3">
      <div className="py-6 pt-8 animate-in fade-in slide-in-from-top-4 !duration-0">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-semibold tracking-tight">Moliya</h1>
          <div className="size-11 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-sm">
            <TrendingUpIcon className="size-5.5" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground">Xarajatlaringiz va oylik budjet nazorati</p>
      </div>

      <div className="flex-1 space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-6 !duration-0">
        <div className="p-6 rounded-[32px] bg-foreground text-background shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <TrendingUpIcon className="size-20" />
          </div>
          <div className="relative z-10">
            <div className="text-[11px] font-bold text-background/60 uppercase tracking-[0.2em] mb-1">Umumiy harajat (oy)</div>
            <div className="text-4xl font-bold tracking-tight mb-6">{totalSpent.toLocaleString("uz-UZ")} <span className="text-2xl opacity-70">UZS</span></div>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-background/80">
                  <span>Limit: {expenseLimit > 0 ? `${limitPercent.toFixed(1)}%` : "O'rnatilmagan"}</span>
                  <span>{remaining.toLocaleString("uz-UZ")} UZS qoldi</span>
                </div>
                <div className="h-2 w-full bg-background/20 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ease-out ${limitPercent > 90 ? "bg-red-400" : limitPercent > 70 ? "bg-yellow-400" : "bg-green-400"}`}
                    style={{ width: `${limitPercent}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4 w-full px-1">
                <ExpenseAddModal
                  variant="outline"
                  className="rounded-2xl h-10 text-[13px] font-medium shadow-xs transition-all !duration-0 bg-transparent border-background/20 text-background hover:bg-background/10"
                  onAddExpense={(newExp) => {
                    const normalized = normalizeExpense(newExp)
                    persistExpenses([...(expenses || []), normalized])
                  }}
                />
                <ExpenseLimitModal
                  variant="outline"
                  className="rounded-2xl h-10 text-[13px] font-medium shadow-xs transition-all !duration-0 bg-transparent border-background/20 text-background hover:bg-background/10"
                  settings={{ monthlyLimit: expenseLimit }}
                  onSaveSettings={(s) => {
                    const val = Number(s.monthlyLimit)
                    setExpenseLimit(val)
                    localStorage.setItem("kotiba_expense_limit", val.toString())
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-muted-foreground">Oxirgi harajatlar</h3>
            <div className="text-[11px] font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full uppercase">Barchasi</div>
          </div>
          {expensesList}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-8 pt-4 bg-gradient-to-t from-background via-background/95 to-transparent z-50">
        <div className="w-full max-w-[768px] px-4 flex justify-center">
          <BottomNav />
        </div>
      </div>
    </div>
  )
}
