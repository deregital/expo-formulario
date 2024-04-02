'use client';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { trpc } from '@/lib/trpc';
import { TooltipArrow } from '@radix-ui/react-tooltip';
import Image from 'next/image';
import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import svgHelp from '../../public/help_expodesfiles.svg';
import { useFormSend } from './mainLayout';

const InscripcionBox = () => {
  const [value, setValue] = useState<string | undefined>('');
  const [open, setOpen] = useState(false);
  const crearModelo = trpc.perfil.create.useMutation();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nombre = event.currentTarget.nombreApellido.value;
    crearModelo.mutateAsync({ nombre: nombre, telefono: value ? value : '' });
    // Limpiar el input del telefono
    setValue('');
    // Limpiar el input del nombre
    event.currentTarget.nombreApellido.value = '';
    useFormSend.setState({ open: true });
  }
  useFormSend.subscribe((state) => {
    setOpen(state.open);
  });
  return (
    <div className={`mb-5 border border-black xl:mb-0`}>
      <div className="w-full bg-topbar">
        <p className="py-1 text-center font-poppins text-sm text-white md:text-base">
          Rellená estos datos para participar
        </p>
      </div>
      <div>
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-[240px] flex-col items-center gap-y-4 p-4 mobileMd:max-w-[280px] mobileLg:max-w-[330px] mobileXl:max-w-[400px] sm:max-w-lg md:max-w-xl"
        >
          <input
            type="text"
            autoComplete="off"
            name="nombreApellido"
            id="nombreApellido"
            className={`mt-2 w-full rounded-md border-2 border-topbar p-2 ${open ? 'text-topbar/25' : ''}`}
            placeholder="Nombre/s y apellido/s"
            required
          />
          <div className="relative flex w-full flex-col gap-y-1.5 rounded-md border-2 border-topbar px-2 py-1">
            <p className="ml-10 text-xs text-black/50">Número de telefono</p>
            <PhoneInput
              placeholder="Número de Teléfono"
              international
              value={value}
              onChange={setValue}
              defaultCountry="AR"
              countryCallingCodeEditable={false}
              displayInitialValueAsLocalNumber
              required
            />
            <div className="absolute -right-9 -top-[1px] flex h-full items-center justify-center mobileMd:-right-10 mobileXl:-right-12">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <button className="hover:cursor-pointer">
                      <Image src={svgHelp} alt="Help" width={32} height={32} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    arrowPadding={5}
                    className="mt-3 w-72 text-balance border-2 border-topbar bg-white px-5 text-center text-xs shadow-md shadow-black/50 xl:-top-full xl:left-10 xl:right-0 2xl:w-80"
                    sideOffset={5}
                  >
                    <TooltipArrow className="z-50" />

                    <p>
                      Para enviar su número de teléfono correctamente deberá{' '}
                      <strong>
                        seleccionar el país en el que está registrado
                      </strong>{' '}
                      y luego su prefijo. Por ejemplo, un número que es de
                      Capital, ingresaría &quot;1108001234&quot;, o si es de La
                      Plata ingresaría &quot;2217654321&quot;.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <button
            type="submit"
            className="w-fit rounded-md bg-topbar px-5 py-1 font-bodoni text-2xl font-bold text-white hover:bg-topbar/80"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default InscripcionBox;
