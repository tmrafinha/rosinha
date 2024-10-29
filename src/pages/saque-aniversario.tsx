import { useState, useEffect } from "react";
import { PiCalendarCheckLight } from "react-icons/pi";
import { SecundaryHeader } from "../components/secundary-header";
import { BsCake2 } from "react-icons/bs";
import { HiOutlineDocumentMagnifyingGlass } from "react-icons/hi2";
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

export function SaqueAniversario() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
    const [optedForSaque, setOptedForSaque] = useState<boolean>(false);

    console.log(optedForSaque)

    useEffect(() => {
        const savedOption = localStorage.getItem("saqueAniversario");
        if (savedOption) {
            setOptedForSaque(JSON.parse(savedOption));
            setAcceptedTerms(JSON.parse(savedOption)); // Sincroniza se já aceitou
        }
    }, []);

    const handleTermsChange = () => {
        setAcceptedTerms(!acceptedTerms);
    };

    const handleOptIn = () => {
        localStorage.setItem("saqueAniversario", JSON.stringify(true));
        setOptedForSaque(true);
    };

    return (
        <div>
            <SecundaryHeader />
            <div className="text-center flex flex-col items-center font-bold text-zinc-900 space-y-5 mt-5">
                <h2 className="text-2xl">
                    Optar pelo <br /> Saque-aniversário
                </h2>
                <div className="bg-orange-400 p-3 rounded-full text-white w-fit">
                    <PiCalendarCheckLight className="text-white text-4xl" />
                </div>
            </div>

            <div className="px-10 text-sm text-center my-10">
                <div>
                    Atualmente, você é optante da modalidade <br />
                    <span className="font-bold">Saque-Rescisão</span>
                </div>
            </div>

            <div className="px-6">
                <div className="border-b border-b-zinc-300" />
            </div>

            <div className="flex items-center px-4 justify-between space-x-6 m-0">
                <BsCake2 className="text-orange-400 text-[220px]" />
                <div className="flex flex-col">
                    <h2 className="text-zinc-900 font-bold text-xl">
                        SAQUE-ANIVERSÁRIO
                    </h2>
                    <div>
                        O Saque-aniversário permitirá a retirada de parte do saldo
                        da sua conta FGTS, <span className="font-bold">anualmente</span>,
                        no mês do seu <span className="font-bold">aniversário.</span>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <span
                    className="font-thin text-orange-400 cursor-pointer"
                >
                    Simular valor do Saque-aniversário
                </span>
            </div>

            <div className="text-center mt-12 px-3">
                <h4 className="font-bold text-xl text-zinc-700 mb-6">
                    O que muda se eu fizer a opção?
                </h4>
                <span className="text-sm text-zinc-400">
                    Você continuará com o direito de sacar seu FGTS para aquisição
                    de moradia própria, aposentadoria, e demais modalidades.
                </span>
                <p className="font-bold">
                    No caso de rescisão do contrato de trabalho, você terá direito
                    apenas ao saque da multa rescisória. Após optar, se você quiser
                    voltar para a sistemática Saque-rescisão, a mudança poderá ser
                    feita na hora.
                </p>
            </div>

            <div className="p-8 text-orange-400">
                <div
                    onClick={() => setIsModalOpen(true)}
                    className="bg-zinc-100 py-6 px-4 flex items-center justify-center space-x-2">
                    <HiOutlineDocumentMagnifyingGlass className="text-3xl" />
                    <span>Visualizar termos de adesão</span>
                </div>
            </div>

            <div className="px-5 mb-8">
                <div className="flex justify-between items-center">
                    <span>Li e aceito os termos e condições</span>
                    <input
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={handleTermsChange}
                        className="w-6 h-6 text-orange-400 rounded-lg"
                    />
                </div>
            </div>

            <div className="px-4 mb-10">
                <button
                    onClick={handleOptIn}
                    disabled={!acceptedTerms}
                    className={`w-full text-white text-lg rounded-lg p-3 ${acceptedTerms ? "bg-orange-400" : "bg-gray-400"
                        }`}
                >
                    Optar pelo Saque-aniversário
                </button>
            </div>

            {/* Modal de Termos de Adesão */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                style={modalStyles}
                contentLabel="Termos de Adesão"
            >
                <div className="text-center">
                    <h2 className="text-xl font-bold mb-4">Termos de Adesão</h2>
                    <p className="text-gray-600 mb-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Curabitur vel viverra magna. Nulla facilisi. Cras mattis
                        condimentum risus, nec gravida metus tincidunt ut.
                        Suspendisse potenti. Donec faucibus lacus ut justo eleifend,
                        vel facilisis erat aliquet. Phasellus at magna non nunc
                        vehicula consectetur.
                    </p>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="bg-orange-400 text-white px-6 py-2 rounded-lg w-full"
                    >
                        Fechar
                    </button>
                </div>
            </Modal>
        </div>
    );
}
