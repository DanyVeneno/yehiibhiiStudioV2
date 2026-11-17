# Nueva versión de Yehiibhii Estudio

## Qué se implementó

- Inicio, servicios, portafolio, nosotros, ecosistema, eventos y contacto con una navegación consistente.
- La experiencia visual anterior se conserva en `/experiencia`; las páginas detalladas de diseño y desarrollo siguen disponibles.
- El contenido principal del estudio y los enlaces importantes del pie se mantienen. El Experience Engine de `ybestudio.com` y siete herramientas relacionadas tienen acceso desde la nueva sección de ecosistema.
- Diseño responsive, navegación accesible con teclado, enlace para saltar al contenido, indicadores de página activa y movimiento reducido según la preferencia del sistema.
- Tailwind CSS 4 para utilidades de composición, junto a CSS propio para la identidad visual, el arte orbital y las transiciones. Los datos de las herramientas se validan con Zod.

## Cómo ejecutarlo

En una terminal, dentro de esta carpeta:

```powershell
npm ci
npm run dev
```

Abrir `http://localhost:3001`. `npm run dev` compila Tailwind y arranca el servidor. Si cambias las clases de Tailwind mientras el servidor está abierto, ejecuta `npm run dev:css` en otra terminal para recompilar automáticamente.

Para comprobar el proyecto:

```powershell
npm run build:css
npm test
```

`npm start` usa el CSS ya compilado en `src/public/css/tailwind.css`. Si se despliega en un entorno limpio, ejecutar `npm run build:css` antes de iniciar o incluir ese archivo compilado.

## Experiencia UX/CX aplicada

1. Explicar el servicio y el siguiente paso desde la primera pantalla.
2. Mostrar dos caminos claros: iniciar una conversación o explorar proyectos.
3. Conectar diagnóstico, servicios y herramientas según el problema del visitante.
4. Mantener la exploración visual sin impedir lectura, navegación o accesibilidad.
5. Pensar en el recorrido completo del cliente: descubrimiento, contacto, compra, uso, soporte y continuidad.
6. Validar futuras mejoras con conversaciones y datos reales de visitantes; estas decisiones son hipótesis de diseño.

## Pruebas

`npm test` comprueba rutas, archivos estáticos y enlaces principales. TestSprite está configurado como herramienta opcional de pruebas E2E; requiere una cuenta y credenciales propias para ejecutar `npm run test:e2e:doctor` y `npm run test:e2e`.

## Archivos principales

- `src/routes/index.js`: rutas de la nueva versión.
- `src/views/v3/`: vistas y componentes compartidos.
- `src/public/css/site-v3.css`: identidad visual y responsive.
- `src/styles/tailwind.css`: entrada de Tailwind.
- `src/data/site.js` y `src/data/tools.json`: enlaces y herramientas.
