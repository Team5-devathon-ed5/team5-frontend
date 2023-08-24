import { Role } from './role.enum';

export interface UserProfile {
  name?: string;
  phoneCode?: string;
  phoneNumber?: string;
  phoneShare?: boolean;
  email: string;
  detail?: string;
  address?: string;
  country?: string;
  role: boolean;
}

export interface User {
  _id?: string;
  name?: string;
  phoneCode?: string;
  phoneNumber?: string;
  phoneShare?: boolean;
  email: string;
  imageUrl?: string;
  userActive?: boolean;
  detail?: string;
  address?: string;
  country?: string;
  role: [
    {
      id?: number;
      nameRole: Role;
      detail?: string;
    },
  ];
}

export const isHirer = (role: Role): boolean => {
  return role === Role.HIRER ? true : false;
};

export const setRole = (role: boolean): Role => {
  return role ? Role.HIRER : Role.LODGER;
};

export const setUserProfileForm = (user: User): UserProfile => {
  return {
    name: user.name,
    phoneCode: user.phoneCode,
    phoneNumber: user.phoneNumber,
    phoneShare: user.phoneShare,
    email: user.email,
    detail: user.detail,
    address: user.address,
    country: user.country,
    role: isHirer(user.role[0].nameRole),
  };
};

export const userSubmit = (user: UserProfile): User => {
  return {
    name: user.name,
    phoneCode: user.phoneCode,
    phoneNumber: user.phoneNumber,
    phoneShare: user.phoneShare,
    email: user.email,
    detail: user.detail,
    address: user.address,
    country: user.country,
    role: [
      {
        nameRole: setRole(user.role),
      },
    ],
  };
};
