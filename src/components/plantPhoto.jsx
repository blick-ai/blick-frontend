import HealthBar from "./healthBar"
import cameraGray from "../assets/images/camera-gray.png"
import time from "../assets/images/time.png"

export default function PlantPhoto({ image, id, location, distance, leaves, time: timeValue, health, selected, onSelect }) {
    return (
        <div className={`bg-[#1B2125] border flex flex-row rounded-2xl p-3 sm:p-4 gap-3 sm:gap-6 items-center w-full ${selected ? "border-[#4A9B9A]" : "border-[#8A898B]/25"}`}>
            <img src={image} className="h-16 sm:h-20 w-auto rounded-xl object-cover shrink-0" />
            <div className="flex flex-col gap-1 flex-1 min-w-0">
                <div className="flex flex-row justify-between items-center gap-2">
                    <div className="flex flex-row gap-2 items-center min-w-0">
                        <img src={cameraGray} className="w-4 h-4 shrink-0" />
                        <p className="text-white font-bold uppercase truncate">{id}</p>
                    </div>
                    <div className="flex flex-row items-center gap-2 shrink-0">
                        <img src={time} className="w-3 h-3" />
                        <p className="text-[#8A898B] text-sm">{timeValue}</p>
                    </div>
                </div>
                <div className="flex flex-row flex-wrap gap-x-2 gap-y-0.5 text-[#8A898B] text-xs sm:text-sm">
                    <p>{location}</p>
                    <p>●</p>
                    <p>{distance} m</p>
                    <p>●</p>
                    <p>{leaves} folhas</p>
                </div>
                <div className="flex flex-row gap-3 items-center">
                    <HealthBar health={health} />
                    <button
                        type="button"
                        onClick={onSelect}
                        className="text-[#8A898B] hover:text-white text-2xl font-bold shrink-0"
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    )
}