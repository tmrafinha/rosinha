import { FiChevronLeft } from "react-icons/fi";

export function SecundaryHeader() {
    return (
        <header className="bg-primary w-full h-10 flex items-center">
            <a href="/menu">
                <FiChevronLeft size={28} className="text-white " />
            </a>
        </header>
    )
}