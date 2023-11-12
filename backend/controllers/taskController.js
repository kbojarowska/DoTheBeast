categories = {
    'Work': 5,
    'Personal': 3,
    'Health': 7,
    'Education': 6,
    'Entertainment': 2,
    'Family': 8,
    'Errands': 4,
    'Finance': 6,
    'Social': 3,
    'Fitness': 9,
    'Hobbies': 4,
    'Volunteering': 7,
    'Travel': 6,
    'Skills Development': 5,
    'Reading': 3,
    'Projects': 8,
    'Meetings': 5,
    'Appointments': 4,
    'Chores': 6,
    'Research': 7,
    'Creativity': 5,
    'Cooking': 4,
    'Learning': 6,
    'Home improvement': 7,
    'Mental well-being': 8,
    'Event planning': 5,
    'Outdoor tasks': 6,
    'Self-reflection': 4,
    'Music practice': 7,
    'Social media management': 5,
    'Writing': 6,
    'Relaxation': 4,
    'Watching TV': 3,
    'Socializing': 5,
    'Gardening': 7,
    'Shopping': 6
}

function calculatePriority(category, time, difficulty) {
    // Assuming time is provided in minutes
    const normalizedTime = time / 60;
    const normalizedDifficulty = difficulty / 5; // Assuming difficulty is rated on a scale of 1 to 5

    // Calculate priority
    const priority = categories[category] * normalizedTime * normalizedDifficulty;
    return priority;
}
