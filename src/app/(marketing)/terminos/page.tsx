import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terminos de Servicio',
  description:
    'Terminos y condiciones de uso de la plataforma Dona Obra. Conoce tus derechos y responsabilidades al usar nuestros servicios.',
};

export default function TerminosPage() {
  return (
    <div className="bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="font-display text-4xl sm:text-5xl text-charcoal mb-2">
          Terminos de Servicio
        </h1>
        <p className="text-muted text-sm mb-12">
          Ultima actualizacion: 23 de febrero de 2026
        </p>

        <div className="prose prose-charcoal max-w-none space-y-8">
          {/* 1 */}
          <section>
            <h2 className="font-display text-2xl text-charcoal mb-4">
              1. Descripcion del Servicio
            </h2>
            <p className="text-charcoal/80 leading-relaxed">
              Dona Obra (&quot;la Plataforma&quot;) es un servicio tecnologico
              que conecta a propietarios de viviendas y usuarios
              (&quot;Usuarios&quot;) con profesionales independientes de
              servicios del hogar (&quot;Profesionales&quot;) en la Republica de
              Panama. La Plataforma utiliza inteligencia artificial para
              facilitar la comunicacion, generar estimaciones de costos y
              recomendar profesionales adecuados.
            </p>
            <p className="text-charcoal/80 leading-relaxed mt-3">
              Dona Obra actua exclusivamente como intermediario tecnologico. No
              somos una empresa de servicios del hogar, no empleamos a los
              Profesionales y no ejecutamos directamente ningun trabajo de
              reparacion, mantenimiento o construccion.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="font-display text-2xl text-charcoal mb-4">
              2. Aceptacion de los Terminos
            </h2>
            <p className="text-charcoal/80 leading-relaxed">
              Al acceder y utilizar la Plataforma, usted acepta estar sujeto a
              estos Terminos de Servicio. Si no esta de acuerdo con alguno de
              estos terminos, le rogamos que no utilice nuestros servicios. Nos
              reservamos el derecho de modificar estos terminos en cualquier
              momento, y su uso continuado de la Plataforma constituye su
              aceptacion de dichas modificaciones.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="font-display text-2xl text-charcoal mb-4">
              3. Requisitos para el Uso
            </h2>
            <p className="text-charcoal/80 leading-relaxed mb-3">
              Para utilizar la Plataforma, usted debe:
            </p>
            <ul className="list-disc list-inside text-charcoal/80 space-y-1.5 ml-2">
              <li>Ser mayor de 18 anos de edad</li>
              <li>
                Tener capacidad legal para celebrar acuerdos vinculantes
              </li>
              <li>Proporcionar informacion veraz y actualizada</li>
              <li>
                Utilizar la Plataforma de conformidad con las leyes aplicables
                de la Republica de Panama
              </li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="font-display text-2xl text-charcoal mb-4">
              4. Responsabilidades del Usuario
            </h2>
            <p className="text-charcoal/80 leading-relaxed mb-3">
              Al utilizar la Plataforma, el Usuario se compromete a:
            </p>
            <ul className="list-disc list-inside text-charcoal/80 space-y-1.5 ml-2">
              <li>
                Proporcionar descripciones precisas y honestas de los problemas
                o servicios requeridos
              </li>
              <li>
                No subir contenido inapropiado, ofensivo, difamatorio o que
                viole derechos de terceros
              </li>
              <li>
                Tratar a los Profesionales con respeto y profesionalismo
              </li>
              <li>
                No utilizar la Plataforma para fines fraudulentos o ilegales
              </li>
              <li>
                Mantener la confidencialidad de sus credenciales de acceso, en
                caso de tener una cuenta
              </li>
              <li>
                Verificar las credenciales y referencias de los Profesionales
                antes de contratar sus servicios
              </li>
              <li>
                Acordar los terminos del servicio directamente con el
                Profesional antes de iniciar cualquier trabajo
              </li>
            </ul>
          </section>

          {/* 5 */}
          <section>
            <h2 className="font-display text-2xl text-charcoal mb-4">
              5. Limitacion de Responsabilidad
            </h2>
            <p className="text-charcoal/80 leading-relaxed">
              Dona Obra es un intermediario tecnologico y no es responsable de:
            </p>
            <ul className="list-disc list-inside text-charcoal/80 space-y-1.5 ml-2 mt-3">
              <li>
                La calidad, seguridad, legalidad o resultado de los servicios
                prestados por los Profesionales
              </li>
              <li>
                Danos materiales o personales que puedan surgir de la
                contratacion o ejecucion de servicios del hogar
              </li>
              <li>
                La exactitud de las estimaciones de costos generadas por
                inteligencia artificial, las cuales son meramente orientativas y
                no constituyen una cotizacion vinculante
              </li>
              <li>
                Disputas o desacuerdos entre Usuarios y Profesionales
              </li>
              <li>
                Retrasos, cancelaciones o incumplimientos por parte de los
                Profesionales
              </li>
              <li>
                Danos indirectos, incidentales, especiales o consecuentes que
                surjan del uso de la Plataforma
              </li>
            </ul>
            <p className="text-charcoal/80 leading-relaxed mt-3">
              La relacion contractual por la prestacion de servicios del hogar
              se establece exclusivamente entre el Usuario y el Profesional.
              Dona Obra no es parte de dicho acuerdo.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="font-display text-2xl text-charcoal mb-4">
              6. Estimaciones y Precios
            </h2>
            <p className="text-charcoal/80 leading-relaxed">
              Las estimaciones de precios proporcionadas por la Plataforma son
              generadas por inteligencia artificial basandose en datos del
              mercado y son de caracter orientativo. Los precios finales seran
              determinados directamente entre el Usuario y el Profesional. Dona
              Obra no garantiza que los precios reales coincidan con las
              estimaciones proporcionadas. Le recomendamos solicitar una
              cotizacion formal al Profesional antes de autorizar cualquier
              trabajo.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="font-display text-2xl text-charcoal mb-4">
              7. Propiedad Intelectual
            </h2>
            <p className="text-charcoal/80 leading-relaxed">
              Todos los derechos de propiedad intelectual sobre la Plataforma,
              incluyendo pero no limitado al diseno, logotipos, marcas, textos,
              graficos, software, algoritmos y codigo fuente, son propiedad
              exclusiva de Dona Obra o de sus licenciantes. Queda prohibida la
              reproduccion, distribucion, modificacion o uso no autorizado de
              cualquier contenido de la Plataforma sin consentimiento previo por
              escrito.
            </p>
            <p className="text-charcoal/80 leading-relaxed mt-3">
              El contenido subido por los Usuarios (imagenes, descripciones)
              sigue siendo propiedad del Usuario, quien otorga a Dona Obra una
              licencia limitada, no exclusiva y revocable para utilizar dicho
              contenido exclusivamente con el fin de prestar el servicio.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="font-display text-2xl text-charcoal mb-4">
              8. Usos Prohibidos
            </h2>
            <p className="text-charcoal/80 leading-relaxed mb-3">
              Queda expresamente prohibido:
            </p>
            <ul className="list-disc list-inside text-charcoal/80 space-y-1.5 ml-2">
              <li>
                Utilizar la Plataforma para actividades ilegales o no
                autorizadas
              </li>
              <li>
                Intentar acceder de manera no autorizada a los sistemas,
                servidores o bases de datos de la Plataforma
              </li>
              <li>
                Utilizar robots, scrapers u otras herramientas automatizadas
                para extraer datos de la Plataforma
              </li>
              <li>
                Hacerse pasar por otra persona o entidad, o proporcionar
                informacion falsa
              </li>
              <li>
                Publicar contenido que infrinja derechos de propiedad
                intelectual de terceros
              </li>
              <li>
                Utilizar la Plataforma para enviar comunicaciones no
                solicitadas o spam
              </li>
              <li>
                Interferir con el funcionamiento normal de la Plataforma o
                intentar sobrecargar sus sistemas
              </li>
              <li>
                Revender, sublicenciar o explotar comercialmente el acceso a la
                Plataforma sin autorizacion
              </li>
            </ul>
          </section>

          {/* 9 */}
          <section>
            <h2 className="font-display text-2xl text-charcoal mb-4">
              9. Suspension y Terminacion
            </h2>
            <p className="text-charcoal/80 leading-relaxed">
              Dona Obra se reserva el derecho de suspender o terminar el acceso
              de cualquier Usuario a la Plataforma, sin previo aviso, en caso de
              violacion de estos Terminos de Servicio o por cualquier conducta
              que consideremos perjudicial para la Plataforma, otros Usuarios o
              Profesionales. El Usuario puede dejar de utilizar la Plataforma en
              cualquier momento.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="font-display text-2xl text-charcoal mb-4">
              10. Modificacion de los Terminos
            </h2>
            <p className="text-charcoal/80 leading-relaxed">
              Dona Obra se reserva el derecho de modificar estos Terminos de
              Servicio en cualquier momento. Las modificaciones seran publicadas
              en esta pagina con una nueva fecha de actualizacion. El uso
              continuado de la Plataforma despues de la publicacion de cambios
              constituye su aceptacion de los terminos modificados. En caso de
              cambios sustanciales, haremos esfuerzos razonables para notificar
              a los usuarios registrados.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="font-display text-2xl text-charcoal mb-4">
              11. Ley Aplicable y Jurisdiccion
            </h2>
            <p className="text-charcoal/80 leading-relaxed">
              Estos Terminos de Servicio se rigen por las leyes de la Republica
              de Panama. Cualquier disputa que surja en relacion con estos
              terminos sera sometida a la jurisdiccion exclusiva de los
              tribunales competentes de la ciudad de Panama, Republica de
              Panama. Las partes acuerdan agotar los mecanismos de resolucion
              alternativa de conflictos antes de recurrir a la via judicial.
            </p>
          </section>

          {/* 12 */}
          <section>
            <h2 className="font-display text-2xl text-charcoal mb-4">
              12. Indemnizacion
            </h2>
            <p className="text-charcoal/80 leading-relaxed">
              El Usuario acepta indemnizar y mantener indemne a Dona Obra, sus
              directores, empleados y agentes frente a cualquier reclamo, dano,
              perdida, responsabilidad y gasto (incluidos honorarios de
              abogados) que surjan del uso indebido de la Plataforma o de la
              violacion de estos Terminos de Servicio por parte del Usuario.
            </p>
          </section>

          {/* 13 */}
          <section>
            <h2 className="font-display text-2xl text-charcoal mb-4">
              13. Disposiciones Generales
            </h2>
            <p className="text-charcoal/80 leading-relaxed">
              Si alguna disposicion de estos Terminos de Servicio se considera
              invalida o inaplicable, las demas disposiciones permaneceran en
              pleno vigor y efecto. La falta de ejercicio por parte de Dona Obra
              de cualquier derecho o disposicion de estos terminos no
              constituira una renuncia a dicho derecho o disposicion. Estos
              Terminos de Servicio, junto con la Politica de Privacidad,
              constituyen el acuerdo completo entre el Usuario y Dona Obra en
              relacion con el uso de la Plataforma.
            </p>
          </section>

          {/* 14 */}
          <section>
            <h2 className="font-display text-2xl text-charcoal mb-4">
              14. Contacto
            </h2>
            <p className="text-charcoal/80 leading-relaxed">
              Si tiene preguntas o comentarios sobre estos Terminos de Servicio,
              puede contactarnos a traves de:
            </p>
            <ul className="list-none text-charcoal/80 space-y-1.5 mt-3 ml-2">
              <li>
                <strong>Correo electronico:</strong> legal@donaobra.com
              </li>
              <li>
                <strong>Plataforma:</strong> A traves del chat de Dona Obra
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
