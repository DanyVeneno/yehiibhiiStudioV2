# Pruebas con TestSprite

El CLI está instalado como dependencia de desarrollo. `npm run test:e2e:doctor` comprueba Node, credenciales y conectividad. La primera ejecución necesita una cuenta de TestSprite y una clave de API; no se guarda ninguna clave en este repositorio.

1. Ejecutar `npx testsprite setup` o proporcionar `TESTSPRITE_API_KEY` en el entorno.
2. Crear un proyecto en TestSprite y sustituir `prj_abc123` en `navigation.template.json` por su ID real.
3. Iniciar la aplicación con `npm run dev`.
4. Validar el plan sin crear una prueba: `npx testsprite --dry-run test create --plan-from test-plans/navigation.template.json`.
5. Crear y ejecutar el recorrido: `npx testsprite test create --plan-from test-plans/navigation.template.json --run --wait --target-url http://localhost:3001`.

Para repetir todas las pruebas guardadas: `npm run test:e2e -- --all --project <id> --local 3001`. El CLI abre un túnel para que TestSprite alcance el servidor local. La ejecución real requiere credenciales y puede consumir créditos del servicio.

Las pruebas de rutas locales se ejecutan sin TestSprite mediante `npm test`.
