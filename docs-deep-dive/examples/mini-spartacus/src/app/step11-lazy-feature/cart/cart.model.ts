/**
 * STEP 11 - Modello carrello (sottoinsieme di Occ.Cart / Occ.OrderEntry)
 * Ispirato a:
 *  - core-libs/core/src/occ/occ-models/occ.models.ts (Occ.Cart, Occ.OrderEntry, Occ.CartModification)
 *  - feature-libs/cart/base/root/models/cart.model.ts (Cart, OrderEntry)
 */
import { OccPrice, OccProduct } from '../../step05-product-data/product.model';

export interface OrderEntry {
  entryNumber?: number;
  quantity?: number;
  product?: OccProduct;
  basePrice?: OccPrice;
  totalPrice?: OccPrice;
}

export interface Cart {
  code?: string;
  guid?: string;
  entries?: OrderEntry[];
  totalItems?: number;
  totalUnitCount?: number;
  totalPrice?: OccPrice;
  user?: { uid?: string; name?: string };
}
