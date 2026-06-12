"use client";
import React, { useState } from "react";
import { Save } from "lucide-react";

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
const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    {...props}
    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 text-gray-900"
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
    className="inline-flex items-center gap-1.5 bg-green-700 hover:bg-green-800 active:scale-[0.98] text-white text-sm font-medium px-4 py-2 rounded-lg transition-all mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
  >
    {children}
  </button>
);
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
    {children}
  </p>
);

// Night Prayers

const NIGHT_PRAYER_DEFAULTS = {
  taraweeh: {
    time: "",
    timePeriod: "PM" as "AM" | "PM",
    rakaat: "8",
    location: "",
    startDate: "",
    endDate: "",
  },
  tahajjud: {
    time: "",
    timePeriod: "AM" as "AM" | "PM",
    rakaat: "8",
    location: "",
    startDate: "",
    endDate: "",
  },
};

const NightPrayersSection = () => {
  const [activeTab, setActiveTab] = useState<"taraweeh" | "tahajjud">(
    "taraweeh",
  );
  const [form, setForm] = useState(NIGHT_PRAYER_DEFAULTS);

  const current = form[activeTab];
  const update = (key: string, value: string) =>
    setForm((prev) => ({
      ...prev,
      [activeTab]: { ...prev[activeTab], [key]: value },
    }));

  return (
    <Card>
      <SectionLabel>Night prayers</SectionLabel>

      {/* Segmented control */}
      <div className="inline-flex bg-gray-100 rounded-lg p-1 gap-1 mb-5">
        {(["taraweeh", "tahajjud"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-5 py-1.5 rounded-md text-sm font-medium transition-all ${
              activeTab === t
                ? "bg-white text-gray-900 border border-gray-200 shadow-none"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div>
          <Label>Start time</Label>
          <div className="flex gap-1">
            <Input
              placeholder="9:30"
              value={current.time}
              onChange={(e) => update("time", e.target.value)}
            />
            <select
              value={current.timePeriod}
              onChange={(e) => update("timePeriod", e.target.value)}
              className="border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 text-gray-900"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
        <div>
          <Label>Rak'aat</Label>
          <Select
            value={current.rakaat}
            onChange={(e) => update("rakaat", e.target.value)}
          >
            <option value="8">8</option>
            <option value="20">20</option>
          </Select>
        </div>
        <div>
          <Label>Location</Label>
          <Input
            placeholder="e.g. Main Hall"
            value={current.location}
            onChange={(e) => update("location", e.target.value)}
          />
        </div>
        <div>
          <Label>Start date</Label>
          <Input
            type="date"
            value={current.startDate}
            onChange={(e) => update("startDate", e.target.value)}
          />
        </div>
        <div>
          <Label>End date</Label>
          <Input
            type="date"
            value={current.endDate}
            onChange={(e) => update("endDate", e.target.value)}
          />
        </div>
      </div>

      <BtnGreen>
        <Save className="w-4 h-4" /> Save {activeTab}
      </BtnGreen>
    </Card>
  );
};

// Eid Times

interface EidForm {
  date: string;
  firstTime: string;
  firstPeriod: "AM" | "PM";
  secondTime: string;
  secondPeriod: "AM" | "PM";
  location: string;
  address: string;
}

const EMPTY_EID: EidForm = {
  date: "",
  firstTime: "",
  firstPeriod: "AM",
  secondTime: "",
  secondPeriod: "AM",
  location: "",
  address: "",
};

const EidSection = () => {
  const [fitr, setFitr] = useState<EidForm>(EMPTY_EID);
  const [adha, setAdha] = useState<EidForm>(EMPTY_EID);

  const EidForm = ({
    title,
    form,
    setForm,
  }: {
    title: string;
    form: EidForm;
    setForm: React.Dispatch<React.SetStateAction<EidForm>>;
  }) => (
    <div>
      <p className="text-sm font-semibold text-gray-700 mb-3">{title}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div>
          <Label>Date</Label>
          <Input
            type="date"
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
          />
        </div>
        <div>
          <Label>First prayer</Label>
          <div className="flex gap-1">
            <Input
              placeholder="7:00"
              value={form.firstTime}
              onChange={(e) =>
                setForm((f) => ({ ...f, firstTime: e.target.value }))
              }
            />
            <select
              value={form.firstPeriod}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  firstPeriod: e.target.value as "AM" | "PM",
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
          <Label>Second prayer</Label>
          <div className="flex gap-1">
            <Input
              placeholder="8:30"
              value={form.secondTime}
              onChange={(e) =>
                setForm((f) => ({ ...f, secondTime: e.target.value }))
              }
            />
            <select
              value={form.secondPeriod}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  secondPeriod: e.target.value as "AM" | "PM",
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
          <Label>Location</Label>
          <Input
            placeholder="e.g. Main Hall"
            value={form.location}
            onChange={(e) =>
              setForm((f) => ({ ...f, location: e.target.value }))
            }
          />
        </div>
        <div className="sm:col-span-2">
          <Label>Address</Label>
          <Input
            placeholder="e.g. 25650 101st Ave SE"
            value={form.address}
            onChange={(e) =>
              setForm((f) => ({ ...f, address: e.target.value }))
            }
          />
        </div>
      </div>
    </div>
  );

  return (
    <Card>
      <SectionLabel>Eid prayer times</SectionLabel>
      <EidForm title="Eid ul-Fitr" form={fitr} setForm={setFitr} />
      <hr className="border-gray-100 my-5" />
      <EidForm title="Eid ul-Adha" form={adha} setForm={setAdha} />
      <BtnGreen>
        <Save className="w-4 h-4" /> Save Eid times
      </BtnGreen>
    </Card>
  );
};

// Export

export const RamadanPanel = () => (
  <div>
    <NightPrayersSection />
    <EidSection />
  </div>
);
