"use client";

import React from "react"
import { Card, CardHeader, CardBody } from "@heroui/card"
import { GiPadlock } from "react-icons/gi"
import { Input } from "@heroui/input"
import { Button } from "@heroui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, RegisterSchema } from "../../../lib/schemas/registerSchemas"
import { registerUser } from "@/app/actions/authActions"


export default function registerForm(){

    const {register, handleSubmit, setError, formState: {errors, isValid, isSubmitting}} = useForm<RegisterSchema>({
        //resolver: zodResolver(registerSchema),
        mode: "onTouched"
    });

    const onSubmit = async (data: RegisterSchema) => {
        const result = await registerUser(data)
        
        if (result.status === "success"){
            console.log("User Created Successfully")
        } else {
            if (Array.isArray(result.error)){
                result.error.forEach((e) => {
                    const field = e.path.join(".") as "email" | "name" | "password"; 
                    setError(field, {message: e.message})
                })
            }else {
                setError("root.serverError", {message: result.error})
            }
        }
    }
    
    return (
        <Card className="w-2/5 mx-auto" >
            <CardHeader className="flex flex-col items-center justify-center">
                <div className="flex flex-col gap-2 items-center text-secondary">
                    <div className="flex flex-row items-center gap-3">
                    <GiPadlock size={30}></GiPadlock>
                    <h1 className="text-3xl font-semibold">Register</h1>
                    </div>
                    <p className="text-neutral-500">Welcome To The Ultimate Dating App</p>
                </div>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <Input 
                            label="Name" 
                            variant="bordered" 
                            placeholder="" 
                            {...register("name", {required: "Name is required and must be at least 3 characters long"})} 
                            isInvalid={!!errors.name}
                            errorMessage={errors.name?.message}
                            defaultValue=""/>
                        <Input 
                            label="Email" 
                            variant="bordered" 
                            placeholder="" 
                            {...register("email")} 
                            isInvalid={!!errors.email}
                            errorMessage={errors.email?.message}
                            defaultValue=""/>
                        <Input 
                            label="Password" 
                            variant="bordered" 
                            placeholder="" 
                            type="password" 
                            {...register("password")} 
                            isInvalid={!!errors.password}
                            errorMessage={errors.password?.message}
                            defaultValue="" />
                        {errors.root?.serverError && (
                            <p className="text-danger text-sm">{errors.root.serverError.message}</p>
                        )}
                        <Button 
                        isLoading={isSubmitting}
                        isDisabled={!isValid} 
                        fullWidth color="secondary" 
                        type="submit">Register</Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}