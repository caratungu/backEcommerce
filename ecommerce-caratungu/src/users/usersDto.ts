interface IUserDto {
  email: string;
  name: string;
  password: string;
  address: string;
  phone: number;
  country?: string | undefined;
  city?: string | undefined;
}

export default IUserDto;
