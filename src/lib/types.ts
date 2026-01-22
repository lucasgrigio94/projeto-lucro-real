// 🎯 TIPOS DO APP - LUCRO REAL

export interface UserBusiness {
  id: string;
  userId: string;
  businessName: string;
  businessType: string;
  monthlyRevenue: number;
  fixedCosts: FixedCost[];
  variableCosts: VariableCost[];
  proLabore: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface FixedCost {
  id: string;
  name: string;
  amount: number;
  category: string;
}

export interface VariableCost {
  id: string;
  name: string;
  percentageOfRevenue: number;
  category: string;
}

export interface FinancialSnapshot {
  month: string;
  revenue: number;
  totalFixedCosts: number;
  totalVariableCosts: number;
  proLabore: number;
  realProfit: number;
  profitMargin: number;
}

export interface Alert {
  id: string;
  type: 'danger' | 'warning' | 'info';
  title: string;
  message: string;
  insight: string;
  priority: number;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  points: number;
  category: string;
}

export interface UserLevel {
  level: number;
  title: string;
  points: number;
  nextLevelPoints: number;
}

export const BUSINESS_LEVELS = [
  { level: 1, title: "Empresário Perdido", points: 0 },
  { level: 2, title: "Empresário Curioso", points: 100 },
  { level: 3, title: "Empresário Consciente", points: 300 },
  { level: 4, title: "Empresário Organizado", points: 600 },
  { level: 5, title: "Empresário Estratégico", points: 1000 },
  { level: 6, title: "Empresário Lucrativo", points: 1500 },
];
