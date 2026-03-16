import Header from "../components/header"
import Showcase from "../components/showcase"
export default function Home() {
    return (
        <div className='flex flex-col min-h-screen bg-[#16191C]'>
            <Header />
            <div className="flex flex-col p-6 items-center text-center">
                <h1 className="text-6xl font-bold text-white w-3/5 mb-8">
                    MONITORAMENTO INTELIGENTE DE PRAGAS PARA UMA AGRICULTURA DE PRECISÃO
                </h1>
                <p className="text-[#8A898B] text-2xl w-3/5 mb-10">
                    O Blick integra hardware IoT, inteligência artificial e uma interface intuitiva para que você tenha controle total sobre a saúde da sua plantação - antes que seja tarde.
                </p>
                <button className="btn bg-[#4A9B9A] hover:bg-[#316868] font-semibold py-4 px-8 rounded text-black mb-20">
                    COMEÇAR AGORA →
                </button>
                <div className="flex flex-row flex-wrap justify-center items-stretch gap-8 w-full">
                    <Showcase path="src/assets/images/camera.png" title={"CAPTURA AUTOMATIZADA"} description={"Dispositivos IoT capturam imagens da plantação em intervalos programados, sem intervenção manual."}/>
                    <Showcase path="src/assets/images/chip.png" title={"VISÃO COMPUTACIONAL"} description={"Algoritmos de deep learning analisam cada imagem para identificar pragas com alta precisão."}/>
                </div>
            </div>
        </div>
    )
}