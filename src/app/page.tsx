"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, TrendingUp, AlertTriangle, Target, Zap, CheckCircle2, DollarSign, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              LucroReal
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-slate-300 hover:text-white">
                Entrar
              </Button>
            </Link>
            <Link href="/onboarding">
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white">
                Começar Grátis
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-8">
            <Zap className="w-4 h-4" />
            <span>Pare de trabalhar muito e lucrar pouco</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6 leading-tight">
            Em poucos minutos, descubra se seu negócio te dá <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">dinheiro</span> — ou só te mantém ocupado.
          </h1>
          
          <p className="text-xl sm:text-2xl text-slate-400 mb-8 leading-relaxed">
            O LucroReal analisa seus números, mostra seu lucro real e revela onde seu negócio está te enganando — antes que ele te cobre o preço.
          </p>

          {/* ALERTA CRÍTICO */}
          <div className="max-w-2xl mx-auto mb-12 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 backdrop-blur-sm">
            <div className="flex items-center gap-3 justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <p className="text-base text-amber-200/90 font-medium">
                A maioria dos pequenos negócios quebram sem nunca ter tido clareza financeira.
              </p>
            </div>
          </div>

          {/* BLOCO DE IDENTIFICAÇÃO */}
          <div className="max-w-2xl mx-auto mb-12 p-8 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">👉</span>
              <h3 className="text-2xl font-bold text-white">Esse app é pra você se:</h3>
            </div>
            <ul className="space-y-4 text-left">
              {[
                "Trabalha muito e nunca vê o dinheiro sobrar",
                "Olha faturamento, mas não sabe quanto ganha de verdade",
                "Mistura dinheiro da empresa com o pessoal",
                "Vive apertado mesmo vendendo bem",
                "Evita olhar seus números porque dá ansiedade"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* MINI-DEMO EM TEXTO */}
          <div className="max-w-2xl mx-auto mb-12 p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🧠</span>
              <h3 className="text-2xl font-bold text-white">Dentro do app você vai ver coisas como:</h3>
            </div>
            <ul className="space-y-4 text-left">
              {[
                '"Seu faturamento subiu, mas seu lucro caiu 18%."',
                '"Hoje, seu negócio não sustenta seu padrão de vida."',
                '"Se nada mudar, em 3 meses você começa a trabalhar no prejuízo."',
                '"Esse produto te dá trabalho. Não te dá dinheiro."'
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-slate-300 italic">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link href="/onboarding">
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-lg px-8 py-6 h-auto shadow-2xl hover:shadow-emerald-500/50 transition-all">
                Quero ver a verdade do meu negócio
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          <p className="text-sm text-slate-400 mb-12">
            Leva menos de 10 minutos • 7 dias grátis
          </p>

          {/* Social Proof */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>Configuração em 10 minutos</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>Cancele quando quiser</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-800">
        <div className="text-center mb-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            A maioria dos microempresários está exatamente aqui.
          </h2>
          <p className="text-xl text-slate-400">
            E quase nenhum percebe a tempo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mt-16">
          {[
            {
              icon: AlertTriangle,
              title: "Você trabalha, mas não sabe quanto realmente ganha.",
              description: "Você vê dinheiro entrar, mas no fim do mês ele some. Sem clareza, toda decisão é um chute."
            },
            {
              icon: TrendingUp,
              title: "Seu dinheiro e o da empresa viraram uma coisa só.",
              description: "Você tira quando precisa, cobre quando falta. No fim, não sabe se tem um negócio ou um problema."
            },
            {
              icon: Target,
              title: "Você decide no escuro.",
              description: "Aumenta preço, contrata, investe… sem saber se isso te aproxima do lucro ou do buraco."
            },
            {
              icon: Zap,
              title: "Você trabalha muito… e sua vida não melhora.",
              description: "12 horas por dia, meses passando, e o padrão de vida continua o mesmo. Isso não é normal."
            }
          ].map((problem, index) => (
            <div key={index} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all">
              <problem.icon className="w-12 h-12 text-emerald-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">{problem.title}</h3>
              <p className="text-slate-400 leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Solution Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-800">
        <div className="text-center mb-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Como o LucroReal revela a verdade do seu negócio
          </h2>
          <p className="text-xl text-slate-400">
            Simplicidade para você. Clareza para sua empresa.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            {
              step: "1",
              title: "Cadastro em 10 minutos",
              description: "Responda perguntas simples sobre seu negócio. Sem termos técnicos, sem complicação."
            },
            {
              step: "2",
              title: "Veja seu lucro real",
              description: "Veja quanto realmente sobra depois que o seu negócio paga tudo — inclusive você."
            },
            {
              step: "3",
              title: "Tome decisões melhores",
              description: "Receba alertas, missões e simulações para parar de trabalhar no escuro."
            }
          ].map((step, index) => (
            <div key={index} className="relative">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">{step.description}</p>
              </div>
              {index < 2 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-emerald-500/50 to-transparent -z-10" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-800">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            O que o LucroReal vai mostrar que você provavelmente nunca viu
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { 
              title: "A verdade do seu negócio, em números.", 
              description: "Veja quanto entra, quanto sai e quanto realmente sobra." 
            },
            { 
              title: "Alertas quando você estiver se enganando.", 
              description: "O sistema te avisa quando seu negócio parece bom… mas está piorando." 
            },
            { 
              title: "Ações semanais para sair do aperto.", 
              description: "Tarefas simples para corrigir o que está travando seu lucro." 
            },
            { 
              title: "Simulador de Decisões", 
              description: "Teste cenários antes de tomar decisões importantes" 
            },
            { 
              title: "Tradutor Financeiro", 
              description: "Explicações simples de termos financeiros" 
            },
            { 
              title: "Comparação Mensal", 
              description: "Veja sua evolução mês a mês automaticamente" 
            }
          ].map((feature, index) => (
            <div key={index} className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/50 transition-all">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-800">
        <div className="text-center mb-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Quanto custa continuar no escuro?
          </h2>
          <p className="text-xl text-slate-400 mb-12">
            Menos que um almoço por semana para saber se seu negócio realmente se paga.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
            <h3 className="text-2xl font-bold text-white mb-2">Essencial</h3>
            <div className="mb-6">
              <span className="text-5xl font-bold text-white">R$39</span>
              <span className="text-slate-400">/mês</span>
            </div>
            <ul className="space-y-4 mb-8">
              {[
                "Painel de lucro real",
                "Detector de autoengano",
                "Missões semanais",
                "Relatórios mensais",
                "Suporte por email"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/onboarding">
              <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white">
                Começar Grátis
              </Button>
            </Link>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-2 border-emerald-500/50 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-bold">
              Mais Popular
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
            <div className="mb-6">
              <span className="text-5xl font-bold text-white">R$79</span>
              <span className="text-slate-400">/mês</span>
            </div>
            <ul className="space-y-4 mb-8">
              {[
                "Tudo do Essencial",
                "Simulador de decisões",
                "Metas e objetivos",
                "Histórico ilimitado",
                "Relatórios avançados",
                "Suporte prioritário"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/onboarding">
              <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white">
                Começar Grátis
              </Button>
            </Link>
          </div>
        </div>

        <p className="text-center text-slate-400 mt-8">
          7 dias grátis • Cancele quando quiser • Sem pegadinhas
        </p>
      </section>

      {/* CTA Final */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-800">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Seu negócio está te enriquecendo… ou te usando?
          </h2>
          <p className="text-xl text-slate-400 mb-12">
            Você vai descobrir em poucos minutos.
          </p>
          <Link href="/onboarding">
            <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-lg px-8 py-6 h-auto shadow-2xl hover:shadow-emerald-500/50 transition-all">
              Quero ver a verdade do meu negócio
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/50 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">LucroReal</span>
            </div>
            <p className="text-slate-400 text-sm">
              © 2024 LucroReal. Pare de trabalhar muito e lucrar pouco.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}