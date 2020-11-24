import { cartBag } from './shopping-bag';

export interface ShoppingCart {
    quantity: number;
    bags: cartBag[];
}