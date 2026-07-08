import { NavLink } from "react-router-dom";

type cardProps = {
  _id: string;
  thumbnail: string;
  title: string;
  category: string;
};

function Card({ _id, title, thumbnail, category }: cardProps) {
  return (
    <div>
      <NavLink to={`/blog/${_id}`}>
        <article key={_id} className="group cursor-pointer">
          <div className="relative mb-6 rounded-2xl overflow-hidden aspect-video border border-white/5 bg-zinc-900 shadow-xl">
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-bold text-white border border-white/10 uppercase tracking-widest">
                {category}
              </span>
            </div>
          </div>
          <div className="space-y-3">
            {/* <div className="text-xs text-zinc-500 font-medium">{date}</div> */}
            <h3 className="text-xl font-bold text-white group-hover:text-[#FF7E67] transition-colors leading-snug">
              {title}
            </h3>
            <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">
              {/* {excerpt} */}
            </p>
          </div>
        </article>
        ))
      </NavLink>
    </div>
  );
}

export default Card;
