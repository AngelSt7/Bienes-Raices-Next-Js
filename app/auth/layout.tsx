import Image from "next/image";

export default async function AuthLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

    return (
        <div className=" bg-[#121212] flex flex-col min-h-screen">
            <div className='w-11/12 max-w-[580px] mx-auto flex-1 flex flex-col justify-center items-center my-8'>
                <div className=" bg-white dark:bg-[#181818] rounded-xl w-full sm:w-[95%]">
                    <div className='flex justify-center my-4'>
                        <Image src='/BienesRaicesLogo.png' alt='Logo Bienes Raices' width={130} height={130} />
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}