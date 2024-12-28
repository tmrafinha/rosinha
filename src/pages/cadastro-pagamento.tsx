import { useState, useEffect, SetStateAction } from "react";
import { BsTrophy } from "react-icons/bs";
import { GrDown } from "react-icons/gr";
import logo from "../assets/logo-colorido.png";
import { Footer } from "../components/footer";
import { UserData } from "../types/userData";
import { useNavigate } from "react-router-dom";

export function CadastroPagamento() {
    const [paymentMethod, setPaymentMethod] = useState("pix");
    const [pixKey, setPixKey] = useState("");
    const [bankAccount, setBankAccount] = useState({
        bankName: "",
        agency: "",
        accountNumber: "",
        accountType: "corrente",
    });
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const storedData = localStorage.getItem("paymentData");
        if (storedData) {
            const data = JSON.parse(storedData);
            setPaymentMethod(data.method || "pix");
            setPixKey(data.pixKey || "");
            setBankAccount(data.bankAccount || {
                bankName: "",
                agency: "",
                accountNumber: "",
                accountType: "corrente",
            });
        }
    }, []);

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

    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    const getInitials = (name: string) => {
        if (!name) return "";
        const nameArray = name.split(" ");
        const firstInitial = nameArray[0]?.[0] || ""; // Primeira inicial
        const lastInitial = nameArray[nameArray.length - 1]?.[0] || ""; // Inicial do último nome
        return (firstInitial + lastInitial).toUpperCase();
    };


    const handlePixKeyChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setPixKey(e.target.value);
        setError("");
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleBankAccountChange = (e: { target: { name: any; value: any; }; }) => {
        setBankAccount({ ...bankAccount, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = () => {
        if (paymentMethod === "pix" && !pixKey) {
            setError("A chave PIX é obrigatória.");
            return;
        }

        if (paymentMethod === "bank" && (!bankAccount.bankName || !bankAccount.agency || !bankAccount.accountNumber)) {
            setError("Todos os campos da conta bancária são obrigatórios.");
            return;
        }

        const dataToSave = {
            method: paymentMethod,
            pixKey: paymentMethod === "pix" ? pixKey : "",
            bankAccount: paymentMethod === "bank" ? bankAccount : {},
        };

        localStorage.setItem("paymentData", JSON.stringify(dataToSave));
        setSuccessMessage("Método de pagamento cadastrado com sucesso!");
        setError("");

        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola para o topo com efeito suave
            navigate("/revisaopagamento")
        }, 1500);
    };

    const navigate = useNavigate()

    return (
        <div>
            {/* Header */}
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

            {/* Main */}
            <main className="bg-cinza p-6">
                <div className="bg-white p-8 text-center flex flex-col items-center rounded-lg gap-4">
                    <h1 className="text-3xl font-semibold text-gray-700">Escolha o Método de Pagamento para Receber seu Empréstimo</h1>

                    {/* Seleção do Método de Pagamento */}
                    <div className="flex gap-6 mt-4">
                        <button
                            className={`px-6 py-3 rounded-lg font-semibold ${paymentMethod === "pix" ? "bg-primary text-white" : "bg-gray-300"
                                }`}
                            onClick={() => setPaymentMethod("pix")}
                        >
                            Chave PIX
                        </button>
                        <button
                            className={`px-6 py-3 rounded-lg font-semibold ${paymentMethod === "bank" ? "bg-primary text-white" : "bg-gray-300"
                                }`}
                            onClick={() => setPaymentMethod("bank")}
                        >
                            Conta Bancária
                        </button>
                    </div>

                    {/* Formulário Dinâmico */}
                    {paymentMethod === "pix" && (
                        <div className="mt-6 w-full max-w-md">
                            <label htmlFor="pixKey" className="text-lg font-semibold text-gray-700">
                                Informe sua chave PIX:
                            </label>
                            <input
                                id="pixKey"
                                type="text"
                                value={pixKey}
                                onChange={handlePixKeyChange}
                                className="border border-gray-300 rounded-lg p-4 w-full mt-2 text-lg"
                                placeholder="Insira sua chave PIX"
                            />
                        </div>
                    )}

                    {paymentMethod === "bank" && (
                        <div className="mt-6 w-full max-w-md space-y-4">
                            <div>
                                <label htmlFor="bankName" className="text-lg font-semibold text-gray-700">
                                    Nome do Banco:
                                </label>
                                <input
                                    id="bankName"
                                    name="bankName"
                                    type="text"
                                    value={bankAccount.bankName}
                                    onChange={handleBankAccountChange}
                                    className="border border-gray-300 rounded-lg p-4 w-full mt-2 text-lg"
                                    placeholder="Ex.: Banco do Brasil"
                                />
                            </div>
                            <div>
                                <label htmlFor="agency" className="text-lg font-semibold text-gray-700">
                                    Agência:
                                </label>
                                <input
                                    id="agency"
                                    name="agency"
                                    type="text"
                                    value={bankAccount.agency}
                                    onChange={handleBankAccountChange}
                                    className="border border-gray-300 rounded-lg p-4 w-full mt-2 text-lg"
                                    placeholder="Número da agência"
                                />
                            </div>
                            <div>
                                <label htmlFor="accountNumber" className="text-lg font-semibold text-gray-700">
                                    Número da Conta:
                                </label>
                                <input
                                    id="accountNumber"
                                    name="accountNumber"
                                    type="text"
                                    value={bankAccount.accountNumber}
                                    onChange={handleBankAccountChange}
                                    className="border border-gray-300 rounded-lg p-4 w-full mt-2 text-lg"
                                    placeholder="Número da conta"
                                />
                            </div>
                            <div>
                                <label htmlFor="accountType" className="text-lg font-semibold text-gray-700">
                                    Tipo de Conta:
                                </label>
                                <select
                                    id="accountType"
                                    name="accountType"
                                    value={bankAccount.accountType}
                                    onChange={handleBankAccountChange}
                                    className="border border-gray-300 rounded-lg p-4 w-full mt-2 text-lg"
                                >
                                    <option value="corrente">Corrente</option>
                                    <option value="poupanca">Poupança</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Feedback de Erro */}
                    {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

                    {/* Botão de Submissão */}
                    <button
                        onClick={handleSubmit}
                        className="bg-primary text-white font-semibold rounded-lg py-3 px-6 mt-6 w-full max-w-md text-lg"
                        disabled={!!error}
                    >
                        Cadastrar Método de Pagamento
                    </button>

                    {/* Mensagem de Sucesso */}
                    {successMessage && <p className="text-green-500 text-lg mt-4">{successMessage}</p>}
                </div>

                <Footer />
            </main>
        </div>
    );
}
