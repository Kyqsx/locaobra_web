import React from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

// 1. Simulação de um Banco de Dados de equipamentos
const EQUIPAMENTOS = [
  { id: 1, nome: 'Andaime Tubular', categoria: 'andaimes' },
  { id: 2, nome: 'Andaime Fachadeiro', categoria: 'andaimes' },
  { id: 3, nome: 'Plataforma Tesoura', categoria: 'acesso-e-elevacao' },
  { id: 4, nome: 'Escada Extensível', categoria: 'acesso-e-elevacao' },
];

// 2. Componente de Página Único (O "Molde")
function PaginaCategoria() {
  // O hook useParams captura o que vier depois de /mais-alugados/ na URL
  const { slug } = useParams();

  // Filtramos a lista baseada no parâmetro da URL
  const itensFiltrados = EQUIPAMENTOS.filter(item => item.categoria === slug);

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Categoria: <span style={{ color: 'orange' }}>{slug.replace(/-/g, ' ')}</span></h2>

      <div style={{ display: 'grid', gap: '10px' }}>
        {itensFiltrados.length > 0 ? (
          itensFiltrados.map(item => (
            <div key={item.id} style={{ border: '1px solid #ddd', padding: '10px' }}>
              <h3>{item.nome}</h3>
              <button>Alugar agora</button>
            </div>
          ))
        ) : (
          <p>Nenhum equipamento encontrado nesta categoria.</p>
        )}
      </div>
    </main>
  );
}

// 3. Configuração das Rotas
export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ display: 'flex', gap: '20px', padding: '10px', background: '#f4f4f4' }}>
        <Link to="/produtos/mais-alugados/andaimes">Andaimes</Link>
        <Link to="/produtos/mais-alugados/acesso-e-elevacao">Acesso e Elevação</Link>
      </nav>

      <Routes>
        {/* O :slug é a "chave" dinâmica que aceita qualquer texto */}
        <Route path="/produtos/mais-alugados/:slug" element={<PaginaCategoria />} />

        <Route path="/" element={<p style={{padding: '20px'}}>Selecione uma categoria acima.</p>} />
      </Routes>
    </BrowserRouter>
  );
}