import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const response = await fetch("http://127.0.0.1:8000/get-all-items");

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error proxying to backend:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
