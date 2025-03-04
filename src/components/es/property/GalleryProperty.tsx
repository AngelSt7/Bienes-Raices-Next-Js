import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useAppStore } from '@/src/store/useAppStore';

export default function GalleryProperty() {
    const imagesGalery = useAppStore(state => state.imagesGalery)
    const modalGalery = useAppStore(state => state.modalGalery)
    const setImagesGalery = useAppStore(state => state.setImagesGalery)
    const changeStatusModalGalery = useAppStore(state => state.changeStatusModalGalery)
    const [showGallery, setShowGallery] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isClosing, setIsClosing] = useState(false);

    const openGallery = () => {
        setShowGallery(true);
    };

    const closeGallery = () => {
        setIsClosing(true);

        setTimeout(() => {
            setShowGallery(false);
            setIsClosing(false);
        }, 300);
    };

    useEffect(() => {
        if (showGallery) {
            const scrollY = window.scrollY;

            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflowY = 'hidden';
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflowY = '';

            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
            }
        }

        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflowY = '';
        };
    }, [showGallery]);

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? imagesGalery.length - 1 : prevIndex - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === imagesGalery.length - 1 ? 0 : prevIndex + 1
        );
    };

    if (modalGalery) return (
        <>
            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }

                @keyframes zoomIn {
                    from { 
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to { 
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                @keyframes zoomOut {
                    from { 
                        opacity: 1;
                        transform: scale(1);
                    }
                    to { 
                        opacity: 0;
                        transform: scale(0.95);
                    }
                }

                .modal-container {
                    animation: fadeIn 0.3s ease-out forwards;
                }

                .modal-container.closing {
                    animation: fadeOut 0.3s ease-out forwards;
                }

                .modal-content {
                    animation: zoomIn 0.3s ease-out forwards;
                }

                .modal-content.closing {
                    animation: zoomOut 0.3s ease-out forwards;
                }
            `}</style>

            <div
                className={`fixed inset-0 bg-black/90 z-50 flex flex-col justify-center items-center modal-container ${isClosing ? 'closing' : ''}`}
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        setImagesGalery([]);
                        changeStatusModalGalery();
                    }
                }}
            >
                <div className="absolute top-4 right-4">
                    <button
                        onClick={() => {
                            setImagesGalery([]);
                            changeStatusModalGalery();
                        }}
                        className="text-white p-2 hover:bg-zinc-800/80 rounded-full transition-colors backdrop-blur-sm"
                        aria-label="Cerrar galería"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className={`relative w-full h-full max-w-6xl max-h-[80vh] flex items-center justify-center modal-content ${isClosing ? 'closing' : ''}`}>
                    <div className="w-full h-full flex items-center justify-center p-4">
                        <img
                            key={currentImageIndex}
                            src={imagesGalery[currentImageIndex]}
                            alt={`Imagen ${currentImageIndex + 1} de ${imagesGalery.length}`}
                            className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
                        />
                    </div>

                    <button
                        onClick={handlePrevImage}
                        className="custom-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/30 dark:bg-gray-800/30 text-gray-700 dark:text-gray-200 p-2 rounded-full hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-300 backdrop-blur-sm">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleNextImage}
                        className="custom-next absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/30 dark:bg-gray-800/30 text-gray-700 dark:text-gray-200 p-2 rounded-full hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-300 backdrop-blur-sm">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                <div className="text-white text-sm mt-2 font-medium bg-zinc-800/50 px-3 py-1 rounded-full backdrop-blur-sm">
                    {currentImageIndex + 1} / {imagesGalery.length}
                </div>
            </div>
        </>
    )
}
