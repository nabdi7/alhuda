"use client";
import React, { useState } from "react";
import {
  Clock,
  Calendar,
  // Megaphone,
  // Moon,
  // GraduationCap,
  CalendarDays,
  User,
  Home,
  LogOut,
  Menu as MenuIcon,
  X,
} from "lucide-react";
import { PrayerTimesPanel } from "./PrayerTimes";
import { MonthlySchedulePanel } from "./MonthlySchedule";
import { EventsPanel } from "./Events";
// import { AnnouncementPanel } from "./Announcements";
// import { RamadanPanel } from "./Ramadan";
// import { EducationPanel } from "./Education";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../backend/firebase";

type TabId =
  | "announcement"
  | "prayer"
  | "schedule"
  | "events"
  | "ramadan"
  | "education";

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "events", label: "Events", icon: <CalendarDays className="w-4 h-4" /> },
  // { id: "announcement", label: "Announcements", icon: <Megaphone className="w-4 h-4" /> },
  { id: "prayer", label: "Prayer times", icon: <Clock className="w-4 h-4" /> },
  {
    id: "schedule",
    label: "Monthly schedule",
    icon: <Calendar className="w-4 h-4" />,
  },
  // { id: "ramadan", label: "Ramadan", icon: <Moon className="w-4 h-4" /> },
  // {
  //   id: "education",
  //   label: "Education",
  //   icon: <GraduationCap className="w-4 h-4" />,
  // },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabId>("events");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = FIREBASE_AUTH.currentUser;

  const handleTabSelect = (id: TabId) => {
    setActiveTab(id);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-56 bg-green-900 flex-shrink-0 flex flex-col min-h-screen
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="px-5 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Alhuda logo"
              className="w-8 h-8 object-contain"
            />
            <div>
              <p className="text-sm font-semibold text-white">Alhuda</p>
              <p className="text-xs text-white/50">Admin portal</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabSelect(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                activeTab === tab.id
                  ? "bg-white/15 text-white font-medium border-l-2 border-green-400"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-white/70" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-white truncate">Admin</p>
              <p className="text-xs text-white/40 truncate">
                {user?.email ?? ""}
              </p>
            </div>
          </div>
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-white/50 hover:text-white hover:bg-white/10 transition-all"
          >
            <Home className="w-3.5 h-3.5" />
            View site
          </Link>
          <button
            onClick={() => signOut(FIREBASE_AUTH)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-white/50 hover:text-white hover:bg-white/10 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-auto">
        {/* Mobile top bar */}
        <div className="md:hidden bg-green-900 px-4 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Alhuda logo"
              className="w-7 h-7 object-contain"
            />
            <p className="text-sm font-semibold text-white">Alhuda Admin</p>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white/70 hover:text-white transition-colors"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <MenuIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Desktop top bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              {TABS.find((t) => t.id === activeTab)?.label}
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Panel */}
        <div className="flex-1 px-8 py-6">
          {/* {activeTab === "announcement" && <AnnouncementPanel />} */}
          {activeTab === "events" && <EventsPanel />}
          {activeTab === "prayer" && <PrayerTimesPanel />}
          {activeTab === "schedule" && <MonthlySchedulePanel />}
          {/* {activeTab === "ramadan" && <RamadanPanel />}
          {activeTab === "education" && <EducationPanel />} */}
        </div>
      </main>
    </div>
  );
}
