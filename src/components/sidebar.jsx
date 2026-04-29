import { useNavigate } from "react-router"

import CarInfo from "./carInfo"
import Sweep from "./sweep"
import Health from "./health"

export default function Sidebar() {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col w-90 shrink-0">
            <div className="bg-[#1B2125] border border-[#8A898B]/25 text-[#8A898B] flex flex-row h-16 w-full py-3 px-3 justify-between items-center">
                <img src="src/assets/images/logo-transparent.png" className="w-24 h-auto" />
                <button type="button" className="hover:opacity-70" onClick={() => navigate("/")}>
                    <img src="src/assets/images/exit.png" alt="Sair" className="h-5 w-5" />
                </button>
            </div>
            <div className="bg-[#1B2125] border border-[#8A898B]/25 text-[#8A898B] flex flex-col flex-1 w-full py-3 px-3 gap-2 overflow-y-auto">
                <p className="font-bold text-[10px]">CULTIVO MONITORADO</p>
                <select className="bg-[#16191C] text-white text-xs border border-[#8A898B]/25 px-2 py-1.5 outline-none font-bold focus:border-[#4A9B9A] mb-1 w-full rounded-lg">
                    <option value="soja">Soja</option>
                    <option value="milho">Milho</option>
                    <option value="algodao">Algodão</option>
                </select>
                <br />
                <CarInfo battery={72}/>
                <br />
                <Sweep imageNumber={8} leafNumber={139} affectedAreas={23} healthyQuantity={3} warningQuantity={3} criticalQuantity={2} />
                <br />
                <Health health={69} />
            </div>
        </div>
    )
}