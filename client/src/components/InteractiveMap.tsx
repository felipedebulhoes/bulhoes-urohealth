/*
 * Design: Clinical Precision — Swiss Medical Design
 * Google Maps embed with a location selector
 */
import { useState } from "react";
import { MapPin, Phone, Navigation } from "lucide-react";
import ConsentMapFrame from "@/components/ConsentMapFrame";

interface ClinicLocation {
  id: string;
  name: string;
  shortName: string;
  address: string;
  neighborhood: string;
  phone: string;
  directionsUrl: string;
}

const clinics: ClinicLocation[] = [
  {
    id: "campinas",
    name: "Campinas Day Hospital",
    shortName: "Campinas",
    address: "Av. Benjamin Constant, 1991",
    neighborhood: "Cambuí, Campinas - SP",
    phone: "(19) 2127-2900",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Av.+Benjamin+Constant+1991+Campinas+SP",
  },
  {
    id: "paulista",
    name: "Clinovi Paulista",
    shortName: "Av. Paulista",
    address: "Av. Paulista, 1048, 18° andar",
    neighborhood: "Bela Vista, São Paulo - SP",
    phone: "(11) 3382-1529",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Av.+Paulista+1048+São+Paulo+SP",
  },
  {
    id: "pinheiros",
    name: "Clinovi Pinheiros",
    shortName: "Pinheiros",
    address: "Av. Rebouças, 2636",
    neighborhood: "Pinheiros, São Paulo - SP",
    phone: "(11) 3382-1529",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Av.+Rebou%C3%A7as+2636+S%C3%A3o+Paulo+SP",
  },
  {
    id: "cemed-campinas",
    name: "CEMED - Rede D'Or - São Luiz Campinas",
    shortName: "CEMED",
    address: "Av. Andrade Neves, 863",
    neighborhood: "Centro, Campinas - SP",
    phone: "(19) 3014-3000",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Av.+Andrade+Neves+863+Campinas+SP",
  },
];

export default function InteractiveMap() {
  const [activeClinic, setActiveClinic] = useState(clinics[0].id);
  const selectedClinic = clinics.find((clinic) => clinic.id === activeClinic) ?? clinics[0];
  const mapQuery = encodeURIComponent(
    `${selectedClinic.name}, ${selectedClinic.address}, ${selectedClinic.neighborhood}`,
  );

  return (
    <div className="space-y-4">
      {/* Location selector tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {clinics.map((clinic) => (
          <button
            key={clinic.id}
            onClick={() => setActiveClinic(clinic.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeClinic === clinic.id
                ? "bg-[#4A3A30] text-white shadow-md shadow-amber-900/20"
                : "bg-[#E7E1DA] text-[#2E2520] dark:text-foreground/60 hover:bg-[#C9B6A3] hover:text-[#2E2520] dark:text-foreground"
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            {clinic.shortName}
          </button>
        ))}
      </div>

      {/* Map */}
      <div className="rounded-xl overflow-hidden shadow-lg border border-[#2E2520]/8">
        <ConsentMapFrame
          title={`Mapa de ${selectedClinic.name}`}
          src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
          className="h-[380px] w-full border-0 lg:h-[450px]"
        />
      </div>

      {/* Clinic cards below map */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {clinics.map((clinic) => (
          <button
            key={clinic.id}
            onClick={() => setActiveClinic(clinic.id)}
            className={`text-left p-4 rounded-xl border transition-all ${
              activeClinic === clinic.id
                ? "border-[#4A3A30] bg-[#4A3A30]/5 shadow-sm"
                : "border-[#2E2520]/8 bg-[#F7F5F2] hover:border-[#4A3A30]/40"
            }`}
          >
            <h3 className="font-bold text-sm text-[#2E2520] dark:text-foreground mb-1 font-sans">{clinic.name}</h3>
            <p className="text-xs text-[#2E2520] dark:text-foreground/50 font-sans mb-2">{clinic.address}</p>
            <div className="flex items-center justify-between">
              {clinic.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-[#4A3A30]" />
                  <span className="text-[11px] text-[#2E2520] dark:text-foreground/60 font-sans">{clinic.phone}</span>
                </div>
              )}
              <a
                href={clinic.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-[11px] text-[#4A3A30] font-semibold hover:underline"
              >
                <Navigation className="w-3 h-3" />
                Rota
              </a>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
