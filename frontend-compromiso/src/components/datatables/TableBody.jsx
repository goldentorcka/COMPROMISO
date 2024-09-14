import React from 'react';

const TableBody = ({ data }) => {
    return (
        <tbody className="p-datatable-tbody" role="rowgroup">
            {data.map((row, index) => (
                <tr key={index} role="row">
                    {Object.values(row).map((cell, idx) => (
                        <td key={idx} role="cell" style={{ width: `${100 / Object.keys(row).length}%` }}>
                            {cell}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

export default TableBody;
