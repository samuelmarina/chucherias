import { Producto } from './producto';

export interface IndividualBag {
    date: string;
    products: Producto[];
    quantity: number;
}

export interface Prices {
    bags: IndividualBag[];
}

export interface ShoppingBag {
    items: Prices[];
    quantity: number;
}