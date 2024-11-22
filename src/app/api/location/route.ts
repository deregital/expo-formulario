import { getPassword, getUrl, getUsername } from "@/server/actions";
import { fetchClient } from "@/server/fetchClient";
import { createProfileSchema } from "expo-backend-types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const dataPost = await req.json();
    const expo_manager_username = await getUsername();
    const expo_manager_password = await getPassword();

    if (!expo_manager_username || !expo_manager_password) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: dataLogin, error: errorLogin } = await fetchClient.POST('/auth/login', {
      body: {
        password: expo_manager_password,
        username: expo_manager_username,
      }
    })

    if (errorLogin) {
      const messageString = errorLogin.message[0]
      return NextResponse.json({ error: messageString }, { status: errorLogin.statusCode });
    }

    const { error: errorGetCities, data: dataGetCities } = await fetchClient.GET('/location/find-cities-by-arg-state/{argState}', {
      params: {
        path: {
          argState: dataPost.argState
        }
      },
      headers: {
        Authorization: `Bearer ${dataLogin?.backendTokens.accessToken}`,
      },
    });

    if (errorGetCities) {
      const messageString = errorGetCities.message[0]

      return NextResponse.json({ error: messageString }, { status: errorGetCities.statusCode });
    }

    return NextResponse.json({
      cities: dataGetCities.cities
    });

  } catch (error) {
    return NextResponse.json({ error: 'Error al registrarse, por favor contactar con soporte' }, { status: 500 });
  }
}