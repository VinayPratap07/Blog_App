import { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Share2,
  Bookmark,
  MessageCircle,
  Calendar,
  Copy,
  Check,
  Eye,
} from "lucide-react";
import { getSingleBlog } from "../../API/API_Calls";
import { useQuery } from "@tanstack/react-query";
import CommentsBox from "../CommentsBox/CommentsBox";
import Loader from "../Loader/Loader";
import axios from "axios";
import ErrorState from "../ErrorMessage/ErrorMessage";
import { LikeButton } from "../LikeButton/LikeButton";

const BlogPage = () => {
  const [hasBookmarked, setHasBookmarked] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [commenstActive, setCommentsActive] = useState(false);

  const { id: blogId } = useParams();

  const {
    isLoading,
    error,
    data: blog,
  } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => getSingleBlog(blogId!),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // Empty array ensures this runs only once when the page loads

  // Scroll progress listener
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      // Prevent division by zero if the page has no scrollable height
      const progress =
        totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyLink = () => {
    document.execCommand("copy");
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    if (axios.isAxiosError(error)) {
      return <ErrorState error={error} />;
    }
    return <ErrorState />;
  }

  return (
    <div className="min-h-screen bg-[#000000] text-[#D1D5DB] font-sans selection:bg-[#FF7E67]/30 selection:text-[#FF7E67]">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[70] bg-zinc-900">
        <div
          className="h-full bg-gradient-to-r from-[#FF7E67] to-[#A78BFA] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Navigation Header */}
      <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-white/5 rounded-full transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
            </button>
            <div className="hidden md:flex flex-col">
              <span className="text-[10px] font-bold text-[#FF7E67] uppercase tracking-widest">
                Now Reading
              </span>
              <span className="text-xs font-medium text-white truncate max-w-[200px]">
                {blog.category}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setHasBookmarked(!hasBookmarked)}
              className={`p-2.5 rounded-full transition-all ${hasBookmarked ? "bg-[#FF7E67]/10 text-[#FF7E67]" : "hover:bg-white/5 text-zinc-400"}`}
            >
              <Bookmark
                className={`w-5 h-5 ${hasBookmarked ? "fill-current" : ""}`}
              />
            </button>
            <button className="p-2.5 hover:bg-white/5 rounded-full text-zinc-400 transition-all">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Article Hero */}
      <header className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF7E67]/10 border border-[#FF7E67]/20 text-[10px] font-black text-[#FF7E67] uppercase tracking-widest mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7E67]"></span>
            {blog.category}
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1] mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7E67] via-[#A78BFA] to-[#60A5FA]">
              {blog.title}
            </span>
          </h1>

          <div className="flex flex-wrap items-center gap-6 py-8 border-y border-white/5">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 border border-white/10 overflow-hidden">
                {blog.createdBy.fullName.charAt(0)}
              </div>
              <div>
                {
                  //Nav Link to others profile
                }
                <NavLink to={`/user/${blog.createdBy._id}`}>
                  <div className="text-sm font-bold text-white">
                    {blog.createdBy.fullName}
                  </div>
                </NavLink>
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                  {blog.createdBy.description?.slice(0, 20)}...
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 ml-auto">
              <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-500">
                <Calendar className="w-4 h-4" />{" "}
                {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-500">
                <Eye className="w-4 h-4" /> {blog.views}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 pb-32">
        {/* Left Sidebar (Desktop Only) */}
        <aside className="hidden lg:block lg:col-span-1 sticky top-32 h-fit space-y-6">
          <div className="flex flex-col items-center gap-6 py-8 bg-zinc-900/40 rounded-full border border-white/5">
            <LikeButton
              blogId={blog._id}
              initialLiked={blog.isLiked}
              initialLikeCount={blog.likeCount}
            />
            <button
              className="group flex flex-col items-center gap-1"
              onClick={() => setCommentsActive((prev) => !prev)}
            >
              <div className="p-3 rounded-full hover:bg-white/5 text-zinc-500 hover:text-white transition-all">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-zinc-600">
                {blog.comments.length}
              </span>
            </button>
            <div className="w-8 h-px bg-white/5 my-2"></div>
            <button
              onClick={handleCopyLink}
              className="p-3 rounded-full hover:bg-white/5 text-zinc-500 hover:text-white transition-all"
            >
              {copySuccess ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          </div>
        </aside>
        {commenstActive && <CommentsBox comments={blog.comments} />}

        {/* Article Body */}
        <main className="lg:col-span-8 space-y-12">
          {/* Featured Image */}
          <div className="relative rounded-[40px] overflow-hidden border border-white/10 aspect-[16/9] group">
            <img
              src={blog.thumbnail}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              alt={blog.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            <p className="whitespace-pre-line leading-relaxed mb-6">
              {blog.body}
            </p>

            {/* In-article CTA */}
            <div className="bg-gradient-to-br from-zinc-900 to-black rounded-[40px] p-12 border border-white/10 text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF7E67]/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Want the source code?
              </h3>
              <p className="text-zinc-500 mb-8 max-w-xs mx-auto text-sm">
                Download our complete Jupyter Notebook exploring multi-layer
                perceptrons.
              </p>
              <button className="px-8 py-4 bg-white text-black font-black rounded-2xl hover:bg-[#FF7E67] hover:text-white transition-all shadow-xl active:scale-95">
                Get the Notebook
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-12 border-t border-white/5">
            {[
              "AI",
              "Machine Learning",
              "Python",
              "Neural Networks",
              "Data Science",
            ].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-zinc-900 rounded-full text-xs font-bold text-zinc-400 border border-white/5 hover:border-[#FF7E67]/50 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </main>

        {/* Right Sidebar (Related Posts) */}
        <aside className="lg:col-span-3 space-y-12">
          {/* Newsletter Box */}
          <div className="p-6 rounded-3xl bg-zinc-900/30 border border-white/5">
            <h3 className="text-lg font-bold text-white mb-2">
              Weekly Newsletter
            </h3>
            <p className="text-xs text-zinc-500 mb-4 leading-relaxed">
              Join 50k+ tech enthusiasts for our weekend summary.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#FF7E67]/50 transition-all"
              />
              <button className="w-full py-3 bg-[#FF7E67] text-black font-black rounded-xl text-xs hover:bg-[#FF8E7A] transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </aside>
      </div>

      {
        //Delete Button
      }

      {/* Footer */}
      <footer className="py-20 bg-zinc-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <div className="text-3xl font-black text-white mb-8">
            Blog<span className="text-[#FF7E67]">App</span>
          </div>
          {/* <div className="flex gap-8 mb-12">
            <Twitter className="w-5 h-5 text-zinc-500 cursor-pointer hover:text-[#FF7E67] transition-colors" />
            <Github className="w-5 h-5 text-zinc-500 cursor-pointer hover:text-[#FF7E67] transition-colors" />
            <Instagram className="w-5 h-5 text-zinc-500 cursor-pointer hover:text-[#FF7E67] transition-colors" />
          </div> */}
          <p className="text-xs text-zinc-600 font-bold uppercase tracking-widest">
            © 2023 BLOGAPP ENGINE. EXPERIMENT WITH DARKNESS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BlogPage;
