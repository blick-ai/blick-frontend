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
        <div className="flex flex-row items-center gap-4 w-full">
            <p className="text-4xl font-extrabold" style={{ color }}>{health}</p>
            <div className="bg-[#2A2D31] rounded-2xl flex-1 h-4 overflow-hidden">
                <div
                    className="h-full rounded-2xl"
                    style={{ width: `${health}%`, backgroundColor: color }}
                />
            </div>
            <p className="text-lg font-bold" style={{ color }}>{label}</p>
        </div>
    )
}