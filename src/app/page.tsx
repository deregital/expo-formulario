'use client';

import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';
import Link from 'next/link';
import styles from './styles.module.css';
import Head from 'next/head';
import Image from 'next/image';
import { title } from 'process';
import React, { useState } from 'react';

const Home: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
        <h1>¿Querés desfilar?</h1>
      </div>
    
      <div className={styles.subtitle}>
        <p style={{ marginBottom: '10px' }}>En Expo Desfiles tenemos la oportunidad que estabas esperando.</p>
        <p style={{ marginBottom: '10px' }}>Vas a recibir entrenamientos y vas a poder desfilar ¡GRATIS!</p>
        <p>¿Te interesa? ¡Rellena estos datos para participar!</p>
      </div>

      <div className={styles.form}>
      <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input type="text" id="nombreApellido" name="nombreApellido" placeholder="Nombre/s y Apellido/s" className={styles.inputField} />
          </div>
          <div className={styles.inputGroup}>
            <input type="text" id="numeroTelefono" name="numeroTelefono" placeholder="Número de Teléfono" className={styles.inputField} />
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.submitButton}>ENVIAR</button>
          </div>
          {formSubmitted && <p className={styles.successMessage}>Los datos han sido enviados correctamente</p>}
        </form>
        
      </div>
    </div>
  );
};

export default Home;



    

