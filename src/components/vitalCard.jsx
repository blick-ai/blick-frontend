export default function VitalCard({ icon, label, value, color: corForcada, bgColor: bgForcado }) {
    const color = corForcada || "#4CAF50"
    const bgColor = bgForcado || "#1A2E1A"

    return (
        <div className="bg-[#16191C] border border-[#8A898B]/25 rounded-xl p-4 flex flex-col gap-3 flex-1">
            <div className="flex flex-row justify-center items-center gap-2">
                <div className="rounded-lg p-2" style={{ backgroundColor: bgColor }}>
                    <div style={{ color: color }}>
                        {icon}
                    </div>
                </div>
                <p className="font-bold text-xs uppercase" style={{ color }}>{label}</p>
            </div>
            <div className="flex flex-row items-baseline gap-0.5">
                <p className="text-white font-extrabold text-2xl">{value}</p>
                <p className="text-[#8A898B] font-bold text-sm">%</p>
            </div>
            <div className="bg-[#2A2D31] rounded-full w-full h-2 overflow-hidden">
                <div
                    className="h-full rounded-full"
                    style={{ width: `${value}%`, backgroundColor: color }}
                />
            </div>
        </div>
    )
}