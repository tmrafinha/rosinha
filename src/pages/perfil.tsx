import { useState, useEffect } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { SecundaryHeader } from "../components/secundary-header";

interface UserData {
    nome: string;
    cpf: string;
    nomeMae: string;
    email: string;
    cep: string;
    cidade: string;
    estado: string;
    rua: string;
    numero: string;
}

export function Perfil() {
    const [userData, setUserData] = useState<UserData>({
        nome: "",
        cpf: "",
        nomeMae: "",
        email: "",
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

    // Atualizar os dados no estado e no localStorage
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedUserData = { ...userData, [name]: value };
        setUserData(updatedUserData);
    };

    const handleSave = () => {
        localStorage.setItem("userData", JSON.stringify(userData));
        alert("Informações salvas com sucesso!");
    };

    return (
        <>
            <SecundaryHeader />
            <div className="px-4">
                <div className="flex flex-col items-center my-3 px-4 text-center">
                    <h1 className="font-bold text-2xl text-zinc-900 text-center mb-7">
                        Endereço e <br />dados pessoais
                    </h1>
                    <div className="flex flex-col gap-3 items-center">
                        <div className="bg-orange-400 p-3 rounded-full text-white w-fit">
                            <IoLocationOutline className="text-white text-4xl" />
                        </div>
                        <span className="text-zinc-900">
                            Verifique seus dados pessoais e endereço. Caso necessário, você pode atualizar as informações de endereço.
                        </span>
                    </div>
                </div>

                <div>
                    <h3 className="text-2xl font-bold text-primary mb-4">Meus dados</h3>

                    <div className="mb-10">
                        <label className="text-xl text-zinc-950">Nome do Trabalhador</label>
                        <input
                            type="text"
                            name="nome"
                            value={userData.nome}
                            onChange={handleChange}
                            className="border-b border-b-orange-500 w-full text-lg text-zinc-500 outline-none"
                            placeholder="Digite seu nome"
                        />
                    </div>

                    <div className="mb-10">
                        <label className="text-xl text-zinc-950">CPF</label>
                        <input
                            type="text"
                            name="cpf"
                            value={userData.cpf}
                            onChange={handleChange}
                            className="border-b border-b-orange-500 w-full text-lg text-zinc-500 outline-none"
                            placeholder="Digite seu CPF"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="text-xl text-zinc-950">Nome da mãe</label>
                        <input
                            type="text"
                            name="nomeMae"
                            value={userData.nomeMae}
                            onChange={handleChange}
                            className="border-b border-b-orange-500 w-full text-lg text-zinc-500 outline-none"
                            placeholder="Nome da mãe"
                        />
                    </div>
                </div>

                <div className="mt-12">
                    <h3 className="text-2xl font-bold text-primary mb-4">Meu e-mail</h3>

                    <div className="mb-10">
                        <label className="text-xl text-zinc-950">E-mail</label>
                        <input
                            type="text"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            className="border-b border-b-orange-500 w-full text-lg text-zinc-500 outline-none"
                        />
                    </div>
                </div>

                <div className="mt-12">
                    <h3 className="text-2xl font-bold text-primary mb-4">Endereço de contato</h3>

                    <div className="mb-10">
                        <label className="text-xl text-zinc-950">CEP</label>
                        <input
                            type="text"
                            name="cep"
                            value={userData.cep}
                            onChange={handleChange}
                            className="border-b border-b-orange-500 w-full text-lg text-zinc-500 outline-none"
                        />
                    </div>

                    <div className="mb-10">
                        <label className="text-xl text-zinc-950">Cidade</label>
                        <input
                            type="text"
                            name="cidade"
                            value={userData.cidade}
                            onChange={handleChange}
                            className="border-b border-b-orange-500 w-full text-lg text-zinc-500 outline-none"
                        />
                    </div>

                    <div className="mb-10">
                        <label className="text-xl text-zinc-950">Estado</label>
                        <input
                            type="text"
                            name="estado"
                            value={userData.estado}
                            onChange={handleChange}
                            className="border-b border-b-orange-500 w-full text-lg text-zinc-500 outline-none"
                        />
                    </div>

                    <div className="mb-10">
                        <label className="text-xl text-zinc-950">Rua</label>
                        <input
                            type="text"
                            name="rua"
                            value={userData.rua}
                            onChange={handleChange}
                            className="border-b border-b-orange-500 w-full text-lg text-zinc-500 outline-none"
                        />
                    </div>

                    <div className="mb-10">
                        <label className="text-xl text-zinc-950">Número</label>
                        <input
                            type="text"
                            name="numero"
                            value={userData.numero}
                            onChange={handleChange}
                            className="border-b border-b-orange-500 w-full text-lg text-zinc-500 outline-none"
                        />
                    </div>

                    <button
                        onClick={handleSave}
                        className="bg-orange-400 w-full font-bold rounded-sm text-white"
                    >
                        Salvar informações
                    </button>
                </div>
            </div>
        </>
    );
}
