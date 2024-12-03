import { $Enums } from '@prisma/client';

export interface EventFront {
  uuid_event: string;
  name: string;
  locate: string;
  description: string;
  date_and_time: string;
  date_stop_sub: string;
  egalitarian: boolean;
  userLevel: $Enums.UserLevel;
  participants: Participant[];
  // spents: Spent[];
}

export interface Participant {
  uuid_user: string;
  name: string;
  user_level?: 'owner' | 'guest' | 'manager';
  drink?: boolean,
  food?: boolean,
  hard_drink?: boolean,
  pastime?: boolean,
}

export interface Spent {
  uuid_spent: string;
  description: string;
  amount: number;
  value: string;
  type_spent: $Enums.TypeSpent;
}
