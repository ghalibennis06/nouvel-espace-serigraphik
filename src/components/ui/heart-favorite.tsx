import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";

export function HeartFavorite({ initial = false, onChange }: { initial?: boolean; onChange?: (liked: boolean) => void }) {
  const [isLiked, setIsLiked] = useState(initial);

  return (
    <motion.button
      type="button"
      onClick={() => { const next = !isLiked; setIsLiked(next); onChange?.(next); }}
      whileTap={{ scale: 0.9 }}
      className="rounded-full p-2 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
      aria-pressed={isLiked}
      aria-label={isLiked ? "Unfavorite" : "Favorite"}
    >
      <motion.div animate={{ scale: isLiked ? [1, 1.3, 1] : 1 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
        <Heart className={`h-5 w-5 transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-current opacity-60"}`} />
      </motion.div>
    </motion.button>
  );
}
