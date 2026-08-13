const severityColor = {
    critical: "#C75050",
    warning: "#D4A34A",
    healthy: "#4CAF50",
}

const severityLabel = {
    critical: "CRÍTICO",
    warning: "ATENÇÃO",
    healthy: "BAIXO",
}

export default function PlantInfoModal({ data, onClose }) {
    if (!data) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={onClose}>
            <div
                className="bg-[#1B2125] border border-[#8A898B]/25 rounded-2xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-row justify-between items-start p-5 border-b border-[#8A898B]/25">
                    <div className="flex flex-col gap-0.5">
                        <p className="text-white font-extrabold text-lg">{data.nome_comum}</p>
                        <p className="text-[#8A898B] text-sm italic">{data.nome_cientifico}</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-[#8A898B] hover:text-white text-xl leading-none mt-0.5"
                    >
                        ✕
                    </button>
                </div>

                <div className="overflow-y-auto flex flex-col gap-5 p-5">
                    <div className="flex flex-col gap-3">
                        <p className="text-[#8A898B] font-bold text-[10px]">DADOS TAXONÔMICOS</p>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { label: "Família", value: data.familia },
                                { label: "Ciclo", value: data.ciclo },
                                { label: "Origem", value: data.origem },
                            ].map((item) => (
                                <div key={item.label} className="bg-[#16191C] rounded-lg px-3 py-2 flex flex-col gap-0.5">
                                    <p className="text-[#8A898B] text-[9px] font-bold uppercase">{item.label}</p>
                                    <p className="text-white text-xs font-bold">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <p className="text-[#8A898B] font-bold text-[10px]">CONDIÇÕES IDEAIS DE CULTIVO</p>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { label: "Solo", value: data.cultivoIdeal.solo },
                                { label: "pH", value: data.cultivoIdeal.ph },
                                { label: "Temperatura", value: data.cultivoIdeal.temperatura },
                                { label: "Precipitação", value: data.cultivoIdeal.precipitacao },
                                { label: "Luminosidade", value: data.cultivoIdeal.luminosidade },
                            ].map((item) => (
                                <div key={item.label} className="bg-[#16191C] rounded-lg px-3 py-2 flex flex-col gap-0.5">
                                    <p className="text-[#8A898B] text-[9px] font-bold uppercase">{item.label}</p>
                                    <p className="text-white text-xs font-bold">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <p className="text-[#8A898B] font-bold text-[10px]">PRAGAS E DOENÇAS COMUNS</p>
                        <div className="flex flex-col gap-2">
                            {data.pragasDoencas.map((item) => (
                                <div key={item.nome} className="bg-[#16191C] rounded-lg px-3 py-2.5 flex flex-col gap-1">
                                    <div className="flex flex-row justify-between items-center">
                                        <div className="flex flex-row gap-2 items-center">
                                            <p className="text-white text-xs font-bold">{item.nome}</p>
                                            <span
                                                className="text-[9px] font-bold px-1.5 py-0.5 rounded-full border"
                                                style={{ color: severityColor[item.severidade], borderColor: severityColor[item.severidade] + "55", backgroundColor: severityColor[item.severidade] + "18" }}
                                            >
                                                {item.tipo.toUpperCase()}
                                            </span>
                                        </div>
                                        <span
                                            className="text-[9px] font-bold"
                                            style={{ color: severityColor[item.severidade] }}
                                        >
                                            {severityLabel[item.severidade]}
                                        </span>
                                    </div>
                                    <p className="text-[#8A898B] text-[11px]">{item.descricao}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}