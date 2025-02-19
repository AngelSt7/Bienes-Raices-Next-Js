'use client'

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { AdminModalProperty } from "@/src/types/adminTypes/adminProperty";
import { useRouter, useSearchParams } from "next/navigation";
import FooterModal from "./modal/FooterModal";
import ServicesModal from "./modal/ServicesModal";
import CharacteristicsModal from "./modal/CharacteristicsModal";
import { MapPin } from "lucide-react";
import ImageModal from "./modal/ImageModal";

export default function DetailsModal({ detailsPropertyModal }: { detailsPropertyModal: AdminModalProperty }) {
    const { onClose } = useDisclosure();
    const router = useRouter()
    const params = useSearchParams();
    const propertyId = params.get('property')
    const showModal = propertyId ? true : false;

    const handleClose = () => {
        onClose();
        const page = params.get('page')
        router.replace(`/dashboard/properties?page=${page}`, { scroll: false });
    };

    return (
        <Modal size='2xl' isOpen={showModal} onClose={handleClose}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex items-center gap-2 border-b border-b-zinc-300 dark:border-b-neutral-200/20 ">
                            <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#f5a524]" />
                            <span className="text-lg md:text-xl lg:text-2xl font-semibold text-zinc-900 dark:text-neutral-100">
                                {detailsPropertyModal.location}
                            </span>
                        </ModalHeader>
                        <ModalBody>
                            <div className="space-y-4 md:space-y-6">
                                <ImageModal detailsPropertyModal={detailsPropertyModal} />
                                <CharacteristicsModal detailsPropertyModal={detailsPropertyModal} />
                                <ServicesModal serviceToProperty={detailsPropertyModal.serviceToProperty} />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <FooterModal onClose={onClose} />
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}