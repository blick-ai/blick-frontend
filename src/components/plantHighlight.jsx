import StatusBar from "./statusBar"
import VitalCard from "./vitalCard"
import plantPlaceholder from "../assets/images/plant-placeholder.png"
import cameraGray from "../assets/images/camera-gray.png"
import locationPin from "../assets/images/location-pin.png"
import { statusInfo, formatarHora, formatarData } from "../utils/status"

const LABEL_STATUS_PIPELINE = {
    PENDENTE: "Pendente de classificação",
    CLASSIFICADO: "Classificada",
    ERRO: "Falha na classificação",
}

const LABEL_CLASSE = {
    saudavel: "Saudável",
    praga: "Com praga",
    doenca: "Com doença",
    nao_milho: "Não é milho",
}

export default function PlantHighlight({ captura, carregando, erro }) {
    if (carregando) {
        return (
            <div className="bg-[#1B2125] border border-[#8A898B]/25 rounded-2xl p-8 flex items-center justify-center flex-1">
                <p className="text-[#8A898B] text-sm">Carregando detalhes da captura…</p>
            </div>
        )
    }

    if (erro) {
        return (
            <div className="bg-[#1B2125] border border-[#8A898B]/25 rounded-2xl p-8 flex items-center justify-center flex-1">
                <p className="text-[#C75050] text-sm">{erro}</p>
            </div>
        )
    }

    if (!captura) return null

    const {
        capturaId,
        timestamp,
        status,
        statusGeral,
        confiancaStatusGeral,
        subtipo,
        probabilidades,
        latitude,
        longitude,
        imagemUrl,
        modeloVersaoBorda,
        confiancaBorda,
        erroDetalhes,
        alertaEmitido,
    } = captura

    const { label, color, bg } = statusInfo(statusGeral)
    const classificada = status === "CLASSIFICADO"

    return (
        <div className="flex flex-col flex-1 min-w-0 gap-0">
            <div className="bg-[#1B2125] border border-[#8A898B]/25 rounded-t-2xl p-4">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-row justify-between items-start flex-wrap gap-2">
                        <div className="flex flex-row gap-2 items-center flex-wrap">
                            <div className="border rounded-full py-0.5 px-3 text-center" style={{ backgroundColor: bg, borderColor: color }}>
                                <p className="font-bold text-[10px]" style={{ color }}>
                                    ● {classificada ? label : LABEL_STATUS_PIPELINE[status] || status}
                                </p>
                            </div>
                            {alertaEmitido && (
                                <div className="border rounded-full py-0.5 px-3 text-center bg-[#C75050]/20 border-[#C75050]">
                                    <p className="font-bold text-[10px] text-[#C75050]">⚠ ALERTA EMITIDO</p>
                                </div>
                            )}
                            <p className="text-[#8A898B] text-sm">capturada às {formatarHora(timestamp)} de {formatarData(timestamp)}</p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <img src={cameraGray} className="w-4 h-4" />
                        <p className="text-white font-bold uppercase">Captura {capturaId}</p>
                    </div>
                    {latitude != null && longitude != null && (
                        <div className="flex flex-row gap-2 text-[#8A898B] text-sm items-center flex-wrap">
                            <img src={locationPin} className="w-4 h-4 shrink-0" />
                            <p>{latitude.toFixed(6)}, {longitude.toFixed(6)}</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-[#1B2125] border border-t-0 border-[#8A898B]/25 p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <img
                        src={imagemUrl || plantPlaceholder}
                        className="w-full sm:w-40 md:w-100 h-auto rounded-2xl object-cover"
                    />
                    <div className="flex flex-col gap-3 w-full">
                        {classificada ? (
                            <>
                                <p className="text-[#8A898B] font-bold">ESTADO DA PLANTA</p>
                                <StatusBar statusGeral={statusGeral} confianca={confiancaStatusGeral} size="lg" />
                                {subtipo && (
                                    <p className="text-[#8A898B] text-sm">Subtipo identificado: <span className="text-white">{subtipo}</span></p>
                                )}

                                {alertaEmitido && (
                                    <div className="bg-[#C75050]/10 border border-[#C75050] rounded-xl p-3 flex flex-col gap-1">
                                        <p className="text-[#C75050] font-bold text-sm">⚠ Alerta — {LABEL_CLASSE[statusGeral] || statusGeral} detectado</p>
                                        <p className="text-[#8A898B] text-xs">
                                            Recomenda-se uma inspeção visual no local pra confirmar a extensão do
                                            problema e decidir se é necessária alguma ação (tratamento, isolamento
                                            da área, etc.).
                                        </p>
                                    </div>
                                )}

                                {statusGeral === "nao_milho" && (
                                    <div className="bg-[#2A2D31] border border-[#8A898B]/40 rounded-xl p-3 flex flex-col gap-1">
                                        <p className="text-[#8A898B] font-bold text-sm">ℹ Esta captura pode ser ignorada</p>
                                        <p className="text-[#8A898B] text-xs">
                                            O modelo não identificou uma planta de milho válida nesta imagem
                                            (câmera bloqueada, enquadramento fora da plantação, ou baixa qualidade).
                                            Não representa um problema real na lavoura.
                                        </p>
                                    </div>
                                )}

                                <p className="text-[#8A898B] text-sm">
                                    Classificação gerada pelo modelo de visão computacional a partir desta captura.
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="text-[#8A898B] font-bold">STATUS DA CLASSIFICAÇÃO</p>
                                <p className="text-white text-sm">
                                    {status === "PENDENTE"
                                        ? "Esta captura ainda não foi classificada pelo modelo."
                                        : "A classificação desta captura falhou."}
                                </p>
                                {status === "ERRO" && erroDetalhes && (
                                    <p className="text-[#C75050] text-xs font-mono break-words">{erroDetalhes}</p>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {classificada && probabilidades && (
                <div className="bg-[#1B2125] border border-t-0 border-[#8A898B]/25 p-4">
                    <div className="flex flex-col gap-2">
                        <p className="text-[#8A898B] font-bold">PROBABILIDADE POR CLASSE</p>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {Object.entries(probabilidades).map(([classe, valor]) => {
                                const info = statusInfo(classe)
                                return (
                                    <VitalCard
                                        key={classe}
                                        label={LABEL_CLASSE[classe] || classe}
                                        subtitle={classe === statusGeral ? "Classe prevista" : ""}
                                        value={Math.round(valor * 100)}
                                        color={info.color}
                                        bgColor={info.bg}
                                        statusLabel={classe === statusGeral ? "PREVISTA" : ""}
                                        icon={
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                            </svg>
                                        }
                                    />
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-[#1A1412] border border-t-0 border-[#8A898B]/25 rounded-b-2xl p-4">
                <div className="flex flex-col gap-1">
                    <p className="text-[#8A898B] font-bold text-xs">DETALHES TÉCNICOS</p>
                    <p className="text-[#8A898B] text-xs">
                        Modelo de borda (Klar): {modeloVersaoBorda || "—"}
                        {confiancaBorda != null && ` · confiança ${Math.round(confiancaBorda * 100)}%`}
                    </p>
                </div>
            </div>
        </div>
    )
}