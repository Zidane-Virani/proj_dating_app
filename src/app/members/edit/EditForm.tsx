"use client"

import React from 'react'
import {Member} from "@prisma/client"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { memberEditSchema } from '@/lib/schemas/memberEditSchema'
import { MemberEditSchema } from '@/lib/schemas/memberEditSchema'
import { Input } from '@heroui/input'
import { useEffect } from 'react'
import { Textarea } from '@heroui/input'
import { Button } from '@heroui/button'
import { updateMemberProfile } from '@/app/actions/userActions'
import { getFormServerErrors } from '@/lib/utils'
import { useRouter } from 'next/navigation'



export default function EditForm({member}: {member: Member}) {
    const router = useRouter();
    const {register, handleSubmit, reset, setError, formState:{isValid, isDirty, isSubmitting, errors}} = useForm({
        resolver: zodResolver(memberEditSchema),
        mode: "onTouched"
    })


    useEffect(() => {
        if (member) {
          reset({
            name: member.name,
            description: member.description,
            city: member.city,
            country: member.country,
          });
        }
      }, [member, reset]);

    const onSubmit = async (data: MemberEditSchema) => {
        const nameUpdated = data.name !== member.name;
        const result = await updateMemberProfile(data, nameUpdated);
        
        if (result.status === "success"){
            console.log("Member Updated Successfully")
            router.refresh();
            reset({...data})
        } else {
            getFormServerErrors(result, setError);
        }
    }
      


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
            <Input
                label="Name"
                variant="bordered"
                {...register("name")}
                defaultValue={member.name}
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
            />
            <Textarea
                label="Description"
                variant="bordered"
                {...register("description")}
                defaultValue={member.description}
                isInvalid={!!errors.description}
                errorMessage={errors.description?.message} 
                minRows={6}           
            />
            <div className="flex flex-row gap-3">
                <Input
                    label="City"
                    variant="bordered"
                    {...register("city")}
                    defaultValue={member.city}
                    isInvalid={!!errors.city}
                    errorMessage={errors.city?.message}
                />
                <Input
                    label="Country"
                    variant="bordered"
                    {...register("country")}
                    defaultValue={member.country}
                    isInvalid={!!errors.country}
                    errorMessage={errors.country?.message}
                />
            </div>
            {errors.root?.serverError && (
                <p className="text-danger text-sm">{errors.root.serverError.message}</p>
            )}
            <Button
                type = "submit"
                variant = "solid"
                isDisabled = {!isValid || !isDirty}
                isLoading = {isSubmitting}
                className = "flex sel-end"
                color = "secondary"
            >
                {isSubmitting ? "Saving..." : "Save"}
            </Button>

        </form>
    );
}