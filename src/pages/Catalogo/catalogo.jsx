import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './Catalogo.css';

const EQUIPAMENTOS = [
  { 
    id: 1, 
    nome: 'Andaime Tubular 1.0m', 
    categoria: 'andaimes', 
    valorBase: 10,
    descricao: 'Ideal para reformas, manutenções e pinturas em fachadas. Estrutura robusta e fácil montagem.'
  },
  { 
    id: 2, 
    nome: 'Andaime Fachadeiro', 
    categoria: 'andaimes',
    valorBase: 15,
    descricao: 'Permite o livre acesso de pessoas pela base e a movimentação horizontal em vários níveis de trabalho.'
  },
  { 
    id: 3, 
    nome: 'Escada Extensível', 
    categoria: 'acesso-elevacao', 
    valorBase: 10,
    descricao: 'Escada de alumínio leve e resistente, alcança grandes alturas com total segurança para o operador.'
  },
  { 
    id: 6, 
    nome: 'Empilhadeira Elétrica', 
    categoria: 'acesso-elevacao', 
    valorBase: 450,
    descricao: 'Equipamento de alta performance para movimentação de cargas em galpões e centros de distribuição.'
  },
];

function Catalogo() {
  const { slug } = useParams(); 
  const nomeFormatado = slug ? slug.replace(/-/g, ' ') : "";
  const itensFiltrados = EQUIPAMENTOS.filter(item => item.categoria === slug);

  return (
    <div className="container-catalogo">
      <nav className="breadcrumb">
        <Link to="/">Início</Link>
        <span className="separador">›</span>
        <span className="pagina-atual">{nomeFormatado}</span>
      </nav>

      <div className="header-catalogo">
        <h1 className="titulo-pagina">
          Aluguel de Equipamentos para <span className="destaque-categoria">{nomeFormatado}</span>
        </h1>

        <button className="btn-filtrar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          Filtrar
        </button>
      </div>
      
      <div className="grid-produtos">
        {itensFiltrados.length > 0 ? (
          itensFiltrados.map(item => (
            <div key={item.id} className="card-produto">
              <div className="placeholder-img">🏗️</div> 
              <h3>{item.nome}</h3>
              
              {/* DESCRIÇÃO COM LIMITE DE LINHAS NO CSS */}
              <p className="descricao-produto">
                {item.descricao || "Sem descrição disponível para este equipamento."}
              </p>

              <p className="preco-diaria">
                Diária: <span className='valor'>R$ {item.valorBase?.toFixed(2)}</span>
              </p>

              <button className="btn-alugar">Alugar agora</button>
            </div>
          ))
        ) : (
          <div className="vazio">
            <p>Nenhum equipamento encontrado em <strong>{nomeFormatado}</strong>.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Catalogo;