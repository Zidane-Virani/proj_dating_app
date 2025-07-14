'use server';

import { prisma } from "@/lib/prisma";
import {RegisterSchema, registerSchema} from "@/lib/schemas/registerSchemas";
import bcrypt from "bcryptjs";
import {z} from "zod";
import { ActionResult } from "@/types";
import { User } from "@/generated/prisma";
import { LoginSchema } from "@/lib/schemas/loginSchema";
import { signIn, signOut } from "../../../auth"
import { AuthError } from "next-auth";

export async function signInUser(data: LoginSchema) {
    try {
        const result = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false
        });
        console.log(result)
        return {status: "success", data: result}
    } catch (error) {
        console.log(error)
        if (error instanceof AuthError) {
            switch (error.type ) {
                case "CredentialsSignin":
                    return {status: "error", error: "Invalid credentials"}
                default:
                    return {status: "error", error: "Something went wrong"}
            }
        }else{
            return {status: "error", error: "Something else went wrong"}
        }
    }
}


export async function signOutUser(){
    await signOut({redirectTo: "/login"});
}


export async function registerUser(data: RegisterSchema): Promise<ActionResult<User>> {
    try{
        const validated = registerSchema.safeParse(data);
        if (!validated.success) {
            return {status: "error", error: validated.error.issues}
        }

        const {name, email, password} = validated.data;

        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await prisma.user.findUnique({
            where: {email}
        });

        if (existingUser) {
            return {status: "error", error: "User already exists"}
        }

        const user = await prisma.user.create({
            data: {
                name, 
                email,
                passwordHash: hashedPassword
            }
        })

        return {status: "success", data: user}
    } catch (error) {
        console.log(error)
        return {
            status: "error",
            error: "Something Went Really Wrong Really"
        }
    }
    

    
}

export async function getUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: {email}
    })
}

export async function getUserByid(id: string) {
    return prisma.user.findUnique({
        where: {id}
    })
}