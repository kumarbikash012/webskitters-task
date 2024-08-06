import React, { useCallback, useEffect, useState } from 'react';

interface CombinedTableProps {
    rows: number;
    columns: number;
    refresh: boolean;
    setAdditionValues: React.Dispatch<React.SetStateAction<Record<string, number>>>;
    setMultiplicationValues: React.Dispatch<React.SetStateAction<Record<string, number>>>;
    additionValues: Record<string, number>;
    multiplicationValues: Record<string, number>;
}

const CombinedTable: React.FC<CombinedTableProps> = ({
    rows,
    columns,
    refresh,
    setAdditionValues,
    setMultiplicationValues,
    additionValues,
    multiplicationValues
}) => {
    const [localRows, setLocalRows] = useState<number>(rows);
    const [localColumns, setLocalColumns] = useState<number>(columns);
    const [initialAdditionValues, setInitialAdditionValues] = useState<Record<string, number>>({});
    const [initialMultiplicationValues, setInitialMultiplicationValues] = useState<Record<string, number>>({});

    const initializeValues = useCallback(() => {
        const newAdditionValues: Record<string, number> = {};
        const newMultiplicationValues: Record<string, number> = {};

        for (let rowIndex = 0; rowIndex < localRows; rowIndex++) {
            for (let colIndex = 0; colIndex < localColumns; colIndex++) {
                let additionValue = rowIndex + colIndex;
                let multiplicationValue = rowIndex * colIndex;

                newAdditionValues[`r${rowIndex}c${colIndex}`] = additionValue;
                newMultiplicationValues[`r${rowIndex}c${colIndex}`] = multiplicationValue;
            }
        }

        setAdditionValues(newAdditionValues);
        setMultiplicationValues(newMultiplicationValues);
        setInitialAdditionValues(newAdditionValues);
        setInitialMultiplicationValues(newMultiplicationValues);
    }, [localRows, localColumns, setAdditionValues, setMultiplicationValues]);

    useEffect(() => {
        initializeValues();
        setLocalRows(rows);
        setLocalColumns(columns);
    }, [refresh, initializeValues]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, key: string, tableType: 'addition' | 'multiplication') => {
        const value = +e.target.value;
        if (tableType === 'addition') {
            setAdditionValues(prevValues => ({
                ...prevValues,
                [key]: value
            }));
        } else if (tableType === 'multiplication') {
            setMultiplicationValues(prevValues => ({
                ...prevValues,
                [key]: value
            }));
        }
    }, [setAdditionValues, setMultiplicationValues]);

    const headerCells = Array.from({ length: localColumns }, (_, index) => (
        <th key={index + 1} scope="col">{index}</th>
    ));

    const generateTableRows = (tableType: 'addition' | 'multiplication', values: Record<string, number>, initialValues: Record<string, number>) => (
        Array.from({ length: localRows }, (_, rowIndex) => (
            <tr key={rowIndex}>
                <th scope="row">{rowIndex}</th>
                {Array.from({ length: localColumns }, (_, colIndex) => {
                    const key = `r${rowIndex}c${colIndex}`;
                    const isDifferent = values[key] !== initialValues[key];

                    return (
                        <td key={colIndex}>
                            <input
                                className={isDifferent ? 'form-control bg-success text-white' : "form-control"}
                                type="number"
                                value={values[key] || 0}
                                onChange={(e) => handleInputChange(e, key, tableType)}
                            />
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
        <div className='row'>
            <div className='col-6'>
                <div className="table-container">
                    <table className="table table-bordered table-hover shadow">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                {headerCells}
                            </tr>
                        </thead>
                        <tbody>
                            {generateTableRows('addition', additionValues, initialAdditionValues)}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='col-6'>
                <div className="table-container">
                    <table className="table table-bordered table-hover shadow">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                {headerCells}
                            </tr>
                        </thead>
                        <tbody>
                            {generateTableRows('multiplication', multiplicationValues, initialMultiplicationValues)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CombinedTable;
