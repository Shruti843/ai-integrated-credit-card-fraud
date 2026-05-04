# AI Integrated Credit Card Fraud Detection

A modern, full-stack web application designed to detect and prevent fraudulent credit card transactions in real-time using artificial intelligence and rule-based algorithms.

## Features
- **Machine Learning Integration**: Utilizes a Feed-Forward Neural Network (`synaptic.js`) to dynamically calculate fraud probabilities based on transaction parameters.
- **Secure Authentication**: Enterprise-grade security featuring JSON Web Tokens (JWT) and Bcrypt password hashing.
- **Real-time Analytics Dashboard**: Built with Recharts to provide business intelligence, tracking transaction verdicts and AI model performance.
- **Modern UI/UX**: Designed using Tailwind CSS with a responsive, glassmorphism aesthetic.

## Technology Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Recharts
- **Backend**: Node.js, Express.js, Synaptic (Neural Network API)
- **Database**: MongoDB Atlas (Cloud)

## How It Works
1. A user submits transaction details (Amount, Country, Merchant, CVV Status).
2. The Node.js backend intercepts the request and verifies the JWT authentication.
3. The data is normalized and passed through the trained Neural Network.
4. The AI returns a probability score which classifies the transaction as **Legitimate**, **Suspicious**, or **Fraudulent**.
5. The transaction is securely stored in MongoDB and instantly reflected on the analytics dashboard.
