export interface User {
    id: string;
    email: string;
    role: string;
}

export interface LoginResponse {
    success: boolean;
    status: number;
    message: string;
    data: {
        token: string;
        user: User;
    };
}
