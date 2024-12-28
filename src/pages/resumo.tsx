import cresol from "../assets/cresol.jpg";
import sicoob from "../assets/sicoob.png";
import { loanData } from "../types/loanData";
import logo from "../assets/serasa-verde.png";
import { useState, useEffect } from "react";
import {  GrUp } from "react-icons/gr";
import { UserData } from "../types/userData";
import { IoMenu } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import { HiOutlineCreditCard } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

export function Resumo() {

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

    const navigate = useNavigate()

    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    const [loanData, setLoanData] = useState<loanData>({
        bank: "",
        installments: 0,
        loanAmount: 0,
        installmentCount: ""
    });

    useEffect(() => {
        const storedLoanData = localStorage.getItem("loanData");
        if (storedLoanData) {
            setLoanData(JSON.parse(storedLoanData));
        }
    }, []);

    const getInitials = (name: string) => {
        if (!name) return "";
        const nameArray = name.split(" ");
        const firstInitial = nameArray[0]?.[0] || ""; // Primeira inicial
        const lastInitial = nameArray[nameArray.length - 1]?.[0] || ""; // Inicial do último nome
        return (firstInitial + lastInitial).toUpperCase();
    };

    return (
        <div>
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
                            {/* <GrDown className="font-bold text-2xl" /> */}
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center p-4 border shadow-lg">
                    <IoIosArrowBack className="text-3xl text-primary" />
                    <div className="text-zinc-400 text-xl font-semibold">Revisão do pedido</div>
                    <div> </div>
                </div>
            </header>

            <main className="p-4 bg-cinza space-y-8 h-screen mb-96">
                <h1 className="text-3xl font-bold mt-3">
                    Revisão da oferta escolhida
                </h1>

                <div className="bg-white rounded-lg p-5 space-y-4">
                    <div className="text-xl font-bold">
                        Empréstimo Pessoal - {loanData?.bank}
                    </div>
                    <div className="flex items-center justify-between">
                        {loanData?.bank == "Cresol" && (
                            <img src={cresol} width={150} alt="" />
                        )}

                        {loanData?.bank == "Sicoob" && (
                            <img src={sicoob} width={120} alt="" />
                        )}
                        <div className="flex  flex-col items-end">
                            <h3 className="text-2xl font-bold">{loanData?.loanAmount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</h3>
                            <span className="text-xl text-zinc-500">em {loanData?.installments}x de R$ {loanData?.installmentCount}</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Serasa Score desbloqueado!</h2>
                    <div className="flex items-center space-x-4 bg-white rounded-lg p-4">
                        <FaRegCheckCircle className="text-5xl text-emerald-500" />
                        <span className="text-zinc-500 text-lg">O seu Serasa Score está desbloqueado para consultar!</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Entenda os juros</h2>
                    <div className="bg-white p-4 space-y-4">
                        <div className="flex items-center justify-between space-x-4  rounded-lg">
                            <div className="items-center flex space-x-3">
                                <HiOutlineCreditCard className="text-4xl text-blue-500" />
                                <h3 className="font-bold text-2xl">
                                    Taxas e Juros
                                </h3>
                            </div>

                            <GrUp className="font-bold text-2xl" />
                        </div>

                        <div>
                            <div className="flex justify-between text-zinc-500 items-center py-4 border-y">
                                <h4 className="text-xl  font-bold w-52">
                                    Parcelas
                                </h4>
                                <span className="text-xl font-semibold">{loanData?.installments}</span>
                            </div>

                            <div className="flex justify-between gap-14 text-zinc-500 items-center py-4 border-y">
                                <h4 className="text-xl  font-bold w-52">
                                    CET - Custo Efeivo Total
                                </h4>
                                <span className="text-xl font-semibold w-52">Taxa de 2% (ao mês) e 24% (ao ano)</span>
                            </div>

                            <div className="flex justify-between gap-14 text-zinc-500 items-center py-4 border-y">
                                <h4 className="text-xl  font-bold w-52">
                                    Juros
                                </h4>
                                <span className="text-xl font-semibold w-52">Taxa de 1% (ao mês) e 12% (ao ano)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col space-y-4 text-zinc-500 text-lg p-2">
                    <div>
                        - Os <span className="font-bold">valores dos empréstimos e cartões ofertados no Serasa Crédito</span> podem sofrer alterações após a análise feita pelo parceiro de crédito.
                    </div>

                    <div>
                        - Ao enviar sua solicitação ao credor, <span className="font-bold">a Serasa também informará o seu nome completo</span> como consta no site da Receita Federal
                    </div>
                </div>

            </main>

            <a href="/carregandoemprestimo" className="flex items-center justify-between bg-white p-8 pt-12 fixed bottom-0 w-full shadow-lg">

                <button onClick={() => {
                    navigate("/carregandoemprestimo")
                }} className="w-full bg-emerald-500 text-white text-3xl animate-bounce font-semibold">
                    Pedir Empréstimo
                </button>

            </a>
        </div>
    )
}