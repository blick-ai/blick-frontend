import QuantityBar from "./quantityBar"

export default function Sweep({ imageNumber, leafNumber, affectedAreas, healthyQuantity, warningQuantity, criticalQuantity }) {
    return (
        <div className="bg-[#16191C] w-full border border-[#8A898B]/25 flex flex-col rounded-lg p-3 gap-2">
            <p className="text-[#8A898B] font-bold text-[10px]">RESUMO DA VARREDURA</p>
            <div className="flex flex-row gap-1.5 items-baseline">
                <p className="text-white font-extrabold text-xl">{imageNumber}</p>
                <p className="text-[#8A898B] font-bold text-[10px]">imagens analisadas</p>
            </div>
            <div className="flex flex-row gap-2">
                <div className="flex flex-row gap-1">
                    <p className="text-white font-extrabold text-[10px]">{leafNumber}</p>
                    <p className="text-[#8A898B] font-bold text-[10px]">folhas</p>
                </div>
                <p className="text-[#8A898B] font-bold text-[10px]">●</p>
                <div className="flex flex-row gap-1">
                    <p className="text-[#C75050] font-extrabold text-[10px]">{affectedAreas}</p>
                    <p className="text-[#8A898B] font-bold text-[10px]">áreas afetadas</p>
                </div>
            </div>
            <QuantityBar status={"Saudável"} quantity={healthyQuantity} total={imageNumber} />
            <QuantityBar status={"Atenção"} quantity={warningQuantity} total={imageNumber} />
            <QuantityBar status={"Crítico"} quantity={criticalQuantity} total={imageNumber} />
        </div>
    )
}