// src/presentation/pages/VetDashboardPage.jsx
import { useState } from "react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { StatCard } from "../components/ui/StatCard";
import { QuickAccessCard } from "../components/ui/QuickAccessCard";
import { PatientsSection } from "../components/sections/PatientsSection";
import { RegisterConsultSection } from "../components/sections/RegisterConsultSection";
import { VET_NAV } from "../../shared/constants/navigation";
import { PET_STATUS } from "../../domain/entities/Pet";
import { RECORD_TYPES } from "../../domain/entities/MedicalRecord";

const MOCK_APPOINTMENTS = [
  { id: 1, time: "08:00", pet: "Max", owner: "Juan García", detail: "Consulta General · Labrador 3 años", status: "Activo" },
  { id: 2, time: "10:00", pet: "Michi", owner: "Ana López", detail: "Control de vacunas · Gato 1 año", status: "Pendiente" },
];

const STATUS_STYLES = {
  Activo: "bg-green-100 text-green-700",
  Pendiente: "bg-yellow-100 text-yellow-700",
  Rechazado: "bg-red-100 text-red-600",
};

const TYPE_LABELS = {
  [RECORD_TYPES.DIAGNOSIS]: "Diagnóstico",
  [RECORD_TYPES.VACCINE]: "Vacuna",
  [RECORD_TYPES.CHECKUP]: "Control",
};

const MOCK_PATIENTS = [
  { id: 1, name: "Max", species: "Perro", breed: "Labrador", ownerName: "Juan García", lastVisit: "10 May", status: PET_STATUS.ACTIVE },
  { id: 2, name: "Michi", species: "Gato", breed: "Persa", ownerName: "Ana López", lastVisit: "2 May", status: PET_STATUS.ACTIVE },
  { id: 3, name: "Rocky", species: "Perro", breed: "Poodle", ownerName: "Pedro Torres", lastVisit: "28 Abr", status: PET_STATUS.ACTIVE },
];

const MOCK_RECORDS = [
  { id: 1, petId: 1, type: RECORD_TYPES.VACCINE, title: "Vacuna Antirrábica", doctor: "Dr. Ramírez", date: "10 Ene 2025", nextDate: "10 Ene 2026" },
  { id: 2, petId: 1, type: RECORD_TYPES.DIAGNOSIS, title: "Diagnóstico: Otitis leve", doctor: "Dra. Torres", date: "5 Mar 2025", detail: "Tratamiento: Gotas otológicas x 7 días" },
];

export function VetDashboardPage({ doctorName = "Dr.", onLogout }) {
  const [activeNav, setActiveNav] = useState("inicio");
  const [date, setDate] = useState("2026-06-19");
  const [patients, setPatients] = useState(MOCK_PATIENTS);
  const [records, setRecords] = useState(MOCK_RECORDS);
  const [selectedPatientId, setSelectedPatientId] = useState("");

  function handleChangeStatus(patientId, status) {
    setPatients((prev) => prev.map((p) => (p.id === patientId ? { ...p, status } : p)));
  }

  function handleViewHistory(patientId) {
    setSelectedPatientId(String(patientId));
    setActiveNav("registrar");
  }

  function handleSaveRecord(formData) {
    const newRecord = {
      id: Date.now(),
      petId: formData.patientId,
      type: formData.type,
      title: `${TYPE_LABELS[formData.type] || "Registro"}: ${formData.description}`,
      doctor: doctorName,
      date: formData.date,
      nextDate: formData.nextDate || undefined,
      detail: formData.treatment ? `Tratamiento: ${formData.treatment}` : undefined,
    };
    setRecords((prev) => [newRecord, ...prev]);

    if (formData.weight) {
      setPatients((prev) =>
        prev.map((p) =>
          String(p.id) === String(formData.patientId)
            ? { ...p, weight: formData.weight, lastVisit: formData.date }
            : p
        )
      );
    }
    setSelectedPatientId(String(formData.patientId));
  }

  function goTo(nav) {
    setActiveNav(nav);
  }

  function renderSection() {
    switch (activeNav) {
      case "pacientes":
        return (
          <PatientsSection patients={patients} onChangeStatus={handleChangeStatus} onViewHistory={handleViewHistory} />
        );

      case "registrar":
        return (
          <RegisterConsultSection
            patients={patients}
            selectedPatientId={selectedPatientId}
            onPatientChange={setSelectedPatientId}
            records={records}
            onSave={handleSaveRecord}
            onCancel={() => setSelectedPatientId("")}
          />
        );

      case "agenda":
        return (
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-text-dark">📅 Mi Agenda</h2>
                <p className="text-sm text-text-muted">Citas del día</p>
              </div>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="rounded-lg border border-border px-3 py-2 text-sm"
              />
            </div>

            <div className="flex flex-col gap-3">
              {MOCK_APPOINTMENTS.map((appt) => (
                <div key={appt.id} className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🕐</span>
                    <div>
                      <p className="font-semibold text-text-dark">
                        {appt.time} — {appt.pet} · {appt.owner}
                      </p>
                      <p className="text-xs text-text-muted">{appt.detail}</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[appt.status]}`}>
                    {appt.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  }

  return (
    <DashboardLayout
      subtitle="Panel Veterinario"
      roleLabel="Veterinario"
      roleIcon="🩺"
      navItems={VET_NAV}
      activeNav={activeNav}
      onNavigate={setActiveNav}
      onLogout={onLogout}
    >
      {activeNav === "inicio" && (
        <>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-dark">🏠 Panel Veterinario</h1>
              <p className="text-text-muted">Bienvenido de vuelta, {doctorName}</p>
            </div>
            <button
              onClick={() => {
                setSelectedPatientId("");
                goTo("registrar");
              }}
              className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-primary-dark"
            >
              + Registrar Consulta
            </button>
          </div>

          <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatCard value={MOCK_APPOINTMENTS.length} label="Citas Hoy" accent="orange" />
            <StatCard value={patients.filter((p) => p.status === PET_STATUS.ACTIVE).length} label="Pacientes Activos" accent="yellow" />
            <StatCard value={MOCK_APPOINTMENTS.filter((a) => a.status === "Activo").length} label="Confirmadas" accent="green" />
            <StatCard value={patients.filter((p) => p.status === PET_STATUS.PENDING).length} label="Pendientes" accent="blue" />
          </div>

          <p className="mb-3 text-xs font-semibold tracking-wide text-text-muted">ACCESOS RÁPIDOS</p>
          <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            <QuickAccessCard icon="📅" title="Mi Agenda" description="Citas del día" highlighted onClick={() => goTo("agenda")} />
            <QuickAccessCard icon="🐾" title="Mis Pacientes" description="Historial y registros" onClick={() => goTo("pacientes")} />
            <QuickAccessCard icon="📋" title="Registrar Consulta" description="Diagnóstico y vacunas" onClick={() => goTo("registrar")} />
            <QuickAccessCard icon="📊" title="Reportes" description="Estadísticas de pacientes" />
          </div>
        </>
      )}

      {renderSection()}
    </DashboardLayout>
  );
}
