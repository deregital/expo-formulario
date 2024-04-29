import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import IconWhatsapp from '@/components/WhatsappIcon';
import { useEffect, useState } from 'react';
import { create } from 'zustand';

interface ModalProps {}

export const useFormData = create<{ nombreCompleto: string }>(() => ({
  nombreCompleto: '',
}));

export const useFormSend = create(() => ({
  open: false,
}));

const Modal = ({}: ModalProps) => {
  const [open, setOpen] = useState(false);
  useFormSend.subscribe((state) => {
    setOpen(state.open);
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger></AlertDialogTrigger>
      <AlertDialogOverlay className="bg-topbar/25" />
      <AlertDialogContent className="bg-white p-0">
        <div className="flex items-center justify-end bg-topbar px-3 py-1">
          <div
            className="w-fit hover:cursor-pointer"
            onClick={() => useFormSend.setState({ open: false })}
          >
            <svg
              width="40"
              height="41"
              viewBox="0 0 40 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32.1346 30.5962C32.2507 30.7123 32.3428 30.8502 32.4057 31.0019C32.4686 31.1537 32.5009 31.3163 32.5009 31.4806C32.5009 31.6448 32.4686 31.8074 32.4057 31.9592C32.3428 32.1109 32.2507 32.2488 32.1346 32.3649C32.0184 32.4811 31.8806 32.5732 31.7288 32.636C31.5771 32.6989 31.4145 32.7313 31.2502 32.7313C31.086 32.7313 30.9233 32.6989 30.7716 32.636C30.6198 32.5732 30.482 32.4811 30.3658 32.3649L20.0002 21.9977L9.63458 32.3649C9.40003 32.5995 9.08191 32.7313 8.75021 32.7313C8.4185 32.7313 8.10038 32.5995 7.86583 32.3649C7.63128 32.1304 7.49951 31.8123 7.49951 31.4806C7.49951 31.1488 7.63128 30.8307 7.86583 30.5962L18.233 20.2306L7.86583 9.86493C7.63128 9.63038 7.49951 9.31226 7.49951 8.98055C7.49951 8.64885 7.63128 8.33073 7.86583 8.09618C8.10038 7.86163 8.4185 7.72986 8.75021 7.72986C9.08191 7.72986 9.40003 7.86163 9.63458 8.09618L20.0002 18.4634L30.3658 8.09618C30.6004 7.86163 30.9185 7.72986 31.2502 7.72986C31.5819 7.72986 31.9 7.86163 32.1346 8.09618C32.3691 8.33073 32.5009 8.64885 32.5009 8.98055C32.5009 9.31226 32.3691 9.63038 32.1346 9.86493L21.7674 20.2306L32.1346 30.5962Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
        <p className="text-balance py-8 text-center">
          Los datos han sido <strong>enviados correctamente</strong>. Para
          seguir con el contacto, mandanos un mensaje por Whatsapp haciendo
          click acá{' '}
          <button
            onClick={() =>
              window.open(
                `https://wa.me/541160435283?text=Hola,%20soy%20${encodeURIComponent(useFormData.getState().nombreCompleto)},%20Quiero%20Participar%20en%20Expo%20Desfiles.`,
                '_blank'
              )
            }
            className="inline-flex items-center rounded-xl bg-topbar px-2 py-1 transition-colors hover:bg-topbar/95"
          >
            <span role="img" aria-label="point_down">
              👉
            </span>
            <span className="inline-flex items-center">
              <IconWhatsapp className="ml-[5px] h-5 w-5 cursor-pointer fill-white" />
            </span>
          </button>
        </p>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Modal;
