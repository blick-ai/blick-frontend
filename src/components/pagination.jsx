const TAMANHO_JANELA = 5

export default function Pagination({ paginaAtual, totalPaginas, onChange }) {
    if (!totalPaginas || totalPaginas <= 1) return null

    // janela desliza junto com a pagina atual, tentando deixar ela no meio
    // — assim, ao clicar em "5", os vizinhos (6, 7...) ja aparecem na
    // mesma janela, sem precisar de outro clique pra "revelar" o proximo
    // bloco
    let inicio = Math.max(1, paginaAtual - Math.floor(TAMANHO_JANELA / 2))
    let fim = inicio + TAMANHO_JANELA - 1
    if (fim > totalPaginas) {
        fim = totalPaginas
        inicio = Math.max(1, fim - TAMANHO_JANELA + 1)
    }

    const paginas = []
    for (let p = inicio; p <= fim; p++) paginas.push(p)

    const botaoBase =
        "min-w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center transition-colors"
    const botaoInativo = `${botaoBase} text-[#8A898B] hover:text-white hover:bg-[#1B2125]`
    const botaoAtivo = `${botaoBase} bg-[#4A9B9A] text-white`

    return (
        <div className="flex flex-row items-center justify-center gap-1 flex-wrap">
            <button
                type="button"
                disabled={paginaAtual <= 1}
                onClick={() => onChange(paginaAtual - 1)}
                className={`${botaoBase} text-[#8A898B] hover:text-white disabled:opacity-30 disabled:hover:text-[#8A898B]`}
            >
                ‹
            </button>

            {inicio > 1 && (
                <>
                    <button type="button" onClick={() => onChange(1)} className={botaoInativo}>
                        1
                    </button>
                    <span className="text-[#8A898B] px-1">…</span>
                </>
            )}

            {paginas.map((p) => (
                <button
                    key={p}
                    type="button"
                    onClick={() => onChange(p)}
                    className={p === paginaAtual ? botaoAtivo : botaoInativo}
                >
                    {p}
                </button>
            ))}

            {fim < totalPaginas && (
                <>
                    <span className="text-[#8A898B] px-1">…</span>
                    <button
                        type="button"
                        onClick={() => onChange(totalPaginas)}
                        className={botaoInativo}
                    >
                        {totalPaginas}
                    </button>
                </>
            )}

            <button
                type="button"
                disabled={paginaAtual >= totalPaginas}
                onClick={() => onChange(paginaAtual + 1)}
                className={`${botaoBase} text-[#8A898B] hover:text-white disabled:opacity-30 disabled:hover:text-[#8A898B]`}
            >
                ›
            </button>
        </div>
    )
}