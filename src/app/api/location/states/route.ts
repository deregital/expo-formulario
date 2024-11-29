import { getPassword, getUsername } from "@/server/actions";
import { fetchClient } from "@/server/fetchClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { countryCode } = body;

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

    const { data: dataGetStates, error: errorGetStates } = await fetchClient.GET('/location/states-by-country/{countryCode}', {
      headers: {
        Authorization: `Bearer ${dataLogin?.backendTokens.accessToken}`,
      },
      params: {
        path: {
          countryCode: countryCode
        }
      }
    })

    if (errorGetStates) {
      const messageString = errorGetStates.message[0]
      return NextResponse.json({ error: messageString }, { status: errorGetStates.statusCode });
    }

    return NextResponse.json({
      dataGetStates: dataGetStates?.states
    });

  } catch (error) {
    return NextResponse.json({ error: 'Error al registrarse, por favor contactar con soporte' }, { status: 500 });
  }
}