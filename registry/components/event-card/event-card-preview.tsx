import type { EventCardProps } from "./types";
import { CardCtaButton } from "../shared/card-cta-button";

type EventCardPreviewProps = Pick<
  EventCardProps,
  "title" | "miniDescription" | "ctaText" | "isActive" | "category" | "image"
> & {
  onCtaClick: () => void;
};

export function EventCardPreview({
  title,
  miniDescription,
  ctaText,
  isActive,
  category,
  image,
  onCtaClick,
}: EventCardPreviewProps) {
  return (
    <div className="font-poppins w-full max-w-[320px] overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-white">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="h-[84px] w-full rounded-t-[12px] object-cover"
        />
        <div className="absolute left-2 top-2 flex items-center gap-2">
          <span className="rounded-[32px] border border-[#E5E7EB] bg-[#E5E7EB] px-2 py-[2px] text-[12px] font-[500] leading-[16px] text-[#374151]">
            {category}
          </span>
          <span
            className={`rounded-[32px] px-2 py-[2px] text-[12px] font-[500] leading-[16px] ${
              isActive
                ? "bg-[#00B178] text-[#fff]"
                : "bg-[#F3F4F6] text-[#6B7280]"
            }`}
          >
            {isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-[18px] font-[600] leading-[28px] text-[#111928]">{title}</h3>
        <p className="mt-1 line-clamp-2 text-[14px] font-[400] leading-[20px] text-[#374151]">
          {miniDescription}
        </p>

        <div className="mt-4 flex justify-end">
          <CardCtaButton text={ctaText} onClick={onCtaClick} />
        </div>
      </div>
    </div>
  );
}
