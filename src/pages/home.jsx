import Header from "../components/header"
import Showcase from "../components/showcase"
import Step from "../components/step"

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
                <div className="flex flex-row flex-wrap justify-center items-stretch gap-8 w-full mb-8">
                    <Showcase path="src/assets/images/car.png" title={"CARRINHO AUTÔNOMO"} description={"Um carrinho de inspeção percorre a plantação capturando imagens de cada planta com câmeras de alta resolução."} />
                    <Showcase path="src/assets/images/chip.png" title={"VISÃO COMPUTACIONAL"} description={"Modelos de deep learning analisam cada folha em busca de pragas, doenças, deficiências nutricionais e estresse biológico."} />
                </div>
                <div className="flex flex-row flex-wrap justify-center items-stretch gap-8 w-full mb-8">
                    <Showcase path="src/assets/images/diagnosis.png" title={"DIAGNÓSTICO EM TEMPO REAL"} description={"Acompanhe o índice de saúde geral do cultivo, sinais vitais por categoria e a rota completa do carrinho."} />
                    <Showcase path="src/assets/images/recommendation.png" title={"RECOMENDAÇÕES CLÍNICAS"} description={"Receba orientações de manejo direcionadas - irrigação, nutrição ou controle biológico - para cada anomalia detectada."} />
                </div>
            </div>
            <div className="items-center bg-[#1B2125] flex flex-col w-screen border-y py-20 px-30 gap-8 border-[#8A898B]/25 mb-4">
                <p className="font-bold text-white text-4xl">COMO FUNCIONA</p>
                <div className="flex flex-row justify-center items-center gap-8">
                    <Step id={"01"} title={"INSPEÇÃO"} description={"O carrinho percorre a plantação em rota programada e fotografa cada planta individualmente."} />
                    <Step id={"02"} title={"DIAGNÓSTICO"} description={"A IA avalia pragas, nutrição e hidratação de cada folha, gerando um índice de saúde por planta."} />
                    <Step id={"03"} title={"MANEJO"} description={"Você recebe recomendações priprizadas para tratar focos críticos antes que se espalhem."} />
                </div>
            </div>
            <div className="text-center text-[#8A898B] mb-50">
                <p>Blick -  Trabalho de Conclusão de Curso ● Saúde Vegetal ● Carrinho Autônomo ● Visão Computacional</p>
            </div>
        </div>
    )
}