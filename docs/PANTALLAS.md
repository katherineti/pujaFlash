# Descripción de las Pantallas de la Aplicación PujaFlash

Este documento proporciona una explicación detallada, concisa y formal de cada una de las pantallas y funcionalidades clave de la aplicación web PujaFlash, describiendo el contenido de cada página de manera exhaustiva.

## 1. Página Web Principal (Landing Page)

-   **Ruta de Acceso:** `/`
-   **Archivo:** `src/app/page.tsx`
-   **Propósito:** Servir como el portal de marketing y presentación de PujaFlash. Está diseñada para atraer y captar a nuevos anunciantes, demostrando el potencial interactivo y el valor de la plataforma.
-   **Contenido y Características:**
    -   **Encabezado (Header):** Contiene el logotipo de PujaFlash y enlaces de navegación para "Iniciar Sesión" y "Empezar a Anunciar".
    -   **Sección "Hero":** Un encabezado visualmente atractivo con un título claro que comunica la propuesta de valor: "Maximiza tu Visibilidad. Anúnciate en Portales Cautivos". Incluye botones de llamada a la acción (CTA) para que los potenciales anunciantes inicien su registro o aprendan más sobre el funcionamiento de la plataforma.
    -   **Banners de Anuncios Interactivos:** A diferencia de una simple imagen, los banners de ejemplo son interactivos. Al hacer clic en ellos, se abre una ventana modal con todos los detalles de la oferta (descripción, ubicación, contacto, etc.). Esto sirve como una demostración funcional y atractiva de cómo se visualizarían y comportarían sus propios anuncios.
    -   **Sección "Por qué elegir Pujaflash":** Destaca las ventajas competitivas de la plataforma, tales como el acceso a una audiencia cautiva, un sistema de pujas inteligente (PPC) y opciones de segmentación avanzada.
    -   **Sección "Cómo Funciona":** Explica de manera sencilla y en cuatro pasos el proceso que sigue un anunciante: crear una campaña, entrar en la subasta, mostrar el anuncio al usuario que se conecta y medir los resultados.
    -   **Pie de Página (Footer):** Incluye información de copyright y el logo de la empresa.

## 2. Página de Registro (Signup)

-   **Ruta de Acceso:** `/signup`
-   **Archivo:** `src/app/signup/page.tsx`
-   **Propósito:** Permitir que los nuevos anunciantes creen una cuenta en la plataforma.
-   **Contenido y Características:**
    -   **Formulario de Registro:** Un formulario simple que solicita un **correo electrónico** y una **contraseña**.
    -   **Validación y Creación de Cuenta:** Al enviar el formulario, se crea un nuevo usuario en Firebase Authentication y se guarda un perfil inicial en la base de datos de Firestore.
    -   **Anuncios Patrocinados:** La página incluye anuncios, sirviendo como ejemplo funcional del producto y monetizando el espacio.
    -   **Enlace a Inicio de Sesión:** Proporciona una opción para que los usuarios que ya tienen una cuenta puedan acceder fácilmente.

## 3. Página de Inicio de Sesión (Login)

-   **Ruta de Acceso:** `/login`
-   **Archivo:** `src/app/login/page.tsx`
-   **Propósito:** Actúa como el **portal cautivo** principal. Los usuarios finales (que buscan acceso a WiFi) inician sesión aquí para obtener conectividad a internet. Los anunciantes también la utilizan para acceder a su panel de control.
-   **Contenido y Características:**
    -   **Formulario de Inicio de Sesión:** Campos para correo electrónico y contraseña. Incluye manejo de errores para credenciales incorrectas.
    -   **Publicidad Integrada:** La página está diseñada para maximizar la visibilidad de los anuncios, lo cual es el núcleo del modelo de negocio.
    -   **Enlace a Registro:** Facilita la creación de una cuenta para nuevos anunciantes.

## 4. Dashboard Principal

-   **Ruta de Acceso:** `/dashboard`
-   **Archivo:** `src/app/dashboard/page.tsx`
-   **Propósito:** Es la pantalla principal a la que accede un usuario después de conectarse al WiFi. Ofrece un resumen útil y accesos rápidos, todo mientras se le presentan anuncios.
-   **Contenido y Características:**
    -   **Saludo Personalizado:** Da la bienvenida al usuario utilizando su nombre de perfil o la parte de su correo electrónico antes del `@`.
    -   **Tarjetas de Estadísticas de Conexión:** Muestra información relevante sobre la sesión actual: tiempo conectado, datos utilizados y el plan de conexión.
    -   **Sección de Ofertas Especiales:** Muestra anuncios destacados de campañas específicas en un formato atractivo e interactivo.
    -   **Columna de Anuncios Lateral:** Un espacio vertical dedicado exclusivamente a mostrar más anuncios y la tarjeta de perfil del usuario.
    -   **Accesos Rápidos:** Botones que enlazan a sitios populares (Google, YouTube, etc.) para mejorar la experiencia del usuario.
    -   **Actividad Reciente:** Un componente que resume las últimas acciones realizadas en la cuenta.

## 5. Dashboard de Analíticas

-   **Ruta de Acceso:** `/dashboard/analiticas`
-   **Archivo:** `src/app/dashboard/analiticas/page.tsx`
-   **Propósito:** Ofrecer a los anunciantes herramientas visuales para medir y entender el rendimiento de sus inversiones publicitarias.
-   **Contenido y Características:**
    -   **Métricas Clave:** Tarjetas que resumen datos importantes como visitantes únicos, tasa de rebote, duración media de la sesión y tasa de conversión.
    -   **Fuentes de Tráfico:** Una tabla que desglosa de dónde provienen los visitantes (búsqueda orgánica, redes sociales, referidos, etc.).
    -   **Gráfico de Ingresos:** Un gráfico de barras que permite visualizar los ingresos generados por mes, facilitando la identificación de tendencias.

## 6. Dashboard de Campañas

-   **Ruta de Acceso:** `/dashboard/campanas`
-   **Archivo:** `src/app/dashboard/campanas/page.tsx`
-   **Propósito:** Es el centro de operaciones para que los anunciantes gestionen sus campañas publicitarias.
-   **Contenido y Características:**
    -   **Tabla de Campañas:** Un listado completo de todas las campañas, con detalles como nombre, estado (Activa, Pausada, Borrador), presupuesto, gasto, clics, CPC y CTR.
    -   **Creación de Campañas:** Un botón abre un modal con un formulario para crear una nueva campaña, solicitando nombre, presupuesto y fecha de finalización.

## 7. Dashboard de Actividad

-   **Ruta de Acceso:** `/dashboard/actividad`
-   **Archivo:** `src/app/dashboard/actividad/page.tsx`
-   **Propósito:** Proporciona un registro cronológico de todos los eventos importantes ocurridos en la cuenta del anunciante.
-   **Contenido y Características:**
    -   **Historial de Eventos:** Muestra una lista de actividades recientes como "Nueva campaña lanzada", "Factura pagada", "Anuncio aprobado", etc., con la fecha y hora de cada evento.
    -   **Paginación:** Permite al usuario navegar a través de un historial extenso de actividades.

## 8. Dashboard de Facturación

-   **Ruta de Acceso:** `/dashboard/facturacion`
-   **Archivo:** `src/app/dashboard/facturacion/page.tsx`
-   **Propósito:** Centraliza toda la información y gestión financiera de la cuenta del anunciante.
-   **Contenido y Características:**
    -   **Historial de Facturas:** Una tabla que muestra todas las facturas emitidas, su fecha, descripción, monto, estado (Pagado, Pendiente) y un botón para descargarlas.
    -   **Plan Actual:** Muestra el plan de suscripción activo del usuario, su precio y la fecha de renovación.
    -   **Cambiar de Plan:** Un botón que permite al anunciante explorar y cambiarse a otros planes de suscripción.
    -   **Métodos de Pago:** Lista los métodos de pago guardados (ej. tarjeta de crédito, pago móvil) y permite su actualización.

## 9. Dashboard de Configuración

-   **Ruta de Acceso:** `/dashboard/configuracion`
-   **Archivo:** `src/app/dashboard/configuracion/page.tsx`
-   **Propósito:** Permite a los usuarios y anunciantes personalizar su perfil y las preferencias de su cuenta.
-   **Contenido y Características:**
    -   **Pestaña de Perfil:** Un formulario donde el usuario puede actualizar su nombre. El correo electrónico se muestra pero no es editable por seguridad.
    -   **Pestaña de Contraseña:** Una sección segura para que el usuario pueda cambiar su contraseña actual por una nueva.
    -   **Pestaña de Notificaciones:** Interruptores para que el usuario gestione sus preferencias sobre qué comunicaciones desea recibir (correos de actividad, notificaciones push, marketing).
