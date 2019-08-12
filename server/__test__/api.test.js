const axios = require('axios');

const hostPath = 'http://localhost:3000';
const calcPath = `${hostPath}/calculations`;

let firstCalc;

beforeAll(async () => {
    const res = await axios.post(calcPath,{});
    firstCalc = res.data;
});

describe('status codes', () => {
    test('get homepage', async () => {
        const res = await axios.get(hostPath)
        expect(res.status).toEqual(200);
    });

    test('post a value to the api', async () => {
        const res = await axios.post(calcPath,{});
        expect(res.status).toEqual(201);
    });

    test('get all calculations', async ()=> {
        const res = await axios.get(`${calcPath}`);
        expect(res.status).toEqual(200);
    });

    test('get one calculation', async ()=> {
        const res = await axios.get(`${calcPath}/${firstCalc.id}`);
        expect(res.status).toEqual(200);
    });

    test('get one non existent calculation', async ()=>{

        const res = await axios.get(`${calcPath}/test`).catch((err)=>{
            const { status } = err.response;
            return expect(status).toEqual(404);
        });

        if(res) throw "This test failed";
    });

    test('post token to existing calculation', async () => {
        const token = { type: "number", value: 5 };
        const res = await axios.post(`${calcPath}/${firstCalc.id}/tokens`, token);
        
        expect(res.status).toEqual(201);
    });

    test('get result', async () => {
        const res = await axios.get(`${calcPath}/${firstCalc.id}/result`);
        expect(res.status).toEqual(200);
    });
});


describe('response values', () => {
    test('post a value to the api', async () => {
        const res = await axios.post(calcPath,{});
        expect(res.data.hasOwnProperty("id")).toBeTruthy();
        expect(res.data.id).toBeTruthy();
    });

    test('get all calculations', async () => {
        const res = await axios.get(`${calcPath}`);
        expect(Array.isArray(res.data)).toBeTruthy();
    });

    test('get one calculation', async () => {
        const res = await axios.get(`${calcPath}/${firstCalc.id}`);
        expect(res.data._id).toEqual(firstCalc.id);
        expect(Array.isArray(res.data.tokens)).toBeTruthy();
    });

    test('post token to existing calculation', async () => {
        const token = { type: "number", value: 5 };
        const res = await axios.post(`${calcPath}/${firstCalc.id}/tokens`, token);
        expect(res.data).toEqual(token);
    });

    test('result data has result property', async () => {
        const res = await axios.get(`${calcPath}/${firstCalc.id}/result`);
        expect(res.data).toHaveProperty('result');
    });
});

describe('post single operators and numbers to existing calculation', ()=>{
    const num1 = { type: 'number', value: 5};
    const num2 = { type: 'number', value: 7};
    const num3 = { type: 'number', value: 3};
    const operator1 = { type: 'operator', value: '+'};

    let calc1;
    
    beforeAll(async () =>{
        const res = await axios.post(calcPath);

        const { id } = res.data;
        calc1 = res.data;

        const url = `${calcPath}/${id}/tokens`;
        
        await axios.post(url, num1);
        await axios.post(url, num2);
        await axios.post(url, operator1);
        await axios.post(url, num3);
    });
    
    test('correct order of tokens', async () => {

        const res = await axios.get(`${calcPath}/${calc1.id}`);
        
        const { tokens } = res.data;
        expect(tokens).toEqual([num1,num2,operator1,num3]) 
    });

    test('doppel operator will be rejected', async () => {
        const url = `${calcPath}/${calc1.id}/tokens`
        const res1 = await axios.post(url, operator1);
        expect(res1.status).toEqual(201);

        const res2 = await axios.post(url, operator1).catch(err => {
            expect(err.response.status).toEqual(400);
        });

        if(res2) throw "This test failed";
    });

    test('token validation', async () => {
        const wrongToken1 = { type: 'number', value: '+'};
        const url = `${calcPath}/${calc1.id}/tokens`;

        const res1 = await axios.post(url, wrongToken1).catch(err => {
            expect(err.response.status).toEqual(400);
        });

        const wrongToken2 = { type: 'operator', value: 5};
        const res2 = await axios.post(url, wrongToken2).catch(err => {
            expect(err.response.status).toEqual(400);
        });

        if(res1 || res2) throw 'This test failed';
    });
});

