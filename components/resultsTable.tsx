import React, { useEffect, useMemo, useState } from 'react';

interface ResultsTableProps {
    rows: number;
    columns: number;
    additionValues: Record<string, number>;
    multiplicationValues: Record<string, number>;
    operation: number;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ rows, columns, additionValues, multiplicationValues, operation }) => {
    const [localRows, setLocalRows] = useState<number>(rows);
    const [localColumns, setLocalColumns] = useState<number>(columns);
    const [hoveredCell, setHoveredCell] = useState<string | null>(null);
    const [cellValues, setCellValues] = useState<Record<string, number>>({});

    useEffect(() => {
        setLocalRows(rows);
        setLocalColumns(columns);
    }, [operation]);

    useEffect(() => {
        const newValues: Record<string, number> = {};

        for (let rowIndex = 0; rowIndex < localRows; rowIndex++) {
            for (let colIndex = 0; colIndex < localColumns; colIndex++) {
                const key = `r${rowIndex}c${colIndex}`;
                const additionValue = additionValues[key] || 0;
                const multiplicationValue = multiplicationValues[key] || 0;

                switch (operation) {
                    case 1:
                        newValues[key] = additionValue + multiplicationValue;
                        break;
                    case 2:
                        newValues[key] = additionValue - multiplicationValue;
                        break;
                    case 3:
                        newValues[key] = additionValue * multiplicationValue;
                        break;
                    default:
                        newValues[key] = additionValue;
                }
            }
        }

        setCellValues(newValues);
    }, [localRows, localColumns, additionValues, multiplicationValues, operation]);

    const handleMouseEnter = (key: string) => {
        setHoveredCell(key);
    };

    const handleMouseLeave = () => {
        setHoveredCell(null);
    };

    const handleOperationClick = (key: string, op: 'add' | 'subtract' | 'multiply') => {
        setCellValues(prevValues => {
            const newValues = { ...prevValues };
            const additionValue = additionValues[key] || 0;
            const multiplicationValue = multiplicationValues[key] || 0;

            switch (op) {
                case 'add':
                    newValues[key] = additionValue + multiplicationValue;
                    break;
                case 'subtract':
                    newValues[key] = additionValue - multiplicationValue;
                    break;
                case 'multiply':
                    newValues[key] = additionValue * multiplicationValue;
                    break;
            }

            return newValues;
        });
    };

    const headerCells = Array.from({ length: localColumns }, (_, index) => (
        <th key={index + 1} scope="col">{index}</th>
    ));

    const generateTableRows = () => (
        Array.from({ length: localRows }, (_, rowIndex) => (
            <tr key={rowIndex}>
                <th scope="row">{rowIndex}</th>
                {Array.from({ length: localColumns }, (_, colIndex) => {
                    const key = `r${rowIndex}c${colIndex}`;
                    const showButtons = hoveredCell === key;

                    return (
                        <td
                            key={colIndex}
                            onMouseEnter={() => handleMouseEnter(key)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div style={{ position: 'relative' }}>
                                {cellValues[key] || 0}
                                {showButtons && (
                                    <div className="operation-buttons" >
                                        <button
                                            className="btn btn-success btn-sm mx-1"
                                            onClick={() => handleOperationClick(key, 'add')}
                                        >
                                            Add
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm mx-1"
                                            onClick={() => handleOperationClick(key, 'subtract')}
                                        >
                                            Subtract
                                        </button>
                                        <button
                                            className="btn btn-primary btn-sm mx-1"
                                            onClick={() => handleOperationClick(key, 'multiply')}
                                        >
                                            Multiply
                                        </button>
                                    </div>
                                )}
                            </div>
                        </td>
                    );
                })}
            </tr>
        ))
    );

    if (!localColumns || !localRows) {
        return <></>;
    }

    return (
        <>
            {operation && (
                <div className='m-5'>
                    <div className="table-container">
                        <table className="table table-bordered table-hover shadow">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    {headerCells}
                                </tr>
                            </thead>
                            <tbody>
                                {generateTableRows()}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
};

export default ResultsTable;
