const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')


const app = express();

// mongoose.connect('')
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://admin:mongo12345@crud.yl9qn.mongodb.net/mevn?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((info) => { console.log('DB CONNECT') })
    .catch((err) => { console.log(err) })

// Settings
// Tomar el puerto del sistema O el 3000
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use(require('./routes/routes'));

// Estaticos - Frontend
app.use('/api/tasks', express.static(__dirname+'/public'))

// Server en puerto
app.listen(app.get('port'), () => {
    console.log('Serven en '+ app.get('port'));
});