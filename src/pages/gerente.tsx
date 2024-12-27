import { useEffect, useState } from "react";
import { UserData } from "../types/userData";
import logo from "../assets/logo-colorido.png";
import matheus from "../assets/matheus.jpg";
import { BsTrophy } from "react-icons/bs";
import { GrDown } from "react-icons/gr";
import { Footer } from "../components/footer";
import { useNavigate } from "react-router-dom";

export function Gerente() {
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
    const [whatsapp, setWhatsapp] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    const navigate = useNavigate()

    const getInitials = (name: string) => {
        if (!name) return "";
        const nameArray = name.split(" ");
        const firstInitial = nameArray[0]?.[0] || ""; // Primeira inicial
        const lastInitial = nameArray[nameArray.length - 1]?.[0] || ""; // Inicial do último nome
        return (firstInitial + lastInitial).toUpperCase();
    };

    const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const regex = /^\d{10,11}$/; // Aceita apenas números com 10 ou 11 dígitos

        setWhatsapp(value);
        if (!regex.test(value)) {
            setError("Digite um número de WhatsApp válido (com DDD, sem espaços ou traços).");
        } else {
            setError("");
        }
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
                        <GrDown className="font-bold text-2xl" />
                    </div>
                </div>
            </header>

            <main className="bg-cinza p-6">

                <div className="bg-white p-4 text-center flex flex-col items-center rounded-lg">
                    <div className="mb-4">
                        <h1 className="text-2xl font-semibold text-primary">Ótimo, quase lá!</h1>
                        <p className="text-2xl text-zinc-500">Conheça seu Gerente Responsável!</p>
                    </div>

                    <div className="border flex flex-col items-center p-3 border-zinc-300">
                        <img src={matheus} alt="matheus" width={180} />
                        <div className="text-xl mt-2 text-zinc-500">
                            Gerente
                        </div>
                        <span className="font-bold text-xl text-primary">Matheus Barbosa</span>
                        <div>Prêmio: Melhor gerente 2023</div>
                    </div>
                </div>

                <div className="bg-white p-8 mt-6 text-center flex flex-col items-center rounded-lg gap-4">
                    <label htmlFor="whatsapp" className="text-2xl font-semibold text-gray-700">
                        Insira seu WhatsApp para continuar:
                    </label>
                    <input
                        id="whatsapp"
                        type="text"
                        value={whatsapp}
                        onChange={handleWhatsappChange}
                        className="border border-gray-300  rounded-lg p-4 w-full max-w-md text-2xl"
                        placeholder="(00) 00000-0000"
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        onClick={() => {
                            if (whatsapp && !error) {
                                navigate("/cadastropagamento")
                            }
                        }}
                        disabled={!!error || !whatsapp}
                        className="bg-primary w-full text-white text-2xl font-semibold rounded-lg py-2 px-6 mt-4 disabled:bg-gray-400"
                    >
                        Continuar
                    </button>
                </div>

                <Footer />
            </main>

        </div>
    );
}
