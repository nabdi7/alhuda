"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Send, Trash2, Bell, Calendar } from "lucide-react";
import { getPrimaryAnnouncementsData } from "../../../backend/readFB";
import { addPrimaryAnnouncementData, deletePrimaryAnnouncementData } from "../../../backend/updateFB";

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">{children}</div>
);
const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{children}</label>
);
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 text-gray-900" />
);
const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea {...props} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 text-gray-900 resize-none" rows={5} />
);

interface Announcement {
  id: string;
  title: string;
  message: string;
  date: Date;
}

const formatDate = (date: Date) =>
  `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;

export const AnnouncementPanel = () => {
  const [tab, setTab] = useState<"compose" | "history">("compose");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadAnnouncements = useCallback(async () => {
    setLoading(true);
    try {
      const snapshot = await getPrimaryAnnouncementsData();
      const list: Announcement[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        list.push({
          id: doc.id,
          title: data.title,
          message: data.message,
          date: new Date(data.date.seconds * 1000),
        });
      });
      setAnnouncements(list);
    } catch (err) {
      console.error("Failed to load announcements", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (tab === "history") loadAnnouncements();
  }, [tab, loadAnnouncements]);

  const handleSend = async () => {
    if (!title.trim() || !message.trim()) {
      setError("Please enter both title and message.");
      return;
    }
    if (!confirm("Are you sure you want to send this announcement to all users?")) return;

    setSending(true);
    setError("");
    setSuccess("");
    try {
      await addPrimaryAnnouncementData(title.trim(), message.trim());
      setSuccess("Announcement sent successfully.");
      setTitle("");
      setMessage("");
      loadAnnouncements();
    } catch (err) {
      console.error(err);
      setError("Failed to send. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (id: string, announcementTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${announcementTitle}"?`)) return;
    try {
      await deletePrimaryAnnouncementData(id);
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Failed to delete announcement", err);
    }
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-5">
        {(["compose", "history"] as const).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setError(""); setSuccess(""); }}
            className={`px-5 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              tab === t
                ? "border-green-700 text-green-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Compose tab */}
      {tab === "compose" && (
        <Card>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-5">New announcement</p>
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                placeholder="e.g. Friday Prayer Reminder"
                value={title}
                maxLength={40}
                onChange={(e) => { setTitle(e.target.value); setError(""); setSuccess(""); }}
              />
              <p className="text-xs text-gray-400 text-right mt-1">{title.length}/40</p>
            </div>
            <div>
              <Label>Message</Label>
              <Textarea
                placeholder="Enter announcement message here..."
                value={message}
                maxLength={200}
                onChange={(e) => { setMessage(e.target.value); setError(""); setSuccess(""); }}
              />
              <p className="text-xs text-gray-400 text-right mt-1">{message.length}/200</p>
            </div>

            {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
            {success && <p className="text-xs text-green-600 font-medium">{success}</p>}

            <button
              onClick={handleSend}
              disabled={sending}
              className="w-full inline-flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 active:scale-[0.98] text-white text-sm font-semibold px-4 py-3 rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              {sending ? "Sending..." : "Send to all users"}
            </button>
          </div>
        </Card>
      )}

      {/* History tab */}
      {tab === "history" && (
        <Card>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-5">Announcement history</p>
          {loading ? (
            <p className="text-sm text-gray-400 text-center py-8">Loading...</p>
          ) : announcements.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-sm font-medium text-gray-400">No announcements yet</p>
              <p className="text-xs text-gray-300 mt-1">Send your first announcement from the Compose tab</p>
            </div>
          ) : (
            <div className="space-y-3">
              {announcements.map((a) => (
                <div key={a.id} className="border border-gray-100 rounded-xl p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{a.title}</p>
                      <p className="text-sm text-gray-500 mt-1 leading-relaxed">{a.message}</p>
                      <div className="flex items-center gap-1.5 mt-2">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <p className="text-xs text-gray-400">{formatDate(a.date)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(a.id, a.title)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-400 transition-colors flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  );
};