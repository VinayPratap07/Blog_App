import { useState, useMemo } from "react";
import SideBar from "../SideBar/SideBar";
import { Eye, Calendar, PenSquare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllBlogs } from "../../API/API_Calls";
import Loader from "../Loader/Loader";
import { NavLink } from "react-router-dom";
import ErrorState from "../ErrorMessage/ErrorMessage";
import axios from "axios";

// Mirror the state interface from your sidebar component
interface FilterState {
  searchQuery: string;
  selectedCategories: string[];
  sortBy: "newest" | "oldest" | "views" | "readTime";
}

export default function BlogsPage() {
  // Initialize state matching the default configuration inside your sidebar
  const [currentFilters, setCurrentFilters] = useState<FilterState>({
    searchQuery: "",
    selectedCategories: [],
    sortBy: "newest",
  });

  const {
    isLoading,
    error,
    data: blogs,
  } = useQuery({
    queryKey: ["allBlogs"],
    queryFn: getAllBlogs,
    staleTime: 10000 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // Performance-optimized data mutation engine
  const filteredAndSortedBlogs = useMemo(() => {
    if (!blogs) return [];

    let result = [...blogs];

    // Node A: Execute Keyword Search Filter
    if (currentFilters.searchQuery.trim() !== "") {
      const query = currentFilters.searchQuery.toLowerCase();
      result = result.filter(
        (blog) =>
          blog.title.toLowerCase().includes(query) ||
          blog.body.slice(0, 25).toLowerCase().includes(query),
      );
    }

    // Node B: Execute Category Multi-Select Segment Filter
    if (currentFilters.selectedCategories.length > 0) {
      result = result.filter((blog) =>
        currentFilters.selectedCategories.includes(blog.category),
      );
    }

    // Node C: Execute Sequence Matrix Sorting Operation
    result.sort((a, b) => {
      if (currentFilters.sortBy === "newest") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      if (currentFilters.sortBy === "oldest") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }
      if (currentFilters.sortBy === "views") {
        return b.views - a.views;
      }

      return 0;
    });

    return result;
  }, [currentFilters, blogs]);
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
    <div className="min-h-screen bg-[#000000] text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#FF7E67]/30">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 relative">
        {/* PASS THE FILTER HANDLER TO YOUR SIDEBAR COMPONENT */}
        <SideBar
          onFilterChange={(newFilters) => setCurrentFilters(newFilters)}
        />

        {/* MAIN BLOG STREAM DISPLAY GRID */}
        <div className="flex-1 space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <h1 className="text-xl font-mono font-black uppercase tracking-widest text-white">
              All Blogs
            </h1>
            <span className="text-xs font-mono text-zinc-500">
              Showing {filteredAndSortedBlogs.length} Entries
            </span>
          </div>

          {filteredAndSortedBlogs.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-white/5 rounded-3xl text-zinc-600 font-mono text-sm">
              Zero records match current structural query parameters.
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredAndSortedBlogs.map((blog) => (
                <article
                  key={blog._id}
                  className="bg-zinc-950/40 border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all group relative"
                >
                  <NavLink to={`/blog/${blog._id}`}>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3">
                      <span className="text-[10px] font-mono font-bold text-[#A78BFA] px-2 py-0.5 bg-zinc-900 border border-white/5 rounded-md">
                        {blog.category}
                      </span>
                      <span className="text-xs text-zinc-500 font-mono">
                        By {blog.createdBy.fullName}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-white group-hover:text-[#FF7E67] transition-colors mb-2">
                      {blog.title}
                    </h2>
                    <p className="text-sm text-zinc-400 mb-4 max-w-3xl leading-relaxed">
                      {blog.body.slice(0, 100)}...
                    </p>

                    <div className="flex gap-4 text-xs font-mono text-zinc-500 border-t border-white/5 pt-4">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />{" "}
                        {blog.views.toLocaleString()}
                      </span>

                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />{" "}
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </NavLink>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
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
    </div>
  );
}
