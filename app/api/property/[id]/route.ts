import { ExistProperty } from "@/src/utils/backend/validations/ExistProperty";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const { id } = await params
    const property = await ExistProperty(parseInt(id))
    if (property instanceof NextResponse) return property
    return NextResponse.json(property)
  } catch (error) {
    return NextResponse.json({ error: 'error en el servidor' }, { status: 500 })
  }
}