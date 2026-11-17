# Reporte técnico de ybestudio.tech

> [Ver el diagrama interactivo de la arquitectura actual, generado con Archify](.archify/architecture-yehiibhii-20261116-190013/arquitectura-yehiibhii.html). El diagrama está basado en el commit `5346f029b62d6c5ed81663fd1da1e7cb8bde3c31`. El informe de abajo documenta una revisión anterior; algunas rutas y dependencias han cambiado.

**Fecha de revisión:** 16 de noviembre de 2026  
**Fuentes:** carpeta local `yehiibhiiStudioV2` y navegación directa de [ybestudio.tech](https://ybestudio.tech/).  
**Propósito:** documentar cómo está construido el sitio para crear otro con la misma base tecnológica.

## Resumen

El proyecto es un sitio multipágina renderizado en el servidor con **Node.js, Express y EJS**. Cada URL pública tiene una ruta `GET` que renderiza una plantilla EJS. El servidor entrega CSS, JavaScript, imágenes, audio y video desde `src/public`. La interfaz combina **Tailwind CSS cargado por CDN**, CSS propio y JavaScript del navegador. La portada concentra las animaciones más elaboradas con **GSAP, ScrollTrigger, Flip, Lenis e imagesLoaded**. Hay referencias a Three.js y varios experimentos visuales, pero no todos los archivos del repositorio se cargan en la página actual.

La estructura y los recursos observados en la portada publicada coinciden con el código local. Esto respalda que la carpeta es una base representativa del sitio en línea; no prueba que sea exactamente la misma revisión desplegada ni revela el proveedor de alojamiento.

## Arquitectura y flujo de una petición

```text
Navegador → petición GET → Express (src/index.js)
                         → enrutador (src/routes/index.js)
                         → vista EJS (src/views/*.ejs)
                         → HTML con parciales compartidos
Navegador → /css, /js, /image, /video → src/public
Navegador → CDN y servicios externos → estilos, scripts, imágenes y enlaces
```

`src/index.js` configura `src/views` como directorio de vistas, selecciona EJS como motor, monta el enrutador, publica `src/public` mediante `express.static` y escucha en `process.env.PORT` o, en local, en el puerto **3001**. `src/routes/index.js` asigna los títulos y selecciona las plantillas. No hay rutas `POST`, API propia, conexión a base de datos ni autenticación en el código revisado.

## Tecnologías identificadas

| Capa | Tecnología | Evidencia y función |
| --- | --- | --- |
| Servidor | Node.js con módulos ES | `"type": "module"` en `package.json`; `src/index.js` usa `import`. |
| HTTP y rutas | Express `^4.18.2` | Dependencia declarada; `Router`, `res.render` y `express.static`. |
| Plantillas | EJS `^3.1.9` | Vistas `.ejs`, variable `title` y `include` de parciales. |
| Desarrollo | nodemon `^3.0.1` | Script `npm run dev`. Está declarado como dependencia normal. |
| Estilos | Tailwind por CDN y CSS propio | `src/views/partials/head.ejs` carga `cdn.tailwindcss.com`, otra hoja de Tailwind por jsDelivr y cuatro CSS locales. |
| Iconos | Font Awesome 6.4.2 por CDN | Cargado en `partials/head.ejs`. |
| Animación de portada | GSAP, ScrollTrigger, Flip, Lenis, imagesLoaded | Scripts locales cargados al final de `index.ejs`; lógica en `src/public/js/index.js` y `smoothscroll.js`. |
| Gráficos | Three.js | `package.json` declara `three ^0.157.0`; la portada carga por CDN una versión **r68**. También hay copias y experimentos locales. No se debe asumir que todas usan la misma versión. |
| Analítica | Google Analytics, Microsoft Clarity y Meta Pixel | Etiquetas visibles en las vistas y el parcial de cabecera; algunas no aparecen en todas las páginas. |
| Medios externos | Cloudinary, YouTube y Google Drive | Imágenes alojadas fuera del proyecto, videos/enlaces y descargas enlazadas desde las vistas. |

`morgan` figura en `package.json`, pero no está importado ni configurado en el servidor. Tampoco se observa un paso de compilación de CSS o JavaScript: las vistas enlazan archivos y CDN directamente.

## Mapa de páginas

| Ruta | Plantilla local | Función observada |
| --- | --- | --- |
| `/` | `index.ejs` | Portada, mensaje de marca, animaciones, audio y enlaces a videos. |
| `/about` | `about.ejs` | Presentación del estudio. |
| `/servicios` | `servicios.ejs` | Vista general de servicios. |
| `/disenoyartes` | `disenoyartes.ejs` | Diseño y artes gráficas. |
| `/disenoydev` | `disenoydev.ejs` | Diseño y desarrollo web. |
| `/tienda` | `tienda.ejs` | En navegación se llama **Portafolio**; muestra contenido creativo y enlaces de descarga. |
| `/contacto` | `contacto.ejs` | Canales de contacto, entre ellos WhatsApp y correo. |
| `/eventos` | `eventos.ejs` | Eventos, contenido y enlaces externos. |
| `/podcast` | `podcast.ejs` | La ruta existe, pero falta la plantilla local; en producción devolvió **Internal Server Error**. |
| `/src/views/manual` | `manual.ejs` | Ruta registrada; el archivo local está vacío y la respuesta publicada no mostró contenido. |

Las páginas principales cargaron durante la revisión del sitio publicado. El menú compartido enlaza Inicio, Acerca de, Portafolio (`/tienda`), Servicios, Contacto y Eventos; las dos páginas de diseño se alcanzan desde el contenido.

## Organización del proyecto

```text
package.json                 Dependencias y comandos
package-lock.json            Versiones resueltas
src/index.js                 Entrada y configuración de Express
src/routes/index.js          Rutas GET y títulos
src/views/*.ejs              Contenido HTML de cada página
src/views/partials/head.ejs  CSS, CDN y Clarity compartidos
src/views/partials/navigation.ejs  Menú de escritorio y móvil
src/views/partials/footer.ejs      Pie y enlaces externos
src/public/css/              Hojas de estilo propias
src/public/js/               Interacciones, animaciones y bibliotecas copiadas
src/public/image/            Imágenes y favicons
src/public/video/            Audio y video
src/public/sponsor/          Estilos e imagen complementarios
```

Hay **15 CSS**, **37 JS**, **54 PNG**, **34 JPG**, **10 SVG**, **3 WAV** y **2 MP4** en `src/public`, además de otros recursos. Estas cifras describen archivos presentes, no necesariamente utilizados. Las imágenes externas de Cloudinary no forman parte de esa carpeta.

## Cómo se compone la interfaz

- Las plantillas incluyen `head.ejs`, `navigation.ejs` y `footer.ejs`; cada página conserva su propio contenido, metadatos y, en ocasiones, scripts adicionales.
- La navegación móvil alterna la clase `hidden` con `src/public/js/menu.js`.
- La portada carga `gsap.min.js`, `ScrollTrigger.min.js`, `Flip.min.js`, `imagesloaded.pkgd.min.js` y `lenis.min.js`. `src/public/js/index.js` coordina las animaciones según el desplazamiento; `smoothscroll.js` sincroniza Lenis con GSAP.
- `src/public/js/sound.js` controla el audio en bucle `video/holadanny.wav` mediante el botón de sonido.
- Existen archivos para canvas, WebGL, cursores y demos. Algunos están comentados o no aparecen enlazados en la portada publicada; conviene comprobar cada recurso antes de trasladarlo a un nuevo sitio.
- El estilo visible mezcla utilidades de Tailwind con CSS específico como `main.css`, `inicio.css`, `nabvarnew.css`, `contactobg.css`, `screen.css`, `neuro.css` y `baseindex.css`. Predominan fondos oscuros, acentos verde lima, efectos de brillo y tipografía grande.

## Integraciones y contenido

- **Google Analytics:** se incluye `gtag.js` en las páginas revisadas.
- **Microsoft Clarity:** se inyecta desde `partials/head.ejs`.
- **Meta Pixel:** aparece en varias vistas, aunque no en todas.
- **LinkedIn:** el pie muestra un perfil mediante el script de insignias.
- **Cloudinary:** aloja varias imágenes de portada, servicios, portafolio y eventos.
- **YouTube, Google Drive y sitios externos:** sirven como destinos para contenido, videos o archivos; no son datos administrados por Express.
- **Contacto:** la página usa enlaces a WhatsApp y `mailto:`. No se encontró un formulario de contacto procesado por el servidor. El formulario de Mailchimp del pie está dentro de un comentario HTML.

## Hallazgos que importan para reutilizar la base

1. **Ruta rota:** `/podcast` apunta a una vista inexistente y falla también en producción. Crear la plantilla o retirar la ruta antes de copiarla.
2. **Plantilla vacía:** `manual.ejs` tiene cero bytes; su ruta contiene una ruta de archivo en la URL pública, lo que dificulta mantener una navegación clara.
3. **Dependencias de presentación dispersas:** Tailwind se carga desde dos orígenes y convive con muchas hojas propias. Para reproducir el aspecto, hay que conservar el orden de carga y luego consolidar lo que realmente se use.
4. **Versiones de Three.js distintas:** `package.json` declara `^0.157.0`, mientras `index.ejs` carga `r68` desde CDN. Cualquier efecto 3D que se reutilice debe identificar primero qué versión y archivo ejecuta realmente.
5. **Metadatos incompletos:** la portada publicada tiene la descripción SEO vacía; las vistas repiten parte de la configuración de cabecera.
6. **Enlaces del pie mal formados:** el teléfono usa `href="5610731990"` y el correo `mailito:`. En el navegador, el teléfono se interpreta como ruta interna. Corresponderían `tel:` y `mailto:`.
7. **Peso de audio:** `holadanny.wav` ocupa aproximadamente **37.9 MB** y `welcome3.wav` **25 MB**. Si se conserva audio en el nuevo sitio, conviene usar formatos comprimidos y cargarlo cuando haga falta.
8. **Sin pipeline de pruebas ni despliegue documentado:** `package.json` solo declara `dev` y `start`. La carpeta no permite confirmar proveedor de hosting, configuración de dominio, CI/CD ni variables de entorno distintas de `PORT`.

## Base recomendada para crear otro sitio con las mismas tecnologías

1. Crear un proyecto Node.js con módulos ES y las dependencias principales **Express y EJS**.
2. Mantener `src/index.js` como entrada, `src/routes/index.js` para URLs, `src/views` para plantillas y `src/public` para archivos estáticos.
3. Extraer una cabecera, navegación y pie compartidos; crear una vista por página y definir títulos y descripciones concretas.
4. Reutilizar solo los CSS, scripts y recursos que cada página necesite. Para la portada animada, conservar juntos GSAP, ScrollTrigger, Flip, Lenis, imagesLoaded y la lógica que los conecta.
5. Copiar o reemplazar de forma explícita los recursos externos de Cloudinary, YouTube y Drive; las plantillas dependen de esas URL.
6. Iniciar localmente con `npm ci` y `npm run dev` (puerto 3001 por defecto), o usar `npm start` para el proceso sin nodemon. Revisar cada ruta y los recursos de red antes de publicar.

Esta guía reproduce **la arquitectura**, no obliga a copiar defectos o contenido de marca del sitio actual. La tecnología principal puede mantenerse aunque se rehagan diseño, textos y páginas.
