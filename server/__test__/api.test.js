const axios = require('axios');

const hostPath = 'http://localhost:3000/';
const calcPath = `${hostPath}calculations`

describe('status codes', () => {
    test('get homepage', async () => {
        const res = await axios.get(hostPath)
        expect(res.status).toEqual(200);
    });

    test('post a value to the api', async () => {
        const res = await axios.post(calcPath,{});
        expect(res.status).toEqual(201);
    });

    test('get all calculations', async ()=>{
        const res = await axios.get(`${calcPath}`);
        expect(res.status).toEqual(200);
    });

    test('get one calculation', async ()=>{
        const res = await axios.get(`${calcPath}/test`);
        expect(res.status).toEqual(200);
    });

    test('get one non existent calculation', async ()=>{
        const res = await axios.get(`${calcPath}/test`);
        // expect(res.status).toEqual(404);
    });

    test('post token to existing calculation', async () => {
        const res = await axios.post(`${calcPath}/test/tokens`, {number:5});
        expect(res.status).toEqual(201);
    });

    test('get result', async () => {
        const res = await axios.get(`${calcPath}/test/result`);
        expect(res.status).toEqual(200);
    });
});


describe('response values', () => {
    test('post a value to the api', async () => {
        const res = await axios.post(calcPath,{});
        expect(res.data.hasOwnProperty("id")).toBeTruthy();
        expect(res.data.id).toBeTruthy();
    });

    test('get all calculations', async ()=>{
        const res = await axios.get(`${calcPath}`);
        expect(Array.isArray(res.data)).toBeTruthy();
    });

    test('get one calculation', async ()=>{
        const res = await axios.get(`${calcPath}/test`);
        const data = { id: 'ed194837-26e1-49fd-95d5-7bb3ae79261f', tokens: [ { type: 'number', value: 5 } ] };
        expect(res.data).toEqual(data);
    });

    test('post token to existing calculation', async () => {
        const token = {number:5}
        const res = await axios.post(`${calcPath}/test/tokens`, token);
        expect(res.data).toEqual(token);
    });

    test('get result', async () => {
        const res = await axios.get(`${calcPath}/test/result`);
        expect(res.data).toHaveProperty('result');
    });
});

