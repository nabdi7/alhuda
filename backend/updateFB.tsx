import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { FIREBASE_DB, FIREBASE_STORAGE } from "./firebase";

/**
 * Get events data
 * @param status  - a string wether to for new, edit, or delete data.
 * @param data - an array containing data.
 * @returns {Promise} - containing data.
 */
export async function updatePrimaryEventData(status: any, data: any) {
  const eventsCollection = collection(
    FIREBASE_DB,
    "PrimaryData",
    "Events",
    "0",
  );

  if (status === "new") {
    try {
      const date = new Date(data.year, data.month - 1, data.day);
      await addDoc(eventsCollection, {
        date,
        image: data.image,
        startTime: data.startTime,
        endTime: data.endTime,
        title: data.title,
        description: data.description,
        location: data.location,
        isRecurring: data.isRecurring ?? false,
        endDate: data.isRecurring ? data.endDate : null,
      });
      console.log("New event data added successfully.");
    } catch (err) {
      console.error("Failed to add new event data.", err);
      throw err;
    }
  } else if (status === "edit") {
    try {
      const date = new Date(data.year, data.month - 1, data.day);
      const eventDoc = doc(eventsCollection, data.id);
      await updateDoc(eventDoc, {
        date,
        image: data.image,
        startTime: data.startTime,
        endTime: data.endTime,
        title: data.title,
        description: data.description,
        location: data.location,
        isRecurring: data.isRecurring ?? false,
        endDate: data.isRecurring ? data.endDate : null,
      });
      console.log("Event data updated successfully.");
    } catch (err) {
      console.error("Failed to update event data.", err);
      throw err;
    }
  } else if (status === "delete") {
    try {
      const eventDoc = doc(eventsCollection, data[0]);
      await deleteDoc(eventDoc);
      console.log("Event data removed successfully.");
    } catch (err) {
      console.error("Failed to remove event data.", err);
      throw err;
    }
  }
}

/**
 * Get alert data
 * @returns {Promise} - containing data.
 */
export async function updatePrimaryAlertData(status: any, data: any) {
  const alertsCollection = collection(
    FIREBASE_DB,
    "PrimaryData",
    "Alerts",
    "0",
  );

  if (status === "new") {
    try {
      const date = new Date(data[0], data[1] - 1, data[2]);
      await addDoc(alertsCollection, {
        date,
        startTime: data[3],
        endTime: data[4],
        title: data[5],
        description: data[6],
        alertType: data[7],
      });
      console.log("New alert data added successfully.");
    } catch (err) {
      console.error("Failed to add new alert data.", err);
      throw err;
    }
  } else if (status === "edit") {
    try {
      const date = new Date(data[0], data[1] - 1, data[2]);
      const alertDoc = doc(alertsCollection, data[8]);
      await updateDoc(alertDoc, {
        date,
        startTime: data[3],
        endTime: data[4],
        title: data[5],
        description: data[6],
        alertType: data[7],
      });
      console.log("Alert data updated successfully.");
    } catch (err) {
      console.error("Failed to update alert data.", err);
      throw err;
    }
  } else if (status === "delete") {
    try {
      const alertDoc = doc(alertsCollection, data[0]);
      await deleteDoc(alertDoc);
      console.log("Alert data removed successfully.");
    } catch (err) {
      console.error("Failed to remove alert data.", err);
      throw err;
    }
  }
}

/**
 * Get services data
 * @returns {Promise} - containing data.
 */
export async function updatePrimaryServiceData(status: any, data: any) {
  const servicesCollection = collection(
    FIREBASE_DB,
    "PrimaryData",
    "Services",
    "0",
  );

  if (status === "new") {
    try {
      await addDoc(servicesCollection, {
        title: data[0],
        description: data[1],
        startTime: data[2],
        endTime: data[3],
        link: data[4],
      });
      console.log("New service data added successfully.");
    } catch (err) {
      console.error("Failed to add new service data.", err);
      throw err;
    }
  } else if (status === "edit") {
    try {
      const serviceDoc = doc(servicesCollection, data[5]);
      await updateDoc(serviceDoc, {
        title: data[0],
        description: data[1],
        startTime: data[2],
        endTime: data[3],
        link: data[4],
      });
      console.log("Service data updated successfully.");
    } catch (err) {
      console.error("Failed to update service data.", err);
      throw err;
    }
  } else if (status === "delete") {
    try {
      const serviceDoc = doc(servicesCollection, data[0]);
      await deleteDoc(serviceDoc);
      console.log("Service data removed successfully.");
    } catch (err) {
      console.error("Failed to remove service data.", err);
      throw err;
    }
  }
}

/**
 * Get contact data
 * @returns {Promise} - containing data.
 */
export async function updatePrimaryContactData(data: any) {
  try {
    const contactDoc = doc(FIREBASE_DB, "PrimaryData", "ContactInfo");
    await updateDoc(contactDoc, {
      phoneNumber: data[0],
      email: data[1],
      location: data[2],
    });
    console.log("Contact info updated successfully.");
  } catch (err) {
    console.error("Failed to update contact info.", err);
    throw err;
  }
}

/**
 * Get Announcment data
 * @returns {Promise} - containing data.
 */
export async function updatePrimaryAnnouncmentData(title: any, message: any) {
  try {
    const announcementDoc = doc(FIREBASE_DB, "PrimaryData", "Announcement");
    await updateDoc(announcementDoc, { title, message });
    console.log("Announcement updated successfully.");
  } catch (err) {
    console.error("Failed to update announcement.", err);
    throw err;
  }
}

/**
 * Add new announcement data
 * @param title - announcement title
 * @param message - announcement message
 * @returns {Promise} - containing data.
 */
export async function addPrimaryAnnouncementData(title: any, message: any) {
  const announcementsCollection = collection(
    FIREBASE_DB,
    "PrimaryData",
    "Announcements",
    "0",
  );
  try {
    await addDoc(announcementsCollection, {
      date: new Date(),
      title,
      message,
    });
    console.log("Announcement added successfully.");
  } catch (err) {
    console.error("Failed to add announcement.", err);
    throw err;
  }
}

/**
 * Delete announcement data
 * @param id - announcement document id
 * @returns {Promise}
 */
export async function deletePrimaryAnnouncementData(id: string) {
  const announcementsCollection = collection(
    FIREBASE_DB,
    "PrimaryData",
    "Announcements",
    "0",
  );
  try {
    const announcementDoc = doc(announcementsCollection, id);
    await deleteDoc(announcementDoc);
    console.log("Announcement deleted successfully.");
  } catch (err) {
    console.error("Failed to delete announcement.", err);
    throw err;
  }
}

/**
 *  Add new ramadan data
 * @param id - ramadan document id
 * @returns {Promise}
 */
export async function updateRamadanData(data: any) {
  try {
    const ramadanDoc = doc(FIREBASE_DB, "PrimaryData", "Ramadan");
    await updateDoc(ramadanDoc, {
      taraweehTime: data.taraweehTime,
      tahajjudTime: data.tahajjudTime,
      eidFirstTime: data.eidFirstTime,
      eidSecondTime: data.eidSecondTime,
      eidLocation: data.eidLocation,
      eidAddress: data.eidAddress,
      ramadanStart: data.ramadanStart,
      taraweehStart: data.taraweehStart,
      eidDates: data.eidDates,
    });
    console.log("Ramadan data updated successfully.");
  } catch (err) {
    console.error("Failed to update Ramadan data.", err);
    throw err;
  }
}

/**
 * Update file name in the database.
 * @param {*} file
 */
export async function updateCurrentMonthFileName(name: any) {
  try {
    const monthDoc = doc(FIREBASE_DB, "PrayerData", "currentMonth");
    await updateDoc(monthDoc, { fileName: name });
    console.log("Current month prayer times pdf successfully updated.");
  } catch (err) {
    console.error("Failed to update current month prayer times pdf.", err);
    throw err;
  }
}

/**
 * Upload current prayer times pdf to storage.
 * @param {*} img
 */
export async function uploadCurrentPrayerTimesPdf(file: File) {
  try {
    const fileRef = storageRef(FIREBASE_STORAGE, `PrayerTimes/${file.name}`);
    await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(fileRef);
    console.log("PDF uploaded successfully. URL:", downloadURL);
    return downloadURL;
  } catch (err) {
    console.error("Failed to upload PDF.", err);
    throw err;
  }
}

/**
 * Removes the current prayer times file from storage.
 * @param {*} img
 */
export function removePrayerTimesPdf(oldPrayerTimesFileName: string) {
  const fileRef = storageRef(
    FIREBASE_STORAGE,
    `PrayerTimes/${oldPrayerTimesFileName}`,
  );
  deleteObject(fileRef).catch((error) => {
    console.error("Error deleting file:", error);
  });
}

// export async function sendPushNotification(data: any) {
//   try {
//     const notifRef = ref(
//       FIREBASE_REALTIME_DB,
//       `PushNotif/${data.id || Date.now()}`,
//     );
//     await set(notifRef, data);
//     console.log("Success update on notif");
//     return Promise.resolve("Notification sent successfully");
//   } catch (error) {
//     console.log("Failed to update notif:", error);
//     return Promise.reject("Failed to send notification");
//   }
// }

/**
 * Update prayer data
 * @returns {Promise} - containing data.
 */
export function updatePrayerData(month: any, data: any) {
  switch (month) {
    case 0:
      updateJanPrayerData(data);
      break;
    case 1:
      updateFebPrayerData(data);
      break;
    case 2:
      updateMarPrayerData(data);
      break;
    case 3:
      updateAprPrayerData(data);
      break;
    case 4:
      updateMayPrayerData(data);
      break;
    case 5:
      updateJunPrayerData(data);
      break;
    case 6:
      updateJulPrayerData(data);
      break;
    case 7:
      updateAugPrayerData(data);
      break;
    case 8:
      updateSepPrayerData(data);
      break;
    case 9:
      updateOctPrayerData(data);
      break;
    case 10:
      updateNovPrayerData(data);
      break;
    case 11:
      updateDecPrayerData(data);
      break;
    default:
      return Promise.reject("Invalid month");
  }
}

/**
 * Jan
 * @param {*} data
 */
async function updateJanPrayerData(data: any) {
  try {
    const janDoc = doc(FIREBASE_DB, "PrayerData", "JanPD");
    await updateDoc(janDoc, { data });
    console.log("Jan prayer data updated successfully.");
  } catch (err) {
    console.error("Failed to update Jan prayer data.", err);
    throw err;
  }
}

/**
 * Feb
 * @param {*} data
 */
async function updateFebPrayerData(data: any) {
  try {
    const febDoc = doc(FIREBASE_DB, "PrayerData", "FebPD");
    await updateDoc(febDoc, { data });
    console.log("Feb prayer data updated successfully.");
  } catch (err) {
    console.error("Failed to update Feb prayer data.", err);
    throw err;
  }
}

/**
 * Mar
 * @param {*} data
 */
async function updateMarPrayerData(data: any) {
  try {
    const marDoc = doc(FIREBASE_DB, "PrayerData", "MarPD");
    await updateDoc(marDoc, { data });
    console.log("Mar prayer data updated successfully.");
  } catch (err) {
    console.error("Failed to update Mar prayer data.", err);
    throw err;
  }
}

/**
 * Apr
 * @param {*} data
 */
async function updateAprPrayerData(data: any) {
  try {
    const aprDoc = doc(FIREBASE_DB, "PrayerData", "AprPD");
    await updateDoc(aprDoc, { data });
    console.log("Apr prayer data updated successfully.");
  } catch (err) {
    console.error("Failed to update Apr prayer data.", err);
    throw err;
  }
}

/**
 * May
 * @param {*} data
 */
async function updateMayPrayerData(data: any) {
  try {
    const mayDoc = doc(FIREBASE_DB, "PrayerData", "MayPD");
    await updateDoc(mayDoc, { data });
    console.log("May prayer data updated successfully.");
  } catch (err) {
    console.error("Failed to update May prayer data.", err);
    throw err;
  }
}

/**
 * Jun
 * @param {*} data
 */
async function updateJunPrayerData(data: any) {
  try {
    const junDoc = doc(FIREBASE_DB, "PrayerData", "JunPD");
    await updateDoc(junDoc, { data });
    console.log("Jun prayer data updated successfully.");
  } catch (err) {
    console.error("Failed to update Jun prayer data.", err);
    throw err;
  }
}

/**
 * Jul
 * @param {*} data
 */
async function updateJulPrayerData(data: any) {
  try {
    const julDoc = doc(FIREBASE_DB, "PrayerData", "JulPD");
    await updateDoc(julDoc, { data });
    console.log("Jul prayer data updated successfully.");
  } catch (err) {
    console.error("Failed to update Jul prayer data.", err);
    throw err;
  }
}

/**
 * Aug
 * @param {*} data
 */
async function updateAugPrayerData(data: any) {
  try {
    const augDoc = doc(FIREBASE_DB, "PrayerData", "AugPD");
    await updateDoc(augDoc, { data });
    console.log("Aug prayer data updated successfully.");
  } catch (err) {
    console.error("Failed to update Aug prayer data.", err);
    throw err;
  }
}

/**
 * Sep
 * @param {*} data
 */
async function updateSepPrayerData(data: any) {
  try {
    const sepDoc = doc(FIREBASE_DB, "PrayerData", "SepPD");
    await updateDoc(sepDoc, { data });
    console.log("Sep prayer data updated successfully.");
  } catch (err) {
    console.error("Failed to update Sep prayer data.", err);
    throw err;
  }
}

/**
 * Oct
 * @param {*} data
 */
async function updateOctPrayerData(data: any) {
  try {
    const octDoc = doc(FIREBASE_DB, "PrayerData", "OctPD");
    await updateDoc(octDoc, { data });
    console.log("Oct prayer data updated successfully.");
  } catch (err) {
    console.error("Failed to update Oct prayer data.", err);
    throw err;
  }
}

/**
 * Nov
 * @param {*} data
 */
async function updateNovPrayerData(data: any) {
  try {
    const novDoc = doc(FIREBASE_DB, "PrayerData", "NovPD");
    await updateDoc(novDoc, { data });
    console.log("Nov prayer data updated successfully.");
  } catch (err) {
    console.error("Failed to update Nov prayer data.", err);
    throw err;
  }
}

/**
 * Dec
 * @param {*} data
 */
async function updateDecPrayerData(data: any) {
  try {
    const decDoc = doc(FIREBASE_DB, "PrayerData", "DecPD");
    await updateDoc(decDoc, { data });
    console.log("Dec prayer data updated successfully.");
  } catch (err) {
    console.error("Failed to update Dec prayer data.", err);
    throw err;
  }
}

/**
 * Upload event image
 * @param file - File object from <input type="file">
 */
export async function uploadEventImages(file: File) {
  try {
    const fileRef = storageRef(FIREBASE_STORAGE, `Images/Events/${file.name}`);
    await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(fileRef);
    console.log("Event image uploaded successfully. URL:", downloadURL);
    return downloadURL;
  } catch (err) {
    console.error("Failed to upload event image.", err);
    throw err;
  }
}

/**
 * Delete event image
 */
export function deleteEventImage(imageName: string) {
  const fileRef = storageRef(FIREBASE_STORAGE, `Images/Events/${imageName}`);
  deleteObject(fileRef)
    .then(() => console.log("Event image deleted successfully."))
    .catch((error) => console.error("Delete image error:", error.message));
}

export default {
  updatePrimaryEventData,
  updatePrimaryAlertData,
  updatePrimaryServiceData,
  updatePrimaryContactData,
  uploadEventImages,
  deleteEventImage,
  updatePrayerData,
  //   sendPushNotification,
  updatePrimaryAnnouncmentData,
  addPrimaryAnnouncementData,
  deletePrimaryAnnouncementData,
  updateRamadanData,
  updateCurrentMonthFileName,
  uploadCurrentPrayerTimesPdf,
  removePrayerTimesPdf,
};
