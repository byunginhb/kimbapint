import { cn } from "@/lib/utils"

interface TopicTagsProps {
  tags: string[]
  className?: string
}

export default function TopicTags({ tags, className }: TopicTagsProps) {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full yg-bg-canvas-100/50 px-2.5 py-0.5 text-xs yg-text-ink-400 cursor-default"
        >
          #{tag}
        </span>
      ))}
    </div>
  )
}
