import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { useGenericModal } from "@/src/hooks/modal/useGenericModal";
import { User } from "@/src/types/userTypes/user";

type GenericModalProps = {
  user?: User;
  id?: string;
  closeModal: () => void;
  defaultValues?: any;
};

export default function GenericModal({ user, id, closeModal, defaultValues }: GenericModalProps) {

  const {
        showModal,
        getTitle,
        isDetails,
        renderForm
  } = useGenericModal({ user, defaultValues, id, closeModal });

  if (!showModal) return null;

  const tittle = getTitle();
  
  return (
    <Modal scrollBehavior="inside" size={"3xl"} backdrop="opaque" isOpen={showModal} onClose={closeModal}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-base sm:text-2xl text-center">
              {tittle.includes('_') ? tittle.replace('_', ' de ') : tittle}
            </ModalHeader>
            <ModalBody>
              {renderForm()}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
