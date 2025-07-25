import React from 'react'
import { CardHeader, CardBody } from '@heroui/card'
import { Divider } from '@heroui/divider'
import EditForm from './EditForm'
import { getAuthUserId } from '@/app/actions/authActions'
import { getMemberByUserId } from '@/app/actions/memberActions'
import { notFound } from 'next/navigation'

export default async function EditPage() {

  const userId = await getAuthUserId();
  if (!userId) return notFound();

  const member = await getMemberByUserId(userId);

  if (!member) return notFound();



  
  return (
    <>
      <CardHeader className='text-2xl font-semibold text-secondary'>
          Edit Profile
      </CardHeader>
      <Divider/>
      <CardBody>
          <EditForm member={member}/>
      </CardBody>

    </>
  );
}