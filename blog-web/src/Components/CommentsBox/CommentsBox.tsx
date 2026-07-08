import React, { useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadComments } from "../../API/API_Calls";
import { NavLink, useParams } from "react-router-dom";
import type { userType } from "../../API/ApiResponse";

type Comment = {
  _id: string;
  body: string;
  writtenBy: userType;
  commentsFrom: string;
  likesCount: number;
  createdAt: string;
};

type CommentsBoxProps = {
  comments: Comment[];
};

export default function CommentsBox({ comments }: CommentsBoxProps) {
  const [formData, setFormData] = useState({ body: "" });
  const { id: blogId } = useParams();
  const queryClient = useQueryClient(); // Required for cache invalidation

  const mutation = useMutation({
    mutationFn: uploadComments,
    onSuccess: () => {
      setFormData({ body: "" });
      // Replace 'blogComments' and blogId with your actual query key used in the parent component
      queryClient.invalidateQueries({ queryKey: ["blogComments", blogId] });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
    },
  });

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.body.trim() || !blogId) return;

    mutation.mutate({
      id: blogId,
      data: {
        body: formData.body.trim(),
      },
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-16 bg-zinc-900/80 backdrop-blur-3xl border border-white/10 rounded-[32px] p-6 md:p-8 shadow-2xl fixed inset-0 z-50 overflow-y-auto">
      {/* Header Info */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 bg-[#FF7E67]/10 border border-[#FF7E67]/20 rounded-xl text-[#FF7E67]">
          <MessageSquare className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-black text-white tracking-tight">
            Discussion
          </h3>
          <p className="text-zinc-500 text-xs mt-0.5">
            thoughts shared on this module
          </p>
        </div>
      </div>

      {/* Write Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-10 group">
        <div className="relative bg-white/5 border border-white/10 group-focus-within:border-[#FF7E67]/40 rounded-2xl p-4 transition-all duration-300">
          <textarea
            rows={3}
            value={formData.body}
            onChange={(e) => setFormData({ body: e.target.value })}
            placeholder="Join the discussion, add deep technical feedback..."
            className="w-full bg-transparent text-[#E5E7EB] placeholder-zinc-600 text-sm focus:outline-none resize-none outline-none border-none focus:ring-0"
          />

          <div className="flex justify-end items-center border-t border-white/5 pt-3 mt-2">
            <button
              type="submit"
              className="px-5 py-2 bg-[#FF7E67] hover:bg-[#FF8E7A] disabled:opacity-40 text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#FF7E67]/5 flex items-center gap-2 active:scale-95"
              disabled={mutation.isPending || !formData.body.trim()}
            >
              {mutation.isPending ? "Broadcasting..." : "Broadcast"}{" "}
              <Send className="w-3 h-3" />
            </button>
          </div>
        </div>
      </form>

      {/* Main Stream Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-zinc-500 text-sm">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="border-b border-white/5 last:border-none pb-6 last:pb-0"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FF7E67]/10 border border-[#FF7E67]/30 flex items-center justify-center text-[#FF7E67] font-bold text-sm shrink-0">
                  {comment.writtenBy?.fullName?.charAt(0) || "?"}
                </div>

                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <NavLink to={`/user/${comment.writtenBy._id}`}>
                      <span className="text-sm font-bold text-white">
                        {comment.writtenBy?.fullName}
                      </span>
                      <span className="text-xs text-zinc-500 ml-1">
                        @{comment.writtenBy?.username}
                      </span>
                    </NavLink>

                    <span className="text-xs text-zinc-600 ml-auto">
                      {new Date(comment.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </span>
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed pr-2">
                    {comment.body}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
