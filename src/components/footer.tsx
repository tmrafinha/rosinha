export function Footer() {
    return (
        <footer className=" text-gray-700 text-sm bg-white rounded-lg mt-4">
            <div className="container mx-auto px-6 py-10">
                {/* Top Section */}
                <div className="flex flex-wrap justify-between">
                    <div className="mb-6 w-full sm:w-1/2 lg:w-1/3">
                        <h5 className="text-gray-700 font-bold mb-2">Empresa</h5>
                        <ul>
                            <li>
                                <a href="/politica-de-privacidade" className="hover:text-gray-100">
                                    Política de Privacidade
                                </a>
                            </li>
                            <li>
                                <a href="/trabalhe-conosco" className="hover:text-gray-100">
                                    Trabalhe Conosco
                                </a>
                            </li>
                            <li>
                                <a href="/sobre-nos" className="hover:text-gray-100">
                                    Sobre Nós
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="mb-6 w-full sm:w-1/2 lg:w-1/3">
                        <h5 className="text-gray-700 font-bold mb-2">Atendimento ao Cliente</h5>
                        <ul>
                            <li>
                                <a href="/fale-conosco" className="hover:text-gray-100">
                                    Fale Conosco
                                </a>
                            </li>
                            <li>
                                <a href="https://www.consumidor.gov.br/" className="hover:text-gray-100" target="_blank" rel="noopener noreferrer">
                                    Acesso ao Consumidor.gov.br
                                </a>
                            </li>
                            <li>
                                <a href="https://www.procon.sp.gov.br/" className="hover:text-gray-100" target="_blank" rel="noopener noreferrer">
                                    Procon
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="mb-6 w-full sm:w-1/2 lg:w-1/3">
                        <h5 className="text-gray-700 font-bold mb-2">Contato e Localização</h5>
                        <p>Endereço: Rua Taio, 143, Bairro Campos Novos, São Paulo - SP, CEP: 88329-394</p>
                        <p>Telefone: (11) 1234-5678</p>
                        <p>Email: contato@serasa.com</p>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 my-6"></div>

                {/* Bottom Section */}
                <div className="flex flex-wrap justify-between items-center text-xs">
                    <p>
                        <strong>CNPJ:</strong> 65.500.460/0001-55 - Razão Social da Empresa LTDA
                    </p>
                    <p>
                        © {new Date().getFullYear()} Todos os direitos reservados.
                    </p>
                    <p>
                        <a href="/termos-de-uso" className="hover:text-gray-100">
                            Termos de Uso
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    )
}