import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { heroBlog } from "../../API/API_Calls";
import Loader from "../Loader/Loader";
import axios from "axios";
import ErrorState from "../ErrorMessage/ErrorMessage";

export const HeroSection = () => {
  const {
    isLoading,
    error,
    data: blog,
  } = useQuery({
    queryKey: ["heroBlog"],
    queryFn: heroBlog,
    staleTime: 1000 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  console.log(blog);
  if (!blog || blog.length === 0) {
    return <ErrorState message="No blog found" />;
  }

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
    <div>
      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-8 animate-in fade-in slide-in-from-left duration-1000">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#FF7E67]">
                <span className="w-2 h-2 rounded-full bg-[#FF7E67] animate-pulse"></span>
                {blog[0].category}
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white">
                {blog[0].title.slice(0, 20)}...
              </h1>
              <p className="text-xl text-zinc-400 max-w-lg leading-relaxed">
                {blog[0].body.slice(0, 175)}
              </p>
              <div className="flex items-center gap-4">
                <NavLink to={`/blog/${blog[0]._id}`}>
                  <button
                    className="cursor-pointer
 group px-8 py-4 bg-white text-black font-bold rounded-2xl flex items-center gap-2 transition-all hover:bg-[#FF7E67] hover:text-white"
                  >
                    Read Story{" "}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </NavLink>
              </div>
            </div>

            <div className="lg:col-span-6 relative group animate-in fade-in zoom-in duration-1000">
              {/* Artistic Frame instead of plain white box */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FF7E67] to-[#A78BFA] rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <Link to={`/blog/${blog[0]._id}`}>
                <div className="relative bg-black rounded-3xl overflow-hidden aspect-[4/3] border border-white/10 shadow-2xl">
                  <img
                    src={blog[0].thumbnail}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt="Space nebula"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6"></div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
