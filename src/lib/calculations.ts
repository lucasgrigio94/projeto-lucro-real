// 🧮 LÓGICA DE CÁLCULOS FINANCEIROS

import { FixedCost, VariableCost, Alert, FinancialSnapshot } from './types';

export function calculateRealProfit(
  revenue: number,
  fixedCosts: FixedCost[],
  variableCosts: VariableCost[],
  proLabore: number
): number {
  const totalFixed = fixedCosts.reduce((sum, cost) => sum + cost.amount, 0);
  const totalVariable = variableCosts.reduce(
    (sum, cost) => sum + (revenue * cost.percentageOfRevenue / 100),
    0
  );
  
  return revenue - totalFixed - totalVariable - proLabore;
}

export function calculateProfitMargin(profit: number, revenue: number): number {
  if (revenue === 0) return 0;
  return (profit / revenue) * 100;
}

export function calculateBreakEven(
  fixedCosts: FixedCost[],
  variableCosts: VariableCost[],
  proLabore: number
): number {
  const totalFixed = fixedCosts.reduce((sum, cost) => sum + cost.amount, 0);
  const totalVariablePercentage = variableCosts.reduce(
    (sum, cost) => sum + cost.percentageOfRevenue,
    0
  );
  
  const contributionMargin = 1 - (totalVariablePercentage / 100);
  
  if (contributionMargin <= 0) return Infinity;
  
  return (totalFixed + proLabore) / contributionMargin;
}

// 🚨 MOTOR DE ALERTAS AVANÇADO - DETECTOR DE AUTOENGANO
export function detectSelfDeception(
  currentSnapshot: FinancialSnapshot,
  previousSnapshot?: FinancialSnapshot
): Alert[] {
  const alerts: Alert[] = [];
  let alertId = 1;

  // ============================================
  // 🔴 ALERTAS CRÍTICOS (PRIORIDADE 10)
  // ============================================

  // 🚨 PREJUÍZO REAL
  if (currentSnapshot.realProfit < 0) {
    const monthsUntilBroke = Math.abs(currentSnapshot.realProfit) > 0 
      ? Math.floor((currentSnapshot.revenue * 0.1) / Math.abs(currentSnapshot.realProfit))
      : 3;
    
    alerts.push({
      id: `alert-${alertId++}`,
      type: 'danger',
      title: 'Você não tem um negócio. Você tem um hobby caro.',
      message: `Você está perdendo ${formatCurrency(Math.abs(currentSnapshot.realProfit))} por mês.`,
      insight: `Se continuar assim, em ${monthsUntilBroke} meses você vai trabalhar no prejuízo total. Ação urgente necessária.`,
      priority: 10
    });
  }

  // 🚨 MARGEM CRÍTICA (< 5%)
  if (currentSnapshot.profitMargin < 5 && currentSnapshot.realProfit >= 0) {
    alerts.push({
      id: `alert-${alertId++}`,
      type: 'danger',
      title: 'Você está trabalhando quase de graça',
      message: `De cada R$100 que entram, sobram apenas R$${currentSnapshot.profitMargin.toFixed(2)}.`,
      insight: 'Qualquer imprevisto te joga no vermelho. Seu negócio não aguenta nem um mês ruim.',
      priority: 10
    });
  }

  // 🚨 PRÓ-LABORE ABAIXO DO SALÁRIO MÍNIMO
  const salarioMinimo = 1412; // 2024
  if (currentSnapshot.proLabore < salarioMinimo) {
    alerts.push({
      id: `alert-${alertId++}`,
      type: 'danger',
      title: 'Seu negócio te paga menos que um salário mínimo',
      message: `Você tira ${formatCurrency(currentSnapshot.proLabore)} por mês. Salário mínimo é ${formatCurrency(salarioMinimo)}.`,
      insight: 'Você ganharia mais trabalhando para outra pessoa. Isso não é sustentável.',
      priority: 10
    });
  }

  // ============================================
  // 🟠 ALERTAS DE PERIGO (PRIORIDADE 8-9)
  // ============================================

  // 🚨 CRESCIMENTO FALSO
  if (previousSnapshot) {
    const revenueGrowth = ((currentSnapshot.revenue - previousSnapshot.revenue) / previousSnapshot.revenue) * 100;
    const profitGrowth = currentSnapshot.realProfit - previousSnapshot.realProfit;

    if (revenueGrowth > 10 && profitGrowth < 0) {
      alerts.push({
        id: `alert-${alertId++}`,
        type: 'danger',
        title: 'Você cresceu, mas empobreceu',
        message: `Faturamento subiu ${revenueGrowth.toFixed(1)}%, mas lucro caiu ${formatCurrency(Math.abs(profitGrowth))}.`,
        insight: 'Esse crescimento é uma armadilha. Você está vendendo mais para ganhar menos. Volume sem margem quebra.',
        priority: 9
      });
    }

    // 🚨 QUEDA BRUSCA DE FATURAMENTO
    if (revenueGrowth < -20) {
      alerts.push({
        id: `alert-${alertId++}`,
        type: 'danger',
        title: 'Faturamento em queda livre',
        message: `Você faturou ${Math.abs(revenueGrowth).toFixed(1)}% menos que o mês passado.`,
        insight: 'Isso é uma sangria. Revise urgentemente sua estratégia de vendas e retenção.',
        priority: 9
      });
    }

    // 🚨 MARGEM PIORANDO
    const marginChange = currentSnapshot.profitMargin - previousSnapshot.profitMargin;
    if (marginChange < -5) {
      alerts.push({
        id: `alert-${alertId++}`,
        type: 'warning',
        title: 'Sua margem está derretendo',
        message: `Margem caiu ${Math.abs(marginChange).toFixed(1)} pontos percentuais.`,
        insight: 'Seus custos estão crescendo mais rápido que sua receita. Isso é insustentável.',
        priority: 8
      });
    }
  }

  // 🚨 CUSTOS FIXOS SUFOCANTES
  const fixedCostsPercentage = (currentSnapshot.totalFixedCosts / currentSnapshot.revenue) * 100;
  if (fixedCostsPercentage > 50) {
    alerts.push({
      id: `alert-${alertId++}`,
      type: 'danger',
      title: 'Seus custos fixos estão te matando',
      message: `${fixedCostsPercentage.toFixed(1)}% do faturamento vai para custos fixos.`,
      insight: `Você precisa faturar ${formatCurrency(currentSnapshot.totalFixedCosts)} só para pagar as contas. Corte ou morra.`,
      priority: 9
    });
  } else if (fixedCostsPercentage > 40) {
    alerts.push({
      id: `alert-${alertId++}`,
      type: 'warning',
      title: 'Custos fixos muito altos',
      message: `${fixedCostsPercentage.toFixed(1)}% do faturamento vai para custos fixos.`,
      insight: 'Zona de perigo. Qualquer queda nas vendas te joga no vermelho.',
      priority: 8
    });
  }

  // 🚨 DEPENDÊNCIA DE FATURAMENTO ALTO
  const breakEven = calculateBreakEven(
    currentSnapshot.totalFixedCosts > 0 ? [{ id: '1', name: 'Fixed', amount: currentSnapshot.totalFixedCosts, category: 'fixed' }] : [],
    currentSnapshot.totalVariableCosts > 0 ? [{ id: '1', name: 'Variable', percentageOfRevenue: (currentSnapshot.totalVariableCosts / currentSnapshot.revenue) * 100, category: 'variable' }] : [],
    currentSnapshot.proLabore
  );
  
  const breakEvenPercentage = (breakEven / currentSnapshot.revenue) * 100;
  if (breakEvenPercentage > 80) {
    alerts.push({
      id: `alert-${alertId++}`,
      type: 'warning',
      title: 'Você está na corda bamba',
      message: `Precisa faturar ${formatCurrency(breakEven)} só para não ter prejuízo.`,
      insight: `Isso é ${breakEvenPercentage.toFixed(0)}% do seu faturamento atual. Margem de segurança muito baixa.`,
      priority: 8
    });
  }

  // ============================================
  // 🟡 ALERTAS DE ATENÇÃO (PRIORIDADE 6-7)
  // ============================================

  // 🚨 PRÓ-LABORE INEXISTENTE OU MUITO BAIXO
  if (currentSnapshot.proLabore === 0) {
    alerts.push({
      id: `alert-${alertId++}`,
      type: 'warning',
      title: 'Você está trabalhando de graça',
      message: 'Pró-labore zero. Você não está se pagando.',
      insight: 'Isso não é sustentável. Você precisa tirar um salário do negócio. Sempre.',
      priority: 7
    });
  } else if (currentSnapshot.proLabore < salarioMinimo * 2) {
    alerts.push({
      id: `alert-${alertId++}`,
      type: 'warning',
      title: 'Seu pró-labore é muito baixo',
      message: `Você tira ${formatCurrency(currentSnapshot.proLabore)} por mês.`,
      insight: 'Você merece mais. Se o negócio não consegue te pagar bem, algo está errado.',
      priority: 7
    });
  }

  // 🚨 MARGEM BAIXA (5-15%)
  if (currentSnapshot.profitMargin >= 5 && currentSnapshot.profitMargin < 15) {
    alerts.push({
      id: `alert-${alertId++}`,
      type: 'warning',
      title: 'Margem apertada',
      message: `Margem de ${currentSnapshot.profitMargin.toFixed(1)}% é muito baixa.`,
      insight: 'Você não tem gordura para queimar. Qualquer crise te derruba.',
      priority: 7
    });
  }

  // 🚨 CUSTOS VARIÁVEIS MUITO ALTOS
  const variableCostsPercentage = (currentSnapshot.totalVariableCosts / currentSnapshot.revenue) * 100;
  if (variableCostsPercentage > 60) {
    alerts.push({
      id: `alert-${alertId++}`,
      type: 'warning',
      title: 'Custos variáveis comendo sua margem',
      message: `${variableCostsPercentage.toFixed(1)}% do faturamento vai para custos variáveis.`,
      insight: 'Você está vendendo caro ou comprando caro demais. Negocie melhor ou aumente preços.',
      priority: 7
    });
  }

  // 🚨 LUCRO MENOR QUE PRÓ-LABORE
  if (currentSnapshot.realProfit > 0 && currentSnapshot.realProfit < currentSnapshot.proLabore) {
    alerts.push({
      id: `alert-${alertId++}`,
      type: 'warning',
      title: 'Você é CLT do seu próprio negócio',
      message: 'Seu lucro é menor que seu pró-labore.',
      insight: 'Você trabalha para se pagar. Não sobra nada para crescer ou investir.',
      priority: 7
    });
  }

  // 🚨 FATURAMENTO ESTAGNADO
  if (previousSnapshot) {
    const revenueGrowth = ((currentSnapshot.revenue - previousSnapshot.revenue) / previousSnapshot.revenue) * 100;
    if (Math.abs(revenueGrowth) < 2) {
      alerts.push({
        id: `alert-${alertId++}`,
        type: 'info',
        title: 'Seu negócio está parado',
        message: 'Faturamento praticamente igual ao mês passado.',
        insight: 'Estagnação é o primeiro passo para o declínio. Hora de testar algo novo.',
        priority: 6
      });
    }
  }

  // ============================================
  // 🔵 ALERTAS INFORMATIVOS (PRIORIDADE 4-5)
  // ============================================

  // 🚨 NEGÓCIO SAUDÁVEL MAS PODE MELHORAR
  if (currentSnapshot.profitMargin >= 15 && currentSnapshot.profitMargin < 25) {
    alerts.push({
      id: `alert-${alertId++}`,
      type: 'info',
      title: 'Seu negócio está saudável',
      message: `Margem de ${currentSnapshot.profitMargin.toFixed(1)}% é boa.`,
      insight: 'Mas ainda dá para melhorar. Foque em aumentar margem, não só volume.',
      priority: 5
    });
  }

  // 🚨 NEGÓCIO MUITO BOM
  if (currentSnapshot.profitMargin >= 25) {
    alerts.push({
      id: `alert-${alertId++}`,
      type: 'info',
      title: 'Parabéns! Seu negócio é lucrativo',
      message: `Margem de ${currentSnapshot.profitMargin.toFixed(1)}% é excelente.`,
      insight: 'Agora foque em escalar com inteligência. Não sacrifique margem por volume.',
      priority: 4
    });
  }

  // 🚨 CAPACIDADE DE INVESTIMENTO
  if (currentSnapshot.realProfit > currentSnapshot.proLabore * 0.5) {
    alerts.push({
      id: `alert-${alertId++}`,
      type: 'info',
      title: 'Você tem capacidade de investir',
      message: `Sobram ${formatCurrency(currentSnapshot.realProfit)} por mês.`,
      insight: 'Use esse dinheiro para crescer: marketing, estoque, contratação ou reserva de emergência.',
      priority: 5
    });
  }

  // Ordenar por prioridade
  return alerts.sort((a, b) => b.priority - a.priority);
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function getHealthStatus(profitMargin: number): {
  status: 'healthy' | 'warning' | 'danger';
  label: string;
  color: string;
} {
  if (profitMargin >= 20) {
    return { status: 'healthy', label: 'Saudável', color: 'text-emerald-600' };
  } else if (profitMargin >= 10) {
    return { status: 'warning', label: 'Atenção', color: 'text-amber-600' };
  } else {
    return { status: 'danger', label: 'Crítico', color: 'text-red-600' };
  }
}

export function simulatePriceIncrease(
  currentRevenue: number,
  increasePercentage: number,
  fixedCosts: FixedCost[],
  variableCosts: VariableCost[],
  proLabore: number
): { newRevenue: number; newProfit: number; profitIncrease: number } {
  const newRevenue = currentRevenue * (1 + increasePercentage / 100);
  const newProfit = calculateRealProfit(newRevenue, fixedCosts, variableCosts, proLabore);
  const currentProfit = calculateRealProfit(currentRevenue, fixedCosts, variableCosts, proLabore);
  const profitIncrease = newProfit - currentProfit;

  return { newRevenue, newProfit, profitIncrease };
}

// 🎯 ANÁLISE DE RISCO FINANCEIRO
export function calculateFinancialRisk(snapshot: FinancialSnapshot): {
  level: 'low' | 'medium' | 'high' | 'critical';
  score: number;
  factors: string[];
} {
  let riskScore = 0;
  const factors: string[] = [];

  // Fator 1: Margem de lucro
  if (snapshot.profitMargin < 5) {
    riskScore += 40;
    factors.push('Margem crítica');
  } else if (snapshot.profitMargin < 15) {
    riskScore += 20;
    factors.push('Margem baixa');
  }

  // Fator 2: Lucro real
  if (snapshot.realProfit < 0) {
    riskScore += 50;
    factors.push('Prejuízo');
  } else if (snapshot.realProfit < snapshot.proLabore * 0.3) {
    riskScore += 25;
    factors.push('Lucro muito baixo');
  }

  // Fator 3: Custos fixos
  const fixedPercentage = (snapshot.totalFixedCosts / snapshot.revenue) * 100;
  if (fixedPercentage > 50) {
    riskScore += 30;
    factors.push('Custos fixos altos');
  } else if (fixedPercentage > 40) {
    riskScore += 15;
    factors.push('Custos fixos elevados');
  }

  // Fator 4: Pró-labore
  if (snapshot.proLabore === 0) {
    riskScore += 20;
    factors.push('Sem pró-labore');
  } else if (snapshot.proLabore < 1412) {
    riskScore += 10;
    factors.push('Pró-labore muito baixo');
  }

  // Determinar nível de risco
  let level: 'low' | 'medium' | 'high' | 'critical';
  if (riskScore >= 80) level = 'critical';
  else if (riskScore >= 50) level = 'high';
  else if (riskScore >= 25) level = 'medium';
  else level = 'low';

  return { level, score: riskScore, factors };
}

// 🎯 CAPACIDADE DE CRESCIMENTO
export function calculateGrowthCapacity(snapshot: FinancialSnapshot): {
  canGrow: boolean;
  maxSafeGrowth: number;
  recommendation: string;
} {
  const profitAfterProLabore = snapshot.realProfit;
  const currentRevenue = snapshot.revenue;

  if (profitAfterProLabore <= 0) {
    return {
      canGrow: false,
      maxSafeGrowth: 0,
      recommendation: 'Foque em lucrar antes de crescer. Crescimento sem lucro é suicídio.'
    };
  }

  if (snapshot.profitMargin < 10) {
    return {
      canGrow: false,
      maxSafeGrowth: 0,
      recommendation: 'Margem muito baixa. Aumente preços ou corte custos antes de crescer.'
    };
  }

  const investmentCapacity = profitAfterProLabore * 0.7; // 70% do lucro
  const maxSafeGrowth = (investmentCapacity / currentRevenue) * 100;

  return {
    canGrow: true,
    maxSafeGrowth,
    recommendation: `Você pode crescer até ${maxSafeGrowth.toFixed(0)}% com segurança usando seu lucro atual.`
  };
}
