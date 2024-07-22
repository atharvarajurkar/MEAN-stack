export interface User {
    id: string,
    email: string,
    password?: string,
    username: string,
    jwtToken: string,
    role: string
    token?: string
}
