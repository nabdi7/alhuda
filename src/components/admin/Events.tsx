"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Plus, Save, Pencil, Trash2, X } from "lucide-react";
import { getPrimaryEventData } from "../../../backend/readFB";
import {
  updatePrimaryEventData,
  uploadEventImages,
  deleteEventImage,
} from "../../../backend/updateFB";

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
    {children}
  </div>
);
const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
    {children}
  </label>
);
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 text-gray-900"
  />
);
const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 text-gray-900 resize-none"
    rows={3}
  />
);
const BtnGreen = ({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="inline-flex items-center gap-1.5 bg-green-700 hover:bg-green-800 active:scale-[0.98] text-white text-sm font-medium px-4 py-2 rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
  >
    {children}
  </button>
);
const BtnOutline = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className="inline-flex items-center gap-1.5 border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium px-4 py-2 rounded-lg transition-all"
  >
    {children}
  </button>
);

interface EventItem {
  id: string;
  title: string;
  date: any;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  image?: string;
  isRecurring?: boolean;
  endDate?: any;
}

interface FormState {
  title: string;
  date: string;
  startTime: string;
  startPeriod: "AM" | "PM";
  endTime: string;
  endPeriod: "AM" | "PM";
  location: string;
  description: string;
  isRecurring: boolean;
  endDate: string;
  image: File | null;
  oldImage: string;
}

const EMPTY_FORM: FormState = {
  title: "",
  date: "",
  startTime: "",
  startPeriod: "AM",
  endTime: "",
  endPeriod: "AM",
  location: "",
  description: "",
  isRecurring: false,
  endDate: "",
  image: null,
  oldImage: "",
};

const parseTimeString = (
  timeStr: string,
): { time: string; period: "AM" | "PM" } => {
  if (!timeStr) return { time: "", period: "AM" };
  const upper = timeStr.toUpperCase();
  const period = upper.includes("PM") ? "PM" : "AM";
  const clean = timeStr.replace(/am|pm/gi, "").trim();
  return { time: clean, period };
};

const formatTime = (time: string, period: string) => {
  if (!time) return "";
  return `${time} ${period}`;
};

const parseFirestoreDate = (date: any): string => {
  if (!date) return "";
  const d = new Date(date.seconds * 1000);
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const parseDateString = (dateStr: string) => {
  const [year, month, day] = dateStr.split("-").map(Number);
  return { year, month, day };
};

const getUTCFormattedDate = (date: any): string => {
  if (!date) return "";
  const d = new Date(date.seconds * 1000);
  return `${d.getUTCMonth() + 1}/${d.getUTCDate()}/${d.getUTCFullYear()}`;
};

const isUpcoming = (item: EventItem): boolean => {
  if (!item.date) return false;
  const eventDate =
    item.isRecurring && item.endDate
      ? new Date(item.endDate.seconds * 1000)
      : new Date(item.date.seconds * 1000);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return eventDate >= today;
};

const FormFields = ({
  form,
  setForm,
}: {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
}) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
    <div className="col-span-2">
      <Label>Event name</Label>
      <Input
        placeholder="e.g. Community Iftar"
        value={form.title}
        onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
      />
    </div>
    <div>
      <Label>Date</Label>
      <Input
        type="date"
        value={form.date}
        onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
      />
    </div>
    <div>
      <Label>Start time</Label>
      <div className="flex gap-1">
        <Input
          placeholder="10:30"
          value={form.startTime}
          onChange={(e) =>
            setForm((f) => ({ ...f, startTime: e.target.value }))
          }
        />
        <select
          value={form.startPeriod}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              startPeriod: e.target.value as "AM" | "PM",
            }))
          }
          className="border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 text-gray-900"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    </div>
    <div>
      <Label>End time</Label>
      <div className="flex gap-1">
        <Input
          placeholder="11:30"
          value={form.endTime}
          onChange={(e) => setForm((f) => ({ ...f, endTime: e.target.value }))}
        />
        <select
          value={form.endPeriod}
          onChange={(e) =>
            setForm((f) => ({ ...f, endPeriod: e.target.value as "AM" | "PM" }))
          }
          className="border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 text-gray-900"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    </div>
    <div>
      <Label>Location</Label>
      <Input
        placeholder="e.g. Main Hall"
        value={form.location}
        onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
      />
    </div>
    <div className="col-span-2 sm:col-span-3">
      <Label>Description</Label>
      <Textarea
        placeholder="Event details..."
        value={form.description}
        onChange={(e) =>
          setForm((f) => ({ ...f, description: e.target.value }))
        }
      />
    </div>
    <div className="col-span-2 sm:col-span-3 flex items-center gap-2">
      <input
        type="checkbox"
        id="recurring"
        checked={form.isRecurring}
        onChange={(e) =>
          setForm((f) => ({ ...f, isRecurring: e.target.checked }))
        }
        className="w-4 h-4 accent-green-700"
      />
      <label htmlFor="recurring" className="text-sm text-gray-600">
        Recurring event
      </label>
    </div>
    {form.isRecurring && (
      <div>
        <Label>End date</Label>
        <Input
          type="date"
          value={form.endDate}
          onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))}
        />
      </div>
    )}
    {/* <div className="col-span-2 sm:col-span-3">
      <Label>Event image</Label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setForm((f) => ({ ...f, image: e.target.files?.[0] ?? null }))
        }
        className="text-sm text-gray-600"
      />
    </div> */}
  </div>
);

export const EventsPanel = () => {
  const [items, setItems] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [openCreate, setOpenCreate] = useState(false);
  const [editItem, setEditItem] = useState<EventItem | null>(null);
  const [createForm, setCreateForm] = useState<FormState>(EMPTY_FORM);
  const [editForm, setEditForm] = useState<FormState>(EMPTY_FORM);

  const loadEvents = useCallback(async () => {
    try {
      setLoading(true);
      const snapshot = await getPrimaryEventData();
      const events: EventItem[] = [];
      snapshot.forEach((doc) => {
        events.push({ id: doc.id, ...doc.data() } as EventItem);
      });
      setItems(events);
    } catch (err) {
      console.error("Failed to load events", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const upcomingItems = items.filter(isUpcoming);
  const pastItems = items.filter((i) => !isUpcoming(i));
  const visibleItems = tab === "upcoming" ? upcomingItems : pastItems;

  const openEditForm = (item: EventItem) => {
    const { time: startTime, period: startPeriod } = parseTimeString(
      item.startTime,
    );
    const { time: endTime, period: endPeriod } = parseTimeString(item.endTime);
    setEditForm({
      title: item.title,
      date: parseFirestoreDate(item.date),
      startTime,
      startPeriod,
      endTime,
      endPeriod,
      location: item.location,
      description: item.description,
      isRecurring: item.isRecurring ?? false,
      endDate: item.endDate ? parseFirestoreDate(item.endDate) : "",
      image: null,
      oldImage: item.image ?? "",
    });
    setEditItem(item);
    setOpenCreate(false);
  };

  const resetAll = () => {
    setCreateForm(EMPTY_FORM);
    setEditForm(EMPTY_FORM);
    setOpenCreate(false);
    setEditItem(null);
  };

  const handleAdd = async () => {
    if (!createForm.title || !createForm.date) return;
    setSaving(true);
    try {
      const { year, month, day } = parseDateString(createForm.date);
      let imageName = createForm.oldImage;
      if (createForm.image) {
        imageName = createForm.image.name;
        await uploadEventImages(createForm.image);
      }
      await updatePrimaryEventData("new", {
        year,
        month,
        day,
        startTime: formatTime(createForm.startTime, createForm.startPeriod),
        endTime: formatTime(createForm.endTime, createForm.endPeriod),
        title: createForm.title,
        description: createForm.description,
        location: createForm.location,
        image: imageName,
        isRecurring: createForm.isRecurring,
        endDate:
          createForm.isRecurring && createForm.endDate
            ? (() => {
                const { year, month, day } = parseDateString(
                  createForm.endDate,
                );
                return new Date(year, month - 1, day);
              })()
            : null,
      });
      await loadEvents();
      resetAll();
    } catch (err) {
      console.error("Failed to add event", err);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async () => {
    if (!editItem || !editForm.title || !editForm.date) return;
    setSaving(true);
    try {
      const { year, month, day } = parseDateString(editForm.date);
      let imageName = editForm.oldImage;
      if (editForm.image) {
        if (editForm.oldImage) deleteEventImage(editForm.oldImage);
        imageName = editForm.image.name;
        await uploadEventImages(editForm.image);
      }
      await updatePrimaryEventData("edit", {
        id: editItem.id,
        year,
        month,
        day,
        startTime: formatTime(editForm.startTime, editForm.startPeriod),
        endTime: formatTime(editForm.endTime, editForm.endPeriod),
        title: editForm.title,
        description: editForm.description,
        location: editForm.location,
        image: imageName,
        isRecurring: editForm.isRecurring,
        endDate:
          editForm.isRecurring && editForm.endDate
            ? (() => {
                const { year, month, day } = parseDateString(editForm.endDate);
                return new Date(year, month - 1, day);
              })()
            : null,
      });
      await loadEvents();
      resetAll();
    } catch (err) {
      console.error("Failed to edit event", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, image?: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      if (image) deleteEventImage(image);
      await updatePrimaryEventData("delete", [id]);
      await loadEvents();
      resetAll();
    } catch (err) {
      console.error("Failed to delete event", err);
    }
  };

  return (
    <Card>
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 -mb-[1px]">
          {(["upcoming", "past"] as const).map((t) => {
            const count =
              t === "upcoming" ? upcomingItems.length : pastItems.length;
            return (
              <button
                key={t}
                onClick={() => {
                  setTab(t);
                  resetAll();
                }}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                  tab === t
                    ? "border-green-700 text-green-700"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    tab === t
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <BtnGreen
          onClick={() => {
            resetAll();
            setOpenCreate(true);
          }}
        >
          <Plus className="w-4 h-4" /> New event
        </BtnGreen>
      </div>

      <div className="border-t border-gray-200 pt-4 mt-0">
        {loading ? (
          <p className="text-sm text-gray-400 py-4 text-center">
            Loading events...
          </p>
        ) : visibleItems.length === 0 ? (
          <p className="text-sm text-gray-400 py-4 text-center">
            No {tab} events.
          </p>
        ) : (
          visibleItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {item.title}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {item.isRecurring && item.endDate
                    ? `${getUTCFormattedDate(item.date)} – ${getUTCFormattedDate(item.endDate)}`
                    : getUTCFormattedDate(item.date)}{" "}
                  · {item.startTime} – {item.endTime} · {item.location}
                  {item.isRecurring && (
                    <span className="ml-2 text-xs px-2 py-0.5 rounded-full font-medium bg-green-100 text-green-700">
                      Recurring
                    </span>
                  )}
                </p>
                {item.description && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => openEditForm(item)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.image)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-red-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create form */}
      {openCreate && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mt-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-800">New event</p>
            <button
              onClick={resetAll}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <FormFields form={createForm} setForm={setCreateForm} />
          <div className="flex gap-2">
            <BtnGreen onClick={handleAdd} disabled={saving}>
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save"}
            </BtnGreen>
            <BtnOutline onClick={resetAll}>Cancel</BtnOutline>
          </div>
        </div>
      )}

      {/* Edit form */}
      {editItem && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mt-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-800">
              Edit: {editItem.title}
            </p>
            <button
              onClick={resetAll}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <FormFields form={editForm} setForm={setEditForm} />
          <div className="flex gap-2">
            <BtnGreen onClick={handleEdit} disabled={saving}>
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save"}
            </BtnGreen>
            <button
              onClick={() => handleDelete(editItem.id, editItem.image)}
              className="inline-flex items-center gap-1.5 border border-red-200 text-red-500 hover:bg-red-50 text-sm font-medium px-4 py-2 rounded-lg transition-all"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>
            <BtnOutline onClick={resetAll}>Cancel</BtnOutline>
          </div>
        </div>
      )}
    </Card>
  );
};
