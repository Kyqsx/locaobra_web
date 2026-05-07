import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../service/api'; // Importe sua instância do axios
import './Catalogo.css';

function Catalogo() {
  const { slug } = useParams();
  const [equipamentos, setEquipamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const nomeFormatado = slug ? slug.replace(/-/g, ' ') : "";

  useEffect(() => {
    fetchEquipamentos();
  }, [slug]); // Recarrega sempre que mudar a categoria na URL

  function fetchEquipamentos() {
    setLoading(true);
    setError(null);

    // Faz a chamada para o seu endpoint de listagem
    api.get('/api/equipamentos')
      .then(response => {
        // Filtra os equipamentos que pertencem à categoria atual (slug)
        // Certifique-se de que no banco a categoria esteja salva em maiúsculas ou minúsculas conforme o slug
        const filtrados = response.data.filter(eq =>
          eq.categoria.toLowerCase() === slug.toLowerCase()
        );
        setEquipamentos(filtrados);
      })
      .catch(err => {
        console.error(err);
        setError("Não foi possível carregar os equipamentos.");
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="container-catalogo">
      <nav className="breadcrumb">
        <Link to="/">Início</Link>
        <span className="separador">›</span>
        <span className="pagina-atual">{nomeFormatado}</span>
      </nav>

      <div className="header-catalogo">
        <h1 className="titulo-pagina">
          Aluguel de <span className="destaque-categoria">{nomeFormatado}</span>
        </h1>

        <button className="btn-filtrar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          Filtrar
        </button>
      </div>

      <div className="grid-produtos">
        {loading ? (
          <div className="loading-container">Carregando equipamentos...</div>
        ) : error ? (
          <div className="error-container">{error}</div>
        ) : equipamentos.length > 0 ? (
          equipamentos.map(item => (
            <div key={item.id} className="card-produto">
              <Link to={`/productview/${item.id}`} className="btn-card">
                <div className="image-container">
                  {item.imagens && item.imagens.length > 0 ? (
                    <img
                      src={`${api.defaults.baseURL}${item.imagens[0]}`}
                      alt={item.nome}
                      className="img-produto-cat"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<div class="placeholder-img">🏗️</div>';
                      }}
                    />
                  ) : (
                    <div className="placeholder-img">🏗️</div>
                  )}
                </div>

                <h3>{item.nome}</h3>

                <p className="descricao-produto">
                  {item.descricao || "Sem descrição disponível."}
                </p>

                <p className="preco-diaria">
                  <span className='valor'>R$ {item.valorDiaria?.toFixed(2)}</span>
                </p>

              </Link> 
            </div>
          ))
        ) : (
          <div className="vazio">
            <p>Nenhum equipamento disponível em <strong>{nomeFormatado}</strong> no momento.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Catalogo;