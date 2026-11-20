# 🦉 EnglishGo! - App Móvil Didáctica para Aprender Inglés Desde Cero

Una aplicación móvil interactiva, gamificada e inspirada en **Duolingo** y **OpenEnglish**, diseñada específicamente para personas hispanohablantes que nunca han estudiado inglés y desean dominarlo rápidamente para su vida cotidiana, viajes, trabajo y emergencias.

---

## 🚀 Características Principales

### 1. 🎯 Método de Aprendizaje Acelerado desde Cero
- **Guía Fonética en Español**: Para que cualquier persona sepa exactamente cómo colocar la boca y qué sonidos emitir (ejemplo: *Good morning* ➔ `[gud mór-ning]`, *Thank you* ➔ `[zenk-iu]`).
- **Enfoque Práctico de Vida Cotidiana**: Saludos, pedir café/comida, pedir la cuenta, transporte/aeropuerto, pedir direcciones, trabajo y frases de emergencia.

### 2. 👂🎧 Audio Nativo Doble Velocidad
- **Velocidad Normal**: Para acostumbrar el oído al ritmo real de los hablantes nativos.
- **Modo Tortuga (Cámara Lenta) 🐢**: Descompone cada sílaba para entender con precisión los sonidos más difíciles del inglés.

### 3. 🎙️ Reconocimiento de Voz y Práctica Oral (Speaking)
- Practica hablar directamente al micrófono de tu móvil o computadora.
- El sistema analiza tu pronunciación en tiempo real y te otorga una puntuación de afinidad (0-100%) con retroalimentación instantánea.

### 4. 🎮 Gamificación Total Estilo Duolingo
- **Vidas y Corazones ❤️**: 5 corazones que te desafían a concentrarte (con recarga gratuita).
- **Rachas de Días 🔥**: Mantén tu hábito diario activo.
- **Puntos de Experiencia (XP) ⚡**: Sube de nivel con cada lección completada.
- **Efectos de Sonido Web Audio**: Melodías de acierto, sonidos suaves de error y fanfarria triunfal con lluvia de confeti al terminar lecciones.
- **Mascota Interactiva "Toby el Búho" 🦉**: Te da consejos, celebra tus victorias y te anima a seguir.

### 5. 💬 Simulador de Conversaciones de la Vida Real (Roleplay)
- Diálogos guiados interactivos:
  - *Pedir café en una cafetería* (Starbucks / Coffee Shop).
  - *Tomar un taxi en el aeropuerto hacia tu hotel*.
- El bot habla automáticamente en inglés nativo y tú respondes seleccionando las mejores respuestas en base a la situación real.

### 6. 📖 Diccionario y Guía de Bolsillo Instantánea
- Buscador en tiempo real de más de 30 frases cruciales ordenadas por categorías:
  - Básicos, Viajes, Restaurante, Compras, Emergencias y Presentación Personal.
  - Reproductor de audio con 1 toque.

---

## 📱 Cómo abrirla en tu Teléfono Móvil

La aplicación está lista como **Progressive Web App (PWA)**:

1. **En tu red Wi-Fi local:**
   Abre el navegador de tu teléfono móvil (Chrome o Safari) e ingresa a:
   ```text
   http://192.168.1.102:5173/
   ```
2. **Instalar como App en tu teléfono:**
   - En **Android (Chrome)**: Toca los 3 puntos superiores ➔ Selecciona **"Instalar aplicación"** o **"Agregar a la pantalla principal"**.
   - En **iPhone (Safari)**: Toca el botón Compartir (cuadrado con flecha hacia arriba) ➔ Selecciona **"Agregar al inicio"**.
   ¡Listo! Tendrás el icono de **EnglishGo! 🦉** en tu pantalla de inicio como una app nativa sin barras de navegador.

3. **En tu Computadora:**
   - Abre `http://localhost:5173/` en tu navegador.
   - En la parte superior derecha hay un botón para alternar entre **Modo Teléfono Móvil** (marco de smartphone) y **Pantalla Completa**.

---

## 🛠️ Tecnologías Utilizadas
- **React 19** + **Vite 8**
- **Tailwind CSS v4** con diseño Mobile-First y temas oscuros ergonómicos.
- **Web Speech API**: Síntesis de voz (Text-to-Speech) y Reconocimiento de voz (Speech-to-Text).
- **Web Audio API**: Generación de efectos sonoros procedurales sin depender de archivos de audio externos.
- **Lucide Icons** & **Canvas-Confetti**.
