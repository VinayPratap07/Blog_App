import { useEffect, useState } from "react";
import {
  User,
  Calendar,
  Layers,
  Newspaper,
  Activity,
  Heart,
  Award,
  ArrowLeft,
  Eye,
} from "lucide-react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserProfileForVisit } from "../../API/API_Calls";
import Loader from "../Loader/Loader";
import axios from "axios";
import ErrorState from "../ErrorMessage/ErrorMessage";

export default function UserProfileVisitPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "activity" | "projects"
  >("overview");
  const [totalViews, setTotalViews] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);

  const { id: userId } = useParams();

  const {
    isLoading,
    error,
    data: user,
  } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => getUserProfileForVisit(userId!),
    staleTime: 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const views = user.blogs.reduce(
        (sum: number, blog: any) => sum + blog.views,
        0,
      );
      setTotalViews(views);

      const likes = user.blogs.reduce(
        (sum: number, blog: any) => sum + blog.likeCount,
        0,
      );
      setTotalLikes(likes);
    }
  }, [user]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    if (axios.isAxiosError(error)) {
      return <ErrorState error={error} />;
    } else {
      return <ErrorState />;
    }
  }

  return (
    <div className="min-h-screen bg-[#000000] text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#FF7E67]/30">
      {/* Background Radial Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-[#FF7E67]/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-8 relative">
        {/* HEADER SECTION: Hero Banner & Main Profile Card */}
        <div className="bg-zinc-950/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between shadow-2xl">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            {/* Cyberpunk Neon-Bordered Avatar Wrapper */}
            <div className="relative group shrink-0">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF7E67] to-[#A78BFA] rounded-2xl blur opacity-40 group-hover:opacity-70 transition duration-300" />
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-zinc-900 border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden">
                <User className="w-12 h-12 text-zinc-500" />
              </div>
            </div>

            {/* Profile Info Text */}
            <div className="space-y-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
                  {user.fullName}
                  <Award className="w-5 h-5 text-[#FF7E67]" />
                </h1>
                <p className="text-[#FF7E67] font-mono text-sm font-semibold">
                  @{user.username}
                </p>
              </div>

              {/* Bio Details */}
              <p className="text-zinc-400 text-sm max-w-xl leading-relaxed">
                {user.description}
              </p>

              {/* Metadata Badges */}
              <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs font-medium text-zinc-500 font-mono">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {"Joined on "}

                    {new Date(user.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Access Panel */}
          <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto border-t border-white/5 md:border-t-0 pt-4 md:pt-0">
            <span className="flex items-center justify-center md:justify-start gap-2 px-4 py-2 bg-zinc-900 border border-white/5 hover:border-[#FF7E67]/30 text-zinc-300 hover:text-white text-xs font-mono rounded-xl transition-all grow md:grow-0">
              {user.role}
            </span>
            <div className="flex gap-2 grow md:grow-0"></div>
          </div>
        </div>

        {/* METRICS COUNT Grid Wrapper */}
        <div className="grid grid-cols-3 gap-4 font-mono">
          {[
            {
              label: "NO. PUBLISHED BLOGS",
              value: user.blogs.length,
              icon: Newspaper,
            },
            {
              label: "TOTAL NO. VIEWS",
              value: totalViews,
              icon: Eye,
            },
            {
              label: "TOTAL NO. LIKES",
              value: totalLikes,
              icon: Heart,
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-zinc-950/20 border border-white/5 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <stat.icon className="w-12 h-12 text-white" />
              </div>
              <span className="text-[9px] font-black tracking-widest text-zinc-500 block uppercase mb-1">
                {stat.label}
              </span>
              <span className="text-xl sm:text-2xl font-black text-white group-hover:text-[#FF7E67] transition-colors">
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* INTERACTION SECTION: Segment Navigation Tabs */}
        <div className="space-y-4">
          <div className="flex border-b border-white/5 font-mono text-xs font-bold">
            {(["overview"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 border-b-2 uppercase tracking-wider transition-all -mb-[2px] ${
                  activeTab === tab
                    ? "border-[#FF7E67] text-white bg-white/[0.02]"
                    : "border-transparent text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* TAB DISPLAY LOGIC MODULE */}
          <div className="min-h-[250px]">
            {activeTab === "overview" && (
              <div className="grid md:grid-cols-2 gap-6 animate-in fade-in duration-300">
                {/* Main feed list panel */}
                <div className="md:col-span-2 space-y-4">
                  <h3 className="text-sm font-mono font-black uppercase tracking-widest text-zinc-400 mb-2 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#FF7E67]" /> User Blog's
                  </h3>

                  <div className="space-y-3">
                    {user.blogs.map((blog: any) => (
                      <div
                        key={blog._id}
                        className="bg-zinc-950/40 border border-white/5 hover:border-white/10 rounded-xl p-4 flex items-start gap-4 transition-all"
                      >
                        <div className="p-2 bg-zinc-900 border border-white/5 rounded-lg text-zinc-400 shrink-0 mt-0.5">
                          <Layers className="w-3.5 h-3.5" />
                        </div>
                        <NavLink to={`/blog/${blog._id}`}>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-zinc-200">
                              {blog.title}
                            </p>

                            <span className="text-[10px] text-zinc-500 font-mono block">
                              {new Date(blog.createdAt).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                },
                              )}
                            </span>
                          </div>
                        </NavLink>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
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
