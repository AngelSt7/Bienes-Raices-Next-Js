import { useRouter, useSearchParams } from "next/navigation";
export function useModalUtils() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const ValidParams = {
        action: "action",
        id: "id",
        page: "page",
        create: "create",
        details: "details",
        edit: "edit",
        changeStatus: "changeStatus",
    }

    const openModalCreate = () => {
        const params = new URLSearchParams(searchParams.toString());
        console.log(params);
        params.set(ValidParams.action, ValidParams.create);
        router.replace(`?${params.toString()}`);
    };

    const openDetailsModal = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(ValidParams.action, ValidParams.details);
        router.replace(`?${params.toString()}`);
    };

    const openModalEdit = (id: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(ValidParams.action, ValidParams.edit);
        params.set("id", Number(id).toString());
        router.replace(`?${params.toString()}`);
    };

    const closeModal = () => {
        const params = new URLSearchParams(searchParams.toString());

        Array.from(params.keys()).forEach((keys) => {
            if (keys !== ValidParams.page) {
                params.delete(keys);
            }
        })
        router.replace(`?${params.toString()}`);
    };


    return { openModalCreate, openDetailsModal, openModalEdit, closeModal };
};
