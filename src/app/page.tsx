
import { Button } from "@heroui/button"
import { FaRegSmile } from "react-icons/fa"
import Link from "next/link"
import { auth } from "../../auth"
import { signOut } from "../../auth"

export default async function Home() {

  const session = await auth();

  return (
    <div>

      <h3 className="text-2xl font-semibold">User Session Data</h3>
      {session ? (
        <div>
          <pre>{JSON.stringify(session, null, 2)}</pre>
          <form action={
            async () => {
              "use server"
              await signOut();
            }
          }>
            <Button
              color="primary"
              variant="bordered"
              startContent={<FaRegSmile size={20}/>}
              type="submit"
              >
              Sign Out
            </Button>
          </form>
        </div>
      ) : (
        <div>
          Not Signed In
        </div>
      )
    }
    </div>
  )
}