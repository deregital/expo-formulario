'use client';
import { useFormData, useFormSend } from '@/components/Modal';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import Image from 'next/image';
import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import svgHelp from '../../public/help_expodesfiles.svg';
import { getPassword, getUrl, getUsername } from '@/server/actions';
import { cn } from '@/lib/utils';
import { bodoniFont } from '@/lib/fonts';

const InscripcionBox = () => {
  const [telefonoValue, setTelefonoValue] = useState<string | undefined>('');
  const [open, setOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [formSend, setFormSend] = useState(false);

  const handleMouseEnter = () => {
    setPopoverOpen(true);
  };

  const handleMouseLeave = () => {
    setPopoverOpen(false);
  };

  const nombreInputRef = React.useRef<HTMLInputElement>(null);
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!nombreInputRef) return;
    if (!nombreInputRef.current) return;
    setFormSend(true);
    useFormData.setState({ nombreCompleto: nombreInputRef.current.value });
    const expo_manager_url = await getUrl();
    const expo_manager_username = await getUsername();
    const expo_manager_password = await getPassword();
    await fetch(`${expo_manager_url}/api/formulario`, {
      method: 'POST',
      body: JSON.stringify({
        nombreCompleto: nombreInputRef.current.value,
        telefono: telefonoValue,
        username: expo_manager_username,
        password: expo_manager_password,
      }),
    })
      .then(async (response) => {
        setError(undefined);
        setFormSend(false);
        if (response.status !== 200 && response.status !== 201) {
          const error = await response.json();
          setError(error.error.toLowerCase());
        } else {
          setError(undefined);
          useFormSend.setState({ open: true });
          nombreInputRef.current!.value = '';
          setTelefonoValue('');
        }
      })
      .catch((error) => {
        setFormSend(false);
        setError(error.message);
      });
  }
  useFormSend.subscribe((state) => {
    setOpen(state.open);
  });
  return (
    <div className={`mt-10 border border-black bg-white sm:mt-0`}>
      <div className="w-full bg-topbar">
        <p className="py-1 text-center text-sm text-white md:text-base">
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
            maxLength={100}
            className={`mt-2 w-full rounded-md border-2 border-topbar p-2 ${open ? 'text-topbar/25' : ''}`}
            placeholder="Nombre/s y apellido/s"
            pattern="[a-zA-ZÀ-ÿ\u00f1\u00d1áéíóúÁÉÍÓÚ]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1áéíóúÁÉÍÓÚ]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1áéíóúÁÉÍÓÚ]+"
            title="Ingrese solo letras y espacios"
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
              maxLength={19}
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
                    Capital, ingresaría &quot;91108001234&quot;, o si es de La
                    Plata ingresaría &quot;2217654321&quot;.
                  </p>
                </PopoverContent>
              </Popover>
            </div>
          </div>
  
          <input
            type="text"
            autoComplete="off"
            name="dni"
            id="dni"
            maxLength={10}
            pattern="\d*"
            title="Ingrese solo números"
            className="w-full rounded-md border-2 border-topbar p-2"
            placeholder="DNI"
            required
          />
  
          <select
            name="genero"
            id="genero"
            className="w-full rounded-md border-2 border-topbar p-2"
            required
          >
            <option value="" disabled selected>
              Selecciona tu género
            </option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
  
          <input
            type="email"
            autoComplete="off"
            name="mail"
            id="mail"
            className="w-full rounded-md border-2 border-topbar p-2"
            placeholder="Correo electrónico"
            title="El correo electrónico debe contener un '@'."
            required
          />
  
          <input
            type="text"
            autoComplete="off"
            name="instagram"
            id="instagram"
            className="w-full rounded-md border-2 border-topbar p-2"
            placeholder="Instagram"
            required
          />
  
          {error ? (
            <p className="self-start text-xs font-semibold text-red-500">
              Error al enviar el formulario, {error}
            </p>
          ) : null}
          <button
            disabled={formSend}
            type="submit"
            className={cn(
              'flex w-fit items-center justify-center gap-x-2 rounded-md bg-topbar px-5 py-1 text-2xl font-bold text-white hover:bg-topbar/80',
              bodoniFont.className
            )}
          >
            {formSend && (
              <>
                <svg
                  aria-hidden="true"
                  className="h-8 w-8 animate-spin fill-gray-900 text-gray-200 dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Cargando...</span>
              </>
            )}
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default InscripcionBox;
