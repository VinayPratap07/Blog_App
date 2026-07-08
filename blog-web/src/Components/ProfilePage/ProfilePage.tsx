import { useEffect, useState } from "react";
import {
  Mail,
  Eye,
  BookOpen,
  Calendar,
  Settings,
  LogOut,
  ChevronRight,
  Trash,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteBlog, getCurrentUser, logoutUser } from "../../API/API_Calls";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useDispatch } from "react-redux";
import { logout } from "../../Slices/userSlice";
import ConfirmationModal from "../ConfirmationComponent/ConfirmationComponent";
import axios from "axios";
import ErrorState from "../ErrorMessage/ErrorMessage";

export default function ProfilePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [totalViews, setTotalViews] = useState(0);
  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    data: user,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (user) {
      const views = user.blogs.reduce(
        (sum: number, blog: any) => sum + blog.views,
        0,
      );
      setTotalViews(views);
    }
  }, [user]);

  const mutation = useMutation({
    mutationFn: deleteBlog,

    onSuccess: () => {
      setModalOpen(false);
    },
  });

  const [isSaved, setIsSaved] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      queryClient.removeQueries({
        queryKey: ["user"],
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handlePurgeExecution = (id: string) => {
    console.log(
      "Confirmed. Hard database wipe executed on targeted clusters.",
      id,
    );
    // Insert your real backend mutation API call here
    mutation.mutate(id);
  };
  if (mutation.isPending) {
    return <Loader />;
  }
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
      return <ErrorState error={error} />;
    } else {
      <ErrorState />;
    }
  }

  return (
    <div className="min-h-screen bg-[#000000] text-[#E5E7EB] font-sans selection:bg-[#FF7E67]/30 selection:text-[#FF7E67] p-4 md:p-8 relative overflow-hidden flex items-start justify-center">
      {/* Background Ambience Elements */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#FF7E67]/5 rounded-full blur-[140px] animate-pulse pointer-events-none"></div>
      <div
        className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#A78BFA]/5 rounded-full blur-[140px] pointer-events-none"
        style={{ animationDelay: "1.5s" }}
      ></div>

      <div className="w-full max-w-5xl relative grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        {/* LEFT COLUMN: Profile Summary Card */}
        <div className="lg:col-span-1 bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-[32px] p-6 md:p-8 flex flex-col items-center text-center h-fit shadow-2xl">
          <div className="relative mb-5 group">
            <div className="w-28 h-28 rounded-full bg-[#FF7E67]/10 border-2 border-[#FF7E67]/40 flex items-center justify-center text-[#FF7E67] font-black text-4xl shadow-xl shadow-[#FF7E67]/5 group-hover:border-[#FF7E67] transition-all duration-300">
              {user.fullName.charAt(0)}
            </div>
            <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-4 border-zinc-950 rounded-full animate-pulse" />
          </div>

          <h2 className="text-2xl font-black text-white tracking-tight">
            {user.fullName}
          </h2>

          <p className="text-[#FF7E67] font-semibold text-sm mt-0.5">
            @{user.username}
          </p>
          <p className="flex items-center justify-center mt-2 md:justify-start gap-2 px-4 py-2 bg-zinc-900 border border-white/5 hover:border-[#FF7E67]/30 text-zinc-300 hover:text-white text-xs font-mono rounded-xl transition-all grow md:grow-0">
            {user.role}
          </p>
          <p className="text-zinc-400 text-xs leading-relaxed mt-4 px-2 text-start">
            {user.description}
          </p>

          <div className="w-full h-px bg-white/5 my-6"></div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-4 w-full mb-6">
            <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-center">
              <div className="flex justify-center items-center gap-1.5 text-zinc-500 mb-1">
                <Eye className="w-4 h-4 text-[#FF7E67]" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Views
                </span>
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                {totalViews}
              </span>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-center">
              <div className="flex justify-center items-center gap-1.5 text-zinc-500 mb-1">
                <BookOpen className="w-4 h-4 text-[#A78BFA]" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Blogs
                </span>
              </div>
              {user.blogs.length}
            </div>
          </div>

          <div className="w-full space-y-2 text-left text-xs text-zinc-500">
            <div className="flex items-center gap-2.5 px-2">
              <Mail className="w-4 h-4 text-zinc-600" />
              <span className="truncate text-zinc-400">{user.email}</span>
            </div>
            <div className="flex items-center gap-2.5 px-2">
              <Calendar className="w-4 h-4 text-zinc-600" />
              <span className="text-zinc-400">
                {"Joined "}
                {new Date(user.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Settings & Content Dashboard */}
        <div className="lg:col-span-2 space-y-8">
          {/* Section: Dynamic Metrics & Recent Posts */}
          <div className="bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-[32px] p-6 md:p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-black tracking-tight text-white">
                  Your Published Work
                </h3>
                <p className="text-zinc-500 text-xs mt-0.5">
                  Manage and track live performance metrics
                </p>
              </div>
              <span className="text-xs font-bold text-[#FF7E67] uppercase tracking-widest bg-[#FF7E67]/10 px-3 py-1 rounded-full border border-[#FF7E67]/20">
                Live Analytics
              </span>
            </div>

            {/* Blog List Container */}
            <div className="space-y-4">
              {user.blogs.map((blog: any) => (
                <div
                  key={blog._id}
                  className="group flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white/5 border border-white/5 hover:border-white/10 rounded-2xl transition-all duration-300 gap-4"
                >
                  <NavLink to={`/blog/${blog._id}`}>
                    <div className="space-y-1 max-w-md">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#A78BFA]">
                        {blog.category}
                      </span>
                      <h4 className="text-sm font-bold text-white group-hover:text-[#FF7E67] transition-colors cursor-pointer line-clamp-1">
                        {blog.title}
                      </h4>
                      <p className="text-[11px] text-zinc-500">
                        {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </NavLink>

                  {/* Views & Actions container */}
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 border-t sm:border-0 border-white/5 pt-3 sm:pt-0">
                    <div className="flex items-center gap-2 text-zinc-400 bg-black/40 px-3 py-1.5 rounded-xl border border-white/5">
                      <Eye className="w-4 h-4 text-zinc-500 group-hover:text-[#FF7E67] transition-all" />
                      <span className="text-xs font-black tracking-wide">
                        {blog.views}
                      </span>
                    </div>
                    <button
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-xl text-red-400 hover:text-red-300 transition-colors"
                      onClick={() => setModalOpen(true)}
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                    <ConfirmationModal
                      isOpen={modalOpen}
                      onClose={() => setModalOpen(false)}
                      onConfirm={() => handlePurgeExecution(blog._id)}
                      title="Are you sure?"
                      message={`Are you certain you want to delete "${blog.title}" Blog? This action cannot be reversed.`}
                      confirmText="DELETE"
                    />

                    <NavLink to={`/blog/${blog._id}`}>
                      <button className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </NavLink>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Account Management Configurations */}
          <div className="bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-[32px] p-6 md:p-8 shadow-2xl space-y-6">
            {/* Action Triggers */}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => {
                  setIsSaved(true);
                  setTimeout(() => setIsSaved(false), 2500);
                }}
                className="w-full sm:w-auto px-6 py-3 bg-[#FF7E67] hover:bg-[#FF8E7A] text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-[#FF7E67]/5 hover:shadow-[#FF7E67]/20 flex items-center justify-center gap-2"
              >
                {isSaved ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 animate-bounce" />{" "}
                    Modifications Appended
                  </>
                ) : (
                  <>
                    <Settings className="w-4 h-4" /> Delete Profile
                  </>
                )}
              </button>

              <button
                className="w-full sm:w-auto px-6 py-3 bg-zinc-800/60 border border-white/5 hover:border-red-500/30 text-zinc-400 hover:text-red-400 font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" /> LogOut
              </button>
            </div>
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
