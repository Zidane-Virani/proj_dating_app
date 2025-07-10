"use client"

import { Button } from "@heroui/button"
import { FaRegSmile } from "react-icons/fa"
import Link from "next/link"

export default function Home() {
  return (
    <div>
      <Button
        color="primary"
        variant="bordered"
        startContent={<FaRegSmile size={20}/>}
        as={Link}
        href="/members"
        >
        Click Me
      </Button>
    </div>
  )
}