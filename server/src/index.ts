import express from 'express';
import morgan from 'morgan';

function main() {
    const app = express();
    app.use(morgan('dev'));
    app.use(express.static('public'));
    app.use(express.static('../assets'));
    const port = process.env.PORT || 3000;
    console.log(`Listening on port ${port}`);
    app.listen(port);
}

main();