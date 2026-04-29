import Sidebar from "../components/sidebar"
import PhotoList from "../components/photoList"

export default function Dashboard(){
    return (
        <div className="bg-[#16191C] flex flex-row gap-4 min-h-screen">
            <Sidebar />
            <div className="flex flex-col gap-4 p-6 flex-1 min-w-0">
                <PhotoList />
            </div>
        </div>
    )
}