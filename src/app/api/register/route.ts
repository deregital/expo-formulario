import { getPassword, getUrl, getUsername } from '@/server/actions';
import { fetchClient } from '@/server/fetchClient';
import { createProfileSchema } from 'expo-backend-types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const dataPost = await req.json();

    const {
      success,
      data: parsedData,
      error: zodError,
    } = createProfileSchema.safeParse(dataPost);

    if (!success) {
      const messageString = zodError.errors[0].message;

      console.log('Zod Error:', zodError);

      return NextResponse.json({ error: messageString }, { status: 400 });
    }

    const { profile } = parsedData;

    const {
      birthDate,
      dni,
      fullName,
      gender,
      instagram,
      mail,
      phoneNumber,
      residence,
      secondaryPhoneNumber,
      birth,
    } = profile;

    const expo_manager_username = await getUsername();
    const expo_manager_password = await getPassword();

    if (!expo_manager_username || !expo_manager_password) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: dataLogin, error: errorLogin } = await fetchClient.POST(
      '/auth/login',
      {
        body: {
          password: expo_manager_password,
          username: expo_manager_username,
        },
      }
    );

    if (errorLogin) {
      const messageString = errorLogin.message[0];
      return NextResponse.json(
        { error: messageString },
        { status: errorLogin.statusCode }
      );
    }

    const { error: errorCreate, data: dataCreate } = await fetchClient.POST(
      '/profile/create',
      {
        headers: {
          Authorization: `Bearer ${dataLogin?.backendTokens.accessToken}`,
        },
        body: {
          profile: {
            birthDate: birthDate?.toISOString() ?? null,
            dni: dni ?? null,
            fullName: fullName ?? '',
            gender: gender ?? null,
            instagram: instagram ?? null,
            mail: mail ?? null,
            phoneNumber: phoneNumber ?? '',
            secondaryPhoneNumber: secondaryPhoneNumber ?? null,
            alternativeNames: [],
            profilePictureUrl: null,
            residence: residence,
            birth: birth,
            password: null, // Password is not required for profile creation
            username: null, // Username is not required for profile creation
          },
        },
      }
    );

    if (errorCreate) {
      const messageString = errorCreate.message[0];

      return NextResponse.json(
        { error: messageString },
        { status: errorCreate.statusCode }
      );
    }

    return NextResponse.json({
      dataCreate,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al registrarse, por favor contactar con soporte' },
      { status: 500 }
    );
  }
}
