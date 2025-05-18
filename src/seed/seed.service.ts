import { Injectable } from '@nestjs/common';
import { initialData } from './data/seed-data';
import { RestaurantsService } from 'src/restaurants/services/restaurants.service';
import { RestaurantCategoriesService } from 'src/restaurants/services/restaurant-categories.service';
import { DataSource } from 'typeorm';
import { DishCategoriesService } from 'src/dish-categories/dish-categories.service';
import { DishesService } from 'src/dishes/dishes.service';
import { ToppingCategoriesService } from 'src/topping-categories/topping-categories.service';
import { ToppingsService } from 'src/toppings/toppings.service';
import { AddressTagsService } from 'src/address-tags/address-tags.service';
import { AddressDeliveryDetailsService } from 'src/address-delivery-details/address-delivery-details.service';
import { OrderStatusesService } from 'src/orders/order-status.service';
import { AuthService } from 'src/auth/auth.service';
import { AddressesService } from 'src/addresses/services/addresses.service';
import { User } from 'src/auth/entities/user.entity';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly restaurantsService: RestaurantsService,
    private readonly categoriesService: RestaurantCategoriesService,
    private readonly dishCategoriesService: DishCategoriesService,
    private readonly dishesService: DishesService,
    private readonly dataSource: DataSource,
    private readonly toppingCategoriesService: ToppingCategoriesService,
    private readonly toppingsService: ToppingsService,
    private readonly addressTagsService: AddressTagsService,
    private readonly addressDeliveryDetailsService: AddressDeliveryDetailsService,
    private readonly orderStatusesService: OrderStatusesService,
    private readonly authService: AuthService,
    private readonly addressesService: AddressesService,
    private readonly favoritesService: FavoritesService,
  ) {}

  async runSeed() {
    // await this.dropAllTables();
    await this.restaurantCategorySeed();
    await this.restaurantSeed();
    await this.toppingCategorySeed();
    await this.toppingSeed();
    await this.dishCategorySeed();
    await this.dishSeed();
    await this.AddressTagSeed();
    await this.addressDeliveryDetailSeed();
    await this.orderStatusSeed();
    await this.userSeed();
    await this.addressSeed();
    await this.favoriteDishSeed();
    await this.favoriteRestaurantSeed();
  }

  private async restaurantCategorySeed() {
    const restaurantCategories = initialData.restaurantCategories;

    for (const category of restaurantCategories) {
      await this.categoriesService.create(category);
    }
  }

  private async restaurantSeed() {
    const restaurants = initialData.restaurants;
    for (const restaurant of restaurants) {
      await this.restaurantsService.create(restaurant);
    }
  }

  private async dishCategorySeed() {
    const dishCategories = initialData.dishCategories;
    for (const dishCategory of dishCategories) {
      await this.dishCategoriesService.create(dishCategory);
    }
  }

  private async dishSeed() {
    const dishes = initialData.dishes;
    for (const dish of dishes) {
      await this.dishesService.create(dish);
    }
  }

  private async toppingCategorySeed() {
    const toppingCategories = initialData.toppingCategories;
    for (const toppingCategory of toppingCategories) {
      await this.toppingCategoriesService.create(toppingCategory);
    }
  }

  private async toppingSeed() {
    const toppings = initialData.toppings;
    for (const topping of toppings) {
      await this.toppingsService.create(topping);
    }
  }

  private async AddressTagSeed() {
    const addressTags = initialData.addressTags;
    for (const addressTag of addressTags) {
      await this.addressTagsService.create(addressTag);
    }
  }

  private async addressDeliveryDetailSeed() {
    const addressDeliveryDetails = initialData.addressDeliveryDetails;
    for (const addressDeliveryDetail of addressDeliveryDetails) {
      await this.addressDeliveryDetailsService.create(addressDeliveryDetail);
    }
  }

  private async orderStatusSeed() {
    const orderStatuses = initialData.orderStatuses;
    for (const orderStatus of orderStatuses) {
      await this.orderStatusesService.create(orderStatus);
    }
  }

  private async userSeed() {
    const users = initialData.users;
    for (const user of users) {
      await this.authService.register(user);
    }
  }

  private async addressSeed() {
    const addresses = initialData.addresses;
    const user: User | null = await this.authService.findOne(1);
    if (!user) return;
    for (const address of addresses) {
      await this.addressesService.create(address, user);
    }
  }

  private async favoriteDishSeed() {
    const favoriteDishes = initialData.favoriteDishes;
    const user: User | null = await this.authService.findOne(1);
    if (!user) return;
    for (const favoriteDish of favoriteDishes) {
      await this.favoritesService.favoriteDish(favoriteDish, user);
    }
  }

  private async favoriteRestaurantSeed() {
    const favoriteRestaurants = initialData.favoriteRestaurants;
    const user: User | null = await this.authService.findOne(1);
    if (!user) return;
    for (const favoriteRestaurant of favoriteRestaurants) {
      await this.favoritesService.favoriteRestaurant(favoriteRestaurant, user);
    }
  }

  async dropAllTables(): Promise<void> {
    await this.dataSource.dropDatabase();
    await this.dataSource.synchronize();
  }
}
