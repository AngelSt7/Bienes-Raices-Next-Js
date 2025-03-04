"use client";

import React, { useEffect, useState } from "react";
import { Select, SelectItem, SharedSelection } from "@heroui/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

type SelectFilterKeys = "districtId" | "typeId";

type SelectFilters = {
  districtId: string;
  typeId: string;
}

export const itemsSelects = {
  districtId: {
    label: "Distrito",
    options: [
      { key: "1", label: "Miraflores" },
      { key: "2", label: "San Isidro" },
      { key: "3", label: "Barranco" },
      { key: "4", label: "La Molina" },
      { key: "5", label: "Surco" },
    ],
  },
  typeId: {
    label: "Tipo de operación",
    options: [
      { key: "1", label: "Venta" },
      { key: "2", label: "Alquiler" },
    ],
  },
};

export default function SelectFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selection, setSelection] = useState<SelectFilters>({
    districtId: searchParams.get("districtId") || "",
    typeId: searchParams.get("typeId") || "",
  });

  useEffect(() => {
    setSelection({
      districtId: searchParams.get("districtId") || "",
      typeId: searchParams.get("typeId") || "",
    });
  }, [searchParams]);

  const handleSelectionChange = (key: SelectFilterKeys, selectionChange: SharedSelection) => {
    const selectedValue = Array.from(selectionChange)[0].toString();

    setSelection((prev) => ({
      ...prev,
      [key]: selectedValue,
    }));

    const params = new URLSearchParams(searchParams.toString());
    params.set(key, selectedValue);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      {Object.entries(itemsSelects).map(([key, { label, options }]) => {
        const typedKey = key as SelectFilterKeys; 

        return (
          <Select
            labelPlacement="inside"
            size="sm"
            key={typedKey}
            radius="sm"
            className="w-full md:w-60"
            label={label}
            selectedKeys={selection[typedKey] ? [selection[typedKey]] : []} 
            onSelectionChange={(selection) => handleSelectionChange(typedKey, selection)}
          >
            {options.map((option) => (
              <SelectItem key={option.key} value={option.key}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
        );
      })}
    </>
  );
}
