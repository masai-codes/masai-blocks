"use client";

import { LayoutDashboard, LifeBuoy, LogOut, User } from "lucide-react";

import { Navbar } from "@/registry/components/navbar";
import { CalendarDots, Chats, MegaphoneIcon } from "@phosphor-icons/react";

/**
 * Demo shell for the registry `Navbar` block — full-width sticky bar above playground content.
 */
export function SiteNavbar() {
  return (
    <Navbar
      className=""
      logo={{
        src: "https://students.masaischool.com/static/media/masai-logo.e5c8801d4f26d2da036ec9e4b93cb202.svg",
        alt: "Masai School",
        href: "https://students.masaischool.com",
        openInNewTab: true,
      }}
      navItems={[
        { label: "Home", href: "/courses", isActive: true },
        {
          label: "Learn",
          href: "https://www.masaischool.com/hire",
          openInNewTab: true,
        },
        { label: "Support", href: "/blog" },
        { label: "Discussions", href: "/blog" },
        { label: "Refer & Earn", href: "/blog" },
      ]}
      trailingActions={[
        {
          type: "image",
          src: "https://students.masaischool.com/static/media/download-app.394dce64e9e436e88052.png",
          alt: "Open achievements",
          href: "/achievements",
          imageClassName: "h-[40px]",
        },
        {
          type: "icon",
          ariaLabel: "Search",
          href: "/search",
          icon: <CalendarDots className="size-[28px]" aria-hidden />,
        },
        {
          type: "icon",
          ariaLabel: "Notifications",
          href: "/notifications",
          icon: <Chats className="size-[28px]" aria-hidden />,
        },
        {
          type: "icon",
          ariaLabel: "Notifications",
          href: "/notifications",
          icon: <MegaphoneIcon className="size-[28px]" aria-hidden />,
        },
      ]}
      profile={{
        avatarSrc:
          "https://coding-platform.s3.amazonaws.com/dev/lms/tickets/67dd6b67-16bd-461c-89ae-c56959e6e634/YZhhVSFVNgeixCxq.png",
        avatarAlt: "Signed-in learner",
        menuTriggerLabel: "Open account menu",
        menuItems: [
          {
            label: "Dashboard",
            href: "/dashboard",
            isActive: true,
            icon: <LayoutDashboard className="size-4" aria-hidden />,
          },
          {
            label: "Profile settings",
            href: "/settings/profile",
            icon: <User className="size-4" aria-hidden />,
          },
          {
            label: "Help center",
            href: "https://help.masaischool.com",
            openInNewTab: true,
            icon: <LifeBuoy className="size-4" aria-hidden />,
          },
          {
            label: "Sign out",
            href: "/logout",
            icon: <LogOut className="size-4" aria-hidden />,
          },
        ],
      }}
    />
  );
}
