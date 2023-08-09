import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;
    console.log(userId, name, "test");
    if (!userId) return new Response("Unauthorized", { status: 401 });
    if (!name) return new Response("Name is required", { status: 400 });

    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    });
    return new Response(JSON.stringify(store), { status: 200 });
  } catch (error) {
    console.log("[STORES_POST]", error);
    return new Response("Internal Error", { status: 500 });
  }
}
