import { QueryClient, dehydrate } from "@tanstack/react-query";
import { publicSearchProperties } from "@/src/services/client/properties/public/publicSearchProperties";
import SearchHydrated from "@/src/components/es/search/searchHydrated/SearchHydrated";
import { publicCarrouselProperties } from "@/src/services/client/properties/public/publicCarrouselProperties";

export const searchFiltersArray = [
    "districtId",
    "typeId",
    "currencyId",
    "minBedroom",
    "maxBedroom",
    "minPrice",
    "maxPrice"
];

type SearchParams = Record<string, string | undefined>;

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
    const queryClient = new QueryClient();
    const params = await searchParams

    const searchFilters = Object.fromEntries(
        Object.entries(params).filter(([key, value]) => value !== undefined && searchFiltersArray.includes(key))
    );

    const queryConfigs = [
        { key: ["searchProperties", searchFilters], fn: () => publicSearchProperties(searchFilters) },
        { key: ["carouselProperties"], fn: () => publicCarrouselProperties('all') },
    ];

    await Promise.all(
        queryConfigs.map(({ key, fn }) =>
            queryClient.prefetchQuery({
                queryKey: key,
                queryFn: fn as any, //para devolver multiples formas de datos   
                retry: false,
            })
        )
    );

    const dehydratedStates = queryConfigs.map(({ key }) => {
        return dehydrate(queryClient);
    });

    return  <SearchHydrated stateSearch={dehydratedStates[0]} stateCarrousel={dehydratedStates[1]} />
}
