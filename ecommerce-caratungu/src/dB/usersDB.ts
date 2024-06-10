import { CreateUserDto } from '../users/dtos/CreateUser.dto';

export const users: CreateUserDto[] = [
  { email: "alice.brown@example.com", name: "Alice Brown", password: "Pass*123", confirmPass: "Pass*123", address: "123 Elm St", phone: 555111222, country: "USA", city: "New York" },
  { email: "bob.johnson@example.com", name: "Bob Johnson", password: "Pass*123", confirmPass: "Pass*123", address: "456 Oak St", phone: 555333444, country: "Canada", city: "Toronto" },
  { email: "carol.smith@example.com", name: "Carol Smith", password: "Pass*123", confirmPass: "Pass*123", address: "789 Pine St", phone: 555555666, country: "UK", city: "London" },
  { email: "dave.wilson@example.com", name: "Dave Wilson", password: "Pass*123", confirmPass: "Pass*123", address: "101 Maple St", phone: 555777888, country: "Australia", city: "Sydney" },
  { email: "eve.taylor@example.com", name: "Eve Taylor", password: "Pass*123", confirmPass: "Pass*123", address: "202 Birch St", phone: 555999000, country: "Germany", city: "Berlin" },
  { email: "frank.moore@example.com", name: "Frank Moore", password: "Pass*123", confirmPass: "Pass*123", address: "303 Cedar St", phone: 555111333, country: "France", city: "Paris" },
  { email: "grace.jackson@example.com", name: "Grace Jackson", password: "Pass*123", confirmPass: "Pass*123", address: "404 Walnut St", phone: 555444555, country: "Italy", city: "Rome" },
  { email: "hank.martin@example.com", name: "Hank Martin", password: "Pass*123", confirmPass: "Pass*123", address: "505 Ash St", phone: 555666777, country: "Spain", city: "Madrid" },
  { email: "ivy.lewis@example.com", name: "Ivy Lewis", password: "Pass*123", confirmPass: "Pass*123", address: "606 Beech St", phone: 555888999, country: "Japan", city: "Tokyo" },
  { email: "jack.lee@example.com", name: "Jack Lee", password: "Pass*123", confirmPass: "Pass*123", address: "707 Chestnut St", phone: 555000111, country: "South Korea", city: "Seoul" }
];
