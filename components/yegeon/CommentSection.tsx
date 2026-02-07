"use client"

import { useState } from "react"
import Link from "next/link"
import { ThumbsUp, MessageCircle } from "lucide-react"
import { formatRelativeTime } from "@/lib/utils"
import type { Comment } from "@/lib/yegeon-types"
import UserAvatar from "./UserAvatar"

interface CommentSectionProps {
  comments: Comment[]
}

export default function CommentSection({ comments }: CommentSectionProps) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-medium yg-text-ink-600">
        댓글 {comments.length}개
      </h3>

      <div className="mb-4 flex gap-3">
        <div className="h-8 w-8 flex-shrink-0 rounded-full yg-bg-canvas-100" />
        <div className="flex-1">
          <div className="rounded-lg border yg-border-canvas-100 yg-bg-canvas-50 px-3 py-2">
            <span className="text-sm yg-text-ink-400">
              댓글을 작성하세요...
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  )
}

function CommentItem({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) {
  const [showReplies, setShowReplies] = useState(true)

  return (
    <div className={isReply ? "ml-10" : ""}>
      <div className="flex gap-3">
        <Link href={`/yegeon/${comment.username}`} className="flex-shrink-0">
          <UserAvatar size={isReply ? 28 : 32} />
        </Link>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Link
              href={`/yegeon/${comment.username}`}
              className="text-sm font-medium yg-text-ink-800 hover:yg-text-ink-1000"
            >
              {comment.displayName}
            </Link>
            <span className="text-xs yg-text-ink-400">
              {formatRelativeTime(comment.timestamp)}
            </span>
          </div>

          <p className="mt-1 text-sm leading-relaxed yg-text-ink-600">
            {comment.content}
          </p>

          <div className="mt-1.5 flex items-center gap-4">
            <button className="flex items-center gap-1 text-xs yg-text-ink-400 hover:yg-text-ink-600">
              <ThumbsUp className="h-3.5 w-3.5" />
              {comment.likes}
            </button>
            {!isReply && comment.replies.length > 0 && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="flex items-center gap-1 text-xs yg-text-ink-400 hover:yg-text-ink-600"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                {comment.replies.length}개 답글
              </button>
            )}
          </div>
        </div>
      </div>

      {showReplies && comment.replies.length > 0 && (
        <div className="yegeon-reply-line mt-3 flex flex-col gap-3 pl-4">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} isReply />
          ))}
        </div>
      )}
    </div>
  )
}
