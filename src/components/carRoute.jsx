const waypoints = [
    { id: "A1", x: 20, y: 75, status: "healthy" },
    { id: "A2", x: 35, y: 60, status: "healthy" },
    { id: "A3", x: 50, y: 72, status: "warning" },
    { id: "A4", x: 65, y: 55, status: "critical" },
    { id: "A5", x: 78, y: 65, status: null },
]

const statusColor = {
    healthy: "#4CAF50",
    warning: "#D4A34A",
    critical: "#C75050",
    null: "#8A898B",
}

export default function CarRoute() {
    const current = waypoints[3]

    return (
        <div className="bg-[#16191C] w-full border border-[#8A898B]/25 flex flex-col rounded-lg p-3 gap-2">
            <p className="text-[#8A898B] font-bold text-[10px]">TRAJETÓRIA</p>
            <div className="relative w-full rounded-lg overflow-hidden" style={{ height: "120px", background: "repeating-linear-gradient(0deg, transparent, transparent 19px, #8A898B18 19px, #8A898B18 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, #8A898B18 19px, #8A898B18 20px)" }}>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polyline
                        points={waypoints.map(p => `${p.x},${p.y}`).join(" ")}
                        fill="none"
                        stroke="#8A898B"
                        strokeWidth="0.8"
                        strokeDasharray="2 1.5"
                        vectorEffect="non-scaling-stroke"
                    />
                    {waypoints.slice(0, -1).map((point, i) => {
                        const next = waypoints[i + 1]
                        const color = statusColor[point.status] ?? statusColor.null
                        return (
                            <line
                                key={i}
                                x1={point.x} y1={point.y}
                                x2={next.x} y2={next.y}
                                stroke={color}
                                strokeWidth="1"
                                strokeOpacity="0.6"
                                vectorEffect="non-scaling-stroke"
                            />
                        )
                    })}
                </svg>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {waypoints.map((point) => {
                        const isCurrent = point.id === current.id
                        const color = statusColor[point.status] ?? statusColor.null
                        return (
                            <g key={point.id}>
                                {isCurrent && (
                                    <circle cx={point.x} cy={point.y} r="4" fill={color} fillOpacity="0.2" vectorEffect="non-scaling-stroke" />
                                )}
                                <circle
                                    cx={point.x} cy={point.y} r={isCurrent ? "2" : "1.5"}
                                    fill={color}
                                    vectorEffect="non-scaling-stroke"
                                />
                            </g>
                        )
                    })}
                </svg>
                {waypoints.map((point) => (
                    <div
                        key={point.id}
                        className="absolute text-[8px] font-bold"
                        style={{
                            left: `${point.x}%`,
                            top: `${point.y}%`,
                            transform: "translate(-50%, -220%)",
                            color: statusColor[point.status] ?? statusColor.null,
                        }}
                    >
                        {point.id}
                    </div>
                ))}
                <div
                    className="absolute text-[8px] font-bold text-[#8A898B]"
                    style={{ bottom: "4px", right: "6px" }}
                >
                    EM ROTA →
                </div>
            </div>
            <div className="flex flex-row gap-3 flex-wrap">
                {Object.entries({ healthy: "Saudável", warning: "Atenção", critical: "Crítico" }).map(([key, label]) => (
                    <div key={key} className="flex flex-row items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: statusColor[key] }} />
                        <p className="text-[#8A898B] text-[9px] font-bold">{label}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}