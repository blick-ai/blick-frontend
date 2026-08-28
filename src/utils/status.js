export const STATUS_CONFIG = {
    saudavel: { label: "SAUDÁVEL", color: "#4CAF50", bg: "#1A2E1A" },
    praga: { label: "COM PRAGA", color: "#D4A34A", bg: "#2A2200" },
    doenca: { label: "DOENÇA", color: "#C75050", bg: "#2E1A1A" },
    nao_milho: { label: "NÃO É MILHO", color: "#8A898B", bg: "#232323" },
}

// Usado especificamente pra alimentar o mapa de calor (ver
// obterPontosMapaCalor em services/api.js) — o filtro do dashboard usa
// os 4 status individuais direto (saudavel/praga/doenca/nao_milho), sem
// agrupamento. Só o mapa de calor junta praga+doenca num unico conjunto
// de pontos, pra nao precisar de 2 mapas separados.
export const GRUPOS_STATUS_GERAL = {
    alerta: { label: "PRAGA / DOENÇA", color: "#D4A34A", valores: ["praga", "doenca"] },
}

const STATUS_PADRAO = { label: "PENDENTE", color: "#8A898B", bg: "#232323" }

export function statusInfo(statusGeral) {
    return STATUS_CONFIG[statusGeral] || STATUS_PADRAO
}

export function paraPercentual(confianca) {
    if (confianca === null || confianca === undefined) return null
    return Math.round(confianca * 100)
}

export function formatarHora(timestampIso) {
    if (!timestampIso) return "—"
    const data = new Date(timestampIso)
    if (Number.isNaN(data.getTime())) return "—"
    return data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
}

export function formatarData(timestampIso) {
    if (!timestampIso) return "—"
    const data = new Date(timestampIso)
    if (Number.isNaN(data.getTime())) return "—"
    return data.toLocaleDateString("pt-BR")
}