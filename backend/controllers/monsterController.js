const Monster = require('../models/monsterModel');

/**
 * @openapi
 * components:
 *   schemas:
 *     Monster:
 *       type: object
 *       description: A monster entity representing a creature in the system.
 *       properties:
 *         monsterID:
 *           type: number
 *           description: The unique identifier for the monster.
 *           example: 1
 *         name:
 *           type: string
 *           description: The name of the monster.
 *           example: "Fire Dragon"
 *         minPoints:
 *           type: number
 *           description: The minimum points associated with the monster.
 *           example: 100
 *         maxPoints:
 *           type: number
 *           description: The maximum points associated with the monster.
 *           example: 500
 */

/**
 * @openapi
 * /monsters:
 *   post:
 *     summary: Create a new monster.
 *     tags: 
 *       - Monsters
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Monster'
 *     responses:
 *       201:
 *         description: Monster created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Monster'
 *       400:
 *         description: Bad request - Invalid monster data.
 *       500:
 *         description: Server error.
 */
const createMonster = async (req, res) => {
  try {
    const monster = await Monster.create(req.body);
    res.status(201).json(monster);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @openapi
 * /monsters:
 *   get:
 *     summary: Get all monsters.
 *     tags: 
 *       - Monsters
 *     responses:
 *       200:
 *         description: List of monsters retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Monster'
 *       500:
 *         description: Server error.
 */
const getMonsters = async (req, res) => {
  try {
    const monsters = await Monster.find();
    res.json(monsters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @openapi
 * /monsters/{id}:
 *   get:
 *     summary: Get a specific monster by ID.
 *     tags: 
 *       - Monsters
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the monster to retrieve.
 *     responses:
 *       200:
 *         description: Monster details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Monster'
 *       404:
 *         description: Monster not found.
 *       500:
 *         description: Server error.
 */
const getMonsterById = async (req, res) => {
  try {
    const monster = await Monster.findById(req.params.id);
    if (monster) {
      res.json(monster);
    } else {
      res.status(404).json({ message: 'Monster not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @openapi
 * /monsters/{id}:
 *   patch:
 *     summary: Update monster details by ID.
 *     tags: 
 *       - Monsters
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the monster to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Monster'
 *     responses:
 *       200:
 *         description: Monster details updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Monster'
 *       404:
 *         description: Monster not found.
 *       400:
 *         description: Bad request - Invalid monster data.
 */
const updateMonster = async (req, res) => {
    try {
      const monster = await Monster.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (monster) {
        res.json(monster);
      } else {
        res.status(404).json({ message: 'Monster not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  /**
   * @openapi
   * /monsters/{id}:
   *   delete:
   *     summary: Delete a monster by ID.
   *     tags: 
   *       - Monsters
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the monster to delete.
   *     responses:
   *       200:
   *         description: Monster deleted successfully.
   *       404:
   *         description: Monster not found.
   *       500:
   *         description: Server error.
   */
const deleteMonster = async (req, res) => {
    try {
      const monster = await Monster.findByIdAndDelete(req.params.id);
      if (monster) {
        res.json({ message: 'Monster deleted successfully' });
      } else {
        res.status(404).json({ message: 'Monster not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports = {
    createMonster,
    getMonsters,
    getMonsterById,
    updateMonster,
    deleteMonster,
  };
