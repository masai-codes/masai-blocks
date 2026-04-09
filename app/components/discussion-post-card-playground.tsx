"use client"

import * as React from "react"

import { demoInputClass, demoTextareaClass } from "@/app/components/demo-field-classes"
import { DiscussionPostCard } from "@/registry/components/discussion-post-card"
import { DiscussionPostCardComposer } from "@/registry/components/discussion-post-card/discussion-post-card-composer"

export function DiscussionPostCardPlayground() {
  const [profileImage, setProfileImage] = React.useState(
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  )
  const [name, setName] = React.useState("Rithik Kumar")
  const [createdAt, setCreatedAt] = React.useState("Today at 04:30 PM")
  const [content, setContent] = React.useState(
    "<p>Who all are attending today's LMS event at <strong>4:30 PM</strong>?</p><p>Share your thoughts and what topics you want covered.</p>"
  )
  const [currentUpvoteCount, setCurrentUpvoteCount] = React.useState("40")
  const [currentDownvoteCount, setCurrentDownvoteCount] = React.useState("4")
  const [replyText, setReplyText] = React.useState("")
  const [repliesText, setRepliesText] = React.useState(
    "https://images.unsplash.com/photo-1531123414780-f74242c2b052?auto=format&fit=crop&w=120&q=80|Alex|Today at 04:52 PM|I'll be there with my team.|5|1\nhttps://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80|Neha|Today at 05:01 PM|Looking forward to meet everyone!|3|0"
  )

  const replies = React.useMemo(
    () =>
      repliesText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line, index) => {
          const [imagePart, authorPart, timePart, contentPart, upvotePart, downvotePart] = line.split("|")
          return {
            id: `reply-${index + 1}`,
            profileImage: imagePart?.trim() || undefined,
            author: authorPart?.trim() || `User ${index + 1}`,
            createdAt: timePart?.trim() || "Just now",
            content: contentPart?.trim() || "Reply content",
            currentUpvoteCount: Number(upvotePart?.trim()) || 0,
            currentDownvoteCount: Number(downvotePart?.trim()) || 0,
          }
        }),
    [repliesText]
  )

  return (
    <div className="flex flex-col gap-4 rounded-lg border p-4">
      <h2 className="text-sm text-muted-foreground sm:pl-3">
        Discussion post card with vote controls and responsive reply drawer.
      </h2>
      <p className="text-xs text-muted-foreground sm:pl-3">
        Click the reply count chip on the card to open the drawer and preview the compact reply input.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Profile image URL
          <input
            value={profileImage}
            onChange={(event) => setProfileImage(event.target.value)}
            className={demoInputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Name
          <input value={name} onChange={(event) => setName(event.target.value)} className={demoInputClass} />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Created at
          <input
            value={createdAt}
            onChange={(event) => setCreatedAt(event.target.value)}
            className={demoInputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Current upvote count
          <input
            value={currentUpvoteCount}
            onChange={(event) => setCurrentUpvoteCount(event.target.value)}
            className={demoInputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Current downvote count
          <input
            value={currentDownvoteCount}
            onChange={(event) => setCurrentDownvoteCount(event.target.value)}
            className={demoInputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground sm:col-span-2">
          Post content
          <DiscussionPostCardComposer
            profileImage={profileImage}
            replyText={content}
            onReplyTextChange={setContent}
            onReplySubmit={() => {}}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground sm:col-span-2">
          Reply text (composer preview)
          <DiscussionPostCardComposer
            profileImage={profileImage}
            replyText={replyText}
            onReplyTextChange={setReplyText}
            onReplySubmit={() => {}}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground sm:col-span-2">
          Replies (one per line: imageUrl|author|time|content|upvotes|downvotes)
          <textarea
            value={repliesText}
            onChange={(event) => setRepliesText(event.target.value)}
            className={`${demoTextareaClass} min-h-24`}
          />
        </label>
      </div>

      <div className="flex items-center justify-center py-4">
        <DiscussionPostCard
          profileImage={profileImage}
          name={name}
          createdAt={createdAt}
          content={content}
          currentUpvoteCount={Number(currentUpvoteCount) || 0}
          currentDownvoteCount={Number(currentDownvoteCount) || 0}
          onUpvoteClick={() => setCurrentUpvoteCount((current) => String((Number(current) || 0) + 1))}
          onDownvoteClick={() => setCurrentDownvoteCount((current) => String((Number(current) || 0) + 1))}
          replies={replies}
          replyText={replyText}
          onReplyTextChange={setReplyText}
          onReplySubmit={() => console.log("Reply submitted:", replyText)}
        />
      </div>
    </div>
  )
}
