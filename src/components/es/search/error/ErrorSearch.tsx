'use client';

import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from "lucide-react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const iterar = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];

export default function ErrorSearch() {
  return (
    <>
    <h2 className=" text-center font-black text-4xl">No se encontraron resultados para tu busqueda</h2>
    <p className="text-center text-zinc-800 dark:text-slate-50 text-2xl">Propíedades destacadas</p>
    
        </>
  );
}