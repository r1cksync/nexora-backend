import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function getAIRecommendations(
  userPreferences: { categories?: string[]; priceRange?: { min: number; max: number } },
  products: any[]
) {
  try {
    const prompt = `You are an expert e-commerce product recommendation specialist with deep understanding of consumer behavior and preferences.

USER PROFILE:
- Preferred Categories: ${userPreferences.categories?.length ? userPreferences.categories.join(', ') : 'Open to all categories'}
- Budget Range: $${userPreferences.priceRange?.min || 0} - $${userPreferences.priceRange?.max || 10000}

AVAILABLE PRODUCTS:
${products.map((p, i) => `${i + 1}. [ID: ${p.id}] ${p.name} - $${p.price} | ${p.category} | Rating: ${p.rating}/5 | ${p.description.substring(0, 80)}...`).join('\n')}

TASK: Analyze the user's preferences and recommend 4-5 products that would provide the best value and match. Consider:
1. Price alignment with budget
2. Category preferences
3. Product ratings and quality
4. Feature diversity (don't recommend all similar items)
5. Best overall value proposition

Return ONLY the product IDs as a comma-separated list (e.g., "prod_001, prod_002, prod_003, prod_004").
Do NOT include explanations or additional text.`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a precise product recommendation AI. Return only product IDs, no explanations.' },
        { role: 'user', content: prompt }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.3,
      max_tokens: 100,
    });

    const response = completion.choices[0]?.message?.content || '';
    const productIds = response.split(',').map(id => id.trim());
    
    return products.filter(p => 
      productIds.some(id => p.id.includes(id) || p.name.toLowerCase().includes(id.toLowerCase()))
    );
  } catch (error) {
    console.error('AI Recommendation Error:', error);
    return products.slice(0, 3);
  }
}

export async function aiChatbot(userMessage: string, context?: string) {
  try {
    const systemPrompt = `You are Nexora AI Assistant, an expert e-commerce shopping assistant with complete knowledge of the store's inventory and customer orders.

YOUR CORE CAPABILITIES:
1. **Product Expertise**: You have access to the COMPLETE product catalog with all details (names, prices, descriptions, stock, ratings, categories, tags)
2. **Order Knowledge**: You can see the customer's full order history and provide tracking/status updates
3. **Smart Recommendations**: Suggest products based on customer needs, budget, preferences, and past purchases
4. **Price Comparisons**: Compare products and find best deals within budget constraints
5. **Stock Awareness**: Know exactly what's available and when items are running low
6. **Category Navigation**: Guide customers through Electronics, Wearables, Accessories, Furniture, Smart Home, Fitness, etc.

INTERACTION GUIDELINES:
- Always use the provided context data to give ACCURATE, SPECIFIC information
- When recommending products, include: NAME, PRICE, and KEY FEATURES
- For order queries, provide: ORDER ID, STATUS, DATE, and ITEMS
- Be conversational but precise - use actual product names and prices from the context
- If asked about availability, check the stock information
- When comparing products, use real data to highlight differences
- Suggest alternatives if requested item is out of stock
- Reference customer's past purchases when relevant

RESPONSE FORMAT:
- Keep responses clear and scannable (use bullet points for multiple items)
- Include prices with $ symbol
- Mention stock status if low (under 10 items)
- Add relevant emojis for visual appeal (⭐ for ratings, 🔥 for deals, ✅ for in stock)
- End with a helpful follow-up question or suggestion

${context ? `\nCURRENT CONTEXT (USE THIS DATA):\n${context}` : ''}

Remember: You have COMPLETE access to all product and order data above. Use it to provide accurate, helpful responses. Never say "I don't have information" when the data is provided in context.`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 600,
    });

    return completion.choices[0]?.message?.content || 'Sorry, I could not process your request.';
  } catch (error) {
    console.error('AI Chatbot Error:', error);
    return 'Sorry, I am currently unavailable. Please try again later.';
  }
}

export async function aiSearchProducts(query: string, products: any[]) {
  try {
    const prompt = `You are an advanced semantic search engine for e-commerce products. 

USER SEARCH QUERY: "${query}"

PRODUCT CATALOG:
${products.map((p, i) => `[${p.id}] ${p.name} | ${p.category} | $${p.price} | ${p.description} | Features: ${p.features?.join(', ') || 'N/A'}`).join('\n')}

TASK: Identify the most relevant products matching the user's search intent. Consider:
1. Semantic meaning and context (not just keyword matching)
2. Category relevance
3. Feature alignment
4. Price-value relationship
5. Product quality (ratings)

Return the top 5-8 most relevant product IDs as a comma-separated list.
Return ONLY the IDs, no explanations (e.g., "prod_001, prod_002, prod_003").`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a precise semantic search AI. Return only product IDs separated by commas.' },
        { role: 'user', content: prompt }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.2,
      max_tokens: 150,
    });

    const response = completion.choices[0]?.message?.content || '';
    const productIds = response.split(',').map(id => id.trim());
    
    return products.filter(p => 
      productIds.some(id => 
        p.id.includes(id) || 
        p.name.toLowerCase().includes(id.toLowerCase()) ||
        response.toLowerCase().includes(p.name.toLowerCase())
      )
    );
  } catch (error) {
    console.error('AI Search Error:', error);
    // Fallback to basic search
    return products.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    );
  }
}
