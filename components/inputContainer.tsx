import React, { ChangeEvent } from 'react';

interface InputContainerProps {
    rows: number;
    columns: number;
    setRows: (value: number) => void;
    setColumns: (value: number) => void;
    generate: () => void;
    setOperation: (operation: number) => void;
}

const InputContainer: React.FC<InputContainerProps> = ({ rows, columns, setRows, setColumns, generate, setOperation }) => {
    const handleRowsChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRows(Number(e.target.value));
    };

    const handleColumnsChange = (e: ChangeEvent<HTMLInputElement>) => {
        setColumns(Number(e.target.value));
    };

    return (
        <div className="row">
            <div className="col-5">
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Rows</span>
                    <input type="number" className="form-control" value={rows} onChange={handleRowsChange} placeholder="rows" aria-label="Username" aria-describedby="basic-addon1" />
                </div>
            </div>
            <div className="col-5">
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Columns</span>
                    <input type="number" className="form-control" value={columns} onChange={handleColumnsChange} placeholder="columns" aria-label="Username" aria-describedby="basic-addon1" />
                </div>
            </div>
            <div className="col-2">
                <button className="btn btn-primary w-100" onClick={() => { generate(); setOperation(0); }}>Create</button>
            </div>
        </div>
    );
};

export default InputContainer;
