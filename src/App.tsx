import { RouterProvider } from 'react-router-dom';

import { router } from './main';

const App = () => {
  return (
    <>
      {/* Componente de verificação de segurança */}
      {/* <SecurityCheck /> */}
      {/* Provedor de rotas para o aplicativo */}
      <RouterProvider router={router} />
    </>
  );
};

export default App;
