// Datos y configuraciones para los juegos y puzzles didácticos de EnglishGo!

// 1. Memory Match (Tarjetas de Memoria Auditiva)
export const MEMORY_CARDS = [
  { id: 'm1', eng: 'Coffee', esp: 'Café', icon: '☕', phon: 'kó-fi' },
  { id: 'm2', eng: 'Water', esp: 'Agua', icon: '💧', phon: 'wá-ter' },
  { id: 'm3', eng: 'Airport', esp: 'Aeropuerto', icon: '✈️', phon: 'ér-port' },
  { id: 'm4', eng: 'Hotel', esp: 'Hotel', icon: '🏨', phon: 'jou-tél' },
  { id: 'm5', eng: 'Taxi', esp: 'Taxi', icon: '🚕', phon: 'ták-si' },
  { id: 'm6', eng: 'Money', esp: 'Dinero', icon: '💵', phon: 'má-ni' },
  { id: 'm7', eng: 'Bathroom', esp: 'Baño', icon: '🚻', phon: 'báz-rum' },
  { id: 'm8', eng: 'Friend', esp: 'Amigo', icon: '🤝', phon: 'frend' }
];

// 2. Word Blitz (Carrera Contrarreloj)
export const BLITZ_QUESTIONS = [
  { esp: 'Gracias', correct: 'Thank you', options: ['Thank you', 'Please', 'Excuse me'] },
  { esp: 'Por favor', correct: 'Please', options: ['Sorry', 'Please', 'Welcome'] },
  { esp: 'Buenos días', correct: 'Good morning', options: ['Good morning', 'Good night', 'Goodbye'] },
  { esp: '¿Dónde está?', correct: 'Where is...?', options: ['Where is...?', 'Who is...?', 'What is...?'] },
  { esp: 'La cuenta por favor', correct: 'The bill please', options: ['The bill please', 'The water please', 'The menu please'] },
  { esp: 'No entiendo', correct: "I don't understand", options: ["I don't understand", "I don't know", "I speak English"] },
  { esp: 'Mucho gusto', correct: 'Nice to meet you', options: ['Nice to meet you', 'See you tomorrow', 'You are welcome'] },
  { esp: '¿Cuánto cuesta?', correct: 'How much is it?', options: ['How much is it?', 'How are you?', 'Where are you?'] },
  { esp: 'Ayúdame por favor', correct: 'Help me please', options: ['Help me please', 'Call me please', 'Tell me please'] },
  { esp: 'Agua fría', correct: 'Cold water', options: ['Cold water', 'Hot tea', 'Sweet coffee'] },
  { esp: 'Hable despacio', correct: 'Speak slowly', options: ['Speak slowly', 'Speak loudly', 'Listen carefully'] },
  { esp: 'Necesito un taxi', correct: 'I need a taxi', options: ['I need a taxi', 'I have a taxi', 'I drive a taxi'] }
];

// 3. Sentence Puzzle (Rompecabezas de Oraciones)
export const SENTENCE_PUZZLES = [
  {
    id: 'p1',
    goalSpanish: 'Quisiera un café caliente por favor',
    slots: ['Sujeto + Deseo', 'Objeto', 'Cortesía'],
    correct: ['I would like', 'a hot coffee', 'please'],
    pieces: ['a hot coffee', 'I would like', 'tomorrow', 'please', 'yesterday']
  },
  {
    id: 'p2',
    goalSpanish: '¿Dónde está el baño más cercano?',
    slots: ['Pregunta', 'Lugar', 'Cortesía'],
    correct: ['Where is', 'the nearest bathroom', 'excuse me'],
    pieces: ['the nearest bathroom', 'Where is', 'excuse me', 'How much', 'at night']
  },
  {
    id: 'p3',
    goalSpanish: 'Mi nombre es Alex y soy de México',
    slots: ['Presentación', 'Conector', 'Origen'],
    correct: ['My name is Alex', 'and I am', 'from Mexico'],
    pieces: ['and I am', 'My name is Alex', 'from Mexico', 'very good', 'thanks']
  },
  {
    id: 'p4',
    goalSpanish: '¿Puede hablar más despacio por favor?',
    slots: ['Petición', 'Acción', 'Cortesía'],
    correct: ['Can you', 'speak more slowly', 'please'],
    pieces: ['speak more slowly', 'Can you', 'please', 'listen fast', 'right now']
  }
];

// 4. Audio Detective (Descifra el Mensaje Oculto)
export const AUDIO_MYSTERIES = [
  {
    id: 'a1',
    targetPhrase: 'WELCOME',
    audio: 'Welcome!',
    spanishClue: 'Lo que te dicen al llegar a un hotel o tienda ("Bienvenido")',
    phoneticClue: 'uél-kam',
    letters: ['W', 'E', 'L', 'C', 'O', 'M', 'E', 'S', 'T']
  },
  {
    id: 'a2',
    targetPhrase: 'DELICIOUS',
    audio: 'This is delicious!',
    spanishClue: 'Cuando la comida en el restaurante está exquisita',
    phoneticClue: 'de-lí-shas',
    letters: ['D', 'E', 'L', 'I', 'C', 'I', 'O', 'U', 'S', 'M']
  },
  {
    id: 'a3',
    targetPhrase: 'PASSPORT',
    audio: 'Show your passport, please.',
    spanishClue: 'El documento que te piden siempre en el aeropuerto',
    phoneticClue: 'pás-port',
    letters: ['P', 'A', 'S', 'S', 'P', 'O', 'R', 'T', 'K', 'E']
  },
  {
    id: 'a4',
    targetPhrase: 'HOSPITAL',
    audio: 'Where is the nearest hospital?',
    spanishClue: 'Lugar al que vas en una emergencia de salud',
    phoneticClue: 'jós-pi-tal',
    letters: ['H', 'O', 'S', 'P', 'I', 'T', 'A', 'L', 'B', 'R']
  }
];
