import { IconType } from 'react-icons'
import { FaTiktok, FaYoutube, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import { SiOpenai } from 'react-icons/si'
import { BiData } from 'react-icons/bi'
import { MdStorage, MdTextFields, MdNumbers, MdViewList, MdDataObject, MdSubject } from 'react-icons/md'

export interface NodeLink {
  type: 'input' | 'requirement' | 'output'
  label: string
  max_connect: number
  data_type: string[]
}

export interface NodeConfig {
  id: string
  name: string
  icon: IconType
  theme_color: string
  shape: 0 | 1 | 2
  links: NodeLink[]
}

export const nodesConfig: NodeConfig[] = [
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
    id: 'youtube',
    name: 'YouTube',
    icon: FaYoutube,
    theme_color: '#FF0000',
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
        type: 'output',
        label: 'Output',
        max_connect: 999,
        data_type: ['array', 'string']
      }
    ]
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: FaFacebook,
    theme_color: '#1877F2',
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
        data_type: ['object']
      }
    ]
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: FaInstagram,
    theme_color: '#E4405F',
    shape: 2,
    links: [
      {
        type: 'input',
        label: 'Input',
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
        label: 'Bearer Token',
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
    id: 'openai',
    name: 'OpenAI',
    icon: SiOpenai,
    theme_color: '#412991',
    shape: 1,
    links: [
      {
        type: 'input',
        label: 'Prompt',
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
        label: 'Response',
        max_connect: 999,
        data_type: ['string', 'object']
      }
    ]
  },
  {
    id: 'data-processor',
    name: 'Data Processor',
    icon: BiData,
    theme_color: '#10B981',
    shape: 0,
    links: [
      {
        type: 'input',
        label: 'Input',
        max_connect: 5,
        data_type: ['array', 'object', 'string']
      },
      {
        type: 'output',
        label: 'Output',
        max_connect: 999,
        data_type: ['array', 'object']
      }
    ]
  },
  {
    id: 'storage',
    name: 'Storage',
    icon: MdStorage,
    theme_color: '#F59E0B',
    shape: 1,
    links: [
      {
        type: 'input',
        label: 'Data',
        max_connect: 1,
        data_type: ['array', 'object', 'string']
      },
      {
        type: 'requirement',
        label: 'Config',
        max_connect: 1,
        data_type: ['object']
      },
      {
        type: 'output',
        label: 'Status',
        max_connect: 1,
        data_type: ['string']
      }
    ]
  },
  {
    id: 'input-string',
    name: 'String',
    icon: MdTextFields,
    theme_color: '#8B5CF6',
    shape: 0,
    links: [
      {
        type: 'output',
        label: 'Value',
        max_connect: 999,
        data_type: ['string']
      }
    ]
  },
  {
    id: 'input-int',
    name: 'Integer',
    icon: MdNumbers,
    theme_color: '#06B6D4',
    shape: 0,
    links: [
      {
        type: 'output',
        label: 'Value',
        max_connect: 999,
        data_type: ['number', 'int']
      }
    ]
  },
  {
    id: 'input-array',
    name: 'Array',
    icon: MdViewList,
    theme_color: '#EC4899',
    shape: 0,
    links: [
      {
        type: 'output',
        label: 'Items',
        max_connect: 999,
        data_type: ['array']
      }
    ]
  },
  {
    id: 'input-json',
    name: 'JSON',
    icon: MdDataObject,
    theme_color: '#14B8A6',
    shape: 0,
    links: [
      {
        type: 'output',
        label: 'Data',
        max_connect: 999,
        data_type: ['object', 'json']
      }
    ]
  },
  {
    id: 'input-textarea',
    name: 'Text Area',
    icon: MdSubject,
    theme_color: '#F97316',
    shape: 1,
    links: [
      {
        type: 'output',
        label: 'Text',
        max_connect: 999,
        data_type: ['string', 'text']
      }
    ]
  }
]
