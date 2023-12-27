"use client";

import Link from "next/link";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

import {
  ImageIcon,
  LayoutDashboard,
  LogInIcon,
  MessagesSquare,
  UserSquare,
  Settings,
  Image,
  ImagePlus,
  Target,
} from "lucide-react";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversations",
    icon: LogInIcon,
    href: "/conversation",
    color: "text-sky-500",
  },
  {
    label: "Logo Generator",
    icon: Target,
    href: "/logos",
    color: "text-sky-500",
  },
  {
    label: "Image Generator",
    icon: ImageIcon,
    href: "/generate-img",
    color: "text-sky-500",
  },
  {
    label: "Swap Image",
    icon: UserSquare,
    href: "/imgSwap",
    color: "text-sky-500",
  },
  {
    label: "Image Upscaler",
    icon: ImagePlus,
    href: "/img-upscale",
    color: "text-sky-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-emerald-800",
  },
];

function Sidebar() {
  return (
    <>
      <div className="space-y-4 py-4 flex items-center flex-col bg-[#111827] text-white h-full  ">
        <div className="px-4 py-2 flex-1">
          <Link href="/dashboard" className="flex items-center pl-3 mb-14">
            <h1 className={cn("text-2xl font-bold", montserrat.className)}>
              MultiAI
            </h1>
          </Link>
          <div className="space-y-3">
            {routes.map((route) => (
              <Link
                href={route.href}
                key={route.href}
                className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10  rounded-lg transition"
              >
                <route.icon className={cn("h-5 w-15 mr-3", route.color)} />
                {route.label}
                {/* {hairIcon} */}
              </Link>
            ))}
          </div>
        </div>
        <div className=" flex justify-center items-center bg-white h-[45px] rounded-lg w-[80%] text-orange-800 font-bold">
          Subscribe
        </div>
      </div>
    </>
  );
}

export default Sidebar;
