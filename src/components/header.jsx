import { useNavigate } from "react-router"
import logo from "../assets/images/logo-transparent.png"

export default function Header() {
    const navigate = useNavigate()

    return (
        <header className="bg-[#1B2125] w-full shadow-md fixed top-0 left-0 z-50">
            <div className="h-16 sm:h-20 md:h-25 relative w-full flex justify-center items-center px-4 sm:px-8 md:px-12 text-white">
                <div className="cursor-pointer absolute left-3 sm:left-4">
                    <img src={logo} alt="Blick AI Logo" className="h-12 sm:h-16 md:h-20 w-auto" />
                </div>
                <div className="absolute right-3 sm:right-4">
                    <button
                        className="btn bg-[#4A9B9A] hover:bg-[#316868] py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 rounded font-bold text-black text-xs sm:text-sm md:text-base"
                        onClick={() => navigate("/login")}
                    >
                        ACESSAR
                    </button>
                </div>
            </div>
        </header>
    );
}