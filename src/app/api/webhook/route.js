import { db } from "@/lib/firebase";
import { ref, set } from "firebase/database";

export async function POST(req) {
  try {
    const body = await req.json();

    // if (body.object === "user") {
    const {
      id,
      first_name,
      last_name,
      email_addresses,
      phone_numbers,
      public_metadata,
    } = body;

    console.log(body);
    console.log({
      id,
      first_name,
      last_name,
      email_addresses,
      phone_numbers,
      public_metadata,
    });

    const userData = {
      clerkId: id,
      name: `${first_name} ${last_name}`,
      email: email_addresses[0]?.email_address || null,
      phone: phone_numbers[0]?.phone_number || null,
      address: public_metadata?.address || null,
    };

    // Save user data to the Realtime Database
    await set(ref(db, "users/" + id), userData);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
    // } else {
    //   return new Response(JSON.stringify({ error: "Invalid object type" }), {
    //     status: 400,
    //   });
    // }
  } catch (error) {
    console.error("Error handling webhook:", error);
    return new Response(JSON.stringify({ error: "Internal-Server Error" }), {
      status: 500,
    });
  }
}
