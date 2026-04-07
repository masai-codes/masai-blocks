import type { ClubCardProps } from "./types";

const CTA_THEME_STYLES = {
  yellow: "bg-[#EF8833] text-[#fff] hover:bg-[#EF8833]",
  red: "bg-[#EF4444] text-white hover:bg-[#DC2626]",
} as const;

type ClubCardPreviewProps = Pick<
  ClubCardProps,
  "domain" | "name" | "imageUrl" | "miniDescription" | "ctaText" | "ctaTheme"
> & {
  onCtaClick: () => void;
};

export function ClubCardPreview({
  domain,
  name,
  imageUrl,
  miniDescription,
  ctaText,
  ctaTheme,
  onCtaClick,
}: ClubCardPreviewProps) {
  return (
    <div className="font-poppins w-full max-w-[298px] rounded-[12px] border border-[#E5E7EB] bg-white p-4">
      <div className="flex items-start justify-between">
        <div className="bg-[#EBF5FF] p-[12px] rounded-[50%]">
          <img
            src={imageUrl}
            alt={name}
            className="w-[24px] h-[24px] object-cover rounded-[8px]"
          />
        </div>
        <p className="px-[8px] text-[12px] font-[500] leading-[16px] font-poppins rounded py-[4px] border border-[#E5E7EB] rounded-[32px] text-center">
          {domain}
        </p>
      </div>
      <div className="mt-[12px]">
        <h3 className="text-[16px] font-[600] leading-[24px] font-poppins">
          {name}
        </h3>
        <p className="mt-[4px] text-[14px] font-[400] leading-[20px] font-poppins text-[#6B7280]">
          {miniDescription}
        </p>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onCtaClick}
          className={`mt-[20px] font-poppins text-[#fff] inline-flex items-center justify-center rounded-[8px] px-[16px] py-[12px] text-[14px] font-[500] leading-[12px] transition-colors ${CTA_THEME_STYLES[ctaTheme]}`}
        >
          {ctaText}
        </button>
      </div>
    </div>
  );
}
