// config/cta.ts
export interface CTAConfig {
  title: string;
  description: string;
  buttons: Array<{
    text: string;
    to: string;
    variant: 'primary' | 'secondary';
  }>;
}

export const ctaConfigs = {
  // CTA для главной страницы (новый!)
  home: {
    title: 'Забронируйте квартиру в Мирном уже сегодня',
    description:
      'Свяжитесь с нами любым удобным способом. Работаем ежедневно с 8:00 до 22:00. Встречаем гостей, помогаем с размещением и документами.',
    buttons: [
      {
        text: 'Выбрать квартиру',
        to: '/apartments',
        variant: 'primary' as const,
      },
      {
        text: 'Все контакты',
        to: '/contacts',
        variant: 'secondary' as const,
      },
    ],
  },

  // CTA для страницы "О нас"
  about: {
    title: 'Готовы забронировать квартиру?',
    description:
      'Вы можете выбрать квартиру из нашего каталога или связаться с нами, и мы поможем подобрать идеальный вариант для вас.',
    buttons: [
      {
        text: 'Смотреть квартиры',
        to: '/apartments',
        variant: 'primary' as const,
      },
      {
        text: 'Связаться с нами',
        to: '/contacts',
        variant: 'secondary' as const,
      },
    ],
  },

  // CTA для страницы квартир
  apartments: {
    title: 'Не нашли подходящую квартиру?',
    description: 'Свяжитесь с нами, и мы поможем подобрать идеальный вариант специально для вас.',
    buttons: [
      {
        text: 'Связаться с нами',
        to: '/contacts',
        variant: 'primary' as const,
      },
      {
        text: 'О нашей компании',
        to: '/about',
        variant: 'secondary' as const,
      },
    ],
  },

  // CTA для страницы контактов
  contacts: {
    title: 'Готовы к бронированию?',
    description: 'Выберите понравившуюся квартиру из нашего каталога или узнайте больше о наших услугах.',
    buttons: [
      {
        text: 'Посмотреть квартиры',
        to: '/apartments',
        variant: 'primary' as const,
      },
      {
        text: 'О компании',
        to: '/about',
        variant: 'secondary' as const,
      },
    ],
  },
} as const;

// Утилита для получения CSS классов кнопок
export const getButtonClasses = (variant: 'primary' | 'secondary') => {
  const classes = {
    primary:
      'btn bg-accent-500 text-white hover:bg-accent-600 py-3 px-8 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1',
    secondary:
      'btn py-3 px-8 text-lg bg-transparent border-2 border-white hover:bg-white hover:text-cyan-900 transition-all duration-300',
  };
  return classes[variant];
};
