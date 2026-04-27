export default function QuantityBar({ status, quantity, total }) {
    const color =
        status === "Saudável" ? "#4CAF50" :
        status === "Atenção" ? "#D4A34A" :
        "#C75050"

    const percentage = total > 0 ? (quantity / total) * 100 : 0

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-row justify-between items-center">
                <p className="font-bold" style={{ color }}>{status}</p>
                <p className="text-white font-bold">{quantity}</p>
            </div>
            <div className="bg-[#2A2D31] rounded-2xl w-full h-4 overflow-hidden">
                <div
                    className="h-full rounded-2xl"
                    style={{ width: `${percentage}%`, backgroundColor: color }}
                />
            </div>
        </div>
    )
}