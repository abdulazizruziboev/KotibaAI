import React from "react"
import { Button } from "@/components/ui/button"
import { 
  HistoryIcon, 
  Trash2Icon, 
  Edit3Icon, 
  ClockIcon, 
  CalendarIcon 
} from "lucide-react"
import { TaskEditModal } from "@/components/TaskEditModal"

export function TasksPage({
  tasks,
  setEditingTask,
  editingTask,
  saveEditedTask,
  deleteTask,
  BottomNav
}) {
  const tasksList = tasks && tasks.length > 0 ? (
    <div className="space-y-3.5 mt-2">
      {tasks.map((task) => (
        <div 
          key={task.id} 
          className="group relative overflow-hidden rounded-[24px] bg-background/50 border border-border/40 p-5 hover:bg-background/80 transition-all hover:shadow-lg !duration-0"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-[15px] leading-tight text-foreground/90">{task.title}</h3>
                {task.priority === "high" && (
                  <span className="text-[10px] font-bold text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded-full uppercase tracking-widest">Muhim</span>
                )}
              </div>
              <p className="text-[13px] text-muted-foreground/80 leading-relaxed font-medium line-clamp-2">{task.description || task.note}</p>
              
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded-lg">
                  <ClockIcon className="size-3" />
                  {task.time || (task.scheduleAt ? new Date(task.scheduleAt).toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" }) : "Vaqt yo'q")}
                </div>
                {task.date || task.scheduleAt ? (
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground bg-muted/30 px-2 py-1 rounded-lg">
                    <CalendarIcon className="size-3" />
                    {task.date || new Date(task.scheduleAt).toLocaleDateString("uz-UZ")}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="icon"
                variant="ghost"
                className="size-8 rounded-full hover:bg-foreground/5"
                onClick={() => setEditingTask(task)}
              >
                <Edit3Icon className="size-3.5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="size-8 rounded-full hover:bg-red-500/10 hover:text-red-500"
                onClick={() => deleteTask(task.id)}
              >
                <Trash2Icon className="size-3.5" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in slide-in-from-bottom-4 !duration-0">
      <div className="size-16 rounded-3xl bg-muted/30 flex items-center justify-center mb-4">
        <HistoryIcon className="size-8 text-muted-foreground/30" />
      </div>
      <h3 className="text-lg font-medium text-foreground/80">Vazifalar yo'q</h3>
      <p className="text-sm text-muted-foreground mt-1 max-w-[200px]">Hozircha hech qanday vazifa rejalashtirilmagan</p>
    </div>
  )

  return (
    <div className="flex flex-col flex-1 w-full max-w-[768px] px-3">
      <div className="py-6 pt-8 animate-in fade-in slide-in-from-top-4 !duration-0">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-semibold tracking-tight">Vazifalar</h1>
          <div className="size-10 rounded-full bg-muted/30 flex items-center justify-center">
            <HistoryIcon className="size-5 text-muted-foreground" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground">Sizning rejalashtirilgan ishlar ro'yxatingiz</p>
      </div>

      <div className="flex-1 animate-in fade-in slide-in-from-bottom-6 !duration-0 pb-20">
        {tasksList}
      </div>

      <TaskEditModal 
        editingTask={editingTask} 
        setEditingTask={setEditingTask} 
        onSave={saveEditedTask} 
      />

      <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-8 pt-4 bg-gradient-to-t from-background via-background/95 to-transparent z-50">
        <div className="w-full max-w-[768px] px-4 flex justify-center">
          <BottomNav />
        </div>
      </div>
    </div>
  )
}
