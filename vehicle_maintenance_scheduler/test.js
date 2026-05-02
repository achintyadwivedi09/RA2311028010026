const scheduleVehicles = require('./scheduler');

// sample data (duration in hours, impact score)
const vehicles = [
  { duration: 2, impact: 6 },
  { duration: 3, impact: 10 },
  { duration: 1, impact: 3 },
  { duration: 4, impact: 12 }
];

const maxHours = 5;

const result = scheduleVehicles(vehicles, maxHours);
console.log("Max Impact Achieved:", result);