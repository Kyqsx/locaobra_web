// src/context/useAuth.jsx
import { useState, useEffect, useContext, createContext } from 'react';
import api from '../service/api';

const AuthContext = createContext();

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            checkSession();
        } else {
            setLoading(false);
        }
    }, []);

    const checkSession = async () => {
        try {
            // 1. Verifica sessão ativa
            const response = await api.get('/api/v1/auth/me');
            const sessionData = response.data;

            if (sessionData.logado === true) {
                // 🔥 IMPORTANTE: em seu backend, "nome" na verdade é o EMAIL!
                const emailFromSession = sessionData.nome; // ex: "mateuscordeiro1311@gmail.com"
                const userIdFromSession = sessionData.id;
                const userType = sessionData.tipo || "CLIENTE";

                // Validação mínima
                if (!emailFromSession || typeof emailFromSession !== 'string') {
                    throw new Error("E-mail da sessão inválido");
                }

                let userData = {
                    id: userIdFromSession,
                    nome: "Carregando...",
                    email: emailFromSession,
                    tipo: userType,
                };

                console.log('📋 Dados da sessão:', { id: userIdFromSession, email: emailFromSession, tipo: userType });

                // 2. Carrega dados reais do cliente PELO E-MAIL (não pelo ID)
                if (userType === "CLIENTE") {
                    try {
                        const encodedEmail = encodeURIComponent(emailFromSession);
                        const perfilResponse = await api.get(`/api/v1/clientes/perfil?email=${encodedEmail}`);
                        const perfil = perfilResponse.data;

                        userData.nome = perfil.nome || emailFromSession.split('@')[0];
                        userData.id = perfil.id_cliente || userIdFromSession; // atualiza ID se disponível
                    } catch (err) {
                        console.warn("⚠️ Não foi possível carregar perfil por e-mail. Usando fallback.", err);
                        userData.nome = emailFromSession.split('@')[0] || "Usuário";
                    }
                } else {
                    // Para outros tipos (ex: FUNCIONARIO), usa o que vier
                    userData.nome = emailFromSession.split('@')[0] || "Usuário";
                }

                console.log('✅ Usuário autenticado:', userData);
                setUser(userData);
            } else {
                console.log('❌ Sessão não está logada');
                logout();
            }
        } catch (error) {
            console.error("❌ Erro ao validar sessão:", error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = (loginEmail, token, userDataFromLogin = {}) => {
        // Salva no localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userEmail', loginEmail);

        // Configura API
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Cria objeto user mínimo
        const userToSet = {
            id: userDataFromLogin.id || null,
            nome: userDataFromLogin.nome || loginEmail.split('@')[0],
            email: loginEmail,
            tipo: userDataFromLogin.tipo || "CLIENTE",
        };

        setUser(userToSet);
        setLoading(false);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
        setLoading(false);
    };

    const value = {
        user,
        userId: user?.id,
        userEmail: user?.email,
        isAuthenticated: !!user,
        isCliente: user?.tipo === 'CLIENTE',
        isFuncionario: user?.tipo === 'FUNCIONARIO',
        isAdmin: user?.tipo === 'ADMIN',
        login,
        logout,
        loading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}