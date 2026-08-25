import { useState } from "react"
import { enviarCaptura, SessaoExpiradaError } from "../services/api"
import { useToast } from "../contexts/toastContext"

function paraDiaMesAno(dataISO) {
    // input type="date" devolve "YYYY-MM-DD" — o backend espera "DD/MM/YYYY"
    const [ano, mes, dia] = dataISO.split("-")
    return `${dia}/${mes}/${ano}`
}

function arquivoParaBase64(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader()
        leitor.onload = () => {
            // remove o prefixo "data:image/jpeg;base64," — o backend espera so o base64 puro
            const base64 = leitor.result.split(",")[1] || ""
            resolve(base64)
        }
        leitor.onerror = () => reject(new Error("Não foi possível ler o arquivo de imagem."))
        leitor.readAsDataURL(arquivo)
    })
}

export default function UploadModal({ onFechar, onSucesso, onSessaoExpirada }) {
    const { mostrarToast } = useToast()

    const [data, setData] = useState("")
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [arquivo, setArquivo] = useState(null)
    const [nomeArquivo, setNomeArquivo] = useState("")
    const [enviando, setEnviando] = useState(false)

    function obterLocalizacaoAtual() {
        if (!navigator.geolocation) {
            mostrarToast("aviso", "Seu navegador não suporta localização automática.")
            return
        }
        navigator.geolocation.getCurrentPosition(
            (posicao) => {
                setLatitude(String(posicao.coords.latitude))
                setLongitude(String(posicao.coords.longitude))
            },
            () => mostrarToast("aviso", "Não foi possível obter sua localização — preencha manualmente.")
        )
    }

    function validar() {
        if (!data) return "A data da captura é obrigatória."
        if (latitude === "" || Number.isNaN(Number(latitude))) return "A latitude é obrigatória."
        if (longitude === "" || Number.isNaN(Number(longitude))) return "A longitude é obrigatória."
        if (!arquivo) return "Selecione uma imagem da planta."
        return null
    }

    async function handleEnviar(evento) {
        evento.preventDefault()

        const erroValidacao = validar()
        if (erroValidacao) {
            mostrarToast("aviso", erroValidacao)
            return
        }

        setEnviando(true)
        try {
            const imagemBase64 = await arquivoParaBase64(arquivo)
            await enviarCaptura({
                diaMesAno: paraDiaMesAno(data),
                latitude: Number(latitude),
                longitude: Number(longitude),
                imagemBase64,
            })
            mostrarToast("sucesso", "Captura adicionada com sucesso")
            onSucesso?.()
            onFechar()
        } catch (erro) {
            if (erro instanceof SessaoExpiradaError) {
                onSessaoExpirada?.()
                onFechar()
                return
            }
            mostrarToast("erro", erro.message || "Não foi possível enviar a captura.")
        } finally {
            setEnviando(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1B2125] border border-[#8A898B]/25 rounded-2xl p-6 max-w-md w-full flex flex-col gap-4">
                <div className="flex flex-row justify-between items-center">
                    <p className="text-white font-bold text-lg">Adicionar captura</p>
                    <button
                        type="button"
                        onClick={onFechar}
                        className="text-[#8A898B] hover:text-white"
                        aria-label="Fechar"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleEnviar} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="upload-data" className="text-[#8A898B] text-xs font-bold uppercase">Data da captura *</label>
                        <input
                            id="upload-data"
                            type="date"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            className="bg-[#16191C] border border-[#8A898B]/25 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-[#4A9B9A]"
                        />
                    </div>

                    <div className="flex flex-row gap-3">
                        <div className="flex flex-col gap-1 flex-1">
                            <label htmlFor="upload-latitude" className="text-[#8A898B] text-xs font-bold uppercase">Latitude *</label>
                            <input
                                id="upload-latitude"
                                type="text"
                                inputMode="decimal"
                                placeholder="-23.6478"
                                value={latitude}
                                onChange={(e) => setLatitude(e.target.value)}
                                className="bg-[#16191C] border border-[#8A898B]/25 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-[#4A9B9A]"
                            />
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                            <label htmlFor="upload-longitude" className="text-[#8A898B] text-xs font-bold uppercase">Longitude *</label>
                            <input
                                id="upload-longitude"
                                type="text"
                                inputMode="decimal"
                                placeholder="-46.5731"
                                value={longitude}
                                onChange={(e) => setLongitude(e.target.value)}
                                className="bg-[#16191C] border border-[#8A898B]/25 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-[#4A9B9A]"
                            />
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={obterLocalizacaoAtual}
                        className="text-[#4A9B9A] text-xs font-bold text-left hover:underline w-fit"
                    >
                        📍 Usar minha localização atual
                    </button>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="upload-imagem" className="text-[#8A898B] text-xs font-bold uppercase">Imagem da planta *</label>
                        <label htmlFor="upload-imagem" className="bg-[#16191C] border border-dashed border-[#8A898B]/40 rounded-lg px-3 py-4 text-center text-sm cursor-pointer hover:border-[#4A9B9A] transition-colors">
                            <span className={nomeArquivo ? "text-white" : "text-[#8A898B]"}>
                                {nomeArquivo || "Clique para escolher uma foto"}
                            </span>
                            <input
                                id="upload-imagem"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    const arquivoSelecionado = e.target.files?.[0] || null
                                    setArquivo(arquivoSelecionado)
                                    setNomeArquivo(arquivoSelecionado?.name || "")
                                }}
                            />
                        </label>
                    </div>

                    <div className="flex flex-row gap-3 justify-end pt-2">
                        <button
                            type="button"
                            onClick={onFechar}
                            disabled={enviando}
                            className="text-[#8A898B] hover:text-white text-sm font-bold px-4 py-2 disabled:opacity-40"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={enviando}
                            className="bg-[#4A9B9A] hover:bg-[#3d8483] text-white text-sm font-bold rounded-xl px-4 py-2 disabled:opacity-60"
                        >
                            {enviando ? "Enviando…" : "Adicionar captura"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}