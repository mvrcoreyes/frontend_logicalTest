import React, { useState } from 'react';
import axios from 'axios';

const FacturacionPage = () => {
    const [codigo, setCodigo] = useState('');
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [items, setItems] = useState([]);

    const handleAddItem = () => {
        const articulo = {
            codigo,
            nombre,
            cantidad: parseInt(cantidad, 10),
            precio: 0, // Obtener precio real del artículo
            IVA: 0,    // Calcular IVA si aplica
            total: 0   // Calcular total
        };
        articulo.total = (articulo.precio * articulo.cantidad) + (articulo.IVA ? articulo.precio * 0.13 : 0);
        setItems([...items, articulo]);
    };

    const handleSaveFactura = async () => {
        const factura = {
            fecha: new Date(),
            detalles: items
        };
        await axios.post('http://localhost:5000/api/facturacion', factura);
        // Limpiar formulario y tabla
        setCodigo('');
        setNombre('');
        setCantidad('');
        setItems([]);
    };

    return (
        <div>
            <h2>Facturación</h2>
            <input type="text" placeholder="Código" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
            <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <input type="text" placeholder="Cantidad" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
            <button onClick={handleAddItem}>Agregar</button>
            <table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>IVA</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.codigo}</td>
                            <td>{item.nombre}</td>
                            <td>{item.precio}</td>
                            <td>{item.IVA ? item.precio * 0.13 : 0}</td>
                            <td>{item.total}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="4">Total</td>
                        <td>{items.reduce((acc, item) => acc + item.total, 0)}</td>
                    </tr>
                </tfoot>
            </table>
            <button onClick={handleSaveFactura}>Guardar Factura</button>
        </div>
    );
};

export default FacturacionPage;
