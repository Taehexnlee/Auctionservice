import { auth } from "@/auth";
import { Bid } from "@/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { auctionId, amount } = await req.json();

    if (!auctionId || typeof amount !== "number") {
      return NextResponse.json(
        { message: "auctionId and amount are required" },
        { status: 400 }
      );
    }

    const session = await auth();
    if (!session?.accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(
      `http://localhost:6001/bids?auctionId=${auctionId}&amount=${amount}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        cache: "no-store",
      }
    );

    let data: any = null;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      const message = data?.message || response.statusText;
      return NextResponse.json(
        { message },
        { status: response.status || 400 }
      );
    }

    return NextResponse.json(data as Bid);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to place bid" },
      { status: 500 }
    );
  }
}
