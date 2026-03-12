import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faLock, faEnvelope, faHardHat } from '@fortawesome/free-solid-svg-icons';
import api from '../../service/api';
import './auth.css';
import loginImg from '../../assets/AuthImage.png'; // Altere para o seu caminho

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !senha) {
      setErrorMessage('Por favor, preencha todos os campos.');
      setShowError(true);
      return;
    }

    try {
      const response = await api.post('/api/v1/auth/login', { email, senha });
      const { token, tipo, id, nome } = response.data;

      if (!token || !tipo) throw new Error('Resposta inválida do servidor');

      login(email, token, { id, nome, tipo });

      // Redirecionamento baseado no tipo de usuário do aluguel
      if (tipo === 'CLIENTE' || tipo === 'FUNCIONARIO') {
        navigate('/');
      } else if (tipo === 'ADMIN') {
        navigate('/admin');
      }

    } catch (error) {
      console.error('Erro no login:', error);
      if (error.response?.status === 401) {
        setErrorMessage('Email ou senha inválidos.');
      } else if (error.request) {
        setErrorMessage('Erro de conexão com o servidor.');
      } else {
        setErrorMessage('Erro inesperado. Tente novamente.');
      }
      setShowError(true);
    }
  };

  return (
    <div className="loginSplitPage">
      {/* Metade Esquerda: Imagem */}
      <div className="loginImageSide" style={{ backgroundImage: `url(${loginImg})` }}>
        <div className="imageOverlay">
          <div className="brandLogo">
            <FontAwesomeIcon icon={faHardHat} /> <span>LocaObra</span>
          </div>
          <h1>As melhores ferramentas para sua obra, a um clique de distância.</h1>
        </div>
      </div>

      {/* Metade Direita: Formulário */}
      <div className="loginFormSide">
        <div className="login-card">
          <h2>Bem-vindo de volta!</h2>
          <p>Entre com sua conta para alugar e gerenciar.</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="loginInputGroup">
              <label className="loginInputLabel">Email</label>
              <div className="inputWithIcon">
                <FontAwesomeIcon icon={faEnvelope} className="inputIcon" />
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="loginInputField"
                />
              </div>
            </div>

            <div className="loginInputGroup">
              <label className="loginInputLabel">Senha</label>
              <div className="inputWithIcon">
                <FontAwesomeIcon icon={faLock} className="inputIcon" />
                <div className="loginPasswordWrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                    className="loginInputField"
                  />
                  <button
                    type="button"
                    className="loginEye-button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </button>
                </div>
              </div>
            </div>

            <div className="forgotPassword">
              <a href="/recuperar-senha">Esqueci minha senha</a>
            </div>

            <button type="submit" className="login-button">Entrar</button>
          </form>

          <div className="login-footer">
            <p>Ainda não aluga conosco? <a href="/signup">Cadastre-se</a></p>
          </div>
        </div>
      </div>

      {/* Popup de Erro */}
      {showError && (
        <div className="loginPopup">
          <div className="loginPopup-content">
            <p>{errorMessage}</p>
            <button onClick={() => setShowError(false)}>Entendi</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;