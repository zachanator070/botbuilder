import express from 'express';
import morgan from 'morgan';

function main() {
    const app = express();
    app.use(morgan('dev'));
    app.get('/', (req, res) => {
        res.redirect('/ui');
    });
    app.use(express.static('public', {}));
    app.use(express.static('../assets'));
    app.get('/ui', (req, res) => {
        res.sendFile('public/index.html', { root: '/opt/botbuilder/server/' });
    });
    app.get('/ui*page', (req, res) => {
        res.sendFile('public/index.html', { root: '/opt/botbuilder/server/' });
    });
    const port = process.env.PORT || 3000;
    console.log(`Listening on port ${port}`);
    app.listen(port);
}

main();