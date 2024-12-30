import { useState, useEffect } from "react";
import logo from "../assets/logo-colorido.png"
import { UserData } from "../types/userData";
import dayjs from "dayjs";
import ingresso from "../assets/ingresso.webp"
import { FaSpinner } from "react-icons/fa";
import Vimeo from '@u-wave/react-vimeo';
import { BsTrophy } from "react-icons/bs";
import { Footer } from "../components/footer";

export function Loading() {
    const [progress, setProgress] = useState(0);
    const [loadingData, setLoadingData] = useState(true);
    const [userData, setUserData] = useState<UserData>({
        nome: "",
        cpf: "",
        dataNascimento: "",
        nomeMae: "",
        email: "",
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


    // Função para atualizar a barra de progresso de forma fluida em 30 segundos
    useEffect(() => {
        const start = Date.now();
        const duration = 75000; // 1 min e 15 segundos

        const updateProgress = () => {
            const timeElapsed = Date.now() - start;
            const newProgress = Math.min((timeElapsed / duration) * 100, 100);

            setProgress(newProgress);

            if (newProgress < 100) {
                requestAnimationFrame(updateProgress);
            }
        };

        updateProgress();

        // Simulação de carregamento dos dados do usuário
        setTimeout(() => {
            setLoadingData(false); // Carregamento concluído
        }, 5000); // Simulação de 5 segundos
    }, []);

    const isButtonDisabled = progress < 100; // Verifica se o botão deve ser desativado

    const getInitials = (name: string) => {
        if (!name) return "";
        const nameArray = name.split(" ");
        const firstInitial = nameArray[0]?.[0] || "";
        const lastInitial = nameArray[nameArray.length - 1]?.[0] || "";
        return (firstInitial + lastInitial).toUpperCase();
    };

    return (

        <>
            <header className="flex items-center w-full justify-between p-3 border-b border-b-zinc-300 shadow-lg">
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
            <div className="w-screen h-screen bg-cinza flex flex-col items-center px-6 space-y-5 mt-6">


                <div className="px-2">
                    <Vimeo
                        video="1042989291"
                        autoplay
                        width={360}
                        showTitle={false}
                    />
                </div>

                <h2 className="text-xl text-zinc-500 font-bold">APERTE O PLAY ▶</h2>

                <div className="text-center">
                    <h2 className="text-lg text-zinc-500 mb-2">Estamos preparando seu acesso...</h2>
                    <p className="text-sm text-zinc-400">
                        Aguarde enquanto o sistema carrega suas informações
                    </p>
                </div>

                {/* Barra de progresso fluida */}
                <div className="w-full bg-gray-300 rounded-full h-4">
                    <div
                        className="bg-primary h-4 rounded-full transition-all ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>



                <span className="text-2xl text-zinc-600">
                    {Math.floor(progress)}% concluído
                </span>

                <div className="px-3 w-full">
                    {isButtonDisabled! ? (
                        <button
                            className="w-full py-3 rounded-md text-white text-xl focus:outline-none bg-zinc-400 opacity-60"
                            disabled
                        >
                            <div className="flex items-center justify-center space-x-2">
                                <FaSpinner className="animate-spin" />
                                <span>Carregando</span>
                            </div>
                        </button>

                    ) : (
                        <a href="/menu" onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola para o topo com efeito suave
                        }} className="w-full">
                            <button
                                className="w-full py-3 rounded-md text-white text-xl focus:outline-none bg-primary hover:bg-pink-800 animate-bounce mt-3"
                            >
                                Próxima etapa
                            </button>
                        </a>
                    )}
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
                            <p className="text-zinc-600">
                                <strong>Nome Completo:</strong> {userData?.nome}
                            </p>
                            <p className="text-zinc-600">
                                <strong>CPF:</strong> {userData?.cpf}
                            </p>
                            {userData?.nomeMae && (
                                <p className="text-zinc-600">
                                    <strong>Nome da mãe:</strong> {userData.nomeMae}
                                </p>
                            )}
                            <p className="text-zinc-600">
                                <strong>Data de Nascimento:</strong> {dayjs(userData?.dataNascimento).format("DD/MM/YYYY")}
                            </p>
                        </div>
                    )}
                </div>

                <img src={ingresso} alt="" />

                <Footer />
            </div>
        </>
    );
}
