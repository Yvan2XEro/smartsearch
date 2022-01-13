export type StoreAction = {
    type: string,
    payload: any
}

export type User = {
    id?: string,
    email: string,
    displayName: string,
    createdAt?: string
}