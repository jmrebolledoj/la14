# La 14

Código de la portada de la escuela de fútbol La 14, preparado para crear una copia independiente en ChatGPT Sites.

La página incluye la tipografía Teko, fondo oscuro, líneas de cancha con iluminación que sigue el cursor, logos de La 14, UEFA y ANFP, y una ventana con la presentación del equipo.

## Crear tu propia copia con ChatGPT

1. Abre una conversación en tu cuenta de ChatGPT con Sites disponible.
2. Pega el contenido de [PROMPT_CHATGPT.md](PROMPT_CHATGPT.md). El prompt ya incluye el enlace a este repositorio.
3. ChatGPT debe descargar el proyecto completo, registrar un Site nuevo en tu cuenta y publicar una primera versión privada para revisión.
4. Revisa la dirección que devuelva y continúa pidiendo los cambios en esa conversación.

Si ChatGPT necesita los archivos adjuntos, descarga el repositorio con **Code → Download ZIP** y adjunta el ZIP junto al prompt. La creación y publicación requieren que Sites esté disponible en tu cuenta.

Sites admite crear y publicar aplicaciones alojadas desde ChatGPT. Las herramientas disponibles en cada cuenta determinan el flujo concreto. [Documentación oficial de OpenAI](https://learn.chatgpt.com/use-cases/build-and-deploy-internal-apps)

## Tecnología y dependencias

| Componente | Implementación |
| --- | --- |
| Estructura | HTML5 |
| Estilos | CSS con Grid, Flexbox y media queries |
| Interacción | JavaScript nativo |
| Cancha | Canvas 2D, Path2D y requestAnimationFrame |
| Tamaño y preferencias | ResizeObserver y matchMedia |
| Presentación del equipo | Elemento HTML dialog |
| Fuente | Teko variable, pesos 300–700, incluida en assets |
| Framework frontend | Ninguno |
| Paquetes npm | Ninguno |
| Compilación | Publicación directa de la carpeta dist |
| Backend y base de datos | Ninguno |
| Claves API y variables de entorno | Ninguna |
| Requisito para visitar | Navegador moderno con JavaScript |
| Herramienta opcional de desarrollo | Python 3 para servir la vista previa local |

Todos los recursos visuales y la fuente se sirven desde el propio proyecto. La animación usa interpolación suave, se detiene al estabilizarse y respeta la preferencia de movimiento reducido. En dispositivos táctiles, la cancha conserva su composición estática.

## Archivos

```text
.
├── README.md
├── PROMPT_CHATGPT.md
├── .gitignore
├── .openai/
│   └── hosting.json
└── dist/
    ├── index.html
    ├── styles.css
    ├── site.js
    └── assets/
        ├── la14.webp
        ├── uefa.svg
        ├── anfp.png
        ├── teko-variable.ttf
        └── teko-license.txt
```

- `dist/index.html` contiene los textos, la estructura, los logos y la ventana del equipo.
- `dist/styles.css` define tipografía, colores, tamaños, distribución y adaptación a móvil.
- `dist/site.js` dibuja la cancha, gestiona la iluminación y abre o cierra la ventana del equipo.
- `.openai/hosting.json` declara `dist` como directorio estático. Cada copia debe recibir su propio `project_id` al crear el Site.

## Preparación para Sites

Esta copia incluye la configuración inicial siguiente.

```json
{
  "static": {
    "directory": "dist"
  }
}
```

El agente que publique la copia debe usar las herramientas actuales de Sites para crear el proyecto, conservar exactamente el identificador devuelto e incorporarlo como `project_id` al manifiesto. A partir de ese momento, las ediciones de esa copia deben reutilizar ese identificador.

Sirve `dist` como raíz del sitio. El archivo de entrada es `dist/index.html` y las rutas de recursos empiezan en `/`. Usa el flujo de alojamiento estático, con los archivos de `dist` listos para publicar.

La configuración de la copia se genera con su nuevo propietario y su propia dirección. El metadato `og:url` puede añadirse a `dist/index.html` usando la URL devuelta para ese Site.

## Vista previa local

Desde la raíz del repositorio, ejecuta lo siguiente con Python 3.

```sh
python -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Abre [la vista previa local](http://127.0.0.1:4173/). En entornos donde el ejecutable se llame `python3`, usa ese nombre en el comando.

## Diseño y comportamiento de esta versión

- La pregunta principal es «¿Hasta dónde puede llegar tu juego?».
- El remate es «Entrena con nosotros. Entrena con La 14.».
- «La escuela», «El método» y «Entrenadores» aparecen como texto estático en la cabecera, tal como se definió en el diseño.
- «Descubre La 14» abre la presentación del equipo. «Volver» y la tecla Escape la cierran.
- Los logos UEFA y ANFP aparecen bajo «Credenciales del equipo».
- La iluminación de la cancha responde al ratón con movimiento suave.

Al replicar, comprueba la carga de la fuente y de los tres logos, el comportamiento en escritorio y móvil, la ventana del equipo, el seguimiento del cursor y la preferencia de movimiento reducido.

## Contenido que puede completar el equipo

La portada utiliza la información facilitada para el prototipo, con dos entrenadores con credenciales UEFA y uno con formación en Chile. El equipo puede añadir nombres, fotografías, niveles exactos de licencia, sede, edades, horarios y contacto cuando los confirme.

## Recursos y procedencia

- **La 14** — logo facilitado por el titular del proyecto.
- **UEFA** — archivo vectorial conservado en el proyecto. [Fuente del recurso](https://commons.wikimedia.org/wiki/File:UEFA_logo.svg)
- **ANFP** — recurso del sitio institucional, presentado mediante CSS para mostrar la marca ANFP. [Archivo de origen](https://www.anfp.cl/wp-content/uploads/2024/11/Logo-ANFP-Blanco-FFCH-e1735914672283.png)
- **Teko** — fuente variable distribuida bajo SIL Open Font License 1.1. Se incluye la licencia completa en `dist/assets/teko-license.txt`. [Proyecto de la fuente](https://github.com/google/fonts/tree/main/ofl/teko)

Las marcas conservan los derechos de sus respectivos titulares. La licencia SIL OFL incluida corresponde a la tipografía Teko.
