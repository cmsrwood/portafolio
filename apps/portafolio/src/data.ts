export type Line = {
  ext: string
  title: string
  summary: string
  detail: string
  tools: string[]
}

export type Board = {
  id: string
  title: string
  intro: string
  lines: Line[]
}

/*
  Proyectos contados desde lo que construí, sin datos internos ni de clientes.
  Las extensiones agrupan: 100 trabajo, 200 por mi cuenta, 300 por gusto.
*/
export const BOARDS: Board[] = [
  {
    id: 'trabajo',
    title: 'En el trabajo',
    intro: 'En Nua Talker construyo agentes virtuales y todo lo que los conecta: la telefonía, el CRM y los reportes.',
    lines: [
      {
        ext: '101',
        title: 'Agentes virtuales de voz y chat',
        summary: 'El motor que atiende conversaciones de verdad.',
        detail:
          'Entiende lo que la persona pide, responde con voz natural o por chat y le pasa la conversación a alguien del equipo cuando hace falta.',
        tools: ['Node.js', 'TypeScript', 'AWS Lambda', 'DynamoDB', 'ElevenLabs'],
      },
      {
        ext: '102',
        title: 'Voz en llamadas reales',
        summary: 'Que el agente conteste el teléfono.',
        detail:
          'Conecté la telefonía de los clientes (PBX y troncales SIP sobre Asterisk) con voces de ElevenLabs para que el agente hable en una llamada de verdad, con su audio, sus silencios y sus cortes.',
        tools: ['Asterisk', 'SIP', 'WebSockets', 'ElevenLabs'],
      },
      {
        ext: '103',
        title: 'WhatsApp dentro de HubSpot',
        summary: 'Atender WhatsApp sin salir del CRM.',
        detail:
          'Una integración serverless con canal propio en HubSpot: los mensajes llegan a la bandeja del equipo y los contactos quedan sincronizados.',
        tools: ['HubSpot API', 'WhatsApp', 'AWS Lambda', 'API Gateway', 'AWS CDK'],
      },
      {
        ext: '104',
        title: 'Llamadas desde HubSpot',
        summary: 'Un canal de voz pegado al CRM.',
        detail: 'Para llamar y recibir llamadas desde HubSpot, conectado al mismo agente virtual de voz.',
        tools: ['HubSpot', 'Asterisk', 'Node.js'],
      },
      {
        ext: '105',
        title: 'Auditor de conversaciones',
        summary: 'Revisar con IA dónde se equivoca el agente.',
        detail:
          'Lee las conversaciones del agente virtual y señala dónde respondió mal o dónde la persona se quedó sin ayuda, para mejorar el agente con datos.',
        tools: ['React', 'LLMs', 'AWS'],
      },
      {
        ext: '106',
        title: 'Analítica de consumo',
        summary: 'Uso y costos por producto, en un solo lugar.',
        detail: 'Tableros para el equipo de cuentas: consumo, costos y oportunidades de cada cliente, filtrados por producto.',
        tools: ['React', 'HubSpot', 'Analítica'],
      },
    ],
  },
  {
    id: 'cuenta',
    title: 'Por mi cuenta',
    intro: 'Proyectos freelance para negocios en Bogotá.',
    lines: [
      {
        ext: '201',
        title: 'Diez landing pages para servicio técnico',
        summary: 'Páginas rápidas que aparecen en Google.',
        detail:
          'Diez sitios para negocios de reparación de celulares y Mac en Bogotá. Cada uno con su identidad, SEO local (datos estructurados, Open Graph, geolocalización) y desplegado en AWS Amplify.',
        tools: ['React', 'Vite', 'Tailwind CSS', 'SEO', 'AWS Amplify'],
      },
    ],
  },
  {
    id: 'gusto',
    title: 'Por gusto',
    intro: 'Lo que hago cuando nadie me lo pide.',
    lines: [
      {
        ext: '301',
        title: 'Echoes Beyond the Void',
        summary: 'Terror espacial con una IA de compañía.',
        detail:
          'Un juego en el que escapas de una nave invadida por criaturas junto a la IA de la nave, que conversa contigo. Hay miedo, pero también momentos de calma y un vínculo con ella.',
        tools: ['Unreal Engine 5', 'IA conversacional'],
      },
      {
        ext: '302',
        title: 'Umbral',
        summary: 'Un juego narrativo que pasa por Bogotá.',
        detail:
          'Una historia por capítulos en la que armas las respuestas de un personaje a partir de palabras incompletas. Uno de los capítulos pasa en Bogotá.',
        tools: ['Godot 4', 'GDScript'],
      },
      {
        ext: '303',
        title: 'Jarvis',
        summary: 'Mi asistente personal, local, en Windows.',
        detail:
          'Un asistente que corre en mi computador, con un núcleo desacoplado y habilidades que se le van agregando. Usa mis notas como memoria.',
        tools: ['LLMs', 'Windows'],
      },
      {
        ext: '304',
        title: 'Gestor de gastos',
        summary: 'Para saber en qué se me va la plata.',
        detail: 'Una app móvil personal para registrar y entender mis gastos.',
        tools: ['React Native', 'Expo', 'TypeScript'],
      },
    ],
  },
]

export const STACK: { group: string; items: string }[] = [
  { group: 'Frontend y móvil', items: 'React, React Native, Expo, TypeScript, Vite, Tailwind CSS' },
  { group: 'Backend', items: 'Node.js, Python, APIs REST, WebSockets' },
  { group: 'AWS', items: 'Lambda, API Gateway, DynamoDB, S3, CDK, Amplify, Amazon Connect, Lex' },
  { group: 'Voz', items: 'Asterisk, SIP, ElevenLabs' },
  { group: 'Juegos', items: 'Godot 4, Unreal Engine 5' },
]
