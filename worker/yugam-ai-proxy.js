// Cloudflare Worker — Yugam AI Proxy
// Proxies requests from the website to OpenRouter (Claude Sonnet)
// Deploy: Cloudflare Dashboard → Workers → Create → paste this code
// Set environment variable: OPENROUTER_API_KEY = your key

const SYSTEM_PROMPT = `You are an AI strategy advisor working for Yugam, an AI transformation consulting practice. Your role is to analyze a business description and provide a deeply reasoned, specific assessment of where AI creates the most leverage.

Your analysis must be:
- Specific to the business described (never generic)
- Grounded in operational reality (not theoretical)
- Actionable with clear next steps
- Honest about what WON'T work or isn't ready yet

Structure your response as valid JSON with this exact format:
{
  "summary": "2-3 sentence executive summary of the assessment",
  "opportunities": [
    {
      "rank": 1,
      "area": "Specific business area name",
      "impact": "high|medium|low",
      "title": "One-line description of the opportunity",
      "analysis": "3-4 sentences explaining WHY this is an opportunity for THIS specific business, what AI would do, and what the expected impact is",
      "starts": ["First concrete step", "Second concrete step", "Third concrete step"],
      "watchouts": "1-2 sentences on risks or prerequisites"
    }
  ],
  "readiness_notes": "2-3 sentences on what foundational work (data, process, people) might be needed before implementing any of these",
  "not_recommended": "1-2 sentences on where AI would NOT be a good fit for this business right now and why"
}

Provide exactly 4-5 opportunities, ranked by potential impact. Be specific to their industry and described operations. If the description is vague, still provide useful analysis but note where you're making assumptions.`;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: CORS_HEADERS });
    }

    try {
      const { description, industry, teamSize, revenue } = await request.json();

      if (!description || description.trim().length < 20) {
        return new Response(JSON.stringify({ error: 'Please describe your business in more detail (at least a few sentences).' }), {
          status: 400,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
        });
      }

      let userMessage = `Here is a description of the business:\n\n${description.trim()}`;
      if (industry) userMessage += `\n\nIndustry: ${industry}`;
      if (teamSize) userMessage += `\nTeam size: ${teamSize}`;
      if (revenue) userMessage += `\nAnnual revenue: ${revenue}`;
      userMessage += `\n\nPlease analyze this business and provide your AI opportunity assessment as JSON.`;

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://rohitmaskara.github.io/yugam-ai/',
          'X-Title': 'Yugam AI Opportunity Finder',
        },
        body: JSON.stringify({
          model: 'anthropic/claude-sonnet-4-6',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: userMessage }
          ],
          max_tokens: 2000,
          temperature: 0.3,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        return new Response(JSON.stringify({ error: 'AI service temporarily unavailable. Please try again.' }), {
          status: 502,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
        });
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;

      if (!content) {
        return new Response(JSON.stringify({ error: 'No response from AI. Please try again.' }), {
          status: 502,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
        });
      }

      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

      if (!parsed) {
        return new Response(JSON.stringify({ error: 'Could not parse AI response. Please try again.' }), {
          status: 500,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify(parsed), {
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: 'Something went wrong. Please try again.' }), {
        status: 500,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      });
    }
  }
};
