export default function QuantityBar({ status, quantity, total }) {
    const color =
        status === "Saudável" ? "#4CAF50" :
            status === "Atenção" ? "#D4A34A" :
                "#C75050"

    const percentage = total > 0 ? (quantity / total) * 100 : 0
    
    return (
        <div className="flex flex-col gap-1 w-full">
            <div className="flex flex-row justify-between items-center">
                <p className="font-bold text-[10px]" style={{ color }}>{status}</p>
                <p className="text-white font-bold text-[10px]">{quantity}</p>
            </div>
            <div className="bg-[#2A2D31] rounded-full w-full h-2 overflow-hidden">
                <div
                    className="h-full rounded-full"
                    style={{ width: `${percentage}%`, backgroundColor: color }}
                />
            </div>
        </div>
    )
}