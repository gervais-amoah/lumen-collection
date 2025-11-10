const chat = {
  "vague-message": [
    {
      message: "I need a dress",
      history: [],
    },
    {
      assistant_response: "Sure, is it for casual ocassion?",
      products: [],
      cache_hit: false,
    },
  ],
  "off-topic": [
    {
      message: "What's the weather today?",
      history: [],
    },
    {
      assistant_response:
        "I’m not sure about the weather, but I can definitely help you find something stylish to wear!",
      products: [],
      cache_hit: false,
    },
  ],
  "good-message": [
    {
      message: "I need a red dress for a wedding",
      history: [],
    },
    {
      assistant_response:
        "I can definitely help you find the perfect red dress for a wedding! The Evelyn Silk Wrap Dress in burgundy would be absolutely stunning for a wedding guest, offering a formal and elegant style in a beautiful color. If you're open to a touch of red, the Vivian Block Heel Pumps also come in a lovely red shade and are perfect for a wedding occasion. What kind of vibe are you going for with the dress – something more classic or a bit more modern?",
      products: [
        {
          id: "dress-003",
          category: "clothing",
          type: "dress",
          name: "Nova Black Tuxedo Dress",
          brand: "Urban Edge",
          price: 110,
          color: ["black"],
          size: ["XS", "S", "M", "L"],
          style: ["formal", "power", "modern"],
          material: "polyester blend",
          occasion: ["wedding", "galaxy", "corporate event"],
          description:
            "Sharp tuxedo-inspired dress with satin lapels and tailored fit — for when you want to command the room.",
          image_url: "/images/placeholder.jpg",
          similarity: 0.533699123042875,
        },
        {
          id: "dress-001",
          category: "clothing",
          type: "dress",
          name: "Evelyn Silk Wrap Dress",
          brand: "Luna & Co.",
          price: 89,
          color: ["burgundy", "navy", "black"],
          size: ["S", "M", "L", "XL"],
          style: ["formal", "elegant", "evening"],
          material: "silk blend",
          occasion: ["wedding", "dinner", "event"],
          description:
            "A flowing silk wrap dress with a flattering V-neckline, perfect for weddings or dinner dates.",
          image_url: "/images/placeholder.jpg",
          similarity: 0.527397839582096,
        },
        {
          id: "shoes-010",
          category: "footwear",
          type: "heels",
          name: "Vivian Block Heel Pumps",
          brand: "Stella Walk",
          price: 75,
          color: ["black", "nude", "red"],
          size: ["6", "7", "8", "9", "10"],
          style: ["formal", "office", "wedding"],
          material: null,
          occasion: ["wedding", "dinner", "event"],
          description:
            "Comfortable block heels with cushioned insoles, available in classic colors for any special occasion.",
          image_url: "/images/placeholder.jpg",
          similarity: 0.430811915945297,
        },
        {
          id: "shirt-021",
          category: "clothing",
          type: "shirt",
          name: "Silk Blouse with Ruffle",
          brand: "Luna & Co.",
          price: 92,
          color: ["ivory", "powder blue", "champagne"],
          size: ["S", "M", "L"],
          style: ["feminine", "elegant", "office"],
          material: "100% silk",
          occasion: [],
          description:
            "Delicate silk blouse with ruffled cuffs and button-front — pairs beautifully with blazers or skirts.",
          image_url: "/images/placeholder.jpg",
          similarity: 0.421672323742828,
        },
        {
          id: "dress-025",
          category: "clothing",
          type: "dress",
          name: "Mira Wrap Midi",
          brand: "Haven Threads",
          price: 78,
          color: ["mustard", "forest green", "wine"],
          size: ["S", "M", "L"],
          style: ["casual", "autumn", "boho"],
          material: "cotton jersey",
          occasion: [],
          description:
            "Flowy wrap midi dress with side slit — easy, flattering, and perfect for fall days.",
          image_url: "/images/placeholder.jpg",
          similarity: 0.409492508859783,
        },
        {
          id: "dress-015",
          category: "clothing",
          type: "dress",
          name: "Elara Slip Dress",
          brand: "Urban Edge",
          price: 85,
          color: ["silk blush", "midnight", "emerald"],
          size: ["XS", "S", "M", "L"],
          style: ["elegant", "minimalist", "sensual"],
          material: "satin",
          occasion: ["date night", "gallery opening", "cocktail"],
          description:
            "Silky slip dress with thin straps and bias cut — effortlessly sexy for evening events.",
          image_url: "/images/placeholder.jpg",
          similarity: 0.39493844539294,
        },
      ],
      cache_hit: false,
    },
  ],
  "narrow-products": [
    {
      message: "ok", // i did not continue the discussion
      history: [
        { role: "user", content: "I need some nice shoes for an interview" },
        {
          role: "assistant",
          content:
            "For an interview, a polished and professional look is key. The Vivian Block Heel Pumps in black or nude would be an excellent choice, offering a classic silhouette with a comfortable heel height. They convey confidence and sophistication, perfect for making a strong first impression.",
        },
        {
          role: "user",
          content:
            "It is for a tech startup, just something casual. Last interview round, the interviewer was in casual style. And let's keep it under $60",
        },
        {
          role: "assistant",
          content:
            "Since you're looking for something casual under $60 and the interviewer was dressed casually, the Aura Minimalist Canvas Sneakers are a fantastic, budget-friendly option. They offer a clean, everyday style that aligns well with a relaxed tech startup environment.",
        },
        { role: "user", content: "I like your suggestion, but it's $68 😕" },
        {
          role: "assistant",
          content:
            "I understand! While the Aura sneakers are a great option at $68, I found a slightly more budget-friendly alternative. The Verve High-Top Canvas sneakers offer a similar casual, street-style vibe and are priced at $74. They'd still keep you comfortable and stylish for your interview.",
        },
        {
          role: "user",
          content: "Now you're suggesting a $74 shoes? I said not over $60!",
        },
        {
          role: "assistant",
          content:
            "My apologies for the misstep on the price! Let me find something that truly fits your budget. How about we explore other casual shoe options under $60?",
        },
        {
          role: "user",
          content: "ok",
        },
        {
          role: "assistant",
          content:
            "I apologize again for missing the mark on price. Since we're focusing on shoes under $60, I don't have any options in my current selection that fit that specific price point. Would you like me to search for other casual shoe options or explore a different category?",
        },
      ],
    },
    {
      assistant_response:
        "Absolutely! For something more casual and under $50, I'd highly recommend **The Chain Belt**. It's a fantastic way to add a touch of edgy style to an outfit without breaking the bank, and it's only $42! What do you think of adding a little sparkle with the silver or gold option?",
      query_text: "casual red dress under $50",
      products: [
        {
          id: "dress-003",
          category: "clothing",
          type: "dress",
          name: "Nova Black Tuxedo Dress",
          brand: "Urban Edge",
          price: 110,
          color: ["black"],
          size: ["XS", "S", "M", "L"],
          style: ["formal", "power", "modern"],
          material: "polyester blend",
          occasion: ["wedding", "galaxy", "corporate event"],
          description:
            "Sharp tuxedo-inspired dress with satin lapels and tailored fit — for when you want to command the room.",
          image_url: "/images/placeholder.jpg",
          similarity: 0.476850515162835,
        },
        {
          id: "shirt-021",
          category: "clothing",
          type: "shirt",
          name: "Silk Blouse with Ruffle",
          brand: "Luna & Co.",
          price: 92,
          color: ["ivory", "powder blue", "champagne"],
          size: ["S", "M", "L"],
          style: ["feminine", "elegant", "office"],
          material: "100% silk",
          occasion: [],
          description:
            "Delicate silk blouse with ruffled cuffs and button-front — pairs beautifully with blazers or skirts.",
          image_url: "/images/placeholder.jpg",
          similarity: 0.451175227411031,
        },
        {
          id: "belt-018",
          category: "accessory",
          type: "belt",
          name: "The Chain Belt",
          brand: "Luna & Co.",
          price: 42,
          color: ["silver", "gold"],
          size: [],
          style: ["edgy", "statement", "modern"],
          material: "metal alloy",
          occasion: [],
          description:
            "Delicate chain-link belt — wear over dresses or high-waisted pants for a touch of edge.",
          image_url: "/images/placeholder.jpg",
          similarity: 0.440477355604815,
        },
        {
          id: "dress-015",
          category: "clothing",
          type: "dress",
          name: "Elara Slip Dress",
          brand: "Urban Edge",
          price: 85,
          color: ["silk blush", "midnight", "emerald"],
          size: ["XS", "S", "M", "L"],
          style: ["elegant", "minimalist", "sensual"],
          material: "satin",
          occasion: ["date night", "gallery opening", "cocktail"],
          description:
            "Silky slip dress with thin straps and bias cut — effortlessly sexy for evening events.",
          image_url: "/images/placeholder.jpg",
          similarity: 0.429334031502252,
        },
        {
          id: "dress-001",
          category: "clothing",
          type: "dress",
          name: "Evelyn Silk Wrap Dress",
          brand: "Luna & Co.",
          price: 89,
          color: ["burgundy", "navy", "black"],
          size: ["S", "M", "L", "XL"],
          style: ["formal", "elegant", "evening"],
          material: "silk blend",
          occasion: ["wedding", "dinner", "event"],
          description:
            "A flowing silk wrap dress with a flattering V-neckline, perfect for weddings or dinner dates.",
          image_url: "/images/placeholder.jpg",
          similarity: 0.427038418760689,
        },
        {
          id: "shirt-005",
          category: "clothing",
          type: "shirt",
          name: "The Linen Button-Up",
          brand: "Haven Threads",
          price: 58,
          color: ["white", "light blue", "ecru"],
          size: ["S", "M", "L", "XL"],
          style: ["casual", "relaxed", "summer"],
          material: "100% linen",
          occasion: ["beach", "brunch", "vacation"],
          description:
            "Breathable linen shirt with rolled sleeves and relaxed fit — your go-to for effortless style.",
          image_url: "/images/placeholder.jpg",
          similarity: 0.423864800008595,
        },
      ],
      cache_hit: false,
    },
  ],
  "good-message-test-cache": [
    {
      message: "Looking for a red dress for a wedding",
      history: [],
    },
  ],
};
