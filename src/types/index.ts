export type Message = {
    sender: string,
    text: string
}

export type User = {
    username: string,
    id: string,
    room: string
}

export type Room = {
    name: string,
    messages: Message[]
}