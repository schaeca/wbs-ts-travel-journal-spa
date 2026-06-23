import type { Dispatch, SetStateAction, RefObject } from 'react';
export type DbEntry = {
	_id: string;
	createdAt: string;
	updatedAt?: string;
	__v: number;
};

export type PostInput = {
	title: string;
	author: {
		_id: string,
		firstName: string,
		lastName: string,
		email: string
	};
	image: string;
	content: string;
};

export type DbPost = DbEntry & PostInput;

export type SetPost = Dispatch<SetStateAction<DbPost | null>>;

export type ModalRef = RefObject<HTMLDialogElement | null>;

export type User = DbEntry & {
	firstName: string, 
	lastName: string,
    email: string,
    roles?: string[],
}

export type AuthContextType = {
	signedIn: boolean,
	user: User | null,
	handleSignIn: ({email, password}: LoginData) => Promise<void>,
	handleSignOut: () => Promise<void>,
	handleRegister: (formState: RegisterData) => Promise<void>
}

export type RegisterData = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
	confirmPassword: string
}

export type LoginData = {
    email: string;
    password: string;
}