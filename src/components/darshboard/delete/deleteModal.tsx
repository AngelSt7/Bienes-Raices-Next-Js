'use client'
import { adminDeleteProperty } from "@/src/services/client/properties/adminDeleteProperty";
import { useAppStore } from "@/src/store/useAppStore";
import { PaginationType, SessionNextAuth } from "@/src/types/adminTypes/adminProperty";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type DeleteModalProps = {
  page: PaginationType['page'];
  key: SessionNextAuth['email']
}

export default function DeleteModal({ key, page } : DeleteModalProps ) {
  const invalidate = useQueryClient()
  const deleteId = useAppStore(state => state.deleteId)
  const removeDeleteId = useAppStore(state => state.removeDeleteId)
  const showModal = deleteId === null ? false : true

  const { mutate } = useMutation({
    mutationFn: adminDeleteProperty,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      invalidate.invalidateQueries({queryKey: [key, page]})
      removeDeleteId()
    }
  })
  return (
    <>
      <Modal onOpenChange={() => removeDeleteId()} isOpen={showModal} >
        {typeof deleteId === "number" && (
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 uppercase md:text-xl">Eliminar propiedad</ModalHeader>
                <ModalBody>
                  <p className=" text-zinc-900 dark:text-danger-300 font-medium text-base">
                    ¿Seguro que desea eliminar esta propiedad? Esta acción no se puede deshacer
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" variant="light" onPress={() => removeDeleteId()}>
                    Cerrar
                  </Button>
                  <Button color="danger" onPress={() => mutate(deleteId)}>
                    Eliminar Propiedad
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        )}
      </Modal>
    </>
  );
}
