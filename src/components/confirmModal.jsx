export default function ConfirmModal({
    titulo,
    mensagem,
    textoConfirmar = "Confirmar",
    textoCancelar = "Cancelar",
    perigoso = false,
    carregando = false,
    ocultarCancelar = false,
    onConfirmar,
    onCancelar,
}) {
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-[#1B2125] border border-[#8A898B]/25 rounded-2xl p-6 max-w-sm w-full mx-4 flex flex-col gap-4">
                <p className="text-white font-bold text-lg">{titulo}</p>
                <p className="text-[#8A898B] text-sm">{mensagem}</p>
                <div className="flex flex-row gap-3 justify-end">
                    {!ocultarCancelar && (
                        <button
                            type="button"
                            onClick={onCancelar}
                            disabled={carregando}
                            className="text-[#8A898B] hover:text-white text-sm font-bold px-4 py-2 disabled:opacity-40 transition-colors"
                        >
                            {textoCancelar}
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={onConfirmar}
                        disabled={carregando}
                        className={`rounded-xl px-4 py-2 text-sm font-bold text-white transition-colors disabled:opacity-60 ${
                            perigoso ? "bg-[#C75050] hover:bg-[#a83f3f]" : "bg-[#4A9B9A] hover:bg-[#3d8483]"
                        }`}
                    >
                        {carregando ? "Aguarde…" : textoConfirmar}
                    </button>
                </div>
            </div>
        </div>
    )
}