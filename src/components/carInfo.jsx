import BatteryBar from "./batteryBar"

export default function CarInfo({ battery }) {
    return (
        <div className="bg-[#16191C] w-100 border border-[#8A898B]/25 flex flex-col rounded-2xl p-5 gap-4">
            <div className="flex flex-row justify-between items-center mb-3">
                <p className="text-[#8A898B] font-bold">CARRINHO</p>
                <div className="bg-[#1A3A38] rounded-4xl py-2 px-4">
                    <p className="font-bold text-[#4CAF50]">● EM ROTA</p>
                </div>
            </div>
            <div className="flex flex-row gap-4">
                <img src="src/assets/images/location-pin.png" className="w-7 h-auto" />
                <p className="text-white font-bold text-lg">Setor A3 - 18,2m</p>
            </div>
            <div className="flex flex-row gap-4">
                <img src="src/assets/images/location-arrow.png" className="w-7 h-auto" />
                <p className="text-white font-bold text-lg">0,42 m/s</p>
            </div>
            <div className="flex flex-row gap-4">
                <img src="src/assets/images/camera-gray.png" className="w-7 h-auto" />
                <p className="text-white font-bold text-lg">8 capturas hoje</p>
            </div>
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-3 items-center">
                    <img src="src/assets/images/battery.png" className="w-5 h-auto" />
                    <p className="text-[#8A898B] font-bold">Bateria</p>
                </div>
                <p className="text-white font-bold text-lg">{battery}%</p>
            </div>
            <BatteryBar value={battery}/>
            <br />
        </div>
    )
}