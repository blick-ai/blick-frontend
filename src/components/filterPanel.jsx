import { useState } from "react"
import { STATUS_CONFIG } from "../utils/status"

const OPCOES_STATUS_GERAL = [
    { value: "", label: "Todas" },
    { value: "saudavel", label: STATUS_CONFIG.saudavel.label },
    { value: "praga", label: STATUS_CONFIG.praga.label },
    { value: "doenca", label: STATUS_CONFIG.doenca.label },
    { value: "nao_milho", label: STATUS_CONFIG.nao_milho.label },
]

const OPCOES_STATUS_PIPELINE = [
    { value: "", label: "Todas" },
    { value: "PENDENTE", label: "Pendente" },
    { value: "CLASSIFICADO", label: "Classificada" },
    { value: "ERRO", label: "Com erro" },
]

function GrupoBotoes({ titulo, opcoes, valorAtual, onChange }) {
    return (
        <div className="flex flex-col gap-2">
            <p className="text-[#8A898B] font-bold text-[10px] uppercase">{titulo}</p>
            <div className="flex flex-row flex-wrap gap-2">
                {opcoes.map((opcao) => (
                    <button
                        key={opcao.value || "todas"}
                        type="button"
                        onClick={() => onChange(opcao.value)}
                        className={`rounded-full py-1.5 px-3 text-[10px] font-bold border transition-colors ${
                            valorAtual === opcao.value
                                ? "bg-[#4A9B9A] border-[#4A9B9A] text-white"
                                : "bg-transparent border-[#8A898B]/50 text-[#8A898B] hover:border-white hover:text-white"
                        }`}
                    >
                        {opcao.label}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default function FilterPanel({ filtros, onChange, onLimpar }) {
    const [aberto, setAberto] = useState(false)

    const quantidadeAtiva = [
        filtros.status,
        filtros.statusGeral,
        filtros.dataInicio,
        filtros.dataFim,
    ].filter(Boolean).length

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setAberto((v) => !v)}
                className={`flex flex-row items-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold transition-colors ${
                    aberto || quantidadeAtiva > 0
                        ? "bg-[#4A9B9A]/15 border-[#4A9B9A] text-[#4A9B9A]"
                        : "bg-[#1B2125] border-[#8A898B]/25 text-[#8A898B] hover:border-white hover:text-white"
                }`}
            >
                Filtros
                {quantidadeAtiva > 0 && (
                    <span className="bg-[#4A9B9A] text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]">
                        {quantidadeAtiva}
                    </span>
                )}
            </button>

            {aberto && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setAberto(false)} />
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#1B2125] border border-[#8A898B]/25 rounded-xl p-4 flex flex-col gap-4 z-20 shadow-xl">
                        <GrupoBotoes
                            titulo="Estado da planta"
                            opcoes={OPCOES_STATUS_GERAL}
                            valorAtual={filtros.statusGeral || ""}
                            onChange={(v) => onChange({ ...filtros, statusGeral: v })}
                        />

                        <GrupoBotoes
                            titulo="Classificação"
                            opcoes={OPCOES_STATUS_PIPELINE}
                            valorAtual={filtros.status || ""}
                            onChange={(v) => onChange({ ...filtros, status: v })}
                        />

                        <div className="flex flex-col gap-2">
                            <p className="text-[#8A898B] font-bold text-[10px] uppercase">Período</p>
                            <div className="flex flex-row gap-2 items-center">
                                <input
                                    type="date"
                                    value={filtros.dataInicio || ""}
                                    onChange={(e) => onChange({ ...filtros, dataInicio: e.target.value })}
                                    className="bg-[#16191C] text-white text-xs border border-[#8A898B]/25 rounded-lg px-2 py-1.5 outline-none focus:border-[#4A9B9A] flex-1"
                                />
                                <p className="text-[#8A898B] text-xs">até</p>
                                <input
                                    type="date"
                                    value={filtros.dataFim || ""}
                                    onChange={(e) => onChange({ ...filtros, dataFim: e.target.value })}
                                    className="bg-[#16191C] text-white text-xs border border-[#8A898B]/25 rounded-lg px-2 py-1.5 outline-none focus:border-[#4A9B9A] flex-1"
                                />
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                onLimpar()
                                setAberto(false)
                            }}
                            className="text-[#8A898B] hover:text-white text-xs font-bold self-start"
                        >
                            Limpar filtros
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}