import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <NavLink to="/admin" className="logo">
          <span className="logo-text">
            <span className="loca">LOCA</span>
            <span className="obra">OBRA</span>
          </span>
        </NavLink>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          <li>
            <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <span className="icon">📊</span> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/produtos" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <span className="icon">📦</span> Produtos
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/pedidos" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <span className="icon">🛒</span> Pedidos
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/clientes" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <span className="icon">👥</span> Clientes
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="btn-logout" onClick={() => console.log('Sair')}>
          Sair
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;