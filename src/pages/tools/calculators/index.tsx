
import React from 'react';
import { 
  Percent, 
  Calculator, 
  CirclePercent, 
  Dice5, 
  Banknote, 
  ChartBar, 
  Clock, 
  CalendarDays, 
  Calendar,
  Utensils
} from 'lucide-react';
import CategoryShowcase from '@/components/CategoryShowcase';

interface CalculatorTool {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: React.ElementType;
}

const calculatorTools: CalculatorTool[] = [
  {
    id: 'age-calculator',
    title: 'Age Calculator',
    description: 'Calculate age based on birth date',
    path: '/tools/calculators/age-calculator',
    icon: Calendar,
  },
  {
    id: 'percentage-calculator',
    title: 'Percentage Calculator',
    description: 'Calculate percentages easily',
    path: '/tools/calculators/percentage-calculator',
    icon: Percent,
  },
  {
    id: 'average-calculator',
    title: 'Average Calculator',
    description: 'Calculate mean, median, mode and other statistics',
    path: '/tools/calculators/average-calculator',
    icon: Calculator,
  },
  {
    id: 'confidence-interval-calculator',
    title: 'Confidence Interval Calculator',
    description: 'Calculate statistical confidence intervals',
    path: '/tools/calculators/confidence-interval-calculator',
    icon: CirclePercent,
  },
  {
    id: 'margin-calculator',
    title: 'Margin Calculator',
    description: 'Calculate profit margins and markups',
    path: '/tools/calculators/margin-calculator',
    icon: Banknote,
  },
  {
    id: 'probability-calculator',
    title: 'Probability Calculator',
    description: 'Calculate probability of various events',
    path: '/tools/calculators/probability-calculator',
    icon: Dice5,
  },
  {
    id: 'paypal-fee-calculator',
    title: 'PayPal Fee Calculator',
    description: 'Calculate PayPal transaction fees',
    path: '/tools/calculators/paypal-fee-calculator',
    icon: Banknote,
  },
  {
    id: 'cpm-calculator',
    title: 'CPM Calculator',
    description: 'Cost per thousand impressions calculator',
    path: '/tools/calculators/cpm-calculator',
    icon: ChartBar,
  },
  {
    id: 'loan-calculator',
    title: 'Loan Calculator',
    description: 'Calculate loan payments, interest, and amortization',
    path: '/tools/calculators/loan-calculator',
    icon: Banknote,
  },
  {
    id: 'gst-calculator',
    title: 'GST Calculator',
    description: 'Calculate Goods and Services Tax',
    path: '/tools/calculators/gst-calculator',
    icon: Percent,
  },
  {
    id: 'days-calculator',
    title: 'Days Calculator',
    description: 'Calculate days between dates',
    path: '/tools/calculators/days-calculator',
    icon: CalendarDays,
  },
  {
    id: 'hours-calculator',
    title: 'Hours Calculator',
    description: 'Calculate hours worked and time differences',
    path: '/tools/calculators/hours-calculator',
    icon: Clock,
  },
  {
    id: 'month-calculator',
    title: 'Month Calculator',
    description: 'Calculate months between dates',
    path: '/tools/calculators/month-calculator',
    icon: Calendar,
  },
  {
    id: 'stripe-fee-calculator',
    title: 'Stripe Fee Calculator',
    description: 'Calculate Stripe payment processing fees',
    path: '/tools/calculators/stripe-fee-calculator',
    icon: Banknote,
  },
  {
    id: 'calorie-calculator',
    title: 'Calorie Calculator',
    description: 'Calculate daily calorie needs based on various factors',
    path: '/tools/calculators/calorie-calculator',
    icon: Utensils,
  },
  {
    id: 'tdee-calculator',
    title: 'TDEE Calculator',
    description: 'Calculate Total Daily Energy Expenditure',
    path: '/tools/calculators/tdee-calculator',
    icon: Calculator,
  },
];

const CalculatorsIndex: React.FC = () => {
  return <CategoryShowcase categoryKey="calculators" tools={calculatorTools} />;
};

export default CalculatorsIndex;