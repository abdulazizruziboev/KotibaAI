import React from "react"
import { NavLink } from "react-router-dom"
import { 
  MicIcon, 
  HistoryIcon, 
  CreditCardIcon, 
  MenuIcon 
} from "lucide-react"

export function BottomNav() {
  return (
    <div className="flex items-center gap-1.5 p-1.5 rounded-[28px] bg-background/80 backdrop-blur-xl border border-border/40 shadow-lg animate-in slide-in-from-bottom-2 !duration-0">
      <NavLink
        to="/"
        className={({ isActive }) => 
          `flex size-12 items-center justify-center rounded-[22px] transition-all !duration-0 ${isActive ? "bg-foreground text-background shadow-md scale-105" : "hover:bg-muted text-muted-foreground/70"}`
        }
      >
        <MicIcon className="size-5.5" />
      </NavLink>
      <NavLink
        to="/tasks"
        className={({ isActive }) => 
          `flex size-12 items-center justify-center rounded-[22px] transition-all !duration-0 ${isActive ? "bg-foreground text-background shadow-md scale-105" : "hover:bg-muted text-muted-foreground/70"}`
        }
      >
        <HistoryIcon className="size-5.5" />
      </NavLink>
      <NavLink
        to="/expenses"
        className={({ isActive }) => 
          `flex size-12 items-center justify-center rounded-[22px] transition-all !duration-0 ${isActive ? "bg-foreground text-background shadow-md scale-105" : "hover:bg-muted text-muted-foreground/70"}`
        }
      >
        <CreditCardIcon className="size-5.5" />
      </NavLink>
      <div className="w-px h-6 bg-border/40 mx-1" />
      <NavLink
        to="/settings"
        className={({ isActive }) => 
          `flex size-12 items-center justify-center rounded-[22px] transition-all !duration-0 ${isActive ? "bg-foreground text-background shadow-md scale-105" : "hover:bg-muted text-muted-foreground/70"}`
        }
      >
        <MenuIcon className="size-5.5" />
      </NavLink>
    </div>
  )
}
