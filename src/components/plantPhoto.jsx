import HealthBar from "./healthBar"
export default function PlantPhoto({ image, id, location, distance, leaves, time, health, selected, onSelect }) {
    return (
        <div className={`bg-[#1B2125] border flex flex-row rounded-2xl p-4 gap-6 items-center w-full ${selected ? "border-[#4A9B9A]" : "border-[#8A898B]/25"}`}>
            <img src={image} className="h-20 w-auto rounded-xl object-cover" />
            <div className="flex flex-col gap-1 flex-1">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-2 items-center">
                        <img src="src/assets/images/camera-gray.png" className="w-4 h-4" />
                        <p className="text-white font-bold uppercase">{id}</p>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <img src="src/assets/images/time.png" className="w-3 h-3" />
                        <p className="text-[#8A898B]">{time}</p>
                    </div>
                </div>
                <div className="flex flex-row gap-2 text-[#8A898B] text-sm">
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
                        className="text-[#8A898B] hover:text-white text-2xl font-bold"
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    )
}