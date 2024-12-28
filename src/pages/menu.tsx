import { useEffect, useState } from "react";
import { UserData } from "../types/userData";
import logo from "../assets/logo-colorido.png";
import { BsSpeedometer2, BsTrophy, BsUnlock } from "react-icons/bs";
// import { GrDown } from "react-icons/gr";
import { PiHandCoins } from "react-icons/pi";
import { TbPigMoney } from "react-icons/tb";
import { AiOutlineBank } from "react-icons/ai";
import { CgCreditCard } from "react-icons/cg";
import { MdOutlineLocalOffer } from "react-icons/md";
import { Footer } from "../components/footer";

export function Menu() {
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

    const [score,] = useState(294); // Score exemplo

    // Determina a cor com base no score
    const getScoreColor = () => {
        if (score <= 300) return "bg-red-500";
        if (score <= 700) return "bg-yellow-500";
        return "bg-green-500";
    };

    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    const getInitials = (name: string) => {
        if (!name) return "";
        const nameArray = name.split(" ");
        const firstInitial = nameArray[0]?.[0] || ""; // Primeira inicial
        const lastInitial = nameArray[nameArray.length - 1]?.[0] || ""; // Inicial do último nome
        return (firstInitial + lastInitial).toUpperCase();
    };

    const handleRedirect = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola para o topo com efeito suave
        window.location.href = "/ofertas"
    };


    return (
        <div>
            <header className="flex items-center justify-between p-3">
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

            <main className="bg-cinza p-6">
                <div className="bg-white p-6" onClick={handleRedirect}>
                    <div className="bg-white border-2 border-zinc-300 p-4 rounded-lg flex items-center gap-5">
                        <PiHandCoins className="text-7xl text-primary" />
                        <div>
                            <div className="text-2xl font-semibold">Empréstimo</div>
                            <span className="text-xl">Peça o crédito que você precisa</span>
                        </div>
                    </div>
                </div>

                <div className="p-2">
                    <button onClick={handleRedirect} className="w-full bg-primary text-white text-2xl font-semibold">
                        Pedir Empréstimo
                    </button>
                </div>

                <div className="flex items-start p-4 h-40 gap-12 overflow-x-auto">
                    <div onClick={handleRedirect} className="text-center flex flex-col items-center space-y-1">
                        <div className="bg-white w-fit p-4">
                            <AiOutlineBank className="text-4xl text-zinc-500" />
                        </div>
                        <span>Simular <br />Empréstimo</span>
                    </div>

                    <div onClick={handleRedirect} className="text-center flex flex-col items-center space-y-1">
                        <div className="bg-white w-fit p-4">
                            <CgCreditCard
                                className="text-4xl text-zinc-500" />
                        </div>
                        <span>Crédito p/ <br />Negativados</span>
                    </div>

                    <div onClick={handleRedirect} className="text-center flex flex-col items-center space-y-1">
                        <div className="bg-white w-fit p-4">
                            <TbPigMoney className="text-4xl text-zinc-500" />
                        </div>
                        <span>Empréstimo <br />Consignado</span>
                    </div>

                    <div onClick={handleRedirect} className="text-center flex flex-col items-center space-y-1">
                        <div className="bg-white w-fit p-4">
                            <MdOutlineLocalOffer className="text-4xl text-zinc-500" />
                        </div>
                        <span>Consultar <br />Ofertas</span>
                    </div>

                </div>

                <div className="space-y-4 mt-6">
                    <h3 className="text-2xl font-bold">Entenda seu momento financeiro</h3>
                    <div className="bg-white p-4 rounded-lg space-y-5">
                        <h4 className="font-bold text-xl">Serasa Score</h4>
                        <div className="flex items-center space-x-4">
                            <div className="text-5xl font-bold">{score}</div>
                            <span className="bg-red-100 p-1 px-5 rounded-full text-lg font-medium text-zinc-600">
                                {score <= 300 ? "Baixo" : score <= 700 ? "Médio" : "Alto"}
                            </span>
                        </div>

                        {/* Barra de score */}
                        <div className="relative mt-4">
                            {/* Barra de fundo */}
                            <div className="h-4 w-full bg-zinc-300 rounded-lg"></div>

                            {/* Barra preenchida */}
                            <div
                                className={`absolute top-0 left-0 h-4 rounded-lg ${getScoreColor()}`}
                                style={{ width: `${(score / 1000) * 100}%` }}
                            ></div>
                        </div>

                        {/* Marcadores */}
                        <div className="flex justify-between text-sm text-zinc-600 mt-2">
                            <span>0</span>
                            <span>.</span>
                            <span>500</span>
                            <span>.</span>
                            <span>1000</span>
                        </div>


                        <div className="space-y-6">
                            <div className="flex justify-start gap-4">
                                <div>
                                    <BsSpeedometer2 className="text-primary text-4xl" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-zinc-400 text-lg">Conecte suas contas</span>
                                    <div className="text-xl">
                                        Melhore a análise do seu perfil financeiro com suas contas bancárias, FGTS, e de aplicativos de trabalho
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-start gap-4">
                                <div>
                                    <BsUnlock className="text-primary text-4xl" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-zinc-400 text-lg">Serasa Score desbloqueado</span>
                                    <div className="text-xl">
                                        Empresas podem ver seu Score
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-2 my-4">
                    <button onClick={handleRedirect} className="w-full bg-primary text-white text-2xl font-semibold">
                        Pedir Empréstimo
                    </button>
                </div>

                <Footer />
            </main>

        </div>
    );
}
