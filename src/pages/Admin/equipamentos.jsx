import React, { useEffect, useState, useMemo } from 'react';
import api from '../../service/api';
import './EquipamentoTest.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faTrash, faTools, faFileImport, faList } from '@fortawesome/free-solid-svg-icons';

export default function EquipamentoTest() {
    const [equipamentos, setEquipamentos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [form, setForm] = useState({
        nome: '',
        categoria: '',
        descricao: '',
        valorDiaria: '',
        numeroDeSerie: '',
        especificacoes: [],
    });
    const [message, setMessage] = useState(null);
    const [uploadFiles, setUploadFiles] = useState(null);

    useEffect(() => {
        fetchList();
    }, []);

    function fetchList() {
        setLoading(true);
        api.get('/api/equipamentos')
            .then(response => setEquipamentos(response.data))
            .catch(err => setMessage({ type: 'error', text: 'Erro ao buscar: ' + (err.response?.data || err.message) }))
            .finally(() => setLoading(false));
    }

    // Função de Deleção
    function handleDelete(id) {
        if (window.confirm('Tem certeza que deseja excluir este equipamento?')) {
            api.delete(`/api/equipamentos/${id}`)
                .then(() => {
                    setMessage({ type: 'success', text: 'Equipamento excluído com sucesso!' });
                    fetchList(); // Atualiza a planilha
                })
                .catch(err => {
                    setMessage({ type: 'error', text: 'Erro ao excluir: ' + (err.response?.data || err.message) });
                });
        }
    }

    const filteredEquipamentos = useMemo(() => {
        return equipamentos.filter(eq =>
            eq.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (eq.numeroDeSerie && eq.numeroDeSerie.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [equipamentos, searchTerm]);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    function addSpecField() {
        setForm(prev => ({ ...prev, especificacoes: [...prev.especificacoes, { chave: '', valor: '' }] }));
    }

    function updateSpecAt(i, field, value) {
        setForm(prev => {
            const arr = [...prev.especificacoes];
            arr[i][field] = value;
            return { ...prev, especificacoes: arr };
        });
    }

    function removeSpecAt(i) {
        setForm(prev => ({
            ...prev,
            especificacoes: prev.especificacoes.filter((_, idx) => idx !== i)
        }));
    }

    function parseSpecsForBackend() {
        return form.especificacoes
            .filter(s => s.chave.trim() && s.valor.trim())
            .map(s => ({ chave: s.chave.trim(), valor: s.valor.trim() }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        setMessage({ type: 'info', text: 'Enviando...' });

        const data = {
            nome: form.nome,
            descricao: form.descricao,
            categoria: form.categoria,
            valorDiaria: parseFloat(form.valorDiaria) || 0,
            numeroDeSerie: form.numeroDeSerie || null,
            especificacoes: parseSpecsForBackend()
        };

        const fd = new FormData();
        fd.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));

        if (uploadFiles && uploadFiles.length > 0) {
            for (let i = 0; i < uploadFiles.length; i++) {
                fd.append('files', uploadFiles[i]);
            }
        }

        api.post('/api/equipamentos', fd, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(() => {
                setMessage({ type: 'success', text: 'Equipamento criado com sucesso!' });
                setForm({ nome: '', categoria: '', descricao: '', valorDiaria: '', numeroDeSerie: '', especificacoes: [] });
                setUploadFiles(null);
                e.target.reset();
                fetchList();
            })
            .catch(err => setMessage({ type: 'error', text: 'Erro ao criar: ' + (err.response?.data || err.message) }));
    }

    return (
        <div className="adminContent">
            <div className="viewHeader">
                <h2 className="pageTitle">Gestão de Equipamentos</h2>
                <div className="headerRight">

                </div>
            </div>

            {message && (
                <div className={`messageBanner ${message.type === 'error' ? 'negative' : 'positive'}`}>
                    {message.text}
                </div>
            )}

            <div className="settingsCard">
                <h3><FontAwesomeIcon icon={faPlus} /> Cadastrar Equipamento</h3>
                <form onSubmit={handleSubmit} className="equipForm">
                    <div className="formGrid">
                        <input className="equipInput" name="nome" placeholder="Nome do Equipamento" value={form.nome} onChange={handleChange} required />
                        <input className="equipInput" name="categoria" placeholder="Categoria" value={form.categoria} onChange={handleChange} required />
                        <input className="equipInput" name="valorDiaria" placeholder="Diária (0.00)" value={form.valorDiaria} onChange={handleChange} required />
                        <input className="equipInput" name="numeroDeSerie" placeholder="Nº de Série" value={form.numeroDeSerie} onChange={handleChange} />
                    </div>

                    <textarea className="equipTextarea" name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} rows={2} />

                    <div className="specsContainer">
                        <div className="specsHeader">
                            <label><FontAwesomeIcon icon={faTools} /> Atributos</label>
                            <button type="button" onClick={addSpecField} className="smallBtn success">+ Adicionar</button>
                        </div>

                        {form.especificacoes.map((s, i) => (
                            <div key={i} className="specRow">
                                <input className="equipInput" placeholder="Chave" value={s.chave} onChange={e => updateSpecAt(i, 'chave', e.target.value)} />
                                <input className="equipInput" placeholder="Valor" value={s.valor} onChange={e => updateSpecAt(i, 'valor', e.target.value)} />
                                <button type="button" onClick={() => removeSpecAt(i)} className="actionBtn delete height100"><FontAwesomeIcon icon={faTrash} /></button>
                            </div>
                        ))}
                    </div>

                    <div className="formFooter">
                        <div className="fileInputWrapper">
                            <FontAwesomeIcon icon={faFileImport} />
                            <input type="file" multiple onChange={e => setUploadFiles(e.target.files)} accept="image/*" />
                        </div>
                        <button type="submit" className="addBtn">Salvar</button>
                    </div>
                </form>
            </div>

            <div className="recentUsersSection">
                <div className="sectionHeader">
                    <h3><FontAwesomeIcon icon={faList} /> Planilha de Cadastrados</h3>
                    <div className="headerRight">
                        <div className="searchBox">
                            <FontAwesomeIcon icon={faSearch} className="searchIcon" />
                            <input
                                className="searchInput"
                                placeholder="Pesquisar equipamento..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="tableWrapper">
                    <table className="usersTable">
                        <thead>
                            <tr>
                                <th>Equipamento</th>
                                <th>Categoria</th>
                                <th>Diária</th>
                                <th>Série</th>
                                <th>Specs</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!loading && filteredEquipamentos.map(eq => (
                                <tr key={eq.id} className="tableRow">
                                    <td className="nameCell">
                                        <div className="userCell">
                                            <div className="userCellAvatar">{eq.nome.charAt(0)}</div>
                                            <div>
                                                <div className="userName">{eq.nome}</div>
                                                <div className="userRole">{eq.descricao?.substring(0, 25)}...</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span className="typeTag fornercedor">{eq.categoria}</span></td>
                                    <td className="userName">R$ {eq.valorDiaria?.toFixed(2)}</td>
                                    <td className="dateCell">{eq.numeroDeSerie || '---'}</td>
                                    <td>
                                        <div className="specsTableList">
                                            {eq.especificacoes && Object.entries(eq.especificacoes).slice(0, 1).map(([k, v]) => (
                                                <div key={k} className="miniTag">{k}: {v}</div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="actionsCell">
                                        {/* Botão de Delete Vinculado */}
                                        <button
                                            className="actionBtn delete"
                                            onClick={() => handleDelete(eq.id)}
                                            title="Excluir"
                                        >
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
    );
}