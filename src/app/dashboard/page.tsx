"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DollarSign, TrendingUp, TrendingDown, AlertTriangle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface BusinessData {
  businessName: string;
  businessType: string;
  monthlyRevenue: string;
  aluguel?: string;
  funcionarios?: string;
  proLabore?: string;
  impostos?: string;
  energia?: string;
  agua?: string;
  internetTelefone?: string;
  contador?: string;
  sistemas?: string;
  marketing?: string;
  taxasBancarias?: string;
  seguro?: string;
  transporte?: string;
  alvaraLicencas?: string;
  consertosManutencaoValor?: string;
  ferramentasEquipamentosValor?: string;
  multasJurosValor?: string;
  cursosConsultoriasValor?: string;
  assinaturasValor?: string;
  fretesCorreiosValor?: string;
  embalagensMaterialValor?: string;
  viagensTrabalhoValor?: string;
  outrosGastosValor?: string;
  variableCostPercentage: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem('onboardingData');
    if (!data) {
      router.push('/onboarding');
      return;
    }
    
    try {
      const parsedData = JSON.parse(data);
      setBusinessData(parsedData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      router.push('/onboarding');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading || !businessData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
          <p className="text-slate-400">Carregando diagnóstico...</p>
        </div>
      </div>
    );
  }

  // Cálculos básicos
  const monthlyRevenue = parseFloat(businessData.monthlyRevenue) || 0;
  
  const totalFixedCosts = [
    businessData.aluguel,
    businessData.funcionarios,
    businessData.proLabore,
    businessData.impostos,
    businessData.energia,
    businessData.agua,
    businessData.internetTelefone,
    businessData.contador,
    businessData.sistemas,
    businessData.marketing,
    businessData.taxasBancarias,
    businessData.seguro,
    businessData.transporte,
    businessData.alvaraLicencas,
    businessData.consertosManutencaoValor,
    businessData.ferramentasEquipamentosValor,
    businessData.multasJurosValor,
    businessData.cursosConsultoriasValor,
    businessData.assinaturasValor,
    businessData.fretesCorreiosValor,
    businessData.embalagensMaterialValor,
    businessData.viagensTrabalhoValor,
    businessData.outrosGastosValor
  ].reduce((sum, cost) => sum + (parseFloat(cost || '0') || 0), 0);

  const variableCostPercentage = parseFloat(businessData.variableCostPercentage) || 0;
  const totalVariableCosts = (monthlyRevenue * variableCostPercentage) / 100;
  
  const totalCosts = totalFixedCosts + totalVariableCosts;
  const realProfit = monthlyRevenue - totalCosts;
  const profitMargin = monthlyRevenue > 0 ? (realProfit / monthlyRevenue) * 100 : 0;

  // Análise de saúde
  const getHealthStatus = () => {
    if (profitMargin >= 20) return { status: 'Saudável', color: 'emerald', icon: TrendingUp };
    if (profitMargin >= 10) return { status: 'Atenção', color: 'amber', icon: AlertTriangle };
    if (profitMargin >= 0) return { status: 'Crítico', color: 'orange', icon: AlertTriangle };
    return { status: 'Prejuízo', color: 'red', icon: TrendingDown };
  };

  const health = getHealthStatus();
  const HealthIcon = health.icon;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{businessData.businessName}</h1>
                <p className="text-slate-400">{businessData.businessType}</p>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={() => router.push('/onboarding')}
            className="text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Refazer diagnóstico
          </Button>
        </div>

        {/* Status Card */}
        <Card className={`p-8 bg-${health.color}-500/10 border-${health.color}-500/20`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-full bg-${health.color}-500/20 flex items-center justify-center`}>
                <HealthIcon className={`w-8 h-8 text-${health.color}-500`} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Status: {health.status}</h2>
                <p className={`text-${health.color}-400 text-lg font-semibold`}>
                  Margem de lucro: {formatPercentage(profitMargin)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-slate-400 text-sm mb-1">Lucro Real Mensal</p>
              <p className={`text-4xl font-bold ${realProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {formatCurrency(realProfit)}
              </p>
            </div>
          </div>

          {/* Mensagem contextual */}
          <div className={`p-4 rounded-lg bg-${health.color}-500/10 border border-${health.color}-500/20`}>
            {profitMargin >= 20 && (
              <p className={`text-${health.color}-400`}>
                ✅ Seu negócio está saudável! Continue monitorando seus custos e busque oportunidades de crescimento.
              </p>
            )}
            {profitMargin >= 10 && profitMargin < 20 && (
              <p className={`text-${health.color}-400`}>
                ⚠️ Seu negócio está funcionando, mas há espaço para melhorar. Foque em reduzir custos ou aumentar preços.
              </p>
            )}
            {profitMargin >= 0 && profitMargin < 10 && (
              <p className={`text-${health.color}-400`}>
                🚨 Situação crítica! Seu lucro é muito baixo. Revise urgentemente seus custos e estratégia de preços.
              </p>
            )}
            {profitMargin < 0 && (
              <p className={`text-${health.color}-400`}>
                ❌ Seu negócio está no prejuízo. É urgente tomar ação: corte custos, aumente preços ou repense o modelo.
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}