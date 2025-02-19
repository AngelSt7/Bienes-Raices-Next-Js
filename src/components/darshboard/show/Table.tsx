"use client";

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner } from "@heroui/react";
import RenderCell from "./RenderCell";
import { columns } from "@/src/utils/frontend/ui/tableUtils";
import Pagination from "./Pagination";
import { PaginationType, SessionNextAuth } from "@/src/types/adminTypes/adminProperty";
import { useSearch } from "@/src/hooks/useSearch";
import NavigationTable from "./search/InputSearch";
import { useEffect } from "react";

type TablePropertiesProps = {
  page: PaginationType['page'];
  key: SessionNextAuth['email'];
};

export default function TableProperties({ page, key }: TablePropertiesProps) {
  const { handleSearch, dataProperty, setKey, isFetching , isFetchingSearch, propertyData, searchData, paramSearch } = useSearch();
  useEffect(()=>{setKey(key)},  [])
  
  return (
    <>
      <div className=" space-y-5">
        <NavigationTable handleSearch={handleSearch} />

        <Table>
          <TableHeader columns={columns} className="flex justify-center">
            {(column) => (
              <TableColumn key={column.uid} align={column.uid === "location" ? "start" : "center"}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>

          <TableBody
            items={dataProperty ?? [] }
            loadingContent={<Spinner />}
            loadingState={isFetching || isFetchingSearch ? "loading" : "idle"}
            emptyContent={"No hay registros, comience creando uno"}
          >
            {(item) => (
              <TableRow key={item.id} className="hover:bg-[#F7F7F7] dark:hover:bg-[#222225]">
                {(columnKey) => (
                  <TableCell>
                    <RenderCell property={item} columnKey={columnKey} />
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mx-auto mt-3 bg-white dark:bg-transparent w-fit px-2 rounded-xl">
      <Pagination total={paramSearch ? searchData?.pages || 1 : propertyData?.pages || 1} />

      </div>
    </>
  );
}
