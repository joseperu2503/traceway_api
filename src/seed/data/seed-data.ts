import { CreateRestaurantCategoryDto } from 'src/restaurants/dto/create-restaurant-category.dto';
import { CreateDishCategoryDto } from 'src/dish-categories/dto/create-dish-category.dto';
import { CreateDishDto } from 'src/dishes/dto/create-dish.dto';
import { CreateRestaurantDto } from 'src/restaurants/dto/create-restaurant.dto';
import { CreateToppingCategoryDto } from 'src/topping-categories/dto/create-topping-category.dto';
import { CreateToppingDto } from 'src/toppings/dto/create-topping.dto';
import { CreateAddressTagDto } from 'src/address-tags/dto/create-address-tag.dto';
import { CreateAddressDeliveryDetailDto } from 'src/address-delivery-details/dto/create-address-delivery-detail.dto';
import { CreateOrderStatusDto } from 'src/orders/dto/create-order-status.dto';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import { CreateAddressDto } from 'src/addresses/dto/create-address.dto';
import { FavoriteDishDto } from 'src/favorites/dto/favorite-dish.dto';
import { FavoriteRestaurantDto } from 'src/favorites/dto/favorite-restaurant.dto';

interface SeedData {
  users: RegisterUserDto[];
  restaurants: CreateRestaurantDto[];
  restaurantCategories: CreateRestaurantCategoryDto[];
  dishCategories: CreateDishCategoryDto[];
  dishes: CreateDishDto[];
  toppingCategories: CreateToppingCategoryDto[];
  toppings: CreateToppingDto[];
  addressTags: CreateAddressTagDto[];
  addressDeliveryDetails: CreateAddressDeliveryDetailDto[];
  orderStatuses: CreateOrderStatusDto[];
  addresses: CreateAddressDto[];
  favoriteDishes: FavoriteDishDto[];
  favoriteRestaurants: FavoriteRestaurantDto[];
}

export const initialData: SeedData = {
  users: [
    {
      email: 'test1@gmail.com',
      name: 'Test',
      surname: 'User',
      password: 'Abc123',
      phone: '993689145',
    },
    {
      email: 'test2@gmail.com',
      name: 'Test',
      surname: 'User',
      password: 'Abc123',
      phone: '993689145',
    },
    {
      email: 'joseperu2503@gmail.com',
      name: 'Jose',
      surname: 'Perez',
      password: 'Abc123',
      phone: '993689145',
    },
    {
      email: 'juniorp2503@hotmail.com',
      name: 'Jose',
      surname: 'Perez',
      password: 'Abc123',
      phone: '993689145',
    },
  ],
  addresses: [
    {
      address: 'Avenida Las Viñas',
      locality: 'Puente Piedra',
      country: 'Peru',
      latitude: -11.850501612187411,
      longitude: -77.08191242069006,
      addressDeliveryDetailId: 1,
      addressTagId: 1,
      detail: '',
      references: '',
    },
  ],
  orderStatuses: [
    {
      name: 'Order Confirmed',
    },
    {
      name: 'Preparing Food',
    },
    {
      name: 'Food on the Way',
    },
    {
      name: 'Delivered to You',
    },
  ],
  restaurantCategories: [
    {
      name: 'Pizza',
      image:
        'https://images.rappi.pe/rests_taxonomy/0b2c10b6-6a52-4a0b-b4a6-4b6560b09f06.png',
    },
    {
      name: 'Burger',
      image:
        'https://images.rappi.pe/rests_taxonomy/b2f87daf-ea61-471f-8e32-3b09e4644a3c.png',
    },
    {
      name: 'Mexican',
      image:
        'https://images.rappi.pe/rests_taxonomy/3b8d4b65-3ccd-443b-ad7c-a2bd45476e8c.png',
    },
    {
      name: 'Sushi',
      image:
        'https://images.rappi.pe/rests_taxonomy/afc20b37-c45a-4ecd-8908-56d9a2f9cced.png',
    },
    {
      name: 'Coffee',
      image:
        'https://images.rappi.pe/rests_taxonomy/3b89c363-9276-47a9-9c9a-eb703e2e46fa.png',
    },
    {
      name: 'American',
      image:
        'https://images.rappi.pe/rests_taxonomy/187b4276-b082-49c6-b275-b24bb062e913.png',
    },
    {
      name: 'Dessert',
      image:
        'https://images.rappi.pe/rests_taxonomy/c5047730-f825-4aba-b5a9-13d947db4563.png',
    },
  ],
  restaurants: [
    {
      name: "Dunkin'",
      address: '1104 Lexington Ave, New York, NY 10075, EE. UU.',
      logo: 'https://img.cdn4dd.com/p/media/restaurant/cover_square/98851814-9e10-467f-8867-ec8586529624.png',
      backdrop:
        'https://doordash-static.s3.amazonaws.com/media/store/header/eb3a3f37-7a8b-49b6-ab0a-5c6f349024f1.jpg',
      latitude: 40.77391679836528,
      longitude: -73.95988361975252,
      openTime: '00:00',
      closeTime: '00:00',
      restaurantCategoryId: 5,
    },
    {
      name: 'Pinkberry',
      address: '7 W 32nd St, New York, NY 10001, Estados Unidos',
      logo: 'https://img.cdn4dd.com/p/fit=contain,width=100,height=100,format=auto,quality=95/media/restaurant/cover_square/cc2d7091-9bc7-4126-9c16-6390684d1ca0.png',
      backdrop:
        'https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=500,height=500,format=auto,quality=80/https://doordash-static.s3.amazonaws.com/media/store/header/1859.jpg',
      latitude: 40.747732077419705,
      longitude: -73.98602679128479,
      openTime: '09:00',
      closeTime: '18:30',
      restaurantCategoryId: 5,
    },
    {
      name: 'Burger King',
      address: '327 W 42nd St, New York, NY 10036, EE. UU.',
      logo: 'https://img.cdn4dd.com/p/fit=contain,width=100,height=100,format=auto,quality=95/media/restaurant/cover_square/d43b7d43-f85b-4645-a31b-89abf0d9a407.png',
      backdrop:
        'https://doordash-static.s3.amazonaws.com/media/store/header/2288ab90-8ff9-4095-a468-347a956702f9.jpg',
      latitude: 40.75820687028439,
      longitude: -73.99099756235016,
      openTime: '09:00',
      closeTime: '18:30',
      restaurantCategoryId: 2,
    },
    {
      name: "Joli's Korean Fried Chicken",
      address: '625 9th Ave, New York, NY 10036, EE. UU.',
      logo: 'https://img.cdn4dd.com/p/fit=contain,width=100,height=100,format=auto,quality=95/media/restaurant/cover_square/4b68244f-25ae-4425-88a6-f6351e62c6a5.jpg',
      backdrop:
        'https://doordash-static.s3.amazonaws.com/media/store/header/27abe6d0-726e-4d69-833c-bbfd2a0b2d03.jpg',
      latitude: 40.76013870481429,
      longitude: -73.99175832013128,
      openTime: '09:00',
      closeTime: '18:30',
      restaurantCategoryId: 6,
    },
    {
      name: "Tex's Chicken and Burgers",
      address: '2144 Frederick Douglass Blvd, New York, NY 10026, EE. UU.',
      logo: 'https://img.cdn4dd.com/p/fit=contain,width=100,height=100,format=auto,quality=95/media/restaurant/cover_square/58127dc8-8924-448c-9451-83f831b70362.png',
      backdrop:
        'https://doordash-static.s3.amazonaws.com/media/store/header/5f480ef4-211a-42a1-9b8c-e6c1e89feb3d.45',
      latitude: 40.80432521741583,
      longitude: -73.95530026442604,
      openTime: '09:00',
      closeTime: '18:30',
      restaurantCategoryId: 2,
    },
    {
      name: "Muf's Muffin Shop",
      address: '937 1st Ave., New York, NY 10022, EE. UU.',
      logo: 'https://img.cdn4dd.com/p/fit=contain,width=100,height=100,format=auto,quality=95/media/restaurant/cover_square/288d73de-5c42-475e-ae9b-a22b852dfd13.png',
      backdrop:
        'https://doordash-static.s3.amazonaws.com/media/store/header/42b2c3d0-0c4a-4278-82f1-7df8d041ed60.jpg',
      latitude: 40.7550618989992,
      longitude: -73.96567177787905,
      openTime: '00:00',
      closeTime: '00:00',
      restaurantCategoryId: 7,
    },
    {
      name: 'Ritz Diner',
      address: '1133 1st Ave., New York, NY 10065, EE. UU.',
      logo: 'https://img.cdn4dd.com/p/fit=contain,width=100,height=100,format=auto,quality=95/media/restaurant/cover_square/4cc822e9-98ef-470a-9f09-53dc3e641587.png',
      backdrop:
        'https://doordash-static.s3.amazonaws.com/media/store/header/7dd7203b-4375-47dc-af26-a8e23221cebf.579',
      latitude: 40.76185452170965,
      longitude: -73.96069449328802,
      openTime: '00:00',
      closeTime: '00:00',
      restaurantCategoryId: 7,
    },
    {
      name: 'Naka Sushi & Izakaya',
      address: '74 5th Ave, New York, NY 10003, EE. UU.',
      logo: 'https://img.cdn4dd.com/p/fit=contain,width=100,height=100,format=auto,quality=95/media/restaurant/cover_square/035e9197-8731-4156-972c-bca500e7da8e.png',
      backdrop:
        'https://doordash-static.s3.amazonaws.com/media/store/header/2404b561-77cb-472d-9a3e-1c6fce90906d.jpg',
      latitude: 40.73584694300126,
      longitude: -73.99403316244043,
      openTime: '10:00',
      closeTime: '02:00',
      restaurantCategoryId: 4,
    },
    {
      name: 'Milk Bar',
      address: '561 Columbus Ave, New York, NY 10024, EE. UU.',
      logo: 'https://img.cdn4dd.com/p/fit=contain,width=100,height=100,format=auto,quality=95/media/restaurant/cover_square/06652ca8-d411-452e-9e2f-fd74854226b9.png',
      backdrop:
        'https://doordash-static.s3.amazonaws.com/media/store/header/5adcbd1c-6842-4c34-b658-bc1e512924f2.jpg',
      latitude: 40.78729874865438,
      longitude: -73.97132013357616,
      openTime: '9:00',
      closeTime: '23:25',
      restaurantCategoryId: 7,
    },
    {
      name: 'Taco Bell',
      address: '1614 2nd Ave, New York, NY 10028, United States',
      logo: 'https://img.cdn4dd.com/p/fit=contain,width=100,height=100,format=auto,quality=95/media/restaurant/cover_square/d439d236-e807-41d4-a7ea-0f83500de5c6.png',
      backdrop:
        'https://doordash-static.s3.amazonaws.com/media/store/header/889fac0f-5ca7-4b0f-b2b1-cb9b579986b0.55',
      latitude: 40.77633761143043,
      longitude: -73.95263068099224,
      openTime: '10:00',
      closeTime: '4:30',
      restaurantCategoryId: 3,
    },
    {
      name: 'Popeyes Louisiana Kitchen',
      address: '934 8th Ave, New York, NY 10019, EE. UU.',
      logo: 'https://img.cdn4dd.com/p/fit=contain,width=100,height=100,format=auto,quality=95/media/restaurant/cover_square/12ee8636-2193-4972-b110-9be6a9a74f59.png',
      backdrop:
        'https://doordash-static.s3.amazonaws.com/media/store/header/9e8e6638-0835-4e91-b3a7-7a48bcae89bb.png',
      latitude: 40.76563668839061,
      longitude: -73.98340552015794,
      openTime: '9:00',
      closeTime: '6:00',
      restaurantCategoryId: 6,
    },
    {
      name: 'Subway',
      address: '1256 Lexington Ave, New York, NY 10028, EE. UU.',
      logo: 'https://img.cdn4dd.com/p/fit=contain,width=100,height=100,format=auto,quality=95/media/restaurant/cover_square/Subway-app.jpg',
      backdrop:
        'https://doordash-static.s3.amazonaws.com/media/store/header/155fa18a-3953-413d-9064-73b372513b4c.png',
      latitude: 40.77882198852454,
      longitude: -73.95638903555977,
      openTime: '00:00',
      closeTime: '00:00',
      restaurantCategoryId: 6,
    },
    {
      name: 'Pizza Hut',
      address: '940 Columbus Ave, New York, NY 10025, EE. UU.',
      logo: 'https://img.cdn4dd.com/p/fit=contain,width=100,height=100,format=auto,quality=95/media/restaurant/cover_square/ade9928a-19bf-46f4-aff6-b746aff3824f.png',
      backdrop:
        'https://doordash-static.s3.amazonaws.com/media/store/header/cfe9e0cb-497e-48a2-aed7-07348d870bdd.png',
      latitude: 40.79963470425142,
      longitude: -73.96296780473563,
      openTime: '10:00',
      closeTime: '1:40',
      restaurantCategoryId: 1,
    },
  ],
  toppingCategories: [
    {
      description: 'Choose your Variety',
      minToppings: 1,
      maxToppings: 1,
      restaurantId: 1,
    },
    {
      description: 'Elige la Temperatura',
      minToppings: 1,
      maxToppings: 1,
      restaurantId: 2,
    },
    {
      description: '¿Desea Ají?',
      minToppings: 1,
      maxToppings: 1,
      restaurantId: 2,
    },
    {
      description: 'Añade Un Postre',
      minToppings: 0,
      maxToppings: 3,
      restaurantId: 2,
    },
    {
      description: '¿Deseas Agregar Bebida?',
      minToppings: 0,
      maxToppings: 5,
      restaurantId: 2,
    },
    {
      description: '¿Deseas Cubiertos?',
      minToppings: 0,
      maxToppings: 1,
      restaurantId: 2,
    },
  ],
  toppings: [
    {
      description: 'Surprise Me',
      maxLimit: 1,
      toppingCategoryId: 1,
      price: 0,
    },
    {
      description: 'Boston Kreme',
      maxLimit: 1,
      toppingCategoryId: 1,
      price: 0,
    },
    {
      description: 'Chocolate Frosted',
      maxLimit: 1,
      toppingCategoryId: 1,
      price: 0,
    },
    {
      description: 'Double Chocolate',
      maxLimit: 1,
      toppingCategoryId: 1,
      price: 0,
    },
    {
      description: 'Glazed',
      maxLimit: 1,
      toppingCategoryId: 1,
      price: 0,
    },
    {
      description: 'Glazed Blueberry',
      maxLimit: 1,
      toppingCategoryId: 1,
      price: 0,
    },
    {
      description: 'Glazed Chocolate',
      maxLimit: 1,
      toppingCategoryId: 1,
      price: 0,
    },
    {
      description: 'Glazed Chocolate',
      maxLimit: 1,
      toppingCategoryId: 1,
      price: 0,
    },
    {
      description: 'Jelly',
      maxLimit: 1,
      toppingCategoryId: 1,
      price: 0,
    },
    {
      description: 'Old Fashioned',
      maxLimit: 1,
      toppingCategoryId: 1,
      price: 0,
    },
    {
      description: 'Powdered',
      maxLimit: 1,
      toppingCategoryId: 1,
      price: 0,
    },
    {
      description: 'Strawberry Frosted with Sprinkles',
      maxLimit: 1,
      toppingCategoryId: 1,
      price: 0,
    },
    {
      description: 'Vanilla Crème',
      maxLimit: 1,
      toppingCategoryId: 1,
      price: 0,
    },
    {
      description: 'Vanilla Frosted with Sprinkles',
      maxLimit: 1,
      toppingCategoryId: 1,
      price: 0,
    },
  ],
  dishCategories: [
    {
      name: 'Donuts & Bakery',
      restaurantId: 1,
    },
    {
      name: 'Iced Drinks',
      restaurantId: 1,
    },
    {
      name: 'Sandwiches & Wraps',
      restaurantId: 1,
    },
    {
      name: 'Frozen Drinks',
      restaurantId: 1,
    },
    {
      name: 'Snacks & Sides',
      restaurantId: 1,
    },
    {
      name: 'Swirls',
      restaurantId: 2,
    },
    {
      name: 'Smoothies',
      restaurantId: 2,
    },
    {
      name: 'Take Home',
      restaurantId: 2,
    },
    {
      name: 'Drinks',
      restaurantId: 2,
    },
    {
      name: 'Flame Grilled Burgers',
      restaurantId: 3,
    },
    {
      name: 'Meals',
      restaurantId: 3,
    },
    {
      name: 'Bundle Deals',
      restaurantId: 3,
    },
    {
      name: 'Chicken & Fish',
      restaurantId: 3,
    },
    {
      name: 'Drinks & Coffee',
      restaurantId: 3,
    },
    {
      name: 'Sweets',
      restaurantId: 3,
    },
  ],
  dishes: [
    {
      name: 'Classic Donuts',
      description:
        'Treat yourself or share the joy by bringing people together with a dozen donuts made in these delicious varieties*: Glazed, Chocolate Frosted, Strawberry Frosted, Old Fashioned, Boston Kreme, Glazed Chocolate Cake and Jelly.',
      dishCategoryId: 1,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/fab47dfd-5e81-4b59-9787-6272711172e8-retina-large.jpg',
      price: 2.48,
      stock: 15,
      toppingsIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    },
    {
      name: 'MUNCHKINS® Donut Hole Treats',
      description:
        "Our Famous Munchkins® make the perfect treat to share with friends, family and colleagues alike. Made fresh daily in a variety of colorful and delicious flavors, there's a favorite for everyone. Be a real hero and pick up a Box O' Joe® while you're there. Available in the following varieties*: Glazed; Glazed Chocolate; Jelly; Powdered Sugar; Cinnamon; Sugar Raised. (*Availabilty may vary depending on location)",
      dishCategoryId: 1,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/16665165-d8ce-4085-8e4c-4b5c1bd755cd-retina-large.png',
      price: 2.61,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Half Dozen Donuts',
      description:
        'Share the joy by bringing people together with an assortment of half dozen or dozen donuts made in these delicious varieties*: Glazed, Double Chocolate, Strawberry Frosted, Vanilla Frosted, Chocolate Frosted, Old Fashioned, Boston Kreme, Glazed Chocolate Cake, Powdered, Vanilla Creme, Glazed Blueberry, and Jelly. *Assortment and availability will vary depending on location.',
      dishCategoryId: 1,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/16665165-d8ce-4085-8e4c-4b5c1bd755cd-retina-large.png',
      price: 12.48,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Bagel with Cream Cheese Spread',
      description:
        'A delicious way to start your day. Soft and chewy, these freshly baked bagels come in some of your favorite varieties. Bagels Available in the following varieties*: Plain; Cinnamon Raisin; Multigrain; Sesame Seed; Everything. *Availability may vary depending on location',
      dishCategoryId: 1,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/b85e85bb-3f34-43c3-a235-317bde539ed6-retina-large.JPEG',
      price: 4.36,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Coffee Roll',
      description: 'Glazed coffee roll laced with pure cinnamon',
      dishCategoryId: 1,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/d3bf4557-b2f1-441a-a99b-9f0a497681b9-retina-large.JPG',
      price: 2.98,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Croissant',
      description:
        'A delicious way to start your day. Our warm, freshly baked croissant is the perfect pair to a freshly brewed Hot or Iced Coffee',
      dishCategoryId: 1,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photos/d212c806-f5a6-4e82-95fd-4a3860e491ad-retina-large-jpeg',
      price: 3.23,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Original Blend Iced Coffee',
      description:
        'Freshly brewed and full of flavor, our Iced Coffee is the perfect pick-me-up any time of day or night, giving you the boost you need to keep on running.',
      dishCategoryId: 2,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=1000,height=600,format=auto,quality=50/media/photosV2/9f3cd836-c0e1-4ad8-8bfc-066598f34933-retina-large.JPG',
      price: 4.61,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Iced Latte',
      description:
        "Made with milk and blended with our rich espresso, our Iced Latte is the perfect balance of cool, creamy and smooth to get you goin'.",
      dishCategoryId: 2,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=1000,height=600,format=auto,quality=50/media/photosV2/b9474158-e97a-41f8-801e-018d2b9171f1-retina-large.JPG',
      price: 5.98,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Iced Cappuccino',
      description:
        'Our Iced Cappuccino is brewed with freshly ground espresso beans and then blended with milk served over ice for a refreshing cup of frothy and bold deliciousness.',
      dishCategoryId: 2,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=1000,height=600,format=auto,quality=50/media/photosV2/c69f5a14-f218-4c9f-887b-da6ada42dddd-retina-large.JPG',
      price: 5.98,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Iced Macchiato',
      description:
        'Looking for layers on layers of hand-crafted deliciousness? Made with creamy milk and topped with two shots of espresso then served over ice, our Iced Macchiato is just what you need.',
      dishCategoryId: 2,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=1000,height=600,format=auto,quality=50/media/photosV2/eb53cc47-2ace-460f-b5fb-148c8db96abc-retina-large.JPEG',
      price: 6.61,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Cold Brew',
      description:
        'An ultra-smooth, full-bodied coffee like no other. Craft-brewed in small batches. Limited quantities available daily.',
      dishCategoryId: 2,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=1000,height=600,format=auto,quality=50/media/photos/055c2e1c-380e-476f-a791-9f39a5b8ff36-retina-large-jpeg',
      price: 5.48,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Iced Americano',
      description:
        "Our Iced Americano blends two shots of Dunkin's 100% Rainforest Alliance Certified™ espresso richness with water for a refreshing, espresso-forward cup of woah!",
      dishCategoryId: 2,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=1000,height=600,format=auto,quality=50/media/photosV2/f5b67c8f-0902-46c4-9a3b-d29c681bda9c-retina-large.JPEG',
      price: 5.36,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Bacon Egg and Cheese',
      description:
        "Go the extra mile by bringing bacon to your Dunkin' Breakfast Sandwich. Bacon with egg and cheese.",
      dishCategoryId: 3,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=1000,height=600,format=auto,quality=50/media/photos/4c07e1c2-854e-4e1a-be58-15114873753c-retina-large-jpeg',
      price: 6.73,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Turkey Sausage Egg and Cheese',
      description:
        'Get your day off to a delicious start. Try our flavorful turkey sausage, add and American cheese on English Muffin, or Wake-Up Wrap®',
      dishCategoryId: 3,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=1000,height=600,format=auto,quality=50/media/photos/fe69efe3-52dc-4ac8-8275-2acb0571eb91-retina-large.jpg',
      price: 6.73,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Wake-Up Wrap® - Turkey Sausage Egg and Cheese',
      description:
        'Start your morning off right with one of our delicious, made-to-order Wake-Up Wrap® sandwiches. Select from a variety of your favorite breakfast ingredients, they are the perfect portion of oven-toasted gooDD. And at such a great value, we undertstand if you want to grab one in the afternoon or evening too.',
      dishCategoryId: 3,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=1000,height=600,format=auto,quality=50/media/photos/f2454923-862f-4812-b3d9-201ec90bc7d6-retina-large.jpg',
      price: 3.98,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Sourdough Breakfast Sandwich',
      description:
        'Two eggs, five half slices of bacon and white cheddar on two pieces of sourdough toast.',
      dishCategoryId: 3,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=1000,height=600,format=auto,quality=50/media/photosV2/9342d9b4-7475-48dd-9764-61228440bfda-retina-large.JPEG',
      price: 7.48,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: "Chorizo & Egg Dunkin' Wrap",
      description:
        'Scrambled egg, chorizo, roasted vegetables, beans and a mildly spiced cheese sauce in a red pepper lavash wrap.',
      dishCategoryId: 3,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=1000,height=600,format=auto,quality=50/media/photosV2/d64008df-d728-49fc-9686-ed1329a26530-retina-large.jpg',
      price: 6.23,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: "Green Goddess Dunkin' Wrap",
      description:
        'Scrambled egg whites, farro, sundried tomatoes, spinach, and crumbled feta cheese all mixed with a herby green goddess sauce and wrapped in a green lavash.',
      dishCategoryId: 3,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=1000,height=600,format=auto,quality=50/media/photosV2/45d352fd-9bf4-463d-869f-05366c3c3b62-retina-large.png',
      price: 6.73,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Frozen Coffee',
      description:
        "Our Frozen Coffee is made with real Dunkin' coffee, delivering a smooth, creamy coffee-forward flavor.",
      dishCategoryId: 4,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photos/eea42837-a667-4f2b-9c82-aa720f837fdf-retina-large-jpeg',
      price: 6.23,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Strawberry Coolatta®',
      description:
        'Looking for the ultimate frozen, fruity refreshment? Our Coolatta® will do the trick. One sip and refreshment begins.',
      dishCategoryId: 4,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/edbc028d-49bf-4081-9209-c970d185e742-retina-large.png',
      price: 5.73,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Blue Raspberry Coolatta​®',
      description:
        'Looking for the ultimate frozen, fruity refreshment? Our Coolatta® will do the trick. One sip and refreshment begins.',
      dishCategoryId: 4,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/27f7acfd-00b5-4767-b0d0-088601913a25-retina-large.png',
      price: 5.73,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Vanilla Bean Coolatta®',
      description:
        'Looking for the ultimate frozen, fruity refreshment? Our Coolatta® will do the trick. One sip and refreshment begins.',
      dishCategoryId: 4,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/04a1de2f-1d04-4a21-a1b6-89d5d9f07f1c-retina-large.png',
      price: 5.73,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Frozen Matcha Latte',
      description: 'Sweetened matcha green tea blended with milk',
      dishCategoryId: 4,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/20550dba-8696-4273-81eb-f5c64d53fabd-retina-large.JPEG',
      price: 6.61,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Everything Stuffed Bagel Minis',
      description:
        'Everything mini bagels filled with cream cheese, served warm. Two per order.',
      dishCategoryId: 5,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/4cdce318-0f15-4d1e-b204-90600dd93c4f-retina-large.JPEG',
      price: 4.11,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Hash Browns',
      description:
        'Our hash browns are lightly seasoned, crispy bites of gooDDness. Pair them with your breakfast sandwich and your morning pit stop gets even more tasty. Perfectly paired with our freshly brewed Hot or Iced Coffee.',
      dishCategoryId: 5,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/60fbbc37-62d3-490a-a334-a23eea4340a6-retina-large.JPG',
      price: 2.23,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: "Hot Honey Snackin' Bacon",
      description: '8 snack-sized strips of Hot Honey seasoned bacon.',
      dishCategoryId: 5,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/88835d3c-c00c-400d-8780-b03138b30c64-retina-large.png',
      price: 4.11,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Ham & Swiss Croissant Stuffer',
      description: 'Croissant filled with ham & swiss cheese.',
      dishCategoryId: 5,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/44c2dd44-00d4-4127-96ef-ad42c80a5667-retina-large.png',
      price: 6.23,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Bacon & Cheddar Omelet Bites',
      description:
        'Cage-free eggs mixed with bacon and cheddar cheese, cooked sous-vide style and packed with 17g of protein.',
      dishCategoryId: 5,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/904dffaa-b3d3-48b5-bc73-df4238535117-retina-large.JPG',
      price: 7.48,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'MUNCHKINS® Donut Hole Treats',
      description:
        "Our Famous Munchkins® make the perfect treat to share with friends, family and colleagues alike. Made fresh daily in a variety of colorful and delicious flavors, there's a favorite for everyone. Be a real hero and pick up a Box O' Joe® while you're there. Available in the following varieties*: Glazed; Glazed Chocolate; Jelly; Powdered Sugar; Cinnamon; Sugar Raised. (*Availabilty may vary depending on location)",
      dishCategoryId: 5,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/16665165-d8ce-4085-8e4c-4b5c1bd755cd-retina-large.png',
      price: 2.61,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Swirl with Toppings',
      description:
        'Choose your flavor of swirl and add your favorite toppings.',
      dishCategoryId: 6,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/5c253905-75bd-463e-9f38-0e55c39a5ce3-retina-large.jpg',
      price: 9.85,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Side by Side Swirl with Toppings',
      description:
        'Choose two of Pinkberry swirl flavors and get them side by side in a cup. Add your favorite toppings to make it the ultimate treat.',
      dishCategoryId: 6,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/b99116f5-33ff-4b4d-b70d-69dc8cce5e9c-retina-large.jpg',
      price: 9.85,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Single Swirl',
      description: 'Choose your favorite Pinkberry swirl flavor!',
      dishCategoryId: 6,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/f3980285-0a39-4d7b-b6f0-c29000ffecf7-f0f31f6c-6464-408e-8aa5-240a72e6a728-retina-large.JPG',
      price: 7.86,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Side by Side Swirl',
      description:
        'Choose two of your favorite Pinkberry flavors and get them side by side in a cup.',
      dishCategoryId: 6,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/ee8cbeef-a00f-4e68-bee0-34bc5e2b2548-f4baf1b6-3a8b-42a6-a7c8-a38d95a40ae2-retina-large.JPG',
      price: 7.86,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Chocolate Banana',
      description:
        'Chocolate Banana Chocolate hazelnut frozen yogurt with non-fat milk and banana',
      dishCategoryId: 7,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/95de20f2-3805-46e6-aa0d-8dad281367ee-67137e64-9e8e-40ab-9ce1-6e7f4e3eeb64-retina-large.JPG',
      price: 10.22,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Strawberry Banana',
      description:
        'Original frozen yogurt with non-fat milk, strawberries, banana and strawberry puree',
      dishCategoryId: 7,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/293fcb25-12e2-40d6-8e9e-3609830289f8-retina-large.jpg',
      price: 10.22,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Mixed Berry',
      description:
        'Original frozen yogurt with non-fat milk, strawberries, blueberries, raspberries and strawberry puree',
      dishCategoryId: 7,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/da1df59b-ff86-4aab-acbe-d7ccd51eae4a-452f993e-3360-4a6d-a9e6-cbaff64aa96e-retina-large.JPG',
      price: 10.22,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Tropical Mango',
      description:
        'Original frozen yogurt with non-fat milk, mango, pineapple and agave nectar',
      dishCategoryId: 7,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/60258f80-3b96-404f-a029-edd105fbea36-052bf2bc-163c-43f5-9feb-db7f986cd4de-retina-large.JPG',
      price: 10.22,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Take Home : Single Swirl',
      description: '',
      dishCategoryId: 8,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/281f4b61-d4d8-443d-8fbe-24608c00c57c-retina-large.PNG',
      price: 18.28,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Take Home : Side by Side Swirl',
      description: '',
      dishCategoryId: 8,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/281f4b61-d4d8-443d-8fbe-24608c00c57c-retina-large.PNG',
      price: 18.28,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Bottled Water',
      description: 'Poland spring',
      dishCategoryId: 9,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photos/8c890132-6e32-4792-a11d-174f20b2b7c9-retina-large-jpeg',
      price: 2.79,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Whopper',
      description:
        'A ¼ lb* of flame-grilled beef patty topped with juicy tomatoes, crisp lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a toasted sesame seed bun. *Weight based on pre-cooked patty.',
      dishCategoryId: 10,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/cb7b3159-a091-4584-b58d-139df49f315b-retina-large.png',
      price: 10.49,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Impossible™ Whopper',
      description:
        'A flame-grilled, plant-based patty with juicy tomatoes, crisp lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a toasted sesame seed bun. *Patty cooked on the same broiler as beef patties.',
      dishCategoryId: 10,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/868b2196-a923-4463-9761-3c3864974d6c-retina-large.png',
      price: 11.99,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Double Cheeseburger',
      description:
        'Two flame-grilled patties–for a 1/4 lb* of beef–with melted American cheese, crunchy pickles, yellow mustard, and ketchup on a toasted sesame seed bun. *Weight based on pre-cooked patty.',
      dishCategoryId: 10,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/290adf3d-342b-4ab0-b2bf-cfc0eb4bf66b-retina-large.png',
      price: 6.89,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Bacon King',
      description:
        'Two 1/4 lb* flame-grilled beef patties with crispy bacon, melted American cheese, ketchup, and creamy mayonnaise on a toasted sesame seed bun. *Weight based on pre-cooked patty.',
      dishCategoryId: 10,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/63a03631-fbf7-4915-a5a3-431809cf2d6f-retina-large.png',
      price: 13.99,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Double Whopper',
      description:
        'Two ¼ lb.* flame-grilled beef patties with juicy tomatoes, crisp lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a toasted sesame seed bun. *Weight based on pre-cooked patty',
      dishCategoryId: 10,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/e1149c6d-afa8-4532-a464-95264dae449f-retina-large.png',
      price: 12.49,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Whopper Jr.',
      description:
        'A flame-grilled beef patty with juicy tomatoes, crisp lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a toasted sesame seed bun.',
      dishCategoryId: 10,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/e23456dc-aa8a-4153-82a2-172469babd31-retina-large.png',
      price: 7.49,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Whopper Meal',
      description:
        'A ¼ lb* of flame-grilled beef patty topped with juicy tomatoes, crisp lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a toasted sesame seed bun. *Weight based on pre-cooked patty.',
      dishCategoryId: 11,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/25c422be-3dd3-457a-b993-cc1f4edae4db-retina-large.png',
      price: 15.99,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Bacon King Meal',
      description:
        'Two 1/4 lb* flame-grilled beef patties with crispy bacon, melted American cheese, ketchup, and creamy mayonnaise on a toasted sesame seed bun. *Weight based on pre-cooked patty.',
      dishCategoryId: 11,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/8f47bdb4-e41a-4d0b-a1ae-fe70e98cc67b-retina-large.png',
      price: 19.49,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Double Whopper Meal',
      description:
        'Two ¼ lb.* flame-grilled beef patties with juicy tomatoes, crisp lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a toasted sesame seed bun. *Weight based on pre-cooked patty',
      dishCategoryId: 11,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/46a1df14-566c-493e-a92e-dd177b99b75e-retina-large.png',
      price: 17.99,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Impossible™ Whopper Meal',
      description:
        'A flame-grilled, plant-based patty with juicy tomatoes, crisp lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a toasted sesame seed bun. *Patty cooked on the same broiler as beef patties.',
      dishCategoryId: 11,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/3921be36-6c7b-4ac3-8bbc-6ea7310a8d98-retina-large.png',
      price: 17.49,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Double Bundle',
      description:
        '(2) Whoppers or Original Chicken Sandwiches, (2) Medium Fries or Medium Onion Rings, (1) 8 Pc. Nuggets or 8 Pc. Fiery Buffalo Nuggets',
      dishCategoryId: 12,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/5e449ea6-3896-4c4d-88b2-b30f7d7a149a-retina-large.png',
      price: 19.99,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Triple Bundle',
      description:
        '(3) Whoppers or Original Chicken Sandwiches, (3) Medium Fries or Medium Onion Rings, (1) 8 Pc. Nuggets or 8 Pc. Fiery Buffalo Nuggets',
      dishCategoryId: 12,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/a87726f2-52c0-4875-98ee-0fd4f673292f-retina-large.png',
      price: 24.99,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Family Bundle',
      description:
        '(2) Whoppers or Original Chicken Sandwiches, (2) Cheeseburgers, (4) Medium Fries or Medium Onion Rings, (1) 8 Pc. Nuggets or 8 Pc. Fiery Buffalo Nuggets',
      dishCategoryId: 12,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/6a8e5093-caae-4f77-9855-51e535b90df5-retina-large.png',
      price: 24.99,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Royal Four',
      description:
        '(4) Whoppers or Original Chicken Sandwiches, (4) Medium Fries or Medium Onion Rings, (1) 8 Pc. Nuggets or 8 Pc. Fiery Buffalo Nuggets',
      dishCategoryId: 12,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/38bc572e-fbf5-4822-8fe3-c575083b84ae-retina-large.png',
      price: 29.99,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: '12 Pc. Chicken Fries',
      description:
        'Breaded, crispy white meat chicken perfect for dipping in any of our delicious dipping sauces.',
      dishCategoryId: 13,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/37237e6f-a3ae-4245-9bff-938e87f910bc-retina-large.png',
      price: 9.99,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Original Chicken Sandwich',
      description:
        'Lightly breaded chicken topped with crisp lettuce and creamy mayonnaise on a sesame seed bun.',
      dishCategoryId: 13,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/46849e4e-8eca-4012-929a-e3168588c741-retina-large.png',
      price: 9.99,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Fiery Royal Crispy Chicken',
      description:
        'Crispy white meat breast fillet coated with our triple pepper fiery glaze, topped with savory sauce, lettuce and juicy tomatoes on a toasted potato bun.',
      dishCategoryId: 13,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/ac97f2ee-40aa-49f8-bd79-7705966b6928-retina-large.png',
      price: 9.99,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Royal Crispy Chicken',
      description:
        'Crispy white meat breast fillet topped with savory sauce, lettuce and juicy tomatoes on a toasted potato bun.',
      dishCategoryId: 13,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/7e02bd6c-267c-44c9-afd2-80a402f6e77f-retina-large.png',
      price: 9.49,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Diet Coke',
      description:
        'Enjoy a variety of soft drinks that pair perfectly with your meal!',
      dishCategoryId: 14,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/f4f2e675-fd5b-44cd-be56-9f835631e02e-retina-large.png',
      price: 4.49,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Coca-Cola',
      description:
        'Enjoy a variety of soft drinks that pair perfectly with your meal!',
      dishCategoryId: 14,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/2169e701-4595-4c6d-8768-da147428193a-retina-large.png',
      price: 4.49,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Dr Pepper®',
      description:
        'Enjoy a variety of soft drinks that pair perfectly with your meal!',
      dishCategoryId: 14,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/ee1aac44-f0ce-4167-87bc-6491dfd37e0c-retina-large.png',
      price: 4.49,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Fanta Orange',
      description:
        'Enjoy a variety of soft drinks that pair perfectly with your meal!',
      dishCategoryId: 14,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/87bc08ce-9d8c-40a9-8813-ccd0d27e5f04-retina-large.png',
      price: 4.49,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Classic Oreo® Shake',
      description:
        'Creamy, vanilla soft serve mixed with OREO® cookie pieces and vanilla sauce. OREO® is a registered trademark of Mondelēz International group. Used under license.',
      dishCategoryId: 15,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/87a49ca2-b2cb-47b0-8949-7e0506dac814-retina-large.png',
      price: 7.99,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: "HERSHEY'S® Sundae Pie",
      description:
        'A crunchy chocolate crust filled with chocolate crème filling and garnished with real HERSHEY’S® Chocolate Chips.',
      dishCategoryId: 15,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/67924787-6e8e-4d55-8772-f9763bb72e68-retina-large.png',
      price: 3.49,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Chocolate Oreo® Shake',
      description:
        'Creamy, vanilla soft serve mixed with OREO® cookie pieces and chocolate sauce. OREO® is a registered trademark of Mondelēz International group. Used under license.',
      dishCategoryId: 15,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/dc118f14-bedd-4e3a-8ef3-d2d1c8d1730d-retina-large.png',
      price: 7.99,
      stock: 15,
      toppingsIds: [],
    },
    {
      name: 'Vanilla Shake',
      description:
        'A creamy, hand-spun style shake made from velvety, vanilla soft serve!',
      dishCategoryId: 15,
      image:
        'https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=auto,quality=50/media/photosV2/feafa223-43e2-494f-98a7-3fb4bd32369b-retina-large.png',
      price: 7.49,
      stock: 15,
      toppingsIds: [],
    },
    // {
    //   name: 'Wantanes de Langostinos',
    //   description: 'Relleno de langostinos con su cremita de chifa',
    //   dishCategoryId: 1,
    //   image: 'https://images.rappi.pe/products/481897-1595347497891.jpg',
    //   price: 31.0,
    //   stock: 15,
    //   toppingsIds: [
    //     1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    //     21,
    //   ],
    // },
  ],
  addressTags: [
    {
      name: 'Home',
    },
    {
      name: 'Office',
    },
    {
      name: 'Partner',
    },
  ],
  addressDeliveryDetails: [
    {
      name: 'Personal',
    },
    {
      name: 'Lobby',
    },
  ],
  favoriteDishes: [
    { dishId: 1 },
    { dishId: 2 },
    { dishId: 3 },
    { dishId: 4 },
    { dishId: 5 },
    { dishId: 6 },
    { dishId: 7 },
    { dishId: 8 },
    { dishId: 9 },
    { dishId: 10 },
    { dishId: 11 },
    { dishId: 12 },
    { dishId: 13 },
    { dishId: 14 },
    { dishId: 15 },
    { dishId: 16 },
    { dishId: 17 },
    { dishId: 18 },
    { dishId: 19 },
  ],
  favoriteRestaurants: [
    { restaurantId: 1 },
    { restaurantId: 3 },
    { restaurantId: 5 },
    { restaurantId: 7 },
    { restaurantId: 9 },
    { restaurantId: 10 },
    { restaurantId: 11 },
    { restaurantId: 12 },
    { restaurantId: 13 },
  ],
};
