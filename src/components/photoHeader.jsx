export default function PhotoHeader({ total, filtroSlot }) {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div className="flex flex-col gap-1">
                    <p className="text-white font-bold text-xl">CAPTURAS ANALISADAS</p>
                    <p className="text-[#8A898B] text-sm">{total} captura{total === 1 ? "" : "s"} encontrada{total === 1 ? "" : "s"}</p>
                </div>
                {filtroSlot}
            </div>
        </div>
    )
}