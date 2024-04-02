'use client';

import { trpc } from '@/lib/trpc';
import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
import './globals.css';
import Information from '@/components/Information';
import InscripcionBox from '@/components/InscripcionBox';

const Home: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [value, setValue] = useState<string | undefined>('');
  const {
    mutate: crearModelo,
    error,
    status,
  } = trpc.perfil.create.useMutation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // agarrar nombre y telefono del form
    const nombre = event.currentTarget.nombreApellido.value;
    const telefono = event.currentTarget.telefono.value;
    crearModelo({ nombre, telefono });

    // llamar a la funcion de trpc

    setFormSubmitted(true);
    console.log('Formulario enviado');
    if (error && error.data && error.data.code === 'CONFLICT') {
      console.error('Error al crear perfil:', error);
    }
  };

  const telefonoExistente =
    error && error.data && error.data.code === 'CONFLICT';
  return (
    <div className="mx-auto max-w-[800px]">
      <Information />
      <InscripcionBox />
    </div>
  );
};

export default Home;
