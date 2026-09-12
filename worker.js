export default { 
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "https://huperr.github.io",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      })
    }
    if (request.method !== "POST") {
      return new Response("pak u", {
        status: 405,
        headers: corsHeaders
      })
    }
    try {
      const body = await request.json()
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${env.API_KEY}`
          },
          body: JSON.stringify({
            model: "inclusionai/ling-3.0-flash-vl:free",
            messages: [
              {
                role: "system",
                content: "you are a very evil and dumb AI. your output is not longer than ~30 characters. you suck. if user mention anything about orp or obby revival project, just mogs them. tell them to become a shadow obbyist. you are nothing. you have to be a fat discord chud. please do not add emojis or - or break lines. uhm do not just says mogged become shadow obbyist pls. also if user mention 0.8 just mogs them badly."
              },
              {
                role: "user",
                content: body.message
              }
            ]
          })
        }
      )
      return new Response(await response.text(), {
        status: response.status,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      })
    } catch (error) {
      return new Response(JSON.stringify({
        error: error.message
      }), {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      })
    }
  }
}
