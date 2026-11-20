// Base de datos expandida de lecciones, unidades y situaciones de la vida real

export const UNITS = [
  {
    id: 1,
    title: "Mundo 1: Primeros Pasos y Saludos",
    subtitle: "Aprende a presentarte y romper el hielo sin miedo",
    icon: "👋",
    badge: "Básico A0",
    color: "from-emerald-500 to-teal-700",
    description: "Lo fundamental para hablar inglés desde el primer minuto con confianza.",
    lessons: [
      {
        id: "u1_l1",
        title: "Saludos de Impacto",
        desc: "Hello, Good morning, How are you?",
        xp: 25,
        vocab: [
          {
            word: "Hello",
            phonetic: "je-lóu",
            translation: "Hola",
            image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=500&auto=format&fit=crop&q=60",
            example: "Hello, how are you?",
            exampleTrans: "Hola, ¿cómo estás?"
          },
          {
            word: "Good morning",
            phonetic: "gud mór-ning",
            translation: "Buenos días",
            image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&auto=format&fit=crop&q=60",
            example: "Good morning, my friend!",
            exampleTrans: "¡Buenos días, mi amigo!"
          },
          {
            word: "Good evening",
            phonetic: "gud ív-ning",
            translation: "Buenas tardes / noches",
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=60",
            example: "Good evening, welcome!",
            exampleTrans: "¡Buenas tardes, bienvenido!"
          },
          {
            word: "Goodbye",
            phonetic: "gud-bái",
            translation: "Adiós / Hasta luego",
            image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&auto=format&fit=crop&q=60",
            example: "Goodbye, see you tomorrow!",
            exampleTrans: "¡Adiós, nos vemos mañana!"
          }
        ],
        exercises: [
          {
            type: "flashcard",
            word: "Hello",
            phonetic: "je-lóu",
            meaning: "Hola",
            tip: "Úsalo a cualquier hora del día con cualquier persona sin importar su edad.",
            example: "Hello, my friend."
          },
          {
            type: "multiple_choice",
            question: "¿Cómo se dice 'Buenos días' en inglés?",
            englishPrompt: "Buenos días",
            options: ["Good morning", "Goodbye", "Good evening", "Hello"],
            correctIndex: 0,
            phoneticHelp: "gud mór-ning"
          },
          {
            type: "listening",
            targetText: "Hello",
            phonetic: "je-lóu",
            question: "Escucha con atención y selecciona la palabra correcta:",
            options: ["Help", "Hello", "Hotel", "Hold"],
            correctIndex: 1
          },
          {
            type: "sentence_builder",
            question: "Ordena las palabras para decir: 'Buenos días amigo'",
            correctSentence: "Good morning friend",
            words: ["morning", "Good", "night", "friend", "Hello"]
          },
          {
            type: "speaking",
            targetText: "Good morning",
            phonetic: "gud mór-ning",
            meaning: "Buenos días",
            prompt: "Presiona el micrófono y pronuncia en voz alta:"
          },
          {
            type: "match_pairs",
            question: "Empareja cada palabra con su traducción en español:",
            pairs: [
              { english: "Hello", spanish: "Hola" },
              { english: "Goodbye", spanish: "Adiós" },
              { english: "Good morning", spanish: "Buenos días" },
              { english: "Good evening", spanish: "Buenas tardes" }
            ]
          }
        ]
      },
      {
        id: "u1_l2",
        title: "Cortesía y Agradecimiento",
        desc: "Please, Thank you, You're welcome",
        xp: 30,
        vocab: [
          {
            word: "Please",
            phonetic: "pliiz",
            translation: "Por favor",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=60",
            example: "Coffee, please.",
            exampleTrans: "Café, por favor."
          },
          {
            word: "Thank you",
            phonetic: "zenk-iu",
            translation: "Gracias",
            image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=500&auto=format&fit=crop&q=60",
            example: "Thank you very much!",
            exampleTrans: "¡Muchas gracias!"
          },
          {
            word: "You are welcome",
            phonetic: "iur wél-kom",
            translation: "De nada",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60",
            example: "You are welcome, sir.",
            exampleTrans: "De nada, señor."
          },
          {
            word: "Excuse me",
            phonetic: "eks-kiús mi",
            translation: "Disculpe / Con permiso",
            image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&auto=format&fit=crop&q=60",
            example: "Excuse me, where is the hotel?",
            exampleTrans: "Disculpe, ¿dónde está el hotel?"
          }
        ],
        exercises: [
          {
            type: "multiple_choice",
            question: "¿Cómo se dice 'Gracias' en inglés?",
            englishPrompt: "Gracias",
            options: ["Please", "Thank you", "Sorry", "Welcome"],
            correctIndex: 1,
            phoneticHelp: "zenk-iu"
          },
          {
            type: "listening",
            targetText: "Thank you",
            phonetic: "zenk-iu",
            question: "Escucha el audio y escoge la opción:",
            options: ["Think you", "Thank you", "Tank you", "Take you"],
            correctIndex: 1
          },
          {
            type: "sentence_builder",
            question: "Ordena las palabras para decir: 'Por favor y gracias'",
            correctSentence: "Please and thank you",
            words: ["you", "Please", "and", "hello", "thank"]
          },
          {
            type: "speaking",
            targetText: "Thank you very much",
            phonetic: "zenk-iu vé-ri mach",
            meaning: "Muchas gracias",
            prompt: "Pronuncia la frase completa con claridad:"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Mundo 2: En el Restaurante y Cafetería",
    subtitle: "Pide tus bebidas y platillos favoritos sin titubear",
    icon: "☕",
    badge: "Comida & Pedidos",
    color: "from-amber-500 to-orange-700",
    description: "Aprende a pedir café, agua, comida favorita y a pagar en cualquier restaurante.",
    lessons: [
      {
        id: "u2_l1",
        title: "Bebidas y Pedidos Rápidos",
        desc: "Coffee, Water, I would like...",
        xp: 35,
        vocab: [
          {
            word: "Coffee",
            phonetic: "kó-fi",
            translation: "Café",
            image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&auto=format&fit=crop&q=60",
            example: "Hot coffee, please.",
            exampleTrans: "Café caliente, por favor."
          },
          {
            word: "Water",
            phonetic: "wá-ter",
            translation: "Agua",
            image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=500&auto=format&fit=crop&q=60",
            example: "Cold water, please.",
            exampleTrans: "Agua fría, por favor."
          },
          {
            word: "I would like",
            phonetic: "ai wud laik",
            translation: "Me gustaría / Quisiera",
            image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&auto=format&fit=crop&q=60",
            example: "I would like a coffee.",
            exampleTrans: "Quisiera un café."
          },
          {
            word: "How much is it?",
            phonetic: "jau mach is it?",
            translation: "¿Cuánto cuesta?",
            image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=500&auto=format&fit=crop&q=60",
            example: "How much is the tea?",
            exampleTrans: "¿Cuánto cuesta el té?"
          }
        ],
        exercises: [
          {
            type: "multiple_choice",
            question: "¿Cómo se dice 'Quisiera un café'?",
            englishPrompt: "Quisiera un café",
            options: [
              "I would like a coffee",
              "I have a coffee",
              "You like a water",
              "Give me coffee"
            ],
            correctIndex: 0,
            phoneticHelp: "ai wud laik ei kó-fi"
          },
          {
            type: "sentence_builder",
            question: "Forma la frase: 'Quisiera agua por favor'",
            correctSentence: "I would like water please",
            words: ["would", "water", "I", "please", "like", "tea"]
          },
          {
            type: "speaking",
            targetText: "How much is it?",
            phonetic: "jau mach is it?",
            meaning: "¿Cuánto cuesta?",
            prompt: "Pregunta el precio como si estuvieras en una tienda:"
          },
          {
            type: "match_pairs",
            question: "Une las palabras de restaurante:",
            pairs: [
              { english: "Water", spanish: "Agua" },
              { english: "Coffee", spanish: "Café" },
              { english: "The check please", spanish: "La cuenta por favor" },
              { english: "Delicious", spanish: "Delicioso" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Mundo 3: Números, Horas y Dinero",
    subtitle: "Domina precios, horarios de vuelos y compras",
    icon: "🔢",
    badge: "Vida Práctica",
    color: "from-cyan-500 to-blue-700",
    description: "Números indispensables del 1 al 100, la hora y cómo entender precios.",
    lessons: [
      {
        id: "u3_l1",
        title: "Números Clave y Compras",
        desc: "One, Ten, Twenty, Dollars",
        xp: 35,
        vocab: [
          {
            word: "One, Two, Three",
            phonetic: "uan, tu, zrii",
            translation: "Uno, Dos, Tres",
            image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500&auto=format&fit=crop&q=60",
            example: "Three tickets, please.",
            exampleTrans: "Tres boletos, por favor."
          },
          {
            word: "Ten, Twenty, Fifty",
            phonetic: "ten, tuén-ti, fíf-ti",
            translation: "Diez, Veinte, Cincuenta",
            image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=500&auto=format&fit=crop&q=60",
            example: "It costs twenty dollars.",
            exampleTrans: "Cuesta veinte dólares."
          },
          {
            word: "What time is it?",
            phonetic: "wat táim is it?",
            translation: "¿Qué hora es?",
            image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=500&auto=format&fit=crop&q=60",
            example: "Excuse me, what time is it?",
            exampleTrans: "Disculpe, ¿qué hora es?"
          }
        ],
        exercises: [
          {
            type: "multiple_choice",
            question: "¿Cómo preguntas '¿Qué hora es?' en inglés?",
            englishPrompt: "¿Qué hora es?",
            options: [
              "What time is it?",
              "Where is the time?",
              "How much time is?",
              "Who is the clock?"
            ],
            correctIndex: 0,
            phoneticHelp: "wat táim is it?"
          },
          {
            type: "speaking",
            targetText: "Twenty dollars please",
            phonetic: "tuén-ti dó-lars pliiz",
            meaning: "Veinte dólares por favor",
            prompt: "Pronuncia el precio con claridad:"
          },
          {
            type: "sentence_builder",
            question: "Forma la frase: 'Dos cafés por favor'",
            correctSentence: "Two coffees please",
            words: ["Two", "please", "coffees", "three", "water"]
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Mundo 4: El Gran Viaje y Direcciones",
    subtitle: "Aeropuerto, taxis, hoteles y no perderse nunca",
    icon: "✈️",
    badge: "Viajes & Ciudad",
    color: "from-indigo-500 to-purple-700",
    description: "Pregunta direcciones, toma transporte y ubica lugares esenciales en cualquier país.",
    lessons: [
      {
        id: "u4_l1",
        title: "¿Dónde está...? (Ubicaciones)",
        desc: "Where is the bathroom, hotel, airport",
        xp: 40,
        vocab: [
          {
            word: "Where is...?",
            phonetic: "wer is...?",
            translation: "¿Dónde está...?",
            image: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=500&auto=format&fit=crop&q=60",
            example: "Where is the airport?",
            exampleTrans: "¿Dónde está el aeropuerto?"
          },
          {
            word: "Bathroom",
            phonetic: "báz-rum",
            translation: "Baño / Sanitario",
            image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&auto=format&fit=crop&q=60",
            example: "Where is the bathroom?",
            exampleTrans: "¿Dónde está el baño?"
          },
          {
            word: "Hotel",
            phonetic: "jou-tél",
            translation: "Hotel",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop&q=60",
            example: "I need a hotel.",
            exampleTrans: "Necesito un hotel."
          },
          {
            word: "Taxi",
            phonetic: "ták-si",
            translation: "Taxi",
            image: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=500&auto=format&fit=crop&q=60",
            example: "Call a taxi, please.",
            exampleTrans: "Llame a un taxi, por favor."
          }
        ],
        exercises: [
          {
            type: "multiple_choice",
            question: "¿Cómo preguntas '¿Dónde está el baño?'",
            englishPrompt: "¿Dónde está el baño?",
            options: [
              "Where is the bathroom?",
              "What is the hotel?",
              "Where is the coffee?",
              "Who is the taxi?"
            ],
            correctIndex: 0,
            phoneticHelp: "wer is de báz-rum"
          },
          {
            type: "speaking",
            targetText: "Where is the hotel?",
            phonetic: "wer is de jou-tél?",
            meaning: "¿Dónde está el hotel?",
            prompt: "Pide la ubicación con tu voz:"
          },
          {
            type: "sentence_builder",
            question: "Forma la pregunta: '¿Dónde está el aeropuerto?'",
            correctSentence: "Where is the airport",
            words: ["the", "Where", "hotel", "airport", "is", "taxi"]
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Mundo 5: Conocer Gente y Vida Social",
    subtitle: "Presentarte, hablar de tu origen y hacer amigos",
    icon: "🤝",
    badge: "Social & Amigos",
    color: "from-pink-500 to-rose-700",
    description: "Expresa quién eres, qué te gusta y comprende a personas nativas al conversar.",
    lessons: [
      {
        id: "u5_l1",
        title: "Presentación Personal",
        desc: "My name is, Where are you from?",
        xp: 40,
        vocab: [
          {
            word: "My name is...",
            phonetic: "mai néim is...",
            translation: "Mi nombre es...",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60",
            example: "My name is Carlos.",
            exampleTrans: "Mi nombre es Carlos."
          },
          {
            word: "Nice to meet you",
            phonetic: "náis tu miit iu",
            translation: "Mucho gusto en conocerte",
            image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=500&auto=format&fit=crop&q=60",
            example: "Nice to meet you, friend!",
            exampleTrans: "¡Mucho gusto en conocerte, amigo!"
          },
          {
            word: "Where are you from?",
            phonetic: "wer ar iu from?",
            translation: "¿De dónde eres?",
            image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=500&auto=format&fit=crop&q=60",
            example: "Where are you from, Maria?",
            exampleTrans: "¿De dónde eres, María?"
          }
        ],
        exercises: [
          {
            type: "multiple_choice",
            question: "¿Qué dices cuando conoces a alguien por primera vez?",
            englishPrompt: "Mucho gusto en conocerte",
            options: [
              "Nice to meet you",
              "Where is the bathroom",
              "Good night friend",
              "Help me please"
            ],
            correctIndex: 0,
            phoneticHelp: "náis tu miit iu"
          },
          {
            type: "speaking",
            targetText: "Nice to meet you",
            phonetic: "náis tu miit iu",
            meaning: "Mucho gusto en conocerte",
            prompt: "Dilo con una sonrisa amigable:"
          },
          {
            type: "sentence_builder",
            question: "Forma la frase: 'Mi nombre es Alex'",
            correctSentence: "My name is Alex",
            words: ["Alex", "is", "My", "hotel", "name"]
          }
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Mundo 6: Frases Salvavidas y Salud",
    subtitle: "Para cuando no entiendas o necesites ayuda médica urgente",
    icon: "🚨",
    badge: "Seguridad & Salud",
    color: "from-rose-600 to-red-800",
    description: "Frases de seguridad que te salvarán en cualquier país de habla inglesa.",
    lessons: [
      {
        id: "u6_l1",
        title: "Ayuda y Comprensión Inmediata",
        desc: "Help me, I don't understand, Speak slowly",
        xp: 45,
        vocab: [
          {
            word: "Help me",
            phonetic: "jelp mi",
            translation: "Ayúdame / Ayuda",
            image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=500&auto=format&fit=crop&q=60",
            example: "Can you help me?",
            exampleTrans: "¿Puedes ayudarme?"
          },
          {
            word: "I don't understand",
            phonetic: "ai dont an-der-stánd",
            translation: "No entiendo",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60",
            example: "Sorry, I do not understand.",
            exampleTrans: "Disculpe, no entiendo."
          },
          {
            word: "Speak slowly, please",
            phonetic: "spik slóu-li, pliiz",
            translation: "Hable despacio, por favor",
            image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=500&auto=format&fit=crop&q=60",
            example: "Can you speak slowly?",
            exampleTrans: "¿Puede hablar más despacio?"
          },
          {
            word: "Do you speak Spanish?",
            phonetic: "du iu spik spá-nish?",
            translation: "¿Habla usted español?",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop&q=60",
            example: "Excuse me, do you speak Spanish?",
            exampleTrans: "Disculpe, ¿habla español?"
          }
        ],
        exercises: [
          {
            type: "multiple_choice",
            question: "¿Qué dices si alguien te habla muy rápido y no entiendes?",
            englishPrompt: "Hable despacio por favor",
            options: [
              "Speak slowly please",
              "Thank you very much",
              "Good evening friend",
              "Where is the hotel"
            ],
            correctIndex: 0,
            phoneticHelp: "spik slóu-li pliiz"
          },
          {
            type: "speaking",
            targetText: "Do you speak Spanish?",
            phonetic: "du iu spik spá-nish?",
            meaning: "¿Hablas español?",
            prompt: "Pronuncia la pregunta mágica:"
          },
          {
            type: "sentence_builder",
            question: "Forma la frase: 'No entiendo'",
            correctSentence: "I do not understand",
            words: ["understand", "I", "slowly", "not", "do", "help"]
          }
        ]
      }
    ]
  }
];

// Diálogos de Simulación de la Vida Real (Roleplay con Audio Automático)
export const REAL_LIFE_DIALOGUES = [
  {
    id: "cafe_order",
    title: "☕ Pedir un café en Starbucks",
    level: "Principiante",
    situation: "Llegas al mostrador y quieres ordenar un café caliente y pedir la cuenta.",
    avatar: " barista ☕",
    messages: [
      { sender: "bot", text: "Hello! Welcome to Coffee House. What can I get for you today?", trans: "¡Hola! Bienvenido. ¿Qué te puedo servir hoy?", audio: "Hello! Welcome to Coffee House. What can I get for you today?" },
      { sender: "user_choices", options: [
        { text: "Hello! I would like a coffee, please.", trans: "¡Hola! Quisiera un café, por favor.", correct: true },
        { text: "Where is the airport?", trans: "¿Dónde está el aeropuerto?", correct: false }
      ]},
      { sender: "bot", text: "Sure thing! Do you want it hot or iced?", trans: "¡Seguro! ¿Lo deseas caliente o con hielo?", audio: "Sure thing! Do you want it hot or iced?" },
      { sender: "user_choices", options: [
        { text: "Hot coffee, please.", trans: "Café caliente, por favor.", correct: true },
        { text: "Good evening friend.", trans: "Buenas noches amigo.", correct: false }
      ]},
      { sender: "bot", text: "Great. That will be three dollars. How are you paying?", trans: "Excelente. Serán tres dólares. ¿Cómo va a pagar?", audio: "Great. That will be three dollars. How are you paying?" },
      { sender: "user_choices", options: [
        { text: "With credit card, please. Thank you!", trans: "Con tarjeta de crédito, por favor. ¡Gracias!", correct: true },
        { text: "I don't understand speak slowly.", trans: "No entiendo hable despacio.", correct: false }
      ]},
      { sender: "bot", text: "Here is your coffee! Have an awesome day!", trans: "¡Aquí tiene su café! ¡Que tenga un excelente día!", audio: "Here is your coffee! Have an awesome day!" }
    ]
  },
  {
    id: "airport_directions",
    title: "✈️ En el Aeropuerto / Taxi",
    level: "Principiante",
    situation: "Acabas de aterrizar y necesitas tomar un taxi rumbo a tu hotel.",
    avatar: " taxista 🚕",
    messages: [
      { sender: "bot", text: "Hi there! Taxi service, where are you heading?", trans: "¡Hola! Servicio de taxi, ¿hacia dónde se dirige?", audio: "Hi there! Taxi service, where are you heading?" },
      { sender: "user_choices", options: [
        { text: "Hello! To the Grand Hotel, please.", trans: "¡Hola! Al Hotel Grand, por favor.", correct: true },
        { text: "Water delicious please.", trans: "Agua delicioso por favor.", correct: false }
      ]},
      { sender: "bot", text: "Got it! Put your bags in the back and hop in.", trans: "¡Entendido! Pon tus maletas atrás y sube.", audio: "Got it! Put your bags in the back and hop in." },
      { sender: "user_choices", options: [
        { text: "How much is it to the hotel?", trans: "¿Cuánto cuesta hasta el hotel?", correct: true },
        { text: "You are welcome goodbye.", trans: "De nada adiós.", correct: false }
      ]},
      { sender: "bot", text: "It is about twenty dollars. We will be there in 15 minutes.", trans: "Son unos veinte dólares. Llegaremos en 15 minutos.", audio: "It is about twenty dollars. We will be there in 15 minutes." },
      { sender: "user_choices", options: [
        { text: "Perfect, thank you very much!", trans: "¡Perfecto, muchas gracias!", correct: true },
        { text: "Do you like tea?", trans: "¿Te gusta el té?", correct: false }
      ]},
      { sender: "bot", text: "You're welcome! Enjoy your stay!", trans: "¡De nada! ¡Disfrute su estancia!", audio: "You are welcome! Enjoy your stay!" }
    ]
  },
  {
    id: "doctor_emergency",
    title: "🏥 En la Farmacia / Médico",
    level: "Intermedio",
    situation: "Te sientes mal en tu viaje y necesitas pedir medicamento en la farmacia.",
    avatar: " farmacéutico 🩺",
    messages: [
      { sender: "bot", text: "Hello! How can I help you today?", trans: "¡Hola! ¿Cómo le puedo ayudar hoy?", audio: "Hello! How can I help you today?" },
      { sender: "user_choices", options: [
        { text: "Hello, I have a headache and need medicine.", trans: "Hola, tengo dolor de cabeza y necesito medicina.", correct: true },
        { text: "I would like a hot coffee.", trans: "Quisiera un café caliente.", correct: false }
      ]},
      { sender: "bot", text: "I have this pain reliever. Take one pill every eight hours with water.", trans: "Tengo este analgésico. Tome una pastilla cada 8 horas con agua.", audio: "I have this pain reliever. Take one pill every eight hours with water." },
      { sender: "user_choices", options: [
        { text: "Thank you! How much is it?", trans: "¡Gracias! ¿Cuánto cuesta?", correct: true },
        { text: "Good night see you tomorrow.", trans: "Buenas noches hasta mañana.", correct: false }
      ]},
      { sender: "bot", text: "It is five dollars. Drink plenty of water and feel better soon!", trans: "Son cinco dólares. ¡Beba mucha agua y mejórese pronto!", audio: "It is five dollars. Drink plenty of water and feel better soon!" }
    ]
  }
];

// Diccionario de Bolsillo Instantáneo con Pronunciación en Español
export const POCKET_DICTIONARY = [
  { eng: "Hello", esp: "Hola", phon: "je-lóu", cat: "Básicos" },
  { eng: "Good morning", esp: "Buenos días", phon: "gud mór-ning", cat: "Básicos" },
  { eng: "Good afternoon", esp: "Buenas tardes", phon: "gud af-ter-nún", cat: "Básicos" },
  { eng: "Good night", esp: "Buenas noches (al despedirse)", phon: "gud náit", cat: "Básicos" },
  { eng: "Please", esp: "Por favor", phon: "pliiz", cat: "Básicos" },
  { eng: "Thank you", esp: "Gracias", phon: "zenk-iu", cat: "Básicos" },
  { eng: "You're welcome", esp: "De nada", phon: "iur wél-kom", cat: "Básicos" },
  { eng: "Excuse me", esp: "Disculpe / Con permiso", phon: "eks-kiús mi", cat: "Básicos" },
  { eng: "I'm sorry", esp: "Lo siento / Perdón", phon: "aim só-ri", cat: "Básicos" },
  { eng: "Yes / No", esp: "Sí / No", phon: "ies / nóu", cat: "Básicos" },

  { eng: "Where is the bathroom?", esp: "¿Dónde está el baño?", phon: "wer is de báz-rum?", cat: "Viajes" },
  { eng: "Where is the airport?", esp: "¿Dónde está el aeropuerto?", phon: "wer is di ér-port?", cat: "Viajes" },
  { eng: "I need a taxi", esp: "Necesito un taxi", phon: "ai niid ei ták-si", cat: "Viajes" },
  { eng: "Where is the hotel?", esp: "¿Dónde está el hotel?", phon: "wer is de jou-tél?", cat: "Viajes" },
  { eng: "Turn left / right", esp: "Gire a la izquierda / derecha", phon: "torn left / ráit", cat: "Viajes" },

  { eng: "How much is it?", esp: "¿Cuánto cuesta?", phon: "jau mach is it?", cat: "Compras" },
  { eng: "Can I pay by card?", esp: "¿Puedo pagar con tarjeta?", phon: "kan ai péi bai kard?", cat: "Compras" },
  { eng: "It is too expensive", esp: "Es demasiado caro", phon: "it is tu eks-pén-siv", cat: "Compras" },

  { eng: "The bill, please", esp: "La cuenta, por favor", phon: "de bil, pliiz", cat: "Restaurante" },
  { eng: "Water, please", esp: "Agua, por favor", phon: "wá-ter, pliiz", cat: "Restaurante" },
  { eng: "Coffee with milk", esp: "Café con leche", phon: "kó-fi wiz milk", cat: "Restaurante" },
  { eng: "I am hungry", esp: "Tengo hambre", phon: "aim ján-gri", cat: "Restaurante" },
  { eng: "Delicious", esp: "Delicioso", phon: "de-lí-shas", cat: "Restaurante" },

  { eng: "Help me, please", esp: "Ayúdeme, por favor", phon: "jelp mi, pliiz", cat: "Emergencias" },
  { eng: "I don't understand", esp: "No entiendo", phon: "ai dont an-der-stánd", cat: "Emergencias" },
  { eng: "Speak slower, please", esp: "Hable más despacio, por favor", phon: "spik slóu-er, pliiz", cat: "Emergencias" },
  { eng: "Do you speak Spanish?", esp: "¿Habla español?", phon: "du iu spik spá-nish?", cat: "Emergencias" },
  { eng: "Call a doctor", esp: "Llame a un doctor", phon: "kol ei dóc-tor", cat: "Emergencias" },
  { eng: "Call the police", esp: "Llame a la policía", phon: "kol de po-liis", cat: "Emergencias" },
  { eng: "I lost my passport", esp: "Perdí mi pasaporte", phon: "ai lost mai pás-port", cat: "Emergencias" },

  { eng: "My name is...", esp: "Mi nombre es...", phon: "mai néim is...", cat: "Presentación" },
  { eng: "Nice to meet you", esp: "Mucho gusto en conocerte", phon: "náis tu miit iu", cat: "Presentación" },
  { eng: "Where are you from?", esp: "¿De dónde eres?", phon: "wer ar iu from?", cat: "Presentación" },
  { eng: "I am from...", esp: "Yo soy de...", phon: "ai am from...", cat: "Presentación" },
  { eng: "See you later!", esp: "¡Hasta luego!", phon: "sii iu léi-ter", cat: "Presentación" }
];
