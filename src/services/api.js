const API_URL = import.meta.env.VITE_API_URL

/** Erro especifico pra token expirado/invalido (401) — o dashboard usa
 * isso pra distinguir "sessao expirou" de qualquer outro erro de API e
 * mostrar o modal de sessao expirada em vez da mensagem de erro comum. */
export class SessaoExpiradaError extends Error {
    constructor() {
        super("Sessão expirada")
        this.name = "SessaoExpiradaError"
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

/**
 * Le o primeiro nome de campo que existir no objeto, testando na ordem
 * dada. Existe pra tolerar o backend respondendo ora em camelCase, ora
 * em snake_case (durante deploys onde front/back ficam momentaneamente
 * em versoes diferentes) — sem isso, um deploy dessincronizado faz a
 * tela inteira parecer quebrada mesmo com os dados certos chegando.
 */
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
        // as chaves DE DENTRO de probabilidades (saudavel/praga/doenca/nao_milho)
        // sao nomes de classe, nao nomes de campo — nunca mudam de formato,
        // entao esse objeto passa direto, sem normalizar as chaves internas
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

/**
 * Lista capturas (endpoint geral) — mais recentes primeiro por padrão.
 * Pensado pra alimentar a lista/dashboard, sem trazer o detalhe completo.
 */
export async function listarCapturas({
    pagina = 1,
    tamanhoPagina = 8,
    status,
    statusGeral,
    dataInicio,
    dataFim,
    plantacaoId,
} = {}) {
    const params = new URLSearchParams()
    params.set("pagina", String(pagina))
    params.set("tamanhoPagina", String(tamanhoPagina))
    if (status) params.set("status", status)
    if (statusGeral) params.set("statusGeral", statusGeral)
    if (dataInicio) params.set("dataInicio", dataInicio)
    if (dataFim) params.set("dataFim", dataFim)
    if (plantacaoId) params.set("plantacaoId", plantacaoId)

    const resposta = await apiFetch(`/capturas?${params.toString()}`)
    return normalizarListaResposta(resposta)
}

export async function obterCaptura(capturaId, timestamp, plantacaoId) {
    const params = new URLSearchParams({ timestamp })
    if (plantacaoId) params.set("plantacao_id", plantacaoId)
    const resposta = await apiFetch(`/capturas/${capturaId}?${params.toString()}`)
    return normalizarDetalhe(resposta)
}

export async function obterResumoGeral(plantacaoId) {
    const [saudavel, praga, doenca, naoMilho, erro, geral] = await Promise.all([
        listarCapturas({ statusGeral: "saudavel", tamanhoPagina: 1, plantacaoId }),
        listarCapturas({ statusGeral: "praga", tamanhoPagina: 1, plantacaoId }),
        listarCapturas({ statusGeral: "doenca", tamanhoPagina: 1, plantacaoId }),
        listarCapturas({ statusGeral: "nao_milho", tamanhoPagina: 1, plantacaoId }),
        listarCapturas({ status: "ERRO", tamanhoPagina: 1, plantacaoId }),
        listarCapturas({ tamanhoPagina: 1, plantacaoId }),
    ])

    return {
        saudavel: saudavel.total,
        praga: praga.total,
        doenca: doenca.total,
        naoMilho: naoMilho.total,
        impossivel: erro.total,
        total: geral.total,
    }
}

export { API_URL }