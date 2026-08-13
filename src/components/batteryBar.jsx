export default function BatteryBar({ value }) {
    const color =
        value > 66 ? "#4CAF50" :
            value > 33 ? "#D4A34A" :
                "#C75050"

    return (
        <div className="bg-[#2A2D31] rounded-full w-full h-2 overflow-hidden">
            <div
                className="h-full rounded-full"
                style={{ width: `${value}%`, backgroundColor: color }}
            />
        </div>
    )
}