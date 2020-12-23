const express = require('express');

const router = express.Router();
const task = require('../models/modelo');

// GET - READ
router.get('/', async (req, res) => {
    // SELECT * FROM --- -> Equivalente
    const tareas = await task.find();
    // Responder y devolver los datos
    res.json(tareas);
})

router.get('/:id', async (req, res) => {
    // SELECT * FROM --- -> Equivalente
    const tareas = await task.findById(req.params.id);
    // Responder y devolver los datos
    res.json(tareas);
})

// POST - CREATE
router.post('/', async (req, res) => {
    const ntarea = new task(req.body);
    await ntarea.save();
    res.json({
        status: "Tarea guardada"
    })
})

// PUT - UPDATE
router.put('/:id', async (req, res) => {
    await task.findByIdAndUpdate(req.params.id, req.body)
    res.json({
        status: "Tarea actualizada"
    })
})

// DELETE - DELETE
router.delete('/:id', async (req, res) => {
    await task.findByIdAndRemove(req.params.id)
    res.json({
        status: "Tarea borrada"
    })
})



module.exports = router;