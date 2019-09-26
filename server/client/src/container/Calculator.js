import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'common/Button';
import 'style/Calculator.css';

const Calculator = () => {
    const [calculationId, setCalculationId] = useState(null);
    const [result, setResult] = useState(0);
    const [selection, setSelection] = useState(0)
    
    const postNum = async (e) => {
        const { value } = e.target;
        const token = { type:'number', value: parseInt(value,10) };
        
        const url = `/calculations/${calculationId}/tokens`;
        axios.post(url, token);

        setSelection(value);
    };

    const getResult = async (e) => {
        const url = `/calculations/${calculationId}/result`;
        const res = await axios.get(url);
        
        const { result } = res.data;
        setResult(result);
    };

    const postOperator = async (e) => {
        const { value } = e.target;
        const token = { type: 'operator', value};
        
        const url = `/calculations/${calculationId}/tokens`;
        await axios.post(url, token).catch(e=>console.log(e.response));
    };

    const reset = () => {
        setCalculationId(null);
    };

    useEffect( () => {
        const getCalculationId = async () => {
            const res = await axios.post('/calculations/');
            setCalculationId(res.data.id);
        }
        getCalculationId();
    },[]);

    return (
        <div className="calculator">
            <div className="selection">{selection}</div>
            <div className="btn-row">
                <Button title={9} onClick={postNum}/>
                <Button title={8} onClick={postNum}/>
                <Button title={7} onClick={postNum}/>
                <Button title={"x"} onClick={postOperator}/>
            </div>
            <div className="btn-row">
                <Button title={6} onClick={postNum}/>
                <Button title={5} onClick={postNum}/>
                <Button title={4} onClick={postNum}/>
                <Button title={"/"} onClick={postOperator}/>
            </div>
            <div className="btn-row">
                <Button title={3} onClick={postNum}/>
                <Button title={2} onClick={postNum}/>
                <Button title={1} onClick={postNum}/>
                <Button title={"-"} onClick={postOperator}/>
            </div>
            <div className="btn-row">
                <Button title={0} onClick={postNum}/>
                <Button title={"="} onClick={getResult}/>
                <Button title={"+"} onClick={postOperator}/>
            </div>
            <div><Button title={"AC"} onClick={reset}/></div>
            {result && <div className="result">Result: {result}</div>}
        </div>
    );
}

export default Calculator;