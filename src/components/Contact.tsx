import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, User, MessageSquare, Globe, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    club: '',
    subject: '',
    message: '',
    type: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Correo Electrónico',
      primary: 'info@rotaract.org',
      secondary: 'contacto@rotaract.org',
      description: 'Para consultas generales y soporte'
    },
    {
      icon: Phone,
      title: 'Teléfono',
      primary: '+1 (555) 123-4567',
      secondary: '+1 (555) 987-6543',
      description: 'Lunes a Viernes, 9:00 AM - 6:00 PM'
    },
    {
      icon: MapPin,
      title: 'Oficina Principal',
      primary: '1560 Sherman Avenue',
      secondary: 'Evanston, IL 60201, USA',
      description: 'Sede internacional de Rotaract'
    },
    {
      icon: Globe,
      title: 'Oficina Regional',
      primary: 'Ciudad de México, México',
      secondary: 'Coordinación para América Latina',
      description: 'Apoyo para clubes de la región'
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'Consulta General' },
    { value: 'membership', label: 'Membresía y Clubes' },
    { value: 'events', label: 'Eventos y Actividades' },
    { value: 'awards', label: 'Premios y Reconocimientos' },
    { value: 'technical', label: 'Soporte Técnico' },
    { value: 'media', label: 'Medios y Prensa' },
    { value: 'other', label: 'Otro' }
  ];

  const operatingHours = [
    { day: 'Lunes - Viernes', hours: '9:00 AM - 6:00 PM CST' },
    { day: 'Sábados', hours: '10:00 AM - 2:00 PM CST' },
    { day: 'Domingos', hours: 'Cerrado' }
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Contacto</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Estamos aquí para ayudarte. Ponte en contacto con nosotros para cualquier 
          consulta, sugerencia o si necesitas información sobre Rotaract.
        </p>
      </div>

      {/* Hero Image */}
      <div className="relative rounded-2xl overflow-hidden shadow-xl">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1642522029691-029b5a432954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU5MTcyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Oficina Rotaract"
          className="w-full h-64 lg:h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/80 flex items-center justify-center">
          <div className="text-center text-white space-y-4">
            <Mail className="w-16 h-16 text-yellow-400 mx-auto" />
            <h2 className="text-3xl font-bold">Conectemos</h2>
            <p className="text-xl text-blue-100">Tu voz es importante para nosotros</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Formulario de Contacto */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 flex items-center">
                <MessageSquare className="w-6 h-6 mr-3 text-blue-600" />
                Formulario de Contacto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {isSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-600">¡Mensaje Enviado!</h3>
                  <p className="text-gray-600">
                    Gracias por contactarnos. Responderemos a tu consulta en un plazo de 24-48 horas.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Información Personal */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre Completo *</Label>
                      <Input
                        id="name"
                        placeholder="Tu nombre completo"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        placeholder="+52 55 1234 5678"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="club">Club Rotaract (si aplica)</Label>
                      <Input
                        id="club"
                        placeholder="Nombre de tu club"
                        value={formData.club}
                        onChange={(e) => handleInputChange('club', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Tipo de Consulta */}
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo de Consulta *</Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tipo de consulta" />
                      </SelectTrigger>
                      <SelectContent>
                        {inquiryTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Asunto */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">Asunto *</Label>
                    <Input
                      id="subject"
                      placeholder="Breve resumen de tu consulta"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      required
                    />
                  </div>

                  {/* Mensaje */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Mensaje *</Label>
                    <Textarea
                      id="message"
                      placeholder="Describe tu consulta con el mayor detalle posible..."
                      className="min-h-32"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                    />
                  </div>

                  <Separator />

                  {/* Botón de Envío */}
                  <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                    <Send className="w-5 h-5 mr-2" />
                    Enviar Mensaje
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Información de Contacto */}
        <div className="space-y-6">
          {/* Información de Contacto */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Información de Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-gray-900">{info.title}</h3>
                      <p className="text-blue-600 font-medium">{info.primary}</p>
                      {info.secondary && (
                        <p className="text-gray-600">{info.secondary}</p>
                      )}
                      <p className="text-sm text-gray-500">{info.description}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Horarios de Atención */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Horarios de Atención
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {operatingHours.map((schedule, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">{schedule.day}</span>
                  <span className="text-gray-600">{schedule.hours}</span>
                </div>
              ))}
              <Separator />
              <p className="text-sm text-gray-500 italic">
                * Los tiempos de respuesta pueden variar durante días festivos
              </p>
            </CardContent>
          </Card>

          {/* Respuesta Rápida */}
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-green-900">Respuesta Garantizada</h3>
              </div>
              <p className="text-green-700 text-sm">
                Nos comprometemos a responder todas las consultas en un plazo máximo de 48 horas hábiles.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Preguntas Frecuentes */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Preguntas Frecuentes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Antes de contactarnos, revisa si tu pregunta ya tiene respuesta aquí
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[
            {
              question: '¿Cómo puedo crear un nuevo club Rotaract?',
              answer: 'Para crear un nuevo club, necesitas al menos 15 miembros interesados y el patrocinio de un club Rotary local. Contáctanos para más detalles sobre el proceso.'
            },
            {
              question: '¿Cuáles son los requisitos de edad para ser Rotaractiano?',
              answer: 'Los miembros de Rotaract deben tener entre 18 y 30 años. No hay restricciones de género, religión o nacionalidad.'
            },
            {
              question: '¿Hay cuotas de membresía?',
              answer: 'Las cuotas varían por club local. Generalmente incluyen costos administrativos y contribuciones para proyectos de servicio.'
            },
            {
              question: '¿Cómo puedo participar en eventos internacionales?',
              answer: 'Los eventos internacionales se anuncian en nuestro sitio web y a través de los coordinadores regionales. Los clubes pueden nominar representantes.'
            }
          ].map((faq, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}