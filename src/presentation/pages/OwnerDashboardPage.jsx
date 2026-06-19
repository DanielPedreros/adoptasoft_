// src/presentation/pages/OwnerDashboardPage.jsx
import { useState } from "react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { StatCard } from "../components/ui/StatCard";
import { QuickAccessCard } from "../components/ui/QuickAccessCard";
import { PetsSection } from "../components/sections/PetsSection";
import { AppointmentsSection } from "../components/sections/AppointmentsSection";
import { MedicalHistorySection } from "../components/sections/MedicalHistorySection";
import { OWNER_NAV } from "../../shared/constants/navigation";
import { PET_STATUS } from "../../domain/entities/Pet";
import { APPOINTMENT_STATUS } from "../../domain/entities/Appointment";
import { RECORD_TYPES } from "../../domain/entities/MedicalRecord";

const MOCK_VETS = [
  { id: "v1", name: "Dr. Ramírez" },
  { id: "v2", name: "Dra. Torres" },
];

export function OwnerDashboardPage({ onLogout }) {
  const [activeNav, setActiveNav] = useState("inicio");

  const [pets, setPets] = useState([
    { id: 1, name: "Max", species: "Perro", breed: "Labrador", age: "3 años", weight: 12, sex: "Macho", status: PET_STATUS.ACTIVE, summaryLine() { return `${this.breed} · ${this.age} · ${this.weight} kg · ${this.sex}`; } },
    { id: 2, name: "Michi", species: "Gato", breed: "Persa", age: "1 año", weight: 4, sex: "Hembra", status: PET_STATUS.ACTIVE, summaryLine() { return `${this.breed} · ${this.age} · ${this.weight} kg · ${this.sex}`; } },
  ]);

  const [appointments, setAppointments] = useState([
    { id: 1, petName: "Max", vetName: "Dr. Ramírez", type: "Consulta General", date: "20 May 2025", time: "10:00", status: APPOINTMENT_STATUS.CONFIRMED },
  ]);

  const [records] = useState([
    { id: 1, type: RECORD_TYPES.VACCINE, title: "Vacuna Antirrábica", doctor: "Dr. Ramírez", date: "10 Ene 2025", nextDate: "10 Ene 2026" },
    { id: 2, type: RECORD_TYPES.DIAGNOSIS, title: "Diagnóstico: Otitis leve", doctor: "Dra. Torres", date: "5 Mar 2025", detail: "Tratamiento: Gotas otológicas x 7 días" },
    { id: 3, type: RECORD_TYPES.VACCINE, title: "Vacuna Polivalente (DHPPI)", doctor: "Dr. Ramírez", date: "20 Mar 2025", nextDate: "20 Mar 2026" },
    { id: 4, type: RECORD_TYPES.CHECKUP, title: "Control general", doctor: "Dr. Medina", date: "1 Abr 2025", detail: "Peso: 12.3 kg — Sin novedades" },
  ]);

  function handleCreatePet(petData) {
    const newPet = {
      id: Date.now(),
      ...petData,
      status: PET_STATUS.ACTIVE,
      summaryLine() { return `${this.breed} · ${this.age} · ${this.weight ? this.weight + " kg" : ""} · ${this.sex}`.replace(/\s·\s$/, ""); },
    };
    setPets((prev) => [...prev, newPet]);
  }

  function handleConfirmAppointment(formData) {
    const pet = pets.find((p) => String(p.id) === String(formData.petId));
    const vet = MOCK_VETS.find((v) => v.id === formData.vetId);
    const newAppointment = {
      id: Date.now(),
      petName: pet?.name || "Mascota",
      vetName: vet?.name || "Por asignar",
      type: formData.type || "Consulta General",
      date: formData.date,
      time: formData.time,
      status: APPOINTMENT_STATUS.PENDING,
    };
    setAppointments((prev) => [newAppointment, ...prev]);
  }

  function renderSection() {
    switch (activeNav) {
      case "mascotas":
        return <PetsSection pets={pets} onCreatePet={handleCreatePet} />;
      case "citas":
        return (
          <AppointmentsSection
            pets={pets}
            vets={MOCK_VETS}
            appointments={appointments}
            takenSlots={["09:00", "11:00", "16:00", "09:30"]}
            onConfirm={handleConfirmAppointment}
          />
        );
      case "historial":
        return <MedicalHistorySection petName={`${pets[0]?.name || ""} — ${pets[0]?.breed || ""}`} records={records} />;
      default:
        return (
          <>
            <p className="mb-3 text-xs font-semibold tracking-wide text-text-muted">ACCESOS RÁPIDOS</p>
            <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2">
              <QuickAccessCard icon="🐾" title="Mis Mascotas" description="Gestiona tus animales" onClick={() => setActiveNav("mascotas")} />
              <QuickAccessCard icon="📅" title="Agendar Cita" description="Selecciona turno disponible" highlighted onClick={() => setActiveNav("citas")} />
              <QuickAccessCard icon="📋" title="Historial Médico" description="Vacunas y diagnósticos" onClick={() => setActiveNav("historial")} />
              <QuickAccessCard icon="💬" title="Chat con Veterinario" description="Consultas en línea" badge={3} />
            </div>
          </>
        );
    }
  }

  return (
    <DashboardLayout
      subtitle="Gestión de Mascotas"
      roleLabel="Dueño"
      roleIcon="🐶"
      navItems={OWNER_NAV}
      activeNav={activeNav}
      onNavigate={setActiveNav}
      onLogout={onLogout}
    >
      {activeNav === "inicio" && (
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-dark">🏠 Inicio</h1>
            <p className="text-text-muted">Resumen de tus mascotas y citas</p>
          </div>
          <button onClick={() => setActiveNav("citas")} className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-primary-dark">
            + Nueva Cita
          </button>
        </div>
      )}

      {activeNav === "inicio" && (
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard value={pets.length} label="Mis Mascotas" accent="orange" />
          <StatCard value={appointments.length} label="Cita Próxima" accent="yellow" />
          <StatCard value={pets.filter((p) => p.status === PET_STATUS.ACTIVE).length} label="Vacunas al día" accent="green" />
          <StatCard value={2} label="Vacunas Pendientes" accent="blue" />
        </div>
      )}

      {renderSection()}
    </DashboardLayout>
  );
}
