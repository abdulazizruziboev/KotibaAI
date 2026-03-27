import React from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { SlidersHorizontalIcon, MicIcon } from "lucide-react"

export function SettingsPage({
  isLight,
  setIsLight,
  appNotificationsEnabled,
  toggleAppNotifications,
  draftUsername,
  setDraftUsername,
  selectedTimezone,
  setSelectedTimezone,
  customGmtOffset,
  setCustomGmtOffset,
  sttApiKeyInput,
  setSttApiKeyInput,
  geminiApiKeyInput,
  setGeminiApiKeyInput,
  selectedGeminiModel,
  setSelectedGeminiModel,
  saveSettings,
  BottomNav
}) {
  return (
    <div className="flex flex-col flex-1 w-full max-w-[768px] px-3">
      <div className="py-6 pt-8 text-center animate-in fade-in slide-in-from-top-4 !duration-0">
        <h1 className="text-3xl font-semibold tracking-tight">Sozlamalar</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          KotibaAI yordamchisini o'zingizga moslashtiring
        </p>
      </div>

      <div className="flex-1 mt-4 rounded-t-[36px] rounded-b-[36px] bg-background/60 p-5 md:p-8 backdrop-blur-md flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-10 animate-in fade-in zoom-in-95 !duration-0">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
              <SlidersHorizontalIcon className="size-5 text-muted-foreground" />
              Umumiy sozlamalar
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 transition-all">
                <div>
                  <div className="font-medium text-sm text-foreground/90">Tungi ko'rinish</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Qo'qong'u rejimni yoqish</div>
                </div>
                <Switch
                  checked={!isLight}
                  onCheckedChange={() => setIsLight((current) => !current)}
                />
              </div>

              <div className="flex items-center justify-between py-3 transition-all">
                <div>
                  <div className="font-medium text-sm text-foreground/90">Bildirishnomalar</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Vazifa tayyor bo'lganda eslatish</div>
                </div>
                <Switch
                  checked={appNotificationsEnabled}
                  onCheckedChange={toggleAppNotifications}
                />
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-[13px] font-medium pl-1 text-muted-foreground uppercase tracking-wider">Ism</label>
                <input
                  className="w-full rounded-[20px] border border-border/60 bg-background/80 px-4 py-3.5 text-sm outline-none transition-all focus:border-foreground/30 focus:bg-background focus:ring-4 focus:ring-muted/50 !duration-0"
                  value={draftUsername}
                  onChange={(event) => setDraftUsername(event.target.value)}
                  placeholder="Ismingizni kiriting"
                />
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-[13px] font-medium pl-1 text-muted-foreground uppercase tracking-wider">Vaqt zonasi (GMT)</label>
                <select
                  className="!duration-0 w-full rounded-[20px] border border-border/60 bg-background/80 px-4 py-3.5 text-sm outline-none transition-all focus:border-foreground/30 focus:bg-background focus:ring-4 focus:ring-muted/50 appearance-none"
                  value={selectedTimezone}
                  onChange={(e) => setSelectedTimezone(e.target.value)}
                >
                  <option value="Asia/Tashkent">🇺🇿 Toshkent — GMT+5</option>
                  <option value="Europe/Moscow">🇷🇺 Moskva — GMT+3</option>
                  <option value="Asia/Almaty">🇰🇿 Olmaota — GMT+5</option>
                  <option value="Asia/Bishkek">🇰🇬 Bishkek — GMT+6</option>
                  <option value="Asia/Dushanbe">🇹🇯 Dushanbe — GMT+5</option>
                  <option value="Asia/Ashgabat">🇹🇲 Ashgabat — GMT+5</option>
                  <option value="Asia/Baku">🇦🇿 Boku — GMT+4</option>
                  <option value="Asia/Tbilisi">🇬🇪 Tbilisi — GMT+4</option>
                  <option value="Asia/Yerevan">🇦🇲 Yerevan — GMT+4</option>
                  <option value="Asia/Dubai">🇦🇪 Dubai — GMT+4</option>
                  <option value="Asia/Istanbul">🇹🇷 Istanbul — GMT+3</option>
                  <option value="Europe/London">🇬🇧 London — GMT+0</option>
                  <option value="Europe/Berlin">🇩🇪 Berlin — GMT+1</option>
                  <option value="America/New_York">🇺🇸 Nyu-York — GMT-5</option>
                  <option value="custom">⚙️ Custom (GMT offset)</option>
                </select>
              </div>

              {selectedTimezone === "custom" && (
                <div className="space-y-2 pt-2 animate-in fade-in slide-in-from-top-2 !duration-0">
                  <label className="text-[13px] font-medium pl-1 text-muted-foreground uppercase tracking-wider">GMT Offset (masalan: +5, -3.5)</label>
                  <input
                    className="!duration-0 w-full rounded-[20px] border border-border/60 bg-background/80 px-4 py-3.5 text-sm outline-none transition-all focus:border-foreground/30 focus:bg-background focus:ring-4 focus:ring-muted/50"
                    value={customGmtOffset}
                    onChange={(e) => setCustomGmtOffset(e.target.value)}
                    placeholder="+5"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6 flex flex-col h-full">
          <div>
            <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
              <MicIcon className="size-5 text-muted-foreground" />
              API kalitlar
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[13px] font-medium pl-1 text-muted-foreground uppercase tracking-wider">
                  UzbekVoice API key <span className="normal-case text-xs opacity-70 ml-1">(Ovoz uchun)</span>
                </label>
                <input
                  className="!duration-0 w-full text-sm rounded-[20px] border border-border/60 bg-background/80 px-4 py-3.5 outline-none transition-all focus:border-foreground/30 focus:bg-background focus:ring-4 focus:ring-muted/50"
                  value={sttApiKeyInput}
                  onChange={(event) => setSttApiKeyInput(event.target.value)}
                  placeholder="sk-..."
                />
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-[13px] font-medium pl-1 text-muted-foreground uppercase tracking-wider">
                  Gemini API key <span className="normal-case text-xs opacity-70 ml-1">(Aql markazi)</span>
                </label>
                <input
                  type="password"
                  className="!duration-0 w-full text-sm rounded-[20px] border border-border/60 bg-background/80 px-4 py-3.5 outline-none transition-all focus:border-foreground/30 focus:bg-background focus:ring-4 focus:ring-muted/50"
                  value={geminiApiKeyInput}
                  onChange={(event) => setGeminiApiKeyInput(event.target.value)}
                  placeholder="AIzaSy..."
                />
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-[13px] font-medium pl-1 text-muted-foreground uppercase tracking-wider">
                  Model <span className="normal-case text-xs opacity-70 ml-1">(Gemini versiyasi)</span>
                </label>
                <select
                  className="!duration-0 w-full text-sm rounded-[20px] border border-border/60 bg-background/80 px-4 py-3.5 outline-none transition-all focus:border-foreground/30 focus:bg-background focus:ring-4 focus:ring-muted/50 appearance-none"
                  value={selectedGeminiModel}
                  onChange={(e) => setSelectedGeminiModel(e.target.value)}
                >
                  <option value="gemini-1.5-flash">💡 Gemini 1.5 Flash (Eng yuqori limit)</option>
                  <option value="gemini-1.5-flash-8b">⚡ Gemini 1.5 Flash-8B (Juda tez)</option>
                  <option value="gemini-2.5-flash">🚀 Gemini 2.5 Flash</option>
                  <option value="gemini-3-flash-preview">✨ Gemini 3 Flash (Paid only)</option>
                  <option value="gemini-1.5-pro">🧠 Gemini 1.5 Pro (Aql markazi)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-8">
            <Button size="lg" className="w-full rounded-[20px] h-[52px] text-[15px] shadow-sm font-medium transition-all hover:-translate-y-0.5 active:translate-y-0" onClick={saveSettings}>
              Sozlamalarni saqlash
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center mt-6 pb-6 pt-2 animate-in fade-in slide-in-from-bottom-4 !duration-0">
        <BottomNav />
      </div>
    </div>
  )
}
