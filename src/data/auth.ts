import { VITE_APP_AUTH_SERVER_URL } from "@/config";
import type { RegisterData, LoginData, User } from "@/types";

type AuthResponse = {
  message: string;
  accessToken: string;
};

type VerifyResponse = {
  message: string,
  user: User
}

type SuccessResponse = {
    message: string
}

//fetch requests for
//POST /register
const register = async (formData: RegisterData): Promise<AuthResponse> => {
  const res = await fetch(`${VITE_APP_AUTH_SERVER_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData?.error ?? "An error occurred with registration.");
  }

  const data = (await res.json()) as AuthResponse;
  // console.log(data);

  return data;
};

//POST /login
const login = async (formData: LoginData): Promise<AuthResponse> => {
  const res = await fetch(`${VITE_APP_AUTH_SERVER_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData?.error ?? "An error occurred during login.");
  }

  const data = (await res.json()) as AuthResponse;
  // console.log(data);

  return data;
};

//GET /me
const me = async (): Promise<VerifyResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  const res = await fetch(`${VITE_APP_AUTH_SERVER_URL}/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData?.error ?? "An error occurred loading the profile.");
  }

  const data = (await res.json()) as VerifyResponse;
  // console.log(data);

  return data;
};

//DELETE /logout
const logout = async () => {
    const res = await fetch(`${VITE_APP_AUTH_SERVER_URL}/logout`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!res.ok){
    const errorData = await res.json()
    throw new Error(errorData?.error ?? "An error occurred during logout.")
  }

  const data = (await res.json()) as SuccessResponse;

  return data
}

const refresh = async (): Promise<AuthResponse> => {
    const res = await fetch(`${VITE_APP_AUTH_SERVER_URL}/refresh`, {
        method: "POST",
        credentials: "include",
    })
    if (!res.ok){
        const errorData = await res.json()
        throw new Error(errorData?.error ?? "Unable to refresh the session.")
    }

    const data = (await res.json()) as AuthResponse

    return data
}


//Remember to add credentials: include to any request sending OR receiving secure cookies (in our case, the refreshToken cookie), and to include the Authorization: Bearer <access_token> header on any request that requires authentication.
//include fetch interceptor

export { register, login, me, logout, refresh };
