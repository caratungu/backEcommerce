import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import axios from 'axios';
import { JsonToJS } from './utils/jsonToJS';

@Injectable()
export class AppListenerService implements OnApplicationBootstrap {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async onApplicationBootstrap() {
    // Emitir un evento cuando la aplicación esté completamente inicializada
    this.eventEmitter.emit('app.ready');
  }

  @OnEvent('app.ready')
  async handleAppReadyEvent() {
    try {
      const products = JsonToJS('productsDB.json')
      
      const resCategories = await axios.post('http://localhost:3000/categories/seeder', products);
      console.log(resCategories.data);

      const resProducts = await axios.post('http://localhost:3000/products/seeder', products);
      console.log(resProducts.data);

      const resUsers = await axios.post('http://localhost:3000/users/seeder');
      console.log(resUsers.data);
    } catch (error) {
      console.error('Error al ejecutar la precarga:', error);
    }
  }
}
