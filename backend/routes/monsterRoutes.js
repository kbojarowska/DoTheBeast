const express = require('express');
const router = express.Router();
const {
    createMonster,
    getMonsters,
    getMonsterById,
    updateMonster,
    deleteMonster
} = require('../controllers/monsterController');

// Create monster
router.post('/', createMonster);

// Get all monsters
router.get('/', getMonsters);

// Get a specific monster by ID
router.get('/:id', getMonsterById);

// Update monster by ID
router.patch('/:id', updateMonster);

// Delete monster by ID
router.delete('/:id', deleteMonster);

module.exports = router;
