import PlantPhoto from "./plantPhoto"
import plantPlaceholder from "../assets/images/plant-placeholder.png"

const photos = [
    { id: "IMG-2048", location: "Setor A3", distance: 18.2, leaves: 14, time: "14:32:14", health: 32, aphidPercentage: 28, nutritionPercentage: 61, hydrationPercentage: 38, found: "Foco de pulgão em 4 folhas da face abaxial.\nSinais de murcha foliar em 6 folhas.\nColoração amarelada nas bordas.", recommendations: "Aplicar controle biológico (Coccinellidae) e antecipar irrigação localizada neste trecho." },
    { id: "IMG-2047", location: "Setor A3", distance: 17.6, leaves: 18, time: "14:31:48", health: 68, aphidPercentage: 15, nutritionPercentage: 72, hydrationPercentage: 65, found: "Leve amarelecimento em 3 folhas.\nPontos de desidratação moderada.", recommendations: "Monitorar evolução do amarelecimento e manter irrigação regular." },
    { id: "IMG-2046", location: "Setor A3", distance: 17.0, leaves: 21, time: "14:31:22", health: 91, aphidPercentage: 5, nutritionPercentage: 88, hydrationPercentage: 90, found: "Nenhuma anomalia significativa detectada.", recommendations: "Manter manejo atual. Cultura em bom estado." },
    { id: "IMG-2045", location: "Setor A2", distance: 16.4, leaves: 16, time: "14:30:55", health: 64, aphidPercentage: 22, nutritionPercentage: 58, hydrationPercentage: 55, found: "Manchas foliares em 5 folhas.\nSinais iniciais de deficiência nutricional.", recommendations: "Aplicar fertilizante foliar e verificar pH do solo." },
    { id: "IMG-2044", location: "Setor A2", distance: 15.8, leaves: 19, time: "14:30:28", health: 87, aphidPercentage: 8, nutritionPercentage: 82, hydrationPercentage: 85, found: "Pequenas áreas de estresse hídrico em 2 folhas.", recommendations: "Manter manejo atual com atenção à irrigação." },
    { id: "IMG-2043", location: "Setor A2", distance: 15.2, leaves: 12, time: "14:30:01", health: 29, aphidPercentage: 35, nutritionPercentage: 42, hydrationPercentage: 30, found: "Infestação de pulgão em 6 folhas.\nMurcha severa em 4 folhas.\nDeficiência nutricional visível.", recommendations: "Aplicar inseticida urgente e reforçar irrigação e adubação imediatamente." },
    { id: "IMG-2042", location: "Setor A1", distance: 14.6, leaves: 22, time: "14:29:34", health: 89, aphidPercentage: 4, nutritionPercentage: 85, hydrationPercentage: 92, found: "Nenhuma anomalia significativa detectada.", recommendations: "Manter manejo atual. Cultura em excelente estado." },
    { id: "IMG-2041", location: "Setor A1", distance: 14.0, leaves: 17, time: "14:29:08", health: 70, aphidPercentage: 18, nutritionPercentage: 68, hydrationPercentage: 60, found: "Coloração irregular em 4 folhas.\nLeve estresse hídrico.", recommendations: "Aumentar frequência de irrigação e monitorar nutrição." },
]

export default function PhotoList({ selectedId, onSelect, hasSelection }) {
    return (
        <div className={`${hasSelection ? "w-1/2" : "w-full"} shrink-0 flex flex-col gap-2 overflow-y-auto`}>
            {photos.map((photo) => (
                <PlantPhoto
                    key={photo.id}
                    image={plantPlaceholder}
                    selected={selectedId === photo.id}
                    onSelect={() => {
                        if (selectedId === photo.id) {
                            onSelect(null)
                        } else {
                            onSelect({ ...photo, image: plantPlaceholder })
                        }
                    }}
                    {...photo}
                />
            ))}
        </div>
    )
}