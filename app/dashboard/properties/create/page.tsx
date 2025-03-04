'use client'

import AddPropertyForm from "@/src/components/darshboard/create/AddPropertyForm"

export default function page() {

  return (
    <>
      <div className=" w-11/12 max-w-[700px] mx-auto bg-white dark:bg-[#121212] p-6 shadow-sm rounded-xl">
        <AddPropertyForm />
      </div>
    </>
  )
}
