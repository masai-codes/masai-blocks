"use client"

import * as React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { ArrowBigDown, ArrowBigUp, Bookmark, MessageCircle, X } from "lucide-react"

import type { DiscussionPostCardProps, DrawerDirection } from "./types"

type DiscussionPostCardDrawerProps = Pick<
  DiscussionPostCardProps,
  "profileImage" | "name" | "createdAt" | "content" | "replies" | "replyText" | "onReplyTextChange" | "onReplySubmit"
> & {
  isBookmarked: boolean
  onBookmarkClick: () => void
  open: boolean
  onOpenChange: (open: boolean) => void
  resolvedDirection: Exclude<DrawerDirection, "auto">
}

export function DiscussionPostCardDrawer({
  profileImage,
  name,
  createdAt,
  content,
  replies = [],
  replyText,
  onReplyTextChange,
  onReplySubmit,
  isBookmarked,
  onBookmarkClick,
  open,
  onOpenChange,
  resolvedDirection,
}: DiscussionPostCardDrawerProps) {
  const [replyVotes, setReplyVotes] = React.useState<
    Record<string, { upvotes: number; downvotes: number }>
  >({})

  React.useEffect(() => {
    setReplyVotes(
      replies.reduce<Record<string, { upvotes: number; downvotes: number }>>((accumulator, reply) => {
        accumulator[reply.id] = {
          upvotes: reply.currentUpvoteCount ?? 0,
          downvotes: reply.currentDownvoteCount ?? 0,
        }
        return accumulator
      }, {})
    )
  }, [replies])

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ease-out data-[state=closed]:opacity-0 data-[state=open]:opacity-100" />
        <Dialog.Content
          className={`fixed z-50 border bg-white font-poppins shadow-xl outline-none ${
            resolvedDirection === "right"
              ? "right-0 top-0 flex h-svh w-full max-w-[460px] flex-col border-l transition-transform duration-300 ease-out will-change-transform data-[state=closed]:translate-x-full data-[state=open]:translate-x-0"
              : "bottom-0 left-0 flex max-h-[88svh] w-full flex-col rounded-t-2xl border-t transition-transform duration-300 ease-out will-change-transform data-[state=closed]:translate-y-full data-[state=open]:translate-y-0"
          }`}
        >
          <div className="flex items-start justify-between border-b p-4">
            <Dialog.Title className="text-lg font-semibold text-[#111928]">Discussion</Dialog.Title>
            <Dialog.Close className="inline-flex size-8 items-center justify-center rounded-md border text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#111928]">
              <X size={16} />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            <div className="rounded-[12px] border border-[#E5E7EB] bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <img
                    src={profileImage}
                    alt={name}
                    className="size-10 rounded-full border border-[#E5E7EB] object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-[16px] font-[600] leading-[24px] text-[#111928]">{name}</p>
                    <p className="text-[13px] leading-[20px] text-[#4B5563]">{createdAt}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onBookmarkClick}
                  className="inline-flex size-8 items-center justify-center rounded-md border border-[#D1D5DB] text-[#6B7280] transition-colors hover:bg-[#F9FAFB] hover:text-[#111928]"
                >
                  <Bookmark size={16} className={isBookmarked ? "fill-current" : ""} />
                  <span className="sr-only">Bookmark discussion</span>
                </button>
              </div>
              <p className="mt-3 text-[15px] leading-[24px] text-[#111928]">{content}</p>
            </div>

            <div className="mt-4">
              <p className="text-[14px] font-[600] leading-[20px] text-[#111928]">Replies</p>
              {replies.length ? (
                <div className="mt-3 space-y-3">
                  {replies.map((reply) => (
                    <div key={reply.id} className="rounded-[10px] border border-[#E5E7EB] bg-[#F9FAFB] p-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-2">
                          <img
                            src={reply.profileImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80"}
                            alt={reply.author}
                            className="size-7 rounded-full border border-[#E5E7EB] object-cover"
                          />
                          <p className="truncate text-[13px] font-[600] leading-[18px] text-[#111928]">
                            {reply.author}
                          </p>
                        </div>
                        <p className="text-[12px] leading-[16px] text-[#6B7280]">{reply.createdAt}</p>
                      </div>
                      <p className="mt-1 text-[14px] leading-[22px] text-[#374151]">{reply.content}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-[#4B5563]">
                        <button
                          type="button"
                          onClick={() =>
                            setReplyVotes((current) => ({
                              ...current,
                              [reply.id]: {
                                upvotes: (current[reply.id]?.upvotes ?? 0) + 1,
                                downvotes: current[reply.id]?.downvotes ?? 0,
                              },
                            }))
                          }
                          className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 transition-colors hover:bg-[#F3F4F6] hover:text-[#111928]"
                        >
                          <ArrowBigUp size={16} />
                          <span className="text-[12px] font-[500] leading-[16px]">
                            Upvote {replyVotes[reply.id]?.upvotes ?? 0}
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setReplyVotes((current) => ({
                              ...current,
                              [reply.id]: {
                                upvotes: current[reply.id]?.upvotes ?? 0,
                                downvotes: (current[reply.id]?.downvotes ?? 0) + 1,
                              },
                            }))
                          }
                          className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 transition-colors hover:bg-[#F3F4F6] hover:text-[#111928]"
                        >
                          <ArrowBigDown size={16} />
                          <span className="text-[12px] font-[500] leading-[16px]">
                            Downvote {replyVotes[reply.id]?.downvotes ?? 0}
                          </span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-3 rounded-[10px] border border-dashed border-[#D1D5DB] bg-[#F9FAFB] p-4 text-[13px] text-[#6B7280]">
                  No replies yet. Start the discussion.
                </div>
              )}
            </div>
          </div>

          <div className="border-t p-4">
            <label className="sr-only" htmlFor="discussion-reply-input">
              Write a reply
            </label>
            <textarea
              id="discussion-reply-input"
              value={replyText}
              onChange={(event) => onReplyTextChange(event.target.value)}
              placeholder="Write your reply..."
              className="min-h-24 w-full resize-y rounded-lg border border-[#D1D5DB] px-3 py-2 text-[14px] leading-[22px] text-[#111928] outline-none transition-colors placeholder:text-[#9CA3AF] focus:border-[#EF8833] focus:ring-2 focus:ring-[#FDE8D7]"
            />
            <button
              type="button"
              onClick={onReplySubmit}
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#EF8833] px-4 py-2 text-[14px] font-[500] text-white transition-colors hover:bg-[#DC7A2D]"
            >
              <MessageCircle size={16} />
              Post reply
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
