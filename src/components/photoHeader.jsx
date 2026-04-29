import { useState } from "react"

export default function PhotoHeader({ totalPhotos, totalLeaves, healthCounts }) {
    const [filter, setFilter] = useState("todas")

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-1">
                    <p className="text-white font-bold text-xl">IMAGENS ANALISADAS</p>
                    <p className="text-[#8A898B] text-sm">Soja · 25/04/2026 · {totalPhotos} capturas · {totalLeaves} folhas detectadas</p>
                </div>
                <div className="flex flex-row gap-2">
                    {[
                        { key: "todas", label: `TODAS (${totalPhotos})` },
                        { key: "saudavel", label: `SAUDÁVEIS (${healthCounts.healthy})` },
                        { key: "atencao", label: `ATENÇÃO (${healthCounts.warning})` },
                        { key: "critico", label: `CRÍTICAS (${healthCounts.critical})` },
                    ].map((btn) => (
                        <button
                            key={btn.key}
                            type="button"
                            onClick={() => setFilter(btn.key)}
                            className={`rounded-full py-1.5 px-4 text-[10px] font-bold border ${
                                filter === btn.key
                                    ? "bg-[#4A9B9A] border-[#4A9B9A] text-white"
                                    : "bg-transparent border-[#8A898B]/50 text-[#8A898B] hover:border-white hover:text-white"
                            }`}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex flex-row items-center gap-2 bg-[#1B2125] border border-[#8A898B]/25 rounded-xl px-4 py-2">
                <p className="text-[#8A898B] text-sm">Q</p>
                <input
                    type="text"
                    placeholder="Buscar por ID da imagem, setor ou posição..."
                    className="bg-transparent text-white text-sm outline-none flex-1 placeholder-[#8A898B]/50"
                />
            </div>
        </div>
    )
}