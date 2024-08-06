import React from 'react';

interface ButtonsContainerProps {
    setOperation: (operation: number) => void;
    setShowResultTable: (show: boolean) => void;
}

const ButtonsContainer: React.FC<ButtonsContainerProps> = ({ setOperation, setShowResultTable }) => {
    return (
        <div className='d-flex justify-content-center gap-4 m-4'>
            <button onClick={() => { setOperation(1); setShowResultTable(true); }} className='btn btn-outline-success'>Add matrix</button>
            <button onClick={() => { setOperation(2); setShowResultTable(true); }} className='btn btn-outline-success'>Subtract matrix</button>
            <button onClick={() => { setOperation(3); setShowResultTable(true); }} className='btn btn-outline-success'>Multiply matrix</button>
        </div>
    );
};

export default ButtonsContainer;
