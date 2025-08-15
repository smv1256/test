import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import { adminDB } from "@/backend/lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    const { id } = evt.data;
    const eventType = evt.type;

    switch (eventType) {
        case "user.created": 
            try {
              if (evt.data.email_addresses[0].email_address && evt.data.id) {
                console.log("AAAAAA user created");
                
                const user = adminDB.collection("users").doc(evt.data.id);
                await user.set({
                    email: evt.data.email_addresses[0].email_address,
                    username: evt.data.username,
                    createdAt: new Date(),
                }); 
              }
            } catch { 
              console.log("No email address, but user.created webhook caught");
              return new Response("No email address, but webhook caught", { status: 200 }); 
            }
            break;
        case "user.updated": 
            console.log("BBBBBB user updated");
            break;
        case "user.deleted": 
        try {
              if (evt.data.id) {   
                console.log("CCCCC user deleted");

                const user = adminDB.collection("users").doc(evt.data.id);
                await user.delete();
              } 
          } catch {
              console.log("Test user.deleted webhook caught")
              return new Response("Test user.deleted webhook caught", { status: 200 }); 
          }
            break;
    }

    console.log(`Webhook ID: ${id} \n Event type: ${eventType}`);
    console.log("Webhook payload:", evt.data);

    return new Response("Webhook received", { status: 200 });
    // return { id };
  } catch (err) {
    console.error("Error", err);
    return new Response("Error", { status: 400 });
  }
}
