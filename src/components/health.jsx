export default function Health({health}){
    return (
        <div className="bg-[#16191C] w-100 border border-[#8A898B]/25 flex flex-col rounded-2xl p-5 gap-4">
            <div className="flex flex-row items-baseline gap-3">
                <img src="src/assets/images/health.png" className="w-5 h-auto" />
                <p className="text-[#8A898B] font-bold">SAÚDE MÉDIA</p>
            </div>
            <div className="flex flex-row items-baseline gap-1">
                <p className="text-white font-extrabold text-4xl">{health}</p>
                <p className="text-[#8A898B] font-bold">/100</p>
            </div>
        </div>
    )
}