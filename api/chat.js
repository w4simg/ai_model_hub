export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check for the API key in the Vercel environment
    const apiKey = process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'API key is not configured in Vercel Environment Variables.' });
    }

    // Securely forward the request from the Vercel backend to Groq
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    
    // Return the response directly to our frontend
    return res.status(response.status).json(data);
  } catch (error) {
    console.error("Backend Error:", error);
    return res.status(500).json({ error: 'An internal server error occurred fetching Groq' });
  }
}
