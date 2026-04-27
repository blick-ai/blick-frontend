import QuantityBar from "./quantityBar"

export default function Sweep({ imageNumber, leafNumber, affectedAreas, healthyQuantity, warningQuantity, criticalQuantity }) {
    return (
        <div className="bg-[#16191C] w-100 border border-[#8A898B]/25 flex flex-col rounded-2xl p-5 gap-4">
            <p className="text-[#8A898B] font-bold">RESUMO DA VARREDURA</p>
            <div className="flex flex-row gap-2 items-baseline">
                <p className="text-white font-extrabold text-4xl">{imageNumber}</p>
                <p className="text-[#8A898B] font-bold">imagens analisadas</p>
            </div>
            <div className="flex flex-row gap-4">
                <div className="flex flex-row gap-2">
                    <p className="text-white font-extrabold text-sm">{leafNumber}</p>
                    <p className="text-[#8A898B] font-bold text-sm">folhas</p>
                </div>
                <p className="text-[#8A898B] font-bold text-sm">●</p>
                <div className="flex flex-row gap-2">
                    <p className="text-[#C75050] font-extrabold text-sm">{affectedAreas}</p>
                    <p className="text-[#8A898B] font-bold text-sm">áreas afetadas</p>
                </div>
            </div>
            <QuantityBar status={"Saudável"} quantity={healthyQuantity} total={imageNumber} />
            <QuantityBar status={"Atenção"} quantity={warningQuantity} total={imageNumber} />
            <QuantityBar status={"Crítico"} quantity={criticalQuantity} total={imageNumber} />
            <br />
        </div>
    )
}