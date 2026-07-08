import { useState } from "react";
import {
  Mail,
  Eye,
  EyeOff,
  Lock,
  User,
  ShieldCheck,
  ArrowRight,
  LogIn,
  AtSign,
  NotepadText,
} from "lucide-react";
import { sendLoginReq, sendSignupReq } from "../../API/API_Calls";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignupPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    description: "",
    identifier: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // if (formData.password.length < 8 || formData.password.length > 15) {
        //   setErrorMessage("Wrong password");
        //   return;
        // }
        await sendLoginReq({
          identifier: formData.identifier,
          password: formData.password,
        });
        setErrorMessage("");
        navigate("/");
      } else {
        if (
          formData.password.trim().length < 8 ||
          formData.password.trim().length > 15
        ) {
          setErrorMessage("Password must be atleat 8 characters");
          return;
        }
        if (
          formData.password.includes(" ") ||
          formData.username.includes(" ")
        ) {
          setErrorMessage("Password and Username can not contain empty spaces");
          return;
        }
        if (
          formData.description.trim().length < 30 ||
          formData.description.trim().length > 200
        ) {
          setErrorMessage("Description must be between 30-200 characters");
          return;
        }
        const response = await sendSignupReq({
          fullName: formData.fullName,
          username: formData.username,
          email: formData.email,
          description: formData.description,
          password: formData.password,
        });
        console.log("Signup Success:", response);
        setIsLogin(true);

        setErrorMessage("");
        setFormData({
          fullName: "",
          username: "",
          email: "",
          description: "",
          identifier: "",
          password: "",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || "Authentication failed.",
        );
      } else {
        setErrorMessage("Something went wrong.");
      }
    }
  };

  const toggleMode = () => {
    setIsLogin((prev) => !prev);
    setFormData({
      fullName: "",
      username: "",
      email: "",
      description: "",
      identifier: "",
      password: "",
    });
    setErrorMessage("");
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#E5E7EB] font-sans selection:bg-[#FF7E67]/30 selection:text-[#FF7E67] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FF7E67]/10 rounded-full blur-[120px] animate-pulse"></div>
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#A78BFA]/10 rounded-full blur-[120px] animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="w-full max-w-xl relative">
        <div className="grid lg:grid-cols-1 gap-0 bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-[40px] shadow-2xl overflow-hidden transition-all duration-500">
          <div className="p-8 md:p-12">
            {/* Header Section */}
            <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#FF7E67]/10 border border-[#FF7E67]/20 mb-6">
                {isLogin ? (
                  <LogIn className="w-6 h-6 text-[#FF7E67]" />
                ) : (
                  <ShieldCheck className="w-6 h-6 text-[#FF7E67]" />
                )}
              </div>
              <h1 className="text-4xl font-black tracking-tight text-white mb-3">
                {isLogin ? "Welcome back" : "Create an account"}
              </h1>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
                {isLogin
                  ? "Enter your credentials to access your personalized feed and saved articles."
                  : "Join 2,000+ readers getting exclusive early access to our weekly technical deep-dives."}
              </p>
            </div>

            {/* Form Section */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* SIGNUP ONLY: Full Name */}
              {!isLogin && (
                <div className="space-y-2 animate-in fade-in slide-in-from-left-4 duration-300">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
                    Full Name
                  </label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-[#FF7E67] transition-colors" />
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#FF7E67]/50 focus:ring-4 focus:ring-[#FF7E67]/5 transition-all outline-none"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}

              {/* SIGNUP ONLY: Username & Email Fields */}
              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
                      Username
                    </label>
                    <div className="relative group">
                      <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-[#FF7E67] transition-colors" />
                      <input
                        type="text"
                        required
                        placeholder="Username"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#FF7E67]/50 focus:ring-4 focus:ring-[#FF7E67]/5 transition-all outline-none"
                        value={formData.username}
                        onChange={(e) =>
                          setFormData({ ...formData, username: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
                      Email Address
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-[#FF7E67] transition-colors" />
                      <input
                        type="email"
                        required
                        placeholder="Email"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#FF7E67]/50 focus:ring-4 focus:ring-[#FF7E67]/5 transition-all outline-none"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
                      Description
                    </label>
                    <div className="relative group">
                      <NotepadText className="absolute left-4 top-2/9 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-[#FF7E67] transition-colors" />
                      <textarea
                        required
                        placeholder="Write your description..."
                        maxLength={200}
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#FF7E67]/50 focus:ring-4 focus:ring-[#FF7E67]/5 transition-all outline-none"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </>
              )}

              {/* LOGIN ONLY: Single Identifier Field */}
              {isLogin && (
                <div className="space-y-2 animate-in fade-in duration-300">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
                    Email or Username
                  </label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-[#FF7E67] transition-colors" />
                    <input
                      type="text"
                      required
                      placeholder="Enter your email or username"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#FF7E67]/50 focus:ring-4 focus:ring-[#FF7E67]/5 transition-all outline-none"
                      value={formData.identifier}
                      onChange={(e) =>
                        setFormData({ ...formData, identifier: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}

              {/* SHARED: Password Field */}
              <div className="space-y-2 pb-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    Password
                  </label>
                  {isLogin && (
                    <button
                      type="button"
                      className="text-[10px] font-bold text-[#FF7E67] uppercase tracking-widest hover:underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-[#FF7E67] transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-sm focus:outline-none focus:border-[#FF7E67]/50 focus:ring-4 focus:ring-[#FF7E67]/5 transition-all outline-none"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#FF7E67] to-[#FF8E7A] text-black font-black rounded-2xl transition-all shadow-xl shadow-[#FF7E67]/10 hover:shadow-[#FF7E67]/20 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {isLogin ? "Sign In" : "Create Account"}{" "}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Error message */}
            {errorMessage && (
              <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-2xl p-4 mb-6">
                <div className="w-2 h-2 bg-red-500 rounded-full" />

                <p className="text-sm text-red-400">{errorMessage}</p>
              </div>
            )}

            {/* Footer / Toggle Mode Context */}
            <div className="mt-8 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="w-full h-px bg-white/5"></div>
                <span className="text-[10px] text-zinc-700 whitespace-nowrap uppercase tracking-[0.2em] font-bold">
                  Safe & Secure
                </span>
                <div className="w-full h-px bg-white/5"></div>
              </div>
              <p className="text-center text-xs text-zinc-500">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-[#FF7E67] font-bold hover:underline"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </div>
        </div>
        {/* Bottom Footer Info */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-[10px] text-zinc-600 font-bold uppercase tracking-widest px-4">
          <p>© 2026 BLOGAPP ENGINE</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <button className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <button className="hover:text-white transition-colors">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
