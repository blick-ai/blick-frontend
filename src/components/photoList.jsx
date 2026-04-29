import PlantPhoto from "./plantPhoto"

export default function PhotoList() {
    return (
        <div className="w-150">
            <PlantPhoto image={"src/assets/images/plant-placeholder.png"} id={"IMG-2048"} location={"Setor A3"} distance={18.2} leaves={14} time={"14:32:14"} health={42} />
        </div>
    )
}