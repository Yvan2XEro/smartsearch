export type StoreAction = {
  type: string;
  payload: any;
};

export type User = {
  pk?: string;
  email: string;
  displayName: string;
  createdAt?: string;
  photoUrl?: string;
};

export type Chat = {
  id?: string;
  lastMessage?: Message;
  users: any[];
  usersRef: string[];
}

export type Message = {
  id?: string;
  chatRef?: string;
  userRef?: string;
  content: string;
  createdAt: string;
  sent?: boolean;
  received?: boolean;
  readed?: boolean;
};

export type Recommandation = {
  id?: string;
  userDestRef?: string;
  userSenderRef?: string;
  createdAt: string;
  visible?: boolean;
  document: any;
};
