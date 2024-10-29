import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { SecundaryHeader } from "../components/secundary-header";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import Modal from "react-modal";

// Estilo do Modal
const modalStyles: Modal.Styles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        maxWidth: "90%",
        width: "400px",
        border: "none",
    },
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: "20px",
    },
};

Modal.setAppElement("#root"); // Acessibilidade para o Modal

export function Info() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <SecundaryHeader />

            <div
                className="flex justify-around space-x-4 px-2 mt-4 cursor-pointer"
                onClick={openModal} // Abrir modal ao clicar na notificação
            >
                {/* Ícone com Gradiente */}
                <div className="p-2 rounded-full h-fit w-fit bg-primary text-white shadow-md">
                    <HiOutlineClipboardDocumentList className="text-4xl" />
                </div>

                {/* Informações do novo visual */}
                <div className="flex justify-between items-center flex-1">
                    <div>
                        <div className="flex justify-between">
                            <h2 className="font-bold">Novo visual do App FGTS</h2>
                        </div>
                        <span>Mais moderno e fácil de usar</span>
                    </div>

                    <div className="flex flex-col items-end">
                        <span className="bg-orange-400 px-2 text-xs w-fit h-fit rounded-lg text-white font-semibold">
                            Nova
                        </span>
                        <FiChevronRight className="text-orange-400 text-4xl" />
                    </div>
                </div>
            </div>

            <div className="mx-4 my-4">
                <div className="border-b border-b-zinc-400" />
            </div>

            {/* Modal de Notificação */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={modalStyles}
                contentLabel="Atualização"
            >
                <div className="text-center">
                    <h2 className="text-xl font-bold mb-4">Atualização do App FGTS</h2>
                    <p className="text-gray-600 mb-6">
                        O aplicativo FGTS foi atualizado com um novo visual para
                        tornar a navegação mais moderna e intuitiva. Aproveite as
                        melhorias!
                    </p>
                    <button
                        onClick={closeModal}
                        className="bg-orange-400 text-white px-6 py-2 w-full rounded-lg"
                    >
                        Fechar
                    </button>
                </div>
            </Modal>
        </div>
    );
}
