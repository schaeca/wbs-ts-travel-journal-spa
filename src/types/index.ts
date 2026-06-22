import type { Dispatch, SetStateAction, RefObject } from 'react';
export type DbEntry = {
	_id: string;
	createdAt: string;
	updatedAt?: string;
	__v: number;
};

export type PostInput = {
	title: string;
	// author: string;
	image: string;
	content: string;
};

export type DbPost = DbEntry & PostInput;

export type SetPost = Dispatch<SetStateAction<DbPost | null>>;

export type ModalRef = RefObject<HTMLDialogElement | null>;

export type User = {
	firstName: string, 
	lastName: string,
    email: string,
    password?: string,
    roles?: string[],
	id?: string
}

export type AuthContextType = {
	signedIn: boolean,
	user: User | null,
	handleSignIn: (object: LoginData) => void,
	handleSignOut: () => void,
	handleRegister: (object: RegisterData) => void
}

export type RegisterData = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export type LoginData = {
    email: string;
    password: string;
}