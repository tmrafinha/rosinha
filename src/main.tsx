import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/carregando",
    element: <Loading />,
  },
  {
    path: "/menu",
    element: <Menu />,
  },
  {
    path: "/saquedigital",
    element: <SaqueDigital />,
  },
  {
    path: "/contabancaria",
    element: <ContaBancaria />,
  },
  {
    path: "/cadastrarchave",
    element: <CadastrarChaves />,
  },
  {
    path: "/cadastrourgente",
    element: <CadastrarChavesUrgente />,
  },
  {
    path: "/saqueaniversario",
    element: <SaqueAniversario />,
  },
  {
    path: "/info",
    element: <Info />,
  },
  {
    path: "/perfil",
    element: <Perfil />,
  },
  {
    path: "/aguardarsenha",
    element: <AguardarSenha />,
  },
  {
    path: "/notafiscal",
    element: <NotaFiscal />,
  },
  {
    path: "/verificardados",
    element: <VerificarDados />,
  },
  {
    path: "/selecionarmetodo",
    element: <SelecionarMetodo />,
  },
  {
    path: "/pagamentotarifa",
    element: <PagamentoTarifa />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
