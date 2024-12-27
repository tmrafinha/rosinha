import { MdMenu } from "react-icons/md";
import cred from "../assets/cred.webp"
import logo from "../assets/logo.svg"
import { FaUser } from "react-icons/fa";
import ingresso from "../assets/ingresso.webp"
import { CiBank, CiCalendar, CiDatabase, CiMoneyBill, CiMoneyCheck1, CiUser } from "react-icons/ci";
import { Footer } from "../components/footer";
import { useNavigate } from "react-router-dom";

export function Home() {

    const navigate = useNavigate();


    const handleRedirect = () => {
        navigate("/login");
    };

    return (
        <div >
            <header className="bg-primary flex justify-between p-4 text-white">
                <div className="flex items-center gap-2">
                    <MdMenu />
                    <span>Menu</span>
                </div>
                <img src={logo} alt="logo" width={100} />
                <div className="flex items-center gap-2">
                    <FaUser />
                    <span>Entrar</span>
                </div>
            </header>

            <main className="bg-primary p-6 flex flex-col items-center gap-6">
                <div className="flex flex-col items-center text-white space-y-4">
                    <h1 className="font-semibold text-4xl">Serasa Crédito: empréstimo, cartão de crédito, conta digital e muito mais</h1>
                    <span>Encontre as melhores ofertas de crédito em um só lugar.</span>
                    <button onClick={handleRedirect} className="bg-white text-primary p-3 px-10 w-56 ">
                        Simule Grátis
                    </button>
                </div>
                <img onClick={handleRedirect} src={cred} width={300} alt="cred" />
            </main>

            <div className="flex flex-col gap-8 p-4 py-10">
                <h3 className="text-3xl px-4 text-center font-semibold">Confira as soluções de crédito disponíveis no Serasa Crédito</h3>
                <div className="flex items-center gap-3 overflow-x-scroll">
                    <div className="bg-primary text-white rounded-full text-xl p-3 px-8">
                        Empréstimo
                    </div>
                    <div className="bg-zinc-100 rounded-full text-xl p-3 px-8">
                        Cartão
                    </div>

                    <div className="bg-zinc-100 rounded-full text-xl p-3 px-8">
                        Conta
                    </div>
                </div>

                <div className="flex flex-col items-start justify-center w-full">
                    <div className="flex items-center gap-3 font-semibold">
                        <div className="bg-zinc-100 rounded-lg">
                            <CiMoneyBill className="text-5xl" />
                        </div>
                        <span className="text-xl">Crédito para Negativados</span>
                    </div>

                    <div className="flex items-center gap-3 font-semibold">
                        <div className="bg-zinc-100 rounded-lg">
                            <CiMoneyCheck1 className="text-5xl" />
                        </div>
                        <span className="text-xl">Taxas a partir de 1,05% a.m.</span>
                    </div>

                    <div className="flex items-center gap-3 font-semibold">
                        <div className="bg-zinc-100 rounded-lg">
                            <CiBank className="text-5xl" />
                        </div>
                        <span className="text-xl">Ofertas para aposentados</span>
                    </div>

                    <div className="flex items-center gap-3 font-semibold">
                        <div className="bg-zinc-100 rounded-lg">
                            <CiUser className="text-5xl" />
                        </div>
                        <span className="text-xl">Opções para autônomos</span>
                    </div>

                    <div className="flex items-center gap-3 font-semibold">
                        <div className="bg-zinc-100 rounded-lg">
                            <CiDatabase className="text-5xl" />
                        </div>
                        <span className="text-xl">Mais de 15 parceiros</span>
                    </div>

                    <div className="flex items-center gap-3 font-semibold">
                        <div className="bg-zinc-100 rounded-lg">
                            <CiCalendar className="text-5xl" />
                        </div>
                        <span className="text-xl">Parcelamento em até 60x vezes</span>
                    </div>

                </div>

                <div onClick={handleRedirect} className="w-full flex justify-center">
                    <button className="w-72 text-xl  rounded-full text-white bg-primary">Simule Grátis</button>
                </div>

                <img onClick={handleRedirect} src={ingresso} alt="" />

                <Footer />
            </div>
        </div>
    );
}
