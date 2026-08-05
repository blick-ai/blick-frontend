import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import { MemoryRouter } from "react-router"
import Dashboard from "../pages/dashboard"

const RESPOSTA_LISTA = {
    capturas: [
        {
            capturaId: "20260801143755-32204d9f",
            timestamp: "2026-08-01T14:37:55Z",
            status: "CLASSIFICADO",
            statusGeral: "doenca",
            confiancaStatusGeral: 0.87,
            latitude: -23.5,
            longitude: -46.6,
            alertaEmitido: true,
        },
    ],
    pagina: 1,
    tamanhoPagina: 8,
    total: 1,
    totalPaginas: 1,
}

const RESPOSTA_DETALHE = {
    capturaId: "20260801143755-32204d9f",
    plantacaoId: "plantacao-mock-001",
    carrinhoId: "carrinho-mock-001",
    clienteId: "cliente-1",
    timestamp: "2026-08-01T14:37:55Z",
    status: "CLASSIFICADO",
    latitude: -23.5,
    longitude: -46.6,
    statusGeral: "doenca",
    confiancaStatusGeral: 0.87,
    subtipo: null,
    confiancaSubtipo: null,
    probabilidades: { saudavel: 0.05, praga: 0.08, doenca: 0.87, nao_milho: 0.0 },
    modeloVersaoBorda: "plants_v1.tflite",
    confiancaBorda: 0.97,
    imagemUrl: "https://fake-s3/foto.jpg",
    statusHistory: [],
    erroDetalhes: null,
    alertaEmitido: true,
    alertaEmitidoEm: "2026-08-01T14:38:00Z",
}

beforeEach(() => {
    localStorage.setItem("access_token", "token-fake")

    globalThis.fetch = vi.fn((url) => {
        if (url.includes("/capturas/") && url.includes("timestamp=")) {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(RESPOSTA_DETALHE),
            })
        }
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(RESPOSTA_LISTA),
        })
    })
})

afterEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
})

describe("Dashboard", () => {
    test("carrega a lista de capturas ao montar, sem buscar detalhe nenhum ainda", async () => {
        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        )

        await waitFor(() => {
            expect(screen.getByText(/20260801143755-32204d9f/i)).toBeDefined()
        })

        // so a chamada de lista deve ter acontecido — nenhuma de detalhe ainda
        const chamadasDeDetalhe = globalThis.fetch.mock.calls.filter(([url]) => url.includes("timestamp="))
        expect(chamadasDeDetalhe.length).toBe(0)
    })

    test("busca o detalhe somente quando o usuario clica na captura", async () => {
        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        )

        const item = await screen.findByText(/20260801143755-32204d9f/i)
        fireEvent.click(item)

        await waitFor(() => {
            const chamadasDeDetalhe = globalThis.fetch.mock.calls.filter(([url]) => url.includes("timestamp="))
            expect(chamadasDeDetalhe.length).toBe(1)
        })

        await waitFor(() => {
            expect(screen.getAllByText("87%").length).toBeGreaterThan(0)
        })
    })
})