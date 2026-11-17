# Plan de renovación de ybestudio.tech

**Fecha:** 16 de noviembre de 2026  
**Punto de partida:** [reporte de arquitectura](./REPORTE_ARQUITECTURA.md) y revisión del sitio publicado.  
**Objetivo propuesto:** convertir más visitas en conversaciones comerciales mediante una experiencia clara, rápida y accesible, manteniendo **Node.js, Express y EJS**.

## 1. Decisión de producto

La nueva versión debe responder en la primera pantalla: **qué hace el estudio, para quién, qué resultados ofrece y cómo iniciar un proyecto**. Hoy la portada prioriza el efecto visual y un mensaje amplio; los servicios, ejemplos de trabajo y contacto quedan menos conectados. Esta es una evaluación de la experiencia observada, no una medición de usuarios. Antes de diseñar, validar el enfoque con 5 entrevistas breves a clientes o prospectos y revisar las consultas que llegan por WhatsApp/correo.

**Público supuesto:** pequeños negocios y equipos que buscan identidad visual, diseño y presencia digital. Confirmar este segmento en la fase de descubrimiento.

**Acción principal:** «Cuéntanos tu proyecto». **Acción secundaria:** «Ver proyectos». Cada página debe conducir a alguna de ellas sin repetir demasiados botones.

## 2. Arquitectura de información propuesta

| Ruta nueva | Contenido y propósito | Acción principal |
| --- | --- | --- |
| `/` | Propuesta de valor, servicios resumidos, 3 proyectos destacados, proceso y contacto breve. | Cuéntanos tu proyecto |
| `/servicios` | Vista comparativa de servicios: problema, entregables, proceso y ejemplos. | Solicitar propuesta |
| `/servicios/identidad-visual` | Sustituye o redirige `/disenoyartes`; explica alcance y muestra casos. | Hablar de identidad |
| `/servicios/desarrollo-web` | Sustituye o redirige `/disenoydev`; explica tipos de sitio, entregables y mantenimiento. | Hablar de mi sitio |
| `/proyectos` | Sustituye o redirige `/tienda`, cuyo nombre técnico hoy no coincide con «Portafolio». Filtros simples solo si hay suficientes casos. | Ver caso / iniciar proyecto |
| `/proyectos/:slug` | Caso con reto, solución, piezas entregadas y resultado verificable. | Quiero algo similar |
| `/nosotros` | Quiénes son, método de trabajo y señales de confianza. | Conocer el proceso |
| `/contacto` | Formulario corto, WhatsApp, correo y expectativas de respuesta. | Enviar consulta |

**Contenido opcional:** conservar `/eventos` si tiene publicaciones y responsable de actualización. Podcast y manual solo deben ser públicos cuando haya contenido real. Mantener redirecciones permanentes de las URL antiguas que cambien para proteger enlaces existentes. Los destinos de blog externos deben tener un nombre consistente y anunciar que salen del sitio.

## 3. Recomendaciones UX/UI concretas

### Portada y conversión

- **Hero:** un H1 directo, por ejemplo: «Diseño y sitios web para negocios que quieren crecer». Debajo, una frase que indique entregables y tipo de cliente. Mostrar CTA principal y acceso al portafolio antes de las animaciones.
- **Prueba de trabajo:** tres casos destacados con imagen, servicio prestado y resultado real. Si no hay métricas comprobables, mostrar entregables y testimonio autorizado sin inventar cifras.
- **Proceso visible:** descubrimiento → propuesta → diseño/desarrollo → entrega. Explicar tiempos y qué necesita aportar el cliente.
- **Servicios escaneables:** tarjetas con nombre comprensible, a quién ayudan, qué incluyen y enlace al detalle. Evitar bloques extensos de texto y vocabulario ambiguo.
- **Contacto de baja fricción:** pedir nombre, correo, tipo de proyecto y mensaje; presupuesto y fecha pueden ser opcionales. Mostrar confirmación, tiempo esperado de respuesta y alternativa por WhatsApp.

### Sistema visual

- Conservar la identidad oscura y el verde lima, pero definir **tokens** para color, tipografía, espacios, radios y estados. Reservar el verde para acciones y elementos prioritarios; reducir brillo detrás de texto largo.
- Usar una escala tipográfica consistente y anchos de lectura moderados. Una sola jerarquía H1 → H2 → H3 por página, con títulos que expliquen el contenido.
- Crear componentes EJS reutilizables: tarjeta de servicio, tarjeta de caso, CTA, encabezado de sección, campo de formulario y aviso de estado.
- Diseñar primero los estados móvil y teclado: menú que indique si está abierto, cierre con Escape, foco visible, etiquetas de formularios y botones de tamaño cómodo.
- Las animaciones deben reforzar la jerarquía sin retrasar el contenido. Respetar `prefers-reduced-motion`; el audio queda desactivado hasta que el usuario lo solicite.

### Calidad de experiencia

- Objetivo de accesibilidad: **WCAG 2.2 nivel AA**, con revisión manual de teclado, lector de pantalla, contraste, foco y tamaños de controles. [Norma W3C](https://www.w3.org/TR/WCAG22/).
- Objetivo de rendimiento en usuarios reales, percentil 75: **LCP ≤ 2,5 s, INP ≤ 200 ms y CLS ≤ 0,1**, separados por móvil y escritorio. Son metas para la versión nueva, no mediciones actuales. [Core Web Vitals de Google](https://developers.google.com/search/docs/appearance/core-web-vitals).
- Sustituir el WAV de portada de ~37,9 MB por audio comprimido si se conserva; cargarlo solo tras interacción. Optimizar imágenes, reservarles dimensiones y posponer medios fuera de pantalla.
- Escribir título y descripción específicos para cada página, así como texto alternativo útil en imágenes. La descripción actual de la portada está vacía. [Guía de SEO de Google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).

## 4. Plan técnico conservando la base actual

Mantener Express + EJS y reorganizar el código de forma gradual:

```text
src/
  index.js                    configuración del servidor
  routes/                     páginas y envío de contacto
  controllers/                lógica de cada acción HTTP
  schemas/                    esquemas Zod de entradas externas
  services/                   entrega de mensajes o integraciones
  views/                      páginas EJS
  views/partials/             layout, navegación, footer y componentes
  public/                     CSS, JS y medios usados realmente
tests/                        pruebas de esquemas y rutas
test-plans/                   recorridos de TestSprite
```

Consolidar las hojas CSS y eliminar la doble carga de Tailwind por CDN. Definir un único flujo de estilos reproducible para desarrollo y producción. Auditar scripts viejos antes de migrarlos: la portada carga Three.js r68 desde CDN, mientras `package.json` declara `^0.157.0`. Conservar únicamente los efectos que aporten claridad o identidad.

### Zod: dónde entra y por qué

**Zod se incorpora para validar datos que llegan desde fuera del servidor.** Su primer uso concreto sería el nuevo formulario de contacto; el sitio actual no tiene un `POST` de contacto. Validar en servidor `req.body` antes de usarlo, con límites de longitud, formato de correo y tipos permitidos. El navegador puede ayudar con validación inmediata, pero el servidor sigue siendo la fuente de decisión. Si se añaden filtros, parámetros o configuración editable, crear esquemas separados.

Flujo propuesto: `POST /contacto` → esquema Zod → `safeParse` → si falla, devolver la vista con errores por campo y los datos seguros que puedan conservarse → si pasa, entregar el mensaje mediante el servicio que se elija y mostrar confirmación. **La elección del proveedor de envío queda pendiente**; Zod valida, pero no envía correos ni detiene spam por sí solo. Usar medidas adicionales de abuso y privacidad cuando se implemente.

En Zod 4, `safeParse` devuelve un resultado de éxito/error y `z.flattenError` sirve para errores de formularios planos; `safeParseAsync` corresponde a validaciones asíncronas. [Uso básico](https://zod.dev/basics), [formato de errores](https://zod.dev/error-formatting).

### TestSprite: qué debe comprobar

Integrar **TestSprite** como pruebas de extremo a extremo sobre una URL local accesible o un entorno de preproducción. No sustituye las pruebas unitarias de esquemas ni la revisión humana de contenido y accesibilidad. Su CLI requiere una cuenta/clave y una versión compatible de Node; confirmar esos requisitos al instalarlo. El sitio debe estar en ejecución para la prueba. [Inicio del CLI](https://www.testsprite.com/use-cases/en/testsprite-cli-quickstart), [primer test](https://www.testsprite.com/blog/how-to-run-your-first-automated-test-with-testsprite).

Plan de recorridos iniciales, con resultados esperados explícitos:

1. Desde la portada, llegar a servicios, abrir un detalle y volver al menú sin enlaces rotos.
2. En móvil, abrir/cerrar el menú, navegar con teclado y alcanzar el CTA principal.
3. Abrir un caso de proyecto desde `/proyectos` y llegar a contacto.
4. Enviar contacto válido y ver confirmación sin duplicar envíos.
5. Enviar contacto inválido o vacío y ver errores asociados a cada campo, sin perder datos válidos.
6. Revisar las URL antiguas: redirección esperada o página 404 diseñada; nunca error 500.
7. Comprobar las páginas principales en anchos móvil, tableta y escritorio, incluidos menú y CTA.

Guardar el plan revisado en `test-plans/`, ejecutar la suite en cada cambio de navegación/formulario y en el despliegue de preproducción. El CLI oficial permite generar una plantilla de plan y ejecutar pruebas frontend; definir el proyecto y la URL al configurar TestSprite. [Referencia de inicio](https://www.testsprite.com/use-cases/en/testsprite-cli-quickstart). No publicar la clave en el repositorio.

## 5. Fases y entregables

| Fase | Trabajo | Entregable verificable |
| --- | --- | --- |
| 0. Descubrimiento | Entrevistas, revisión de consultas, inventario de contenido, línea base de analítica y rendimiento. | Público, mensajes y métricas iniciales acordados. |
| 1. Estructura | Mapa de rutas, jerarquía de contenido y wireframes móvil/escritorio. | Prototipo de portada, servicios, caso y contacto. |
| 2. Sistema visual | Tokens, componentes, estados y revisión de contraste. | Kit UI y pantallas de referencia aprobadas. |
| 3. Base técnica | Parciales EJS, CSS consolidado, rutas nuevas, redirecciones, metadatos y medios optimizados. | Sitio navegable en preproducción. |
| 4. Conversión y validación | Formulario, esquema Zod, servicio de entrega elegido y mensajes de estado. | Envío válido e inválido comprobados. |
| 5. Calidad | Pruebas de esquemas/rutas, recorridos TestSprite, accesibilidad y rendimiento. | Informe de fallos corregidos y criterios de salida cumplidos. |
| 6. Lanzamiento | Publicación, redirecciones, verificación del dominio y seguimiento. | Rutas, contacto y métricas comprobadas en producción. |

**Orden sugerido:** publicar primero portada, servicios, proyectos y contacto. Eventos y contenido editorial pueden entrar después si se define quién los mantendrá.

## 6. Criterios para dar la versión por terminada

- Todas las rutas del mapa entregado cargan; no hay errores 500 ni enlaces principales rotos.
- El usuario puede entender la oferta y llegar a contacto desde portada, servicios o un caso en dos pasos claros.
- El formulario valida en servidor con Zod, informa errores concretos y confirma el resultado de un envío real.
- Los recorridos críticos de TestSprite pasan en preproducción y se repiten tras publicar.
- La revisión manual cumple los criterios WCAG 2.2 AA aplicables a las páginas nuevas.
- Se miden Core Web Vitals y se documenta cualquier objetivo aún no alcanzado antes de cerrar el proyecto.
- Cada página tiene título, descripción y contenido propio; las URL antiguas relevantes redirigen a su equivalente.

## 7. Decisiones pendientes antes de implementar

1. Público prioritario y servicio con mayor valor comercial.
2. Tres proyectos que puedan publicarse, con imágenes, permisos y resultados demostrables.
3. Si el contacto será solo por WhatsApp/correo o también por formulario; si hay formulario, proveedor de entrega y responsable de respuesta.
4. Si Eventos y Podcast formarán parte de la nueva versión o se retirarán del menú.
5. Dominio y alojamiento de preproducción, para ejecutar TestSprite sin probar directamente sobre producción.

**Nota de documentación:** se intentó consultar Zod mediante `ctx7`, pero el comando no devolvió resultados durante esta revisión. Las afirmaciones sobre Zod y TestSprite se contrastaron con la documentación oficial enlazada arriba; conviene repetir la consulta a `ctx7` al fijar versiones e implementar.
