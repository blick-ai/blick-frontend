export default function VitalCard({ icon, label, subtitle, value, color: corForcada, bgColor: bgForcado, statusLabel: labelForcado }) {
    const color = corForcada ||
        (value > 66 ? "#4CAF50" :
        value > 33 ? "#D4A34A" :
        "#C75050")
    const bgColor = bgForcado ||
        (value > 66 ? "#1A2E1A" :
        value > 33 ? "#2A2200" :
        "#2E1A1A")
    const statusLabel = labelForcado ||
        (value > 66 ? "SAUDÁVEL" :
        value > 33 ? "ATENÇÃO" :
        "CRÍTICO")
    return (
        <div className="bg-[#16191C] border border-[#8A898B]/25 rounded-xl p-4 flex flex-col gap-3 flex-1">
            <div className="flex flex-row justify-between items-center">
                <div className="rounded-lg p-2" style={{ backgroundColor: bgColor }}>
                    <div style={{ color: color }}>
                        {icon}
                    </div>
                </div>
                <p className="font-bold text-xs" style={{ color }}>{statusLabel}</p>
            </div>
            <p className="text-[#8A898B] font-bold text-[10px] uppercase">{label}</p>
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
            <p className="text-[#8A898B] text-[10px] italic">{subtitle}</p>
        </div>
    )
}