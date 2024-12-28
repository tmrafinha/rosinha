import { useEffect, useState } from "react";
import { BsTrophy } from "react-icons/bs";
import { FaClock, FaCreditCard, FaGift } from "react-icons/fa";
import { Footer } from "../components/footer";
import logo from "../assets/logo-colorido.png";
import { UserData } from "../types/userData";
import cresol from "../assets/cresol.jpg";
import sicoob from "../assets/sicoob.png";
import pix from "../assets/pix.png";
// import { GrDown } from "react-icons/gr";
import { loanData } from "../types/loanData";

export function OfertaCredito() {
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

    function formatReal(valor: number) {
        return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }

    const getInitials = (name: string) => {
        if (!name) return "";
        const nameArray = name.split(" ");
        const firstInitial = nameArray[0]?.[0] || "";
        const lastInitial = nameArray[nameArray.length - 1]?.[0] || "";
        return (firstInitial + lastInitial).toUpperCase();
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            {/* Header */}
            <header className="flex items-center justify-between p-3 border-b border-b-zinc-300 shadow-lg">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="logo" width={60} />
                    <div>
                        <div className="font-bold text-lg">
                            Olá, {userData?.nome.split(" ")[0]}
                        </div>
                        <span>{userData?.dataNascimento}</span>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <BsTrophy className="text-3xl" />
                    <div className="flex items-center gap-3">
                        <div className="bg-primary p-2 text-xl rounded-full w-fit text-white">
                            {getInitials(userData?.nome)}
                        </div>
                        {/* <GrDown className="font-bold text-2xl" /> */}
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="p-5">
                <section className="text-center px-6 bg-white rounded-lg p-4">

                    {loanData?.bank == "Cresol" ? (
                        <img src={cresol} alt="Cresol" width={200} className="mx-auto mb-3" />
                    ) : (
                        <img src={sicoob} alt="sicoob" width={120} className="mx-auto mb-3 p-2" />
                    )}

                    <h1 className="text-4xl font-bold text-zinc-600 mb-4">
                        Para receber seu empréstimo <br /> de <span className="text-emerald-600">{formatReal(loanData?.loanAmount)}</span>, é preciso pagar a taxa de <span className="text-emerald-600">abertura de conta</span>
                    </h1>
                    <p className="text-xl text-gray-700 mb-6">
                        Ao pagar essa taxa de abertura de conta <span className="font-bold">o dinheiro cairá na sua conta em até 5 minutos</span>, A taxa é obrigatória para todas as Pessoas Físicas que desejam abrir conta na cooperativa {loanData?.bank}
                    </p>
                    <div className="space-y-3 my-6">
                        <span className="text-3xl text-zinc-500">Valor da taxa:</span>
                        <h3 className="text-5xl font-bold text-zinc-600">R$ 29,90</h3>
                        <img src={pix} alt="Pagamento via Pix" width={130} className="mx-auto mb-6" />
                    </div>

                    <a href="https://pay.aberturacoop.shop/RmA83EjNNarZPVp">
                        <button
                            className="bg-emerald-500 mt-5 text-white text-2xl font-semibold rounded-lg py-4 px-8 w-full max-w-lg mx-auto hover:bg-emerald-700 transition animate-bounce"
                        >
                            PAGAR TAXA DE ABERTURA
                        </button>
                    </a>
                </section>

                {/* Benefícios */}
                <section className="my-10 px-6">
                    <h2 className="text-3xl font-semibold text-primary text-center mb-8">
                        Por que pagar a taxa agora?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 p-4">
                        <div className="text-center">
                            <FaClock className="text-6xl text-primary mx-auto" />
                            <p className="text-xl mt-4 text-gray-700 font-bold">Dinheiro na Conta em Minutos</p>
                            <p className="text-lg text-gray-500 mt-2">
                                Após a aprovação, o valor estará disponível na sua conta em até 5 minutos.
                            </p>
                        </div>
                        <div className="text-center">
                            <FaCreditCard className="text-6xl text-primary mx-auto" />
                            <p className="text-xl mt-4 text-gray-700 font-bold">Cartão de Crédito Exclusivo</p>
                            <p className="text-lg text-gray-500 mt-2">
                                Tenha acesso ao cartão de crédito da cooperativa, com vantagens únicas para você.
                            </p>
                        </div>
                        <div className="text-center">
                            <FaGift className="text-6xl text-primary mx-auto" />
                            <p className="text-xl mt-4 text-gray-700 font-bold">Benefícios Especiais</p>
                            <p className="text-lg text-gray-500 mt-2">
                                Aproveite condições exclusivas e vantagens que só nossa cooperativa oferece.
                            </p>
                        </div>
                    </div>
                </section>


                {/* Prova Social / Urgência */}
                <section className="bg-gray-200 py-10 px-6 text-center">
                    <h2 className="text-2xl font-semibold text-primary mb-4">Pague a taxa de abertura de conta e receba seu dinheiro!</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Ao pagar a taxa de abertura de conta no valor de R$29,90, você garante acesso ao empréstimo de forma rápida e sem complicação. <br /> Esta oportunidade pode ser encerrada a qualquer momento.
                    </p>

                    <a href="https://pay.aberturacoop.shop/RmA83EjNNarZPVp">

                        <button
                            className="bg-primary text-white text-2xl font-semibold rounded-lg py-4 px-8 w-full max-w-lg mx-auto hover:bg-pink-700 transition"
                        >
                            PAGAR AGORA
                        </button>

                    </a>
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
