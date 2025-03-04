import { dehydrate } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import Search from './Search';
import Carrousel from '../error/Carrousel';

type SearchHydratedProps = {
    stateSearch: ReturnType<typeof dehydrate>;
    stateCarrousel: ReturnType<typeof dehydrate>;
};

export default function SearchHydrated({ stateSearch, stateCarrousel }: SearchHydratedProps) {
    return (
        <>
            <HydrationBoundary state={stateSearch}>
                <Search>
                    <HydrationBoundary state={stateCarrousel}>
                        <Carrousel keyQuery="carouselProperties" mode="all" />
                    </HydrationBoundary>
                </Search>
            </HydrationBoundary>
        </>
    );
}