import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

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
      const filePath = path.join(__dirname,'..','src','dB','productsDB.json');
      const rawData = fs.readFileSync(filePath);
      const products = JSON.parse(rawData.toString())
      
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
