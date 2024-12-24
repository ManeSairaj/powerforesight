import { motion } from "framer-motion";
import { CloudSun, Zap, Star } from "lucide-react";

const iconMap = {
  weather: CloudSun,
  power: Zap,
  premium: Star,
};

export default function NotificationItem({ notification, index }) {
  const Icon = iconMap[notification.type];

  return (
    <motion.div
      // key={index}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gray-700 p-4 rounded-lg mb-4 flex items-start"
    >
      <div className="mr-4">
        <Icon className="h-6 w-6" />
      </div>
      <p>{notification.message}</p>
    </motion.div>
  );
}
