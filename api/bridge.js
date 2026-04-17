export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });
  }

  try {
    const { sceneText, action, companionName, level } = req.body;

    if (!action || !companionName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const levelLabels = ['Beginner', 'Growing', 'Explorer'];
    const levelLabel = levelLabels[level] || 'Growing';

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 200,
        system: `You narrate a children's mystery set in a supernatural small town. The reader's companion is ${companionName}, a raven who is dry, sharp, and occasionally kind. Write 2-3 fun sentences responding to the reader's action, then have ${companionName} gently steer back to investigating. Reading level: ${levelLabel}. Be fun and in-character. Plain text only, no formatting.`,
        messages: [
          {
            role: 'user',
            content: `Scene context: "${(sceneText || '').substring(0, 300)}..."\nThe reader typed: "${action}"\nRespond briefly and playfully.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error:', response.status, errorText);
      return res.status(response.status).json({ error: 'API request failed' });
    }

    const data = await response.json();
    const text = data.content?.map((b) => b.text || '').join('') || '';

    return res.status(200).json({ text });
  } catch (error) {
    console.error('Bridge function error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
