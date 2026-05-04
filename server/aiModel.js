const synaptic = require('synaptic');

const network = new synaptic.Architect.Perceptron(3, 5, 1);
const trainer = new synaptic.Trainer(network);

console.log('Booting up AI Engine...');

const trainingData = [
  { input: [0.01, 0, 0], output: [0.01] },
  { input: [0.05, 0, 0], output: [0.05] },
  { input: [0.10, 0, 0], output: [0.10] },
  { input: [0.02, 1, 0], output: [0.15] },
  { input: [0.25, 0, 0], output: [0.45] },
  { input: [0.35, 1, 0], output: [0.65] },
  { input: [0.05, 0, 1], output: [0.55] },
  { input: [0.50, 1, 1], output: [0.95] },
  { input: [0.80, 1, 0], output: [0.90] },
  { input: [0.10, 1, 1], output: [0.85] },
  { input: [0.90, 0, 1], output: [0.98] }
];

trainer.train(trainingData, {
  rate: 0.1,
  iterations: 20000,
  error: 0.005,
  shuffle: true,
  log: 5000,
  cost: synaptic.Trainer.cost.CROSS_ENTROPY
});

console.log('Neural Network Training Complete');

const predictFraud = (transactionData) => {
  const { amount, country, cvvStatus } = transactionData;
  
  const normalizedAmount = Math.min(amount / 20000, 1.0);
  const isForeign = (country && country.toUpperCase() !== 'US') ? 1 : 0;
  const isInvalidCvv = (cvvStatus === 'INVALID' || cvvStatus === 'MISSING') ? 1 : 0;

  const result = network.activate([normalizedAmount, isForeign, isInvalidCvv]);
  const fraudProbability = result[0];
  const riskScore = Math.round(fraudProbability * 100);

  let verdict = 'LEGITIMATE';
  if (riskScore >= 70) verdict = 'FRAUD';
  else if (riskScore >= 40) verdict = 'SUSPICIOUS';

  return { 
    riskScore, 
    verdict, 
    aiConfidence: fraudProbability
  };
};

module.exports = { predictFraud };
