import { FiChevronRight } from "react-icons/fi";
import { SecundaryHeader } from "../components/secundary-header";
import { PiMoney } from "react-icons/pi";

export function SaqueDigital() {
    return (
        <div>
            <SecundaryHeader />
            <h1 className="text-center font-bold text-2xl px-4 py-4 text-zinc-900">Escolha uma das opções para receber seu FGTS</h1>

            <div className="px-4 flex justify-center">
                <div className="bg-zinc-100 border w-full p-10 text-center space-y-3 rounded-md">
                    <p className="text-orange-400 font-bold text-lg">Saldo da conta FGTS</p>
                    <h3 className="font-bold text-primary text-3xl">R$6.439,23</h3>
                    <span className="mt-10">atualizado em 27/10/2024</span>
                </div>
            </div>

            <div className="px-10 text-center space-y-6 text-zinc-950 mt-6">
                <div>
                    Se você é optante pelo <span className="font-bold">Saque-aniversário</span>, será liberado para o saque apenas <span className="font-bold">o valor da multa rescisória. </span>Consulte o seu extrato FGTS
                </div>

                <p className="text-orange-500">Ver contas FGTS liberadas (2)</p>
            </div>

            <div className="my-10 space-y-8">
                <h4 className="text-zinc-900 font-bold px-7">Selecione abbaixo, a melhor forma para você efetuar seu saque:</h4>

                <div className="px-4 space-y-4">
                    <a href="/aguardarsenha" className="text-zinc-700">
                        <div className="flex items-start space-x-3">
                            <div className="bg-orange-400 p-2 rounded-full w-fit">
                                <PiMoney className="text-white text-3xl" />
                            </div>
                            <div className="flex flex-col">
                                <h2 className="text-zinc-900 font-bold">RECEBER NO PIX</h2>
                                <div className="flex justify-between items-center">
                                    <p>Credite seu saque através do aplicativo direto na sua chave PIX </p>
                                    <FiChevronRight size={100} className="text-orange-500 " />
                                </div>
                            </div>
                        </div>
                    </a>

                    {/* <div className="flex items-start space-x-3">
                        <div className="bg-orange-400 p-1 rounded-full w-fit">FFF</div>
                        <div className="flex flex-col">
                            <h2 className="text-zinc-900 font-bold">SACAR PRESENCIALMENTE</h2>
                            <div className="flex justify-between items-center">
                                <p>Escolha essa opção para sacar em outros canais como lotéricas, caixas eletrônicos e agências </p>
                                <FiChevronRight size={100} className="text-orange-500 " />
                            </div>
                        </div>
                    </div> */}

                    <a href="/aguardarsenha">
                        <button className="bg-orange-400 w-full text-white text-lg rounded-lg">
                            Solicitar saque agora
                        </button>
                    </a>
                </div>


            </div>
        </div>


    )
}