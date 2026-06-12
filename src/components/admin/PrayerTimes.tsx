"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Save, X, ChevronDown } from "lucide-react";
import { getPrayerData } from "../../../backend/readFB";
import { updatePrayerData } from "../../../backend/updateFB";

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
    {children}
  </div>
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

const MONTHS = [
  { label: "January", value: 0, key: "janPD" },
  { label: "February", value: 1, key: "febPD" },
  { label: "March", value: 2, key: "marPD" },
  { label: "April", value: 3, key: "aprPD" },
  { label: "May", value: 4, key: "mayPD" },
  { label: "June", value: 5, key: "junPD" },
  { label: "July", value: 6, key: "julPD" },
  { label: "August", value: 7, key: "augPD" },
  { label: "September", value: 8, key: "sepPD" },
  { label: "October", value: 9, key: "octPD" },
  { label: "November", value: 10, key: "novPD" },
  { label: "December", value: 11, key: "decPD" },
];

const HEADERS = [
  "Day",
  "Fajr Adhan",
  "Fajr Iqama",
  "Dhuhr Adhan",
  "Dhuhr Iqama",
  "Asr Adhan",
  "Asr Iqama",
  "Maghrib Adhan",
  "Maghrib Iqama",
  "Isha Adhan",
  "Isha Iqama",
];

const timeRegex = /^(0?[1-9]|1[0-2]|1[3-9]|2[0-3]):[0-5][0-9]$/;

export const PrayerTimesPanel = () => {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [prayerData, setPrayerData] = useState<any[][]>([]);
  const [originalData, setOriginalData] = useState<any[][]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadMonth = useCallback(async (monthIndex: number) => {
    setLoading(true);
    setError("");
    setSuccess("");
    setPrayerData([]);
    try {
      const snapshot = await getPrayerData(monthIndex);
      const raw = snapshot.data() as any;
      let data = raw?.data ?? raw;
      if (typeof data === "string") data = JSON.parse(data);
      setPrayerData(JSON.parse(JSON.stringify(data)));
      setOriginalData(JSON.parse(JSON.stringify(data)));
    } catch (err) {
      console.error(err);
      setError("Failed to load prayer data.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === "") {
      setSelectedMonth(null);
      setPrayerData([]);
      setOriginalData([]);
      setError("");
      setSuccess("");
      return;
    }
    const month = parseInt(val);
    setSelectedMonth(month);
    loadMonth(month);
  };

  const handleCellChange = (
    rowIndex: number,
    colIndex: number,
    value: string,
  ) => {
    setPrayerData((prev) => {
      const updated = prev.map((row) => [...row]);
      updated[rowIndex][colIndex] = value;
      return updated;
    });
  };

  const handleSave = async () => {
    if (selectedMonth === null) return;

    // Validate
    const errors: string[] = [];
    const emptyFields: string[] = [];
    for (let i = 1; i < prayerData.length; i++) {
      const day = prayerData[i];
      for (let j = 1; j <= 10; j++) {
        if (!day[j] || String(day[j]).trim() === "") {
          emptyFields.push(`Day ${day[0]}, col ${j}`);
        } else if (!timeRegex.test(String(day[j]).trim())) {
          errors.push(`Day ${day[0]}, col ${j}: "${day[j]}"`);
        }
      }
    }

    if (emptyFields.length > 0) {
      setError(`Empty fields found. First: ${emptyFields[0]}`);
      return;
    }
    if (errors.length > 0) {
      setError(`Invalid time format (use H:MM or HH:MM). First: ${errors[0]}`);
      return;
    }

    if (JSON.stringify(prayerData) === JSON.stringify(originalData)) {
      setError("No changes to save.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");
    try {
      await updatePrayerData(selectedMonth, JSON.stringify(prayerData));
      setOriginalData(JSON.parse(JSON.stringify(prayerData)));
      setSuccess("Prayer times updated successfully.");
    } catch (err) {
      console.error(err);
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setPrayerData(JSON.parse(JSON.stringify(originalData)));
    setError("");
    setSuccess("");
  };

  const rows =
    Array.isArray(prayerData) && prayerData.length > 1
      ? prayerData.slice(1)
      : [];

  return (
    <Card>
      {/* Month selector */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          Prayer times
        </p>
        <div className="relative">
          <select
            value={selectedMonth ?? ""}
            onChange={handleMonthChange}
            className="appearance-none border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 text-gray-900 cursor-pointer"
          >
            <option value="">Select month</option>
            {MONTHS.map((m) => (
              <option key={m.key} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* States */}
      {!selectedMonth && selectedMonth !== 0 && (
        <p className="text-sm text-gray-400 text-center py-8">
          Select a month to view and edit prayer times.
        </p>
      )}
      {loading && (
        <p className="text-sm text-gray-400 text-center py-8">Loading...</p>
      )}
      {error && (
        <p className="text-xs text-red-500 font-medium mb-3">{error}</p>
      )}
      {success && (
        <p className="text-xs text-green-600 font-medium mb-3">{success}</p>
      )}

      {/* Table */}
      {!loading && rows.length > 0 && (
        <>
          <div className="overflow-x-auto rounded-lg border border-gray-100">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {HEADERS.map((h, i) => (
                    <th
                      key={i}
                      className="px-2 py-2.5 text-center font-semibold text-gray-500 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={
                      rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                    }
                  >
                    {/* Day number */}
                    <td className="px-2 py-1.5 text-center font-semibold text-gray-700 w-10">
                      {row[0]}
                    </td>
                    {/* Time cells */}
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((colIndex) => (
                      <td key={colIndex} className="px-1 py-1">
                        <input
                          type="text"
                          value={row[colIndex] ?? ""}
                          onChange={(e) =>
                            handleCellChange(
                              rowIndex + 1,
                              colIndex,
                              e.target.value,
                            )
                          }
                          className={`w-full text-center text-xs border rounded px-1 py-1 focus:outline-none focus:ring-1 focus:ring-green-500 bg-transparent ${
                            row[colIndex] &&
                            !timeRegex.test(String(row[colIndex]).trim())
                              ? "border-red-300 bg-red-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          placeholder="H:MM"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex gap-2 mt-4">
            <BtnGreen onClick={handleSave} disabled={saving}>
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save changes"}
            </BtnGreen>
            <BtnOutline onClick={handleCancel}>
              <X className="w-4 h-4" /> Cancel
            </BtnOutline>
          </div>
        </>
      )}
    </Card>
  );
};
