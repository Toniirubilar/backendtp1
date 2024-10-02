const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');

// Ruta para crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
  } catch (error) {
  }
});

// Ruta para obtener todos los usuarios (solo para administradores)
router.get('/', async (req, res) => {
});

// Ruta para obtener un usuario por ID
router.get('/:id', async (req, res) => {
});

router.put('/:id', async (req, res) => {
});
router.delete('/:id', async (req, res) => {
});

module.exports = router;