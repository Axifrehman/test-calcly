import z from "zod";

// Calculator Categories
export const CalculatorCategory = z.enum([
  'financial',
  'health',
  'math',
  'conversion',
  'engineering',
  'business',
  'fitness',
  'construction',
  'automotive',
  'academic',
  'lifestyle',
  'ai-powered'
]);

export type CalculatorCategoryType = z.infer<typeof CalculatorCategory>;

// Calculator Tool Schema
export const CalculatorToolSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: CalculatorCategory,
  tags: z.array(z.string()),
  featured: z.boolean().optional(),
  difficulty: z.enum(['basic', 'intermediate', 'advanced']),
  slug: z.string(),
  seoKeywords: z.array(z.string()),
});

export type CalculatorToolType = z.infer<typeof CalculatorToolSchema>;

// Calculation Result Schema
export const CalculationResultSchema = z.object({
  value: z.union([z.number(), z.string()]),
  unit: z.string().optional(),
  breakdown: z.array(z.object({
    label: z.string(),
    value: z.union([z.number(), z.string()]),
    unit: z.string().optional(),
  })).optional(),
  explanation: z.string().optional(),
});

export type CalculationResultType = z.infer<typeof CalculationResultSchema>;

// Content Categories for SEO
export const contentCategories = {
  financial: {
    name: 'Financial Calculators',
    description: 'Comprehensive financial planning and calculation tools',
    keywords: ['loan calculator', 'mortgage calculator', 'investment calculator', 'tax calculator', 'retirement calculator'],
    subcategories: [
      'Loan & Mortgage',
      'Investment & Returns',
      'Tax Planning',
      'Retirement Planning',
      'Insurance',
      'Credit & Debt'
    ]
  },
  health: {
    name: 'Health & Medical Calculators',
    description: 'Health metrics, medical calculations, and wellness tools',
    keywords: ['BMI calculator', 'calorie calculator', 'pregnancy calculator', 'dosage calculator'],
    subcategories: [
      'Body Metrics',
      'Nutrition & Diet',
      'Medical Dosage',
      'Pregnancy & Child',
      'Fitness Tracking',
      'Mental Health'
    ]
  },
  math: {
    name: 'Math & Statistics Calculators',
    description: 'Advanced mathematical and statistical calculation tools',
    keywords: ['equation solver', 'statistics calculator', 'geometry calculator', 'algebra calculator'],
    subcategories: [
      'Basic Arithmetic',
      'Algebra & Equations',
      'Geometry & Trigonometry',
      'Statistics & Probability',
      'Calculus',
      'Number Theory'
    ]
  },
  conversion: {
    name: 'Unit Converters',
    description: 'Convert between different units and measurements',
    keywords: ['unit converter', 'currency converter', 'temperature converter', 'length converter'],
    subcategories: [
      'Length & Distance',
      'Weight & Mass',
      'Temperature',
      'Currency',
      'Time & Date',
      'Digital Storage'
    ]
  },
  engineering: {
    name: 'Engineering Calculators',
    description: 'Professional engineering calculation tools',
    keywords: ['electrical calculator', 'structural calculator', 'fluid mechanics', 'material calculator'],
    subcategories: [
      'Electrical Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Chemical Engineering',
      'Materials Science',
      'Environmental'
    ]
  },
  business: {
    name: 'Business & Commerce',
    description: 'Business planning and commercial calculation tools',
    keywords: ['ROI calculator', 'profit calculator', 'markup calculator', 'break-even calculator'],
    subcategories: [
      'Profit & Loss',
      'Marketing Metrics',
      'Sales Calculations',
      'Inventory Management',
      'Pricing Strategies',
      'Business Planning'
    ]
  }
} as const;
