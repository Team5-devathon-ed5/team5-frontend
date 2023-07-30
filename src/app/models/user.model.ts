/*
 * Path: src\app\models\user.model.ts
 * Modelo para el registro y login de usuarios
 * Se puede usar para el register y el login
 * @param email: string
 * @param password: string
 * @param name: string
 * @param lastName: string
 * @param country: string
 * @param account_active: boolean
 * @return User
 * @description
 */
export interface User {
  email: string;
  password: string;
  name: string;
  lastName: string;
  country: string;
  account_active: boolean;
}

/*
 * Path: src\app\models\user.model.ts
 * Se puede usar para editar el perfil
 * @param email: string
 * @param password: string
 * @param name: string
 * @param lastName: string
 * @param country: string
 * @param account_active: boolean
 * @param city?: string
 * @param address?: string
 * @param postalCode?: string
 * @param phone?: {
 *   code: string;
 *  number: number;
 * share: boolean;
 * };
 * @param description?: string
 * @param image?: string
 * @return User
 * @description
 */
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
