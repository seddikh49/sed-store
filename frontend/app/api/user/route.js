export async function POST(request) {
    const userDara = await request.json()
    return Response.json({ data: 'Hola', userDara })
}