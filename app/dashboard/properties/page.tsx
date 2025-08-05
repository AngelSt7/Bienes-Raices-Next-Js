import DeleteModal from "@/src/components/dashboard/delete/deleteModal";
import LoadingModal from "@/src/components/dashboard/show/LoadingModal";
import TableProperties from "@/src/components/dashboard/show/Table";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import PruebaButton from "../ui/PruebaButton";

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
        <PruebaButton />
      </div>
    </>
  )
}
