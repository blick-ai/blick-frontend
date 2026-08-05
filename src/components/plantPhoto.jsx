import StatusBar from "./statusBar"
import cameraGray from "../assets/images/camera-gray.png"
import time from "../assets/images/time.png"
import { formatarHora, formatarData } from "../utils/status"

const LABEL_STATUS_PIPELINE = {
    PENDENTE: "Pendente",
    CLASSIFICADO: "Classificada",
    ERRO: "Erro na classificação",
}

export default function PlantPhoto({
    capturaId,
    timestamp,
    status,
    statusGeral,
    confiancaStatusGeral,
    latitude,
    longitude,
    alertaEmitido,
    selected,
    onSelect,
}) {
    const pendenteOuErro = status !== "CLASSIFICADO"

    return (
        <div
            onClick={onSelect}
            className={`bg-[#1B2125] border flex flex-row rounded-2xl p-3 sm:p-4 gap-3 sm:gap-4 items-center w-full cursor-pointer transition-colors duration-150 ${selected ? "border-[#4A9B9A]" : "border-[#8A898B]/25 hover:border-white"}`}
        >
            <div className="flex flex-col gap-1 flex-1 min-w-0">
                <div className="flex flex-row justify-between items-center gap-2">
                    <div className="flex flex-row gap-2 items-center min-w-0">
                        <img src={cameraGray} className="w-4 h-4 shrink-0" />
                        <p className="text-white font-bold uppercase truncate">{capturaId}</p>
                        {alertaEmitido && (
                            <span className="bg-[#C75050]/20 text-[#C75050] text-[9px] font-bold rounded-full px-2 py-0.5 shrink-0">
                                ALERTA
                            </span>
                        )}
                    </div>
                    <div className="flex flex-row items-center gap-2 shrink-0">
                        <img src={time} className="w-3 h-3" />
                        <p className="text-[#8A898B] text-sm">{formatarHora(timestamp)}</p>
                    </div>
                </div>
                <div className="flex flex-row flex-wrap gap-x-2 gap-y-0.5 text-[#8A898B] text-xs sm:text-sm">
                    <p>{formatarData(timestamp)}</p>
                    {latitude != null && longitude != null && (
                        <>
                            <p>●</p>
                            <p>{latitude.toFixed(4)}, {longitude.toFixed(4)}</p>
                        </>
                    )}
                </div>
                <div className="flex flex-row gap-3 items-center">
                    {pendenteOuErro ? (
                        <p className="text-[#8A898B] text-xs font-bold flex-1">
                            {LABEL_STATUS_PIPELINE[status] || status}
                        </p>
                    ) : (
                        <StatusBar statusGeral={statusGeral} confianca={confiancaStatusGeral} />
                    )}
                    <p className="text-[#8A898B] text-2xl font-bold shrink-0">&gt;</p>
                </div>
            </div>
        </div>
    )
}