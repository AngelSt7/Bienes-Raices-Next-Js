'use client'
import GenericModal from '@/src/components/ui/generic/GenericModal';
import { useModalUtils } from '@/src/hooks/modal/useModalUtils';

export default function PruebaButton() {
    const { closeModal } = useModalUtils();
    return (
        <GenericModal closeModal={closeModal}  />
    )
}
