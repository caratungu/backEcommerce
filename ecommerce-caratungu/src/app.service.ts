import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import axios from 'axios';
import { products } from './dB/productsDB';

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
      await axios.post('http://localhost:3000/categories/seeder', products);
      console.log('Categories seeder request sent successfully.');

      await axios.post('http://localhost:3000/products/seeder', products);
      console.log('Products seeder request sent successfully.');

      await axios.post('http://localhost:3000/users/seeder');
      console.log('Users seeder request sent successfully.');
    } catch (error) {
      console.error('Error sending seeder requests:', error);
    }
  }
}
