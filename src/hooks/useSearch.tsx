import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { adminGetProperties } from "@/src/services/client/properties/admin/adminGetProperties";
import { adminSearchProperties } from "../services/client/properties/admin/adminSearchProperties";
import { useAppStore } from "../store/useAppStore";

export const useSearch = () => {
  // Estados y referencias
  const take = useAppStore(state => state.take);
  const [key, setKey] = useState<string>();
  const [search, setSearch] = useState("");
  const prevSearch = useRef("");
  const [searching, setSearching] = useState(false);

  // Hooks de navegación
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const page = searchParams.get("page") || "1";
  const paramSearch = searchParams.get("search");

  // Función para manejar cambios en la barra de búsqueda
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);

    // Si hay una búsqueda, redirigir a la página 1
    const params = new URLSearchParams();
    if (newSearch.trim()) {
      params.set("search", newSearch);
      params.set("page", "1"); // Reinicia a la primera página
    } else {
      params.set("page", "1");
    }

    router.push(`/dashboard/properties?${params.toString()}`);
  };

  // Efecto para manejar búsqueda y actualización de URL
  useEffect(() => {
    if (paramSearch) {
      setSearching(true);
      prevSearch.current = paramSearch;
    } else {
      setSearching(false);
      prevSearch.current = "";
    }
  }, [paramSearch]);

  // Queries para obtener propiedades
  const { data: propertyData, isFetching } = useQuery({
    queryFn: () => adminGetProperties({ page: Number(page), take: take }),
    queryKey: [key, page, take],
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: keepPreviousData,
  });

  const { data: searchData, isFetching: isFetchingSearch } = useQuery({
    queryFn: () => adminSearchProperties({ page: 1, take: Number(take), search: paramSearch || "" }),
    queryKey: [key, "1", paramSearch, take], // Siempre comienza en 1
    enabled: !!paramSearch,
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: keepPreviousData,
  });

  // Selección de datos en base a la búsqueda
  const dataProperty = paramSearch && searchData?.properties 
    ? searchData.properties 
    : propertyData?.properties;

  return {
    handleSearch,
    search,
    setSearch,
    searching,
    setSearching,
    page,
    router,
    setKey,
    dataProperty,
    isFetching,
    isFetchingSearch,
    propertyData,
    searchData,
    paramSearch
  };
};
