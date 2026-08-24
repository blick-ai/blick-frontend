const API_URL = import.meta.env.VITE_API_URL
export class SessaoExpiradaError extends Error {
    constructor() {
        super("Sessão expirada")
        this.name = "SessaoExpiradaError"
    }
}

import { GRUPOS_STATUS_GERAL } from "../utils/status"
const CACHE_PREFIXO = "blick_cache_capturas:"
const CACHE_TTL_MS = 60 * 1000

function chaveCache(params) {
    return CACHE_PREFIXO + JSON.stringify(params)
}

function lerCache(params) {
    try {
        const bruto = localStorage.getItem(chaveCache(params))
        if (!bruto) return null
        const { timestamp, dados } = JSON.parse(bruto)
        if (Date.now() - timestamp > CACHE_TTL_MS) return null
        return dados
    } catch {
        return null
    }
}

function salvarCache(params, dados) {
    try {
        localStorage.setItem(chaveCache(params), JSON.stringify({ timestamp: Date.now(), dados }))
    } catch {
        // localStorage pode falhar (modo privado, cota cheia) — nunca
        // deve quebrar a aplicacao por causa disso
    }
}

function limparCacheListagem() {
    try {
        const chaves = Object.keys(localStorage).filter((k) => k.startsWith(CACHE_PREFIXO))
        chaves.forEach((k) => localStorage.removeItem(k))
    } catch {
        // idem — falha ao limpar cache nao pode quebrar a aplicacao
    }
}

function getToken() {
    return localStorage.getItem("access_token")
}

async function apiFetch(path, options = {}) {
    const token = getToken()

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        },
    })

    if (response.status === 401) {
        throw new SessaoExpiradaError()
    }

    if (!response.ok) {
        const erro = await response.json().catch(() => ({}))
        throw new Error(erro?.detail || `Erro ${response.status} ao consultar a API`)
    }

    return response.json()
}

function campo(objeto, ...nomes) {
    for (const nome of nomes) {
        if (objeto[nome] !== undefined) return objeto[nome]
    }
    return undefined
}

function normalizarResumo(item) {
    return {
        capturaId: campo(item, "capturaId", "captura_id"),
        timestamp: item.timestamp,
        status: item.status,
        statusGeral: campo(item, "statusGeral", "status_geral"),
        confiancaStatusGeral: campo(item, "confiancaStatusGeral", "confianca_status_geral"),
        latitude: item.latitude,
        longitude: item.longitude,
        alertaEmitido: campo(item, "alertaEmitido", "alerta_emitido"),
        imagemUrl: campo(item, "imagemUrl", "imagem_url"),
    }
}

function normalizarListaResposta(resposta) {
    return {
        capturas: (resposta.capturas || []).map(normalizarResumo),
        pagina: resposta.pagina,
        tamanhoPagina: campo(resposta, "tamanhoPagina", "tamanho_pagina"),
        total: resposta.total,
        totalPaginas: campo(resposta, "totalPaginas", "total_paginas"),
    }
}

function normalizarDetalhe(item) {
    return {
        capturaId: campo(item, "capturaId", "captura_id"),
        plantacaoId: campo(item, "plantacaoId", "plantacao_id"),
        carrinhoId: campo(item, "carrinhoId", "carrinho_id"),
        clienteId: campo(item, "clienteId", "cliente_id"),
        timestamp: item.timestamp,
        status: item.status,
        latitude: item.latitude,
        longitude: item.longitude,
        statusGeral: campo(item, "statusGeral", "status_geral"),
        confiancaStatusGeral: campo(item, "confiancaStatusGeral", "confianca_status_geral"),
        subtipo: item.subtipo,
        confiancaSubtipo: campo(item, "confiancaSubtipo", "confianca_subtipo"),
        probabilidades: item.probabilidades,
        modeloVersaoBorda: campo(item, "modeloVersaoBorda", "modelo_versao_borda"),
        confiancaBorda: campo(item, "confiancaBorda", "confianca_borda"),
        imagemUrl: campo(item, "imagemUrl", "imagem_url"),
        statusHistory: campo(item, "statusHistory", "status_history") || [],
        erroDetalhes: campo(item, "erroDetalhes", "erro_detalhes"),
        alertaEmitido: campo(item, "alertaEmitido", "alerta_emitido"),
        alertaEmitidoEm: campo(item, "alertaEmitidoEm", "alerta_emitido_em"),
    }
}

const STATUS_SAUDE_MILHO = ["saudavel", "praga", "doenca"]

export async function listarCapturas({
    pagina = 1,
    tamanhoPagina = 8,
    status,
    statusGeral,
    dataInicio,
    dataFim,
    plantacaoId,
} = {}) {
    if (!status && !statusGeral) {
        return listarCapturasMultiStatus({
            pagina, tamanhoPagina, dataInicio, dataFim, plantacaoId, valores: STATUS_SAUDE_MILHO,
        })
    }

    const chaveParams = { pagina, tamanhoPagina, status, statusGeral, dataInicio, dataFim, plantacaoId }

    const params = new URLSearchParams()
    params.set("pagina", String(pagina))
    params.set("tamanhoPagina", String(tamanhoPagina))
    if (status) params.set("status", status)
    if (statusGeral) params.set("statusGeral", statusGeral)
    if (dataInicio) params.set("dataInicio", dataInicio)
    if (dataFim) params.set("dataFim", dataFim)
    if (plantacaoId) params.set("plantacaoId", plantacaoId)

    const resposta = await apiFetch(`/capturas?${params.toString()}`)
    const resultado = normalizarListaResposta(resposta)
    salvarCache(chaveParams, resultado)
    return resultado
}

async function listarCapturasMultiStatus({ pagina, tamanhoPagina, dataInicio, dataFim, plantacaoId, valores }) {
    const chaveParams = { pagina, tamanhoPagina, status: undefined, statusGeral: undefined, dataInicio, dataFim, plantacaoId }
    const itensNecessarios = pagina * tamanhoPagina

    const respostas = await Promise.all(
        valores.map((statusGeral) =>
            listarCapturas({ statusGeral, tamanhoPagina: itensNecessarios, pagina: 1, dataInicio, dataFim, plantacaoId })
        )
    )

    const todasCapturas = respostas.flatMap((r) => r.capturas)
    todasCapturas.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

    const total = respostas.reduce((soma, r) => soma + r.total, 0)
    const totalPaginas = Math.max(1, Math.ceil(total / tamanhoPagina))
    const inicio = (pagina - 1) * tamanhoPagina
    const capturas = todasCapturas.slice(inicio, inicio + tamanhoPagina)

    const resultado = { capturas, pagina, tamanhoPagina, total, totalPaginas }
    salvarCache(chaveParams, resultado)
    return resultado
}

export function obterCapturasDoCache({
    pagina = 1,
    tamanhoPagina = 8,
    status,
    statusGeral,
    dataInicio,
    dataFim,
    plantacaoId,
} = {}) {
    return lerCache({ pagina, tamanhoPagina, status, statusGeral, dataInicio, dataFim, plantacaoId })
}

export async function obterCaptura(capturaId, timestamp, plantacaoId) {
    const params = new URLSearchParams({ timestamp })
    if (plantacaoId) params.set("plantacao_id", plantacaoId)
    const resposta = await apiFetch(`/capturas/${capturaId}?${params.toString()}`)
    return normalizarDetalhe(resposta)
}

export async function obterResumoGeral(plantacaoId) {
    const [saudavel, praga, doenca, naoMilho, erro] = await Promise.all([
        listarCapturas({ statusGeral: "saudavel", tamanhoPagina: 1, plantacaoId }),
        listarCapturas({ statusGeral: "praga", tamanhoPagina: 1, plantacaoId }),
        listarCapturas({ statusGeral: "doenca", tamanhoPagina: 1, plantacaoId }),
        listarCapturas({ statusGeral: "nao_milho", tamanhoPagina: 1, plantacaoId }),
        listarCapturas({ status: "ERRO", tamanhoPagina: 1, plantacaoId }),
    ])

    const totalPlantasClassificadas = saudavel.total + praga.total + doenca.total

    return {
        saudavel: saudavel.total,
        praga: praga.total,
        doenca: doenca.total,
        naoMilho: naoMilho.total,
        impossivel: erro.total,
        total: totalPlantasClassificadas,
    }
}

export async function excluirCaptura(capturaId, timestamp, plantacaoId) {
    const params = new URLSearchParams({ timestamp })
    if (plantacaoId) params.set("plantacao_id", plantacaoId)
    const resultado = await apiFetch(`/capturas/${capturaId}?${params.toString()}`, { method: "DELETE" })
    limparCacheListagem()
    return resultado
}

export async function obterPontosMapaCalor(plantacaoId) {
    async function buscarTodasAsCapturas(statusGeral) {
        const primeira = await listarCapturas({ statusGeral, tamanhoPagina: 100, pagina: 1, plantacaoId })
        const todas = [...primeira.capturas]
        for (let pagina = 2; pagina <= primeira.totalPaginas; pagina++) {
            const resultado = await listarCapturas({ statusGeral, tamanhoPagina: 100, pagina, plantacaoId })
            todas.push(...resultado.capturas)
        }
        return todas
    }

    const resultadosPorStatus = await Promise.all(
        GRUPOS_STATUS_GERAL.alerta.valores.map(buscarTodasAsCapturas)
    )

    return resultadosPorStatus.flat()
        .filter((c) => c.latitude != null && c.longitude != null)
        .map((c) => ({
            capturaId: c.capturaId,
            latitude: c.latitude,
            longitude: c.longitude,
            statusGeral: c.statusGeral,
            confiancaStatusGeral: c.confiancaStatusGeral,
        }))
}

export async function enviarCaptura({ diaMesAno, latitude, longitude, imagemBase64 }) {
    const resposta = await apiFetch("/capturas", {
        method: "POST",
        body: JSON.stringify({
            dia_mes_ano: diaMesAno,
            latitude,
            longitude,
            imagem_base64: imagemBase64,
        }),
    })
    limparCacheListagem() 
    return resposta
}

export { API_URL }