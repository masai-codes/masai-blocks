"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

type ChipsType = "default" | "left-icon" | "right-icon" | "icon-only";
type ChipsSize = "regular" | "large";

const chipsVariants = cva(
  "inline-flex items-center justify-center rounded-[100px] border border-transparent bg-blue-50 !text-blue-500 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-300 hover:bg-blue-100 active:bg-blue-200 disabled:pointer-events-none disabled:border-gray-200 disabled:bg-gray-100 disabled:!text-gray-400",
  {
    variants: {
      size: {
        regular: "px-2 py-1 gap-1.5 type-b3-md",
        large: "px-3 py-2 gap-2 type-b2-md",
      },
      type: {
        default: "",
        "left-icon": "",
        "right-icon": "",
        "icon-only": "",
      },
    },
    compoundVariants: [
      { size: "regular", type: "icon-only", className: "p-1" },
      { size: "large", type: "icon-only", className: "p-2" },
    ],
    defaultVariants: {
      size: "regular",
      type: "default",
    },
  },
);

export type ChipsProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> &
  VariantProps<typeof chipsVariants> & {
    type?: ChipsType;
    size?: ChipsSize;
    label?: string;
    icon?: React.ReactNode;
    htmlType?: "button" | "submit" | "reset";
  };

export function Chips({
  className,
  type = "default",
  size = "regular",
  label = "Chip",
  icon,
  htmlType = "button",
  ...props
}: ChipsProps) {
  if ((type === "left-icon" || type === "right-icon" || type === "icon-only") && !icon) {
    // eslint-disable-next-line no-console
    console.warn("[Chips] Icon variant selected without passing `icon`.");
  }

  return (
    <button type={htmlType} className={cn(chipsVariants({ size, type }), className)} {...props}>
      {type === "left-icon" ? <span className="shrink-0">{icon}</span> : null}
      {type !== "icon-only" ? label : null}
      {type === "right-icon" ? <span className="shrink-0">{icon}</span> : null}
      {type === "icon-only" ? (
        <span className="size-4 shrink-0 [&_svg]:size-4">{icon}</span>
      ) : null}
    </button>
  );
}

