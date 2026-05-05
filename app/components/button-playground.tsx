import { ArrowRight, Download } from "lucide-react"
import { Button } from "@/registry/components/button"

const TYPES = ["primary", "secondary", "tertiary", "link"] as const
const SIZES = ["sm", "md", "lg"] as const

export function ButtonPlayground() {
  return (
    <div className="space-y-4 rounded-lg border p-4">
      {TYPES.map((type) => (
        <div key={type} className="space-y-3">
          <h3 className="text-sm font-semibold capitalize">{type}</h3>
          <div className="flex flex-wrap items-center gap-2">
            {SIZES.map((size) => (
              <Button key={`${type}-${size}`} type={type} size={size} ctaText={`${type} ${size}`} />
            ))}
            <Button type={type} size="md" ctaText="Icon Left" icon={<Download size={16} />} iconDirection="left" />
            <Button type={type} size="md" ctaText="Icon Right" icon={<ArrowRight size={16} />} iconDirection="right" />
            <Button type={type} size="md" icon={<Download size={16} />} iconOnly aria-label={`${type} icon only`} />
            <Button type={type} size="md" ctaText="Disabled" disabled />
          </div>
        </div>
      ))}
    </div>
  )
}
