import { useState } from "react";
import { Menu, X, Search, ChevronRight, LogOut, Settings } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Slices/userSlice";
import { logoutUser } from "../../API/API_Calls";
import { useQueryClient } from "@tanstack/react-query";
import type { RootState } from "../../Store/store";

const navLinks = [
  { name: "Home", to: "/" },
  { name: "Blogs", to: "/blog/allBlogs" },
  { name: "Users", to: "/all/users" },
  { name: "About", to: "/about" },
];

function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  // 1. Calling Redux store for userInfo and Authentication state
  const { userInfo, isAuthenticated } = useSelector(
    (state: RootState) => state.user,
  );
  const queryClient = useQueryClient();

  //2. calling useDispatch to remove user info from redux store in case of logout
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      queryClient.clear();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="w-full relative pb-2 border-b lg:border-none z-50 mt-5">
      <div className="w-full lg:w-11/12 xl:w-5/6 mx-auto px-4 lg:px-2">
        {/* Desktop: Grid (3 columns) | Mobile: Flex (between) */}
        <div className="flex justify-between items-center h-16 lg:h-20 lg:grid lg:grid-cols-3 gap-0 bg-black">
          {/* 1. Mobile Menu Button (Shows on small/medium screens) */}
          <div className="flex lg:hidden justify-start flex-1">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-zinc-400 hover:bg-zinc-900 rounded-md focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>

          {/* 2. Navigation Links */}
          <div className="hidden lg:flex justify-between items-center lg:pl-4 xl:pl-10 text-white font-medium">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="hover:text-[#FF7E67] transition-colors"
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* 3. Name Div (Center) */}
          <NavLink to="/">
            <div className="flex justify-center items-center text-white text-3xl lg:text-4xl font-bold flex-1 lg:flex-none cursor-pointer">
              Blog<span className="text-[#FF7E67]">App</span>
            </div>
          </NavLink>

          {/* 4. User Div (Right) */}
          <div className="flex justify-end items-center gap-3 md:gap-5 flex-1 lg:pr-5">
            {/* Search box */}
            <div className="hidden lg:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-1.5 focus-within:border-[#FF7E67]/50 transition-all">
              <Search className="w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-zinc-500 border-none focus:ring-0 text-sm ml-2 w-32 focus:w-48 transition-all outline-none"
              />
            </div>

            {/* CONDITIONAL AUTH SECTION (DESKTOP) */}
            {isAuthenticated ? (
              <div className="relative group cursor-pointer py-2 hidden sm:block">
                <div className="flex items-center gap-2 border border-white/10 bg-zinc-900/50 hover:border-[#FF7E67]/50 rounded-full pl-2 pr-4 py-1 transition-all">
                  <div className="w-8 h-8 rounded-full bg-[#FF7E67]/10 border border-[#FF7E67]/30 flex items-center justify-center text-[#FF7E67] text-sm font-bold">
                    {userInfo?.fullName.charAt(0)}
                  </div>
                  <span className="text-white text-sm font-medium">
                    Profile
                  </span>
                  <ChevronRight className="w-3 h-3 text-zinc-400 rotate-90" />
                </div>

                {/* Profile Dropdown Menu */}
                <div className="absolute top-full right-0 w-56 bg-zinc-950 border border-white/10 rounded-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 mt-2 backdrop-blur-2xl shadow-2xl">
                  <div className="px-4 py-3 border-b border-white/5 mb-1">
                    <p className="text-sm font-bold text-white truncate">
                      {userInfo?.fullName}
                    </p>
                    <p className="text-xs text-zinc-500 truncate">
                      @{userInfo?.username}
                    </p>
                  </div>
                  <NavLink to="/userProfile">
                    <button className="w-full flex items-center gap-2 px-4 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl text-sm transition-colors">
                      <Settings className="w-4 h-4" /> Account Settings
                    </button>
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-red-400 hover:bg-red-500/10 rounded-xl text-sm font-medium transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <NavLink to="/signup" className="hidden sm:block">
                <button className="px-6 py-2 bg-[#FF7E67] hover:bg-[#FF8E7A] text-black font-bold text-sm rounded-full transition-all hover:shadow-[0_0_20px_rgba(255,126,103,0.4)] active:scale-95">
                  Signup
                </button>
              </NavLink>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-zinc-950 shadow-xl border-t border-white/5 z-50 flex flex-col px-6 py-6 space-y-6 animate-in slide-in-from-top-2 fade-in duration-200">
          {/* CONDITIONAL AUTH SECTION (MOBILE HEADER) */}
          {isAuthenticated && (
            <Link to="/userProfile">
              <div className="flex items-center gap-4 bg-white/5 border border-white/5 rounded-2xl p-4">
                <div className="w-12 h-12 rounded-full bg-[#FF7E67]/10 border border-[#FF7E67]/30 flex items-center justify-center text-[#FF7E67] text-lg font-black">
                  {userInfo?.fullName.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-bold text-base">
                    {userInfo?.fullName}
                  </p>
                  <p className="text-zinc-500 text-sm">@{userInfo?.username}</p>
                </div>
              </div>
            </Link>
          )}

          {/* Mobile Search Box */}
          <div className="flex md:hidden items-center border border-white/10 w-full rounded-3xl p-2.5 pl-4 bg-white/5 focus-within:border-[#FF7E67]/50 transition-all">
            <input
              className="w-full border-0 focus:outline-none bg-transparent text-white text-base outline-none placeholder-zinc-500"
              type="text"
              placeholder="Search articles..."
            />
            <Search className="w-5 h-5 text-zinc-500 mr-2" />
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col text-center font-semibold text-lg text-zinc-400 group">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className="my-2 py-3 hover:text-white rounded-xl"
              >
                {link.name}
              </NavLink>
            ))}

            {/* CONDITIONAL ACTION LINKS (MOBILE) */}
            {isAuthenticated ? (
              <>
                <button
                  onClick={handleLogout}
                  className="my-2 py-3 border-t border-white/5 text-red-400 flex items-center justify-center gap-2 text-base font-bold"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </>
            ) : (
              <NavLink
                to="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 w-full py-3 bg-[#FF7E67] text-black font-bold text-center rounded-xl"
              >
                Signup
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
