import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politica de Privacidad',
  description:
    'Politica de privacidad de Dona Obra. Conoce como recopilamos, usamos y protegemos tu informacion personal.',
};

export default function PrivacidadPage() {
  return (
    <div className="bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="font-display text-4xl sm:text-5xl text-charcoal mb-2">
          Politica de Privacidad
        </h1>
        <p className="text-muted text-sm mb-12">
          Ultima actualizacion: 23 de febrero de 2026
        </p>

        <div className="prose prose-charcoal max-w-none space-y-8">
          {/* 1 */}
          <section>
            <h2 className="font-display text-2xl text-charcoal mb-4">
              1. Introduccion
            </h2>
            <p className="text-charcoal/80 leading-relaxed">
              Dona Obra (&quot;nosotros&quot;, &quot;nuestro&quot; o &quot;la
              Plataforma&quot;) se compromete a proteger la privacidad de sus
              usuarios. Esta Politica de Privacidad describe como recopilamos,
              usamos, almacenamos y protegemos su informacion personal cuando
              utiliza nuestra plataforma de servicios del hogar disponible en
              donaobra.com y sus aplicaciones asociadas.
            </p>
            <p className="text-charcoal/80 leading-relaxed mt-3">
              Al utilizar nuestros servicios, usted acepta las practicas
              descritas en esta politica. Le recomendamos leer este documento
              detenidamente.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="font-display text-2xl text-charcoal mb-4">
              2. Informacion que Recopilamos
            </h2>
            <p className="text-charcoal/80 leading-relaxed mb-3">
              Recopilamos los siguientes tipos de informacion:
            </p>
            <h3 className="font-semibold text-charcoal text-lg mb-2">
              2.1 Informacion proporcionada directamente
            </h3>
            <ul className="list-disc list-inside text-charcoal/80 space-y-1.5 ml-2">
              <li>
                Mensajes de chat enviados a traves de nuestra plataforma de
                conversacion
              </li>
              <li>
                Imagenes y fotografias subidas para describir problemas del
                hogar
              </li>
              <li>
                Informacion de contacto (nombre, numero de telefono, correo
                electronico) cuando se solicita para conectar con un profesional
              </li>
              <li>Direccion aproximada para la prestacion del servicio</li>
            </ul>
            <h3 className="font-semibold text-charcoal text-lg mb-2 mt-4">
              2.2 Informacion recopilada automaticamente
            </h3>
            <ul className="list-disc list-inside text-charcoal/80 space-y-1.5 ml-2">
              <li>Direccion IP y datos de geolocalizacion aproximada</li>
              <li>Tipo de navegador y dispositivo utilizado</li>
              <li>Paginas visitadas y tiempo de navegacion</li>
              <li>
                Cookies y tecnologias similares de seguimiento (ver seccion 5)
              </li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="font-display text-2xl text-charcoal mb-4">
              3. Uso de Inteligencia Artificial
            </h2>
            <p className="text-charcoal/80 leading-relaxed">
              Dona Obra utiliza tecnologia de inteligencia artificial
              proporcionada por Anthropic (modelo Claude) para analizar sus
              consultas, generar estimaciones de costos y facilitar la conexion
              con profesionales. Al usar nuestro chat:
            </p>
            <ul className="list-disc list-inside text-charcoal/80 space-y-1.5 ml-2 mt-3">
              <li>
                Sus mensajes son procesados por el modelo de IA para generar
                respuestas relevantes
              </li>
              <li>
                Las imagenes subidas son analizadas para identificar el tipo de
                servicio requerido
              </li>
              <li>
                Las conversaciones pueden ser utilizadas para mejorar la calidad
                del servicio, siempre de forma anonimizada
              </li>
              <li>
                No compartimos sus datos personales identificables con
                proveedores de IA de terceros mas alla de lo necesario para
                procesar su consulta
              </li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="font-display text-2xl text-charcoal mb-4">
              4. Almacenamiento de Datos
            </h2>
            <p className="text-charcoal/80 leading-relaxed">
              Su informacion es almacenada de forma segura utilizando los
              servicios de Supabase, una plataforma de base de datos que cumple
              con estandares de seguridad de la industria. Los datos se
              almacenan en servidores protegidos con cifrado en transito (TLS) y
              en reposo. Implementamos medidas de seguridad tecnicas y
              organizativas apropiadas para proteger su informacion contra
              acceso no autorizado, alteracion, divulgacion o destruccion.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="font-display text-2xl text-charcoal mb-4">
              5. Cookies y Analiticas
            </h2>
            <p className="text-charcoal/80 leading-relaxed">
              Utilizamos cookies y tecnologias similares para:
            </p>
            <ul className="list-disc list-inside text-charcoal/80 space-y-1.5 ml-2 mt-3">
              <li>
                Mantener su sesion activa y recordar sus preferencias de
                navegacion
              </li>
              <li>
                Analizar el uso de la plataforma para mejorar la experiencia del
                usuario
              </li>
              <li>
                Medir el rendimiento de nuestros servicios y funcionalidades
              </li>
            </ul>
            <p className="text-charcoal/80 leading-relaxed mt-3">
              Puede configurar su navegador para rechazar cookies, aunque esto
              puede afectar la funcionalidad de ciertos aspectos de la
              plataforma.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="font-display text-2xl text-charcoal mb-4">
              6. Uso de la Informacion
            </h2>
            <p className="text-charcoal/80 leading-relaxed mb-3">
              Utilizamos su informacion para:
            </p>
            <ul className="list-disc list-inside text-charcoal/80 space-y-1.5 ml-2">
              <li>Procesar sus consultas y generar estimaciones de costos</li>
              <li>
                Conectar a usuarios con profesionales de servicios del hogar
                adecuados
              </li>
              <li>
                Mejorar y personalizar la experiencia del usuario en la
                plataforma
              </li>
              <li>
                Enviar comunicaciones relacionadas con el servicio solicitado
              </li>
              <li>
                Cumplir con obligaciones legales y regulatorias aplicables
              </li>
              <li>Prevenir fraude y proteger la seguridad de la plataforma</li>
            </ul>
          </section>

          {/* 7 */}
          <section>
            <h2 className="font-display text-2xl text-charcoal mb-4">
              7. Compartir Informacion con Terceros
            </h2>
            <p className="text-charcoal/80 leading-relaxed">
              Podemos compartir su informacion con:
            </p>
            <ul className="list-disc list-inside text-charcoal/80 space-y-1.5 ml-2 mt-3">
              <li>
                Profesionales de servicios del hogar con quienes usted elija
                conectarse, limitado a los detalles del proyecto
              </li>
              <li>
                Proveedores de servicios tecnologicos necesarios para operar la
                plataforma (hosting, IA, analiticas)
              </li>
              <li>
                Autoridades competentes cuando sea requerido por ley o proceso
                legal
              </li>
            </ul>
            <p className="text-charcoal/80 leading-relaxed mt-3">
              No vendemos ni alquilamos su informacion personal a terceros con
              fines de marketing.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="font-display text-2xl text-charcoal mb-4">
              8. Derechos del Usuario
            </h2>
            <p className="text-charcoal/80 leading-relaxed mb-3">
              Usted tiene derecho a:
            </p>
            <ul className="list-disc list-inside text-charcoal/80 space-y-1.5 ml-2">
              <li>
                Acceder a su informacion personal almacenada en nuestra
                plataforma
              </li>
              <li>
                Solicitar la correccion de datos personales inexactos o
                incompletos
              </li>
              <li>
                Solicitar la eliminacion de su informacion personal, sujeto a
                obligaciones legales de retencion
              </li>
              <li>
                Retirar su consentimiento para el procesamiento de datos en
                cualquier momento
              </li>
              <li>
                Solicitar la portabilidad de sus datos en un formato legible por
                maquina
              </li>
              <li>
                Presentar una reclamacion ante la autoridad de proteccion de
                datos competente
              </li>
            </ul>
            <p className="text-charcoal/80 leading-relaxed mt-3">
              Para ejercer cualquiera de estos derechos, contactenos a traves de
              los datos indicados en la seccion 10.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="font-display text-2xl text-charcoal mb-4">
              9. Retencion de Datos
            </h2>
            <p className="text-charcoal/80 leading-relaxed">
              Conservamos su informacion personal solo durante el tiempo
              necesario para cumplir con los fines para los cuales fue
              recopilada, incluyendo obligaciones legales, contables o de
              reporte. Los historiales de chat se conservan por un periodo
              maximo de 12 meses, tras lo cual son anonimizados o eliminados.
              Las imagenes subidas se eliminan automaticamente 30 dias despues
              de la finalizacion del servicio.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="font-display text-2xl text-charcoal mb-4">
              10. Contacto
            </h2>
            <p className="text-charcoal/80 leading-relaxed">
              Si tiene preguntas, comentarios o solicitudes relacionadas con
              esta Politica de Privacidad, puede contactarnos a traves de:
            </p>
            <ul className="list-none text-charcoal/80 space-y-1.5 mt-3 ml-2">
              <li>
                <strong>Correo electronico:</strong> privacidad@donaobra.com
              </li>
              <li>
                <strong>Plataforma:</strong> A traves del chat de Dona Obra
              </li>
            </ul>
          </section>

          {/* 11 */}
          <section>
            <h2 className="font-display text-2xl text-charcoal mb-4">
              11. Modificaciones
            </h2>
            <p className="text-charcoal/80 leading-relaxed">
              Nos reservamos el derecho de actualizar esta Politica de
              Privacidad en cualquier momento. Las modificaciones seran
              publicadas en esta pagina con una nueva fecha de actualizacion.
              Le recomendamos revisar esta politica periodicamente. El uso
              continuado de la plataforma despues de la publicacion de cambios
              constituye su aceptacion de los mismos.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
