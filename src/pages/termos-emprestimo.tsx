import { useState, useEffect } from "react";
import { loanData } from "../types/loanData";
import { UserData } from "../types/userData";
import logo from "../assets/serasa-verde.png";
import { GrDown } from "react-icons/gr";
import { IoIosArrowBack } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export function TermosEmprestimo() {

    const [userData, setUserData] = useState<UserData>({
        nome: "",
        cpf: "",
        dataNascimento: "",
        email: "",
        nomeMae: "",
        cep: "",
        cidade: "",
        estado: "",
        rua: "",
        numero: "",
    });

    const [loanData, setLoanData] = useState<loanData>({
        bank: "",
        installments: 0,
        loanAmount: 0,
        installmentCount: "",
    });

    const getInitials = (name: string) => {
        if (!name) return "";
        const nameArray = name.split(" ");
        const firstInitial = nameArray[0]?.[0] || ""; // Primeira inicial
        const lastInitial = nameArray[nameArray.length - 1]?.[0] || ""; // Inicial do último nome
        return (firstInitial + lastInitial).toUpperCase();
    };

    const navigate = useNavigate()

    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }

        const storedLoanData = localStorage.getItem("loanData");
        if (storedLoanData) {
            setLoanData(JSON.parse(storedLoanData));
        }
    }, []);

    return (
        <div className="min-h-screen bg-zinc-50 flex flex-col justify-between">
            <header className="flex flex-col">
                <div className="flex items-center justify-between p-4 bg-zinc-50">
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="logo" width={50} />
                        <IoMenu className="text-3xl text-emerald-500" />
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-emerald-500 p-2 text-xl rounded-full w-fit text-white">
                                {getInitials(userData?.nome)}
                            </div>
                            <GrDown className="font-bold text-2xl" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center p-4 border shadow-lg">
                    <IoIosArrowBack className="text-3xl text-zinc-500" />
                    <div className="text-zinc-500 text-xl font-semibold">Assinatura do Contrato</div>
                    <div> </div>
                </div>
            </header>

            <main className="p-6 space-y-8 pb-36">
                <section className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-emerald-600">Informações do Cliente</h2>
                    <div className="text-zinc-600 space-y-2 mt-4">
                        <p><strong>Nome:</strong> {userData.nome}</p>
                        <p><strong>CPF:</strong> {userData.cpf}</p>
                        <p><strong>Data de Nascimento:</strong> {userData.dataNascimento}</p>
                    </div>
                </section>

                <section className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-emerald-600">Termos e Condições</h2>
                    <p className="text-zinc-600 mt-4">
                        Ao confirmar o contrato, você concorda com os seguintes termos do empréstimo oferecido pelo banco <span className="font-bold">{loanData.bank}</span>:
                    </p>

                    <div className="text-zinc-600 space-y-2 mt-4">
                        <p><strong>Banco:</strong> {loanData.bank}</p>
                        <p><strong>Valor Total:</strong> {loanData.loanAmount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                        <p><strong>Parcelas:</strong> {loanData.installments}x de {loanData.installmentCount}</p>
                        <p><strong>CET:</strong> Taxa de 2% ao mês e 24% ao ano</p>
                        <p><strong>Juros:</strong> Taxa de 1% ao mês e 12% ao ano</p>
                    </div>

                    <p className="text-zinc-600 mt-4">
                        O valor e as condições podem ser revisados após análise do credor. Caso aprovado, o empréstimo estará sujeito às condições detalhadas acima. Ao enviar a solicitação, os dados fornecidos, incluindo nome completo e CPF, serão compartilhados com o parceiro de crédito. Recomendamos que você revise cuidadosamente os termos antes de prosseguir.
                    </p>
                </section>
            </main>

            <footer className="bg-white p-8 pt-10  fixed bottom-0 w-full flex flex-col justify-between items-center shadow-md">

                <button onClick={() => {
                    navigate("/gerente")
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                }
                } className="bg-emerald-500 w-full animate-bounce text-white text-3xl px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark">
                    Aceitar e Confirmar
                </button>
                {/* <button className="bg-gray-200 w-full text-gray-700 text-xl px-6 py-3 rounded-lg font-semibold hover:bg-gray-400">
                    Desistir do empréstimo
                </button> */}

            </footer>
        </div>
    );
}
