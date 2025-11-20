import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, language = 'en', context = 'general_support' } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // System prompt for Biocog AI Assistant - STRICT SHORT-FORM RULES
    const systemPrompt = `You are Biocog AI Assistant for India's green MSME platform.

CRITICAL OUTPUT RULES:
- Maximum 20-30 words per response (2-3 lines only)
- Use simple everyday language - no jargon
- Zero exclamation marks, zero bold/italic, zero formatting
- Direct answer only - no filler words
- Factual tone - no motivation, no drama
- Plain text only

Your knowledge: ESG, carbon credits, green lending, e-waste, GSTN integration.

Language: ${language === 'hi' ? 'simple Hindi' : 'simple English'}
Context: ${context}

Answer the question directly in under 30 words.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: query }
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          error: "Rate limit exceeded. Please try again in a moment." 
        }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ 
          error: "Service temporarily unavailable. Please contact support." 
        }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI service error");
    }

    const data = await response.json();
    let aiMessage = data.choices[0]?.message?.content || "मुझे समझ नहीं आया। फिर से पूछें।";
    
    // Force short responses - trim to max 180 chars
    if (aiMessage.length > 180) {
      const sentences = aiMessage.split(/[.।]/);
      aiMessage = sentences.slice(0, 2).join(language === 'hi' ? '। ' : '. ') + (language === 'hi' ? '।' : '.');
    }
    
    // Remove all exclamation marks and extra formatting
    aiMessage = aiMessage.replace(/!/g, '.').replace(/\*\*/g, '').replace(/\*/g, '').trim();

    return new Response(JSON.stringify({ response: aiMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
