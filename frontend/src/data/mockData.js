// src/data/mockData.js
export const mockRestaurant = {
    id: 1,
    name: "Ege's Delight",
    address: "123 Culinary Street",
    city: "Foodville",
    state: "Flavor State",
    zip: "12345",
    description:
      "Ege's Delight offers a fusion of traditional and contemporary dishes, crafted with the freshest ingredients to tantalize your taste buds.",
    phone_number: "(123) 456-7890",
    website: "https://www.egesdelight.com",
    photos: [
"https://img-9gag-fun.9cache.com/photo/azxm2Kq_460s.jpg",     "https://img-9gag-fun.9cache.com/photo/aQEwRd8_460s.jpg",
      "https://img-9gag-fun.9cache.com/photo/arm3DqB_460s.jpg",
    ],
    dishes: [
      {
        id: 1,
        name: "Mediterranean Platter",
        description:
          "A delightful assortment of hummus, falafel, tabbouleh, and pita bread.",
        price: 12.99,
      },
      {
        id: 2,
        name: "Grilled Salmon",
        description:
          "Freshly grilled salmon served with a lemon-dill sauce and seasonal vegetables.",
        price: 18.99,
      },
      {
        id: 3,
        name: "Vegan Buddha Bowl",
        description:
          "A nourishing bowl filled with quinoa, roasted chickpeas, avocado, and mixed greens.",
        price: 14.99,
      },
    ],
    reviews: [
      {
        id: 1,
        user: "John Doe",
        rating: 5,
        content:
          "Amazing food and excellent service! The Mediterranean Platter was to die for.",
        comments: [
          {
            id: 1,
            user: "Ege",
            content: "Thank you so much, John! We're thrilled you enjoyed your meal.",
          },
        ],
      },
      {
        id: 2,
        user: "Jane Smith",
        rating: 4,
        content:
          "Great ambiance and the Grilled Salmon was perfectly cooked. Will visit again!",
        comments: [
          {
            id: 2,
            user: "Ege",
            content: "Glad to hear you enjoyed the salmon, Jane! See you next time.",
          },
        ],
      },
    ],
  };
  