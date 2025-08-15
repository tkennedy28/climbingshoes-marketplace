// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}

// Create a config file or update your API calls
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Example API call
fetch(`${API_URL}/api/products`)