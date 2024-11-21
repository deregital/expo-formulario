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
import { useRef, useState, useEffect, useMemo } from 'react';
import PhoneInput from 'react-phone-number-input';
import svgHelp from '../../public/help_expodesfiles.svg';
import {
  Country,
  ICountry,
  IState,
  State,
} from 'country-state-city';
import { fetchClient } from '@/server/fetchClient';
import { LocalidadesJson } from '@/server';
import { TRPCError } from '@trpc/server';

const InscripcionBox = () => {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>('');
  const [phoneParsed, setPhoneParsed] = useState<string | undefined>(
    ''
  );
  const [secondaryPhoneNumberVisible, setSecondaryPhoneNumberVisible] =
    useState(false);
  const [secondaryPhoneNumberValue, setSecondaryPhoneNumberValue] = useState<
    string | undefined
  >('');
  const [open, setOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [countries, setCountries] = useState<NonNullable<ICountry[]>>([]);
  const [states, setStates] = useState<NonNullable<IState[]>>([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [argentineProvinces, setArgentineProvinces] = useState<
    NonNullable<IState[]>
  >(State.getStatesOfCountry('AR'));
  const [selectedArgentineProvince, setSelectedArgentineProvince] =
    useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const citiesData = useMemo(() => {
    const localidades: LocalidadesJson = require('../lib/localidades.json');
    const localidadesByState = localidades.localidades.filter((localidad) => localidad.provincia.nombre === selectedArgentineProvince);
    return localidadesByState.map((localidad) => {
      return {
        id: localidad.id,
        nombre: localidad.nombre,
        centroide: localidad.centroide,
      }
    });
  }, [selectedArgentineProvince]);

  const formRef = useRef<HTMLFormElement>(null);

  const handleMouseEnter = () => {
    setPopoverOpen(true);
  };

  const handleMouseLeave = () => {
    setPopoverOpen(false);
  };

  const toggleTelefonoSecundario = () => {
    setSecondaryPhoneNumberVisible(!secondaryPhoneNumberVisible);
    if (!secondaryPhoneNumberVisible) {
      setSecondaryPhoneNumberValue('');
    }
  };

  useEffect(() => {
    const countries = Country.getAllCountries().filter((country) => country.name !== 'Palestinian Territory Occupied');
    setCountries(countries);
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
    const fullName = formData.get('nombreApellido') as string | null;
    const phoneNumber = phoneParsed;
    const secondaryPhoneNumber = secondaryPhoneNumberVisible
      ? secondaryPhoneNumberValue
      : undefined;
    const dni = (formData.get('dni') ?? null) as string | null;
    const gender = (formData.get('genero') ?? null) as string | null;
    const mail = (formData.get('mail') ?? null) as string | null;
    const fechaNacimientoString = formData.get('fechaNacimiento') as
      | string
      | null;
    const instagramFull = (formData.get('instagram') ?? null) as string | null;
    const instagram = instagramFull
      ? instagramFull.startsWith('@')
        ? instagramFull.slice(1)
        : instagramFull
      : '';

    const fechaNacimiento = fechaNacimientoString
      ? new Date(
          new Date(fechaNacimientoString).getTime() +
            Math.abs(
              new Date(fechaNacimientoString).getTimezoneOffset() * 60000
            )
        ).toISOString()
      : undefined;

    const expo_manager_url = await getUrl();
    const expo_manager_username = await getUsername();
    const expo_manager_password = await getPassword();
    const accessToken = "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..kHuHnC2OfXynBpqh.XX1OT_CHupVnP_5GjrNhcXqPhVM_yg9gpPdznxXnGSFigDeDR6lMOpJ1HvfChP4I337JClXy3jkL_4ilU_hPUGYmwqd2b3giAff0pk50D1FdYsLDsBz1kNv5VMgKTyd7Mg0zztlKtf9Sj4CHwYj-TMn-BwHjtxyNsqDaJ-gzotc4MiTPzelY12ySK3Sihmn8biIBaKlMAZhkv2ObTdAB3vGSRd3qPXja1O5rRmL0A6ERKBLYExK4M6tSFn65Rq7sZXnG2DYWS2u_P2WhwPGwCWaf7N4Ty52rqUQfthprJmLyi8U-sOQEdNo9ymFWvGpeV-3Aw2RDj-DL9gs3wn5sgQstBtMCJNB_l972qRp-sVlgJwnL4GB93azGnxsJPJkVDb3N5_piFfSppGVgS7Sg88qUVuusjBdA_SyTlYqwr-aEacq_tldQVH7eNhe7gLN3WwWMXgMP3h1naNx1kk6MShbUs7c31WZcudzuE5hzZl-uROGxhJLHHjvIyjZSo9xgkwzRbHNC9b5CyYShpIrR_9Y8XylMNLT4tQgD0qAZkSSCU8v6YCGI-ww6Bvf5ZmZR11RkhxrKj_AANsY-AyZUixjMXSj9gqWjQQ93pVekhxSa28dbBeTm8pEryWev5BCUuYjuLpEVn58SsDLtM-44iYE5CTZvgUdy7WRy83kE6Ger-GPLc1xerCbRZeZllo6unIyhX8dNrNUmojPnzPFAtbY7clv4jzbPwu2eJ9Mv6UCfjjSG16pTdzufCiVYM7QA6csV46pc-bOpnnE-CyXss3NiTQoPydP1htrXKzwCCeYHVV2pevMQ1V4fjb1IErg1kODUXpdMJ0RJiPCxlxO_UwBYQr-RiYhbIwAYX-4iXJb_LSrudHYv9644QI9hVUDecJZqhLv2BLmDn4oNmcdPpIV00zzEsMrQl9m5T9c7ktYhLu8r0OmuCE-Di6fukaVjmf_hUvvrh87sY00aoSLZmpaUWddmvxNSfNxjatnSL3oieTi886erfFezNzd4O9mm15Zb8UvG4479ZBqq6zYHHMjPTPBb0MX6zK0lvrYDuqkxu4HhLYx65AtRDmUCN1Wc6Ay_lZQQh7b_63O_UJy5zj0HOxyVOM7IzRD9HlnRajz2uA.t0P5Y-6nx56sGuV39jXGjg"
    const accessToken2 = "f4bb85ae414195c78d49d59ff3877a9f4c0f7b74c9b645cf71b1c694f78aabe2%7C4e6634b5c24feca3aae57f596df1197f7736561d40ab9203e19a81bbf7600d38"
    const { error } = await fetchClient.POST('/profile/create', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: {
        profile: {
          birthDate: fechaNacimiento ?? null,
          dni: dni ?? null,
          fullName: fullName ?? '',
          gender: gender ?? null,
          instagram: instagram ?? null,
          mail: mail ?? null,
          phoneNumber: phoneNumber ?? '',
          secondaryPhoneNumber: secondaryPhoneNumber ?? null,
          alternativeNames: [],
          profilePictureUrl: null,
          residence: {
            city: selectedCity ?? '',
            country: selectedCountry ?? '',
            latitude: citiesData?.find((city) => city.nombre === selectedCity)?.centroide.lat ?? 0,
            longitude: citiesData?.find((city) => city.nombre === selectedCity)?.centroide.lon ?? 0,
            state: selectedState ?? '',
          }
        }
      }
    })
    useFormData.setState({ fullName: fullName ?? '' });
    setError(undefined);
    if (error) {
      console.log(error.message);
      console.log(error.error);
      setError(error.error);
    } else {
      useFormSend.setState({ open: true });
      formRef.current?.reset();
      setPhoneParsed('');
      setPhoneNumber(undefined);
      setSecondaryPhoneNumberVisible(false);
      setSelectedCountry('');
      setSelectedState('');
    }
    // .then(async (response) => {
    //   useFormData.setState({ fullName: fullName ?? '' });
    //   setError(undefined);
    //   if (response.response.status !== 200 && response.response.status !== 201) {
    //     const error = await response.response.json();
    //     const resError = Array.isArray(error.error)
    //       ? error.error[0].message
    //       : error.error;
    //     setError(resError);
    //   } else {
    //     setError(undefined);
    //     useFormSend.setState({ open: true });
    //     formRef.current?.reset();
    //     setPhoneParsed('');
    //     setPhoneNumber(undefined);
    //     setSecondaryPhoneNumberVisible(false);
    //     setSelectedCountry('');
    //     setSelectedState('');
    //   }
    // })
    // .catch((error) => {
    //   setError(error.message);
    // });
    // await fetch(`${expo_manager_url}/api/formulario`, {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     username: expo_manager_username,
    //     password: expo_manager_password,
    //     fullName,
    //     telefono,
    //     telefonoSecundario: telefonoSecundario || undefined,
    //     dni: dni !== '' ? dni : undefined,
    //     mail: mail !== '' ? mail : undefined,
    //     genero: genero ?? undefined,
    //     fechaNacimiento: fechaNacimiento ?? undefined,
    //     instagram: instagram !== '' ? instagram : undefined,
    //     pais: selectedCountry,
    //     provincia: selectedState,
    //     provinciaArgentina: selectedArgentineProvince,
    //     localidad:
    //       citiesData && {
    //         nombre: citiesData.find((city) => city.nombre === selectedCity)?.nombre,
    //         latitud: citiesData.find((city) => city.nombre === selectedCity)?.centroide.lat,
    //         longitud: citiesData.find((city) => city.nombre === selectedCity)?.centroide.lon,
    //       },
    //   }),
    // })
    //   .then(async (response) => {
    //     useFormData.setState({ fullName: fullName ?? '' });
    //     setError(undefined);
    //     if (response.status !== 200 && response.status !== 201) {
    //       const error = await response.json();
    //       const resError = Array.isArray(error.error)
    //         ? error.error[0].message
    //         : error.error;
    //       setError(resError);
    //     } else {
    //       setError(undefined);
    //       useFormSend.setState({ open: true });
    //       formRef.current?.reset();
    //       setTelefonoParseado('');
    //       setTelefonoValue(undefined);
    //       setTelefonoSecundarioVisible(false);
    //       setSelectedCountry('');
    //       setSelectedState('');
    //     }
    //   })
    //   .catch((error) => {
    //     setError(error.message);
    //   });
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
              value={phoneNumber}
              onChange={(value) => {
                if (!value) {
                  setPhoneNumber('');
                  return;
                }
                try {
                  const parsed = parsePhoneNumber(value);
                  if (parsed) {
                    const telefonoCon9 =
                      parsed.countryCallingCode === '54' &&
                      !parsed.nationalNumber.startsWith('9')
                        ? parsed.countryCallingCode +
                          '9' +
                          parsed.nationalNumber
                        : value;
                    setPhoneParsed(telefonoCon9);
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
                className="text-xl font-bold hover:cursor-pointer"
                title={
                  secondaryPhoneNumberVisible
                    ? 'Ocultar teléfono secundario'
                    : 'Agregar teléfono secundario'
                }
              >
                {secondaryPhoneNumberVisible ? '-' : '+'}
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
                    <strong>
                      seleccionar el país en el que está registrado
                    </strong>{' '}
                    y luego su prefijo.
                  </p>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {secondaryPhoneNumberVisible && (
            <div className="relative flex w-full flex-col gap-y-1.5 rounded-md border-2 border-topbar px-2 py-1">
              <p className="ml-10 text-xs text-black/50">
                Número de teléfono secundario
              </p>
              <PhoneInput
                placeholder="Número de Teléfono Secundario"
                international
                value={secondaryPhoneNumberValue}
                onChange={(value) => {
                  setSecondaryPhoneNumberValue(value);
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
            <h3 className="mb-1 text-base">Nacionalidad</h3>
            <div className="flex w-full flex-col items-center justify-between gap-y-2 md:flex-row md:gap-y-0">
              <select
                name="country"
                id="country"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full rounded-md border-2 border-topbar p-2 md:w-[48%]"
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
                className="w-full rounded-md border-2 border-topbar p-2 md:w-[48%]"
                disabled={!selectedCountry}
                required
              >
                <option value="">Selecciona tu provincia</option>
                {states
                  .sort((a, b) => {
                    return a.name.localeCompare(b.name);
                  })
                  .map((state) => (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          {/* Lugar de residencia seleccionando Provincia y Localidad siendo el país Argentina */}
          <div className="w-full">
            <h3 className="mb-1 text-base">Lugar de residencia (Argentina)</h3>
            <div className="flex w-full flex-col items-center justify-between gap-y-2 md:flex-row md:gap-y-0">
              <select
                name="argentineProvince"
                id="argentineProvince"
                value={selectedArgentineProvince}
                onChange={(e) => {
                  setSelectedArgentineProvince(e.target.value);
                  setSelectedCity('');
                }}
                className="w-full rounded-md border-2 border-topbar p-2 md:w-[48%]"
                required
              >
                <option value="">Selecciona tu provincia</option>
                {argentineProvinces.map((province) => (
                  <option key={province.isoCode} value={province.name}>
                    {province.name}
                  </option>
                ))}
              </select>

              <select
                name="city"
                id="city"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full rounded-md border-2 border-topbar p-2 md:w-[48%]"
                disabled={!selectedArgentineProvince}
                required={selectedCity !== ''}
              >
                <option value="">Selecciona tu localidad</option>
                {citiesData &&
                  citiesData
                    .sort((a, b) => {
                      return a.nombre.localeCompare(b.nombre);
                    })
                    .map((city) => (
                      <option key={city.id} value={city.nombre}>
                        {city.nombre}
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
