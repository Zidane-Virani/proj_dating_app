"use server"

import { MemberEditSchema, memberEditSchema } from "@/lib/schemas/memberEditSchema"
import { Member } from "@prisma/client"
import type { ActionResult } from "@/types"
import { getAuthUserId } from "./authActions"
import { prisma } from "@/lib/prisma"
import { Photo } from "@prisma/client"


export async function updateMemberProfile(data: MemberEditSchema, nameUpdated: boolean): Promise<ActionResult<Member>>{
    try{
        const userId = await getAuthUserId();
        if (!userId) return {status: "error", error: "Auth went wrong"}

        const validated = memberEditSchema.safeParse(data)
        if (!validated.success) return {status: "error", error: validated.error.message};

        const {name, description, city, country} = validated.data;

        if (nameUpdated){
            await prisma.user.update({
                where: {id: userId},
                data: {name}
            })
        }

        const member = await prisma.member.update({
            where: {userid: userId},
            data: {
                name, 
                description,
                city,
                country
            }
        })

        return {success: true, data: member};

    } catch (error) {
        console.error(error);
        return {status: "error", error: "Something went wrong"}
    }
}


export async function addImage(url: string, publicId: string){
    try{
        const userId = await getAuthUserId();
        if (!userId) return {status: "error", error: "Auth went wrong"}

        return prisma.member.update({
            where: {userid: userId},
            data: {
                photos: {
                    create: {
                        url, 
                        publicId
                    }
                }
            }

        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function setMainImage(photo: Photo){
    try{
        const userId = await getAuthUserId();
        if (!userId) return {status: "error", error: "Auth went wrong"}

        await prisma.user.update({
            where: {id: userId},
            data: {image: photo.url}
        })

        return prisma.member.update({
            where: {userid: userId},
            data: {image: photo.url}
        })

        
    }catch(error){
        console.log(error);
        throw error;
    }
}


export async function getUserInfoForNav(){
    try{
        const userId = await getAuthUserId();
        if (!userId) return {status: "error", error: "Auth went wrong"}

        return prisma.user.findUnique({
            where: {id: userId},
            select: {
                name: true,
                image: true
            }
        })

    }catch(error){
        console.log(error);
        throw error;
    }
}