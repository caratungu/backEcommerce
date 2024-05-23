import { Injectable } from '@nestjs/common';
import { Product } from './product.interface';

@Injectable()
export class ProductsRepository {
  private products: Product[] = [
    { id: 1, name: "Laptop", description: "14 inch, 8GB RAM, 256GB SSD", price: 799.99, stock: true, imgUrl: "https://example.com/images/laptop.jpg" },
    { id: 2, name: "Smartphone", description: "5.5 inch, 64GB storage, 12MP camera", price: 499.99, stock: true, imgUrl: "https://example.com/images/smartphone.jpg" },
    { id: 3, name: "Headphones", description: "Noise cancelling, over-ear", price: 199.99, stock: false, imgUrl: "https://example.com/images/headphones.jpg" },
    { id: 4, name: "Smartwatch", description: "Heart rate monitor, GPS", price: 149.99, stock: true, imgUrl: "https://example.com/images/smartwatch.jpg" },
    { id: 5, name: "Tablet", description: "10 inch, 128GB storage", price: 299.99, stock: true, imgUrl: "https://example.com/images/tablet.jpg" },
    { id: 6, name: "Camera", description: "24MP DSLR, 18-55mm lens", price: 599.99, stock: true, imgUrl: "https://example.com/images/camera.jpg" },
    { id: 7, name: "Gaming Console", description: "1TB storage, 4K resolution", price: 399.99, stock: false, imgUrl: "https://example.com/images/console.jpg" },
    { id: 8, name: "Bluetooth Speaker", description: "Portable, 10 hours battery", price: 49.99, stock: true, imgUrl: "https://example.com/images/speaker.jpg" },
    { id: 9, name: "Monitor", description: "27 inch, 144Hz refresh rate", price: 299.99, stock: true, imgUrl: "https://example.com/images/monitor.jpg" },
    { id: 10, name: "Keyboard", description: "Mechanical, RGB lighting", price: 79.99, stock: true, imgUrl: "https://example.com/images/keyboard.jpg" },
    { id: 11, name: "Mouse", description: "Wireless, ergonomic design", price: 39.99, stock: true, imgUrl: "https://example.com/images/mouse.jpg" },
    { id: 12, name: "Printer", description: "Wireless, all-in-one", price: 129.99, stock: false, imgUrl: "https://example.com/images/printer.jpg" },
    { id: 13, name: "Router", description: "Dual-band, 1200Mbps", price: 89.99, stock: true, imgUrl: "https://example.com/images/router.jpg" },
    { id: 14, name: "External Hard Drive", description: "1TB, USB 3.0", price: 69.99, stock: true, imgUrl: "https://example.com/images/harddrive.jpg" },
    { id: 15, name: "Webcam", description: "1080p, built-in microphone", price: 49.99, stock: false, imgUrl: "https://example.com/images/webcam.jpg" },
    { id: 16, name: "Desk Lamp", description: "LED, adjustable arm", price: 29.99, stock: true, imgUrl: "https://example.com/images/desklamp.jpg" },
    { id: 17, name: "Chair", description: "Ergonomic, mesh back", price: 199.99, stock: true, imgUrl: "https://example.com/images/chair.jpg" },
    { id: 18, name: "Backpack", description: "Laptop compartment, water-resistant", price: 59.99, stock: true, imgUrl: "https://example.com/images/backpack.jpg" },
    { id: 19, name: "Smart Light Bulb", description: "WiFi, color changing", price: 24.99, stock: true, imgUrl: "https://example.com/images/lightbulb.jpg" },
    { id: 20, name: "Electric Kettle", description: "1.7L, stainless steel", price: 39.99, stock: true, imgUrl: "https://example.com/images/kettle.jpg" },
    { id: 21, name: "Coffee Maker", description: "12 cup, programmable", price: 79.99, stock: true, imgUrl: "https://example.com/images/coffeemaker.jpg" },
    { id: 22, name: "Toaster", description: "4 slice, stainless steel", price: 49.99, stock: false, imgUrl: "https://example.com/images/toaster.jpg" },
    { id: 23, name: "Blender", description: "700W, 5 speeds", price: 59.99, stock: true, imgUrl: "https://example.com/images/blender.jpg" },
    { id: 24, name: "Microwave", description: "1000W, 1.1 cu ft", price: 119.99, stock: true, imgUrl: "https://example.com/images/microwave.jpg" },
    { id: 25, name: "Refrigerator", description: "18 cu ft, stainless steel", price: 699.99, stock: true, imgUrl: "https://example.com/images/fridge.jpg" },
    { id: 26, name: "Washing Machine", description: "Top load, 5.0 cu ft", price: 499.99, stock: false, imgUrl: "https://example.com/images/washingmachine.jpg" },
    { id: 27, name: "Dryer", description: "Front load, 7.0 cu ft", price: 499.99, stock: true, imgUrl: "https://example.com/images/dryer.jpg" },
    { id: 28, name: "Dishwasher", description: "Built-in, stainless steel", price: 399.99, stock: true, imgUrl: "https://example.com/images/dishwasher.jpg" },
    { id: 29, name: "Air Conditioner", description: "Window unit, 8000 BTU", price: 249.99, stock: true, imgUrl: "https://example.com/images/ac.jpg" },
    { id: 30, name: "Vacuum Cleaner", description: "Bagless, upright", price: 149.99, stock: true, imgUrl: "https://example.com/images/vacuum.jpg" },
    { id: 31, name: "Ceiling Fan", description: "52 inch, remote control", price: 99.99, stock: false, imgUrl: "https://example.com/images/ceilingfan.jpg" },
    { id: 32, name: "Heater", description: "1500W, portable", price: 59.99, stock: true, imgUrl: "https://example.com/images/heater.jpg" },
    { id: 33, name: "Dehumidifier", description: "50 pint, energy star", price: 229.99, stock: true, imgUrl: "https://example.com/images/dehumidifier.jpg" },
    { id: 34, name: "Water Purifier", description: "5 stage, under sink", price: 199.99, stock: true, imgUrl: "https://example.com/images/purifier.jpg" },
    { id: 35, name: "Iron", description: "Steam, anti-drip", price: 39.99, stock: true, imgUrl: "https://example.com/images/iron.jpg" },
    { id: 36, name: "Sewing Machine", description: "Portable, 12 built-in stitches", price: 89.99, stock: true, imgUrl: "https://example.com/images/sewingmachine.jpg" },
    { id: 37, name: "Electric Shaver", description: "Wet & dry, rechargeable", price: 49.99, stock: false, imgUrl: "https://example.com/images/shaver.jpg" },
    { id: 38, name: "Hair Dryer", description: "1875W, ionic technology", price: 29.99, stock: true, imgUrl: "https://example.com/images/hairdryer.jpg" },
    { id: 39, name: "Electric Toothbrush", description: "Rechargeable, 5 modes", price: 59.99, stock: true, imgUrl: "https://example.com/images/toothbrush.jpg" },
    { id: 40, name: "Fitness Tracker", description: "Heart rate monitor, sleep tracking", price: 99.99, stock: true, imgUrl: "https://example.com/images/fitnesstracker.jpg" },
    { id: 41, name: "Yoga Mat", description: "Non-slip, 1/4 inch thick", price: 29.99, stock: true, imgUrl: "https://example.com/images/yogamat.jpg" },
    { id: 42, name: "Treadmill", description: "Folding, 2.5HP motor", price: 499.99, stock: false, imgUrl: "https://example.com/images/treadmill.jpg" },
    { id: 43, name: "Dumbbells", description: "Adjustable, 5-50 lbs", price: 199.99, stock: true, imgUrl: "https://example.com/images/dumbbells.jpg" },
    { id: 44, name: "Bicycle", description: "21-speed, aluminum frame", price: 299.99, stock: true, imgUrl: "https://example.com/images/bicycle.jpg" },
    { id: 45, name: "Tent", description: "4 person, waterproof", price: 149.99, stock: true, imgUrl: "https://example.com/images/tent.jpg" },
    { id: 46, name: "Sleeping Bag", description: "0 degree, mummy style", price: 79.99, stock: true, imgUrl: "https://example.com/images/sleepingbag.jpg" },
    { id: 47, name: "Backpacking Stove", description: "Compact, lightweight", price: 39.99, stock: true, imgUrl: "https://example.com/images/stove.jpg" },
    { id: 48, name: "Camping Chair", description: "Folding, with cup holder", price: 24.99, stock: true, imgUrl: "https://example.com/images/campingchair.jpg" },
    { id: 49, name: "Kayak", description: "Single person, inflatable", price: 399.99, stock: true, imgUrl: "https://example.com/images/kayak.jpg" },
    { id: 50, name: "Fishing Rod", description: "Telescopic, carbon fiber", price: 59.99, stock: true, imgUrl: "https://example.com/images/fishingrod.jpg" },
  ];  

  async getProducts(page: number, limit: number) {
    const start = (page - 1) * limit;
    const end = start + limit;
    if (start >= this.products.length) {
      return 'No se encontraron productos'
    }
    return this.products.slice(start, end);
  }

  async getProductById(id: number) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      return 'No existe producto con ese id';
    }
  }

  async createProduct(product: Omit<Product, 'id'>) {
    const id = this.products.length + 1;
    this.products = [...this.products, { id, ...product }];
    return { message: 'Producto creado', id };
  }

  async updateProduct(id: number, uProduct: Omit<Product, 'id'>) {
    this.products.find((product) => {
      if (product.id === id) {
        product.name = uProduct.name;
        product.description = uProduct.description;
        product.price = uProduct.price;
        product.stock = uProduct.stock;
        product.imgUrl = uProduct.imgUrl;
      }
    });
    return { message: 'Producto actualizado', id };
  }

  async deleteProduct(id: number) {
    this.products = this.products.filter((product) => product.id !== id);
    return `Producto con id: ${id} eliminado`;
  }
}
