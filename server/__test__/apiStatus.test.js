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