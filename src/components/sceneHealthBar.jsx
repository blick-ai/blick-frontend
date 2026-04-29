export default function SceneHealthBar({ health }) {
    const color =
        health > 66 ? "#4CAF50" :
            health > 33 ? "#D4A34A" :
                "#C75050"

    return (
        <div className="flex flex-col gap-2 flex-1 justify-center">
            <div className="flex flex-row items-baseline gap-1">
                <p className="text-3xl font-extrabold" style={{ color }}>{health}</p>
                <p className="text-[#8A898B] font-bold text-sm">/100</p>
            </div>
            <div className="bg-[#2A2D31] rounded-full w-full h-2 overflow-hidden">
                <div
                    className="h-full rounded-full"
                    style={{ width: `${health}%`, backgroundColor: color }}
                />
            </div>
        </div>
    )
}