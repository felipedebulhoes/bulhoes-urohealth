import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function InstagramCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Card do Dr. Felipe",
      component: (
        <div className="w-full h-full bg-gradient-to-b from-[#1C3D5A] to-[#0f2438] p-6 flex flex-col justify-between text-white">
          {/* Header com foto */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-[#1C3D5A] text-2xl font-bold">
              FB
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold font-serif">Dr. Felipe de Bulhões</h2>
              <p className="text-[#B87333] text-lg">Urologista & Cirurgião Geral</p>
            </div>
          </div>

          {/* Credenciais */}
          <div className="text-center text-sm space-y-2">
            <p className="text-gray-300">CRM-SP 202291 • RQE 146538 / RQE 119019 • TCBC</p>
            <p className="text-gray-400 text-xs">Membro Titular do Colégio Brasileiro de Cirurgiões</p>
            <p className="text-gray-400 text-xs">Formado pelo Instituto D'Or de Ensino e Pesquisa</p>
            <p className="text-gray-400 text-xs">Membro da SBU • AUA • EAU</p>
          </div>

          {/* Rating */}
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#B87333] text-2xl">★</span>
              ))}
            </div>
            <p className="text-[#B87333] font-bold text-xl">5.0</p>
            <p className="text-gray-300 text-sm">30 avaliações verificadas no Doctoralia</p>
          </div>

          {/* Especialidades */}
          <div className="text-center text-sm space-y-1">
            <p className="text-gray-300">Cirurgia Minimamente Invasiva • Robótica</p>
            <p className="text-gray-300">Câncer de Próstata • Infertilidade Masculina</p>
            <p className="text-gray-300">Disfunção Erétil • Engrossamento Peniano</p>
            <p className="text-gray-300">São Paulo • Campinas • Teleconsulta</p>
          </div>

          {/* CTA */}
          <button className="w-full bg-[#B87333] hover:bg-[#a0632a] text-white font-bold py-3 rounded-lg transition">
            Agende sua Consulta
          </button>
        </div>
      ),
    },
    {
      title: "Engrossamento Peniano",
      component: (
        <div className="w-full h-full bg-gradient-to-b from-[#1C3D5A] to-[#0f2438] p-6 flex flex-col justify-between text-white">
          <div className="text-center">
            <h2 className="text-4xl font-bold font-serif text-[#B87333] mb-2">Engrossamento Peniano</h2>
            <p className="text-2xl text-gray-200">Ácido Hialurônico</p>
          </div>

          <div className="space-y-4 text-center">
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-gray-300 text-sm mb-3">Abordagem segura e reversível baseada em evidências científicas</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#B87333]/20 rounded-lg p-3">
                <p className="text-[#B87333] font-bold text-lg">0,63 cm</p>
                <p className="text-gray-300 text-xs">aumento por sessão</p>
              </div>
              <div className="bg-[#B87333]/20 rounded-lg p-3">
                <p className="text-[#B87333] font-bold text-lg">12-18 meses</p>
                <p className="text-gray-300 text-xs">durabilidade</p>
              </div>
              <div className="bg-[#B87333]/20 rounded-lg p-3">
                <p className="text-[#B87333] font-bold text-lg">0%</p>
                <p className="text-gray-300 text-xs">disfunção erétil</p>
              </div>
              <div className="bg-[#B87333]/20 rounded-lg p-3">
                <p className="text-[#B87333] font-bold text-lg">Reversível</p>
                <p className="text-gray-300 text-xs">seguro</p>
              </div>
            </div>

            <div className="text-sm text-gray-300">
              <p>✓ Minimamente invasivo</p>
              <p>✓ Resultados naturais</p>
              <p>✓ Recuperação rápida</p>
            </div>
          </div>

          <button className="w-full bg-[#B87333] hover:bg-[#a0632a] text-white font-bold py-3 rounded-lg transition">
            Saiba Mais
          </button>
        </div>
      ),
    },
    {
      title: "6 Locais de Atendimento",
      component: (
        <div className="w-full h-full bg-gradient-to-b from-[#1C3D5A] to-[#0f2438] p-6 flex flex-col justify-between text-white">
          <h2 className="text-3xl font-bold font-serif text-[#B87333] text-center mb-4">6 Locais de Atendimento</h2>

          <div className="grid grid-cols-2 gap-3 flex-1 overflow-y-auto">
            {[
              { name: "Campinas Day Hospital", city: "Campinas" },
              { name: "Clinovi Paulista", city: "São Paulo" },
              { name: "Clinovi Moema", city: "São Paulo" },
              { name: "Clinovi Pinheiros", city: "São Paulo" },
              { name: "Clinovi SBC", city: "Santo André" },
              { name: "CEMED - Rede D'Or", city: "Campinas" },
            ].map((local, i) => (
              <div key={i} className="bg-white/10 rounded-lg p-3 text-center">
                <p className="text-[#B87333] font-bold text-sm">{local.name}</p>
                <p className="text-gray-300 text-xs">{local.city}</p>
              </div>
            ))}
          </div>

          <button className="w-full bg-[#B87333] hover:bg-[#a0632a] text-white font-bold py-3 rounded-lg transition mt-4">
            Encontre Seu Local
          </button>
        </div>
      ),
    },
    {
      title: "Especialidades",
      component: (
        <div className="w-full h-full bg-gradient-to-b from-[#1C3D5A] to-[#0f2438] p-6 flex flex-col justify-between text-white">
          <h2 className="text-3xl font-bold font-serif text-[#B87333] text-center mb-4">Especialidades</h2>

          <div className="space-y-2 flex-1">
            {[
              "🤖 Cirurgia Robótica",
              "🎯 Câncer de Próstata",
              "❤️ HPB - Próstata Aumentada",
              "👨‍👩‍👧‍👦 Infertilidade Masculina",
              "💪 Disfunção Erétil",
              "🛡️ Vasectomia",
              "💉 Engrossamento Peniano",
              "📱 Teleconsulta",
            ].map((specialty, i) => (
              <div key={i} className="bg-white/10 rounded-lg p-3 text-center">
                <p className="text-gray-200">{specialty}</p>
              </div>
            ))}
          </div>

          <button className="w-full bg-[#B87333] hover:bg-[#a0632a] text-white font-bold py-3 rounded-lg transition">
            Consulte um Especialista
          </button>
        </div>
      ),
    },
    {
      title: "Pronto para Começar?",
      component: (
        <div className="w-full h-full bg-gradient-to-b from-[#1C3D5A] to-[#0f2438] p-6 flex flex-col justify-between text-white">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold font-serif text-[#B87333]">Pronto para Desbloquear</h2>
            <h3 className="text-2xl font-bold">Seu Potencial?</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Junte-se a centenas de pacientes satisfeitos que transformaram sua saúde urológica com o Dr. Felipe de Bulhões
            </p>
          </div>

          <div className="space-y-3">
            <button className="w-full bg-[#B87333] hover:bg-[#a0632a] text-white font-bold py-3 rounded-lg transition">
              📅 Agendar no Doctoralia
            </button>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition">
              💬 Contato WhatsApp
            </button>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition">
              📞 Ligar Agora
            </button>
          </div>

          <div className="text-center">
            <p className="text-[#B87333] font-bold text-lg">felipebulhoes.com</p>
            <p className="text-gray-400 text-sm">Educativo • Agendamento • Teleconsulta</p>
          </div>
        </div>
      ),
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="max-w-sm w-full">
        {/* Carrossel */}
        <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden aspect-[3/4]">
          {/* Slides */}
          <div className="relative w-full h-full">
            {slides.map((slide, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  idx === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                {slide.component}
              </div>
            ))}
          </div>

          {/* Controles */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10 transition"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10 transition"
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicadores */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition ${
                  idx === currentSlide ? "bg-[#B87333] w-6" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 text-center">
          <h3 className="text-xl font-bold text-[#1C3D5A]">{slides[currentSlide].title}</h3>
          <p className="text-gray-600 text-sm mt-2">
            Slide {currentSlide + 1} de {slides.length}
          </p>
          <p className="text-gray-500 text-xs mt-4">
            💡 Dica: Use as setas ou clique nos pontos para navegar. Você pode fazer screenshot de cada slide para usar no Instagram!
          </p>
        </div>
      </div>
    </div>
  );
}
