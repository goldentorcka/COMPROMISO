import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import Swal from 'sweetalert2';

const ProductTable = ({ product, columns, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedProduct, setEditedProduct] = useState({ ...product });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setEditedProduct({ ...product });
    }, [product]);

    const handleSave = () => {
        // Validar tipos de datos antes de guardar
        const newErrors = {};
        columns.forEach(column => {
            const value = editedProduct[column.field];
            if (column.type === 'number' && isNaN(value)) {
                newErrors[column.field] = 'Debe ser un número';
            }
            if (column.type === 'text' && typeof value !== 'string') {
                newErrors[column.field] = 'Debe ser texto';
            }
        });

        if (Object.keys(newErrors).length === 0) {
            onEdit(editedProduct);
            setIsEditing(false);
        } else {
            setErrors(newErrors);
        }
    };

    const handleDelete = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede revertir',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                onDelete(product.id);
            }
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: value });
    };

    return (
        <tr> {/* Aquí envolvemos todo en una fila de tabla */}
            {Array.isArray(columns) && columns.map((column) => (
                <td key={column.field} className="p-editable-column">
                    {isEditing ? (
                        column.type === 'select' ? (
                            <Dropdown
                                value={editedProduct[column.field]}
                                options={column.options}
                                onChange={(e) => handleChange({ target: { name: column.field, value: e.value } })}
                                placeholder="Selecciona"
                                className="p-dropdown"
                            />
                        ) : (
                            <>
                                <input
                                    type={column.type || 'text'}
                                    name={column.field}
                                    value={editedProduct[column.field] || ''}
                                    onChange={handleChange}
                                    className="p-inputtext p-component"
                                    style={{ 
                                        border: '1px solid #007adf', 
                                        backgroundColor: 'transparent', 
                                        width: '100%' 
                                    }} 
                                />
                                {errors[column.field] && (
                                    <small className="p-error">{errors[column.field]}</small>
                                )}
                            </>
                        )
                    ) : (
                        <span>{product[column.field]}</span>
                    )}
                </td>
            ))}
            <td style={{ display: 'flex', alignItems: 'center' }}>
                {!isEditing ? (
                    <>
                        <Button
                            icon="pi pi-pencil"
                            className="p-button-rounded"
                            onClick={() => setIsEditing(true)}
                            style={{ 
                                marginRight: '0.5rem', 
                                backgroundColor: 'transparent', 
                                border: 'none', 
                                color: 'black' 
                            }}
                        />
                        <Button
                            icon="pi pi-trash"
                            className="p-button-rounded p-button-danger"
                            onClick={handleDelete}
                            style={{ 
                                backgroundColor: 'transparent', 
                                border: 'none', 
                                color: 'black' 
                            }}
                        />
                    </>
                ) : (
                    <>
                        <Button
                            icon="pi pi-check"
                            className="p-button-rounded p-button-success"
                            onClick={handleSave}
                            style={{ backgroundColor: 'transparent', border: 'none' }}
                        />
                        <Button
                            icon="pi pi-times"
                            className="p-button-rounded p-button-danger"
                            onClick={() => setIsEditing(false)}
                            style={{ backgroundColor: 'transparent', border: 'none' }}
                        />
                    </>
                )}
            </td>
        </tr>
    );
};

export default ProductTable;
