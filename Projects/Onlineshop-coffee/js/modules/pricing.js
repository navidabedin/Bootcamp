export function calculatePrice({ arabicaVariant, robustaVariant, blendRatio, weightKg, quantity = 1 }) {
  const perKg =
    (blendRatio.arabicaPct / 100) * arabicaVariant.pricePerKg +
    (blendRatio.robustaPct / 100) * robustaVariant.pricePerKg;
  const total = perKg * weightKg * quantity;
  return Math.round(total / 5000) * 5000;
}
