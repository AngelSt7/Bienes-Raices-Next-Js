'use client'

import { useAppStore } from "@/src/store/useAppStore";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@heroui/react";
import FormContact from "./FormContact";

export default function ModalContact() {
  const modalContact = useAppStore(state => state.modalContact)
  const changeStatusModal = useAppStore(state => state.changeStatusModal)

  return (
    <>
      <Modal isOpen={modalContact} onOpenChange={() => changeStatusModal()}>
        <ModalContent>
          {(onClose) => (
            <>
              <FormContact />
              <ModalFooter>
                <Button color="danger" variant="light" onPress={() => changeStatusModal()}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={onClose}>
                  Enviar email
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
