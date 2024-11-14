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
    ],
  },
]);



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
