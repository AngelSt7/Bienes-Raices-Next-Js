import DeleteModal from "@/src/components/darshboard/delete/deleteModal";
import LoadingModal from "@/src/components/darshboard/show/LoadingModal";
import TableProperties from "@/src/components/darshboard/show/Table";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCreate } from "react-icons/io5";

export default async function PageProperties({ searchParams }: { searchParams: { page: string } }) {
  const session = await getServerSession()
  const { page } = await searchParams

  if (!Number(page) || Number(page) < 0) return redirect('/dashboard/properties?page=1')
  if (session && session.user && session.user.email) return (
    <>
      <div className='relative w-11/12 max-w-[900px] mx-auto flex-1 flex flex-col justify-between'>
        <TableProperties page={Number(page)} key={session.user.email} />
      </div>
      <LoadingModal />
      <DeleteModal page={Number(page)} key={session.user.email} />
      <div className=" fixed bottom-2 right-2 z-10">
        <Link href={'/dashboard/properties/create'} className="h-12 w-12 dark:bg-zinc-800/90 dark:hover:bg-zinc-700/90 bg-zinc-300/60 hover:bg-zinc-300/90 rounded-full text-white flex items-center justify-center" type="button">
          <IoCreate className="w-8 h-8" />
        </Link>
      </div>
    </>
  )
}
