import { Injectable } from '@nestjs/common';
import { User } from './user.interface';

@Injectable()
export class UsersRepository {
  private users: User[] = [
    { id: 1, email: "user1@example.com", name: "John Doe", password: "p@ssw0rd1", address: "123 Main St", phone: "555-1234", country: "USA", city: "New York" },
    { id: 2, email: "user2@example.com", name: "Jane Smith", password: "p@ssw0rd2", address: "456 Oak St", phone: "555-5678", country: "Canada", city: "Toronto" },
    { id: 3, email: "user3@example.com", name: "Alice Johnson", password: "p@ssw0rd3", address: "789 Pine St", phone: "555-9101", country: "UK", city: "London" },
    { id: 4, email: "user4@example.com", name: "Bob Brown", password: "p@ssw0rd4", address: "321 Maple St", phone: "555-1122", country: "Australia", city: "Sydney" },
    { id: 5, email: "user5@example.com", name: "Charlie Davis", password: "p@ssw0rd5", address: "654 Elm St", phone: "555-3344", country: "Germany", city: "Berlin" },
    { id: 6, email: "user6@example.com", name: "Daniel Wilson", password: "p@ssw0rd6", address: "987 Birch St", phone: "555-5566", country: "France", city: "Paris" },
    { id: 7, email: "user7@example.com", name: "Emma Moore", password: "p@ssw0rd7", address: "123 Cedar St", phone: "555-7788", country: "Italy", city: "Rome" },
    { id: 8, email: "user8@example.com", name: "Fiona Clark", password: "p@ssw0rd8", address: "456 Spruce St", phone: "555-9900", country: "Spain", city: "Madrid" },
    { id: 9, email: "user9@example.com", name: "George Lewis", password: "p@ssw0rd9", address: "789 Walnut St", phone: "555-1212", country: "Japan", city: "Tokyo" },
    { id: 10, email: "user10@example.com", name: "Hannah Walker", password: "p@ssw0rd10", address: "321 Chestnut St", phone: "555-3434", country: "South Korea", city: "Seoul" },
    { id: 11, email: "user11@example.com", name: "Ian Martinez", password: "p@ssw0rd11", address: "654 Redwood St", phone: "555-5656", country: "Mexico", city: "Mexico City" },
    { id: 12, email: "user12@example.com", name: "Judy Lee", password: "p@ssw0rd12", address: "987 Cypress St", phone: "555-7878", country: "Brazil", city: "São Paulo" },
    { id: 13, email: "user13@example.com", name: "Kevin Harris", password: "p@ssw0rd13", address: "123 Willow St", phone: "555-9090", country: "Argentina", city: "Buenos Aires" },
    { id: 14, email: "user14@example.com", name: "Laura Scott", password: "p@ssw0rd14", address: "456 Alder St", phone: "555-1313", country: "Chile", city: "Santiago" },
    { id: 15, email: "user15@example.com", name: "Mike Young", password: "p@ssw0rd15", address: "789 Fir St", phone: "555-3535", country: "India", city: "Mumbai" },
    { id: 16, email: "user16@example.com", name: "Nina King", password: "p@ssw0rd16", address: "321 Beech St", phone: "555-5757", country: "Russia", city: "Moscow" },
    { id: 17, email: "user17@example.com", name: "Oscar Allen", password: "p@ssw0rd17", address: "654 Poplar St", phone: "555-7979", country: "China", city: "Beijing" },
    { id: 18, email: "user18@example.com", name: "Paula Wright", password: "p@ssw0rd18", address: "987 Hickory St", phone: "555-1314", country: "South Africa", city: "Cape Town" },
    { id: 19, email: "user19@example.com", name: "Quincy Adams", password: "p@ssw0rd19", address: "123 Hemlock St", phone: "555-3536", country: "Egypt", city: "Cairo" },
    { id: 20, email: "user20@example.com", name: "Rachel Hill", password: "p@ssw0rd20", address: "456 Sequoia St", phone: "555-5758", country: "Turkey", city: "Istanbul" },
    { id: 21, email: "user21@example.com", name: "Steve Green", password: "p@ssw0rd21", address: "789 Magnolia St", phone: "555-7971", country: "Saudi Arabia", city: "Riyadh" },
    { id: 22, email: "user22@example.com", name: "Tina Hall", password: "p@ssw0rd22", address: "321 Palm St", phone: "555-1315", country: "Thailand", city: "Bangkok" },
    { id: 23, email: "user23@example.com", name: "Uma Scott", password: "p@ssw0rd23", address: "654 Bamboo St", phone: "555-3537", country: "Vietnam", city: "Hanoi" },
    { id: 24, email: "user24@example.com", name: "Victor Young", password: "p@ssw0rd24", address: "987 Dogwood St", phone: "555-5759", country: "Malaysia", city: "Kuala Lumpur" },
    { id: 25, email: "user25@example.com", name: "Wendy Moore", password: "p@ssw0rd25", address: "123 Olive St", phone: "555-7972", country: "Indonesia", city: "Jakarta" },
    { id: 26, email: "user26@example.com", name: "Xavier Lopez", password: "p@ssw0rd26", address: "456 Peach St", phone: "555-1316", country: "Singapore", city: "Singapore" },
    { id: 27, email: "user27@example.com", name: "Yara Lewis", password: "p@ssw0rd27", address: "789 Cherry St", phone: "555-3538", country: "New Zealand", city: "Auckland" },
    { id: 28, email: "user28@example.com", name: "Zane Walker", password: "p@ssw0rd28", address: "321 Pear St", phone: "555-5760", country: "Portugal", city: "Lisbon" },
    { id: 29, email: "user29@example.com", name: "Amy Brooks", password: "p@ssw0rd29", address: "654 Apple St", phone: "555-7973", country: "Netherlands", city: "Amsterdam" },
    { id: 30, email: "user30@example.com", name: "Brian Rogers", password: "p@ssw0rd30", address: "987 Plum St", phone: "555-1317", country: "Belgium", city: "Brussels" },
    { id: 31, email: "user31@example.com", name: "Cathy Bailey", password: "p@ssw0rd31", address: "123 Apricot St", phone: "555-3539", country: "Switzerland", city: "Zurich" },
    { id: 32, email: "user32@example.com", name: "David Edwards", password: "p@ssw0rd32", address: "456 Fig St", phone: "555-5761", country: "Sweden", city: "Stockholm" },
    { id: 33, email: "user33@example.com", name: "Ella Collins", password: "p@ssw0rd33", address: "789 Pomegranate St", phone: "555-7974", country: "Norway", city: "Oslo" },
    { id: 34, email: "user34@example.com", name: "Franklin Torres", password: "p@ssw0rd34", address: "321 Lime St", phone: "555-1318", country: "Denmark", city: "Copenhagen" },
    { id: 35, email: "user35@example.com", name: "Grace Perry", password: "p@ssw0rd35", address: "654 Kiwi St", phone: "555-3540", country: "Finland", city: "Helsinki" },
    { id: 36, email: "user36@example.com", name: "Henry Hughes", password: "p@ssw0rd36", address: "987 Grapefruit St", phone: "555-5762", country: "Ireland", city: "Dublin" },
    { id: 37, email: "user37@example.com", name: "Isla Campbell", password: "p@ssw0rd37", address: "123 Mango St", phone: "555-7975", country: "Greece", city: "Athens" },
    { id: 38, email: "user38@example.com", name: "Jack Long", password: "p@ssw0rd38", address: "456 Papaya St", phone: "555-1319", country: "Austria", city: "Vienna" },
    { id: 39, email: "user39@example.com", name: "Katie Morgan", password: "p@ssw0rd39", address: "789 Lemon St", phone: "555-3541", country: "Poland", city: "Warsaw" },
    { id: 40, email: "user40@example.com", name: "Luke Peterson", password: "p@ssw0rd40", address: "321 Guava St", phone: "555-5763", country: "Czech Republic", city: "Prague" },
    { id: 41, email: "user41@example.com", name: "Mia Reed", password: "p@ssw0rd41", address: "654 Pear St", phone: "555-7976", country: "Hungary", city: "Budapest" },
    { id: 42, email: "user42@example.com", name: "Noah Cooper", password: "p@ssw0rd42", address: "987 Tangerine St", phone: "555-1320", country: "Romania", city: "Bucharest" },
    { id: 43, email: "user43@example.com", name: "Olivia Turner", password: "p@ssw0rd43", address: "123 Peach St", phone: "555-3542", country: "Bulgaria", city: "Sofia" },
    { id: 44, email: "user44@example.com", name: "Patrick Wood", password: "p@ssw0rd44", address: "456 Persimmon St", phone: "555-5764", country: "Ukraine", city: "Kyiv" },
    { id: 45, email: "user45@example.com", name: "Quinn Wright", password: "p@ssw0rd45", address: "789 Nectarine St", phone: "555-7977", country: "Serbia", city: "Belgrade" },
    { id: 46, email: "user46@example.com", name: "Ruby Jenkins", password: "p@ssw0rd46", address: "321 Orange St", phone: "555-1321", country: "Croatia", city: "Zagreb" },
    { id: 47, email: "user47@example.com", name: "Samuel Hunt", password: "p@ssw0rd47", address: "654 Lychee St", phone: "555-3543", country: "Slovakia", city: "Bratislava" },
    { id: 48, email: "user48@example.com", name: "Tara Bailey", password: "p@ssw0rd48", address: "987 Melon St", phone: "555-5765", country: "Slovenia", city: "Ljubljana" },
    { id: 49, email: "user49@example.com", name: "Ulysses Cook", password: "p@ssw0rd49", address: "123 Berry St", phone: "555-7978", country: "Estonia", city: "Tallinn" },
    { id: 50, email: "user50@example.com", name: "Vera Parker", password: "p@ssw0rd50", address: "456 Date St", phone: "555-1322", country: "Lithuania", city: "Vilnius" },
  ];

  async getUsers(page: number, limit: number) {
    const usersWithOutPassword = this.users.map((user) => {
      const { password, ...userWithOutPassword } = user;
      return userWithOutPassword;
    });
    // let numPage = 0;
    // const res = [];
    // for (let i = 0; i < usersWithOutPassword.length; i++) {
    //   if (i % limit === 0) {
    //     numPage++;
    //     res.push(`Page ${numPage}`);
    //   }
    //   res.push(usersWithOutPassword[i]);
    // }
    const start = (page - 1) * limit;
    const end = start + limit;
    if (start >= usersWithOutPassword.length) {
      return 'No se encontraron usuarios'
    }
    return usersWithOutPassword.slice(start, end);
  }

  async getUserById(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      const { password, ...userWithOutPassword } = user;
      return userWithOutPassword;
    } else {
      return 'No existe usuario con ese id';
    }
  }

  async createUser(user: Omit<User, 'id'>) {
    const id: number = this.users.length + 1;
    this.users = [...this.users, { id, ...user }];
    return { message: 'Usuario creado', id };
  }

  async updateUser(id: number, uUser: Omit<User, 'id'>) {
    this.users.find((user) => {
      if (user.id === id) {
        user.email = uUser.email;
        user.name = uUser.name;
        user.password = uUser.password;
        user.address = uUser.address;
        user.phone = uUser.phone;
        user.country = uUser.country;
        user.city = uUser.city;
      }
    });
    return { message: 'Usuario actualizado', id };
  }

  async deleteUser(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
    return `Usuario con id: ${id} eliminado`;
  }

  loginUser(userInfo) {
    const userLogin = this.users.find((user) => user.email === userInfo.email);
    if (userLogin) {
      if (userLogin.password === userInfo.password) {
        return `Login exitoso para el usuario ${userLogin.name}`;
      }
    }
    return 'Email o password incorrectos';
  }
}
