// config/contacts.ts
export interface ContactData {
  phone: string;
  email: string;
  address: string;
  workingHours: {
    office: string;
    phone: string;
  };
  social: {
    whatsapp: string;
    telegram: string;
    vk: string;
  };
  maps: {
    office: string;
  };
}

export const contactData: ContactData = {
  phone: '+7 (921) 479-47-91',
  email: '9214794791@mail.ru',
  address: 'г. Мирный, ул. Ленина, д.65, офис 20',
  workingHours: {
    office: 'ежедневно с 9:00 до 20:00',
    phone: 'ежедневно с 8:00 до 22:00',
  },
  social: {
    whatsapp: 'https://wa.me/79214794791?text=Здравствуйте!%20Интересует%20аренда%20квартиры%20в%20Мирном',
    telegram: 'https://t.me/ArendaGorodOK',
    vk: 'https://vk.com/id226682363',
  },
  maps: {
    office:
      'https://yandex.ru/map-widget/v1/?um=constructor%3A72b2c669c8e516bd461606c51dd1c3eb0492d506ee6385542c59071731cea7b1&amp;source=constructor',
  },
};

// Утилиты для работы с контактными данными
export const getPhoneLink = () => `tel:${contactData.phone.replace(/\s|\(|\)|-/g, '')}`;
export const getEmailLink = () => `mailto:${contactData.email}`;
export const getWhatsAppText = (customText?: string) => {
  const defaultText = 'Здравствуйте! Интересует аренда квартиры в Мирном';
  return `${contactData.social.whatsapp}&text=${encodeURIComponent(customText || defaultText)}`;
};
