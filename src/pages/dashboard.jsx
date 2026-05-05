import { useState } from "react"
import Sidebar from "../components/sidebar"
import PhotoList from "../components/photoList"
import PhotoHeader from "../components/photoHeader"
import PlantHighlight from "../components/plantHighlight"

export default function Dashboard() {
    const [selectedPhoto, setSelectedPhoto] = useState(null)

    const status =
        selectedPhoto?.health > 66 ? "SAUDÁVEL" :
        selectedPhoto?.health > 33 ? "ATENÇÃO" :
        "CRÍTICO"

    return (
        <div className="bg-[#16191C] flex flex-row min-h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col gap-4 p-4 md:p-6 flex-1 min-w-0 pt-20 md:pt-6">
                <PhotoHeader
                    totalPhotos={8}
                    totalLeaves={139}
                    healthCounts={{ healthy: 3, warning: 3, critical: 2 }}
                />
                <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
                    <PhotoList selectedId={selectedPhoto?.id} onSelect={setSelectedPhoto} hasSelection={!!selectedPhoto} />
                    {selectedPhoto && (
                        <div className="flex flex-col lg:w-1/2 lg:shrink-0 overflow-y-auto">
                            <PlantHighlight
                                status={status}
                                time={selectedPhoto.time}
                                id={selectedPhoto.id}
                                distance={selectedPhoto.distance}
                                location={selectedPhoto.location}
                                img={selectedPhoto.image}
                                leaves={selectedPhoto.leaves}
                                health={selectedPhoto.health}
                                plaguePercent={selectedPhoto.aphidPercentage}
                                nutritionPercent={selectedPhoto.nutritionPercentage}
                                hydrationPercent={selectedPhoto.hydrationPercentage}
                                found={selectedPhoto.found}
                                recommendations={selectedPhoto.recommendations}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}