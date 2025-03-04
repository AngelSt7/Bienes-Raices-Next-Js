import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import Carrousel from './Carrousel';

type CarrouselHydratedProps = {
    state: ReturnType<typeof dehydrate>;
};

export default function CarrouselHydrated({ state }: CarrouselHydratedProps) {
    return (
        <HydrationBoundary state={state}>
            <Carrousel />
        </HydrationBoundary>
    )
}
