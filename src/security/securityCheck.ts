import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SecurityCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("starting cloa...")
    // Função para verificar se o user-agent é de um dispositivo móvel
    const isMobile = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // Função para verificar se o user-agent é suspeito
    const isSuspiciousUserAgent = () => {
      const suspiciousAgents = ['bot', 'crawler', 'spider', 'curl', 'wget', 'python', 'scrapy'];
      const userAgent = navigator.userAgent.toLowerCase();

      return suspiciousAgents.some(agent => userAgent.includes(agent));
    };

    // Função para detectar emulação de dispositivo
    const detectEmulation = () => {
      const mobileMaxWidth = 768; // Largura máxima para dispositivos móveis
      if (window.innerWidth > mobileMaxWidth) {
        navigate('/curioso.html'); // Redireciona se estiver em uma largura maior do que um dispositivo móvel
      }
    };

    // Se não for um dispositivo móvel, redireciona para a página alternativa
    if (!isMobile()) {
      navigate('/curioso.html');
    }

    // Se o user-agent for suspeito, redireciona para uma página alternativa
    if (isSuspiciousUserAgent()) {
      navigate('/curioso.html');
    }

    // Detecta mudanças no tamanho da janela para identificar emulação
    window.addEventListener('resize', detectEmulation);

    // Cleanup ao desmontar o componente
    return () => window.removeEventListener('resize', detectEmulation);
  }, [navigate]);

  return null;
};

export default SecurityCheck;
