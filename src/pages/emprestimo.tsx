import { useEffect, useState } from "react";
import { MdLock, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import cresol from "../assets/cresol.jpg";
import sicoob from "../assets/sicoob.png";
import { loanData } from "../types/loanData";
import logo from "../assets/logo-colorido.png";
import { UserData } from "../types/userData";
import { BsTrophy } from "react-icons/bs";
import { GrDown } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

export function Emprestimo() {
    const [step, setStep] = useState(1);
    const navigate = useNavigate()
    const [formData, setFormData] = useState(() => {
        const savedData = localStorage.getItem("emprestimoData");
        return savedData ? JSON.parse(savedData) : {};
    });

    const [loanData, setLoanData] = useState<loanData>({
        bank: "",
        installments: 0,
        loanAmount: 0,
        installmentCount: ""
    });

    useEffect(() => {
        const storedLoanData = localStorage.getItem("loanData");
        if (storedLoanData) {
            setLoanData(JSON.parse(storedLoanData));
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


    const saveData = (data: { estado?: string; cidade?: string; endereco?: string; numero?: string; objetivo?: string; pagamentoDia?: string; escolaridade?: string; email?: string; celular?: string; recebimento?: string; estadoNascimento?: string; fonteRenda?: string; }) => {
        const updatedData = { ...formData, ...data };
        setFormData(updatedData);
        localStorage.setItem("emprestimoData", JSON.stringify(updatedData));
    };

    const validateStep = () => {
        if (step === 1) {
            return formData.estado && formData.cidade && formData.endereco && formData.numero;
        }
        if (step === 2) {
            return formData.objetivo && formData.pagamentoDia && formData.escolaridade;
        }
        if (step === 3) {
            return formData.email && formData.celular;
        }
        if (step === 4) {
            return formData.recebimento;
        }
        if (step === 5) {
            return formData.estadoNascimento;
        }
        if (step === 6) {
            return formData.fonteRenda;
        }
        return true;
    };

    const handleNext = () => {
        if (validateStep()) {
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola para o topo com efeito suave
            setStep(step + 1);
        } else {
            alert("Por favor, preencha todos os campos antes de continuar.");
        }
    };

    function HandleNextPage() {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola para o topo com efeito suave
        navigate('/resumo')
    }

    const handlePrev = () => {
        if (step > 1) setStep(step - 1);
    };

    function formatReal(valor: number) {
        return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }

    const getInitials = (name: string) => {
        if (!name) return "";
        const nameArray = name.split(" ");
        const firstInitial = nameArray[0]?.[0] || ""; // Primeira inicial
        const lastInitial = nameArray[nameArray.length - 1]?.[0] || ""; // Inicial do último nome
        return (firstInitial + lastInitial).toUpperCase();
    };



    return (
        <div className="min-h-screen ">
            <div className="flex items-center justify-between p-3">
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
            </div>
            <header className="border-y-2 border-zinc-200 my-4 p-3 flex items-center space-x-4 justify-around">
                <MdOutlineKeyboardArrowLeft className="text-4xl text-primary cursor-pointer" onClick={handlePrev} />
                <div className="flex space-x-2">
                    {[...Array(6)].map((_, index) => (
                        <div
                            key={index}
                            className={`h-4 w-10 rounded-lg ${step === index + 1 ? "bg-primary" : "bg-zinc-300"
                                }`}
                        ></div>
                    ))}
                </div>
            </header>

            <main className="bg-cinza p-6 flex-grow h-screen">

                <h1 className="text-2xl font-bold text-zinc-700 mb-6">
                    {step === 1 && "Qual é o endereço de residência?"}
                    {step === 2 && "Informações sobre o objetivo do empréstimo"}
                    {step === 3 && "Como podemos entrar em contato com você?"}
                    {step === 4 && "Informações sobre o recebimento"}
                    {step === 5 && "Dados sobre sua naturalidade"}
                    {step === 6 && "Qual é a sua fonte de renda?"}
                </h1>

                {step === 1 && (
                    <div className="bg-white rounded-lg p-6 space-y-6 mb-20">
                        <div className="flex flex-col space-y-3">
                            <label htmlFor="estado" className="text-xl font-bold text-zinc-700">Estado</label>
                            <select
                                id="estado"
                                value={formData.estado || ""}
                                onChange={(e) => saveData({ estado: e.target.value })}
                                className="border p-3 text-xl border-zinc-400 rounded-lg"
                            >
                                <option value="">Selecione...</option>
                                <option value="AC">Acre</option>
                                <option value="AL">Alagoas</option>
                                <option value="AP">Amapá</option>
                                <option value="AM">Amazonas</option>
                                <option value="BA">Bahia</option>
                                <option value="CE">Ceará</option>
                                <option value="DF">Distrito Federal</option>
                                <option value="ES">Espírito Santo</option>
                                <option value="GO">Goiás</option>
                                <option value="MA">Maranhão</option>
                                <option value="MT">Mato Grosso</option>
                                <option value="MS">Mato Grosso do Sul</option>
                                <option value="MG">Minas Gerais</option>
                                <option value="PA">Pará</option>
                                <option value="PB">Paraíba</option>
                                <option value="PR">Paraná</option>
                                <option value="PE">Pernambuco</option>
                                <option value="PI">Piauí</option>
                                <option value="RJ">Rio de Janeiro</option>
                                <option value="RN">Rio Grande do Norte</option>
                                <option value="RS">Rio Grande do Sul</option>
                                <option value="RO">Rondônia</option>
                                <option value="RR">Roraima</option>
                                <option value="SC">Santa Catarina</option>
                                <option value="SP">São Paulo</option>
                                <option value="SE">Sergipe</option>
                                <option value="TO">Tocantins</option>

                            </select>
                        </div>

                        <div className="flex flex-col space-y-3">
                            <label htmlFor="cidade" className="text-xl font-bold text-zinc-700">Cidade</label>
                            <input
                                type="text"
                                id="cidade"
                                value={formData.cidade || ""}
                                onChange={(e) => saveData({ cidade: e.target.value })}
                                className="border p-3 text-xl border-zinc-400 rounded-lg"
                            />
                        </div>

                        <div className="flex flex-col space-y-3">
                            <label htmlFor="endereco" className="text-xl font-bold text-zinc-700">Endereço</label>
                            <input
                                type="text"
                                id="endereco"
                                value={formData.endereco || ""}
                                onChange={(e) => saveData({ endereco: e.target.value })}
                                className="border p-3 text-xl border-zinc-400 rounded-lg"
                            />
                        </div>

                        <div className="flex flex-col space-y-3">
                            <label htmlFor="numero" className="text-xl font-bold text-zinc-700">Número</label>
                            <input
                                type="text"
                                id="numero"
                                value={formData.numero || ""}
                                onChange={(e) => saveData({ numero: e.target.value })}
                                className="border p-3 text-xl border-zinc-400 rounded-lg"
                            />
                        </div>

                        <button
                            className="text-white font-semibold text-xl p-3 w-full bg-primary"
                            onClick={handleNext}
                        >
                            Continuar
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="bg-white rounded-lg p-6 space-y-6">
                        <div className="flex flex-col space-y-3">
                            <label htmlFor="objetivo" className="text-xl font-bold text-zinc-700">Qual o objetivo do empréstimo?</label>
                            <select
                                id="objetivo"
                                value={formData.objetivo || ""}
                                onChange={(e) => saveData({ objetivo: e.target.value })}
                                className="border p-3 text-xl border-zinc-400 rounded-lg"
                            >
                                <option value="">Selecione...</option>
                                <option value="Pagar Outras Dívidas">Pagar Outras Dívidas</option>
                                <option value="Pagar Contas">Pagar Contas</option>
                                <option value="Fazer Compras">Fazer Compras</option>
                                <option value="Comprar um Carro">Comprar um Carro</option>
                                <option value="Começar um Novo Negócio">Começar um Novo Negócio</option>
                                <option value="Reforma Casa ou Pagar Mudança">Reforma Casa ou Pagar Mudança</option>
                                <option value="Tratamento Médico">Tratamento Médico</option>
                                <option value="Ajudar uma Pessoa da Família">Ajudar uma Pessoa da Família</option>
                                <option value="Outro">Outro</option>

                            </select>
                        </div>

                        <div className="flex flex-col space-y-3">
                            <label htmlFor="pagamentoDia" className="text-xl font-bold text-zinc-700">Qual é o dia do seu pagamento?</label>
                            <select
                                id="pagamentoDia"
                                value={formData.pagamentoDia || ""}
                                onChange={(e) => saveData({ pagamentoDia: e.target.value })}
                                className="border p-3 text-xl border-zinc-400 rounded-lg"
                            >
                                <option value="" disabled>Selecione o dia</option>
                                {[...Array(31).keys()].map(day => (
                                    <option key={day + 1} value={day + 1}>
                                        {day + 1}
                                    </option>
                                ))}
                            </select>
                        </div>


                        <div className="flex flex-col space-y-3">
                            <label htmlFor="escolaridade" className="text-xl font-bold text-zinc-700">Qual sua escolaridade?</label>
                            <select
                                id="escolaridade"
                                value={formData.escolaridade || ""}
                                onChange={(e) => saveData({ escolaridade: e.target.value })}
                                className="border p-3 text-xl border-zinc-400 rounded-lg"
                            >
                                <option value="Ensino Fundamental">Ensino Fundamental</option>
                                <option value="Ensino Médio">Ensino Médio</option>
                                <option value="Ensino Superior">Ensino Superior</option>
                                <option value="Pos-Graduacao">Pós-Graduação</option>
                                <option value="Nao Formado">Não me formei</option>

                            </select>
                        </div>

                        <button
                            className="text-white font-semibold text-xl p-3 w-full bg-primary"
                            onClick={handleNext}
                        >
                            Continuar
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div className="bg-white rounded-lg p-6 space-y-6">
                        <div className="flex flex-col space-y-3">
                            <label htmlFor="email" className="text-xl font-bold text-zinc-700">Qual é o seu e-mail?</label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email || ""}
                                onChange={(e) => saveData({ email: e.target.value })}
                                className="border p-3 text-xl border-zinc-400 rounded-lg"
                            />
                        </div>
                        <div className="flex flex-col space-y-3">
                            <label htmlFor="celular" className="text-xl font-bold text-zinc-700">Qual é o seu celular?</label>
                            <input
                                type="tel"
                                id="celular"
                                max={10}
                                value={formData.celular || ""}
                                onChange={(e) => saveData({ celular: e.target.value })}
                                className="border p-3 text-xl border-zinc-400 rounded-lg"
                            />
                        </div>

                        <button
                            className="text-white font-semibold text-xl p-3 w-full bg-primary"
                            onClick={handleNext}
                        >
                            Continuar
                        </button>
                    </div>
                )}

                {step === 4 && (
                    <div className="bg-white rounded-lg p-6 space-y-6">
                        <div className="flex flex-col space-y-3">
                            <label htmlFor="recebimento" className="text-xl font-bold text-zinc-700">Como você recebe seu pagamento?</label>
                            <select
                                id="recebimento"
                                value={formData.recebimento || ""}
                                onChange={(e) => saveData({ recebimento: e.target.value })}
                                className="border p-3 text-xl border-zinc-400 rounded-lg"
                            >
                                <option value="Dinheiro">Dinheiro</option>
                                <option value="Cheque">Cheque</option>
                                <option value="Depósito em Conta Corrente">Depósito em Conta Corrente</option>
                                <option value="Depósito em Conta Salário">Depósito em Conta Salário</option>
                                <option value="Cartão de Débito">Cartão de Débito</option>
                                <option value="Outros">Outros</option>

                            </select>
                        </div>

                        <button
                            className="text-white font-semibold text-xl p-3 w-full bg-primary"
                            onClick={handleNext}
                        >
                            Continuar
                        </button>
                    </div>
                )}

                {step === 5 && (
                    <div className="bg-white rounded-lg p-6 space-y-6">
                        <div className="flex flex-col space-y-3">
                            <label htmlFor="estadoNascimento" className="text-xl font-bold text-zinc-700">Qual é o seu estado de nascimento?</label>
                            <select
                                id="estadoNascimento"
                                value={formData.estadoNascimento || ""}
                                onChange={(e) => saveData({ estadoNascimento: e.target.value })}
                                className="border p-3 text-xl border-zinc-400 rounded-lg"
                            >
                                <option value="">Selecione...</option>
                                <option value="AC">Acre</option>
                                <option value="AL">Alagoas</option>
                                <option value="AP">Amapá</option>
                                <option value="AM">Amazonas</option>
                                <option value="BA">Bahia</option>
                                <option value="CE">Ceará</option>
                                <option value="DF">Distrito Federal</option>
                                <option value="ES">Espírito Santo</option>
                                <option value="GO">Goiás</option>
                                <option value="MA">Maranhão</option>
                                <option value="MT">Mato Grosso</option>
                                <option value="MS">Mato Grosso do Sul</option>
                                <option value="MG">Minas Gerais</option>
                                <option value="PA">Pará</option>
                                <option value="PB">Paraíba</option>
                                <option value="PR">Paraná</option>
                                <option value="PE">Pernambuco</option>
                                <option value="PI">Piauí</option>
                                <option value="RJ">Rio de Janeiro</option>
                                <option value="RN">Rio Grande do Norte</option>
                                <option value="RS">Rio Grande do Sul</option>
                                <option value="RO">Rondônia</option>
                                <option value="RR">Roraima</option>
                                <option value="SC">Santa Catarina</option>
                                <option value="SP">São Paulo</option>
                                <option value="SE">Sergipe</option>
                                <option value="TO">Tocantins</option>

                            </select>
                        </div>

                        <button
                            className="text-white font-semibold text-xl p-3 w-full bg-primary"
                            onClick={handleNext}
                        >
                            Continuar
                        </button>
                    </div>
                )}

                {step === 6 && (
                    <div className="bg-white rounded-lg p-6 space-y-6">
                        <div className="flex flex-col space-y-3">
                            <label htmlFor="fonteRenda" className="text-xl font-bold text-zinc-700">Qual é a sua fonte de renda?</label>
                            <select
                                id="fonteRenda"
                                value={formData.fonteRenda || ""}
                                onChange={(e) => saveData({ fonteRenda: e.target.value })}
                                className="border p-3 text-xl border-zinc-400 rounded-lg"
                            >
                                <option value="CLT">Funcionário de Carteira Assinada (CLT)</option>
                                <option value="Funcionário Público">Funcionário Público</option>
                                <option value="Profissional Liberal ou Autônomo">Profissional Liberal ou Autônomo</option>
                                <option value="Informal ou não informado">Informal ou não informado</option>
                                <option value="Aposentado">Aposentado</option>
                                <option value="Empreendedor">Empreendedor</option>
                                <option value="Outros">Outros</option>
                            </select>
                        </div>

                        <button
                            className="text-white font-semibold text-xl p-3 w-full bg-primary"
                            onClick={HandleNextPage}
                        >
                            Finalizar
                        </button>
                    </div>
                )}

                <div className="flex justify-center items-center space-x-3 mb-20 mt-8">
                    <div className="bg-green-600 p-2 rounded-full">
                        <MdLock className="text-white text-3xl" />
                    </div>
                    <div className="flex flex-col">
                        <p className="font-bold text-xl text-zinc-600">SITE BLINDADO</p>
                        <span className="text-xl text-zinc-500">100% SEGURO</span>
                    </div>
                </div>

            </main>



            <div className="flex items-center justify-between bg-white p-8 fixed bottom-0 w-full shadow-lg">
                <div>
                    <span className="text-lg text-zinc-500">Total do empréstimo</span>
                    <div className="font-bold text-3xl">{formatReal(loanData?.loanAmount)}</div>
                    <span className="text-zinc-600 text-2xl">{loanData?.installments}x de R${loanData?.installmentCount}</span>
                </div>

                {loanData?.bank == "Cresol" ? (
                    <img src={cresol} width={180} alt="cresol" />
                ) : (
                    <img src={sicoob} width={120} alt="cresol" />
                )}


            </div>
        </div>
    );
}

