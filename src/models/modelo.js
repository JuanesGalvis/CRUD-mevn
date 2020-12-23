const mongoose = require('mongoose');
const { Schema } = mongoose;

// Definir el Esquema para la BD
const Task = new Schema({
    title: String,
    descripcion: String
})

module.exports = mongoose.model('Task', Task);