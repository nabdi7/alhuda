"use client";
import React, { useState } from "react";
import { Save, Pencil, Trash2, Plus, GraduationCap, Users, BookOpen } from "lucide-react";

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">{children}</div>
);
const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{children}</label>
);
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 text-gray-900" />
);
const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select {...props} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 text-gray-900" />
);
const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea {...props} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 text-gray-900 resize-none" rows={2} />
);
const Tag = ({ label, color }: { label: string; color: "green" | "blue" | "amber" | "gray" }) => {
  const classes = { green: "bg-green-100 text-green-800", blue: "bg-blue-100 text-blue-800", amber: "bg-amber-100 text-amber-800", gray: "bg-gray-100 text-gray-600" };
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${classes[color]}`}>{label}</span>;
};
const BtnGreen = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <button onClick={onClick} className="inline-flex items-center gap-1.5 bg-green-700 hover:bg-green-800 active:scale-[0.98] text-white text-sm font-medium px-4 py-2 rounded-lg transition-all">{children}</button>
);
const BtnOutline = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <button onClick={onClick} className="inline-flex items-center gap-1.5 border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium px-4 py-2 rounded-lg transition-all">{children}</button>
);
const SectionTitle = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="flex items-center gap-2 mb-5">
    <span className="text-green-700">{icon}</span>
    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{children}</p>
  </div>
);

// ─── School Timings ───────────────────────────────────────────────────────────

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"];

interface DayTiming {
  day: string;
  enabled: boolean;
  start: string;
  end: string;
}

const SchoolTimingsSection = () => {
  const [timings, setTimings] = useState<DayTiming[]>(
    DAYS.map((day) => ({
      day,
      enabled: ["Sunday", "Saturday"].includes(day),
      start: "09:00",
      end: "12:00",
    }))
  );

  const toggle = (day: string) =>
    setTimings((prev) => prev.map((t) => (t.day === day ? { ...t, enabled: !t.enabled } : t)));
  const update = (day: string, key: "start" | "end", val: string) =>
    setTimings((prev) => prev.map((t) => (t.day === day ? { ...t, [key]: val } : t)));

  return (
    <Card>
      <SectionTitle icon={<GraduationCap className="w-4 h-4" />}>Islamic school timings</SectionTitle>
      <div className="space-y-3 mb-5">
        {timings.map((t) => (
          <div key={t.day} className={`flex items-center gap-4 p-3 rounded-lg border transition-all ${t.enabled ? "border-green-100 bg-green-50/50" : "border-gray-100 bg-gray-50/50"}`}>
            <label className="flex items-center gap-2 w-32 cursor-pointer flex-shrink-0">
              <input
                type="checkbox"
                checked={t.enabled}
                onChange={() => toggle(t.day)}
                className="accent-green-700"
              />
              <span className={`text-sm font-medium ${t.enabled ? "text-gray-800" : "text-gray-400"}`}>{t.day}</span>
            </label>
            {t.enabled ? (
              <div className="flex items-center gap-2 flex-1">
                <div className="flex-1">
                  <Label>Start</Label>
                  <Input type="time" value={t.start} onChange={(e) => update(t.day, "start", e.target.value)} />
                </div>
                <span className="text-gray-300 mt-5">—</span>
                <div className="flex-1">
                  <Label>End</Label>
                  <Input type="time" value={t.end} onChange={(e) => update(t.day, "end", e.target.value)} />
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">No classes</p>
            )}
          </div>
        ))}
      </div>
      <BtnGreen><Save className="w-4 h-4" /> Save timings</BtnGreen>
    </Card>
  );
};

// ─── Teachers ─────────────────────────────────────────────────────────────────

interface Teacher {
  id: number;
  name: string;
  subject: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive";
}

const INITIAL_TEACHERS: Teacher[] = [
  { id: 1, name: "Ustadh Khalid Mansour", subject: "Quran & Tajweed", email: "khalid@alhuda.com", phone: "", status: "Active" },
  { id: 2, name: "Ustadha Fatima Hassan", subject: "Islamic Studies", email: "fatima@alhuda.com", phone: "", status: "Active" },
  { id: 3, name: "Br. Omar Siddiqui", subject: "Arabic Language", email: "omar@alhuda.com", phone: "", status: "Active" },
];

const TeachersSection = () => {
  const [teachers, setTeachers] = useState(INITIAL_TEACHERS);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", subject: "", email: "", phone: "", status: "Active" });

  const add = () => {
    if (!form.name) return;
    setTeachers((prev) => [...prev, { id: Date.now(), ...form } as Teacher]);
    setForm({ name: "", subject: "", email: "", phone: "", status: "Active" });
    setOpen(false);
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-1">
        <SectionTitle icon={<Users className="w-4 h-4" />}>Teachers</SectionTitle>
        <BtnGreen onClick={() => setOpen(!open)}><Plus className="w-4 h-4" /> Add teacher</BtnGreen>
      </div>

      {teachers.map((t) => (
        <div key={t.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{t.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">{t.subject} · {t.email}</p>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Tag label={t.status} color={t.status === "Active" ? "green" : "gray"} />
            <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><Pencil className="w-3.5 h-3.5" /></button>
            <button onClick={() => setTeachers((prev) => prev.filter((x) => x.id !== t.id))} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
          </div>
        </div>
      ))}

      {open && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mt-4">
          <p className="text-sm font-semibold text-gray-800 mb-3">New teacher</p>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="col-span-2">
              <Label>Full name</Label>
              <Input placeholder="e.g. Ustadh Khalid Mansour" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <Label>Subject</Label>
              <Input placeholder="e.g. Quran & Tajweed" value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} />
            </div>
            <div>
              <Label>Status</Label>
              <Select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}>
                <option>Active</option>
                <option>Inactive</option>
              </Select>
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" placeholder="teacher@alhuda.com" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
            </div>
            <div>
              <Label>Phone</Label>
              <Input type="tel" placeholder="(555) 000-0000" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
            </div>
          </div>
          <div className="flex gap-2">
            <BtnGreen onClick={add}><Save className="w-4 h-4" /> Save</BtnGreen>
            <BtnOutline onClick={() => setOpen(false)}>Cancel</BtnOutline>
          </div>
        </div>
      )}
    </Card>
  );
};

// ─── Lessons ──────────────────────────────────────────────────────────────────

interface Lesson {
  id: number;
  subject: string;
  teacher: string;
  ageGroup: string;
  day: string;
  time: string;
  room: string;
}

const INITIAL_LESSONS: Lesson[] = [
  { id: 1, subject: "Quran — Beginner", teacher: "Ustadh Khalid Mansour", ageGroup: "Ages 5–8", day: "Sunday", time: "9:00 AM – 10:00 AM", room: "Room 1" },
  { id: 2, subject: "Quran — Advanced", teacher: "Ustadh Khalid Mansour", ageGroup: "Ages 9–14", day: "Sunday", time: "10:00 AM – 11:30 AM", room: "Room 1" },
  { id: 3, subject: "Islamic Studies", teacher: "Ustadha Fatima Hassan", ageGroup: "Ages 8–12", day: "Sunday", time: "9:00 AM – 10:30 AM", room: "Room 2" },
  { id: 4, subject: "Arabic Language", teacher: "Br. Omar Siddiqui", ageGroup: "Ages 10–15", day: "Saturday", time: "10:00 AM – 11:30 AM", room: "Room 3" },
];

const AGE_GROUPS = ["Ages 5–8", "Ages 8–12", "Ages 9–14", "Ages 10–15", "Ages 13+", "Adults"];

const LessonsSection = () => {
  const [lessons, setLessons] = useState(INITIAL_LESSONS);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ subject: "", teacher: "", ageGroup: "Ages 5–8", day: "Sunday", time: "", room: "" });

  const add = () => {
    if (!form.subject) return;
    setLessons((prev) => [...prev, { id: Date.now(), ...form } as Lesson]);
    setForm({ subject: "", teacher: "", ageGroup: "Ages 5–8", day: "Sunday", time: "", room: "" });
    setOpen(false);
  };

  const dayColor: Record<string, "green" | "blue"> = { Sunday: "green", Saturday: "blue" };

  return (
    <Card>
      <div className="flex items-center justify-between mb-1">
        <SectionTitle icon={<BookOpen className="w-4 h-4" />}>Lessons</SectionTitle>
        <BtnGreen onClick={() => setOpen(!open)}><Plus className="w-4 h-4" /> Add lesson</BtnGreen>
      </div>

      {lessons.map((l) => (
        <div key={l.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{l.subject}</p>
            <p className="text-xs text-gray-400 mt-0.5">{l.teacher} · {l.ageGroup} · {l.time} · {l.room}</p>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Tag label={l.day} color={dayColor[l.day] ?? "gray"} />
            <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><Pencil className="w-3.5 h-3.5" /></button>
            <button onClick={() => setLessons((prev) => prev.filter((x) => x.id !== l.id))} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
          </div>
        </div>
      ))}

      {open && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mt-4">
          <p className="text-sm font-semibold text-gray-800 mb-3">New lesson</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
            <div className="col-span-2 sm:col-span-3">
              <Label>Subject / Class name</Label>
              <Input placeholder="e.g. Quran — Beginner" value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} />
            </div>
            <div>
              <Label>Teacher</Label>
              <Input placeholder="e.g. Ustadh Khalid" value={form.teacher} onChange={(e) => setForm((f) => ({ ...f, teacher: e.target.value }))} />
            </div>
            <div>
              <Label>Age group</Label>
              <Select value={form.ageGroup} onChange={(e) => setForm((f) => ({ ...f, ageGroup: e.target.value }))}>
                {AGE_GROUPS.map((g) => <option key={g}>{g}</option>)}
              </Select>
            </div>
            <div>
              <Label>Day</Label>
              <Select value={form.day} onChange={(e) => setForm((f) => ({ ...f, day: e.target.value }))}>
                {DAYS.map((d) => <option key={d}>{d}</option>)}
              </Select>
            </div>
            <div>
              <Label>Time</Label>
              <Input placeholder="e.g. 9:00 AM – 10:00 AM" value={form.time} onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))} />
            </div>
            <div>
              <Label>Room</Label>
              <Input placeholder="e.g. Room 1" value={form.room} onChange={(e) => setForm((f) => ({ ...f, room: e.target.value }))} />
            </div>
          </div>
          <div className="flex gap-2">
            <BtnGreen onClick={add}><Save className="w-4 h-4" /> Save</BtnGreen>
            <BtnOutline onClick={() => setOpen(false)}>Cancel</BtnOutline>
          </div>
        </div>
      )}
    </Card>
  );
};

// ─── Export ───────────────────────────────────────────────────────────────────

export const EducationPanel = () => (
  <div>
    <SchoolTimingsSection />
    <TeachersSection />
    <LessonsSection />
  </div>
);