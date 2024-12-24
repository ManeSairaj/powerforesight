"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import NotificationItem from "./NotificationItem";

const initialNotifications = [
  {
    id: 1,
    type: "weather",
    message: "Sunny day ahead! High of 75°F expected.",
  },
  { id: 2, type: "power", message: "Your daily power consumption: 15.2 kWh" },
  {
    id: 3,
    type: "premium",
    message: "Upgrade to premium for AI-powered energy savings!",
  },
];

export default function NotificationSection() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  const loadMore = () => {
    const newNotifications = [
      {
        id: notifications.length + 1,
        type: "weather",
        message: "Thunderstorms expected tomorrow.",
      },
      {
        id: notifications.length + 2,
        type: "power",
        message: "You saved 2.5 kWh today! Great job!",
      },
      {
        id: notifications.length + 3,
        type: "premium",
        message: "Premium users now get personalized energy-saving tips!",
      },
    ];
    setNotifications((prev) => [...prev, ...newNotifications]);
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entities) => {
      const target = entities[0];
      if (target.isIntersecting) {
        loadMore();
      }
    }, options);

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-800 text-white p-4 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Notifications</h2>
          <Link href="/u/1">
            <X className="h-6 w-6" />
          </Link>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {notifications.map((notification, index) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              // index={index}
            />
          ))}
        </motion.div>
        <div ref={loader} className="h-10" />
      </div>
    </div>
  );
}
