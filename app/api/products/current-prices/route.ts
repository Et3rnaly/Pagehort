import { NextResponse } from "next/server"
import { PRODUCT_SELECT, productRowToProduct } from "@/src/lib/products"
import { createSupabaseServerClient } from "@/src/lib/supabase/server"
import type { ProductRow } from "@/src/types"

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const productIds = Array.isArray(body?.productIds)
    ? body.productIds.map(String).filter(Boolean)
    : []

  if (productIds.length === 0) {
    return NextResponse.json({ ok: true, items: [] })
  }

  const supabase = await createSupabaseServerClient()

  if (!supabase) {
    return NextResponse.json({ ok: false, items: [] })
  }

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .in("id", productIds)
    .eq("available", true)

  if (error) {
    return NextResponse.json({ ok: false, items: [], error: error.message }, { status: 500 })
  }

  const items = ((data ?? []) as ProductRow[]).map((row) => {
    const product = productRowToProduct(row)

    return {
      productId: product.id,
      name: product.name,
      priceUnit: product.priceUnit,
      unitInfo: product.unitInfo,
      image: product.image,
      imageUrl: product.imageUrl,
      unitPrice: product.price ?? 0,
    }
  })

  return NextResponse.json({ ok: true, items })
}
