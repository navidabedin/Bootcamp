import { arabicaVariants, robustaVariants, blendRatios, weightOptions } from '../data/coffee-data.js';
import { calculatePrice } from './pricing.js';

export const state = {
  arabica: arabicaVariants[0],
  robusta: robustaVariants[0],
  blend: blendRatios[0],
  form: 'bean',
  weight: weightOptions[0],
  quantity: 1,
};

export function getPrice() {
  return calculatePrice({
    arabicaVariant: state.arabica,
    robustaVariant: state.robusta,
    blendRatio: state.blend,
    weightKg: state.weight.value,
    quantity: state.quantity,
  });
}

export function isReady() {
  return state.arabica && state.robusta && state.blend && state.weight;
}
