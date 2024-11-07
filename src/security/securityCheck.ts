// SecurityCheck.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SecurityCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isMobile = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isSuspiciousUserAgent = () => {
      const suspiciousAgents = ['bot', 'crawler', 'spider', 'curl', 'wget', 'python', 'scrapy'];
      const userAgent = navigator.userAgent.toLowerCase();
      return suspiciousAgents.some(agent => userAgent.includes(agent));
    };

    if (!isMobile() || isSuspiciousUserAgent()) {
      navigate('/copianao');
    }
  }, [navigate]);

  return null;
};

export default SecurityCheck;
