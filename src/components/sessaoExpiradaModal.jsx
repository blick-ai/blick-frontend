import { useNavigate } from "react-router"

export default function SessaoExpiradaModal() {
    const navigate = useNavigate()

    function handleRelogar() {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        localStorage.removeItem("id_token")
        navigate("/login", { replace: true })
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-[#1B2125] border border-[#8A898B]/25 rounded-2xl p-6 max-w-sm w-full mx-4 flex flex-col gap-4">
                <p className="text-white font-bold text-lg">Sessão expirada</p>
                <p className="text-[#8A898B] text-sm">
                    Sua sessão expirou por segurança. Faça login novamente para continuar.
                </p>
                <button
                    type="button"
                    onClick={handleRelogar}
                    className="bg-[#4A9B9A] text-white font-bold text-sm rounded-xl py-2.5 hover:bg-[#3d8483] transition-colors"
                >
                    Fazer login novamente
                </button>
            </div>
        </div>
    )
}