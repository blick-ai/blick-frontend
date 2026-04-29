export default function HealthBar({ health }) {
    const color =
        health > 66 ? "#4CAF50" :
            health > 33 ? "#D4A34A" :
                "#C75050"

    const label =

        health > 66 ? "SAUDÁVEL" :
            health > 33 ? "ATENÇÃO" :
                "CRÍTICO"

    return (
        <div className="flex flex-row items-center gap-3 w-full">
            <p className="text-xl font-extrabold" style={{ color }}>{health}</p>
            <div className="bg-[#2A2D31] rounded-full flex-1 h-2 overflow-hidden">
                <div
                    className="h-full rounded-full"
                    style={{ width: `${health}%`, backgroundColor: color }}
                />
            </div>
            <p className="text-[10px] font-bold" style={{ color }}>{label}</p>
        </div>
    )
}