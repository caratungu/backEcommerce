import { Injectable } from "@nestjs/common";
import { products } from "src/dB/productsDB";

@Injectable()
export class ProductsRepository {
    async getProducts() {
        return products;
    }
}