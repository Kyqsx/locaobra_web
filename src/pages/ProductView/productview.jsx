import React, { useState } from 'react';
import './ProductPage.css';

const ProductPageLocaObra = () => {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedOption, setSelectedOption] = useState('padrao');

  const images = [null, null, null, null];

  const specs = [
    { label: 'Material', value: 'Alumínio Resistente' },
    { label: 'Altura Máxima', value: '4.5 metros' },
    { label: 'Peso Máximo', value: '150 kg' },
    { label: 'Acabamento', value: 'Fosco Antiderrapante' },
  ];

  const handleQuantityChange = (operation) => {
    if (operation === 'increase') {
      setQuantity(quantity + 1);
    } else if (operation === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityInput = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(value > 0 ? value : 1);
  };

  const handleRent = () => {
    alert(`Alugando ${quantity}x Escada Extensível. Redirecionando para checkout...`);
  };

  return (
    <div>
      {/* Produto */}
      <div className="produto-wrapper">
        <div className="produto-container">
          {/* Seção de Imagens com Título e Descrição */}
          <div className="product-image-section">
            <div className="main-image-container">
              <div className="main-image-placeholder">📐</div>
            </div>
            <div className="thumbnail-carousel">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`thumbnail ${activeImage === index ? 'active' : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <span style={{ fontSize: '28px' }}>📐</span>
                </div>
              ))}
            </div>

            {/* Informações Adicionais */}
            <div className="additional-info">
              <div className="info-title">
                <span className="info-icon">ℹ</span>
                Informações de Aluguel
              </div>
              <div className="info-list">
                <div className="info-item">
                  <span className="info-icon">📦</span>
                  Entrega e retirada gratuitas em São Paulo
                </div>
                <div className="info-item">
                  <span className="info-icon">🛡️</span>
                  Produto com seguro incluído
                </div>
                <div className="info-item">
                  <span className="info-icon">⚙️</span>
                  Suporte técnico 24/7
                </div>
                <div className="info-item">
                  <span className="info-icon">💳</span>
                  Pagamento seguro com parcelamento
                </div>
              </div>
            </div>
          </div>

          {/* Seção de Informações - Lado Direito */}
          <div className="product-info-section">
            {/* Título, Descrição e Avaliações embaixo das imagens */}
            <div className="product-text-section">
              <h1 className="product-title">Escada Extensível Profissional</h1>
              <p className="product-description">
                Escada de alumínio leve e resistente para trabalhos em altura. 
                Ideal para construção civil, pinturas, limpezas e manutenção. 
                Estrutura robusta que alcança grandes alturas com total segurança.
              </p>
              <div className="rating-section">
                <span className="stars">★★★★★</span>
                <span className="rating-count">4.8 (542 avaliações)</span>
              </div>
            </div>
            {/* Especificações */}
            <div className="specs-section">
              <div className="specs-title">Especificações Técnicas</div>
              <div className="specs-grid">
                {specs.map((spec, index) => (
                  <div key={index} className="spec-item">
                    <div className="spec-icon">✓</div>
                    <div className="spec-content">
                      <div className="spec-label">{spec.label}</div>
                      <div className="spec-value">{spec.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tipo de Locação e Quantidade */}
            <div className="options-section">
              <div className="option-group">
                <label className="option-label">Tipo de locação</label>
                <select
                  className="option-select"
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                >
                  <option value="padrao">Diária</option>
                  <option value="reforçada">Semanal</option>
                  <option value="profissional">Longo Prazo</option>
                </select>
              </div>

              <div className="option-group">
                <label className="option-label">Quantidade de Dias</label>
                <div className="quantity-selector">
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange('decrease')}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    className="quantity-input"
                    value={quantity}
                    onChange={handleQuantityInput}
                    min="1"
                  />
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange('increase')}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Ações */}
            <div className="actions-section">
              <button className="btn-main" onClick={handleRent}>
                <span>🛒</span> Alugar Agora
              </button>
              <button className="btn-secondary">
                <span>❤</span> Adicionar aos Favoritos
              </button>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageLocaObra;