import Navigation from "@/src/components/ui/Navigation";

export default async function PropertiesLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

    return (
        <div className="flex flex-col min-h-screen">
            <Navigation />
            <div className=' flex-1 flex flex-col mt-8 mb-4'>
                {children}
            </div>
        </div>
    )
}