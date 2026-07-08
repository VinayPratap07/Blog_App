import React, { useState } from "react";
import {
  Type,
  FileText,
  Image,
  Sparkles,
  Eye,
  CloudLightning,
  Trash2,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { uploadBlog } from "../../API/API_Calls";

type Category = "Technology" | "Design" | "Art" | "Science";

export default function writeBlogPage() {
  const [formData, setFormData] = useState<{
    title: string;
    category: Category;
    body: string;
  }>({
    title: "",
    category: "Technology",
    body: "",
  });

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const categories: Category[] = ["Technology", "Design", "Art", "Science"];

  const mutation = useMutation({
    mutationFn: uploadBlog,

    onSuccess: () => {
      setIsSuccess(true);

      setFormData({
        title: "",
        category: "Technology",
        body: "",
      });

      setThumbnail(null);
      setImagePreview(null);

      setTimeout(() => {
        setIsSuccess(false);
        navigate("/");
      }, 2000);
    },

    onError: (error) => {
      console.error(error);
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setThumbnail(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleClearImage = () => {
    setThumbnail(null);
    setImagePreview(null);
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!thumbnail) {
      alert("Please select a thumbnail");
      return;
    }

    mutation.mutate({
      title: formData.title,
      category: formData.category,
      body: formData.body,
      thumbnail,
    });
  };
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#000000] text-[#E5E7EB] font-sans selection:bg-[#FF7E67]/30 selection:text-[#FF7E67] p-4 md:p-8 relative overflow-hidden flex items-center justify-center">
      {/* Dynamic Ambiance Grid */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#A78BFA]/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div
        className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#FF7E67]/5 rounded-full blur-[140px] pointer-events-none"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="w-full max-w-4xl relative mt-10">
        {/* Main Dashboard Panel */}
        <form
          onSubmit={handlePublish}
          className="bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-[32px] p-6 md:p-10 shadow-2xl space-y-8"
        >
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-6 gap-4">
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                Compose Entry <Sparkles className="w-5 h-5 text-[#FF7E67]" />
              </h2>
              <p className="text-zinc-500 text-xs mt-0.5">
                Deploy new educational records directly to the public network
                structure.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as Category,
                  })
                }
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-400 focus:outline-none focus:border-[#FF7E67]/40 outline-none cursor-pointer"
              >
                {categories.map((cat) => (
                  <option
                    key={cat}
                    value={cat}
                    className="bg-zinc-950 text-white"
                  >
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* SECTION 1: Blog Heading Fields */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-[#FF7E67]" /> Article Heading
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter article title... e.g., Architectural Scaling Subsystems"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-base font-bold text-white placeholder-zinc-600 focus:outline-none focus:border-[#FF7E67]/50 focus:ring-4 focus:ring-[#FF7E67]/5 transition-all outline-none"
            />
          </div>

          {/* SECTION 2: Cover Photo Upload Component */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 flex items-center gap-1.5">
              <Image className="w-3.5 h-3.5 text-[#A78BFA]" /> Graphic
              Environment (Cover Photo)
            </label>

            {!imagePreview ? (
              <label className="group flex flex-col items-center justify-center border-2 border-dashed border-white/10 hover:border-[#FF7E67]/40 rounded-2xl p-8 bg-white/5 cursor-pointer transition-all">
                <CloudLightning className="w-8 h-8 text-zinc-600 group-hover:text-[#FF7E67] transition-colors mb-2" />
                <span className="text-xs font-bold text-zinc-400 group-hover:text-white transition-colors">
                  Select media file asset
                </span>
                <span className="text-[10px] text-zinc-600 mt-1">
                  PNG, JPG or WEBP formats accepted
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            ) : (
              <div className="relative border border-white/10 rounded-2xl overflow-hidden bg-black/40 p-2">
                <img
                  src={imagePreview}
                  alt="Cover preview"
                  className="w-full max-h-60 object-cover rounded-xl border border-white/5"
                />
                <button
                  type="button"
                  onClick={handleClearImage}
                  className="absolute top-4 right-4 p-2 bg-black/80 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 rounded-xl border border-white/10 transition-colors backdrop-blur-md"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* SECTION 3: Main Blog Content Textarea */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#FF7E67]" /> Editorial
              Content (Body)
            </label>
            <textarea
              required
              rows={8}
              value={formData.body}
              onChange={(e) =>
                setFormData({ ...formData, body: e.target.value })
              }
              placeholder="Synthesize the core message or structural documentation block..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm text-zinc-300 placeholder-zinc-600 leading-relaxed focus:outline-none focus:border-[#FF7E67]/50 focus:ring-4 focus:ring-[#FF7E67]/5 transition-all outline-none resize-y min-h-[160px]"
            />
          </div>

          {/* Trigger Panel Block */}
          <div className="w-full h-px bg-white/5 pt-2"></div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#FF7E67] to-[#FF8E7A] disabled:from-zinc-700 disabled:to-zinc-800 text-black font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-[#FF7E67]/5 hover:shadow-[#FF7E67]/20 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {mutation.isPending ? (
                <>Synchronizing Pipeline...</>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 animate-pulse" /> Document
                  Live
                </>
              ) : (
                <>
                  Publish Payload <Eye className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {
        //Button to go back
      }
      <div className="fixed top-6 left-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <button
          onClick={() => navigate(-1)} // Navigates exactly one step back in history
          className="flex items-center justify-center w-14 h-14 bg-zinc-900/80 backdrop-blur-md text-white hover:text-[#FF7E67] border border-white/10 hover:border-[#FF7E67]/40 rounded-full transition-all duration-300 shadow-2xl hover:shadow-[0_0_25px_rgba(255,126,103,0.25)] group active:scale-95"
          title="Go Back"
        >
          <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
        </button>
      </div>
    </div>
  );
}
