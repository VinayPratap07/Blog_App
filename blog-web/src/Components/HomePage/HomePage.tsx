import { HeroSection } from "../HeroSection/HeroSection";
import Card from "../Crad/Card";
import Newsletter from "../NewsLetter/NewsLetter";
import { ChevronRight, PenSquare } from "lucide-react";
import { getRecentPost, getPopularPost } from "../../API/API_Calls";
import { useQueries } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import Loader from "../Loader/Loader";
import axios from "axios";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import type { blogType } from "../../API/ApiResponse";

function HomePage() {
  const result = useQueries({
    queries: [
      {
        queryKey: ["mostViewedBlog"],
        queryFn: () => getPopularPost(),
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ["mostRecentBlog"],
        queryFn: () => getRecentPost(),
        refetchOnWindowFocus: false,
      },
    ],
  });

  const [mostPopularBlogs, mostRecentBlogs] = result;

  const popularPost = mostPopularBlogs.data || [];
  const recentBlogs = mostRecentBlogs.data || [];

  const isEmpty = popularPost.length === 0 || recentBlogs.length === 0;

  if (mostPopularBlogs.isLoading || recentBlogs.isLoading) {
    return <Loader />;
  }

  if (mostPopularBlogs.isError && axios.isAxiosError(mostPopularBlogs.error)) {
    return (
      <ErrorMessage
        error={mostPopularBlogs.error}
        onRetry={mostPopularBlogs.refetch}
      />
    );
  }

  if (recentBlogs.isError && axios.isAxiosError(recentBlogs.error)) {
    return (
      <ErrorMessage error={recentBlogs.error} onRetry={recentBlogs.refetch} />
    );
  }

  return (
    <>
      <HeroSection />

      {
        //Latest Post Section
      }
      <section className="py-5 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                Recent Stories
              </h2>
              <p className="text-zinc-500 mt-2">
                The latest insights from our global contributors.
              </p>
            </div>
            <NavLink to="/blog/allBlogs">
              <button className="text-sm font-bold text-[#FF7E67] hover:underline flex items-center gap-1">
                View all <ChevronRight className="w-4 h-4" />
              </button>
            </NavLink>
          </div>
        </div>

        {isEmpty ? (
          <p className="text-red-800 text-xl font-extrabold text-center">
            No Blogs yet
          </p>
        ) : (
          <div className="w-full flex justify-center">
            <div className="w-[70%] flex items-center overflow-x-auto scrollbar-thin">
              <div className="flex gap-6 pb-4">
                {recentBlogs?.slice(0, 4).map((blog: blogType) => (
                  <div key={blog._id} className="w-100 shrink-0">
                    <Card {...blog} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {
        //Popular Post Section
      }
      <section className="py-5 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                Popular Post
              </h2>
              <p className="text-zinc-500 mt-2">
                The most popular posts in our network.
              </p>
            </div>
            <NavLink to="/blog/allBlogs">
              <button className="text-sm font-bold text-[#FF7E67] hover:underline flex items-center gap-1">
                View all <ChevronRight className="w-4 h-4" />
              </button>
            </NavLink>
          </div>
        </div>

        {isEmpty ? (
          <p className="text-red-800 text-xl font-extrabold text-center">
            No Blogs yet
          </p>
        ) : (
          <div className="w-full flex justify-center">
            <div className="w-[70%] flex items-center overflow-x-auto scrollbar-thin">
              <div className="flex gap-6 pb-4">
                {popularPost?.slice(0, 4).map((blog: blogType) => (
                  <div key={blog._id} className="w-100 shrink-0">
                    <Card {...blog} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {
        //Write your own blog page
      }
      <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <NavLink
          to="/WriteBlog"
          className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-white/10 text-white hover:text-[#FF7E67] hover:border-[#FF7E67]/40 rounded-xl text-sm font-bold transition-all"
          title="Write Post"
        >
          <PenSquare className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
          <span>Write Post</span>
        </NavLink>
      </div>

      {
        //News Letter section
      }
      <Newsletter />
    </>
  );
}

export default HomePage;
