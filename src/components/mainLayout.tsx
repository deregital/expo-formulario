'use client'
import Provider from "@/app/_trpc/Provider";
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from "./ui/alert-dialog";
import { create } from 'zustand'
import { useState } from "react";

export const useFormSend = create(() => ({
    open: false,
  }));

const MainLayout = ({ children } : {children: React.ReactNode}) => {
    const [open, setOpen] = useState(false);
    useFormSend.subscribe((state) => {
        setOpen(state.open);
    });
    return (
        <>
            <main className={`px-5 ${open ? 'bg-topbar/25' : ''}`}>
                <Provider>{children}</Provider>
            </main>
            <AlertDialog open={open}>
                <AlertDialogTrigger></AlertDialogTrigger>
                <AlertDialogContent className="bg-white p-0">
                    <div onClick={() => useFormSend.setState({open: false})} className="flex justify-end items-center px-3 bg-topbar hover:cursor-pointer text-white">
                        <p>Cerrar</p>
                    </div>
                    <p>Esto es una alerta</p>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default MainLayout;