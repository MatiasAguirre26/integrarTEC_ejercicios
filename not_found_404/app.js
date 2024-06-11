import express from "express";

const app = express();

// Configuracion de EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', 'public/views');
app.use('/static', express.static('public'))


app.get('/', (_req, res) => {
    res.send('Página de inicio');
});

// Renderiza ruta inexistente(404)
app.use((_req, res) => {
    res.status(404).render('404');
});


app.listen(3000, () => {
    console.log("Servidor levantado")
})