import BatteryBar from "./batteryBar"
import locationPin from "../assets/images/location-pin.png"
import locationArrow from "../assets/images/location-arrow.png"
import cameraGray from "../assets/images/camera-gray.png"
import battery from "../assets/images/battery.png"

export default function CarInfo({ battery: batteryValue }) {
    return (
        <div className="bg-[#16191C] w-full border border-[#8A898B]/25 flex flex-col rounded-lg p-3 gap-1.5">
            <div className="flex flex-row justify-between items-center mb-0.5">
                <p className="text-[#8A898B] font-bold text-[10px]">CARRINHO</p>
                <div className="bg-[#1A3A38] rounded-full py-0.5 px-2">
                    <p className="font-bold text-[#4CAF50] text-[10px]">● EM ROTA</p>
                </div>
            </div>
            <div className="flex flex-row gap-2 items-center">
                <img src={locationPin} className="w-4 h-auto" />
                <p className="text-white font-bold text-xs">Setor A3 — 18,2 m</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
                <img src={locationArrow} className="w-4 h-auto" />
                <p className="text-white font-bold text-xs">0,42 m/s</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
                <img src={cameraGray} className="w-4 h-auto" />
                <p className="text-white font-bold text-xs">8 capturas hoje</p>
            </div>
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-1.5 items-center">
                    <img src={battery} className="w-3.5 h-auto" />
                    <p className="text-[#8A898B] font-bold text-[10px]">Bateria</p>
                </div>
                <p className="text-white font-bold text-xs">{batteryValue}%</p>
            </div>
            <BatteryBar value={batteryValue}/>
        </div>
    )
}