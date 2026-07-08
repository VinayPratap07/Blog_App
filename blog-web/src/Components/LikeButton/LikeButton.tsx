import { useMutation } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { useState } from "react";
import { registerLike, unLikeBlog } from "../../API/API_Calls";

type LikeButtonProps = {
  blogId: string;
  initialLiked: boolean;
  initialLikeCount: number;
};

export function LikeButton({
  blogId,
  initialLiked,
  initialLikeCount,
}: LikeButtonProps) {
  const [hasLiked, setHasLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  const likeMutation = useMutation({
    mutationFn: () => registerLike(blogId),
  });

  const unlikeMutation = useMutation({
    mutationFn: () => unLikeBlog(blogId),
  });

  const handleClick = async () => {
    if (hasLiked) {
      setHasLiked(false);
      setLikeCount((c) => c - 1);
      await unlikeMutation.mutateAsync();
    } else {
      setHasLiked(true);
      setLikeCount((c) => c + 1);
      await likeMutation.mutateAsync();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="group flex flex-col items-center gap-1"
    >
      <div
        className={`p-3 rounded-full transition-all ${
          hasLiked
            ? "bg-red-500/10 text-red-500"
            : "hover:bg-white/5 text-zinc-500 hover:text-white"
        }`}
      >
        <Heart className={`w-5 h-5 ${hasLiked ? "fill-current" : ""}`} />
      </div>

      <span
        className={`text-[10px] font-bold ${
          hasLiked ? "text-red-500" : "text-zinc-600"
        }`}
      >
        {likeCount}
      </span>
    </button>
  );
}
