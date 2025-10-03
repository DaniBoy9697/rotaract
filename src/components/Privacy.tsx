import React from 'react';
import { Shield, Eye, Lock, Database, User, Mail, Phone, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';

export default function Privacy() {
  const sections = [
    {
      id: 'information-collection',
      title: 'Información que Recopilamos',
      icon: Database,
      content: [
        'Información personal que nos proporcionas voluntariamente (nombre, correo electrónico, teléfono)',
        'Información de membresía en clubes Rotaract',
        'Datos de navegación y uso del sitio web',
        'Cookies y tecnologías similares para mejorar tu experiencia'
      ]
    },
    {
      id: 'information-use',
      title: 'Cómo Usamos tu Información',
      icon: Eye,
      content: [
        'Facilitar la comunicación entre clubes y miembros',
        'Proporcionar servicios relacionados con Rotaract',
        'Enviar comunicaciones relevantes sobre eventos y actividades',
        'Mejorar y personalizar tu experiencia en nuestro sitio',
        'Cumplir con obligaciones legales y reglamentarias'
      ]
    },
    {
      id: 'information-sharing',
      title: 'Compartir Información',
      icon: Globe,
      content: [
        'No vendemos, alquilamos ni comercializamos tu información personal',
        'Podemos compartir información con otros clubes Rotaract para facilitar la comunicación',
        'Compartimos información con proveedores de servicios que nos ayudan a operar el sitio',
        'Podemos divulgar información cuando sea requerido por ley'
      ]
    },
    {
      id: 'data-security',
      title: 'Seguridad de los Datos',
      icon: Lock,
      content: [
        'Implementamos medidas de seguridad técnicas y organizativas apropiadas',
        'Utilizamos encriptación para proteger la transmisión de datos sensibles',
        'Limitamos el acceso a tu información personal solo al personal autorizado',
        'Realizamos revisiones regulares de nuestras prácticas de seguridad'
      ]
    }
  ];

  const rights = [
    {
      title: 'Derecho de Acceso',
      description: 'Puedes solicitar una copia de la información personal que tenemos sobre ti.'
    },
    {
      title: 'Derecho de Rectificación',
      description: 'Puedes solicitar que corrijamos información inexacta o incompleta.'
    },
    {
      title: 'Derecho de Eliminación',
      description: 'Puedes solicitar que eliminemos tu información personal en ciertas circunstancias.'
    },
    {
      title: 'Derecho de Portabilidad',
      description: 'Puedes solicitar que transfiramos tus datos a otro servicio cuando sea técnicamente posible.'
    },
    {
      title: 'Derecho de Oposición',
      description: 'Puedes oponerte al procesamiento de tus datos para ciertos fines.'
    },
    {
      title: 'Derecho de Limitación',
      description: 'Puedes solicitar que limitemos el procesamiento de tus datos en ciertas circunstancias.'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
          <Shield className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">Aviso de Privacidad</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          En Rotaract, respetamos tu privacidad y nos comprometemos a proteger 
          tu información personal. Este aviso explica cómo recopilamos, usamos 
          y protegemos tus datos.
        </p>
      </div>

      {/* Fecha de Última Actualización */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900">Información Importante</h3>
              <p className="text-blue-700">
                <strong>Última actualización:</strong> 15 de marzo de 2024 | 
                <strong> Vigencia:</strong> A partir de la fecha de publicación
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Responsable del Tratamiento */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Responsable del Tratamiento de Datos</h2>
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-semibold">Organización</p>
                    <p className="text-gray-600">Rotaract International</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-semibold">Correo Electrónico</p>
                    <p className="text-gray-600">privacy@rotaract.org</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-semibold">Teléfono</p>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-semibold">Sitio Web</p>
                    <p className="text-gray-600">www.rotaract.org</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Secciones Principales */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-900">Nuestras Prácticas de Privacidad</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Card key={section.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.content.map((item, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Derechos del Usuario */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Tus Derechos</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Como usuario, tienes varios derechos sobre tus datos personales. 
            Puedes ejercer estos derechos contactándonos en cualquier momento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rights.map((right, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-sm">{index + 1}</span>
                </div>
                <h3 className="font-semibold text-gray-900">{right.title}</h3>
                <p className="text-sm text-gray-600">{right.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Cookies y Tecnologías de Seguimiento */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Cookies y Tecnologías de Seguimiento</h2>
        <Card>
          <CardContent className="p-6 space-y-4">
            <p className="text-gray-600">
              Utilizamos cookies y tecnologías similares para mejorar tu experiencia 
              en nuestro sitio web. Las cookies nos ayudan a:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start space-x-2">
                <span className="text-blue-600">•</span>
                <span className="text-gray-600">Recordar tus preferencias y configuraciones</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600">•</span>
                <span className="text-gray-600">Analizar cómo utilizas nuestro sitio web</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600">•</span>
                <span className="text-gray-600">Proporcionar funciones de redes sociales integradas</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600">•</span>
                <span className="text-gray-600">Mejorar la seguridad del sitio</span>
              </li>
            </ul>
            <Separator />
            <p className="text-sm text-gray-500 italic">
              Puedes controlar o eliminar cookies a través de la configuración de tu navegador. 
              Sin embargo, esto puede afectar algunas funcionalidades del sitio.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Transferencias Internacionales */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Transferencias Internacionales</h2>
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">
              Dado que Rotaract es una organización internacional, tu información 
              puede ser transferida y procesada en países diferentes al tuyo. 
              Implementamos salvaguardas apropiadas para proteger tu información, incluyendo:
            </p>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-yellow-600" />
                <span className="text-gray-700">Contratos de transferencia de datos estándar</span>
              </li>
              <li className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-yellow-600" />
                <span className="text-gray-700">Certificaciones de privacidad reconocidas</span>
              </li>
              <li className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-yellow-600" />
                <span className="text-gray-700">Medidas de seguridad técnicas y organizativas</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Contacto y Ejercicio de Derechos */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold">¿Tienes Preguntas sobre Privacidad?</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Si tienes preguntas sobre este aviso de privacidad o deseas ejercer 
            tus derechos, no dudes en contactarnos.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto pt-6">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Correo Electrónico</h3>
              <p className="text-blue-100">privacy@rotaract.org</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">Tiempo de Respuesta</h3>
              <p className="text-blue-100">Máximo 30 días hábiles</p>
            </div>
          </div>
        </div>
      </section>

      {/* Actualizaciones del Aviso */}
      <section className="text-center">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Actualizaciones de este Aviso
            </h3>
            <p className="text-gray-600">
              Podemos actualizar este aviso de privacidad de vez en cuando. 
              Te notificaremos sobre cambios significativos publicando el nuevo 
              aviso en esta página y actualizando la fecha de "última actualización".
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}