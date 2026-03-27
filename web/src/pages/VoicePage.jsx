import React from "react"
import { Button } from "@/components/ui/button"
import { 
  PlayIcon, 
  PauseIcon, 
  RefreshCcwIcon, 
  Volume2Icon, 
  VolumeXIcon, 
  ZapIcon, 
  HistoryIcon, 
  MessageSquareIcon,
  MicIcon
} from "lucide-react"

export function VoicePage({
  isRecording,
  isPaused,
  visualizerData,
  recognizedText,
  geminiReply,
  audioUrl,
  isSttLoading,
  isGeminiLoading,
  isTtsLoading,
  handleMicPointerDown,
  handleMicPointerUp,
  isMuted,
  setIsMuted,
  isAutoPlay,
  setIsAutoPlay,
  playerRef,
  BottomNav
}) {
  return (
    <div className="flex flex-col flex-1 w-full max-w-[768px] px-3">
      <div className="flex flex-col items-center justify-center flex-1 py-4">
        <div className="relative mb-10 mt-4 flex items-center justify-center">
          <div className={`absolute inset-0 rounded-full blur-[80px] transition-all duration-1000 ${isRecording ? "bg-red-500/30 scale-125" : "bg-blue-500/10 scale-100"}`} />
          <div className="relative flex items-center justify-center gap-1.5 h-32 w-64 bg-background/40 backdrop-blur-xl border border-border/50 rounded-[40px] px-8 shadow-2xl overflow-hidden animate-in zoom-in-95 !duration-0">
            {isRecording ? (
              <div className="flex items-end gap-1.5 h-12">
                {visualizerData.map((v, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-red-500 rounded-full transition-all duration-75"
                    style={{ height: `${Math.max(4, v * 100)}%` }}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-1 text-xs font-semibold text-muted-foreground/60 uppercase tracking-widest pl-0.5 animate-pulse">
                  <div className="size-1.5 rounded-full bg-blue-500/50" />
                  Tayyor
                </div>
                <div className="text-[15px] font-medium text-foreground/80">Qanday yordam bera olaman?</div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full space-y-5 animate-in fade-in slide-in-from-bottom-6 !duration-0">
          {recognizedText && (
            <div className="rounded-[28px] bg-muted/30 border border-border/40 p-5 backdrop-blur-sm relative overflow-hidden group hover:bg-muted/40 transition-colors">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-foreground/10" />
              <div className="flex items-start gap-3.5">
                <div className="mt-1 size-8 rounded-full bg-background flex items-center justify-center shadow-sm border border-border/50 shrink-0">
                  <div className="size-2 rounded-full bg-foreground/30" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Sizning so'rov</span>
                    {isSttLoading && (
                      <div className="flex gap-1">
                        <div className="size-1 rounded-full bg-foreground/40 animate-bounce" />
                        <div className="size-1 rounded-full bg-foreground/40 animate-bounce [animation-delay:0.2s]" />
                        <div className="size-1 rounded-full bg-foreground/40 animate-bounce [animation-delay:0.4s]" />
                      </div>
                    )}
                  </div>
                  <p className="text-[15px] leading-relaxed text-foreground/80 font-medium">
                    {isSttLoading ? "Eshityapman..." : recognizedText}
                  </p>
                </div>
              </div>
            </div>
          )}

          {geminiReply && (
            <div className="rounded-[28px] bg-foreground text-background p-6 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <ZapIcon className="size-12" />
              </div>
              <div className="flex items-start gap-4 relative z-10">
                <div className="mt-1 size-10 rounded-2xl bg-background/15 flex items-center justify-center shrink-0 border border-background/10 backdrop-blur-md">
                  <ZapIcon className="size-5 fill-background" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-background/60 uppercase tracking-widest">KotibaAI Javobi</span>
                    {isGeminiLoading && (
                      <div className="flex gap-1.5">
                        <div className="size-1.5 rounded-full bg-background/50 animate-pulse" />
                        <div className="size-1.5 rounded-full bg-background/50 animate-pulse [animation-delay:0.2s]" />
                        <div className="size-1.5 rounded-full bg-background/50 animate-pulse [animation-delay:0.4s]" />
                      </div>
                    )}
                  </div>
                  <p className="text-[16px] leading-relaxed font-medium">
                    {isGeminiLoading ? "O'ylayapman..." : geminiReply}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between px-2 pt-2">
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="size-10 rounded-full hover:bg-muted transition-all active:scale-95 !duration-0"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeXIcon className="size-4.5" /> : <Volume2Icon className="size-4.5" />}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className={`size-10 rounded-full transition-all active:scale-95 !duration-0 ${isAutoPlay ? "text-blue-500 bg-blue-500/10" : "hover:bg-muted"}`}
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                title="Avtomatik ijro"
              >
                <RefreshCcwIcon className={`size-4.5 ${isAutoPlay ? "animate-spin-slow" : ""}`} />
              </Button>
            </div>

            <div className="flex items-center gap-3">
              {audioUrl && (
                <div className="flex items-center gap-2 pr-1 animate-in fade-in slide-in-from-right-4 !duration-0">
                  <div className="size-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Ovoz tayyor</span>
                </div>
              )}
              {isTtsLoading && (
                <div className="flex items-center gap-2 pr-1">
                  <div className="size-4 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="relative pb-10 flex flex-col items-center">
        <div className="w-full flex justify-center mb-8 px-4 animate-in fade-in slide-in-from-bottom-8 !duration-0">
          <BottomNav />
        </div>

        <button
          className={`group relative flex size-24 items-center justify-center rounded-full transition-all duration-300 active:scale-90 shadow-2xl ${
            isRecording ? "bg-red-500 scale-110 shadow-red-500/40 rotate-12" : "bg-foreground shadow-foreground/20 hover:scale-105 active:rotate-[-8deg]"
          }`}
          onPointerDown={handleMicPointerDown}
          onPointerUp={handleMicPointerUp}
          onPointerLeave={handleMicPointerUp}
        >
          <div className={`absolute inset-0 rounded-full bg-current opacity-20 transition-all duration-700 ${isRecording ? "animate-ping scale-150" : "scale-100 group-hover:scale-110"}`} />
          {isRecording ? <PauseIcon className="size-10 fill-background text-background" /> : <MicIcon className="size-10 fill-background text-background" />}
        </button>

        <div className="mt-8 text-center space-y-1 animate-in fade-in !duration-0">
          <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Ovozli boshqaruv</div>
          <p className="text-[13px] text-muted-foreground/60 font-medium italic">Gapirish uchun tugmani bosib turing</p>
        </div>
      </div>

      <audio ref={playerRef} src={audioUrl || ""} hidden onEnded={() => {}} />
    </div>
  )
}
