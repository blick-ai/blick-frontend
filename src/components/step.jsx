export default function Step({ id, title, description }) {
    return (
        <div className="flex flex-col text-center py-5 px-8 gap-4 w-9/40">
            <p className="font-bold text-[#316868] text-6xl">{id}</p>
            <p className="font-bold text-white text-xl">{title}</p>
            <p className="text-[#8A898B]">{description}</p>
        </div>
    )
}