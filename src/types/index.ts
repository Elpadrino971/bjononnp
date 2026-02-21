export interface PricingPlan {
  name: string;
  price: string;
  priceMonthly?: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  badge?: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
  tag?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface CodeExample {
  title: string;
  language: string;
  code: string;
  description: string;
}

export interface Stat {
  value: string;
  label: string;
  description: string;
}
