import { FaExchangeAlt } from "react-icons/fa";
import { SecundaryHeader } from "../components/secundary-header";

export function ContaBancaria() {
    return (
        <div>
            <SecundaryHeader />
            <div className="flex flex-col items-center text-center justify-center w-full pt-16 space-y-6">
                <div className="bg-primary p-4 rounded-full w-fit">
                    <FaExchangeAlt className="text-white text-6xl" />
                </div>
                <div className="px-14">Você <span className="font-bold">não possui</span> uma <span className="font-bold">chave PIX</span> cadastrada</div>
            </div>

            <div className="bg-zinc-100 p-10 px-12 m-4 mt-12 text-center font-medium">
                A conta bancária permite que os valores liberados do seu FGTS sejam depositados automaticamente na conta.
            </div>

            <div className="px-4">
                <a href="/cadastrarchave">
                    <button className="bg-orange-400 w-full mt-28 text-white text-lg rounded-lg">
                        Cadastrar chave PIX
                    </button>
                </a>
            </div>
        </div>
    )
}