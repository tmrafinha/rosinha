import { useState } from "react";
import Modal from "react-modal";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import cresol from "../assets/cresol.jpg";
import sicoob from "../assets/sicoob.png";
import boneco from "../assets/boneco-credito.png";

// Estilo do Modal
const modalStyles = {
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

Modal.setAppElement("#root");

export function Ofertas() {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [loanAmount, setLoanAmount] = useState(0);
    const [installments, setInstallments] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");


    const banks = [
        {
            name: "Cresol",
            logo: cresol
        },
        {
            name: "Sicoob",
            logo: sicoob
        },
    ]

    const installmentOptions = [12, 24, 36, 48, 84];
    const maxLoanAmount = 50000;

    const calculateInstallmentValue = () => {
        const interestRate = 0.01; // Taxa de juros fictícia de 1%
        return ((loanAmount * (1 + interestRate * installments)) / installments).toFixed(2);
    };

    const handleLoanAmountChange = (e: { target: { value: string; }; }) => {
        const value = Number(e.target.value.replace(/\D/g, ""));
        if (value > maxLoanAmount) {
            setErrorMessage(`O valor máximo permitido é R$ ${maxLoanAmount.toLocaleString()}`);
        } else {
            setErrorMessage("");
            setLoanAmount(value);
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const saveToLocalStorage = (bank: string) => {
        const data = {
            loanAmount,
            installments,
            bank,
            installmentCount: calculateInstallmentValue()
        };
        localStorage.setItem("loanData", JSON.stringify(data));
    };

    const handleAction = (bank: string) => {
        saveToLocalStorage(bank);
        window.location.href = "/emprestimo";
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            <header className="p-4 py-8 flex items-center justify-around text-xl">
                <MdOutlineKeyboardArrowLeft className="text-4xl text-primary" />
                <div className="border-b-2 border-b-zinc-300 w-1/2 flex justify-center">Voltar</div>
                <div className="font-semibold border-b-4 border-b-primary w-1/2 flex justify-center">Empréstimo</div>
            </header>

            <main className="p-6 bg-cinza">
                <div className="bg-white p-6 border-2 border-primary rounded-2xl flex flex-col space-y-4">
                    <div>
                        <h3 className="text-2xl font-bold">Você simulou</h3>
                        <div className="text-xl">R$ {loanAmount.toLocaleString()} parcelado em {installments}x</div>
                    </div>

                    <span onClick={openModal} className="font-bold text-primary text-2xl cursor-pointer">
                        Alterar simulação
                    </span>
                </div>

                <h2 className="font-bold text-2xl my-8 mb-8">Ofertas encontradas (2)</h2>

                <div className="flex flex-col space-y-8 mb-10">
                    {banks.map(({ logo, name }) => (
                        <div
                            key={name}
                            className="flex flex-col p-6 items-center space-y-6 bg-white rounded-lg"
                        >
                            <img src={logo} width={200} alt="Bank logo" />

                            <div className="flex flex-col items-center">
                                <h3 className="font-bold text-2xl">Empréstimo Pessoal</h3>
                                <span className="text-zinc-500 text-lg">Dinheiro na conta em até 30 minutos</span>
                            </div>

                            <div className="flex flex-col items-center">
                                <h3 className="font-bold text-2xl">
                                    Valor até R$ {loanAmount.toLocaleString()}
                                </h3>
                                <span className="text-zinc-500 text-xl">
                                    {installments}x R$ {calculateInstallmentValue()}
                                </span>
                            </div>

                            <div className="flex flex-col space-y-3">
                                <div className="p-2 border text-center border-blue-800 rounded-full">
                                    Média chance de aprovação
                                </div>
                                <div className="p-2 border text-center border-blue-800 rounded-full">
                                    Aceitamos negativados
                                </div>
                            </div>

                            <div className="w-full space-y-2">
                                <button
                                    onClick={() => handleAction(name)}
                                    className="bg-primary w-full p-2 rounded-lg text-2xl text-white"
                                >
                                    Solicitar
                                </button>
                                <button
                                    onClick={() => handleAction(name)}
                                    className="bg-transparent w-full p-2 text-2xl rounded-lg text-primary border-2 border-zinc-300"
                                >
                                    Ver detalhes
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={modalStyles}
                contentLabel="Alterar Simulação"
            >
                <div className="flex flex-col space-y-6">
                    {/* Cabeçalho do Modal */}
                    <div className="flex flex-col items-center space-y-4">
                        {/* <img width={200} src={boneco} alt="boneco" /> */}
                        <h2 className="text-3xl font-bold text-center">Quanto você deseja pegar emprestado?</h2>
                        <span className="text-xl text-center text-zinc-500">
                            Insira o valor do empréstimo e escolha as parcelas para continuar.
                        </span>
                    </div>

                    {/* Entrada de Valor */}
                    <div className="flex flex-col space-y-4">
                        <label htmlFor="loanAmount" className="text-2xl font-semibold">
                            Digite o valor desejado (R$)
                        </label>
                        <input
                            id="loanAmount"
                            type="text"
                            value={loanAmount > 0 ? loanAmount.toLocaleString("pt-BR") : ""}
                            onChange={handleLoanAmountChange}
                            className="p-4 border text-2xl rounded-lg w-full"
                            placeholder="Ex.: 10.000,00"
                        />
                        <span className="text-xl">
                            Valor máximo de R$ 50.000,00
                        </span>
                        {errorMessage && <span className="text-red-500 text-lg">{errorMessage}</span>}
                    </div>

                    {/* Escolha de Parcelas */}
                    <div className="flex flex-col space-y-4">
                        <label className="text-2xl font-semibold">Escolha as Parcelas</label>
                        <div className="flex justify-around space-x-2">
                            {installmentOptions.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => setInstallments(option)}
                                    className={`p-2 text-2xl rounded-lg border w-12 text-center font-semibold ${installments === option
                                        ? "bg-primary text-white"
                                        : "bg-transparent border-primary text-primary"
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Valores Simulados */}
                    {loanAmount > 0 && installments > 0 && (
                        <div className="flex flex-col items-center space-y-1">
                            <h3 className="font-bold text-3xl">
                                Valor até <span className="text-primary">R$ {loanAmount.toLocaleString()}</span>
                            </h3>
                            <span className="text-zinc-500 text-3xl">
                                {installments}x R$ {calculateInstallmentValue()}
                            </span>
                        </div>
                    )}

                    {/* Botão de Confirmação */}
                    <div className="mt-4">
                        <button
                            onClick={closeModal}
                            className={`px-6 py-2 w-full rounded-lg text-2xl font-bold ${loanAmount > 0 && installments > 0
                                ? "bg-primary text-white"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                            disabled={loanAmount <= 0 || installments <= 0}
                        >
                            Confirmar
                        </button>
                    </div>
                </div>
            </Modal>

        </div >
    );
}