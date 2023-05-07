import http from ".";

export const signIn = (body: any) => http.post("auth/login", body);

export const signUp = (body: any) => http.post("auth/register", body);
