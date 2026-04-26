/*
 * Design: Clinical Precision — Swiss Medical Design
 * Interactive Google Map with 3 clinic markers, custom info windows, and location selector
 */
import { useState, useCallback, useRef } from "react";
import { MapView } from "@/components/Map";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";

interface ClinicLocation {
  id: string;
  name: string;
  shortName: string;
  address: string;
  neighborhood: string;
  phone: string;
  whatsapp?: string;
  hours: string;
  type: string;
  lat: number;
  lng: number;
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
    whatsapp: "(19) 99855-9890",
    hours: "Sextas, 8h–12h",
    type: "Convênios & Particular",
    lat: -22.8977,
    lng: -47.0588,
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Av.+Benjamin+Constant+1991+Campinas+SP",
  },
  {
    id: "paulista",
    name: "Clinovi Paulista",
    shortName: "Av. Paulista",
    address: "Av. Paulista, 1048, 18° andar",
    neighborhood: "Bela Vista, São Paulo - SP",
    phone: "(11) 3382-1529",
    hours: "Seg a Sáb",
    type: "Particular",
    lat: -23.5645,
    lng: -46.6558,
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Av.+Paulista+1048+São+Paulo+SP",
  },
  {
    id: "moema",
    name: "Clinovi Moema",
    shortName: "Moema",
    address: "Av. Ibirapuera, 1835, 2° andar",
    neighborhood: "Moema, São Paulo - SP",
    phone: "(11) 3382-1529",
    hours: "Seg a Sáb",
    type: "Particular",
    lat: -23.6000,
    lng: -46.6600,
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Av.+Ibirapuera+1835+S%C3%A3o+Paulo+SP",
  },
  {
    id: "pinheiros",
    name: "Clinovi Pinheiros",
    shortName: "Pinheiros",
    address: "Av. Rebouças, 2636",
    neighborhood: "Pinheiros, São Paulo - SP",
    phone: "(11) 3382-1529",
    hours: "Seg a Sáb",
    type: "Particular",
    lat: -23.5618,
    lng: -46.6780,
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Av.+Rebou%C3%A7as+2636+S%C3%A3o+Paulo+SP",
  },
  {
    id: "sbc",
    name: "Clinovi SBC",
    shortName: "SBC",
    address: "Av. Pereira Barreto, 1479",
    neighborhood: "São Bernardo do Campo - SP",
    phone: "(11) 3382-1529",
    hours: "Seg a Sáb",
    type: "Particular",
    lat: -23.6960,
    lng: -46.5650,
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Av.+Pereira+Barreto+1479+S%C3%A3o+Bernardo+do+Campo+SP",
  },
  {
    id: "cemed-campinas",
    name: "CEMED - Rede D'Or - São Luiz Campinas",
    shortName: "CEMED",
    address: "Av. Andrade Neves, 863",
    neighborhood: "Centro, Campinas - SP",
    phone: "(19) 3014-3000",
    hours: "Sextas, 13h às 17h",
    type: "Convênios & Particular",
    lat: -22.9020,
    lng: -47.0630,
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Av.+Andrade+Neves+863+Campinas+SP",
  },
];

// Center point that shows all 5 locations (between Campinas and SP/ABC)
const DEFAULT_CENTER = { lat: -23.25, lng: -46.86 };
const DEFAULT_ZOOM = 9;

export default function InteractiveMap() {
  const [activeClinic, setActiveClinic] = useState<string | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  const handleMapReady = useCallback((map: google.maps.Map) => {
    mapRef.current = map;

    // Create shared InfoWindow
    infoWindowRef.current = new google.maps.InfoWindow();

    // Create markers for each clinic
    clinics.forEach((clinic) => {
      // Custom marker element
      const markerEl = document.createElement("div");
      markerEl.innerHTML = `
        <div style="
          display: flex;
          align-items: center;
          gap: 6px;
          background: #0A2540;
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          border: 2px solid #0D9488;
          cursor: pointer;
          white-space: nowrap;
          transition: transform 0.2s ease;
        ">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5EEAD4" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          ${clinic.shortName}
        </div>
      `;

      markerEl.addEventListener("mouseenter", () => {
        markerEl.firstElementChild?.setAttribute("style",
          (markerEl.firstElementChild?.getAttribute("style") || "") + "transform: scale(1.1);"
        );
      });
      markerEl.addEventListener("mouseleave", () => {
        markerEl.firstElementChild?.setAttribute("style",
          (markerEl.firstElementChild?.getAttribute("style") || "").replace("transform: scale(1.1);", "")
        );
      });

      const marker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat: clinic.lat, lng: clinic.lng },
        title: clinic.name,
        content: markerEl,
      });

      // InfoWindow content
      const infoContent = `
        <div style="font-family: 'DM Sans', sans-serif; padding: 4px; max-width: 260px;">
          <h3 style="font-size: 15px; font-weight: 700; color: #0A2540; margin: 0 0 4px 0;">${clinic.name}</h3>
          <p style="font-size: 11px; color: #0D9488; font-weight: 600; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px;">${clinic.type}</p>
          <p style="font-size: 13px; color: #334155; margin: 0 0 2px 0;">${clinic.address}</p>
          <p style="font-size: 12px; color: #64748B; margin: 0 0 8px 0;">${clinic.neighborhood}</p>
          ${clinic.phone ? `<p style="font-size: 13px; color: #0A2540; margin: 0 0 10px 0;">📞 ${clinic.phone}</p>` : ""}
          <a href="${clinic.directionsUrl}" target="_blank" rel="noopener noreferrer"
             style="display: inline-flex; align-items: center; gap: 4px; background: #0D9488; color: white; padding: 6px 14px; border-radius: 6px; font-size: 12px; font-weight: 600; text-decoration: none;">
            Como chegar
          </a>
        </div>
      `;

      marker.addListener("click", () => {
        if (infoWindowRef.current) {
          infoWindowRef.current.setContent(infoContent);
          infoWindowRef.current.open({ anchor: marker, map });
        }
        setActiveClinic(clinic.id);
      });

      markersRef.current.push(marker);
    });

    // Fit bounds to show all markers
    const bounds = new google.maps.LatLngBounds();
    clinics.forEach((c) => bounds.extend({ lat: c.lat, lng: c.lng }));
    map.fitBounds(bounds, { top: 50, bottom: 50, left: 50, right: 50 });
  }, []);

  const focusClinic = (clinic: ClinicLocation) => {
    setActiveClinic(clinic.id);
    if (mapRef.current) {
      mapRef.current.panTo({ lat: clinic.lat, lng: clinic.lng });
      mapRef.current.setZoom(15);

      // Trigger the marker's info window
      const markerIndex = clinics.findIndex((c) => c.id === clinic.id);
      if (markerIndex >= 0 && markersRef.current[markerIndex] && infoWindowRef.current) {
        const marker = markersRef.current[markerIndex];
        const infoContent = `
          <div style="font-family: 'DM Sans', sans-serif; padding: 4px; max-width: 260px;">
            <h3 style="font-size: 15px; font-weight: 700; color: #0A2540; margin: 0 0 4px 0;">${clinic.name}</h3>
            <p style="font-size: 11px; color: #0D9488; font-weight: 600; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px;">${clinic.type}</p>
            <p style="font-size: 13px; color: #334155; margin: 0 0 2px 0;">${clinic.address}</p>
            <p style="font-size: 12px; color: #64748B; margin: 0 0 8px 0;">${clinic.neighborhood}</p>
            ${clinic.phone ? `<p style="font-size: 13px; color: #0A2540; margin: 0 0 10px 0;">📞 ${clinic.phone}</p>` : ""}
            <a href="${clinic.directionsUrl}" target="_blank" rel="noopener noreferrer"
               style="display: inline-flex; align-items: center; gap: 4px; background: #0D9488; color: white; padding: 6px 14px; border-radius: 6px; font-size: 12px; font-weight: 600; text-decoration: none;">
              Como chegar
            </a>
          </div>
        `;
        infoWindowRef.current.setContent(infoContent);
        infoWindowRef.current.open({ anchor: marker, map: mapRef.current });
      }
    }
  };

  const showAll = () => {
    setActiveClinic(null);
    if (mapRef.current) {
      const bounds = new google.maps.LatLngBounds();
      clinics.forEach((c) => bounds.extend({ lat: c.lat, lng: c.lng }));
      mapRef.current.fitBounds(bounds, { top: 50, bottom: 50, left: 50, right: 50 });
      infoWindowRef.current?.close();
    }
  };

  return (
    <div className="space-y-4">
      {/* Location selector tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={showAll}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeClinic === null
              ? "bg-[#0D9488] text-white shadow-md shadow-teal-900/20"
              : "bg-[#F1F5F9] text-[#0A2540]/60 hover:bg-[#E2E8F0] hover:text-[#0A2540]"
          }`}
        >
          <MapPin className="w-4 h-4" />
          Todos
        </button>
        {clinics.map((clinic) => (
          <button
            key={clinic.id}
            onClick={() => focusClinic(clinic)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeClinic === clinic.id
                ? "bg-[#0D9488] text-white shadow-md shadow-teal-900/20"
                : "bg-[#F1F5F9] text-[#0A2540]/60 hover:bg-[#E2E8F0] hover:text-[#0A2540]"
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            {clinic.shortName}
          </button>
        ))}
      </div>

      {/* Map */}
      <div className="rounded-xl overflow-hidden shadow-lg border border-[#0A2540]/8">
        <MapView
          className="h-[380px] lg:h-[450px]"
          initialCenter={DEFAULT_CENTER}
          initialZoom={DEFAULT_ZOOM}
          onMapReady={handleMapReady}
        />
      </div>

      {/* Clinic cards below map */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {clinics.map((clinic) => (
          <button
            key={clinic.id}
            onClick={() => focusClinic(clinic)}
            className={`text-left p-4 rounded-xl border transition-all ${
              activeClinic === clinic.id
                ? "border-[#0D9488] bg-[#0D9488]/5 shadow-sm"
                : "border-[#0A2540]/8 bg-[#F8FAFB] hover:border-[#0D9488]/40"
            }`}
          >
            <h4 className="font-bold text-sm text-[#0A2540] mb-1 font-sans">{clinic.name}</h4>
            <p className="text-xs text-[#0A2540]/50 font-sans mb-2">{clinic.address}</p>
            <div className="flex items-center justify-between">
              {clinic.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-[#0D9488]" />
                  <span className="text-[11px] text-[#0A2540]/60 font-sans">{clinic.phone}</span>
                </div>
              )}
              <a
                href={clinic.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-[11px] text-[#0D9488] font-semibold hover:underline"
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
