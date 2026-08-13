export default function PhotoHeader({ total, busca, onBuscaChange, filtroSlot }) {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div className="flex flex-col gap-1">
                    <p className="text-white font-bold text-xl">CAPTURAS ANALISADAS</p>
                    <p className="text-[#8A898B] text-sm">{total} captura{total === 1 ? "" : "s"} encontrada{total === 1 ? "" : "s"}</p>
                </div>
                {filtroSlot}
            </div>
            <div className="flex flex-row items-center gap-2 bg-[#1B2125] border border-[#8A898B]/25 rounded-xl px-4 py-2">
                <p className="text-[#8A898B] text-sm">Q</p>
                <input
                    type="text"
                    placeholder="Buscar por ID da captura nesta página..."
                    value={busca}
                    onChange={(e) => onBuscaChange(e.target.value)}
                    className="bg-transparent text-white text-sm outline-none flex-1 placeholder-[#8A898B]/50"
                />
            </div>
        </div>
    )
}