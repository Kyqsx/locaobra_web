import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './components.css';
import { useAuth } from '../utils/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRightFromBracket, 
  faChartPie, 
  faTools, 
  faClipboardList, 
  faUsers,
  faArrowLeft 
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-container">
        {/* Logo / Título */}
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo">
             <span className="loca">LOCA</span><span className="obra">OBRA</span>
          </Link>
          <p className="sidebar-subtitle">Painel Admin</p>
        </div>

        {/* Links de Navegação - Usando os estilos do Dropdown */}
        <nav className="sidebar-nav user-dropdown-content" style={{ display: 'block', position: 'static', boxShadow: 'none', opacity: 1 }}>
          <Link to="/admin" className="sub-item">
            <FontAwesomeIcon icon={faChartPie} /> Dashboard
          </Link>
          <Link to="/admin/equipamentos" className="sub-item">
            <FontAwesomeIcon icon={faTools} /> Equipamentos
          </Link>
          <Link to="/admin/pedidos" className="sub-item">
            <FontAwesomeIcon icon={faClipboardList} /> Pedidos
          </Link>
          <Link to="/admin/clientes" className="sub-item">
            <FontAwesomeIcon icon={faUsers} /> Clientes
          </Link>

          <div className="sidebar-divider"></div>

          <Link to="/" className="sub-item">
            <FontAwesomeIcon icon={faArrowLeft} /> Voltar ao Site
          </Link>
          
          <button className="sub-item logout-dropdown" onClick={logout}>
            <FontAwesomeIcon icon={faRightFromBracket} /> Sair
          </button>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;