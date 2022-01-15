export type StoreAction = {
    type: string,
    payload: any
}

export type User = {
    pk?: string,
    email: string,
    displayName: string,
    createdAt?: string
    photoURL?: string
}

export type Message = {
    id?: string,
    chatRef?: string,
    userRef?: string,
    content: string,
    createdAt: string,
    sent?: boolean,
    received?: boolean,
    readed?: boolean,
}
