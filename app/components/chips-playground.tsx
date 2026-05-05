import { X } from "lucide-react";
import { Chips } from "@/registry/components/chips";

const SIZES = ["regular", "large"] as const;
const TYPES = ["default", "left-icon", "right-icon", "icon-only"] as const;

export function ChipsPlayground() {
  return (
    <div className="space-y-4 rounded-lg border p-4">
      {SIZES.map((size) => (
        <div key={size} className="space-y-2">
          <h3 className="text-sm font-semibold capitalize">{size}</h3>
          <div className="flex flex-wrap items-center gap-3">
            {TYPES.map((type) => (
              <Chips
                key={`${size}-${type}`}
                size={size}
                type={type}
                label="Design"
                icon={<X size={size === "large" ? 16 : 14} />}
                aria-label={type === "icon-only" ? "Remove chip" : undefined}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

