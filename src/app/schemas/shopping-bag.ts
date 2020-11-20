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

export interface uiShoppingBag {
    price: string;
    quantity: number;
    bags: uiIndividualBag[];
}

export interface uiIndividualBag {
    product: Producto[];
}