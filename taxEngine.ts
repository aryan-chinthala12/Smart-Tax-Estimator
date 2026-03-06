export interface TaxBracket {
  rate: number;
  min: number;
  max: number | null;
}

export const TAX_YEAR = 2026;

// 2026 Individual Income Tax Brackets (Estimated/Mock for prototype)
export const SINGLE_FILER_BRACKETS: TaxBracket[] = [
  { rate: 0.10, min: 0, max: 11925 },
  { rate: 0.12, min: 11925, max: 48475 },
  { rate: 0.22, min: 48475, max: 103350 },
  { rate: 0.24, min: 103350, max: 197300 },
  { rate: 0.32, min: 197300, max: 250525 },
  { rate: 0.35, min: 250525, max: 626350 },
  { rate: 0.37, min: 626350, max: null },
];

export const STANDARD_DEDUCTION_2026 = 15400; // Mock value

export interface TaxCalculationResult {
  grossIncome: number;
  totalDeductions: number;
  taxableIncome: number;
  totalTax: number;
  effectiveRate: number;
  marginalRate: number;
}

export function calculateTax(grossIncome: number, deductions: number = 0): TaxCalculationResult {
  const totalDeductions = Math.max(deductions, STANDARD_DEDUCTION_2026);
  const taxableIncome = Math.max(0, grossIncome - totalDeductions);
  
  let totalTax = 0;
  let marginalRate = 0;

  for (const bracket of SINGLE_FILER_BRACKETS) {
    if (taxableIncome > bracket.min) {
      const upper = bracket.max === null ? taxableIncome : Math.min(taxableIncome, bracket.max);
      const taxableInBracket = upper - bracket.min;
      totalTax += taxableInBracket * bracket.rate;
      marginalRate = bracket.rate;
    } else {
      break;
    }
  }

  return {
    grossIncome,
    totalDeductions,
    taxableIncome,
    totalTax,
    effectiveRate: grossIncome > 0 ? totalTax / grossIncome : 0,
    marginalRate,
  };
}
