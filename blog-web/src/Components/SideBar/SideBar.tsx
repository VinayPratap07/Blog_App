import { useState } from "react";
import { Filter, Calendar, Eye, X, Check, Search, Tag } from "lucide-react";

const AVAILABLE_CATEGORIES = ["Technology", "Design", "Art", "Science"];

interface FilterState {
  searchQuery: string;
  selectedCategories: string[];
  sortBy: "newest" | "oldest" | "views" | "readTime";
}

interface BlogSidebarProps {
  onFilterChange: (filters: FilterState) => void;
}

export default function SideBar({ onFilterChange }: BlogSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    selectedCategories: [],
    sortBy: "newest",
  });

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFilterChange(updated);
  };

  const toggleCategory = (category: string) => {
    const isSelected = filters.selectedCategories.includes(category);
    const updatedCategories = isSelected
      ? filters.selectedCategories.filter((c) => c !== category)
      : [...filters.selectedCategories, category];

    updateFilters({ selectedCategories: updatedCategories });
  };

  const clearAllFilters = () => {
    const cleared: FilterState = {
      searchQuery: "",
      selectedCategories: [],
      sortBy: "newest",
    };
    setFilters(cleared);
    onFilterChange(cleared);
  };

  const activeFiltersCount =
    filters.selectedCategories.length + (filters.searchQuery ? 1 : 0);

  return (
    <>
      {/* MOBILE TRIGGER: Floating action button fixed to the viewport on mobile screens */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 left-6 z-40 flex items-center gap-2 bg-[#FF7E67] text-white px-4 py-3 rounded-full shadow-xl font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#ff8e79] transition-all active:scale-95"
      >
        <Filter className="w-4 h-4" />
        <span>Filters ({activeFiltersCount})</span>
      </button>

      {/* MOBILE OVERLAY: Dimmed backdrop background when the mobile panel is pulled up */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      {/* SIDEBAR PANEL: Responsive container (Sticky desktop block / Sliding mobile sheet) */}
      <aside
        className={`
          /* Common Core Styling */
          bg-zinc-950/95 lg:bg-zinc-950/40 backdrop-blur-md border border-white/5 p-6 space-y-6 font-sans select-none shadow-2xl h-fit
          
          /* Desktop Breakpoint Behavior */
          lg:w-80 lg:shrink-0 lg:rounded-3xl lg:sticky lg:top-24 lg:translate-x-0 lg:z-0
          
          /* Mobile Viewport Behavior */
          fixed top-0 right-0 bottom-0 w-full sm:w-80 z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto
          ${isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
        `}
      >
        {/* SECTION 1: Header Meta Interface */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#FF7E67]" />
            <h2 className="text-sm font-mono font-black uppercase tracking-widest text-white">
              Index Controls
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 hover:text-[#FF7E67] transition-colors bg-white/5 px-2 py-1 rounded-md border border-white/5 hover:border-[#FF7E67]/20"
              >
                <X className="w-3 h-3" />
                <span>Reset ({activeFiltersCount})</span>
              </button>
            )}

            {/* MOBILE CLOSE ACTION: Visible only inside the open mobile sheet overlay */}
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-1 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close filters menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* SECTION 2: Live Query Search Node */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-500 block">
            Keyword Filter
          </label>
          <div className="relative group">
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => updateFilters({ searchQuery: e.target.value })}
              placeholder="Scan stream text..."
              className="w-full bg-zinc-900 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#FF7E67]/40 focus:ring-1 focus:ring-[#FF7E67]/20 transition-all font-mono"
            />
            <Search className="w-3.5 h-3.5 text-zinc-600 group-focus-within:text-[#FF7E67] absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors" />
          </div>
        </div>

        {/* SECTION 3: Sorting Operations Block */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-500 block">
            Sequence Matrix (Sort)
          </label>
          <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
            {[
              { id: "newest", label: "Latest Blogs", icon: Calendar },
              { id: "views", label: "Most Viewed", icon: Eye },
            ].map((option) => {
              const Icon = option.icon;
              const isSelected = filters.sortBy === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => updateFilters({ sortBy: option.id as any })}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-left font-medium transition-all duration-200 active:scale-95 ${
                    isSelected
                      ? "bg-[#FF7E67]/5 border-[#FF7E67]/40 text-white shadow-[0_0_15px_rgba(255,126,103,0.1)]"
                      : "bg-zinc-900/50 border-white/5 text-zinc-400 hover:text-zinc-200 hover:border-white/10"
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-[#FF7E67]" : "text-zinc-500"}`}
                  />
                  <span className="truncate">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 4: Segment Categorization Multiselect Node */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-500 block">
            Taxonomy Segments
          </label>
          <div className="flex flex-col gap-1.5 max-h-60 overflow-y-auto pr-1">
            {AVAILABLE_CATEGORIES.map((category) => {
              const isChecked = filters.selectedCategories.includes(category);
              return (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`flex items-center justify-between w-full p-2.5 rounded-xl border font-mono text-xs transition-all duration-150 ${
                    isChecked
                      ? "bg-zinc-900 border-[#A78BFA]/40 text-white"
                      : "bg-zinc-950/20 border-white/5 text-zinc-400 hover:text-zinc-200 hover:border-white/10 hover:bg-zinc-900/40"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Tag
                      className={`w-3 h-3 shrink-0 ${isChecked ? "text-[#A78BFA]" : "text-zinc-600"}`}
                    />
                    <span className="truncate">{category}</span>
                  </div>

                  <div
                    className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                      isChecked
                        ? "bg-[#A78BFA] border-[#A78BFA] text-black"
                        : "border-white/10"
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}
