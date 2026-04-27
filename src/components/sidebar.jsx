import CarInfo from "./carInfo"
import Sweep from "./sweep"
import Health from "./health"

export default function Sidebar() {
    return (
        <div className="flex flex-col">
            <div className="bg-[#1B2125] border border-[#8A898B]/25 text-[#8A898B] flex flex-row h-30 w-120 py-6 px-4 justify-between items-center">
                <img src="src/assets/images/logo-transparent.png" className="w-45 h-auto" />
                <button type="button" className="hover:opacity-70">
                    <img src="src/assets/images/exit.png" alt="Sair" className="h-8 w-8" />
                </button>
            </div>
            <div className="bg-[#1B2125] border border-[#8A898B]/25 text-[#8A898B] flex flex-col h-screen w-120 py-6 px-6 gap-4">
                <p className="font-bold">CULTIVO MONITORADO</p>
                <select className="bg-[#16191C] text-white border border-[#8A898B]/25 px-4 py-3 outline-none font-bold focus:border-[#4A9B9A] mb-3 w-100 rounded-2xl">
                    <option value="soja">Soja</option>
                    <option value="milho">Milho</option>
                    <option value="algodao">Algodão</option>
                </select>
                <CarInfo battery={72}/>
                <br />
                <Sweep imageNumber={8} leafNumber={139} affectedAreas={23} healthyQuantity={3} warningQuantity={3} criticalQuantity={2} />
                <br />
                <Health health={69} />
            </div>
        </div>
    )
}