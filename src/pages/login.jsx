import { useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router"
import logo from "../assets/images/logo-transparent.png"
import aphid from "../assets/images/aphid.png"

const API_URL = "https://1uzo5w52jk.execute-api.us-east-1.amazonaws.com"

export default function Login() {
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [loading, setLoading] = useState(false)
    const [erro, setErro] = useState("")
    const navigate = useNavigate()

    async function handleLogin() {
        setErro("")

        if (!email || !senha) {
            setErro("Preencha o e-mail e a senha.")
            return
        }

        setLoading(true)
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha }),
            })

            const data = await response.json()

            if (!response.ok) {
                setErro(data?.detail || "Credenciais inválidas. Tente novamente.")
                return
            }

            localStorage.setItem("access_token", data.access_token)
            localStorage.setItem("refresh_token", data.refresh_token)
            localStorage.setItem("id_token", data.id_token)

            navigate("/dashboard")
        } catch {
            setErro("Erro de conexão. Verifique sua internet e tente novamente.")
        } finally {
            setLoading(false)
        }
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") handleLogin()
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-[#16191C]">
            <div className="w-full md:w-1/2 flex items-center justify-center px-6 sm:px-12 md:px-20 py-12 md:py-0">
                <div className="flex flex-col gap-6 sm:gap-8 text-left w-full max-w-md">
                    <img src={logo} className="h-auto w-32 sm:w-40 mb-4 sm:mb-8" />
                    <p className="font-bold text-white text-2xl sm:text-3xl md:text-4xl">Acesse sua conta</p>
                    <p className="text-[#8A898B] text-base sm:text-xl md:text-2xl mb-2 sm:mb-4">
                        Diagnóstico contínuo da saúde do seu cultivo
                    </p>

                    <div className="flex flex-col gap-3">
                        <p className="text-white font-bold text-lg sm:text-xl md:text-2xl">E-mail</p>
                        <input
                            type="email"
                            placeholder="Digite seu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="bg-[#181D23] text-white placeholder-[#8A898B] border border-[#8A898B]/25 rounded-xl px-4 py-3 outline-none focus:border-[#4A9B9A] w-full h-12 sm:h-15"
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        <p className="text-white font-bold text-lg sm:text-xl md:text-2xl">Senha</p>
                        <div className="relative w-full">
                            <input
                                type={show ? "text" : "password"}
                                placeholder="Digite sua senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="bg-[#181D23] text-white placeholder-[#8A898B] border border-[#8A898B]/25 rounded-xl px-4 py-3 outline-none focus:border-[#4A9B9A] w-full pr-20 h-12 sm:h-15"
                            />
                            <button
                                type="button"
                                onClick={() => setShow(!show)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A898B] hover:text-white text-sm"
                            >
                                {show ? "Ocultar" : "Mostrar"}
                            </button>
                        </div>
                    </div>

                    {erro && (
                        <p className="text-red-400 text-sm -mt-2">{erro}</p>
                    )}

                    <button
                        className="bg-[#4EC5C1] hover:bg-[#3A9A97] disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-2 px-4 rounded h-12 sm:h-15 mb-2 sm:mb-3 transition-colors"
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        {loading ? "ENTRANDO..." : "ENTRAR"}
                    </button>

                    <div className="flex flex-col items-center">
                        <div className="flex flex-row flex-wrap gap-2 items-baseline justify-center">
                            <p className="text-[#8A898B] text-base sm:text-xl md:text-2xl">Não tem uma conta?</p>
                            <Link className="text-[#4EC5C1] text-base sm:text-xl md:text-2xl" to="/">Conheça o Blick</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hidden md:block md:w-1/2 relative min-h-screen">
                <img
                    src={aphid}
                    alt="Imagem de login"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <p className="absolute bottom-10 left-10 text-white font-bold text-3xl lg:text-5xl uppercase tracking-wide leading-relaxed">
                    Cada planta sob diagnóstico.<br />
                    Cada sintoma sob controle.
                </p>
            </div>
        </div>
    )
}