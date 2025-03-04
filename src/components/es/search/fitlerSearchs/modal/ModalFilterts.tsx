'use client'

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";
import SelectFilter from "../SelectFilter";
import CurrencyFilter from "../CurrencyFilter";
import BedroomFilter from "../BedroomFilter";

export default function ModalFilterts() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button className=" mx-auto" color="secondary" variant="flat" size="md" onPress={onOpen}>Filtrar</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Selecciona filtros</ModalHeader>
                            <ModalBody>
                                <SelectFilter />
                                <CurrencyFilter />
                                <BedroomFilter />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Limpiar Filtros
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Cerrar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
