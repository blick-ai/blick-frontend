export default function Showcase({ path, title, description }) {
    return (
        <div className="bg-[#1B2125] flex flex-col text-left py-5 px-6 sm:px-8 gap-2 rounded-xl border border-[#8A898B]/25 w-full sm:w-2/5">
            <img src={path} alt="" className="w-6"/>
            <p className="font-bold text-white text-lg sm:text-xl">{title}</p>
            <p className="text-[#8A898B] text-sm sm:text-base">{description}</p>
        </div>
    )
}