"use client";
import React, { useEffect, useRef, useState } from "react";
import { UploadCloud, FileText, X, Eye } from "lucide-react";
import {
  getCurrentMonthFileName,
  currentPrayerScheduleUrl,
} from "../../../backend/readFB";
import {
  removePrayerTimesPdf,
  updateCurrentMonthFileName,
  uploadCurrentPrayerTimesPdf,
} from "../../../backend/updateFB";

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
    {children}
  </div>
);

export const MonthlySchedulePanel = () => {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [oldFileName, setOldFileName] = useState<string>("");
  const [scheduleUrl, setScheduleUrl] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load current file name and URL on mount
    getCurrentMonthFileName().then((snapshot) => {
      const data = snapshot.data() as any;
      if (data?.fileName) setOldFileName(data.fileName);
    });
    currentPrayerScheduleUrl().then((url) => {
      if (url) setScheduleUrl(url);
    });
  }, []);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const selected = files[0];
    if (selected.type !== "application/pdf") {
      setError("Only PDF files are accepted.");
      return;
    }
    setError("");
    setSuccess("");
    setFile(selected);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError("");
    setSuccess("");
    try {
      // Remove old file if exists
      if (oldFileName) removePrayerTimesPdf(oldFileName);

      // Upload new file
      await uploadCurrentPrayerTimesPdf(file);

      // Update filename in Firestore
      await updateCurrentMonthFileName(file.name);
      setOldFileName(file.name);

      // Refresh URL
      const url = await currentPrayerScheduleUrl();
      if (url) setScheduleUrl(url);

      setSuccess("Prayer schedule uploaded successfully.");
      setFile(null);
    } catch (err) {
      console.error(err);
      setError("Failed to upload. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
          Upload monthly prayer schedule
        </p>

        {/* Drop zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            handleFiles(e.dataTransfer.files);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            dragging
              ? "border-green-400 bg-green-50"
              : "border-gray-200 hover:border-green-300 hover:bg-green-50/50"
          }`}
        >
          <UploadCloud
            className={`w-8 h-8 mx-auto mb-3 ${dragging ? "text-green-500" : "text-gray-300"}`}
          />
          <p className="text-sm font-medium text-gray-600 mb-1">
            Drag & drop a PDF here, or{" "}
            <span className="text-green-700 underline underline-offset-2">
              browse
            </span>
          </p>
          <p className="text-xs text-gray-400">PDF only, up to 10 MB</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        {/* Selected file */}
        {file && (
          <div className="mt-4 flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5">
            <FileText className="w-4 h-4 text-green-600 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {file.name}
              </p>
              <p className="text-xs text-gray-400">
                {file.size < 1024 * 1024
                  ? `${(file.size / 1024).toFixed(1)} KB`
                  : `${(file.size / 1024 / 1024).toFixed(1)} MB`}
              </p>
            </div>
            <button
              onClick={() => setFile(null)}
              className="p-1 rounded hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Feedback */}
        {error && (
          <p className="mt-3 text-xs text-red-500 font-medium">{error}</p>
        )}
        {success && (
          <p className="mt-3 text-xs text-green-600 font-medium">{success}</p>
        )}

        {/* Current file info */}
        {oldFileName && (
          <p className="mt-3 text-xs text-gray-400">
            Current schedule:{" "}
            <span className="font-medium text-gray-600">{oldFileName}</span>
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="inline-flex items-center gap-1.5 bg-green-700 hover:bg-green-800 active:scale-[0.98] text-white text-sm font-medium px-4 py-2 rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <UploadCloud className="w-4 h-4" />
            {uploading ? "Uploading..." : "Upload schedule"}
          </button>

          {scheduleUrl && (
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="inline-flex items-center gap-1.5 border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium px-4 py-2 rounded-lg transition-all"
            >
              <Eye className="w-4 h-4" />
              {showPreview ? "Hide" : "View current schedule"}
            </button>
          )}
        </div>
      </Card>

      {/* PDF Preview */}
      {showPreview && scheduleUrl && (
        <Card>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Current schedule
            </p>
            <button
              onClick={() => setShowPreview(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <iframe
            src={scheduleUrl}
            className="w-full rounded-lg border border-gray-200"
            style={{ height: "600px" }}
            title="Monthly Prayer Schedule"
          />
        </Card>
      )}
    </div>
  );
};
