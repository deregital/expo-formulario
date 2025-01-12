import { getPassword, getUsername } from '@/server/actions';
import { fetchClient } from '@/server/fetchClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
  try {
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

    const { data: dataGetCountries } = await fetchClient.GET(
      '/location/all-countries',
      {
        headers: {
          Authorization: `Bearer ${dataLogin?.backendTokens.accessToken}`,
        },
      }
    );

    return NextResponse.json({
      dataGetCountries: dataGetCountries?.countries,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al registrarse, por favor contactar con soporte' },
      { status: 500 }
    );
  }
}
