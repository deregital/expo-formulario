'use client';

import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';
import Link from 'next/link';
import styles from './styles.module.css';
import Head from 'next/head';
import Image from 'next/image';
import { title } from 'process';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import React, { useState } from 'react';

const Home: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [value, setValue] = useState<string | undefined>('');
  const { mutate: crearModelo, error } = trpc.perfil.create.useMutation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // agarrar nombre y telefono del form
    const nombre = event.currentTarget.nombreApellido.value;
    const telefono = event.currentTarget.telefono.value;
    crearModelo({nombre,telefono});


    // llamar a la funcion de trpc

    setFormSubmitted(true);
    console.log('Formulario enviado');
  };
  return (
    <div>
      <Head>
        <title>¿Quieres desfilar?</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.brownBar}>
        <Image src="/images/image.jpg" alt="Imagen" width={100} height={55} />
      </div>

      <div className={styles.header}>
        <h1>
          <i>¿Querés desfilar?</i>
        </h1>
      </div>

      <div className={styles.subtitle}>
        <p style={{ marginBottom: '10px', fontStyle: 'italic' }}>
          En Expo Desfiles tenemos la oportunidad que estabas esperando.
        </p>
        <p style={{ marginBottom: '10px', fontStyle: 'italic' }}>
          Vas a recibir entrenamientos y vas a poder desfilar ¡GRATIS!
        </p>
        <p style={{ fontStyle: 'italic' }}>
          ¿Te interesa? ¡Rellena estos datos para participar!
        </p>
      </div>

      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              id="nombreApellido"
              name="nombreApellido"
              placeholder="Nombre/s y Apellido/s"
              className={styles.inputField}
            />
          </div>

          <div className={styles.inputGroup}>
            <PhoneInput
              placeholder="Número de Teléfono"
              id="telefono"
              international
              value={value}
              onChange={setValue}
              defaultCountry="AR"
              className={styles.inputField}
              countryCallingCodeEditable={false}
              displayInitialValueAsLocalNumber
            />
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.submitButton}>
              ENVIAR
            </button>
          </div>
          {formSubmitted && (
            <p className={styles.successMessage}>
              Los datos han sido enviados correctamente, en unos minutos le
              llegara un mensaje a su WhatssApp. Si no le ha llegado, envie de
              vuelta sus datos...
            </p>
          )}
        </form>
      </div>
      <div className={styles.bottomContent}>
        <div className={styles.helpImageContainer}>
          <Image
            src="/images/signoPregunta.jpg"
            alt="Imagen de ayuda"
            width={50}
            height={50}
          />
          <div className={styles.helpText}>Ayuda</div>
          <div className={styles.hoverText}>
            Para enviar su número de teléfono correctamente deberá seleccionar
            el país en el que está registrado y luego su prefijo SIN espacios,
            guiones o el número 9. Por ejemplo, un número que es de Capital,
            ingresaría “1108001234”, o si es de La Plata ingresaría
            “2217654321”.
          </div>{' '}
          {/* Agregar esta línea */}
        </div>
      </div>
    </div>
  );
};


export default Home;
