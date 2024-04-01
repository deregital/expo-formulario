'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import svgHelp from '../../public/help_expodesfiles.svg';
import { trpc } from '@/lib/trpc';
import { useFormSend } from './mainLayout';
import * as Tooltip from '@radix-ui/react-tooltip';



const InscripcionBox = () => {
    const [value, setValue] = useState<string | undefined>('');
    const [help, setHelp] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const crearModelo = trpc.perfil.create.useMutation();
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const nombre = event.currentTarget.nombreApellido.value;
        crearModelo.mutateAsync({ nombre: nombre, telefono: value ? value : ''});
        // Limpiar el input del telefono
        setValue('');
        // Limpiar el input del nombre
        event.currentTarget.nombreApellido.value = '';
        useFormSend.setState({open: true});
    }
    useFormSend.subscribe((state) => {
        setOpen(state.open);
    });
    return (
        <div className={`border border-black mb-5 xl:mb-0`}>
            <div className="bg-topbar w-full">
                <p className="text-center py-1 text-white font-poppins text-sm md:text-base">Rellená estos datos para participar</p>
            </div>
            <div>
                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-y-4 p-4 max-w-[240px] mobileMd:max-w-[280px] mobileLg:max-w-[330px] mobileXl:max-w-[400px] sm:max-w-lg md:max-w-xl mx-auto">
                    <input type="text" autoComplete='off' name="nombreApellido" id="nombreApellido" className={`border-2 border-topbar rounded-md p-2 mt-2 w-full ${open ? 'text-topbar/25' : ''}`} placeholder="Nombre/s y apellido/s" required />
                    <div className='border-2 border-topbar rounded-md px-2 py-1 flex flex-col gap-y-1.5 w-full relative'>
                        <p className='text-xs text-black/50 ml-10'>Número de telefono</p>
                        <PhoneInput placeholder="Número de Teléfono"
                                    international
                                    value={value}
                                    onChange={setValue}
                                    defaultCountry= "AR"
                                    countryCallingCodeEditable={false}
                                    displayInitialValueAsLocalNumber 
                                    className={``} required />
                        <div className='absolute flex justify-center items-center h-full -top-[1px] -right-9 mobileMd:-right-10 mobileXl:-right-12'>
                            <Image className='hover:cursor-pointer' onMouseOver={() => setHelp(true)} onMouseOut={() => setHelp(false)} src={svgHelp} alt="Help" width={32} height={32} />
                            {help && ( 
                                <span className='bg-white absolute top-10 -right-2 xl:right-0 xl:-top-full xl:left-10 px-5 bg-green border-2 border-topbar shadow-md shadow-black/50 text-center w-72 2xl:w-80 text-xs text-balance mt-3 after:content-[""] after:absolute after:bottom-full after:right-0 after:ml-[-5px] after:border-solid after:border-transparent after:border-black after:border-t-5 after:border-l-5 after:border-r-5'>Para enviar su número de teléfono correctamente deberá <strong>seleccionar el país en el que está registrado</strong> y luego su prefijo. Por ejemplo, un número que es de Capital, ingresaría "1108001234", o si es de La Plata ingresaría "2217654321".</span>
                                // {/* <Tooltip.Provider>
                                //     <Tooltip.Root>
                                //     <Tooltip.Trigger asChild>
                                //     </Tooltip.Trigger>
                                //     <Tooltip.Portal>
                                //         <Tooltip.Content side='left' className='text-balance bg-white border-2 border-topbar'>
                                //         <p>Para enviar su número de teléfono correctamente deberá seleccionar el país en el que está registrado y luego su prefijo. Por ejemplo, un número que es de Capital, ingresaría "1108001234", o si es de La Plata ingresaría "2217654321".</p>
                                //         <Tooltip.Arrow width={10} height={10} />
                                //         </Tooltip.Content>
                                //     </Tooltip.Portal>
                                //     </Tooltip.Root>
                                // </Tooltip.Provider> */}
                                // {/* <Tooltip.Provider>
                                //     <Tooltip.Root>
                                //     <Tooltip.Trigger asChild>
                                //     </Tooltip.Trigger>
                                //     <Tooltip.Portal>
                                //         <Tooltip.Content side='left' className='text-balance bg-white border-2 border-topbar'>
                                //         <p>Para enviar su número de teléfono correctamente deberá seleccionar el país en el que está registrado y luego su prefijo. Por ejemplo, un número que es de Capital, ingresaría "1108001234", o si es de La Plata ingresaría "2217654321".</p>
                                //         <Tooltip.Arrow width={10} height={10} />
                                //         </Tooltip.Content>
                                //     </Tooltip.Portal>
                                //     </Tooltip.Root>
                                // </Tooltip.Provider> */}
                            )}

                        </div>
                    </div>
                    <button type="submit" className="bg-topbar hover:bg-topbar/80 font-bodoni font-bold text-2xl text-white rounded-md px-5 py-1 w-fit">Enviar</button>
                </form>
            </div>
        </div>
    )
}

export default InscripcionBox;