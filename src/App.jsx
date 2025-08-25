import React, { useEffect, useMemo, useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Check, Clock, MapPin, Train, Plane, Sun, Moon, Share2, ListTodo, Home, Download, Info, Link, NotebookText, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "jp-itinerary-2025-09-19_2025-09-30_v2";

const itineraryData = {
  tripName: "Japan Trip, Sept 2025",
  dates: { start: "2025-09-19", end: "2025-09-30" },
  travelers: ["Sumit", "Sanchita"],
  notes: "Carry Suica card or use Apple Pay. JR Pass optional, reserve Shinkansen tickets a day in advance.",
  days: [
    {
      id: "d1",
      date: "2025-09-19",
      city: "Flight",
      theme: "Delhi to Tokyo",
      items: [
        { time: "20:00", title: "Flight AI 358, Delhi (T3) → Tokyo HND", icon: "plane" },
        { time: "Overnight", title: "In flight", icon: "note" },
      ],
    },
    {
      id: "d2",
      date: "2025-09-20",
      city: "Tokyo",
      theme: "Arrival and Shibuya",
      items: [
        { time: "07:55", title: "Arrive at HND", icon: "plane" },
        { time: "12:00", title: "Check in Tokyo Airbnb", icon: "home" },
        { time: "14:30", title: "Sensoji Temple (Asakusa)", icon: "map" },
        { time: "17:30", title: "Shibuya Crossing + Hachiko Statue", icon: "map" },
        { time: "18:30", title: "Shibuya Sky (sunset view)", icon: "map" },
      ],
    },
    {
      id: "d3",
      date: "2025-09-21",
      city: "Tokyo",
      theme: "teamLab Planets",
      items: [
        { time: "09:00", title: "Meiji Shrine", icon: "map" },
        { time: "11:00", title: "Harajuku, Takeshita Street stroll", icon: "map" },
        { time: "14:00", title: "Shinjuku exploration (Govt Building view, Golden Gai)", icon: "map" },
        { time: "18:00", title: "teamLab Planets (Toyosu)", icon: "map" },
      ],
    },
    {
      id: "d4",
      date: "2025-09-22",
      city: "Tokyo",
      theme: "Disneyland",
      items: [{ time: "All day", title: "Tokyo Disneyland", icon: "map" }],
    },
    {
      id: "d5",
      date: "2025-09-23",
      city: "Hakone",
      theme: "Hakone Day Trip",
      items: [
        { time: "Morning", title: "Hakone Free Pass loop (Tozan Railway, Cable Car, Owakudani, Ropeway, Lake Ashi Cruise, Hakone Shrine)", icon: "train" },
        { time: "Evening", title: "Return to Tokyo", icon: "train" },
      ],
    },
    {
      id: "d6",
      date: "2025-09-24",
      city: "Kyoto",
      theme: "Arrival Kyoto",
      items: [
        { time: "Morning", title: "Check out Tokyo Airbnb, Shinkansen to Kyoto (~2.5 hrs)", icon: "train" },
        { time: "12:00", title: "Check in Kyoto Airbnb (near Nishiki Market)", icon: "home" },
        { time: "15:00", title: "Yasaka Shrine", icon: "map" },
        { time: "17:00", title: "Gion District evening stroll", icon: "map" },
      ],
    },
    {
      id: "d7",
      date: "2025-09-25",
      city: "Kyoto",
      theme: "Arashiyama & Kinkaku ji",
      items: [
        { time: "08:00", title: "Arashiyama Bamboo Forest + Togetsukyo Bridge", icon: "map" },
        { time: "11:00", title: "Optional Monkey Park or river walk", icon: "map" },
        { time: "14:00", title: "Kinkaku ji (Golden Pavilion)", icon: "map" },
        { time: "18:00", title: "Dinner at Nishiki Market", icon: "map" },
      ],
    },
    {
      id: "d8",
      date: "2025-09-26",
      city: "Kyoto",
      theme: "Temples & Fushimi Inari",
      items: [
        { time: "08:00", title: "Eikando Temple + Philosopher’s Path", icon: "map" },
        { time: "12:00", title: "Kiyomizu dera Temple", icon: "map" },
        { time: "18:30", title: "Fushimi Inari Taisha (evening)", icon: "map" },
      ],
    },
    {
      id: "d9",
      date: "2025-09-27",
      city: "Kyoto → Osaka",
      theme: "Transfer and Explore",
      items: [
        { time: "09:00", title: "Breakfast at Nishiki Market", icon: "map" },
        { time: "10:00", title: "Nijo Castle (1.5 hrs)", icon: "map" },
        { time: "10:30", title: "Checkout Kyoto Airbnb", icon: "home" },
        { time: "11:00", title: "Train Kyoto → Osaka (30–45 min)", icon: "train" },
        { time: "12:00", title: "Check in Osaka Airbnb", icon: "home" },
        { time: "14:00", title: "Dotonbori street food walk", icon: "map" },
        { time: "18:00", title: "Shinsaibashi shopping arcade", icon: "map" },
      ],
    },
    {
      id: "d10",
      date: "2025-09-28",
      city: "Osaka",
      theme: "City Highlights",
      items: [
        { time: "09:00", title: "Osaka Castle", icon: "map" },
        { time: "14:00", title: "Umeda Sky Building", icon: "map" },
        { time: "18:00", title: "Shinsekai district (Tsutenkaku Tower)", icon: "map" },
      ],
    },
    {
      id: "d11",
      date: "2025-09-29",
      city: "Osaka",
      theme: "Universal Studios Japan",
      items: [{ time: "All day", title: "Universal Studios Japan (Nintendo World, Harry Potter, Minions, Spider Man)", icon: "map" }],
    },
    {
      id: "d12",
      date: "2025-09-30",
      city: "Flight",
      theme: "Osaka → Delhi",
      items: [
        { time: "10:00", title: "Flight VN321, KIX → SGN, 5 hr layover", icon: "plane" },
        { time: "18:40", title: "Flight VN977, SGN → Delhi, arrive 22:05", icon: "plane" },
      ],
    },
  ],
  quickLinks: [
    { label: "Suica", url: "https://www.jreast.co.jp/e/pass/suica.html" },
    { label: "Tokyo Metro", url: "https://www.tokyometro.jp/en/" },
    { label: "Navitime", url: "https://www.navitime.com/en/" },
    { label: "JR West", url: "https://www.westjr.co.jp/global/en/" },
  ],
  emergency: {
    numbers: [
      { label: "Police", value: "110" },
      { label: "Ambulance, Fire", value: "119" },
      { label: "India Embassy Tokyo", value: "+81 3-3262-2391" },
    ],
    addressNote: "Keep hotel and Airbnb address in Japanese and English saved in notes.",
  },
  packing: [
    "Universal adapter",
    "Pocket WiFi or eSIM",
    "Small umbrella",
    "Comfortable walking shoes",
    "Light jacket",
    "Medications",
    "Passport copies",
  ],
};

const IconMap = { map: MapPin, train: Train, plane: Plane, home: Home, note: NotebookText };

function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : initial; } catch { return initial; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(state)); } catch {} }, [key, state]);
  return [state, setState];
}

function useClock(timeZone = "Asia/Tokyo") {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id); }, []);
  const clock = new Intl.DateTimeFormat([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone }).format(now);
  const date = new Intl.DateTimeFormat([], { dateStyle: "medium", timeZone }).format(now);
  return { clock, date };
}

function formatDate(d) { try { return new Intl.DateTimeFormat([], { dateStyle: "medium" }).format(new Date(d)); } catch { return d; } }

function ShareButton() {
  const onShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) { await navigator.share({ title: document.title, text: "Open my Japan itinerary", url }); }
      else { await navigator.clipboard.writeText(url); alert("Link copied to clipboard"); }
    } catch {}
  };
  return <Button onClick={onShare} className="rounded-2xl shadow" size="sm"><Share2 className="h-4 w-4 mr-2" />Share link</Button>;
}

function ThemeToggle() {
  const [dark, setDark] = useLocalStorage("theme-dark", true);
  useEffect(() => { document.documentElement.classList.toggle("dark", !!dark); }, [dark]);
  return <div className="flex items-center gap-2"><Sun className="h-4 w-4" /><Switch checked={!!dark} onCheckedChange={setDark} /><Moon className="h-4 w-4" /></div>;
}

function Header({ title, onReset }) {
  const { clock, date } = useClock("Asia/Tokyo");
  return (
    <div className="sticky top-0 z-40 bg-white/80 dark:bg-zinc-900/80 backdrop-blur border-b">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <img alt="jp" src="https://flagcdn.com/w40/jp.png" className="h-5 w-7 rounded" />
          <div>
            <div className="text-lg font-semibold">{title}</div>
            <div className="text-xs text-muted-foreground">Local time, {date} {clock}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ShareButton />
          <Button size="sm" variant="outline" className="rounded-xl" onClick={onReset}>Reset</Button>
        </div>
      </div>
    </div>
  );
}

function QuickLinks({ links }) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="pb-2"><CardTitle className="text-base">Quick links</CardTitle></CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {links.map((l) => (
          <a key={l.label} href={l.url} target="_blank" rel="noreferrer" className="text-sm px-3 py-1 rounded-xl border hover:bg-zinc-50 dark:hover:bg-zinc-800 inline-flex items-center gap-2">
            <Link className="h-3 w-3" />{l.label}
          </a>
        ))}
      </CardContent>
    </Card>
  );
}

function DayItem({ item, dayId }) {
  const Icon = IconMap[item.icon] || MapPin;
  const [doneState, setDoneState] = useLocalStorage(`done-${dayId}-${item.time}-${item.title}`, false);
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl border">
      <button onClick={() => setDoneState(!doneState)} className={`mt-0.5 shrink-0 border rounded-full p-1 ${doneState ? "bg-green-500 text-white" : "bg-white"}`} aria-label="toggle done">
        <Check className="h-4 w-4" />
      </button>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="rounded-full">{item.time}</Badge>
            <span className={`font-medium ${doneState ? "line-through opacity-60" : ""}`}>{item.title}</span>
          </div>
          <div className="flex items-center gap-2">
            {item.tip && <Badge className="rounded-full" variant="outline">Tip</Badge>}
            {item.map && (
              <a href={item.map} target="_blank" rel="noreferrer" className="text-xs px-2 py-1 rounded-full border inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" /> Map
              </a>
            )}
          </div>
        </div>
        {item.tip && <div className="text-xs text-muted-foreground mt-1">{item.tip}</div>}
      </div>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </div>
  );
}

function DayCard({ day }) {
  const [open, setOpen] = useState(true);
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Badge variant="outline" className="rounded-full"><Clock className="h-3 w-3 mr-1" /> {formatDate(day.date)}</Badge>
              <span>{day.city}</span>
            </CardTitle>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">{day.theme}</div>
          </div>
          <Button size="sm" variant="ghost" onClick={() => setOpen(!open)}>{open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</Button>
        </div>
      </CardHeader>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
            <CardContent className="space-y-3">
              {day.items.map((it, i) => <DayItem key={i} item={it} dayId={day.id} />)}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

function NotesPanel() {
  const [text, setText] = useLocalStorage("trip-notes", "Important Japanese phrases and hotel addresses here");
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="pb-2"><CardTitle className="text-base">Notes</CardTitle></CardHeader>
      <CardContent><Textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} className="rounded-xl" placeholder="Write anything you want to remember" /></CardContent>
    </Card>
  );
}

function PackingList({ items }) {
  const [list, setList] = useLocalStorage("packing", items.map((t) => ({ t, done: false })));
  const toggle = (i) => { const copy = [...list]; copy[i].done = !copy[i].done; setList(copy); };
  const addItem = (t) => setList([...list, { t, done: false }]);
  const [newItem, setNewItem] = useState("");
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><ListTodo className="h-4 w-4" /> Packing list</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Input value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder="Add item" className="rounded-xl" />
          <Button onClick={() => { if (!newItem.trim()) return; addItem(newItem.trim()); setNewItem(""); }} className="rounded-xl">Add</Button>
        </div>
        <div className="grid gap-2">
          {list.map((x, i) => (
            <label key={i} className="flex items-center gap-3 p-2 border rounded-xl">
              <input type="checkbox" checked={x.done} onChange={() => toggle(i)} className="h-4 w-4" />
              <span className={x.done ? "line-through opacity-60" : ""}>{x.t}</span>
            </label>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function TripMeta({ data }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="pb-2"><CardTitle className="text-base">Trip details</CardTitle></CardHeader>
        <CardContent className="text-sm grid gap-2">
          <div><span className="text-zinc-500 dark:text-zinc-400">Dates, </span>{formatDate(data.dates.start)} to {formatDate(data.dates.end)}</div>
          <div><span className="text-zinc-500 dark:text-zinc-400">Travelers, </span>{data.travelers.join(", ")}</div>
          <div className="flex items-start gap-2"><Info className="h-4 w-4 mt-0.5 text-zinc-500 dark:text-zinc-400" /><span>{data.notes}</span></div>
        </CardContent>
      </Card>
      <QuickLinks links={data.quickLinks} />
    </div>
  );
}

function StickyNav() {
  return (
    <div className="fixed bottom-3 left-0 right-0 z-40">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white/95 dark:bg-zinc-900/95 border rounded-2xl shadow-lg grid grid-cols-4">
          <a href="#days" className="p-2 text-center text-sm"><Clock className="h-4 w-4 mx-auto" /> Days</a>
          <a href="#packing" className="p-2 text-center text-sm"><ListTodo className="h-4 w-4 mx-auto" /> Pack</a>
          <a href="#notes" className="p-2 text-center text-sm"><NotebookText className="h-4 w-4 mx-auto" /> Notes</a>
          <a href="#about" className="p-2 text-center text-sm"><Info className="h-4 w-4 mx-auto" /> Help</a>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="pb-2"><CardTitle className="text-base">How to use</CardTitle></CardHeader>
      <CardContent className="text-sm grid gap-2">
        <div>Save this page to your phone home screen for quick offline access, most content works without internet, map links need internet.</div>
        <div>You can tap the checkmark to mark items done. Your progress stays on your device.</div>
        <div>Edit the plan by clicking the Edit button on top, or ask me to customize it for your exact dates and interests.</div>
      </CardContent>
    </Card>
  );
}

// Diagnostics
const ALLOWED_TIME_WORDS = ["All day", "Morning", "Evening", "Overnight"];
function runDiagnostics(data) {
  const results = [];
  data.days.forEach((d) => d.items.forEach((it) => results.push({ name: `icon-valid: ${d.id} ${it.title}`, pass: !!IconMap[it.icon], detail: !!IconMap[it.icon] ? "" : `Unknown icon '${it.icon}'` })));
  const parseDate = (s) => Number.isFinite(new Date(s).getTime());
  results.push({ name: "date-start-parse", pass: parseDate(data.dates.start), detail: data.dates.start });
  results.push({ name: "date-end-parse", pass: parseDate(data.dates.end), detail: data.dates.end });
  data.days.forEach((d) => results.push({ name: `date-parse: ${d.id}`, pass: parseDate(d.date), detail: d.date }));
  data.quickLinks.forEach((l) => results.push({ name: `link-url: ${l.label}`, pass: /^https?:\/\//.test(l.url), detail: l.url }));
  const dayDates = data.days.map((d) => new Date(d.date).getTime());
  const sorted = [...dayDates].sort((a, b) => a - b);
  const sortedOk = dayDates.every((t, i) => t === sorted[i]);
  results.push({ name: "days-sorted-ascending", pass: sortedOk, detail: sortedOk ? "ok" : "not sorted" });
  results.push({ name: "days-count", pass: data.days.length === 12, detail: `${data.days.length}` });
  results.push({ name: "first-day-matches-start", pass: data.days[0]?.date === data.dates.start, detail: `${data.days[0]?.date} vs ${data.dates.start}` });
  results.push({ name: "last-day-matches-end", pass: data.days[data.days.length - 1]?.date === data.dates.end, detail: `${data.days[data.days.length - 1]?.date} vs ${data.dates.end}` });
  const timeRe = /^\d{2}:\d{2}$/;
  data.days.forEach((d) => d.items.forEach((it) => {
    const wordOk = ALLOWED_TIME_WORDS.includes(it.time);
    const timeOk = timeRe.test(it.time) || wordOk;
    results.push({ name: `time-format: ${d.id} ${it.title}`, pass: timeOk, detail: it.time });
  }));
  data.days.forEach((d) => {
    results.push({ name: `city-present: ${d.id}`, pass: !!(d.city && d.city.trim()) });
    results.push({ name: `theme-present: ${d.id}`, pass: !!(d.theme && d.theme.trim()) });
  });
  return results;
}

function DiagnosticsPanel({ data }) {
  const rows = useMemo(() => runDiagnostics(data), [data]);
  const fails = rows.filter((r) => !r.pass);
  const [open, setOpen] = useState(false);
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Diagnostics and tests</CardTitle>
          <Button size="sm" variant="outline" onClick={() => setOpen(!open)}>{open ? "Hide" : "Show"}</Button>
        </div>
      </CardHeader>
      {open && (
        <CardContent className="text-sm">
          <div className="mb-2">{fails.length === 0 ? "All tests passed." : `${fails.length} test(s) failed.`}</div>
          <ul className="grid gap-1">
            {rows.map((r, i) => (
              <li key={i} className={`px-2 py-1 rounded ${r.pass ? "bg-green-50 dark:bg-green-950" : "bg-red-50 dark:bg-red-950"}`}>
                <span className={`font-medium mr-2 ${r.pass ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}`}>{r.pass ? "PASS" : "FAIL"}</span>
                <span>{r.name}</span>
                {r.detail ? <span className="opacity-70">, {r.detail}</span> : null}
              </li>
            ))}
          </ul>
        </CardContent>
      )}
    </Card>
  );
}

export default function App() {
  const [data, setData] = useLocalStorage(STORAGE_KEY, itineraryData);
  const [editOpen, setEditOpen] = useState(false);
  const expectedStart = itineraryData.dates.start;
  const expectedEnd = itineraryData.dates.end;
  const mismatch = data?.dates?.start !== expectedStart || data?.dates?.end !== expectedEnd;
  const resetToPDF = () => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(itineraryData)); } catch {} setData(itineraryData); };
  const cities = useMemo(() => Array.from(new Set(data.days.map((d) => d.city))), [data.days]);

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900 text-zinc-900 dark:text-zinc-50">
      <Header title={data.tripName} onReset={resetToPDF} />

      <main className="max-w-3xl mx-auto px-4 py-4 pb-24 space-y-4">
        {mismatch && (
          <div className="max-w-3xl mx-auto px-0">
            <div className="rounded-xl border bg-amber-50 dark:bg-amber-900/30 text-amber-900 dark:text-amber-100 p-3 text-sm">
              Your device has older cached trip data. Click Reset to load the PDF dates {formatDate(expectedStart)} to {formatDate(expectedEnd)}.
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="text-sm text-zinc-500 dark:text-zinc-400">Cities, {cities.join(", ")}</div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setEditOpen(true)} className="rounded-xl"><NotebookText className="h-4 w-4 mr-2" />Edit</Button>
            <a href="#" onClick={(e) => { e.preventDefault(); window.print(); }} className="inline-flex items-center gap-2 text-sm px-3 py-2 border rounded-xl">
              <Download className="h-4 w-4" /> Save as PDF
            </a>
          </div>
        </div>

        <TripMeta data={data} />

        <section id="days" className="grid gap-3">
          {data.days.map((d) => <DayCard key={d.id} day={d} />)}
        </section>

        <section id="packing" className="grid gap-3">
          <PackingList items={data.packing} />
        </section>

        <section id="notes" className="grid gap-3">
          <NotesPanel />
        </section>

        <section id="about" className="grid gap-3">
          <About />
          <DiagnosticsPanel data={data} />
        </section>
      </main>

      <StickyNav />

      <Sheet open={editOpen} onOpenChange={setEditOpen}>
        <SheetContent side="bottom" className="h-[85vh] overflow-auto">
          <SheetHeader><SheetTitle>Edit itinerary data</SheetTitle></SheetHeader>
          <div className="my-3 text-sm text-zinc-500 dark:text-zinc-400">Change names, times, links, or add days. Be careful with commas and quotes.</div>
          <Textarea value={JSON.stringify(data, null, 2)} onChange={(e) => {
            try { const parsed = JSON.parse(e.target.value); setData(parsed); } catch {}
          }} rows={24} className="font-mono text-xs rounded-xl" />
          <div className="flex gap-2 mt-3">
            <Button onClick={() => setEditOpen(false)} className="rounded-xl">Done</Button>
          </div>
        </SheetContent>
      </Sheet>

      <style>{`
        :root { color-scheme: light dark; }
        @media print { .no-print { display: none !important; } }
      `}</style>
    </div>
  );
}
