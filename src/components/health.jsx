export default function Health({health}){
    return (
        <div className="bg-[#16191C] w-full border border-[#8A898B]/25 flex flex-col rounded-lg p-3 gap-2">
            <div className="flex flex-row items-center gap-1.5">
                <img src="src/assets/images/health.png" className="w-3.5 h-auto" />
                <p className="text-[#8A898B] font-bold text-[10px]">SAÚDE MÉDIA</p>
            </div>
            <div className="flex flex-row items-baseline gap-1">
                <p className="text-white font-extrabold text-xl">{health}</p>
                <p className="text-[#8A898B] font-bold text-xs">/100</p>
            </div>
        </div>
    )
}