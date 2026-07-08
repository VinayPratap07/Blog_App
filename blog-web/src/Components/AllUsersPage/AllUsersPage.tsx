import { Users, MessageSquare, ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllUserProfile } from "../../API/API_Calls";
import Loader from "../Loader/Loader";
import axios from "axios";
import ErrorState from "../ErrorMessage/ErrorMessage";
import type { userType } from "../../API/ApiResponse";

// Comprehensive mock dataset mirroring user structures and tech stacks

export default function AllUsersPage() {
  const {
    isLoading,
    error,
    data: users,
  } = useQuery({
    queryKey: ["AllUsers"],
    queryFn: getAllUserProfile,
    staleTime: 10000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

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
      {/* Background Neon Ambiance */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-[#A78BFA]/5 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#FF7E67]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-950/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 shadow-2xl">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2.5">
              User Profiles <Users className="w-6 h-6 text-[#FF7E67]" />
            </h1>
          </div>
        </div>

        {/* USER PROFILE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user: userType) => (
            <div
              key={user.id}
              className="bg-zinc-950/40 border border-white/5 hover:border-white/10 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
            >
              <Link to={`/user/${user.id}`}>
                {/* Subtle card glow on hover */}
                <div className="absolute -inset-px bg-gradient-to-r from-[#FF7E67]/10 to-[#A78BFA]/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

                {/* Top Details Wrapper */}
                <div className="space-y-4 relative">
                  <div className="flex items-center justify-between">
                    {/* Minimal Avatar placeholder */}
                    <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-500 font-mono font-black text-lg group-hover:border-[#FF7E67]/30 group-hover:text-[#FF7E67] transition-all">
                      {user.fullName.charAt(0)}
                    </div>

                    {/* Clearances classification badge */}
                    <span
                      className={`text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border ${
                        user.role === "ADMIN"
                          ? "text-[#FF7E67] bg-[#FF7E67]/5 border-[#FF7E67]/10"
                          : user.role === "USER"
                            ? "text-[#A78BFA] bg-[#A78BFA]/5 border-[#A78BFA]/10"
                            : "text-zinc-500 bg-zinc-900 border-white/5"
                      }`}
                    >
                      {user.role}
                    </span>
                  </div>

                  {/* Identification Meta */}
                  <div>
                    <h3 className="font-bold text-white group-hover:text-[#FF7E67] transition-colors flex items-center gap-1.5">
                      {user.fullName}
                    </h3>
                    <p className="text-zinc-600 text-xs font-mono">
                      @{user.username}
                    </p>
                  </div>

                  {/* Location & Specialty */}
                  <div className="space-y-1 text-xs font-medium text-zinc-400">
                    <div className="flex items-center gap-1 text-zinc-500 font-mono text-[11px]">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5 text-zinc-600" />{" "}
                        {user.description.slice(0, 47)}...
                      </span>
                    </div>
                  </div>
                </div>

                {/* Horizontal Divider Line */}
                <div className="w-full h-px bg-white/5 my-4 relative" />

                {/* Bottom Core Metrics Array & Vector Trigger */}
                <div className="flex items-center justify-between font-mono relative">
                  <div className="flex gap-4 text-zinc-500 text-[11px]">
                    <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#A78BFA]" />
                    <span className="truncate text-zinc-400">
                      {"Joined on "}
                      {new Date(user.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <ArrowUpRight className="w-3 h-3 text-zinc-600 group-hover:text-[#FF7E67] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
