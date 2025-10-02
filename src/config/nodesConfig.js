import { FaTiktok, FaGoogle, FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaLinkedin, FaPinterest, FaTelegram, FaWhatsapp, FaDiscord, FaSlack, FaShopify, FaWordpress, FaFont, FaSortNumericUp, FaCode, FaToggleOn, FaList } from 'react-icons/fa';
import { SiGmail, SiWoocommerce } from 'react-icons/si';

export const nodesConfig = [
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: FaTiktok,
    theme_color: '#000000',
    shape: 0,
    links: [
      {
        type: 'input',
        label: 'Input',
        max_connect: 1,
        data_type: ['array', 'string']
      },
      {
        type: 'requirement',
        label: 'API Key',
        max_connect: 1,
        data_type: ['string']
      },
      {
        type: 'requirement',
        label: 'Keyword',
        max_connect: 1,
        data_type: ['array', 'string']
      },
      {
        type: 'output',
        label: 'Output',
        max_connect: 999,
        data_type: ['array', 'string']
      }
    ]
  },
  {
    id: 'google',
    name: 'Google',
    icon: FaGoogle,
    theme_color: '#4285F4',
    shape: 1,
    links: [
      {
        type: 'input',
        label: 'Input',
        max_connect: 1,
        data_type: ['string']
      },
      {
        type: 'requirement',
        label: 'API Key',
        max_connect: 1,
        data_type: ['string']
      },
      {
        type: 'output',
        label: 'Output',
        max_connect: 999,
        data_type: ['array', 'string']
      }
    ]
  },
  {
    id: 'gmail',
    name: 'Gmail',
    icon: SiGmail,
    theme_color: '#EA4335',
    shape: 2,
    links: [
      {
        type: 'input',
        label: 'Input',
        max_connect: 1,
        data_type: ['string', 'array']
      },
      {
        type: 'requirement',
        label: 'Credentials',
        max_connect: 1,
        data_type: ['string']
      },
      {
        type: 'output',
        label: 'Sent',
        max_connect: 999,
        data_type: ['boolean']
      }
    ]
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: FaFacebook,
    theme_color: '#1877F2',
    shape: 0,
    links: [
      {
        type: 'input',
        label: 'Input',
        max_connect: 1,
        data_type: ['string']
      },
      {
        type: 'requirement',
        label: 'Access Token',
        max_connect: 1,
        data_type: ['string']
      },
      {
        type: 'output',
        label: 'Output',
        max_connect: 999,
        data_type: ['array']
      }
    ]
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: FaInstagram,
    theme_color: '#E4405F',
    shape: 1,
    links: [
      {
        type: 'input',
        label: 'Input',
        max_connect: 1,
        data_type: ['string']
      },
      {
        type: 'requirement',
        label: 'API Key',
        max_connect: 1,
        data_type: ['string']
      },
      {
        type: 'output',
        label: 'Output',
        max_connect: 999,
        data_type: ['array']
      }
    ]
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: FaYoutube,
    theme_color: '#FF0000',
    shape: 2,
    links: [
      {
        type: 'input',
        label: 'Input',
        max_connect: 1,
        data_type: ['string']
      },
      {
        type: 'requirement',
        label: 'API Key',
        max_connect: 1,
        data_type: ['string']
      },
      {
        type: 'output',
        label: 'Output',
        max_connect: 999,
        data_type: ['array', 'string']
      }
    ]
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: FaTwitter,
    theme_color: '#1DA1F2',
    shape: 0,
    links: [
      {
        type: 'input',
        label: 'Input',
        max_connect: 1,
        data_type: ['string']
      },
      {
        type: 'requirement',
        label: 'API Key',
        max_connect: 1,
        data_type: ['string']
      },
      {
        type: 'output',
        label: 'Output',
        max_connect: 999,
        data_type: ['array']
      }
    ]
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: FaLinkedin,
    theme_color: '#0A66C2',
    shape: 1,
    links: [
      {
        type: 'input',
        label: 'Input',
        max_connect: 1,
        data_type: ['string']
      },
      {
        type: 'requirement',
        label: 'Access Token',
        max_connect: 1,
        data_type: ['string']
      },
      {
        type: 'output',
        label: 'Output',
        max_connect: 999,
        data_type: ['array']
      }
    ]
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    icon: FaPinterest,
    theme_color: '#E60023',
    shape: 2,
    links: [
      {
        type: 'input',
        label: 'Input',
        max_connect: 1,
        data_type: ['string']
      },
      {
        type: 'requirement',
        label: 'API Key',
        max_connect: 1,
        data_type: ['string']
      },
      {
        type: 'output',
        label: 'Output',
        max_connect: 999,
        data_type: ['array']
      }
    ]
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: FaTelegram,
    theme_color: '#26A5E4',
    shape: 0,
    links: [
      {
        type: 'input',
        label: 'Input',
        max_connect: 1,
        data_type: ['string']
      },
      {
        type: 'requirement',
        label: 'Bot Token',
        max_connect: 1,
        data_type: ['string']
      },
      {
        type: 'output',
        label: 'Output',
        max_connect: 999,
        data_type: ['boolean']
      }
    ]
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: FaWhatsapp,
    theme_color: '#25D366',
    shape: 1,
    links: [
      {
        type: 'input',
        label: 'Input',
        max_connect: 1,
        data_type: ['string']
      },
      {
        type: 'requirement',
        label: 'API Key',
        max_connect: 1,
        data_type: ['string']
      },
      {
        type: 'output',
        label: 'Output',
        max_connect: 999,
        data_type: ['boolean']
      }
    ]
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: FaDiscord,
    theme_color: '#5865F2',
    shape: 2,
    links: [
      {
        type: 'input',
        label: 'Input',
        max_connect: 1,
        data_type: ['string']
      },
      {
        type: 'requirement',
        label: 'Bot Token',
        max_connect: 1,
        data_type: ['string']
      },
      {
        type: 'output',
        label: 'Output',
        max_connect: 999,
        data_type: ['boolean']
      }
    ]
  },
  {
    id: 'slack',
    name: 'Slack',
    icon: FaSlack,
    theme_color: '#4A154B',
    shape: 0,
    links: [
      {
        type: 'input',
        label: 'Input',
        max_connect: 1,
        data_type: ['string']
      },
      {
        type: 'requirement',
        label: 'Webhook URL',
        max_connect: 1,
        data_type: ['string']
      },
      {
        type: 'output',
        label: 'Output',
        max_connect: 999,
        data_type: ['boolean']
      }
    ]
  },
  {
    id: 'shopify',
    name: 'Shopify',
    icon: FaShopify,
    theme_color: '#96BF48',
    shape: 1,
    links: [
      {
        type: 'input',
        label: 'Input',
        max_connect: 1,
        data_type: ['array']
      },
      {
        type: 'requirement',
        label: 'API Key',
        max_connect: 1,
        data_type: ['string']
      },
      {
        type: 'requirement',
        label: 'Store URL',
        max_connect: 1,
        data_type: ['string']
      },
      {
        type: 'output',
        label: 'Output',
        max_connect: 999,
        data_type: ['array']
      }
    ]
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    icon: FaWordpress,
    theme_color: '#21759B',
    shape: 2,
    links: [
      {
        type: 'input',
        label: 'Input',
        max_connect: 1,
        data_type: ['string']
      },
      {
        type: 'requirement',
        label: 'Credentials',
        max_connect: 1,
        data_type: ['string']
      },
      {
        type: 'output',
        label: 'Output',
        max_connect: 999,
        data_type: ['boolean']
      }
    ]
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    icon: SiWoocommerce,
    theme_color: '#96588A',
    shape: 0,
    links: [
      {
        type: 'input',
        label: 'Input',
        max_connect: 1,
        data_type: ['array']
      },
      {
        type: 'requirement',
        label: 'API Key',
        max_connect: 1,
        data_type: ['string']
      },
      {
        type: 'requirement',
        label: 'Store URL',
        max_connect: 1,
        data_type: ['string']
      },
      {
        type: 'output',
        label: 'Output',
        max_connect: 999,
        data_type: ['array']
      }
    ]
  }
];

export const inputNodes = [
  {
    id: 'input-text',
    name: 'Text',
    icon: FaFont,
    theme_color: '#6366f1',
    shape: 1,
    category: 'input',
    fields: [
      {
        id: 'value',
        label: 'Text Value',
        type: 'text',
        default: ''
      }
    ],
    links: [
      {
        type: 'output',
        label: 'Text',
        max_connect: 999,
        data_type: ['string']
      }
    ]
  },
  {
    id: 'input-number',
    name: 'Number',
    icon: FaSortNumericUp,
    theme_color: '#10b981',
    shape: 1,
    category: 'input',
    fields: [
      {
        id: 'value',
        label: 'Number Value',
        type: 'number',
        default: 0
      }
    ],
    links: [
      {
        type: 'output',
        label: 'Number',
        max_connect: 999,
        data_type: ['number']
      }
    ]
  },
  {
    id: 'input-json',
    name: 'JSON',
    icon: FaCode,
    theme_color: '#f59e0b',
    shape: 1,
    category: 'input',
    fields: [
      {
        id: 'value',
        label: 'JSON Data',
        type: 'textarea',
        default: '{}'
      }
    ],
    links: [
      {
        type: 'output',
        label: 'Data',
        max_connect: 999,
        data_type: ['array', 'object']
      }
    ]
  },
  {
    id: 'input-boolean',
    name: 'Boolean',
    icon: FaToggleOn,
    theme_color: '#8b5cf6',
    shape: 1,
    category: 'input',
    fields: [
      {
        id: 'value',
        label: 'Value',
        type: 'checkbox',
        default: false
      }
    ],
    links: [
      {
        type: 'output',
        label: 'Boolean',
        max_connect: 999,
        data_type: ['boolean']
      }
    ]
  },
  {
    id: 'input-list',
    name: 'List',
    icon: FaList,
    theme_color: '#ef4444',
    shape: 1,
    category: 'input',
    fields: [
      {
        id: 'value',
        label: 'List Items (one per line)',
        type: 'textarea',
        default: ''
      }
    ],
    links: [
      {
        type: 'output',
        label: 'Array',
        max_connect: 999,
        data_type: ['array']
      }
    ]
  }
];
