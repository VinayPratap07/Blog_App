import { useState } from "react";
import {
  Code2,
  Layers,
  Cpu,
  ShieldCheck,
  Zap,
  FolderTree,
  ArrowRight,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";

type ActiveTab = "tech" | "architecture" | "security" | "performance";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("tech");

  const techStack = [
    {
      title: "Frontend",
      techs: [
        "React 19",
        "TypeScript",
        "Tailwind CSS",
        "React Router",
        "Redux Toolkit",
        "TanStack Query",
        "Axios",
      ],
    },
    { title: "Backend", techs: ["Node.js", "Express", "MongoDB", "Mongoose"] },
    { title: "Authentication", techs: ["JWT", "HTTP-only Cookies"] },
    { title: "Storage", techs: ["Cloudinary", "Multer"] },
    { title: "Deployment", techs: ["Vercel", "Render"] },
  ];

  const features = [
    {
      title: "Authentication",
      desc: "JWT authentication with secure HTTP-only cookies.",
    },
    {
      title: "Rich Text Blogging",
      desc: "Create and delete blogs with thumbnail uploads.",
    },
    { title: "Profiles", desc: "Dedicated user profile with personal blogs." },
    { title: "Image Uploads", desc: "Cloudinary integration using Multer." },
    { title: "Responsive UI", desc: "Desktop, tablet and mobile friendly." },
    { title: "Caching", desc: "Server state handled using TanStack Query." },
    {
      title: "Global State",
      desc: "Redux Toolkit manages authentication state.",
    },
  ];

  const learningItems = [
    "Building REST APIs",
    "JWT Authentication",
    "State Management",
    "Server State Caching",
    "MongoDB Relationships",
    "Image Upload Pipelines",
    "Protected Routes",
    "Express Middleware",
    "Project Architecture",
    "Responsive Design",
  ];

  const improvementItems = [
    "Bookmarks",
    "Notifications",
    "Blog Drafts",
    "Rich Text Editor",
    "Markdown Support",
    "Email Verification",
    "Password Reset",
    "Infinite Scroll",
    "Light Mode",
    "Admin Dashboard",
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#FF7E67]/30">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* HERO SECTION */}
        <section className="text-center space-y-6 max-w-3xl mx-auto pt-8">
          <span className="text-xs font-mono font-bold text-[#FF7E67] uppercase tracking-widest px-3 py-1 bg-zinc-900 border border-white/5 rounded-full">
            Project Overview
          </span>
          <h1 className="text-4xl sm:text-5xl font-mono font-black uppercase tracking-tight text-white">
            BlogApp
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed font-sans">
            A full-stack MERN blogging platform built with React, Express,
            MongoDB, and Node.js. Users can authenticate, publish blogs, upload
            images, interact through comments, and discover content through a
            responsive modern interface.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              to="/"
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-black hover:bg-zinc-200 rounded-xl text-sm font-bold transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GITHUB
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2 px-5 py-2.5 text-zinc-400 hover:text-white rounded-xl text-sm font-medium transition-all"
            >
              <BookOpen className="w-4 h-4" /> Browse Blogs
            </Link>
          </div>
        </section>

        {/* CORE ARCHITECTURE ARCHETYPE & TECHNICAL METRICS TABBERS */}
        <section className="border border-white/5 rounded-3xl bg-zinc-950/20 p-6 sm:p-8 space-y-8">
          <div className="flex flex-wrap gap-2 border-b border-white/5 pb-4">
            {(
              ["tech", "architecture", "security", "performance"] as ActiveTab[]
            ).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-lg border transition-all ${
                  activeTab === tab
                    ? "bg-zinc-900 text-[#FF7E67] border-[#FF7E67]/30"
                    : "bg-transparent text-zinc-500 border-transparent hover:text-zinc-300"
                }`}
              >
                {tab === "tech" && "Complete Tech Stack"}
                {tab === "architecture" && "System Architecture"}
                {tab === "security" && "Security Blueprint"}
                {tab === "performance" && "Performance Vectors"}
              </button>
            ))}
          </div>

          {/* TAB CONTENT: TECH STACK */}
          {activeTab === "tech" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {techStack.map((stack) => (
                <div
                  key={stack.title}
                  className="bg-zinc-950/40 border border-white/5 rounded-2xl p-5 space-y-3"
                >
                  <h3 className="text-xs font-mono uppercase text-zinc-400 tracking-wider flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-[#A78BFA]" /> {stack.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {stack.techs.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono text-zinc-300 px-2 py-1 bg-zinc-900/60 border border-white/5 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB CONTENT: ARCHITECTURE FLOWS */}
          {activeTab === "architecture" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* REQ LIFECYCLE A */}
                <div className="bg-zinc-950/40 border border-white/5 rounded-2xl p-5">
                  <h4 className="text-xs font-mono uppercase text-zinc-400 mb-4 tracking-wider">
                    Lifecycle: User Login
                  </h4>
                  <div className="space-y-2 text-xs font-mono">
                    {[
                      "React Form",
                      "Axios POST",
                      "Express Route",
                      "Validation Middleware",
                      "Controller",
                      "MongoDB",
                      "JWT Generated",
                      "HTTP Cookie Inject",
                      "Redux Update",
                    ].map((step, idx, arr) => (
                      <div key={step} className="flex flex-col items-start">
                        <div className="px-3 py-1.5 bg-zinc-900 border border-white/5 rounded-md text-zinc-300">
                          {step}
                        </div>
                        {idx !== arr.length - 1 && (
                          <ArrowRight className="w-3 h-3 text-zinc-600 rotate-95 my-1 ml-4" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* REQ LIFECYCLE B */}
                <div className="bg-zinc-950/40 border border-white/5 rounded-2xl p-5">
                  <h4 className="text-xs font-mono uppercase text-zinc-400 mb-4 tracking-wider">
                    Lifecycle: Create Blog
                  </h4>
                  <div className="space-y-2 text-xs font-mono">
                    {[
                      "User Client Input",
                      "Multer Processing",
                      "Cloudinary Content Delivery",
                      "MongoDB Node Save",
                      "TanStack Query Cache Invalidation",
                      "UI Automatic Refresh",
                    ].map((step, idx, arr) => (
                      <div key={step} className="flex flex-col items-start">
                        <div className="px-3 py-1.5 bg-zinc-900 border border-white/5 rounded-md text-zinc-300">
                          {step}
                        </div>
                        {idx !== arr.length - 1 && (
                          <ArrowRight className="w-3 h-3 text-zinc-600 rotate-95 my-1 ml-4" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* BACKEND & FRONTEND LAYERS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/5 pt-6">
                <div>
                  <h4 className="text-xs font-mono uppercase text-[#A78BFA] mb-3 tracking-wider flex items-center gap-1.5">
                    <Layers className="w-4 h-4" /> Backend Pipelines
                  </h4>
                  <p className="text-xs text-zinc-400 mb-4">
                    Hierarchical pipeline moving downstream securely from
                    routing to persistence layers.
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                    {[
                      "Routes",
                      "Validation MW",
                      "Auth MW",
                      "Controller",
                      "Mongoose Models",
                      "MongoDB",
                    ].map((layer, idx, arr) => (
                      <span key={layer} className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-zinc-900 border border-white/5 rounded text-zinc-300">
                          {layer}
                        </span>
                        {idx !== arr.length - 1 && (
                          <ArrowRight className="w-3 h-3 text-zinc-600" />
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase text-[#A78BFA] mb-3 tracking-wider flex items-center gap-1.5">
                    <Cpu className="w-4 h-4" /> Frontend Subsystems
                  </h4>
                  <p className="text-xs text-zinc-400 mb-4">
                    Declarative component orchestration interacting through
                    local and query state isolation layers.
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                    {[
                      "Pages",
                      "Components",
                      "TanStack Query",
                      "Axios Engine",
                      "Express API Gateway",
                    ].map((layer, idx, arr) => (
                      <span key={layer} className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-zinc-900 border border-white/5 rounded text-zinc-300">
                          {layer}
                        </span>
                        {idx !== arr.length - 1 && (
                          <ArrowRight className="w-3 h-3 text-zinc-600" />
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: SECURITY ARCHITECTURE */}
          {activeTab === "security" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: "JWT Authentication",
                  desc: "Stateless cross-origin authorization tokens.",
                },
                {
                  name: "HTTP-only Cookies",
                  desc: "XSS-resilient token storage isolated from client-side scripts.",
                },
                {
                  name: "Protected Routes",
                  desc: "Declarative middleware preventing unauthenticated DOM entries.",
                },
                {
                  name: "Input Validation",
                  desc: "Express sanitization parameters intercepting malicious payloads.",
                },
                {
                  name: "Mongoose Schema Validation",
                  desc: "Strict database-level structural type conformity safeguards.",
                },
                {
                  name: "Secure Image Uploads",
                  desc: "Isolated streaming through Multer buffer configurations to Cloudinary.",
                },
              ].map((sec) => (
                <div
                  key={sec.name}
                  className="bg-zinc-950/40 border border-white/5 rounded-2xl p-5 space-y-1"
                >
                  <div className="text-xs font-mono text-white font-bold flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />{" "}
                    {sec.name}
                  </div>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    {sec.desc}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* TAB CONTENT: PERFORMANCE OPTIMIZATIONS */}
          {activeTab === "performance" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                "TanStack Query Caching",
                "Lazy Component Rendering",
                "Optimized API Calls",
                "Reusable Design Components",
                "React Memoization Engine",
                "Client-side Routing",
                "Minimal Re-renders Management",
                "Environment Variable Inject",
              ].map((perf) => (
                <div
                  key={perf}
                  className="bg-zinc-950/40 border border-white/5 rounded-xl p-4 flex items-center gap-3"
                >
                  <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="text-xs font-mono text-zinc-300">
                    {perf}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* COMPREHENSIVE PLATFORM FEATURES */}
        <section className="space-y-6">
          <h2 className="text-lg font-mono font-black uppercase tracking-widest text-white border-b border-white/5 pb-4">
            Platform Capabilities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feat) => (
              <div
                key={feat.title}
                className="bg-zinc-950/40 border border-white/5 hover:border-white/10 rounded-2xl p-5 transition-all space-y-2"
              >
                <h3 className="text-sm font-bold text-white tracking-tight">
                  {feat.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* METADATA: SYSTEM STRUCTURE DIRECTORIES */}
        <section className="space-y-6">
          <h2 className="text-lg font-mono font-black uppercase tracking-widest text-white border-b border-white/5 pb-4 flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-[#FF7E67]" /> Project Structure
            Mapping
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            <div className="bg-zinc-950/40 border border-white/5 rounded-2xl p-6 space-y-4">
              <span className="text-zinc-400 uppercase tracking-widest font-bold block text-[10px]">
                Frontend Subsystem
              </span>
              <pre className="text-zinc-300 leading-relaxed">
                {`src
├── API          # Network layer configuration (Axios instances)
├── Components   # Atomized and composite UI components
├── Slices       # Redux Toolkit application state segments
├── Store        # Global Redux state manager engine
└── Assets       # Static production media assets`}
              </pre>
            </div>
            <div className="bg-zinc-950/40 border border-white/5 rounded-2xl p-6 space-y-4">
              <span className="text-zinc-400 uppercase tracking-widest font-bold block text-[10px]">
                Backend Engine
              </span>
              <pre className="text-zinc-300 leading-relaxed">
                {`api
├── Controllers  # Request orchestrators and business execution context
├── Models       # Declarative ODM database schemas (Mongoose)
├── Routes       # Endpoint mapping matching resource matrices
├── Middlewares  # Intermediary interceptors (Auth, Cors, Validation)
├── Services     # Third-party network handlers (Cloudinary integration)
└── Utils        # Universal system helpers and application constants`}
              </pre>
            </div>
          </div>
        </section>

        {/* ACCUMULATED KNOWLEDGE & FUTURE ROADMAP */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase text-zinc-400 tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#A78BFA]" /> Retrospective
              Insights
            </h3>
            <div className="bg-zinc-950/40 border border-white/5 rounded-2xl p-5 flex flex-wrap gap-2">
              {learningItems.map((item) => (
                <span
                  key={item}
                  className="text-xs font-mono px-2 py-1 bg-zinc-900 border border-white/5 rounded-md text-zinc-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase text-zinc-400 tracking-wider flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-[#FF7E67]" /> Engineering
              Roadmap
            </h3>
            <div className="bg-zinc-950/40 border border-white/5 rounded-2xl p-5 flex flex-wrap gap-2">
              {improvementItems.map((item) => (
                <span
                  key={item}
                  className="text-xs font-mono px-2 py-1 bg-zinc-900/40 border border-dashed border-white/10 rounded-md text-zinc-500"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
