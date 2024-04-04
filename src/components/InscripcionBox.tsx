'use client';
import { useFormSend } from '@/components/Modal';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { trpc } from '@/lib/trpc';
import Image from 'next/image';
import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import svgHelp from '../../public/help_expodesfiles.svg';

const InscripcionBox = () => {
  const [telefonoValue, setTelefonoValue] = useState<string | undefined>('');
  const [open, setOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [formSend, setFormSend] = useState(false);

  const handleMouseEnter = () => {
    setPopoverOpen(true);
  };

  const handleMouseLeave = () => {
    setPopoverOpen(false);
  };

  const crearModelo = trpc.perfil.create.useMutation();
  const nombreInputRef = React.useRef<HTMLInputElement>(null);
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!nombreInputRef) return;
    if (!nombreInputRef.current) return;
    setFormSend(true);
    fetch(`https://${process.env.EXPO_MANAGER_URL}/api/formulario`, {
      method: 'POST',
      body: JSON.stringify({
        nombre: nombreInputRef.current.value,
        telefono: telefonoValue,
      }),
    })
      .then(() => {
        // Limpiar el input del telefono
        setTelefonoValue('');
        // Limpiar el input del nombre
        nombreInputRef.current!.value = '';
        setFormSend(false);
        useFormSend.setState({ open: true });
      })
      .catch(() => {
        setFormSend(false);
      });
  }
  useFormSend.subscribe((state) => {
    setOpen(state.open);
  });
  return (
    <div className={`border border-black`}>
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
            ref={nombreInputRef}
            className={`mt-2 w-full rounded-md border-2 border-topbar p-2 ${open ? 'text-topbar/25' : ''}`}
            placeholder="Nombre/s y apellido/s"
            required
          />
          <div className="relative flex w-full flex-col gap-y-1.5 rounded-md border-2 border-topbar px-2 py-1">
            <p className="ml-10 text-xs text-black/50">Número de telefono</p>
            <PhoneInput
              placeholder="Número de Teléfono"
              international
              value={telefonoValue}
              onChange={setTelefonoValue}
              defaultCountry="AR"
              countryCallingCodeEditable={false}
              displayInitialValueAsLocalNumber
              required
            />
            <div className="absolute -right-9 -top-[1px] flex h-full items-center justify-center mobileMd:-right-10 mobileXl:-right-12">
              <Popover open={popoverOpen}>
                <PopoverTrigger
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  asChild
                >
                  <button type="button" className="hover:cursor-pointer">
                    <Image src={svgHelp} alt="Help" width={32} height={32} />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  side="top"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="mt-3 w-72 text-balance border-2 border-topbar bg-white px-5 text-center text-xs shadow-md shadow-black/50 xl:-top-full xl:left-10 xl:right-0 2xl:w-80"
                  sideOffset={5}
                >
                  <p>
                    Para enviar su número de teléfono correctamente deberá{' '}
                    <strong>
                      seleccionar el país en el que está registrado
                    </strong>{' '}
                    y luego su prefijo. Por ejemplo, un número que es de
                    Capital, ingresaría &quot;1108001234&quot;, o si es de La
                    Plata ingresaría &quot;2217654321&quot;.
                  </p>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          {crearModelo.error ? (
            <p className="self-start text-xs font-semibold text-red-500">
              Error al enviar el formulario,{' '}
              {crearModelo.error.message.toLowerCase()}
            </p>
          ) : null}
          <button
            disabled={crearModelo.isPending}
            type="submit"
            className="flex w-fit items-center justify-center gap-x-2 rounded-md bg-topbar px-5 py-1 font-bodoni text-2xl font-bold text-white hover:bg-topbar/80"
          >
            {crearModelo.isPending && (
              <svg
                id="loader"
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 200"
              >
                <radialGradient
                  id="a12"
                  cx=".66"
                  fx=".66"
                  cy=".3125"
                  fy=".3125"
                  gradientTransform="scale(1.5)"
                >
                  <stop offset="0" stopColor="#FFFFFF"></stop>
                  <stop offset=".3" stopColor="#FFFFFF" stopOpacity=".9"></stop>
                  <stop offset=".6" stopColor="#FFFFFF" stopOpacity=".6"></stop>
                  <stop offset=".8" stopColor="#FFFFFF" stopOpacity=".3"></stop>
                  <stop offset="1" stopColor="#FFFFFF" stopOpacity="0"></stop>
                </radialGradient>
                <circle
                  origin="center"
                  fill="none"
                  stroke="url(#a12)"
                  strokeWidth="15"
                  strokeLinecap="round"
                  strokeDasharray="200 1000"
                  strokeDashoffset="0"
                  cx="100"
                  cy="100"
                  r="70"
                >
                  <animateTransform
                    type="rotate"
                    attributeName="transform"
                    calcMode="spline"
                    dur="2"
                    values="360;0"
                    keyTimes="0;1"
                    keySplines="0 0 1 1"
                    repeatCount="indefinite"
                  ></animateTransform>
                </circle>
                <circle
                  origin="center"
                  fill="none"
                  opacity=".2"
                  stroke="#FFFFFF"
                  strokeWidth="15"
                  strokeLinecap="round"
                  cx="100"
                  cy="100"
                  r="70"
                ></circle>
              </svg>
            )}
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default InscripcionBox;
