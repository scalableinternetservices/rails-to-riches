// User Payloads
interface UserSignupPayload {
  user: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role?: string;
  };
}

interface UserLoginPayload {
  user: {
    email: string;
    password: string;
  };
}

interface UserUpdatePayload {
  user: {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
  };
}

// Restaurant Payloads
interface RestaurantPayload {
  restaurant: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    description?: string;
    phone_number?: string;
    website?: string;
  };
}

// Dish Payloads
interface DishPayload {
  dish: {
    name: string;
    description?: string;
    price: number;
  };
}

// Review Payloads
interface ReviewPayload {
  review: {
    rating: number;
    content?: string;
  };
}

// Comment Payloads
interface CommentPayload {
  comment: {
    content: string;
  };
}

// Photo Payloads
interface PhotoPayload {
  photo: {
    image: File;
  };
}

// Response Types
interface UserResponse {
  jwt: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

interface RestaurantResponse {
  restaurant: {
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    description?: string;
    phone_number?: string;
    website?: string;
  };
}

interface DishResponse {
  dish: {
    id: number;
    name: string;
    description?: string;
    price: number;
  };
}

interface ReviewResponse {
  review: {
    id: number;
    user_id: number;
    restaurant_id: number;
    rating: number;
    content?: string;
  };
}

interface CommentResponse {
  comment: {
    id: number;
    user_id: number;
    review_id: number;
    content: string;
  };
}

interface PhotoResponse {
  photo: {
    id: number;
    image_url: string;
  };
}

// List Responses
interface UsersListResponse {
  users: UserResponse['user'][];
}

interface RestaurantsListResponse {
  restaurants: RestaurantResponse['restaurant'][];
}

interface DishesListResponse {
  dishes: DishResponse['dish'][];
}

interface ReviewsListResponse {
  reviews: ReviewResponse['review'][];
}

interface CommentsListResponse {
  comments: CommentResponse['comment'][];
}

interface PhotosListResponse {
  photos: PhotoResponse['photo'][];
}