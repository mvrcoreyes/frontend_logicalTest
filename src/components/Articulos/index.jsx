import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArticulosPage = () => {
    const [articulos, setArticulos] = useState([]);
    const [codigo, setCodigo] = useState('');
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [aplicaIVA, setAplicaIVA] = useState(false);

    const fetchArticulos = async () => {
        const response = await axios.get('http://localhost:5000/api/articulos');
        setArticulos(response.data);
    };

    useEffect(() => {
        fetchArticulos();
    }, []);

    const handleAddArticulo = async () => {
        const newArticulo = { codigo, nombre, precio: parseFloat(precio), aplicaIVA };
        await axios.post('http://localhost:5000/api/articulos', newArticulo);
        fetchArticulos();
    };

    const handleDeleteArticulo = async (id) => {
        await axios.delete(`http://localhost:5000/api/articulos/${id}`);
        fetchArticulos();
    };

    return (
        <div>
            <h2>Artículos</h2>
            <input type="text" placeholder="Código" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
            <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <input type="text" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
            <label>
                <input type="checkbox" checked={aplicaIVA} onChange={(e) => setAplicaIVA(e.target.checked)} />
                Aplica IVA
            </label>
            <button onClick={handleAddArticulo}>Agregar Artículo</button>
            <table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Aplica IVA</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {articulos.map(articulo => (
                        <tr key={articulo.id}>
                            <td>{articulo.codigo}</td>
                            <td>{articulo.nombre}</td>
                            <td>{articulo.precio}</td>
                            <td>{articulo.aplicaIVA ? 'Sí' : 'No'}</td>
                            <td>
                                <button onClick={() => handleDeleteArticulo(articulo.id)}>Eliminar</button>
                                {/* Add Edit button and functionality */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ArticulosPage;
