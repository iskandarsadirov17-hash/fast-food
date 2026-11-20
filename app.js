
/* ==========================================================================
   ISKANDAR-FAST FOOD — Tashkent Online Ordering & Delivery Engine
   Pure Vanilla JS (ES6+) • Structured Editable Menu, Cart, Checkout & Auth
   ========================================================================== */

(() => {
  "use strict";

  // --------------------------------------------------------------------------
  // 1. EDITABLE CONFIGURATION & CURRENCY FORMATTER (UZS)
  // --------------------------------------------------------------------------
  const CONFIG = {
    currency: "UZS",
    freeDeliveryThreshold: 120000,
    promoCodes: {
      ISKANDAR20: { discountPercent: 20, label: "20% OFF Grand Opening Promo" },
      TASHKENT15: { discountPercent: 15, label: "15% OFF Tashkent Express" }
    },
    branches: [
      {
        id: "Chilonzor",
        name: "ISKANDAR Chilonzor Flagship",
        address: "Bunyodkor Avenue 15, Chilonzor District, Tashkent",
        hours: "09:00 – 02:00 Daily",
        phone: "+998 (71) 200-88-01",
        deliveryFee: 12000,
        eta: "25–30 min",
        mapUrl: "[https://www.google.com/maps/search/?api=1&query=Chilonzor+District+Tashkent](https://www.google.com/maps/search/?api=1&query=Chilonzor+District+Tashkent)"
      },
      {
        id: "Yunusobod",
        name: "ISKANDAR Yunusobod",
        address: "Amir Temur Avenue 108, Yunusobod District, Tashkent",
        hours: "09:00 – 02:00 Daily",
        phone: "+998 (71) 200-88-02",
        deliveryFee: 12000,
        eta: "25–35 min",
        mapUrl: "[https://www.google.com/maps/search/?api=1&query=Yunusobod+District+Tashkent](https://www.google.com/maps/search/?api=1&query=Yunusobod+District+Tashkent)"
      },
      {
        id: "Mirzo Ulugbek",
        name: "ISKANDAR Mirzo Ulugbek",
        address: "Mustaqillik Avenue 75, Mirzo Ulugbek District, Tashkent",
        hours: "09:00 – 02:00 Daily",
        phone: "+998 (71) 200-88-03",
        deliveryFee: 12000,
        eta: "20–30 min",
        mapUrl: "[https://www.google.com/maps/search/?api=1&query=Mirzo+Ulugbek+District+Tashkent](https://www.google.com/maps/search/?api=1&query=Mirzo+Ulugbek+District+Tashkent)"
      },
      {
        id: "Sergeli",
        name: "ISKANDAR Sergeli",
        address: "Yangi Sergeli Street 21, Sergeli District, Tashkent",
        hours: "10:00 – 01:00 Daily",
        phone: "+998 (71) 200-88-04",
        deliveryFee: 15000,
        eta: "30–40 min",
        mapUrl: "[https://www.google.com/maps/search/?api=1&query=Sergeli+District+Tashkent](https://www.google.com/maps/search/?api=1&query=Sergeli+District+Tashkent)"
      },
      {
        id: "Yakkasaroy",
        name: "ISKANDAR Yakkasaroy",
        address: "Shota Rustaveli Street 44, Yakkasaroy District, Tashkent",
        hours: "09:00 – 02:00 Daily",
        phone: "+998 (71) 200-88-05",
        deliveryFee: 10000,
        eta: "20–25 min",
        mapUrl: "[https://www.google.com/maps/search/?api=1&query=Yakkasaroy+District+Tashkent](https://www.google.com/maps/search/?api=1&query=Yakkasaroy+District+Tashkent)"
      },
      {
        id: "Shayxontohur",
        name: "ISKANDAR Shayxontohur",
        address: "Navoi Street 30, Shayxontohur District, Tashkent",
        hours: "09:00 – 02:00 Daily",
        phone: "+998 (71) 200-88-06",
        deliveryFee: 12000,
        eta: "25–35 min",
        mapUrl: "[https://www.google.com/maps/search/?api=1&query=Shayxontohur+District+Tashkent](https://www.google.com/maps/search/?api=1&query=Shayxontohur+District+Tashkent)"
      }
    ]
  };

  function formatUZS(amount) {
    return `${Math.round(amount).toLocaleString("en-US")} UZS`;
  }

  // Reusable Option Presets
  const BURGER_SIZES = [
    { label: "Single", priceDelta: 0, kcalDelta: 0 },
    { label: "Double", priceDelta: 12000, kcalDelta: 240 }
  ];

  const BURGER_EXTRAS = [
    { id: "cheese", label: "Extra Cheese", price: 4000, kcal: 90 },
    { id: "meat", label: "Extra Meat", price: 11000, kcal: 210 },
    { id: "sauce", label: "Extra Sauce", price: 2500, kcal: 60 }
  ];

  const PIZZA_SIZES = [
    { label: "Small (25cm)", priceDelta: 0, kcalDelta: 0 },
    { label: "Medium (30cm)", priceDelta: 16000, kcalDelta: 280 },
    { label: "Large (35cm)", priceDelta: 30000, kcalDelta: 540 }
  ];

  const PIZZA_EXTRAS = [
    { id: "cheese", label: "Extra Mozzarella", price: 6000, kcal: 140 },
    { id: "sauce", label: "Garlic Ranch Dip", price: 3000, kcal: 80 }
  ];

  const DRINK_SIZES_SODA = [
    { label: "250 ml", priceDelta: 0, kcalDelta: 0 },
    { label: "330 ml", priceDelta: 2000, kcalDelta: 35 },
    { label: "500 ml", priceDelta: 5000, kcalDelta: 105 },
    { label: "750 ml", priceDelta: 9000, kcalDelta: 210 },
    { label: "1 Liter", priceDelta: 13000, kcalDelta: 315 }
  ];

  const DRINK_SIZES_SHAKE = [
    { label: "250 ml", priceDelta: 0, kcalDelta: 0 },
    { label: "330 ml", priceDelta: 4000, kcalDelta: 110 },
    { label: "500 ml", priceDelta: 9000, kcalDelta: 260 },
    { label: "750 ml", priceDelta: 15000, kcalDelta: 440 },
    { label: "1 Liter", priceDelta: 21000, kcalDelta: 620 }
  ];

  // --------------------------------------------------------------------------
  // 2. COMPLETE MENU CATALOG (25 FOOD PRODUCTS + 10 DRINKS = 35 ITEMS)
  // --------------------------------------------------------------------------
  const PRODUCTS = [
    // --- BURGERS (6) ---
    {
      id: "b1",
      name: "Classic Cheeseburger",
      category: "Burgers",
      basePrice: 32000,
      baseKcal: 520,
      rating: 4.9,
      popularity: 98,
      isOffer: true,
      discountTag: "BESTSELLER",
      image: "[https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80)",
      description: "Flame-grilled 100% halal Uzbek beef patty, melted cheddar, crisp lettuce, pickles, and ISKANDAR signature burger sauce.",
      sizes: BURGER_SIZES,
      extras: BURGER_EXTRAS
    },
    {
      id: "b2",
      name: "Double Beef Burger",
      category: "Burgers",
      basePrice: 46000,
      baseKcal: 780,
      rating: 4.9,
      popularity: 99,
      isOffer: true,
      discountTag: "POPULAR",
      image: "[https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=700&q=80)",
      description: "Two juicy flame-seared halal beef patties layered with double cheddar slices, caramelized onions, and smoky house aioli.",
      sizes: BURGER_SIZES,
      extras: BURGER_EXTRAS
    },
    {
      id: "b3",
      name: "Chicken Burger",
      category: "Burgers",
      basePrice: 29000,
      baseKcal: 460,
      rating: 4.7,
      popularity: 88,
      isOffer: false,
      image: "[https://images.unsplash.com/photo-1615297928064-24977384d0da?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1615297928064-24977384d0da?auto=format&fit=crop&w=700&q=80)",
      description: "Tender marinated grilled chicken breast fillet, fresh tomato, iceberg lettuce, and creamy herb mayo on a toasted brioche bun.",
      sizes: BURGER_SIZES,
      extras: BURGER_EXTRAS
    },
    {
      id: "b4",
      name: "Crispy Chicken Burger",
      category: "Burgers",
      basePrice: 34000,
      baseKcal: 590,
      rating: 4.8,
      popularity: 94,
      isOffer: true,
      discountTag: "CRUNCHY",
      image: "[https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=700&q=80)",
      description: "Extra-crunchy spiced buttermilk chicken fillet, cheddar cheese, crunchy slaw, and tangy honey-mustard glaze.",
      sizes: BURGER_SIZES,
      extras: BURGER_EXTRAS
    },
    {
      id: "b5",
      name: "BBQ Burger",
      category: "Burgers",
      basePrice: 39000,
      baseKcal: 640,
      rating: 4.8,
      popularity: 91,
      isOffer: false,
      image: "[https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=700&q=80)",
      description: "Smoky hickory BBQ sauce, crispy onion rings, aged cheddar, and a thick flame-grilled halal beef patty.",
      sizes: BURGER_SIZES,
      extras: BURGER_EXTRAS
    },
    {
      id: "b6",
      name: "Spicy Burger",
      category: "Burgers",
      basePrice: 37000,
      baseKcal: 570,
      rating: 4.8,
      popularity: 90,
      isOffer: false,
      image: "[https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=700&q=80)",
      description: "Fiery jalapeño slices, pepper-jack cheese, chipotle chili sauce, and seared halal beef on a sesame brioche bun.",
      sizes: BURGER_SIZES,
      extras: BURGER_EXTRAS
    },

    // --- PIZZA (4) ---
    {
      id: "p1",
      name: "Margherita Pizza",
      category: "Pizza",
      basePrice: 54000,
      baseKcal: 740,
      rating: 4.8,
      popularity: 89,
      isOffer: false,
      image: "[https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=80)",
      description: "Stone-baked hand-stretched dough topped with San Marzano tomato sauce, stretchy mozzarella, and fresh basil leaves.",
      sizes: PIZZA_SIZES,
      extras: PIZZA_EXTRAS
    },
    {
      id: "p2",
      name: "Pepperoni Pizza",
      category: "Pizza",
      basePrice: 66000,
      baseKcal: 920,
      rating: 4.9,
      popularity: 97,
      isOffer: true,
      discountTag: "TOP PIZZA",
      image: "[https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=700&q=80)",
      description: "Generous layers of crispy halal beef pepperoni, double mozzarella, oregano, and rich Italian herb tomato sauce.",
      sizes: PIZZA_SIZES,
      extras: PIZZA_EXTRAS
    },
    {
      id: "p3",
      name: "Chicken Pizza",
      category: "Pizza",
      basePrice: 64000,
      baseKcal: 860,
      rating: 4.8,
      popularity: 92,
      isOffer: false,
      image: "[https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80)",
      description: "Tender roasted chicken breast, sweet bell peppers, mushrooms, mozzarella cheese, and creamy Alfredo-tomato blend.",
      sizes: PIZZA_SIZES,
      extras: PIZZA_EXTRAS
    },
    {
      id: "p4",
      name: "BBQ Pizza",
      category: "Pizza",
      basePrice: 69000,
      baseKcal: 940,
      rating: 4.9,
      popularity: 93,
      isOffer: true,
      discountTag: "CHEF SPECIAL",
      image: "[https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80)",
      description: "Smoky barbecue glaze, grilled chicken chunks, red onions, smoked mozzarella, and fresh cilantro.",
      sizes: PIZZA_SIZES,
      extras: PIZZA_EXTRAS
    },

    // --- CHICKEN (4) ---
    {
      id: "c1",
      name: "Fried Chicken",
      category: "Chicken",
      basePrice: 36000,
      baseKcal: 620,
      rating: 4.9,
      popularity: 95,
      isOffer: true,
      discountTag: "CRISPY",
      image: "[https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=700&q=80)",
      description: "Golden pressure-fried halal bone-in chicken marinated in 11 aromatic spices for maximum juiciness and crunch.",
      sizes: [
        { label: "3 Pcs", priceDelta: 0, kcalDelta: 0 },
        { label: "6 Pcs", priceDelta: 28000, kcalDelta: 610 },
        { label: "9 Pcs Bucket", priceDelta: 52000, kcalDelta: 1220 }
      ],
      extras: [{ id: "sauce", label: "Extra Garlic Sauce", price: 3000, kcal: 85 }]
    },
    {
      id: "c2",
      name: "Chicken Nuggets",
      category: "Chicken",
      basePrice: 24000,
      baseKcal: 380,
      rating: 4.7,
      popularity: 89,
      isOffer: false,
      image: "[https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=700&q=80)",
      description: "Bite-sized 100% white-meat chicken breast nuggets coated in a light, crispy golden tempura breading.",
      sizes: [
        { label: "6 Pcs", priceDelta: 0, kcalDelta: 0 },
        { label: "9 Pcs", priceDelta: 9000, kcalDelta: 190 },
        { label: "15 Pcs", priceDelta: 22000, kcalDelta: 560 }
      ],
      extras: [{ id: "sauce", label: "Extra BBQ Dip", price: 3000, kcal: 70 }]
    },
    {
      id: "c3",
      name: "Chicken Wings",
      category: "Chicken",
      basePrice: 32000,
      baseKcal: 540,
      rating: 4.8,
      popularity: 92,
      isOffer: false,
      image: "[https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=700&q=80)",
      description: "Crispy glazed chicken wings tossed in your choice of spicy buffalo or smoky honey-BBQ seasoning.",
      sizes: [
        { label: "6 Wings", priceDelta: 0, kcalDelta: 0 },
        { label: "10 Wings", priceDelta: 18000, kcalDelta: 360 },
        { label: "16 Wings", priceDelta: 38000, kcalDelta: 880 }
      ],
      extras: [{ id: "sauce", label: "Blue Cheese Dip", price: 3500, kcal: 110 }]
    },
    {
      id: "c4",
      name: "Chicken Strips",
      category: "Chicken",
      basePrice: 29000,
      baseKcal: 450,
      rating: 4.8,
      popularity: 90,
      isOffer: false,
      image: "[https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=700&q=80)",
      description: "Hand-breaded tender chicken breast strips seasoned with cracked black pepper and served piping hot.",
      sizes: [
        { label: "4 Strips", priceDelta: 0, kcalDelta: 0 },
        { label: "7 Strips", priceDelta: 16000, kcalDelta: 330 }
      ],
      extras: [{ id: "sauce", label: "Sweet Chili Dip", price: 3000, kcal: 65 }]
    },

    // --- OTHER FAST FOOD: FRIES (2) & SANDWICHES (4) ---
    {
      id: "f1",
      name: "French Fries",
      category: "Fries",
      basePrice: 14000,
      baseKcal: 310,
      rating: 4.8,
      popularity: 96,
      isOffer: false,
      image: "[https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80)",
      description: "Golden skin-on potato fries cooked until crisp on the outside, fluffy inside, and lightly salted.",
      sizes: [
        { label: "Regular", priceDelta: 0, kcalDelta: 0 },
        { label: "Large", priceDelta: 5000, kcalDelta: 150 },
        { label: "Family Box", priceDelta: 11000, kcalDelta: 320 }
      ],
      extras: [{ id: "sauce", label: "Heinz Ketchup / Mayo", price: 2500, kcal: 80 }]
    },
    {
      id: "f2",
      name: "Cheese Fries",
      category: "Fries",
      basePrice: 21000,
      baseKcal: 490,
      rating: 4.9,
      popularity: 93,
      isOffer: true,
      discountTag: "FAN FAVE",
      image: "[https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=700&q=80)",
      description: "Crispy golden fries smothered in warm melted cheddar cheese sauce and topped with crispy turkey-bacon bits.",
      sizes: [
        { label: "Regular", priceDelta: 0, kcalDelta: 0 },
        { label: "Large", priceDelta: 7000, kcalDelta: 210 }
      ],
      extras: [{ id: "cheese", label: "Double Cheese Drizzle", price: 4500, kcal: 120 }]
    },
    {
      id: "s1",
      name: "Hot Dog",
      category: "Sandwiches",
      basePrice: 22000,
      baseKcal: 420,
      rating: 4.7,
      popularity: 85,
      isOffer: false,
      image: "[https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=700&q=80)",
      description: "Grilled 100% halal beef frankfurter in a soft toasted bun with crispy onions, mustard, ketchup, and pickles.",
      sizes: [
        { label: "Classic", priceDelta: 0, kcalDelta: 0 },
        { label: "Double Sausage", priceDelta: 9000, kcalDelta: 220 }
      ],
      extras: [{ id: "cheese", label: "Melted Cheddar", price: 3500, kcal: 85 }]
    },
    {
      id: "s2",
      name: "Club Sandwich",
      category: "Sandwiches",
      basePrice: 33000,
      baseKcal: 580,
      rating: 4.8,
      popularity: 89,
      isOffer: false,
      image: "[https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80)",
      description: "Triple-decker toasted artisan bread layered with grilled chicken, cheddar, fried egg, tomatoes, and herb mayo.",
      sizes: [
        { label: "Standard (4 Halves)", priceDelta: 0, kcalDelta: 0 },
        { label: "XL + Fries", priceDelta: 10000, kcalDelta: 260 }
      ],
      extras: [{ id: "cheese", label: "Extra Cheese", price: 4000, kcal: 90 }]
    },
    {
      id: "s3",
      name: "Chicken Wrap",
      category: "Sandwiches",
      basePrice: 28000,
      baseKcal: 470,
      rating: 4.8,
      popularity: 91,
      isOffer: false,
      image: "[https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=700&q=80)",
      description: "Warm grilled tortilla rolled with crispy chicken strips, crisp lettuce, diced tomatoes, and garlic yogurt sauce.",
      sizes: [
        { label: "Regular", priceDelta: 0, kcalDelta: 0 },
        { label: "Large", priceDelta: 7000, kcalDelta: 170 }
      ],
      extras: [{ id: "cheese", label: "Cheddar Inside", price: 3500, kcal: 85 }]
    },
    {
      id: "s4",
      name: "Beef Shawarma",
      category: "Sandwiches",
      basePrice: 31000,
      baseKcal: 560,
      rating: 4.9,
      popularity: 97,
      isOffer: true,
      discountTag: "TASHKENT HIT",
      image: "[https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=700&q=80)",
      description: "Slow-roasted shaved halal beef, pickled cucumbers, fresh tomatoes, fries, and signature Tashkent garlic-tomato sauce in lavash.",
      sizes: [
        { label: "Standard Lavash", priceDelta: 0, kcalDelta: 0 },
        { label: "Big Boss Lavash", priceDelta: 9000, kcalDelta: 230 }
      ],
      extras: [
        { id: "meat", label: "Extra Beef", price: 9000, kcal: 180 },
        { id: "cheese", label: "Melted Cheese", price: 4000, kcal: 90 }
      ]
    },

    // --- DESSERTS (5) ---
    {
      id: "d1",
      name: "Chocolate Cake",
      category: "Desserts",
      basePrice: 24000,
      baseKcal: 430,
      rating: 4.9,
      popularity: 90,
      isOffer: false,
      image: "[https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80)",
      description: "Rich multi-layered Belgian dark chocolate sponge cake finished with silky cocoa ganache.",
      sizes: [
        { label: "1 Slice", priceDelta: 0, kcalDelta: 0 },
        { label: "Double Slice", priceDelta: 19000, kcalDelta: 430 }
      ],
      extras: [{ id: "sauce", label: "Vanilla Cream Scoop", price: 5000, kcal: 110 }]
    },
    {
      id: "d2",
      name: "Cheesecake",
      category: "Desserts",
      basePrice: 26000,
      baseKcal: 410,
      rating: 4.9,
      popularity: 92,
      isOffer: false,
      image: "[https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=80)",
      description: "Creamy New York-style baked cheesecake on a buttery biscuit crust topped with wild berry compote.",
      sizes: [
        { label: "Classic Slice", priceDelta: 0, kcalDelta: 0 },
        { label: "Large Share", priceDelta: 20000, kcalDelta: 400 }
      ],
      extras: [{ id: "sauce", label: "Extra Berry Glaze", price: 3000, kcal: 55 }]
    },
    {
      id: "d3",
      name: "Ice Cream",
      category: "Desserts",
      basePrice: 15000,
      baseKcal: 240,
      rating: 4.8,
      popularity: 88,
      isOffer: false,
      image: "[https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=700&q=80)",
      description: "Velvety soft-serve vanilla & chocolate swirl sundae drizzled with warm fudge and roasted peanuts.",
      sizes: [
        { label: "Regular Cup", priceDelta: 0, kcalDelta: 0 },
        { label: "Large Sundae", priceDelta: 7000, kcalDelta: 170 }
      ],
      extras: [{ id: "sauce", label: "Caramel Drizzle", price: 2500, kcal: 60 }]
    },
    {
      id: "d4",
      name: "Donut",
      category: "Desserts",
      basePrice: 13000,
      baseKcal: 290,
      rating: 4.7,
      popularity: 86,
      isOffer: false,
      image: "[https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=700&q=80)",
      description: "Fluffy glazed ring donut dipped in strawberry or chocolate icing with rainbow sugar sprinkles.",
      sizes: [
        { label: "Single Donut", priceDelta: 0, kcalDelta: 0 },
        { label: "Box of 3", priceDelta: 22000, kcalDelta: 580 }
      ],
      extras: []
    },
    {
      id: "d5",
      name: "Chocolate Brownie",
      category: "Desserts",
      basePrice: 19000,
      baseKcal: 370,
      rating: 4.9,
      popularity: 91,
      isOffer: true,
      discountTag: "WARM",
      image: "[https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80)",
      description: "Warm fudgy dark-chocolate brownie studded with roasted walnuts and melted chocolate chunks.",
      sizes: [
        { label: "Regular Square", priceDelta: 0, kcalDelta: 0 },
        { label: "Brownie + Ice Cream", priceDelta: 9000, kcalDelta: 190 }
      ],
      extras: []
    },

    // --- DRINKS & MILKSHAKES (10) ---
    {
      id: "dr1",
      name: "Coca-Cola",
      category: "Drinks",
      basePrice: 7000,
      baseKcal: 105,
      rating: 4.9,
      popularity: 98,
      isOffer: false,
      image: "[https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=700&q=80)",
      description: "Ice-cold refreshing Coca-Cola served chilled to pair with any ISKANDAR burger or pizza.",
      sizes: DRINK_SIZES_SODA,
      extras: []
    },
    {
      id: "dr2",
      name: "Fanta",
      category: "Drinks",
      basePrice: 7000,
      baseKcal: 110,
      rating: 4.8,
      popularity: 90,
      isOffer: false,
      image: "[https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&w=700&q=80)",
      description: "Sparkling citrus orange Fanta bursting with bright, fruity refreshment.",
      sizes: DRINK_SIZES_SODA,
      extras: []
    },
    {
      id: "dr3",
      name: "Sprite",
      category: "Drinks",
      basePrice: 7000,
      baseKcal: 98,
      rating: 4.8,
      popularity: 89,
      isOffer: false,
      image: "[https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=700&q=80)",
      description: "Crisp lemon-lime sparkling soda served ice cold.",
      sizes: DRINK_SIZES_SODA,
      extras: []
    },
    {
      id: "dr4",
      name: "Pepsi",
      category: "Drinks",
      basePrice: 7000,
      baseKcal: 108,
      rating: 4.8,
      popularity: 91,
      isOffer: false,
      image: "[https://images.unsplash.com/photo-1553456558-aff552805444?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1553456558-aff552805444?auto=format&fit=crop&w=700&q=80)",
      description: "Bold, chilled cola refreshment available from 250 ml cans to 1-liter family bottles.",
      sizes: DRINK_SIZES_SODA,
      extras: []
    },
    {
      id: "dr5",
      name: "Ice Tea",
      category: "Drinks",
      basePrice: 8000,
      baseKcal: 75,
      rating: 4.7,
      popularity: 86,
      isOffer: false,
      image: "[https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=700&q=80)",
      description: "Chilled brewed black tea infused with ripe peach and fresh lemon zest.",
      sizes: [
        { label: "250 ml", priceDelta: 0, kcalDelta: 0 },
        { label: "330 ml", priceDelta: 2000, kcalDelta: 25 },
        { label: "500 ml", priceDelta: 5000, kcalDelta: 75 },
        { label: "750 ml", priceDelta: 8000, kcalDelta: 150 },
        { label: "1 Liter", priceDelta: 12000, kcalDelta: 225 }
      ],
      extras: []
    },
    {
      id: "dr6",
      name: "Orange Juice",
      category: "Drinks",
      basePrice: 11000,
      baseKcal: 115,
      rating: 4.9,
      popularity: 92,
      isOffer: false,
      image: "[https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=700&q=80)",
      description: "100% pure pressed sun-ripened orange juice packed with natural Vitamin C.",
      sizes: [
        { label: "250 ml", priceDelta: 0, kcalDelta: 0 },
        { label: "330 ml", priceDelta: 3000, kcalDelta: 38 },
        { label: "500 ml", priceDelta: 7000, kcalDelta: 115 },
        { label: "750 ml", priceDelta: 12000, kcalDelta: 230 },
        { label: "1 Liter", priceDelta: 17000, kcalDelta: 345 }
      ],
      extras: []
    },
    {
      id: "dr7",
      name: "Mineral Water",
      category: "Drinks",
      basePrice: 5000,
      baseKcal: 0,
      rating: 4.8,
      popularity: 87,
      isOffer: false,
      image: "[https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=700&q=80)",
      description: "Pure mountain spring water from Uzbekistan, crisp and zero calories across all bottle sizes.",
      sizes: [
        { label: "250 ml", priceDelta: 0, kcalDelta: 0 },
        { label: "330 ml", priceDelta: 1000, kcalDelta: 0 },
        { label: "500 ml", priceDelta: 2000, kcalDelta: 0 },
        { label: "750 ml", priceDelta: 3500, kcalDelta: 0 },
        { label: "1 Liter", priceDelta: 5000, kcalDelta: 0 }
      ],
      extras: []
    },
    {
      id: "dr8",
      name: "Milkshake",
      category: "Drinks",
      basePrice: 18000,
      baseKcal: 340,
      rating: 4.9,
      popularity: 93,
      isOffer: true,
      discountTag: "CREAMY",
      image: "[https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=700&q=80)",
      description: "Thick Madagascar vanilla bean milkshake blended with real farm milk and topped with whipped cream.",
      sizes: DRINK_SIZES_SHAKE,
      extras: []
    },
    {
      id: "dr9",
      name: "Chocolate Milkshake",
      category: "Drinks",
      basePrice: 20000,
      baseKcal: 390,
      rating: 4.9,
      popularity: 95,
      isOffer: true,
      discountTag: "RICH",
      image: "[https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=700&q=80)",
      description: "Decadent dark-cocoa fudge milkshake spun with vanilla ice cream and chocolate curls.",
      sizes: DRINK_SIZES_SHAKE,
      extras: []
    },
    {
      id: "dr10",
      name: "Strawberry Milkshake",
      category: "Drinks",
      basePrice: 20000,
      baseKcal: 360,
      rating: 4.8,
      popularity: 92,
      isOffer: false,
      image: "[https://images.unsplash.com/photo-1553177595-4de2bb0842b9?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1553177595-4de2bb0842b9?auto=format&fit=crop&w=700&q=80)",
      description: "Sweet garden strawberries blended into creamy soft-serve ice cream with whipped cream.",
      sizes: DRINK_SIZES_SHAKE,
      extras: []
    }
  ];

  // Special Combo Offers
  const SPECIAL_OFFERS = [
    {
      id: "offer1",
      title: "ISKANDAR Royal Burger Combo",
      badge: "SAVE 18%",
      desc: "Double Beef Burger + Large French Fries + 500 ml Coca-Cola.",
      oldPrice: 71000,
      newPrice: 58000,
      kcal: 1350,
      image: "[https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=700&q=80)"
    },
    {
      id: "offer2",
      title: "Tashkent Family Pizza Feast",
      badge: "SAVE 22%",
      desc: "Large Pepperoni Pizza + Medium Chicken Pizza + 1 Liter Pepsi.",
      oldPrice: 196000,
      newPrice: 152000,
      kcal: 2920,
      image: "[https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80)"
    },
    {
      id: "offer3",
      title: "Crispy Chicken Bucket Box",
      badge: "SAVE 20%",
      desc: "6 Pcs Fried Chicken + 6 Chicken Nuggets + Cheese Fries + 2x Ice Tea.",
      oldPrice: 109000,
      newPrice: 87000,
      kcal: 2240,
      image: "[https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=700&q=80)"
    },
    {
      id: "offer4",
      title: "Shawarma & Shake Duo",
      badge: "SAVE 15%",
      desc: "Big Boss Beef Shawarma + 330 ml Chocolate Milkshake.",
      oldPrice: 64000,
      newPrice: 54000,
      kcal: 1290,
      image: "[https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=700&q=80](https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=700&q=80)"
    }
  ];

  // --------------------------------------------------------------------------
  // 3. APPLICATION STATE (PERSISTED IN LOCALSTORAGE)
  // --------------------------------------------------------------------------
  const state = {
    cart: JSON.parse(localStorage.getItem("iskandar_cart") || "[]"),
    wishlist: JSON.parse(localStorage.getItem("iskandar_wishlist") || "[]"),
    users: JSON.parse(localStorage.getItem("iskandar_users") || "[]"),
    currentUser: JSON.parse(localStorage.getItem("iskandar_current_user") || "null"),
    orders: JSON.parse(localStorage.getItem("iskandar_orders") || "[]"),
    selectedDistrict: localStorage.getItem("iskandar_district") || "Chilonzor",
    appliedPromo: null,
    theme: localStorage.getItem("iskandar_theme") || "light",
    filters: {
      search: "",
      category: "All",
      priceRange: "all",
      sortBy: "popular",
      offersOnly: false
    },
    cardSelections: {} // Tracks per-card size, extras & qty before Add to Cart
  };

  // Initialize default card selections
  PRODUCTS.forEach((p) => {
    state.cardSelections[p.id] = {
      sizeIdx: 0,
      extras: [],
      qty: 1
    };
  });

  function saveState() {
    localStorage.setItem("iskandar_cart", JSON.stringify(state.cart));
    localStorage.setItem("iskandar_wishlist", JSON.stringify(state.wishlist));
    localStorage.setItem("iskandar_users", JSON.stringify(state.users));
    localStorage.setItem("iskandar_current_user", JSON.stringify(state.currentUser));
    localStorage.setItem("iskandar_orders", JSON.stringify(state.orders));
    localStorage.setItem("iskandar_district", state.selectedDistrict);
    localStorage.setItem("iskandar_theme", state.theme);
  }

  // --------------------------------------------------------------------------
  // 4. PRICE & CALORIE CALCULATION ENGINE
  // --------------------------------------------------------------------------
  function calculateProductConfig(product, sizeIdx = 0, extraIds = [], qty = 1) {
    const sizeObj = product.sizes[sizeIdx] || product.sizes[0];
    let unitPrice = product.basePrice + (sizeObj ? sizeObj.priceDelta : 0);
    let unitKcal = product.baseKcal + (sizeObj ? sizeObj.kcalDelta : 0);
    const selectedExtraNames = [];

    if (product.extras && extraIds.length > 0) {
      extraIds.forEach((exId) => {
        const found = product.extras.find((e) => e.id === exId);
        if (found) {
          unitPrice += found.price;
          unitKcal += found.kcal;
          selectedExtraNames.push(found.label);
        }
      });
    }

    return {
      sizeLabel: sizeObj ? sizeObj.label : "Standard",
      extraLabels: selectedExtraNames,
      unitPrice,
      unitKcal,
      totalPrice: unitPrice * qty,
      totalKcal: unitKcal * qty
    };
  }

  function calculateCartTotals() {
    const subtotal = state.cart.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
    const totalKcal = state.cart.reduce((sum, item) => sum + item.unitKcal * item.qty, 0);
    const totalCount = state.cart.reduce((sum, item) => sum + item.qty, 0);

    const branch = CONFIG.branches.find((b) => b.id === state.selectedDistrict) || CONFIG.branches[0];
    const deliveryFee =
      subtotal === 0 ? 0 : subtotal >= CONFIG.freeDeliveryThreshold ? 0 : branch.deliveryFee;

    let discountAmount = 0;
    if (state.appliedPromo && subtotal > 0) {
      discountAmount = Math.round((subtotal * state.appliedPromo.discountPercent) / 100);
    }

    const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

    return {
      subtotal,
      totalKcal,
      totalCount,
      deliveryFee,
      discountAmount,
      grandTotal,
      branch
    };
  }

  // --------------------------------------------------------------------------
  // 5. TOAST NOTIFICATIONS & UI HELPERS
  // --------------------------------------------------------------------------
  function showToast(message) {
    const container = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      setTimeout(() => toast.remove(), 250);
    }, 3000);
  }

  function closeAllOverlays() {
    document.getElementById("backdrop").classList.remove("active");
    document.getElementById("cartDrawer").classList.remove("open");
    document.getElementById("mobileDrawer").classList.remove("open");
    document.querySelectorAll(".modal-dialog").forEach((m) => m.classList.remove("open"));
  }

  function openModal(modalId) {
    closeAllOverlays();
    document.getElementById("backdrop").classList.add("active");
    document.getElementById(modalId).classList.add("open");
  }

  // --------------------------------------------------------------------------
  // 6. RENDER SPECIAL OFFERS & TASHKENT LOCATIONS
  // --------------------------------------------------------------------------
  function renderSpecialOffers() {
    const grid = document.getElementById("offersGrid");
    grid.innerHTML = SPECIAL_OFFERS.map(
      (offer) => `
      <article class="offer-card">
        <div class="offer-card-img">
          <img src="${offer.image}" alt="${offer.title}" loading="lazy" />
          <span class="discount-badge">${offer.badge}</span>
        </div>
        <div class="offer-card-body">
          <h3>${offer.title}</h3>
          <p class="product-desc">${offer.desc}</p>
          <div class="offer-price-row">
            <span class="old-price">${formatUZS(offer.oldPrice)}</span>
            <span class="new-price">${formatUZS(offer.newPrice)}</span>
          </div>
          <button type="button" class="btn btn-primary btn-block" data-add-offer="${offer.id}">
            Add Combo to Cart • ${offer.kcal} kcal
          </button>
        </div>
      </article>
    `
    ).join("");
  }

  function renderLocations() {
    const grid = document.getElementById("locationsGrid");
    grid.innerHTML = CONFIG.branches
      .map(
        (b) => `
      <article class="location-card">
        <div class="loc-header">
          <h3>${b.name}</h3>
          <span class="loc-status">● Open Now</span>
        </div>
        <ul class="loc-details">
          <li>📍 <strong>Address:</strong> ${b.address}</li>
          <li>🕒 <strong>Hours:</strong> ${b.hours}</li>
          <li>📞 <strong>Phone:</strong> ${b.phone}</li>
          <li>🛵 <strong>Delivery:</strong> ${formatUZS(b.deliveryFee)} (${b.eta})</li>
        </ul>
        <div class="loc-actions">
          <button type="button" class="btn btn-dark" data-select-branch="${b.id}">Deliver From Here</button>
          <a href="${b.mapUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Get Directions ↗</a>
        </div>
      </article>
    `
      )
      .join("");
  }

  // --------------------------------------------------------------------------
  // 7. RENDER & FILTER INTERACTIVE PRODUCT MENU
  // --------------------------------------------------------------------------
  function getFilteredProducts() {
    const { search, category, priceRange, sortBy, offersOnly } = state.filters;
    const term = search.trim().toLowerCase();

    let list = PRODUCTS.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (offersOnly && !p.isOffer) return false;
      if (term && !p.name.toLowerCase().includes(term) && !p.description.toLowerCase().includes(term)) {
        return false;
      }
      if (priceRange === "under20" && p.basePrice >= 20000) return false;
      if (priceRange === "20to45" && (p.basePrice < 20000 || p.basePrice > 45000)) return false;
      if (priceRange === "over45" && p.basePrice <= 45000) return false;
      return true;
    });

    if (sortBy === "price-asc") list.sort((a, b) => a.basePrice - b.basePrice);
    else if (sortBy === "price-desc") list.sort((a, b) => b.basePrice - a.basePrice);
    else if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
    else list.sort((a, b) => b.popularity - a.popularity);

    return list;
  }

  function renderProducts() {
    const grid = document.getElementById("productsGrid");
    const emptyState = document.getElementById("emptyMenuState");
    const filtered = getFilteredProducts();

    if (filtered.length === 0) {
      grid.innerHTML = "";
      emptyState.classList.remove("hidden");
      return;
    }

    emptyState.classList.add("hidden");

    grid.innerHTML = filtered
      .map((p) => {
        const sel = state.cardSelections[p.id];
        const calc = calculateProductConfig(p, sel.sizeIdx, sel.extras, sel.qty);
        const isWished = state.wishlist.includes(p.id);

        const sizesHTML =
          p.sizes && p.sizes.length > 0
            ? `
          <div>
            <span class="option-label">Select Size / Portion:</span>
            <div class="size-pills-row">
              ${p.sizes
                .map(
                  (s, idx) => `
                <button type="button" class="size-choice-btn ${sel.sizeIdx === idx ? "active" : ""}"
                  data-prod-id="${p.id}" data-size-idx="${idx}">
                  ${s.label}
                </button>
              `
                )
                .join("")}
            </div>
          </div>`
            : "";

        const extrasHTML =
          p.extras && p.extras.length > 0
            ? `
          <div>
            <span class="option-label">Add-Ons:</span>
            <div class="extras-row">
              ${p.extras
                .map(
                  (ex) => `
                <label class="extra-chip">
                  <input type="checkbox" data-prod-id="${p.id}" data-extra-id="${ex.id}"
                    ${sel.extras.includes(ex.id) ? "checked" : ""} />
                  <span>+${ex.label} (${formatUZS(ex.price)})</span>
                </label>
              `
                )
                .join("")}
            </div>
          </div>`
            : "";

        return `
        <article class="product-card" id="card-${p.id}">
          <div class="product-media">
            <img src="${p.image}" alt="${p.name}" loading="lazy" />
            <div class="product-badges">
              <span class="p-badge">${p.category}</span>
              ${p.isOffer ? `<span class="p-badge offer">${p.discountTag || "OFFER"}</span>` : ""}
            </div>
            <button type="button" class="wishlist-card-btn" data-wish-id="${p.id}" title="Save to Wishlist">
              ${isWished ? "❤️" : "🤍"}
            </button>
          </div>

          <div class="product-body">
            <div class="product-meta-top">
              <span class="rating-pill">★ ${p.rating.toFixed(1)}</span>
              <span>🔥 <strong id="kcal-${p.id}">${calc.totalKcal}</strong> kcal</span>
            </div>

            <h3 class="product-title">${p.name}</h3>
            <p class="product-desc">${p.description}</p>

            <div class="card-options-box">
              ${sizesHTML}
              ${extrasHTML}
            </div>

            <div class="product-footer">
              <div class="price-cal-row">
                <span class="dynamic-price" id="price-${p.id}">${formatUZS(calc.totalPrice)}</span>
                <span class="dynamic-kcal" id="unit-${p.id}">${calc.sizeLabel}</span>
              </div>

              <div class="card-action-row">
                <div class="qty-stepper">
                  <button type="button" data-qty-change="-1" data-prod-id="${p.id}" aria-label="Decrease quantity">−</button>
                  <span id="qty-${p.id}">${sel.qty}</span>
                  <button type="button" data-qty-change="1" data-prod-id="${p.id}" aria-label="Increase quantity">+</button>
                </div>
                <button type="button" class="btn btn-primary add-cart-btn" data-add-cart="${p.id}">
                  Add to Cart
                </button>
                <button type="button" class="details-icon-btn" data-open-details="${p.id}" title="Product Details">
                  ℹ️
                </button>
              </div>
            </div>
          </div>
        </article>
      `;
      })
      .join("");
  }

  function updateSingleProductCardUI(prodId) {
    const product = PRODUCTS.find((p) => p.id === prodId);
    const sel = state.cardSelections[prodId];
    if (!product || !sel) return;

    const calc = calculateProductConfig(product, sel.sizeIdx, sel.extras, sel.qty);
    const priceEl = document.getElementById(`price-${prodId}`);
    const kcalEl = document.getElementById(`kcal-${prodId}`);
    const qtyEl = document.getElementById(`qty-${prodId}`);
    const unitEl = document.getElementById(`unit-${prodId}`);

    if (priceEl) priceEl.textContent = formatUZS(calc.totalPrice);
    if (kcalEl) kcalEl.textContent = calc.totalKcal;
    if (qtyEl) qtyEl.textContent = sel.qty;
    if (unitEl) unitEl.textContent = calc.sizeLabel;

    const card = document.getElementById(`card-${prodId}`);
    if (card) {
      card.querySelectorAll(".size-choice-btn").forEach((btn) => {
        btn.classList.toggle("active", Number(btn.dataset.sizeIdx) === sel.sizeIdx);
      });
    }
  }

  // --------------------------------------------------------------------------
  // 8. SHOPPING CART MANAGEMENT
  // --------------------------------------------------------------------------
  function addToCart(itemPayload) {
    const configKey = `${itemPayload.productId}|${itemPayload.sizeLabel}|${itemPayload.extraLabels.join(",")}`;
    const existing = state.cart.find((c) => c.configKey === configKey);

    if (existing) {
      existing.qty += itemPayload.qty;
    } else {
      state.cart.push({
        uid: `ci_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        configKey,
        ...itemPayload
      });
    }

    saveState();
    renderCart();
    showToast(`✅ Added ${itemPayload.qty}× ${itemPayload.name} (${itemPayload.sizeLabel}) to cart!`);
  }

  function renderCart() {
    const listEl = document.getElementById("cartItemsList");
    const totals = calculateCartTotals();

    document.getElementById("cartBadge").textContent = totals.totalCount;
    document.getElementById("cartItemCountLabel").textContent = `${totals.totalCount} item(s)`;
    document.getElementById("cartTotalCalories").textContent = `${totals.totalKcal} kcal`;
    document.getElementById("cartSubtotal").textContent = formatUZS(totals.subtotal);
    document.getElementById("cartDistrictName").textContent = totals.branch.id;
    document.getElementById("cartDeliveryFee").textContent =
      totals.deliveryFee === 0 && totals.subtotal > 0 ? "FREE (0 UZS)" : formatUZS(totals.deliveryFee);

    const discountRow = document.getElementById("cartDiscountRow");
    if (totals.discountAmount > 0) {
      discountRow.classList.remove("hidden");
      document.getElementById("cartDiscountAmount").textContent = `-${formatUZS(totals.discountAmount)}`;
    } else {
      discountRow.classList.add("hidden");
    }

    document.getElementById("cartGrandTotal").textContent = formatUZS(totals.grandTotal);

    if (state.cart.length === 0) {
      listEl.innerHTML = `
        <div class="empty-state">
          <h4>Your ISKANDAR cart is empty</h4>
          <p>Explore our flame-grilled burgers, pizzas, shawarma &amp; cold drinks!</p>
        </div>
      `;
      return;
    }

    listEl.innerHTML = state.cart
      .map((item) => {
        const product = PRODUCTS.find((p) => p.id === item.productId);
        const sizeSwitcher =
          product && product.sizes && product.sizes.length > 1
            ? `<select class="cart-size-select" data-cart-resize="${item.uid}" aria-label="Change size">
                ${product.sizes
                  .map(
                    (s, idx) =>
                      `<option value="${idx}" ${s.label === item.sizeLabel ? "selected" : ""}>${s.label}</option>`
                  )
                  .join("")}
              </select>`
            : `<span>${item.sizeLabel}</span>`;

        return `
        <div class="cart-item-card">
          <img src="${item.image}" alt="${item.name}" />
          <div class="cart-item-info">
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-meta">
              ${sizeSwitcher}
              ${item.extraLabels.length ? ` • +${item.extraLabels.join(", ")}` : ""}
              • <strong>${item.unitKcal * item.qty} kcal</strong>
            </div>
            <div class="cart-item-controls">
              <div class="qty-stepper">
                <button type="button" data-cart-qty="-1" data-cart-uid="${item.uid}">−</button>
                <span>${item.qty}</span>
                <button type="button" data-cart-qty="1" data-cart-uid="${item.uid}">+</button>
              </div>
              <strong>${formatUZS(item.unitPrice * item.qty)}</strong>
              <button type="button" class="text-danger-btn" data-cart-remove="${item.uid}" title="Remove">🗑️</button>
            </div>
          </div>
        </div>
      `;
      })
      .join("");
  }

  // --------------------------------------------------------------------------
  // 9. PRODUCT DETAILS MODAL
  // --------------------------------------------------------------------------
  function openProductDetailsModal(prodId) {
    const p = PRODUCTS.find((item) => item.id === prodId);
    if (!p) return;

    const sel = state.cardSelections[prodId];
    const calc = calculateProductConfig(p, sel.sizeIdx, sel.extras, sel.qty);

    document.getElementById("pmTitle").textContent = p.name;
    document.getElementById("productModalBody").innerHTML = `
      <div class="about-grid" style="margin-bottom:0;">
        <div>
          <img src="${p.image}" alt="${p.name}" style="border-radius:14px; height:260px; width:100%; object-fit:cover;" />
        </div>
        <div>
          <span class="section-eyebrow">${p.category} • ★ ${p.rating.toFixed(1)} Rating</span>
          <h3 style="margin-bottom:8px;">${p.name}</h3>
          <p style="color:var(--text-secondary); font-size:0.92rem; margin-bottom:14px;">${p.description}</p>
          <p style="font-size:0.9rem; margin-bottom:6px;"><strong>Selected Configuration:</strong> ${calc.sizeLabel} ${
      calc.extraLabels.length ? `(+ ${calc.extraLabels.join(", ")})` : ""
    }</p>
          <p style="font-size:0.9rem; margin-bottom:14px;"><strong>Nutrition Estimate:</strong> ${calc.totalKcal} kcal (${calc.unitKcal} kcal / unit)</p>
          <div style="font-family:'Outfit',sans-serif; font-size:1.5rem; font-weight:900; color:var(--brand-red); margin-bottom:16px;">
            ${formatUZS(calc.totalPrice)}
          </div>
          <button type="button" class="btn btn-primary btn-block" data-add-cart="${p.id}" data-close-after="true">
            Add ${sel.qty} to Cart • ${formatUZS(calc.totalPrice)}
          </button>
        </div>
      </div>
    `;
    openModal("productModal");
  }

  // --------------------------------------------------------------------------
  // 10. CHECKOUT & ORDER CONFIRMATION
  // --------------------------------------------------------------------------
  function openCheckoutModal() {
    if (state.cart.length === 0) {
      showToast("⚠️ Your cart is empty. Add items before checking out.");
      return;
    }

    document.getElementById("checkoutFormContainer").classList.remove("hidden");
    document.getElementById("orderConfirmationView").classList.add("hidden");

    // Pre-fill from logged-in user if available
    if (state.currentUser) {
      document.getElementById("coName").value = state.currentUser.name || "";
      document.getElementById("coEmail").value = state.currentUser.email || "";
      document.getElementById("coPhone").value = state.currentUser.phone || "";
      document.getElementById("coAddress").value = state.currentUser.address || "";
    }

    document.getElementById("coBranch").value = state.selectedDistrict;
    refreshCheckoutSummary();
    openModal("checkoutModal");
  }

  function refreshCheckoutSummary() {
    const totals = calculateCartTotals();
    document.getElementById("checkoutItemsSummary").innerHTML = state.cart
      .map(
        (item) => `
      <div class="co-item-row">
        <div>
          <strong>${item.qty}× ${item.name}</strong>
          <div style="font-size:0.76rem; color:var(--text-secondary);">
            ${item.sizeLabel}${item.extraLabels.length ? ` • +${item.extraLabels.join(", ")}` : ""} (${item.unitKcal * item.qty} kcal)
          </div>
        </div>
        <strong>${formatUZS(item.unitPrice * item.qty)}</strong>
      </div>
    `
      )
      .join("");

    document.getElementById("checkoutTotalsSummary").innerHTML = `
      <div class="total-row"><span>Total Calories</span><strong>${totals.totalKcal} kcal</strong></div>
      <div class="total-row"><span>Subtotal</span><span>${formatUZS(totals.subtotal)}</span></div>
      <div class="total-row"><span>Delivery (${totals.branch.id})</span><span>${
      totals.deliveryFee === 0 ? "FREE" : formatUZS(totals.deliveryFee)
    }</span></div>
      ${
        totals.discountAmount > 0
          ? `<div class="total-row discount-row"><span>Promo Discount</span><span>-${formatUZS(
              totals.discountAmount
            )}</span></div>`
          : ""
      }
      <div class="total-row grand-total"><span>Total Payable</span><strong>${formatUZS(totals.grandTotal)}</strong></div>
    `;
  }

  function handleCheckoutSubmit(e) {
    e.preventDefault();
    const name = document.getElementById("coName").value.trim();
    const phone = document.getElementById("coPhone").value.trim();
    const email = document.getElementById("coEmail").value.trim();
    const city = document.getElementById("coCity").value.trim();
    const branchId = document.getElementById("coBranch").value;
    const address = document.getElementById("coAddress").value.trim();
    const notes = document.getElementById("coNotes").value.trim();
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

    if (!name || !phone || !email || !city || !address) {
      showToast("⚠️ Please complete all required delivery fields.");
      return;
    }

    state.selectedDistrict = branchId;
    const totals = calculateCartTotals();
    const orderNumber = `ISK-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderRecord = {
      orderNumber,
      date: new Date().toLocaleString("en-GB"),
      customer: { name, phone, email, city, branchId, address, notes },
      paymentMethod,
      items: [...state.cart],
      subtotal: totals.subtotal,
      deliveryFee: totals.deliveryFee,
      discountAmount: totals.discountAmount,
      grandTotal: totals.grandTotal,
      totalKcal: totals.totalKcal,
      userEmail: state.currentUser ? state.currentUser.email : email
    };

    state.orders.unshift(orderRecord);
    state.cart = [];
    state.appliedPromo = null;
    saveState();
    renderCart();

    document.getElementById("checkoutFormContainer").classList.add("hidden");
    const confirmEl = document.getElementById("orderConfirmationView");
    confirmEl.classList.remove("hidden");

    confirmEl.innerHTML = `
      <div style="font-size:3rem; margin-bottom:8px;">🎉</div>
      <span class="section-eyebrow">ORDER CONFIRMED • ISKANDAR-FAST FOOD</span>
      <h2 style="margin-bottom:8px;">Thank You, ${name}!</h2>
      <p style="color:var(--text-secondary);">Order <strong>#${orderNumber}</strong> has been received by <strong>${totals.branch.name}</strong>.</p>

      <div class="tracker-steps" id="demoTrackerSteps">
        <div class="tracker-step active">1. Order Received ✓</div>
        <div class="tracker-step" id="stepPrep">2. Flame Grilling</div>
        <div class="tracker-step" id="stepPack">3. Thermal Packing</div>
        <div class="tracker-step" id="stepReady">4. Demo Dispatch Ready</div>
      </div>

      <div style="background:var(--bg-surface-alt); padding:16px; border-radius:12px; text-align:left; max-width:540px; margin:0 auto 18px; font-size:0.9rem;">
        <p><strong>Delivery Address:</strong> ${address}, ${branchId}, ${city}</p>
        <p><strong>Payment Method:</strong> ${paymentMethod} (Simulated Confirmation)</p>
        <p><strong>Total Paid:</strong> ${formatUZS(orderRecord.grandTotal)} • ${orderRecord.totalKcal} kcal</p>
        <p style="font-size:0.78rem; color:var(--text-secondary); margin-top:6px;">
          ℹ️ Demonstration Delivery Tracker: Status updates below simulate kitchen preparation; no real courier is dispatched.
        </p>
      </div>

      <button type="button" class="btn btn-primary" data-close-modal="checkoutModal">Back to ISKANDAR Menu</button>
    `;

    // Simulated live kitchen progress steps
    setTimeout(() => document.getElementById("stepPrep")?.classList.add("active"), 1800);
    setTimeout(() => document.getElementById("stepPack")?.classList.add("active"), 3600);
    setTimeout(() => document.getElementById("stepReady")?.classList.add("active"), 5400);
  }

  // --------------------------------------------------------------------------
  // 11. USER REGISTRATION, LOGIN & ACCOUNT PORTAL
  // --------------------------------------------------------------------------
  function updateHeaderAccountLabel() {
    const label = document.getElementById("headerAccountLabel");
    label.textContent = state.currentUser ? state.currentUser.name.split(" ")[0] : "My Account";
  }

  function renderAccountModal(activeTab = "login") {
    const body = document.getElementById("accountModalBody");

    if (state.currentUser) {
      const userOrders = state.orders.filter((o) => o.userEmail === state.currentUser.email);
      body.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:18px;">
          <div>
            <h4>Welcome back, ${state.currentUser.name}</h4>
            <p style="color:var(--text-secondary); font-size:0.88rem;">${state.currentUser.email} • ${
        state.currentUser.phone || "Tashkent Member"
      }</p>
          </div>
          <button type="button" class="btn btn-dark" id="logoutUserBtn">Log Out</button>
        </div>

        <form id="profileUpdateForm" class="styled-form" style="margin-bottom:24px;">
          <div class="form-row">
            <div class="form-group">
              <label for="profPhone">Phone Number</label>
              <input type="tel" id="profPhone" value="${state.currentUser.phone || ""}" placeholder="+998 90 123 45 67" />
            </div>
            <div class="form-group">
              <label for="profAddress">Saved Tashkent Delivery Address</label>
              <input type="text" id="profAddress" value="${state.currentUser.address || ""}" placeholder="District, Street, Apt" />
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Save Delivery Profile</button>
        </form>

        <h4>Order History (${userOrders.length})</h4>
        <div style="display:flex; flex-direction:column; gap:10px; margin-top:10px;">
          ${
            userOrders.length === 0
              ? `<p style="color:var(--text-secondary); font-size:0.9rem;">No orders placed yet. Try our Classic Cheeseburger or Pepperoni Pizza!</p>`
              : userOrders
                  .map(
                    (o) => `
                <div style="background:var(--bg-surface-alt); padding:12px; border-radius:10px; border:1px solid var(--border-color); font-size:0.88rem;">
                  <div style="display:flex; justify-content:space-between;">
                    <strong>#${o.orderNumber} (${o.customer.branchId})</strong>
                    <strong>${formatUZS(o.grandTotal)}</strong>
                  </div>
                  <div style="color:var(--text-secondary); font-size:0.8rem;">${o.date} • ${o.paymentMethod}</div>
                </div>
              `
                  )
                  .join("")
          }
        </div>
      `;
      return;
    }

    body.innerHTML = `
      <p style="font-size:0.8rem; color:var(--text-secondary); background:var(--bg-surface-alt); padding:9px 12px; border-radius:8px; margin-bottom:14px;">
        ℹ️ Frontend Demonstration: Accounts are stored locally in your browser (localStorage). Production deployments require a secure backend authentication server.
      </p>
      <div class="auth-tabs">
        <button type="button" class="auth-tab-btn ${activeTab === "login" ? "active" : ""}" data-auth-tab="login">Sign In</button>
        <button type="button" class="auth-tab-btn ${activeTab === "register" ? "active" : ""}" data-auth-tab="register">Create Account</button>
      </div>

      ${
        activeTab === "login"
          ? `
        <form id="loginForm" class="styled-form">
          <div class="form-group">
            <label for="loginEmail">Email Address *</label>
            <input type="email" id="loginEmail" required placeholder="you@example.uz" />
          </div>
          <div class="form-group">
            <label for="loginPassword">Password *</label>
            <input type="password" id="loginPassword" required placeholder="••••••••" />
          </div>
          <button type="submit" class="btn btn-primary btn-block">Sign In to ISKANDAR</button>
        </form>
      `
          : `
        <form id="registerForm" class="styled-form">
          <div class="form-row">
            <div class="form-group">
              <label for="regName">Full Name *</label>
              <input type="text" id="regName" required placeholder="Dilshod Karimov" />
            </div>
            <div class="form-group">
              <label for="regPhone">Phone Number *</label>
              <input type="tel" id="regPhone" required placeholder="+998 90 123 45 67" />
            </div>
          </div>
          <div class="form-group">
            <label for="regEmail">Email Address *</label>
            <input type="email" id="regEmail" required placeholder="dilshod@example.uz" />
          </div>
          <div class="form-group">
            <label for="regAddress">Default Tashkent Address *</label>
            <input type="text" id="regAddress" required placeholder="Yunusobod, Amir Temur Ave 12" />
          </div>
          <div class="form-group">
            <label for="regPassword">Create Password *</label>
            <input type="password" id="regPassword" required placeholder="Minimum 6 characters" />
          </div>
          <button type="submit" class="btn btn-primary btn-block">Register Account</button>
        </form>
      `
      }
    `;
  }

  // --------------------------------------------------------------------------
  // 12. WISHLIST MODAL
  // --------------------------------------------------------------------------
  function updateWishlistBadge() {
    document.getElementById("wishlistBadge").textContent = state.wishlist.length;
  }

  function renderWishlistModal() {
    const body = document.getElementById("wishlistBody");
    const wishedItems = PRODUCTS.filter((p) => state.wishlist.includes(p.id));

    if (wishedItems.length === 0) {
      body.innerHTML = `<p style="text-align:center; color:var(--text-secondary);">No saved favorites yet. Tap the ❤️ icon on any menu item!</p>`;
      return;
    }

    body.innerHTML = wishedItems
      .map(
        (p) => `
      <div class="cart-item-card" style="margin-bottom:10px;">
        <img src="${p.image}" alt="${p.name}" />
        <div class="cart-item-info">
          <div class="cart-item-title">${p.name}</div>
          <div class="cart-item-meta">${p.category} • From ${formatUZS(p.basePrice)} • ${p.baseKcal} kcal</div>
          <div style="display:flex; gap:8px; margin-top:6px;">
            <button type="button" class="btn btn-primary" style="padding:6px 12px; font-size:0.8rem;" data-add-cart="${p.id}">Add to Cart</button>
            <button type="button" class="text-danger-btn" data-wish-id="${p.id}" data-refresh-wish="true">Remove</button>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }

  // --------------------------------------------------------------------------
  // 13. GLOBAL EVENT LISTENERS & INITIALIZATION
  // --------------------------------------------------------------------------
  function syncCategoryUI(cat) {
    state.filters.category = cat;
    document.getElementById("categoryFilterSelect").value = cat;
    document.querySelectorAll(".menu-tab").forEach((t) => t.classList.toggle("active", t.dataset.cat === cat));
    document.querySelectorAll(".cat-pill").forEach((p) => p.classList.toggle("active", p.dataset.stripCat === cat));
    renderProducts();
  }

  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    document.getElementById("themeIcon").textContent = theme === "dark" ? "☀️" : "🌙";
    saveState();
  }

  function init() {
    applyTheme(state.theme);
    renderSpecialOffers();
    renderLocations();
    renderProducts();
    renderCart();
    updateWishlistBadge();
    updateHeaderAccountLabel();

    // Sync district selector
    const heroSelect = document.getElementById("heroDistrictSelect");
    heroSelect.value = state.selectedDistrict;
    const activeBranch = CONFIG.branches.find((b) => b.id === state.selectedDistrict) || CONFIG.branches[0];
    document.getElementById(
      "heroDeliveryNote"
    ).textContent = `✅ Active Kitchen: ${activeBranch.name} • Fee: ${formatUZS(activeBranch.deliveryFee)} (${activeBranch.eta})`;

    // Hide loader
    setTimeout(() => document.getElementById("pageLoader").classList.add("fade-out"), 350);

    // Theme switch
    document.getElementById("themeToggleBtn").addEventListener("click", () => {
      applyTheme(state.theme === "light" ? "dark" : "light");
    });

    // Mobile drawer
    document.getElementById("hamburgerBtn").addEventListener("click", () => {
      closeAllOverlays();
      document.getElementById("backdrop").classList.add("active");
      document.getElementById("mobileDrawer").classList.add("open");
    });
    document.getElementById("mobileDrawerClose").addEventListener("click", closeAllOverlays);

    // Cart drawer
    document.getElementById("cartOpenBtn").addEventListener("click", () => {
      closeAllOverlays();
      document.getElementById("backdrop").classList.add("active");
      document.getElementById("cartDrawer").classList.add("open");
    });
    document.getElementById("cartCloseBtn").addEventListener("click", closeAllOverlays);
    document.getElementById("backdrop").addEventListener("click", closeAllOverlays);

    // Wishlist & Account modal triggers
    document.getElementById("wishlistOpenBtn").addEventListener("click", () => {
      renderWishlistModal();
      openModal("wishlistModal");
    });
    document.getElementById("accountOpenBtn").addEventListener("click", () => {
      renderAccountModal("login");
      openModal("accountModal");
    });
    document.getElementById("mobileAccountLink").addEventListener("click", (e) => {
      e.preventDefault();
      renderAccountModal("login");
      openModal("accountModal");
    });
    document.getElementById("mobileCartLink").addEventListener("click", (e) => {
      e.preventDefault();
      closeAllOverlays();
      document.getElementById("backdrop").classList.add("active");
      document.getElementById("cartDrawer").classList.add("open");
    });

    // Hero District Selector
    document.getElementById("heroSetDistrictBtn").addEventListener("click", () => {
      const dist = heroSelect.value;
      state.selectedDistrict = dist;
      saveState();
      const br = CONFIG.branches.find((b) => b.id === dist);
      document.getElementById(
        "heroDeliveryNote"
      ).textContent = `✅ Active Kitchen: ${br.name} • Fee: ${formatUZS(br.deliveryFee)} (${br.eta})`;
      renderCart();
      showToast(`📍 Delivery branch set to ${br.name}`);
    });

    // Search & Filter Controls
    const searchInput = document.getElementById("menuSearchInput");
    const clearSearchBtn = document.getElementById("clearSearchBtn");
    searchInput.addEventListener("input", () => {
      state.filters.search = searchInput.value;
      clearSearchBtn.classList.toggle("hidden", !searchInput.value);
      renderProducts();
    });
    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      state.filters.search = "";
      clearSearchBtn.classList.add("hidden");
      renderProducts();
    });

    document.getElementById("categoryFilterSelect").addEventListener("change", (e) => syncCategoryUI(e.target.value));
    document.getElementById("priceFilterSelect").addEventListener("change", (e) => {
      state.filters.priceRange = e.target.value;
      renderProducts();
    });
    document.getElementById("sortSelect").addEventListener("change", (e) => {
      state.filters.sortBy = e.target.value;
      renderProducts();
    });
    document.getElementById("specialOffersOnlyCheckbox").addEventListener("change", (e) => {
      state.filters.offersOnly = e.target.checked;
      renderProducts();
    });
    document.getElementById("resetFiltersBtn").addEventListener("click", () => {
      searchInput.value = "";
      clearSearchBtn.classList.add("hidden");
      document.getElementById("priceFilterSelect").value = "all";
      document.getElementById("sortSelect").value = "popular";
      document.getElementById("specialOffersOnlyCheckbox").checked = false;
      state.filters = { search: "", category: "All", priceRange: "all", sortBy: "popular", offersOnly: false };
      syncCategoryUI("All");
    });

    // Cart Promo Code & Clear & Proceed
    document.getElementById("applyPromoBtn").addEventListener("click", () => {
      const code = document.getElementById("cartPromoInput").value.trim().toUpperCase();
      const feedback = document.getElementById("promoFeedback");
      if (CONFIG.promoCodes[code]) {
        state.appliedPromo = { code, ...CONFIG.promoCodes[code] };
        feedback.style.color = "#16A34A";
        feedback.textContent = `✅ Applied ${code}: ${state.appliedPromo.label}`;
        renderCart();
      } else {
        state.appliedPromo = null;
        feedback.style.color = "#D91E18";
        feedback.textContent = "❌ Invalid promo code. Try ISKANDAR20 or TASHKENT15.";
        renderCart();
      }
    });

    document.getElementById("clearCartBtn").addEventListener("click", () => {
      state.cart = [];
      state.appliedPromo = null;
      saveState();
      renderCart();
      showToast("🗑️ Shopping cart cleared");
    });

    document.getElementById("proceedCheckoutBtn").addEventListener("click", openCheckoutModal);

    // Checkout branch change updates delivery fee live
    document.getElementById("coBranch").addEventListener("change", (e) => {
      state.selectedDistrict = e.target.value;
      saveState();
      renderCart();
      refreshCheckoutSummary();
    });

    document.getElementById("checkoutForm").addEventListener("submit", handleCheckoutSubmit);

    // Contact Form & Newsletter
    document.getElementById("contactForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("contactName").value.trim();
      const phone = document.getElementById("contactPhone").value.trim();
      const email = document.getElementById("contactEmail").value.trim();
      const msg = document.getElementById("contactMessage").value.trim();
      if (!name || !phone || !email || !msg) {
        showToast("⚠️ Please fill out all required contact fields.");
        return;
      }
      e.target.reset();
      showToast(`✅ Thank you ${name}! Our Tashkent support team will respond shortly.`);
    });

    document.getElementById("newsletterForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("newsletterEmail").value.trim();
      if (!email) return;
      e.target.reset();
      showToast("🎉 Subscribed! Welcome to the ISKANDAR VIP Club.");
    });

    // Delegated Click Events across Document
    document.addEventListener("click", (e) => {
      const target = e.target;

      // Close modal buttons
      const closeModalAttr = target.closest("[data-close-modal]");
      if (closeModalAttr) {
        closeAllOverlays();
        return;
      }

      // Category tabs & strip pills & dropdown jumps
      const tabBtn = target.closest("[data-cat]");
      if (tabBtn) {
        syncCategoryUI(tabBtn.dataset.cat);
        return;
      }
      const stripBtn = target.closest("[data-strip-cat]");
      if (stripBtn) {
        syncCategoryUI(stripBtn.dataset.stripCat);
        document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
        return;
      }
      const jumpLink = target.closest("[data-cat-jump]");
      if (jumpLink) {
        syncCategoryUI(jumpLink.dataset.catJump);
        closeAllOverlays();
        return;
      }
      if (target.closest("[data-mobile-nav]")) {
        closeAllOverlays();
      }

      // Copy promo code
      const copyBtn = target.closest("[data-copy-code]");
      if (copyBtn) {
        const code = copyBtn.dataset.copyCode;
        navigator.clipboard?.writeText(code);
        document.getElementById("cartPromoInput").value = code;
        showToast(`📋 Promo code ${code} copied & ready in cart!`);
        return;
      }

      // Product card size selection
      const sizeBtn = target.closest(".size-choice-btn");
      if (sizeBtn) {
        const pid = sizeBtn.dataset.prodId;
        state.cardSelections[pid].sizeIdx = Number(sizeBtn.dataset.sizeIdx);
        updateSingleProductCardUI(pid);
        return;
      }

      // Product card quantity stepper
      const qtyBtn = target.closest("[data-qty-change]");
      if (qtyBtn) {
        const pid = qtyBtn.dataset.prodId;
        const delta = Number(qtyBtn.dataset.qtyChange);
        state.cardSelections[pid].qty = Math.max(1, state.cardSelections[pid].qty + delta);
        updateSingleProductCardUI(pid);
        return;
      }

      // Add Product to Cart
      const addBtn = target.closest("[data-add-cart]");
      if (addBtn) {
        const pid = addBtn.dataset.addCart;
        const p = PRODUCTS.find((item) => item.id === pid);
        if (!p) return;
        const sel = state.cardSelections[pid];
        const calc = calculateProductConfig(p, sel.sizeIdx, sel.extras, sel.qty);

        addToCart({
          productId: p.id,
          name: p.name,
          image: p.image,
          sizeLabel: calc.sizeLabel,
          extraLabels: calc.extraLabels,
          unitPrice: calc.unitPrice,
          unitKcal: calc.unitKcal,
          qty: sel.qty
        });

        if (addBtn.dataset.closeAfter === "true") closeAllOverlays();
        return;
      }

      // Add Special Offer Combo to Cart
      const offerBtn = target.closest("[data-add-offer]");
      if (offerBtn) {
        const offer = SPECIAL_OFFERS.find((o) => o.id === offerBtn.dataset.addOffer);
        if (!offer) return;
        addToCart({
          productId: offer.id,
          name: offer.title,
          image: offer.image,
          sizeLabel: "Combo Deal",
          extraLabels: [],
          unitPrice: offer.newPrice,
          unitKcal: offer.kcal,
          qty: 1
        });
        return;
      }

      // Open Product Details Modal
      const detBtn = target.closest("[data-open-details]");
      if (detBtn) {
        openProductDetailsModal(detBtn.dataset.openDetails);
        return;
      }

      // Wishlist toggle
      const wishBtn = target.closest("[data-wish-id]");
      if (wishBtn) {
        const pid = wishBtn.dataset.wishId;
        const idx = state.wishlist.indexOf(pid);
        if (idx > -1) {
          state.wishlist.splice(idx, 1);
          showToast("💔 Removed from Favorites");
        } else {
          state.wishlist.push(pid);
          showToast("❤️ Saved to Favorites!");
        }
        saveState();
        updateWishlistBadge();
        renderProducts();
        if (wishBtn.dataset.refreshWish === "true") renderWishlistModal();
        return;
      }

      // Cart Item Qty / Remove
      const cQtyBtn = target.closest("[data-cart-qty]");
      if (cQtyBtn) {
        const uid = cQtyBtn.dataset.cartUid;
        const delta = Number(cQtyBtn.dataset.cartQty);
        const item = state.cart.find((c) => c.uid === uid);
        if (item) {
          item.qty += delta;
          if (item.qty <= 0) state.cart = state.cart.filter((c) => c.uid !== uid);
          saveState();
          renderCart();
        }
        return;
      }

      const cRemBtn = target.closest("[data-cart-remove]");
      if (cRemBtn) {
        state.cart = state.cart.filter((c) => c.uid !== cRemBtn.dataset.cartRemove);
        saveState();
        renderCart();
        return;
      }

      // Select Branch from Locations section
      const branchBtn = target.closest("[data-select-branch]");
      if (branchBtn) {
        state.selectedDistrict = branchBtn.dataset.selectBranch;
        heroSelect.value = state.selectedDistrict;
        saveState();
        renderCart();
        showToast(`📍 Active kitchen set to ISKANDAR ${state.selectedDistrict}`);
        document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
        return;
      }

      // FAQ Accordion
      const faqBtn = target.closest(".faq-question");
      if (faqBtn) {
        const item = faqBtn.parentElement;
        const isOpen = item.classList.toggle("open");
        faqBtn.querySelector("span").textContent = isOpen ? "−" : "+";
        return;
      }

      // Auth Tabs & Logout
      const authTab = target.closest("[data-auth-tab]");
      if (authTab) {
        renderAccountModal(authTab.dataset.authTab);
        return;
      }
      if (target.id === "logoutUserBtn") {
        state.currentUser = null;
        saveState();
        updateHeaderAccountLabel();
        renderAccountModal("login");
        showToast("👋 Signed out of ISKANDAR Account");
      }
    });

    // Delegated Change Events (Extras checkboxes & Cart Size dropdown)
    document.addEventListener("change", (e) => {
      const target = e.target;

      if (target.matches("[data-extra-id]")) {
        const pid = target.dataset.prodId;
        const exId = target.dataset.extraId;
        const extrasArr = state.cardSelections[pid].extras;
        if (target.checked && !extrasArr.includes(exId)) extrasArr.push(exId);
        else state.cardSelections[pid].extras = extrasArr.filter((id) => id !== exId);
        updateSingleProductCardUI(pid);
      }

      if (target.matches("[data-cart-resize]")) {
        const uid = target.dataset.cartResize;
        const newSizeIdx = Number(target.value);
        const item = state.cart.find((c) => c.uid === uid);
        const product = item ? PRODUCTS.find((p) => p.id === item.productId) : null;
        if (item && product) {
          const extraIds = product.extras
            .filter((ex) => item.extraLabels.includes(ex.label))
            .map((ex) => ex.id);
          const recalc = calculateProductConfig(product, newSizeIdx, extraIds, 1);
          item.sizeLabel = recalc.sizeLabel;
          item.unitPrice = recalc.unitPrice;
          item.unitKcal = recalc.unitKcal;
          saveState();
          renderCart();
        }
      }
    });

    // Delegated Form Submissions for Dynamic Account Forms
    document.addEventListener("submit", (e) => {
      if (e.target.id === "registerForm") {
        e.preventDefault();
        const name = document.getElementById("regName").value.trim();
        const phone = document.getElementById("regPhone").value.trim();
        const email = document.getElementById("regEmail").value.trim().toLowerCase();
        const address = document.getElementById("regAddress").value.trim();
        const password = document.getElementById("regPassword").value;

        if (!name || !phone || !email || !address || password.length < 6) {
          showToast("⚠️ Fill all fields (password min 6 chars).");
          return;
        }
        if (state.users.some((u) => u.email === email)) {
          showToast("⚠️ Email already registered. Please Sign In.");
          return;
        }

        const newUser = { name, phone, email, address, password };
        state.users.push(newUser);
        state.currentUser = newUser;
        saveState();
        updateHeaderAccountLabel();
        renderAccountModal();
        showToast(`🎉 Welcome to ISKANDAR-FAST FOOD, ${name}!`);
      }

      if (e.target.id === "loginForm") {
        e.preventDefault();
        const email = document.getElementById("loginEmail").value.trim().toLowerCase();
        const password = document.getElementById("loginPassword").value;
        const found = state.users.find((u) => u.email === email && u.password === password);

        if (!found) {
          showToast("❌ Invalid email or password.");
          return;
        }
        state.currentUser = found;
        saveState();
        updateHeaderAccountLabel();
        renderAccountModal();
        showToast(`✅ Signed in as ${found.name}`);
      }

      if (e.target.id === "profileUpdateForm") {
        e.preventDefault();
        if (!state.currentUser) return;
        state.currentUser.phone = document.getElementById("profPhone").value.trim();
        state.currentUser.address = document.getElementById("profAddress").value.trim();
        const idx = state.users.findIndex((u) => u.email === state.currentUser.email);
        if (idx > -1) state.users[idx] = { ...state.currentUser };
        saveState();
        showToast("✅ Saved Tashkent delivery profile!");
      }
    });

    // Back-to-top visibility
    const btt = document.getElementById("backToTopBtn");
    window.addEventListener("scroll", () => {
      btt.classList.toggle("visible", window.scrollY > 450);
    });
    btt.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  document.addEventListener("DOMContentLoaded", init);
})();