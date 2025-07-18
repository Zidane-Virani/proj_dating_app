"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "../../../auth";

export async function getMembers() {

    const session = await auth();

    if (!session?.user?.id) return null;


    try{

        return await prisma.member.findMany({
            where: {
                NOT: { userid: session.user.id }
            }
        });
        
    } catch (error) {
        console.error("Error fetching members:", error);
    }
}

export async function getMemberByUserId(userid: string) {
    try{
        return await prisma.member.findUnique({where: {userid}})
    }catch(error){
        console.error("Error fetching member by userid:", error);
    }
}

export async function getMemberPhotosByUserID(userid: string) {
    const member = await prisma.member.findUnique({
        where: {userid},
        select: {photos: true}
    });

    if (!member) return null;

    return member.photos;
}