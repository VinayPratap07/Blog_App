import { Mail } from "lucide-react";

function Newsletter() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto relative rounded-[40px] overflow-hidden bg-gradient-to-br from-zinc-900 to-black border border-white/10 p-12 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#FF7E67] to-transparent opacity-50"></div>
        <Mail className="w-12 h-12 text-[#FF7E67] mx-auto mb-6" />
        <h2 className="text-4xl font-bold text-white mb-4">
          Stay in the loop.
        </h2>
        <p className="text-zinc-400 mb-8 max-w-md mx-auto">
          Get a weekly digest of the best stories, tools, and inspirations
          delivered to your inbox.
        </p>
        <form
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 bg-white/5 border border-white/10 text-zinc-400 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#FF7E67]/50 focus:ring-4 focus:ring-[#FF7E67]/10 transition-all"
          />
          <button className="bg-white text-black font-bold px-8 py-4 rounded-2xl hover:bg-[#FF7E67] hover:text-white transition-all active:scale-95">
            Join Now
          </button>
        </form>
        <p className="text-[10px] text-zinc-600 mt-6 uppercase tracking-widest">
          No spam. Ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}

export default Newsletter;
