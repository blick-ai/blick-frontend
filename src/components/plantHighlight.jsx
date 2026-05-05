import { useState } from "react"
import SceneHealthBar from "./sceneHealthBar"
import VitalCard from "./vitalCard"
import PlantInfoModal from "./plantInfoModal"
import plantData from "../data/plantData.json"
import cameraGray from "../assets/images/camera-gray.png"
import locationPin from "../assets/images/location-pin.png"
import lowrisk from "../assets/images/lowrisk.png"
import attention from "../assets/images/attention.png"
import warning from "../assets/images/warning.png"

export default function PlantHighlight({ status, time, id, distance, location, img, leaves, health, plaguePercent, nutritionPercent, hydrationPercent, found, recommendations }) {
    const [showModal, setShowModal] = useState(false)

    const statusColor =
        health > 66 ? "#4CAF50" :
            health > 33 ? "#D4A34A" :
                "#C75050"
    const statusBg =
        health > 66 ? "#1A2E1A" :
            health > 33 ? "#2A2200" :
                "#2E1A1A"

    const icon = health > 66 ? lowrisk : health > 33 ? attention : warning

    return (
        <>
            <div className="flex flex-col flex-1 min-w-0 gap-0">
                <div className="bg-[#1B2125] border border-[#8A898B]/25 rounded-t-2xl p-4">
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-row justify-between items-start">
                            <div className="flex flex-row gap-2 items-center flex-wrap">
                                <div className="border rounded-full py-0.5 px-2 w-20 text-center" style={{ backgroundColor: statusBg, borderColor: statusColor }}>
                                    <p className="font-bold text-[10px]" style={{ color: statusColor }}>● {status}</p>
                                </div>
                                <p className="text-[#8A898B] text-sm">capturada às {time}</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowModal(true)}
                                className="text-[#8A898B] hover:text-white border border-[#8A898B]/25 hover:border-[#8A898B] rounded-lg px-2.5 py-1 text-[10px] font-bold transition-colors shrink-0 ml-2"
                            >
                                INFO DA PLANTA
                            </button>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <img src={cameraGray} className="w-4 h-4" />
                            <p className="text-white font-bold uppercase">Imagem {id}</p>
                        </div>
                        <div className="flex flex-row gap-2 text-[#8A898B] text-sm items-center flex-wrap">
                            <img src={locationPin} className="w-4 h-4 shrink-0" />
                            <p>{location}</p>
                            <p>●</p>
                            <p>Posição {distance} m</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#1B2125] border border-t-0 border-[#8A898B]/25 p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <img src={img} className="w-full sm:w-40 md:w-100 h-auto rounded-2xl object-cover" />
                        <div className="flex flex-col gap-3 w-full">
                            <p className="text-[#8A898B] font-bold">SAÚDE DA CENA</p>
                            <SceneHealthBar health={health} />
                            <p className="text-[#8A898B] text-sm">Diagnóstico agregado das {leaves} folhas detectadas pelo modelo de visão computacional nesta captura.</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#1B2125] border border-t-0 border-[#8A898B]/25 p-4">
                    <div className="flex flex-col gap-2">
                        <p className="text-[#8A898B] font-bold">SINAIS VITAIS DA CENA</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <VitalCard
                                label="Pragas & Doenças"
                                subtitle="Área foliar afetada"
                                value={plaguePercent}
                                icon={
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 15V11.9375C19 9.76288 17.2371 8 15.0625 8H8.9375C6.76288 8 5 9.76288 5 11.9375V15C5 18.866 8.13401 22 12 22C15.866 22 19 18.866 19 15Z" stroke="currentColor" strokeWidth="1.5" />
                                        <path d="M16.5 8.5V7.5C16.5 5.01472 14.4853 3 12 3C9.51472 3 7.5 5.01472 7.5 7.5V8.5" stroke="currentColor" strokeWidth="1.5" />
                                        <path d="M19 14H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path d="M5 14H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path d="M14.5 3.5L17 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path d="M9.5 3.5L7 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path d="M20.5 20.0002L18.5 19.2002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path d="M20.5 7.9998L18.5 8.7998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path d="M3.5 20.0002L5.5 19.2002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path d="M3.5 7.9998L5.5 8.7998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path d="M12 21.5V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                }
                            />
                            <VitalCard
                                label="Nutrição"
                                subtitle="Índice clorofiliano"
                                value={nutritionPercent}
                                icon={
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.44893 17.009C-0.246384 7.83762 7.34051 0.686125 19.5546 3.61245C20.416 3.81881 21.0081 4.60984 20.965 5.49452C20.5862 13.288 17.0341 17.7048 6.13252 17.9857C5.43022 18.0038 4.76908 17.6344 4.44893 17.009Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M3.99999 21C5.50005 15.5 6 12.5 12 9.99997" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                }
                            />
                            <VitalCard
                                label="Hidratação"
                                subtitle="Estado hídrico"
                                value={hydrationPercent}
                                icon={
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.0001 13.3848C16.0001 14.6088 15.526 15.7828 14.6821 16.6483C14.203 17.1397 13.6269 17.5091 13 17.7364M19 13.6923C19 7.11538 12 2 12 2C12 2 5 7.11538 5 13.6923C5 15.6304 5.7375 17.4893 7.05025 18.8598C8.36301 20.2302 10.1436 20.9994 12.0001 20.9994C13.8566 20.9994 15.637 20.2298 16.9497 18.8594C18.2625 17.4889 19 15.6304 19 13.6923Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="bg-[#1B2125] border border-t-0 border-[#8A898B]/25 p-4">
                    <div className="flex flex-col gap-2">
                        <p className="text-[#8A898B] font-bold">ACHADOS NA IMAGEM</p>
                        {found.split("\n").map((line, index) => (
                            <div key={index} className="flex flex-row gap-2 items-center">
                                <img src={icon} className="w-4 h-4 shrink-0" />
                                <p className="text-sm text-white">{line}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-[#1A1412] border border-t-0 border-[#8A898B]/25 rounded-b-2xl p-4">
                    <div className="flex flex-col gap-2">
                        <p className="text-[#C75050] font-bold">RECOMENDAÇÕES</p>
                        <p className="text-sm text-white">{recommendations}</p>
                    </div>
                </div>
            </div>

            {showModal && (
                <PlantInfoModal data={plantData["soja"]} onClose={() => setShowModal(false)} />
            )}
        </>
    )
}