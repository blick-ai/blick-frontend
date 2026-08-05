import { render, screen, waitFor } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import { MemoryRouter } from "react-router"
import Dashboard from "../pages/dashboard"

beforeEach(() => {
    localStorage.setItem("access_token", "token-expirado")
})

afterEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
})

describe("Sessão expirada", () => {
    test("mostra o modal de sessão expirada quando a API responde 401", async () => {
        globalThis.fetch = vi.fn(() =>
            Promise.resolve({
                ok: false,
                status: 401,
                json: () => Promise.resolve({ detail: "Not authenticated" }),
            })
        )

        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        )

        await waitFor(() => {
            expect(screen.getByText("Sessão expirada")).toBeDefined()
        })

        expect(screen.getByText(/Fazer login novamente/i)).toBeDefined()
    })
})