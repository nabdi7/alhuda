import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { FIREBASE_DB, FIREBASE_STORAGE } from "./firebase";

/**
 * Firebase Primary Data
 */

/**
 * Get events data
 * @returns {Promise} - containing data.
 */
export async function getPrimaryEventData() {
  const eventsRef = collection(FIREBASE_DB, "PrimaryData/Events/0");
  const q = query(eventsRef, orderBy("date", "desc"));
  return getDocs(q);
}

/**
 * Get alert data
 * @returns {Promise} - containing data.
 */
export async function getPrimaryAlertData() {
  const alertsRef = collection(FIREBASE_DB, "PrimaryData/Alerts/0");
  const q = query(alertsRef, orderBy("date", "asc"));
  return getDocs(q);
}

/**
 * Get services data
 * @returns {Promise} - containing data.
 */
export async function getPrimaryServiceData() {
  const servicesRef = collection(FIREBASE_DB, "PrimaryData/Services/0");
  return getDocs(servicesRef);
}

/**
 * Get contact data
 * @returns {Promise} - containing data.
 */
export async function getPrimaryContactData() {
  const contactRef = doc(FIREBASE_DB, "PrimaryData/ContactInfo");
  return getDoc(contactRef);
}

/**
 * Get Announcement data
 * @returns {Promise} - containing data.
 */
export async function getPrimaryAnnouncmentData() {
  const announcementRef = doc(FIREBASE_DB, "PrimaryData/Announcement");
  return getDoc(announcementRef);
}

/**
 * Get announcements data (like events)
 * @returns {Promise} - containing data.
 */
export async function getPrimaryAnnouncementsData() {
  const announcementsRef = collection(
    FIREBASE_DB,
    "PrimaryData/Announcements/0",
  );
  const q = query(announcementsRef, orderBy("date", "desc"));
  return getDocs(q);
}

/**
 * Get ramadan data
 * @returns {Promise} - containing data.
 */
export async function getRamadanData() {
  const ramadanRef = doc(FIREBASE_DB, "PrimaryData/Ramadan");
  return getDoc(ramadanRef);
}

/**
 * Get event image.
 * @returns {String} - containing data.
 */
export async function getEventImageFB(imageName: string) {
  const imageRef = ref(FIREBASE_STORAGE, `Images/Events/${imageName}`);
  return getDownloadURL(imageRef);
}

function getPrayerMonthFile() {}

/**
 * get prayer data
 * @returns {Promise} - containing data.
 */
export function getPrayerData(month: number) {
  const monthMap: { [key: number]: string } = {
    0: "JanPD",
    1: "FebPD",
    2: "MarPD",
    3: "AprPD",
    4: "MayPD",
    5: "JunPD",
    6: "JulPD",
    7: "AugPD",
    8: "SepPD",
    9: "OctPD",
    10: "NovPD",
    11: "DecPD",
  };

  const monthDoc = monthMap[month];
  if (!monthDoc) {
    return Promise.reject(`Invalid month: ${month}`);
  }

  const prayerRef = doc(FIREBASE_DB, `PrayerData/${monthDoc}`);
  return getDoc(prayerRef);
}

export async function getCurrentMonthFileName() {
  const currentMonthRef = doc(FIREBASE_DB, "PrayerData/currentMonth");
  return getDoc(currentMonthRef);
}

/**
 * Gets the current month prayer times url.
 */
export async function currentPrayerScheduleUrl(): Promise<string | null> {
  try {
    const snapshot = await getCurrentMonthFileName();
    const data = snapshot.data();

    if (!data?.fileName) return null;

    const storageRef = ref(FIREBASE_STORAGE, `PrayerTimes/${data.fileName}`);
    return await getDownloadURL(storageRef);
  } catch (error: any) {
    // Handle missing file gracefully
    if (error?.code === "storage/object-not-found") {
      return null;
    }
    throw error;
  }
}

export default {
  getPrimaryEventData,
  getPrimaryAlertData,
  getPrimaryServiceData,
  getPrimaryContactData,
  getEventImageFB,
  getPrayerData,
  getPrimaryAnnouncmentData,
  getPrimaryAnnouncementsData,
  getRamadanData,
  currentPrayerScheduleUrl,
  getCurrentMonthFileName,
};
