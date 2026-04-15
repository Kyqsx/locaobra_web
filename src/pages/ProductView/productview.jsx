import './productview.css'
import betoneiraimg from "../../assets/betoneiraimg.png"

const ProductView = () => {

    return (
        <div className="container-productview">
            <div className="card-productview">
                <div className="left-side">
                    <div className='productview-image-container'>
                        <div className='thumbnails-column'>
                            <img className='sub-product-img' src={betoneiraimg} alt="Vista 1" />
                            <img className='sub-product-img' src={betoneiraimg} alt="Vista 2" />
                        </div>
                        <img className='product-img' src={betoneiraimg} alt="Produto Principal" />
                    </div>

                    <div className='info-group'>
                        <h2 className='titulo-info'>Confira a descrição</h2>
                        <p className='text-info'>A Betoneira CSM 400L é a escolha líder para obras de grande porte, oferecendo alta produtividade e durabilidade extrema para mistura de concreto e argamassa.</p>
                    </div>

                    <div className='specs-container'>
                        <h2 className='titulo-info'>Especificações Técnicas</h2>
                        <div className='specs-grid'>
                            <div className='spec-item'><strong>Capacidade:</strong> 400 Litros</div>
                            <div className='spec-item'><strong>Motor:</strong> 2.0 CV (Eletro)</div>
                            <div className='spec-item'><strong>Tensão:</strong> 220V</div>
                            <div className='spec-item'><strong>Peso:</strong> 180kg</div>
                        </div>
                    </div>
                </div>

                <div className="right-side">

                    <div className='info-group'>
                        <h2 className='titulo-info'>Opções de aluguel</h2>
                        <select name="rent-options" id="rent-options" className='form-select'>
                            <option value="daily">Diária</option>
                            <option value="weekly">Semanal (5% OFF)</option>
                            <option value="by-work">Mensal (15% OFF)</option>
                        </select>
                    </div>



                    <div className='info-group'>
                        <h2 className='titulo-info'>Valor da locação</h2>
                        <div className='price-row'>
                            <p className='text-info'>R$ 85,00 / dia</p>
                        </div>
                    </div>
                    <div className="info-group">
                        <h2 className='titulo-info'>Estoque Disponível</h2>
                        <p className='text-info'>100 unidades em estoque</p>
                    </div>
                    <div className="action-group">
                        <button className='btn btn-full buy-button'>Alugar Agora</button>
                        <button className='btn btn-full cart-button'>Adicionar ao Carrinho</button>
                    </div>
                    <div className="info-group">
                        <h2 className='titulo-info'>Calcular Entrega</h2>
                        <div className="frete-input-group">
                            <input type="text" placeholder="00000-000" className="frete-input" />
                            <button className="frete-button">OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default ProductView;