import DeleteModal from "@/src/components/darshboard/delete/deleteModal";
import LoadingModal from "@/src/components/darshboard/show/LoadingModal";
import TableProperties from "@/src/components/darshboard/show/Table";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function PageProperties({ searchParams }: { searchParams: { page: string } }) {
  const session = await getServerSession()
  const { page } = await searchParams

  if (!Number(page) || Number(page) < 0) return redirect('/dashboard/properties?page=1')
  if (session && session.user && session.user.email) return (
    <>
      <div className=' w-11/12 max-w-[900px] mx-auto flex-1 flex flex-col justify-between'>
        <TableProperties page={Number(page)} key={session.user.email} />
      </div>
      <LoadingModal />
      <DeleteModal page={Number(page)} key={session.user.email} />
    </>
  )
}
