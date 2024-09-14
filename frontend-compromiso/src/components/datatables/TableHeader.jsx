import React from 'react';

const TableHeader = ({ columns }) => {
    return (
        <thead className="p-datatable-thead" role="rowgroup">
            <tr role="row">
                {columns.map((column, index) => (
                    <th
                        key={index}
                        role="columnheader"
                        style={{ width: `${100 / columns.length}%` }}
                    >
                        <div className="p-column-header-content">
                            <span className="p-column-title">{column}</span>
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHeader;
