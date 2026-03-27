import React from "react"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function TaskEditModal({ 
  editingTask, 
  setEditingTask, 
  onSave 
}) {
  const [draft, setDraft] = React.useState(null)

  React.useEffect(() => {
    if (editingTask) setDraft({ ...editingTask })
    else setDraft(null)
  }, [editingTask])

  if (!draft) return null

  const handleChange = (fields) => {
    setDraft(prev => ({ ...prev, ...fields }))
  }

  return (
    <Dialog open={!!editingTask} onOpenChange={(open) => !open && setEditingTask(null)}>
      <DialogContent className="sm:max-w-md rounded-[32px] border-border/40 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Vazifani tahrirlash</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1 font-[Poppins]">Sarlavha</label>
            <Input
              className="rounded-2xl border-border/60 bg-muted/20 px-4 py-3 h-12 outline-none focus:ring-4 focus:ring-muted/50 transition-all !duration-0"
              value={draft.title || ""}
              onChange={e => handleChange({ title: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1 font-[Poppins]">Qo'shimcha izoh</label>
            <Input
              className="rounded-2xl border-border/60 bg-muted/20 px-4 py-3 h-12 outline-none focus:ring-4 focus:ring-muted/50 transition-all !duration-0"
              value={draft.note || ""}
              onChange={e => handleChange({ note: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1 font-[Poppins]">Takrorlanishi</label>
            <select
              className="w-full flex h-12 rounded-2xl border border-border/60 bg-muted/20 px-4 py-1 text-sm shadow-xs transition-all !duration-0 outline-none focus:ring-4 focus:ring-muted/50 appearance-none font-medium mt-1 cursor-pointer"
              value={draft.repeatType || "none"}
              onChange={e => handleChange({ repeatType: e.target.value })}
            >
              <option value="none">Bir marta</option>
              <option value="hourly">Har soatda</option>
              <option value="daily">Har kuni</option>
              <option value="weekly">Har haftada</option>
              <option value="custom">Boshqa (minut)</option>
            </select>
          </div>
          {draft.repeatType === "custom" && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 !duration-0">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1 font-[Poppins]">Har qancha minutda</label>
              <Input
                type="number"
                className="rounded-2xl border-border/60 bg-muted/20 px-4 py-3 h-12 outline-none focus:ring-4 focus:ring-muted/50 transition-all !duration-0"
                value={draft.repeatIntervalMinutes || ""}
                onChange={e => handleChange({ repeatIntervalMinutes: Number(e.target.value) || 0 })}
                placeholder="Masalan: 30"
              />
            </div>
          )}
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1 font-[Poppins]">Qachongacha davom etadi</label>
            <Input
              type="datetime-local"
              className="rounded-2xl border-border/60 bg-muted/20 px-4 py-3 h-12 outline-none focus:ring-4 focus:ring-muted/50 transition-all !duration-0"
              value={draft.autoDeleteAt ? new Date(new Date(draft.autoDeleteAt).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ""}
              onChange={e => handleChange({ autoDeleteAt: e.target.value ? new Date(e.target.value).toISOString() : null })}
            />
          </div>
        </div>
        <DialogFooter className="gap-3 sm:gap-0">
          <Button 
            variant="ghost" 
            className="rounded-2xl h-12 font-medium"
            onClick={() => setEditingTask(null)}
          >
            Bekor qilish
          </Button>
          <Button 
            className="rounded-2xl h-12 font-medium px-8 shadow-sm flex-1 sm:flex-none"
            onClick={() => {
              onSave(draft)
              setEditingTask(null)
            }}
          >
            Saqlash
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
