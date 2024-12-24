import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Settings, Zap } from "lucide-react";
import { TextHoverEffect } from "./ui/text-hover-effect";
import { ModeToggle } from "./ui/mode_toggle";
import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Howl } from "howler";
// import Link from "next/link";

const bellSound = new Howl({
  src: ["/bell-sound.mp3"],
});

export default function Topbar() {
  const [newNotifications, setNewNotifications] = useState(0);
  const [isRinging, setIsRinging] = useState(false);

  const postDataToWebhook = async (userData) => {
    try {
      const response = await fetch("/api/webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        // Extract error message from the response if available
        const errorData = await response.json();
        throw new Error(
          errorData.error || `Failed to post data: ${response.statusText}`
        );
      }

      const result = await response.json();
      console.log("Data successfully posted to webhook:", result);
      return result;
    } catch (error) {
      console.error("Error posting data to webhook:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <Navbar className="w-screen p-5 h-20 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-15">
      <NavbarBrand>
        <div>{/* LOGO */}</div>
        {/* <p className="font-bold text-inherit text-3xl">Power Forecast</p> */}
        {/* <TextHoverEffect text="Power Foresight" duration={1} /> */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2"
        >
          <Zap className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-blue-600">
            Power Foresight
          </span>
        </motion.div>
      </NavbarBrand>
      {/* <div>
        <Ripple />
      </div> */}
      <NavbarContent>
        <NavbarItem className="font-bold rounded-md ml-auto gap-4 text-black dark:text-white flex h-full w-full justify-center items-center pr-1">
          Hi, {"User"}
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton className="" />
          </SignedIn>
          <Link href="/settings" aria-current="page">
            <Settings />
          </Link>
          <Link href="/u/1/notifications" className="relative">
            <motion.div
              animate={isRinging ? { rotate: [0, 15, -15, 0] } : {}}
              transition={{ duration: 0.5, repeat: isRinging ? 2 : 0 }}
            >
              <Bell className="text-white h-6 w-6" />
            </motion.div>
            <AnimatePresence>
              {newNotifications > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {newNotifications}
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
          <div>
            <ModeToggle />
          </div>
        </NavbarItem>
      </NavbarContent>
      {/* <NavbarContent className="font-bold hidden sm:flex">
        <NavbarItem isActive>
        </NavbarItem>
      </NavbarContent> */}
    </Navbar>
  );
}
