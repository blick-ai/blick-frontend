import { useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router"

export default function Login() {
    const [show, setShow] = useState(false)
    const navigate = useNavigate()

    return (
        <div className="flex flex-row min-h-screen bg-[#16191C]">
            <div className="w-1/2 flex items-center justify-center px-20">
                <div className="flex flex-col gap-8 text-left">
                    <img src="src/assets/images/logo-transparent.png" className="h-auto w-40 mb-8" />
                    <p className="font-bold text-white text-4xl">Acesse sua conta</p>
                    <p className="text-[#8A898B] text-2xl mb-4">Diagnóstico contínuo da saúde do seu cultivo</p>
                    <div className="flex flex-col gap-3">
                        <p className="text-white font-bold text-2xl">E-mail</p>
                        <input
                            type="email"
                            placeholder="Digite seu email"
                            className="bg-[#181D23] text-white placeholder-[#8A898B] border border-[#8A898B]/25 rounded-xl px-4 py-3 outline-none focus:border-[#4A9B9A] w-xl h-15"
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <p className="text-white font-bold text-2xl">Senha</p>
                        <div className="relative w-xl">
                            <input
                                type={show ? "text" : "password"}
                                placeholder="Digite sua senha"
                                className="bg-[#181D23] text-white placeholder-[#8A898B] border border-[#8A898B]/25 rounded-xl px-4 py-3 outline-none focus:border-[#4A9B9A] w-full pr-12 h-15"
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
                    <button className="bg-[#4EC5C1] hover:bg-[#3A9A97] text-black font-bold py-2 px-4 rounded h-15 mb-3" onClick={() => navigate("/dashboard")}>
                        ENTRAR
                    </button>
                    <div className="flex flex-col items-center">
                        <div className="flex flex-row gap-2 items-baseline">
                        <p className="text-[#8A898B] text-2xl">Não tem uma conta?</p>
                        <Link className="text-[#4EC5C1] text-2xl" to="/">Conheça o Blick</Link>
                    </div>
                    </div>
                </div>
            </div>
            <div className="w-1/2 relative min-h-screen">
                <img
                    src="src/assets/images/aphid.png"
                    alt="Imagem de login"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <p className="absolute bottom-10 left-10 text-white font-bold text-5xl uppercase tracking-wide leading-relaxed">
                    Cada planta sob diagnóstico.<br />
                    Cada sintoma sob controle.
                </p>
            </div>
        </div>
    )
}