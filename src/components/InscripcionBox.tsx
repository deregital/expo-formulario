'use client'
import Image from 'next/image';
import { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import svgHelp from '../../public/help_expodesfiles.svg';

const InscripcionBox = () => {
    const [value, setValue] = useState<string | undefined>('');
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const nombre = event.currentTarget.nombreApellido.value;
        console.log(nombre, value);
    }
    return (
        <div className="border border-black mb-10">
            <div className="bg-topbar w-full">
                <p className="text-center py-1 text-white font-poppins">Rellená estos datos para participar</p>
            </div>
            <div>
                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-y-4 p-4 max-w-xl mx-auto">
                    <input type="text" name="nombreApellido" id="nombreApellido" className="border-2 border-topbar rounded-md p-2 mt-2 w-full" placeholder="Nombre/s y apellido/s" required />
                    <div className='border-2 border-topbar rounded-md px-2 py-1 flex flex-col gap-y-1.5 w-full relative'>
                        <p className='text-xs text-black/50 ml-10'>Número de telefono</p>
                        <PhoneInput placeholder="Número de Teléfono"
                                    international
                                    value={value}
                                    onChange={setValue}
                                    defaultCountry= "AR"
                                    countryCallingCodeEditable={false}
                                    displayInitialValueAsLocalNumber 
                                    className="" required />
                        <div className='absolute flex justify-center items-center h-full -top-[1px] -right-12'>
                            <Image src={svgHelp} alt="Help" width={30} height={30} />
                        </div>
                    </div>
                    <button type="submit" className="bg-topbar font-bodoni font-bold text-2xl text-white rounded-md px-5 py-1 w-fit">Enviar</button>
                </form>
            </div>
        </div>
    )
}

export default InscripcionBox;