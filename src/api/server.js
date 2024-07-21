
const jsonServer = require('json-server');
const server = jsonServer.create();

// const router = jsonServer.router(path.join(process.cwd(), 'db.json'));
const fs = require('fs');
const path = require('path');
//const filePath = path.join(process.cwd(), 'db.json');
const filePath = path.resolve(__dirname, '..', 'db.json');
const data = fs.readFileSync(filePath, "utf-8");
const db = JSON.parse(data);
const router = jsonServer.router(db);

const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(
    jsonServer.rewriter({
        "/skg-api-stg/*/*": "/$1_$2",
        "/skg-api-pro/*/*": "/$1_$2",
    })
);
server.use(router);
server.listen(3000, () => {
    console.log("listening on port: 3000");
});

module.exports = server;