import { db } from '../../../lib/db';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

interface WebhookData {
  id: string;
  email_addresses: { email_address: string }[];
  first_name: string;
  image_url?: string;
}

export async function POST(req: Request): Promise<NextResponse> {
  const webhookSecret = process.env.WEBHOOK_SECRET;

  const signature = req.headers.get('svix-signature');
  const rawBody = await req.text();

  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret!)
    .update(rawBody)
    .digest('hex');

  if (signature !== expectedSignature) {
    console.error('Invalid signature');
    return new NextResponse('Invalid signature', { status: 403 });
  }

  try {
    const body = JSON.parse(rawBody) as { data: WebhookData };
    const { id, email_addresses, first_name, image_url } = body.data;

    if (!id || !email_addresses || !email_addresses[0]?.email_address) {
      return new NextResponse('Invalid request body', { status: 400 });
    }

    await db.user.upsert({
      where: { clerkId: id },
      update: {
        email: email_addresses[0].email_address,
        name: first_name,
        profileImage: image_url || 'default_image_url.png',
      },
      create: {
        clerkId: id,
        email: email_addresses[0].email_address,
        name: first_name || '',
        profileImage: image_url || 'default_image_url.png',
      },
    });

    return new NextResponse('User created/updated successfully', { status: 200 });
  } catch (error) {
    console.error('Error creating/updating user:', error);
    return new NextResponse('Error processing request', { status: 500 });
  }
}