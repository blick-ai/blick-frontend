import { render, screen } from "@testing-library/react"
import { describe, expect, test, vi } from "vitest"
import Pagination from "../components/pagination"

describe("Pagination", () => {
    test("na pagina 5, com 137 paginas, ja mostra 6 e 7 na mesma janela", () => {
        render(<Pagination paginaAtual={5} totalPaginas={137} onChange={vi.fn()} />)

        expect(screen.getByText("6")).toBeDefined()
        expect(screen.getByText("7")).toBeDefined()
    })

    test("no inicio (pagina 1), mostra 1 a 5 sem reticencias antes", () => {
        render(<Pagination paginaAtual={1} totalPaginas={20} onChange={vi.fn()} />)

        expect(screen.getByText("1")).toBeDefined()
        expect(screen.getByText("5")).toBeDefined()
        expect(screen.queryAllByText("…").length).toBe(1) // só depois, não antes
    })

    test("no fim (ultima pagina), mostra os ultimos 5 numeros", () => {
        render(<Pagination paginaAtual={137} totalPaginas={137} onChange={vi.fn()} />)

        expect(screen.getByText("133")).toBeDefined()
        expect(screen.getByText("137")).toBeDefined()
    })

    test("nao renderiza nada quando so tem 1 pagina", () => {
        const { container } = render(<Pagination paginaAtual={1} totalPaginas={1} onChange={vi.fn()} />)
        expect(container.firstChild).toBeNull()
    })
})