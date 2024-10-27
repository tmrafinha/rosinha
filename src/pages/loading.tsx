import { useState, useEffect } from "react";
import { AiFillLock } from "react-icons/ai"; // Ícone de cadeado, usando react-icons
import logo from "../assets/caixa.webp";
import { api } from "../config/axios";

export function Loading() {
    const [progress, setProgress] = useState(0);
    const [loadingData, setLoadingData] = useState(true);
    const [userData, setUserData] = useState({
        nome: "",
        cpf: "",
        dataNascimento: ""
    });



    useEffect(() => {
        api.get('cpf', {
            params: {
                query: '05386714910',
                apikey: 'amdrafa'
            }
        })
            .then((response) => {
                console.log(response.data);
                setUserData(response.data);
                setLoadingData(false);
            })
            .catch((error) => {
                console.error("Erro ao carregar os dados:", error);
            });
    }, []);


    // Função para atualizar a barra de progresso de forma fluida em 30 segundos
    useEffect(() => {
        const start = Date.now();
        const duration = 30000; // 30 segundos

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
            setUserData({
                nome: "RAFAEL AMARO MOREIRA",
                cpf: "053.867.149-10",
                dataNascimento: "30/09/2001",
            });
            setLoadingData(false); // Carregamento concluído
        }, 5000); // Simulação de 5 segundos
    }, []);

    const isButtonDisabled = progress < 100; // Verifica se o botão deve ser desativado

    return (
        <div className="w-screen h-screen flex flex-col items-center px-6 space-y-8 mt-6">
            <header className="flex flex-col items-center p-4 space-y-3">
                <img width={170} src={logo} alt="logo" />
                <span className="text-blue-800">Acesso Caixa</span>
            </header>

            <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                <p className="text-gray-600">
                    VSL (Video Sales Letter) - Assista enquanto o acesso é liberado
                </p>
            </div>

            <div className="text-center">
                <h2 className="text-lg text-zinc-500 mb-2">Estamos preparando seu acesso...</h2>
                <p className="text-sm text-zinc-400">
                    Aguarde enquanto o sistema carrega suas informações
                </p>
            </div>

            {/* Barra de progresso fluida */}
            <div className="w-full bg-gray-300 rounded-full h-4">
                <div
                    className="bg-orange-500 h-4 rounded-full transition-all ease-linear"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <span className="text-sm text-zinc-600 mt-2">
                {Math.floor(progress)}% concluído
            </span>

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
                            <strong>CPF:</strong> {userData.cpf}
                        </p>
                        <p className="text-zinc-600">
                            <strong>Data de Nascimento:</strong> {userData.dataNascimento}
                        </p>
                    </div>
                )}
            </div>

            {/* Botão com cadeado e comportamento dinâmico */}
            <button
                onClick={() => alert("Acesso liberado!")}
                className={`w-full text-white rounded-sm flex items-center justify-center h-10 mt-4 ${isButtonDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-400"
                    }`}
                disabled={isButtonDisabled}
            >
                {isButtonDisabled ? (
                    <>
                        Carregando acesso <AiFillLock className="ml-2" />
                    </>
                ) : (
                    "Acessar FGTS"
                )}
            </button>
        </div>
    );
}
