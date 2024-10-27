import { FaHome, FaDollarSign, FaUser } from "react-icons/fa";

interface OverlayProps {
    activeOption: string;
}

export function OverlayNavigation({ activeOption }: OverlayProps) {

    return (
        <div className="fixed bottom-0 w-full bg-white border-t-2 border-gray-200">
            <div className="flex justify-around items-center h-16">
                {/* Principal */}
                <button className={`flex flex-col items-center bg-white ${activeOption == "Principal" ? "text-[#025bab]" : "text-zinc-600"} `}>
                    <FaHome size={24} />
                    <span className="text-sm">Principal</span>
                </button>

                {/* Saques */}
                <button className={`flex flex-col items-center bg-white ${activeOption == "Saques" ? "text-[#025bab]" : "text-zinc-600"} `}>
                    <FaDollarSign size={24} />
                    <span className="text-sm">Saques</span>
                </button>

                {/* Meus Dados */}
                <button className={`flex flex-col items-center bg-white ${activeOption == "Meus Dados" ? "text-[#025bab]" : "text-zinc-600"} `}>
                    <FaUser size={24} />
                    <span className="text-sm">Meus Dados</span>
                </button>
            </div>
        </div>
    );
}
