// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './components.css';
import { useState } from 'react';
import { useAuth } from '../utils/useAuth'; // Importando useAuth
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faUser, faShield, faNewspaper, faList } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/locaobraLogo.png';

function Header() {
    const { user, logout } = useAuth(); // Obtendo o usuário e a função de logout;

    const handleLogout = () => {
        logout(); // Chama a função de logout
    };

    return (
        <header>
            <div className="container">

                <div className="logo">
                    <img src={logo} className="logo-isotipo" alt="logo" />
                </div>

                <nav>
                    {/* ==================== MENU PARA ADMIN ==================== */}
                    {user && user.tipo === 'ADMIN' && (
                        <>
                            <Link to="/admin" className='abas dashboard-link'>
                                <FontAwesomeIcon icon={faShield} /> Admin
                            </Link>

                        </>
                    )}

                    {/* ==================== MENU PARA FUNCIONARIO ==================== */}
                    {user && user.tipo === 'FUNCIONARIO' && (
                        <>
                        </>
                    )}

                    {/* ==================== MENU PARA CLIENTE ==================== */}
                    {user && user.tipo === 'CLIENTE' || !user && (
                        <>
                            <Link to="/#" className='abas'>Elevação</Link>
                            <Link to="/#" className='abas'>Andaimes</Link>
                            <Link to="/#" className='abas'>Concretagem</Link>
                            <Link to="/#" className='abas'>Ferramentas</Link>
                        </>
                    )}


                </nav>
                <nav>
                    {/* ==================== PERFIL E LOGOUT ==================== */}
                    {user ? (
                        <div>
                            <button className="abas perfil-link">
                                <FontAwesomeIcon icon={faUser} /> {user.nome || 'Perfil'}
                            </button>
                            <div className="dropdown-content user-dropdown-content">
                                <Link to="/perfil" className="sub-item">
                                    <FontAwesomeIcon icon={faUser} /> Ver Perfil
                                </Link>
                                <button onClick={handleLogout} className="sub-item logout-dropdown">
                                    <FontAwesomeIcon icon={faRightFromBracket} /> Sair
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div>
                                <Link to="/login" className='abas login-btn'>Entrar ou Cadastrar-se</Link>
                            </div>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Header;
