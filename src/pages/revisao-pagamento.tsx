import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsTrophy } from "react-icons/bs";
import { GrDown } from "react-icons/gr";
import logo from "../assets/logo-colorido.png";
import { Footer } from "../components/footer";
import { UserData } from "../types/userData";

export function RevisaoPagamento() {
    const navigate = useNavigate();

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

    const [paymentData, setPaymentData] = useState({
        method: "",
        pixKey: "",
        bankAccount: {
            bankName: "",
            agency: "",
            accountNumber: "",
            accountType: "",
        },
    });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }

        const storedPaymentData = localStorage.getItem("paymentData");
        if (storedPaymentData) {
            setPaymentData(JSON.parse(storedPaymentData));
        }
    }, []);

    const getInitials = (name: string) => {
        if (!name) return "";
        const nameArray = name.split(" ");
        const firstInitial = nameArray[0]?.[0] || "";
        const lastInitial = nameArray[nameArray.length - 1]?.[0] || "";
        return (firstInitial + lastInitial).toUpperCase();
    };

    const handleConfirm = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola para o topo com efeito suave
            
            navigate("/aberturaconta");
        }, 3000);
    };

    return (
        <div>
            {/* Header */}
            <header className="flex items-center justify-between p-3">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="logo" width={60} />
                    <div>
                        <div className="font-bold text-lg">Olá, {userData?.nome.split(" ")[0]}</div>
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

            {/* Main */}
            <main className="bg-cinza p-6">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-screen">
                        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-primary"></div>
                        <p className="text-xl font-semibold mt-4 text-gray-700">Processando...</p>
                    </div>
                ) : (
                    <div className="bg-white p-8 text-center flex flex-col items-center rounded-lg gap-4">
                        <h1 className="text-3xl font-semibold text-gray-700">Revise suas Informações de Pagamento</h1>

                        {/* Exibição das Informações */}
                        <div className="mt-6 w-full max-w-md space-y-6 text-left">
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-700">Método de Pagamento:</h2>
                                <p className="text-gray-600 text-2xl">
                                    {paymentData.method === "pix" ? "Chave PIX" : "Conta Bancária"}
                                </p>
                            </div>

                            {paymentData.method === "pix" && (
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-700">Chave PIX:</h2>
                                    <p className="text-gray-600 text-2xl">{paymentData.pixKey}</p>
                                </div>
                            )}

                            {paymentData.method === "bank" && (
                                <div className="space-y-4">
                                    <div>
                                        <h2 className="text-2xl font-semibold text-gray-700">Banco:</h2>
                                        <p className="text-gray-600 text-2xl">{paymentData.bankAccount.bankName}</p>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-semibold text-gray-700">Agência:</h2>
                                        <p className="text-gray-600 text-2xl">{paymentData.bankAccount.agency}</p>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-semibold text-gray-700">Número da Conta:</h2>
                                        <p className="text-gray-600 text-2xl">{paymentData.bankAccount.accountNumber}</p>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-semibold text-gray-700">Tipo de Conta:</h2>
                                        <p className="text-gray-600 text-2xl">
                                            {paymentData.bankAccount.accountType === "corrente" ? "Conta Corrente" : "Conta Poupança"}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Botões */}
                        <div className="flex flex-col w-full gap-4 mt-8">
                            <button
                                onClick={handleConfirm}
                                className="bg-primary w-full text-white font-semibold rounded-lg py-3 px-6 text-lg"
                            >
                                Confirmar
                            </button>
                            <button
                                onClick={() => navigate("/cadastropagamento")}
                                className="bg-gray-300 w-full text-gray-700 font-semibold rounded-lg py-3 px-6 text-lg"
                            >
                                Editar
                            </button>
                        </div>
                    </div>
                )}
                <Footer />
            </main>
        </div>
    );
}
