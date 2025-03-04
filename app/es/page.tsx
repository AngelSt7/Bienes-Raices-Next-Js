import ExtrasPropertiesSection from "@/src/components/es/sections/ExtrasPropertiesSection"
import PropertiesSection from "@/src/components/es/sections/PropertiesSection"
import StatsSection from "@/src/components/es/sections/StatsSection"

export default async function page() {
    return (
        <>
            <PropertiesSection/>
            <StatsSection />
            <ExtrasPropertiesSection />
        </>
    )
}