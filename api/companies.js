export default async function handler(request, response) {
  // Ensure we're only dealing with GET requests
  if (request.method !== 'GET') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  const apiKey = process.env.VITE_COPILOT_API_KEY;

  if (!apiKey) {
    return response.status(500).json({ message: 'API key is not configured.' });
  }

  try {
    const copilotResponse = await fetch('https://api.copilot.app/v1/companies?limit=100', {
      headers: {
        'X-API-KEY': apiKey,
        'Accept': 'application/json',
      },
    });

    if (!copilotResponse.ok) {
      // Forward the error status from Copilot's API
      const errorData = await copilotResponse.text();
      return response.status(copilotResponse.status).json({ message: `Error from Copilot API: ${errorData}` });
    }

    const data = await copilotResponse.json();

    // Set CORS headers to allow your app's domain to access this function
    response.setHeader('Access-Control-Allow-Origin', '*'); // You can restrict this to your app's domain for better security
    response.setHeader('Access-Control-Allow-Methods', 'GET');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    return response.status(200).json(data);
    
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'An internal server error occurred.' });
  }
} 