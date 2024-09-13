'use client';
import InstagramIcon from '@/components/icons/InstagramIcon';
import MailIcon from '@/components/icons/MailIcon';
import { useFormData, useFormSend } from '@/components/Modal';
import SubmitButton from '@/components/SubmitButton';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { getPassword, getUrl, getUsername } from '@/server/actions';
import { parsePhoneNumber } from 'libphonenumber-js';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import PhoneInput from 'react-phone-number-input';
import svgHelp from '../../public/help_expodesfiles.svg';
import { Country, ICountry, IState, State } from 'country-state-city';

const InscripcionBox = () => {
  const [telefonoValue, setTelefonoValue] = useState<string | undefined>('');
  const [telefonoParseado, setTelefonoParseado] = useState<string | undefined>('');
  const [telefonoSecundarioVisible, setTelefonoSecundarioVisible] = useState(false);
  const [telefonoSecundarioValue, setTelefonoSecundarioValue] = useState<string | undefined>('');
  const [open, setOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [countries, setCountries] = useState<NonNullable<ICountry[]>>([]);
  const [states, setStates] = useState<NonNullable<IState[]>>([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');

  const formRef = useRef<HTMLFormElement>(null);

  const handleMouseEnter = () => {
    setPopoverOpen(true);
  };

  const handleMouseLeave = () => {
    setPopoverOpen(false);
  };

  const toggleTelefonoSecundario = () => {
    setTelefonoSecundarioVisible(!telefonoSecundarioVisible);
    if (!telefonoSecundarioVisible) {
      setTelefonoSecundarioValue(''); 
    }
  };

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry));
    } else {
      setStates([]);
    }
    setSelectedState('');
  }, [selectedCountry]);

  async function handleSubmit(formData: FormData) {
    const nombreCompleto = formData.get('nombreApellido') as string | null;
    const telefono = telefonoParseado;
    const telefonoSecundario = telefonoSecundarioVisible ? telefonoSecundarioValue : undefined;
    const dni = (formData.get('dni') ?? null) as string | null;
    const genero = (formData.get('genero') ?? null) as string | null;
    const mail = (formData.get('mail') ?? null) as string | null;
    const fechaNacimientoString = formData.get('fechaNacimiento') as string | null;
    const instagramFull = (formData.get('instagram') ?? null) as string | null;
    const instagram = instagramFull ? (instagramFull.startsWith('@') ? instagramFull.slice(1) : instagramFull) : '';
    const country = selectedCountry;
    const state = selectedState;

    const fechaNacimiento = fechaNacimientoString
      ? new Date(
          new Date(fechaNacimientoString).getTime() +
            Math.abs(new Date(fechaNacimientoString).getTimezoneOffset() * 60000)
        ).toISOString()
      : undefined;

    const expo_manager_url = await getUrl();
    const expo_manager_username = await getUsername();
    const expo_manager_password = await getPassword();

    await fetch(`${expo_manager_url}/api/formulario`, {
      method: 'POST',
      body: JSON.stringify({
        username: expo_manager_username,
        password: expo_manager_password,
        nombreCompleto,
        telefono,
        telefonoSecundario: telefonoSecundario || undefined,
        dni: dni !== '' ? dni : undefined,
        mail: mail !== '' ? mail : undefined,
        genero: genero ?? undefined,
        fechaNacimiento: fechaNacimiento ?? undefined,
        instagram: instagram !== '' ? instagram : undefined,
        country,
        state,
      }),
    })
      .then(async (response) => {
        useFormData.setState({ nombreCompleto: nombreCompleto ?? '' });
        setError(undefined);
        if (response.status !== 200 && response.status !== 201) {
          const error = await response.json();
          const resError = Array.isArray(error.error)
            ? error.error[0].message
            : error.error;
          setError(resError);
        } else {
          setError(undefined);
          useFormSend.setState({ open: true });
          formRef.current?.reset();
          setTelefonoParseado('');
          setTelefonoValue(undefined);
          setTelefonoSecundarioVisible(false); 
          setSelectedCountry('');
          setSelectedState('');
        }
      })
      .catch((error) => {
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
          action={handleSubmit}
          ref={formRef}
          className="mx-auto flex max-w-[240px] flex-col items-center gap-y-4 p-4 mobileMd:max-w-[280px] mobileLg:max-w-[330px] mobileXl:max-w-[400px] sm:max-w-lg md:max-w-xl"
        >
          <input
            type="text"
            autoComplete="off"
            name="nombreApellido"
            id="nombreApellido"
            maxLength={100}
            className={`mt-2 w-full rounded-md border-2 border-topbar p-2 ${
              open ? 'text-topbar/25' : ''
            }`}
            placeholder="Nombre/s y apellido/s"
            pattern="[a-zA-ZÀ-ÿ\u00f1\u00d1áéíóúÁÉÍÓÚ]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1áéíóúÁÉÍÓÚ]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1áéíóúÁÉÍÓÚ]+"
            title="Ingrese solo letras y espacios"
            required
          />

          <div className="relative flex w-full flex-col gap-y-1.5 rounded-md border-2 border-topbar px-2 py-1">
            <p className="ml-10 text-xs text-black/50">Número de teléfono</p>
            <PhoneInput
              placeholder="Número de Teléfono"
              international
              value={telefonoValue}
              onChange={(value) => {
                if (!value) {
                  setTelefonoValue('');
                  return;
                }
                try {
                  const parsed = parsePhoneNumber(value);
                  if (parsed) {
                    const telefonoCon9 =
                      parsed.countryCallingCode === '54' &&
                      !parsed.nationalNumber.startsWith('9')
                        ? parsed.countryCallingCode + '9' + parsed.nationalNumber
                        : value;
                    setTelefonoParseado(telefonoCon9);
                  }
                } catch (error) {
                  console.log(value, error);
                }
              }}
              defaultCountry="AR"
              countryCallingCodeEditable={false}
              maxLength={19}
              displayInitialValueAsLocalNumber
              required
            />

            <div className="absolute -right-9 -top-[1px] flex h-full items-center justify-center mobileMd:-right-10 mobileXl:-right-12">
              <button
                type="button"
                onClick={toggleTelefonoSecundario}
                className="hover:cursor-pointer text-xl font-bold"
                title={telefonoSecundarioVisible ? "Ocultar teléfono secundario" : "Agregar teléfono secundario"}
              >
                {telefonoSecundarioVisible ? '-' : '+'}
              </button>
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
                    <strong>seleccionar el país en el que está registrado</strong> y
                    luego su prefijo.
                  </p>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {telefonoSecundarioVisible && (
            <div className="relative flex w-full flex-col gap-y-1.5 rounded-md border-2 border-topbar px-2 py-1">
              <p className="ml-10 text-xs text-black/50">Número de teléfono secundario</p>
              <PhoneInput
                placeholder="Número de Teléfono Secundario"
                international
                value={telefonoSecundarioValue}
                onChange={(value) => {
                  setTelefonoSecundarioValue(value);
                }}
                defaultCountry="AR"
                countryCallingCodeEditable={false}
                maxLength={19}
                displayInitialValueAsLocalNumber
              />
            </div>
          )}

          <input
            type="text"
            autoComplete="off"
            name="dni"
            id="dni"
            pattern="\d*"
            title="Ingrese solo números"
            className="w-full rounded-md border-2 border-topbar p-2"
            placeholder="DNI"
            required
          />

          <div className="relative flex w-full flex-col gap-y-1.5 rounded-md border-2 border-topbar px-2 py-1">
            <p className="ml-2 text-xs text-black/50">Fecha de Nacimiento</p>
            <input
              type="date"
              name="fechaNacimiento"
              id="fechaNacimiento"
              className="w-full rounded-md border-none p-1 text-sm"
              title="Fecha de Nacimiento"
              required
            />
          </div>

          <select
            name="genero"
            id="genero"
            defaultValue="vacio"
            className="w-full rounded-md border-2 border-topbar p-2"
            required
          >
            <option value="vacio" disabled>
              Selecciona tu género
            </option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>

          <div className="relative w-full">
            <MailIcon className="absolute inset-y-[50%] left-2 h-6 w-6 -translate-y-1/2 text-topbar" />
            <input
              type="email"
              autoComplete="off"
              name="mail"
              id="mail"
              className="peer w-full rounded-md border-2 border-topbar p-2 pl-10"
              placeholder="Correo electrónico"
              title="El correo electrónico debe contener un '@'."
              required
            />
          </div>

          <div className="relative w-full">
            <InstagramIcon className="absolute inset-y-[50%] left-2 h-6 w-6 -translate-y-1/2 text-topbar" />
            <input
              type="text"
              autoComplete="off"
              name="instagram"
              id="instagram"
              className="peer w-full rounded-md border-2 border-topbar p-2 pl-10"
              placeholder="Instagram"
            />
          </div>
          {/* Nacionalidad con Select para País y Provincia */}
          <div className="w-full">
            <h3 className="text-base mb-1">Nacionalidad</h3>
            <div className="flex flex-col md:flex-row w-full justify-between items-center gap-y-2 md:gap-y-0">
              <select
                name="country"
                id="country"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full md:w-[48%] rounded-md border-2 border-topbar p-2"
                required
              >
                <option value="">Selecciona tu país</option>
                {countries.map((country) => (
                  <option key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </option>
                ))}
              </select>

              <select
                name="state"
                id="state"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full md:w-[48%] rounded-md border-2 border-topbar p-2"
                disabled={!selectedCountry}
                required
              >
                <option value="">Selecciona tu provincia/estado</option>
                {states.map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {error && (
            <p className="self-start text-xs font-semibold text-red-500">
              Error al enviar el formulario, {error}
            </p>
          )}

          <SubmitButton />
        </form>
      </div>
    </div>
  );
};

export default InscripcionBox;