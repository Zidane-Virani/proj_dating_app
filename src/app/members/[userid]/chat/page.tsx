import React from 'react'
import {CardHeader, CardBody} from "@heroui/card"
import {Divider} from "@heroui/divider"

export default function ChatPage(){
    return (
        <>
            <CardHeader className='text-2xl font-semibold text-secondary'>
                Chat
            </CardHeader>
            <Divider/>
            <CardBody>
                ChatsGo Here
            </CardBody>
        
        </>
    )
}