const categories = {
  'Work': 5,
  'Personal': 3,
  'Health': 7,
  'Education': 6,
  'Entertainment': 2,
  'Family': 8,
  'Errands': 4,
  'Fitness': 9,
  'Projects': 8,
  'Mental well-being': 8
};

function calculatePriority(category, time, difficulty) {
  // Assuming time is provided in minutes
  const normalizedTime = time / 60;
  const normalizedDifficulty = difficulty / 5; // Assuming difficulty is rated on a scale of 1 to 5

  // Calculate priority
  const priority = categories[category] * normalizedTime * normalizedDifficulty;
  return priority;
}

module.exports = calculatePriority;