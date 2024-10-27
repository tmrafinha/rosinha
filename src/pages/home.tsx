import logo from "../assets/logo.png"
import fgts from "../assets/fgts.png"

export function Home() {
    return (
        <div className="bg-custom-bg bg-cover min-h-screen flex flex-col">
            <div>
                <header className="p-4">
                    <img src={logo} alt="Logo" className="h-14 mx-auto" />
                </header>
                <main className="text-white">
                    <div className="flex flex-col justify-center items-center mt-20 space-y-24">
                        <span className="text-2xl">Boas-vindas ao</span>
                        <div className="space-y-12 flex flex-col items-center">
                            <img src={fgts} alt="Logo" className="h-20 mx-auto" />
                            <div className="px-8 text-center">Você sabia que o seu <span className="font-bold">FGTS</span> gera <span className="font-bold">empregos</span> e investimentos para o <span className="font-bold">Brasil?</span></div>
                            <div className="flex justify-center">
                                <a href="/login">
                                    <button className="bg-orange-400 w-80 font-bold rounded-sm">
                                        Entrar no aplicativo
                                    </button></a>
                            </div>

                            <p className="underline">Veja como seu FGTS é aplicado</p>
                            <span>v 4.0.2</span>
                        </div>


                        {/* <footer className="flex flex-col items-center space-y-10">
                            <p className="underline">Veja como seu FGTS é aplicado</p>
                            <span>v 4.0.2</span>
                        </footer> */}
                    </div>
                </main>

            </div>
        </div>
    );
}
