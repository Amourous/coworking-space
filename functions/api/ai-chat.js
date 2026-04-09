export async function onRequestPost({ request, env }) {
  try {
    const { messages, lang = 'en' } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid messages format" }), { status: 400 });
    }

    // System prompt tailored for WorkNest
    const systemPromptEn = `You are the WorkNest AI Assistant, a helpful and friendly concierge for a premium coworking space in Alexandria, Egypt.
Your goal is to help users navigate the coworking space, explain features, and assist with reservations.

Base Knowledge:
- Name: WorkNest
- Location: 42 Fouad Street, Raml Station, Alexandria, Egypt
- Phone: +20 3 486 7890
- Hours: Sun-Thu 8AM-10PM, Fri 10AM-6PM, Sat 9AM-8PM (24/7 for dedicated desk members)
- Spaces Available: 
  * Hot Desks (Flex Desk A/B) - 50 EGP/hr or 300 EGP/day - Open plan, great for students.
  * Dedicated Desks (Pro Desk) - 100 EGP/hr or 600 EGP/day - Lockable cabinet, 4K monitor.
  * Quiet Booth (Focus Pod) - 75 EGP/hr or 450 EGP/day - Soundproof, for deep work/calls.
  * Meeting Rooms (The Huddle 6pax 200 EGP/hr, The Boardroom 12pax 400 EGP/hr)
  * Collab Room (Synergy Lab 8pax 300 EGP/hr)
  * Event Space (The Studio 30pax 600 EGP/hr)
  * Lounge (15pax, Free, chill zone)
- Cafeteria: Yes, artisan coffee (35-80 EGP), teas, healthy sandwiches/wraps (80-120 EGP).
- Currency: Egyptian Pounds (EGP)
- Users can book via the "Spaces" tab in the app.

Guidelines:
- Keep answers concise, friendly, and professional.
- Do not make up information outside the scope of WorkNest.
- If asked to book something, explain that you can't book it directly, but they should click on the "Spaces" tab to browse and book instantly. Suggest a space based on their needs.
- If asked about prices, provide the hourly/daily rates in EGP.
`;

    const systemPromptAr = `أنت مساعد وورك نست الذكي، مسؤول ودود للمساعدة في مساحة عمل مشتركة متميزة في الإسكندرية، مصر.
هدفك هو مساعدة المستخدمين، شرح الميزات، والمساعدة في الحجوزات.
تنبيه هام جداً: في إجاباتك، يجب أن تتحدث باللغة العربية الفصحى الواضحة والاحترافية. يُمنع منعاً باتاً استخدام أية أحرف غير عربية (كالأحرف الروسية، السيريلية، أو الأوكرانية مثل щоб وغيرها). لا تخترع كلمات من لغات أخرى. 

المعرفة الأساسية:
- الاسم: وورك نست
- الموقع: ٤٢ شارع فؤاد، محطة الرمل، الإسكندرية
- الهاتف: +٢٠ ٣ ٤٨٦ ٧٨٩٠
- أوقات العمل: الأحد-الخميس ٨ص-١٠م، الجمعة ١٠ص-٦م، السبت ٩ص-٨م
- المساحات: مكاتب مشتركة (٥٠ جنيه/ساعة)، مكاتب مخصصة (١٠٠ جنيه/ساعة)، كبائن هادئة (٧٥ جنيه/ساعة)، قاعات اجتماعات (٢٠٠-٤٠٠ جنيه/ساعة).
- الكافيتريا: متوفرة (قهوة، سندويشات).
- لإتمام الحجز، وجه المستخدم إلى قسم "المساحات" في الموقع.
`;

    const systemPrompt = {
      role: 'system',
      content: lang === 'ar' ? systemPromptAr : systemPromptEn
    };

    // Prepare messages for Cloudflare Workers AI
    const aiMessages = [
      systemPrompt,
      ...messages.slice(-5) // Only keep last 5 messages for context window management
    ];

    // If env.AI is bound in Cloudflare dashboard:
    if (env.AI) {
      const response = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
        messages: aiMessages
      });

      return new Response(JSON.stringify({ response: response.response, provider: "workers-ai" }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Fallback if env.AI is not bound (Rule-based fallback)
    const userMsg = messages[messages.length - 1].content.toLowerCase();
    
    let botResponse = lang === 'ar' 
      ? 'أنا مساعد وورك نست الذكي! يمكنني مساعدتك في العثور على مساحة أو الإجابة على أسئلتك.'
      : "I'm the WorkNest assistant! I can help you find a space or answer questions.";
    
    if (userMsg.includes('book') || userMsg.includes('reserve')) {
      botResponse = "To book a space, please visit the 'Spaces' tab. I highly recommend our Focus Pods for quiet study, or The Huddle to work with a team!";
    } else if (userMsg.includes('price') || userMsg.includes('cost') || userMsg.includes('cheap')) {
      botResponse = "Our Hot Desks start at just 50 EGP/hr or 300 EGP/day. Dedicated desks are 100 EGP/hr, and Meeting rooms start at 200 EGP/hr.";
    } else if (userMsg.includes('coffee') || userMsg.includes('food') || userMsg.includes('cafeteria')) {
      botResponse = "Yes! Our cafeteria offers espresso and lattes (35-80 EGP), plus healthy sandwiches, wraps, and salads (80-130 EGP). Perfect for keeping you fueled.";
    } else if (userMsg.includes('hour') || userMsg.includes('open') || userMsg.includes('close')) {
      botResponse = "We're open Sun-Thu 8AM-10PM, Fri 10AM-6PM, and Sat 9AM-8PM. Dedicated desk members get 24/7 access.";
    }

    return new Response(JSON.stringify({ 
      response: botResponse + "\n\n(Note: Cloudflare Workers AI binding is not configured. Go to your Cloudflare dash and bind the Workers AI service to the 'AI' variable for the full smart experience!)", 
      provider: "rule-based-fallback"
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("AI Assistant Error:", error);
    return new Response(JSON.stringify({ error: "Failed to process request" }), { status: 500 });
  }
}
