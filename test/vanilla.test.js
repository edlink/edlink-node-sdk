require('dotenv').config();

const { Edlink } = require('../dist/index.js');
const access_token = process.env.INTEGRATION_ACCESS_TOKEN;
const edlink = new Edlink({
    version: 2,
    client_id: 'e6504765-238a-418f-871a-2e789c1f26f5',
    client_secret: process.env.CLIENT_SECRET
});

it('/api/up', async () => {
    expect(await Edlink.up()).toBeTruthy();
    for await (const _class of edlink.use({access_token}).graph.classes.list({ limit: 1 })) {
        console.log(_class);
    }
});