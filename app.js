const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('🚀 Hello from Jenkins CI/CD Pipeline running on EC2!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
