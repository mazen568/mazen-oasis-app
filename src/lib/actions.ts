'use server'


import {signIn, signOut} from "@/lib/auth"
export async function signInAction(){
    await signIn('google',{redirectTo:"/account"});
}

export async function signOutAction(){
    await signOut({redirectTo:"/login"});
}