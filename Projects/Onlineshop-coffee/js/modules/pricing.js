export function calculatePrice({ arabicaVariant, robustaVariant, blendRatio, weightKg, quantity = 1 }) {

  const perKg =
    (blendRatio.arabicaPct / 100) * arabicaVariant.pricePerKg +
    (blendRatio.robustaPct / 100) * robustaVariant.pricePerKg;

  const total = perKg * weightKg * quantity;    
  
  return total;
}

/* const remainder = total % 10000;

  const result = remainder === 0
    ? total
    : remainder >= 9000
      ? Math.ceil(total / 10000) * 10000
      : Math.floor(total / 10000) * 10000;

  return result; */

