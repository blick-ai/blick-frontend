import { useEffect, useState } from "react"
import Sidebar from "../components/sidebar"
import PhotoList from "../components/photoList"
import PhotoHeader from "../components/photoHeader"
import PlantHighlight from "../components/plantHighlight"
import FilterPanel from "../components/filterPanel"
import Pagination from "../components/pagination"
import SessaoExpiradaModal from "../components/sessaoExpiradaModal"
import { listarCapturas, obterCaptura, obterResumoGeral, SessaoExpiradaError } from "../services/api"

const TAMANHO_PAGINA = 8

const FILTROS_VAZIOS = { status: "", statusGeral: "", dataInicio: "", dataFim: "" }

export default function Dashboard() {
    const [filtros, setFiltros] = useState(FILTROS_VAZIOS)
    const [pagina, setPagina] = useState(1)
    const [busca, setBusca] = useState("")

    const [capturas, setCapturas] = useState([])
    const [total, setTotal] = useState(0)
    const [totalPaginas, setTotalPaginas] = useState(0)
    const [carregandoLista, setCarregandoLista] = useState(true)
    const [erroLista, setErroLista] = useState("")

    const [selecionada, setSelecionada] = useState(null)
    const [detalhe, setDetalhe] = useState(null)
    const [carregandoDetalhe, setCarregandoDetalhe] = useState(false)
    const [erroDetalhe, setErroDetalhe] = useState("")

    const [sessaoExpirada, setSessaoExpirada] = useState(false)

    const [resumoGeral, setResumoGeral] = useState(null)
    const [carregandoResumo, setCarregandoResumo] = useState(true)

    const [refreshTick, setRefreshTick] = useState(0)

    // busca a lista sempre que filtro ou pagina mudam — lista de mais
    // recentes primeiro por padrao, ja que a API ordena assim sem
    // precisar de nenhum parametro extra
    useEffect(() => {
        let cancelado = false

        async function carregar() {
            setCarregandoLista(true)
            setErroLista("")
            try {
                const resultado = await listarCapturas({
                    pagina,
                    tamanhoPagina: TAMANHO_PAGINA,
                    status: filtros.status || undefined,
                    statusGeral: filtros.statusGeral || undefined,
                    dataInicio: filtros.dataInicio || undefined,
                    dataFim: filtros.dataFim || undefined,
                })
                if (cancelado) return
                setCapturas(resultado.capturas)
                setTotal(resultado.total)
                setTotalPaginas(resultado.totalPaginas)
            } catch (erro) {
                if (cancelado) return
                if (erro instanceof SessaoExpiradaError) {
                    setSessaoExpirada(true)
                    return
                }
                setErroLista(erro.message || "Não foi possível carregar as capturas.")
            } finally {
                if (!cancelado) setCarregandoLista(false)
            }
        }

        carregar()
        return () => { cancelado = true }
    }, [filtros, pagina, refreshTick])

    // resumo geral (sidebar) — busca uma vez ao montar, independente dos
    // filtros/pagina da lista principal
    useEffect(() => {
        let cancelado = false

        async function carregarResumo() {
            setCarregandoResumo(true)
            try {
                const resultado = await obterResumoGeral()
                if (cancelado) return
                setResumoGeral(resultado)
            } catch (erro) {
                if (cancelado) return
                if (erro instanceof SessaoExpiradaError) {
                    setSessaoExpirada(true)
                }
                // erro no resumo lateral nao e critico o bastante pra
                // travar o resto do dashboard — so fica sem esse card
            } finally {
                if (!cancelado) setCarregandoResumo(false)
            }
        }

        carregarResumo()
        return () => { cancelado = true }
    }, [])

    // busca o detalhe SO quando o usuario clica numa captura — nunca em
    // lote, nunca antecipado
    useEffect(() => {
        if (!selecionada) {
            setDetalhe(null)
            setErroDetalhe("")
            return
        }

        let cancelado = false

        async function carregarDetalhe() {
            setCarregandoDetalhe(true)
            setErroDetalhe("")
            try {
                const resultado = await obterCaptura(selecionada.capturaId, selecionada.timestamp)
                if (cancelado) return
                setDetalhe(resultado)
            } catch (erro) {
                if (cancelado) return
                if (erro instanceof SessaoExpiradaError) {
                    setSessaoExpirada(true)
                    return
                }
                setErroDetalhe(erro.message || "Não foi possível carregar o detalhe desta captura.")
            } finally {
                if (!cancelado) setCarregandoDetalhe(false)
            }
        }

        carregarDetalhe()
        return () => { cancelado = true }
    }, [selecionada])

    function handleFiltrosChange(novosFiltros) {
        setFiltros(novosFiltros)
        setPagina(1) // volta pra primeira pagina sempre que o filtro muda
    }

    function handleLimparFiltros() {
        setFiltros(FILTROS_VAZIOS)
        setPagina(1)
    }

    const capturasFiltradas = busca
        ? capturas.filter((c) => c.capturaId.toLowerCase().includes(busca.toLowerCase()))
        : capturas

    return (
        <div className="bg-[#16191C] flex flex-row min-h-screen items-stretch">
            {sessaoExpirada && <SessaoExpiradaModal />}
            <Sidebar resumo={resumoGeral} carregandoResumo={carregandoResumo} />
            <div className="flex flex-col gap-4 p-4 md:p-6 flex-1 min-w-0 pt-20 md:pt-6">
                <PhotoHeader
                    total={total}
                    busca={busca}
                    onBuscaChange={setBusca}
                    filtroSlot={
                        <FilterPanel filtros={filtros} onChange={handleFiltrosChange} onLimpar={handleLimparFiltros} />
                    }
                />
                <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
                    <div className={`flex flex-col gap-3 min-w-0 ${selecionada ? "w-full lg:w-1/2" : "w-full"}`}>
                        <PhotoList
                            capturas={capturasFiltradas}
                            selectedId={selecionada?.capturaId}
                            onSelect={setSelecionada}
                            carregando={carregandoLista}
                            erro={erroLista}
                        />
                        <Pagination paginaAtual={pagina} totalPaginas={totalPaginas} onChange={setPagina} />
                    </div>
                    {selecionada && (
                        <div className="flex flex-col lg:w-1/2 lg:shrink-0 overflow-y-auto">
                            <PlantHighlight
                                captura={detalhe}
                                carregando={carregandoDetalhe}
                                erro={erroDetalhe}
                                onExcluida={() => {
                                    setSelecionada(null)
                                    setRefreshTick((t) => t + 1)
                                }}
                                onSessaoExpirada={() => setSessaoExpirada(true)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}