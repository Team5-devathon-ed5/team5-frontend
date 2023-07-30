// Se puede usar para el register y el login
export interface User {
  email: string;
  password: string;
  name: string;
  lastName: string;
  country: string;
  account_active: boolean;
}

// para editar el perfil
export interface UserProfile extends User {
  city?: string;
  address?: string;
  postalCode?: string;
  phone?: {
    code: string;
    number: number;
    share: boolean;
  };
  description?: string;
  image?: string;
}
