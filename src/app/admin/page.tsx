"use client";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../backend/firebase";
import AdminPage from "@/components/admin/Admin";
import LoginPage from "@/components/admin/Login";

// export const metadata = {
//   title: "Admin | Alhuda Islamic Center",
//   description: "Alhuda Islamic Center admin portal.",
//   openGraph: {
//     title: "Admin | Alhuda Islamic Center",
//     description: "Alhuda Islamic Center admin portal.",
//     type: "website",
//     url: "https://alhudaislamiccenter.com/admin",
//   },
//   twitter: {
//     title: "Admin | Alhuda Islamic Center",
//     description: "Alhuda Islamic Center admin portal.",
//   },
// };

const page = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return null;

  return user ? <AdminPage /> : <LoginPage />;
};

export default page;
