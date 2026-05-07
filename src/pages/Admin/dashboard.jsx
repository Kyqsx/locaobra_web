import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faChartLine, faUsers, faToolbox, faDollarSign, faCog, faSignOut, faHome, faFileAlt, faBell, faSearch, faEllipsisV, faChevronRight, faFilter, faEye, faTrash, faEdit, faHardHat } from '@fortawesome/free-solid-svg-icons';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [notifications, setNotifications] = useState(3);

  // Dados simulados
  const stats = [
    { title: 'Usuários Ativos', value: '2.547', change: '+12.5%', icon: faUsers, color: '#ff8c00' },
    { title: 'Equipamentos', value: '1.234', change: '+8.2%', icon: faToolbox, color: '#4CAF50' },
    { title: 'Receita', value: 'R$ 45.892', change: '+23.4%', icon: faDollarSign, color: '#2196F3' },
    { title: 'Contratos', value: '567', change: '+5.1%', icon: faFileAlt, color: '#9C27B0' }
  ];

  const recentUsers = [
    { id: 1, nome: 'João Silva', email: 'joao@example.com', tipo: 'Cliente', status: 'Ativo', data: '2024-05-01' },
    { id: 2, nome: 'Maria Santos', email: 'maria@example.com', tipo: 'Fornecedor', status: 'Ativo', data: '2024-05-02' },
    { id: 3, nome: 'Carlos Oliveira', email: 'carlos@example.com', tipo: 'Cliente', status: 'Inativo', data: '2024-05-03' },
    { id: 4, nome: 'Ana Costa', email: 'ana@example.com', tipo: 'Admin', status: 'Ativo', data: '2024-05-04' },
    { id: 5, nome: 'Roberto Lima', email: 'roberto@example.com', tipo: 'Cliente', status: 'Ativo', data: '2024-05-05' }
  ];

  const handleLogout = () => {
    // Implementar logout
    console.log('Logout realizado');
  };

  return (
    <div className="adminDashboard">
      {/* Main Content */}
      <main className="adminMain">
        {/* Header */}
        <header className="adminHeader">
          <div className="headerLeft">
            <button className="menuToggleMobile" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} />
            </button>
            <h1 className="pageTitle">
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'usuarios' && 'Gerenciar Usuários'}
              {activeTab === 'equipamentos' && 'Equipamentos'}
              {activeTab === 'relatorios' && 'Relatórios'}
              {activeTab === 'configuracoes' && 'Configurações'}
            </h1>
          </div>

          <div className="headerRight">
            <div className="searchBox">
              <FontAwesomeIcon icon={faSearch} className="searchIcon" />
              <input
                type="text"
                placeholder="Pesquisar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="searchInput"
              />
            </div>

            <button className="notificationBtn">
              <FontAwesomeIcon icon={faBell} />
              {notifications > 0 && <span className="notificationBadge">{notifications}</span>}
            </button>

            <div className="userProfile">
              <div className="userAvatar">A</div>
              <div className="userInfo">
                <p className="userName">Admin User</p>
                <p className="userRole">Administrador</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <section className="adminContent">
          {activeTab === 'dashboard' && (
            <div className="dashboardView">
              {/* Stats Grid */}
              <div className="statsGrid">
                {stats.map((stat, index) => (
                  <div key={index} className="statCard">
                    <div className="statCardTop">
                      <div className="statInfo">
                        <p className="statTitle">{stat.title}</p>
                        <p className="statValue">{stat.value}</p>
                      </div>
                      <div className="statIcon" style={{ '--icon-color': stat.color }}>
                        <FontAwesomeIcon icon={stat.icon} />
                      </div>
                    </div>
                    <div className="statChange positive">
                      <FontAwesomeIcon icon={faChartLine} />
                      <span>{stat.change}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts Section */}
              <div className="chartsSection">
                <div className="chartCard">
                  <div className="chartHeader">
                    <h3>Receita Mensal</h3>
                    <button className="chartMenu">
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </button>
                  </div>
                  <div className="chartPlaceholder">
                    <div className="fakeChart">
                      <div className="chartBar" style={{ height: '60%' }}></div>
                      <div className="chartBar" style={{ height: '75%' }}></div>
                      <div className="chartBar" style={{ height: '45%' }}></div>
                      <div className="chartBar" style={{ height: '90%' }}></div>
                      <div className="chartBar" style={{ height: '70%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="chartCard">
                  <div className="chartHeader">
                    <h3>Distribuição por Tipo</h3>
                    <button className="chartMenu">
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </button>
                  </div>
                  <div className="pieChartPlaceholder">
                    <svg viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#ff8c00" strokeWidth="15" strokeDasharray="70 314" />
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#4CAF50" strokeWidth="15" strokeDasharray="120 314" strokeDashoffset="-70" />
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#2196F3" strokeWidth="15" strokeDasharray="124 314" strokeDashoffset="-190" />
                    </svg>
                    <div className="pieLabels">
                      <div className="pieLabel"><span className="pieLegend" style={{ background: '#ff8c00' }}></span> Clientes</div>
                      <div className="pieLabel"><span className="pieLegend" style={{ background: '#4CAF50' }}></span> Fornecedores</div>
                      <div className="pieLabel"><span className="pieLegend" style={{ background: '#2196F3' }}></span> Admins</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Users Table */}
              <div className="recentUsersSection">
                <div className="sectionHeader">
                  <h3>Usuários Recentes</h3>
                  <button className="filterBtn">
                    <FontAwesomeIcon icon={faFilter} />
                    Filtrar
                  </button>
                </div>

                <div className="tableWrapper">
                  <table className="usersTable">
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Tipo</th>
                        <th>Status</th>
                        <th>Data</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map(user => (
                        <tr key={user.id} className="tableRow">
                          <td className="nameCell">
                            <div className="userCell">
                              <div className="userCellAvatar">{user.nome.charAt(0)}</div>
                              <span>{user.nome}</span>
                            </div>
                          </td>
                          <td>{user.email}</td>
                          <td>
                            <span className={`typeTag ${user.tipo.toLowerCase()}`}>
                              {user.tipo}
                            </span>
                          </td>
                          <td>
                            <span className={`statusTag ${user.status.toLowerCase()}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="dateCell">{user.data}</td>
                          <td className="actionsCell">
                            <button className="actionBtn view" title="Visualizar">
                              <FontAwesomeIcon icon={faEye} />
                            </button>
                            <button className="actionBtn edit" title="Editar">
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button className="actionBtn delete" title="Deletar">
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'usuarios' && (
            <div className="usersView">
              <div className="viewHeader">
                <button className="addBtn">+ Novo Usuário</button>
              </div>
              <div className="tableWrapper">
                <table className="usersTable">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Email</th>
                      <th>Tipo</th>
                      <th>Status</th>
                      <th>Data Cadastro</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map(user => (
                      <tr key={user.id} className="tableRow">
                        <td className="nameCell">
                          <div className="userCell">
                            <div className="userCellAvatar">{user.nome.charAt(0)}</div>
                            <span>{user.nome}</span>
                          </div>
                        </td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`typeTag ${user.tipo.toLowerCase()}`}>
                            {user.tipo}
                          </span>
                        </td>
                        <td>
                          <span className={`statusTag ${user.status.toLowerCase()}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="dateCell">{user.data}</td>
                        <td className="actionsCell">
                          <button className="actionBtn view" title="Visualizar">
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                          <button className="actionBtn edit" title="Editar">
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button className="actionBtn delete" title="Deletar">
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'equipamentos' && (
            <div className="equipView">
              <div className="viewHeader">
                <button className="addBtn">+ Novo Equipamento</button>
              </div>
              <div className="equipGrid">
                {[1, 2, 3, 4, 5, 6].map(item => (
                  <div key={item} className="equipCard">
                    <div className="equipImage">
                      <FontAwesomeIcon icon={faToolbox} />
                    </div>
                    <div className="equipInfo">
                      <h4>Escavadeira CAT 320</h4>
                      <p className="equipStatus">Disponível</p>
                      <p className="equipPrice">R$ 500/dia</p>
                      <div className="equipActions">
                        <button className="smallBtn">Editar</button>
                        <button className="smallBtn delete">Deletar</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'relatorios' && (
            <div className="relatoriosView">
              <div className="reportCard">
                <h3>Relatórios Disponíveis</h3>
                <div className="reportsList">
                  <div className="reportItem">
                    <div className="reportIcon">
                      <FontAwesomeIcon icon={faFileAlt} />
                    </div>
                    <div className="reportInfo">
                      <h4>Relatório de Usuários</h4>
                      <p>Gerado em 01/05/2024</p>
                    </div>
                    <button className="downloadBtn">Baixar</button>
                  </div>
                  <div className="reportItem">
                    <div className="reportIcon">
                      <FontAwesomeIcon icon={faFileAlt} />
                    </div>
                    <div className="reportInfo">
                      <h4>Relatório Financeiro</h4>
                      <p>Gerado em 01/05/2024</p>
                    </div>
                    <button className="downloadBtn">Baixar</button>
                  </div>
                  <div className="reportItem">
                    <div className="reportIcon">
                      <FontAwesomeIcon icon={faFileAlt} />
                    </div>
                    <div className="reportInfo">
                      <h4>Relatório de Equipamentos</h4>
                      <p>Gerado em 01/05/2024</p>
                    </div>
                    <button className="downloadBtn">Baixar</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'configuracoes' && (
            <div className="settingsView">
              <div className="settingsCard">
                <h3>Configurações do Sistema</h3>
                <div className="settingItem">
                  <div className="settingLabel">
                    <h4>Notificações por Email</h4>
                    <p>Receber notificações de novos usuários</p>
                  </div>
                  <label className="toggleSwitch">
                    <input type="checkbox" defaultChecked />
                    <span className="toggleSlider"></span>
                  </label>
                </div>

                <div className="settingItem">
                  <div className="settingLabel">
                    <h4>Modo de Manutenção</h4>
                    <p>Desativar acesso para usuários comuns</p>
                  </div>
                  <label className="toggleSwitch">
                    <input type="checkbox" />
                    <span className="toggleSlider"></span>
                  </label>
                </div>

                <div className="settingItem">
                  <div className="settingLabel">
                    <h4>Backup Automático</h4>
                    <p>Realizado diariamente às 2:00 AM</p>
                  </div>
                  <label className="toggleSwitch">
                    <input type="checkbox" defaultChecked />
                    <span className="toggleSlider"></span>
                  </label>
                </div>
              </div>

              <div className="settingsCard">
                <h3>Perigo</h3>
                <button className="dangerBtn">Limpar Cache</button>
                <button className="dangerBtn">Resetar Senha de Admin</button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;