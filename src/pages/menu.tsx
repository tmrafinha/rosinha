import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiExchangeDollarFill } from "react-icons/ri";
import { FaAngleRight, FaExchangeAlt, FaInfo } from "react-icons/fa";
import { OverlayNavigation } from "../components/overlay-nav";
import logo from "../assets/caixalogo.png";
import fgts from "../assets/fgts2.png";
import { BiDollar } from "react-icons/bi";
import flogo from "../assets/f-logo.png"
import { UserData } from "../types/userData";

export function Menu() {
    const navigate = useNavigate();
    const [hasPixKey, setHasPixKey] = useState<boolean>(false);

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
        numero: ""
    });

    // Carregar os dados do localStorage ao montar o componente
    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    // Verifica no localStorage se há chaves PIX cadastradas
    useEffect(() => {
        const storedPixList = localStorage.getItem("pixList");
        if (storedPixList && JSON.parse(storedPixList).length > 0) {
            setHasPixKey(true);
        }
    }, []);

    // Função para redirecionar dinamicamente com base nas chaves cadastradas
    const handleAccountNavigation = () => {
        if (hasPixKey) {
            navigate("/cadastrarchave");
        } else {
            navigate("/contabancaria");
        }
    };

    return (
        <div className="w-screen h-screen flex flex-col items-center text-white mb-20">
            <header className="flex w-full flex-col p-4 space-y-8 bg-[#025bab] pb-8">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                        <img width={34} src={logo} alt="logo" />
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
                    onClick={handleAccountNavigation}
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

            {/* Overlay Navigation */}
            <OverlayNavigation activeOption="Principal" />
        </div>
    );
}
