// src/presentation/pages/VetDashboardPage.jsx
import { useState } from "react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { StatCard } from "../components/ui/StatCard";
import { QuickAccessCard } from "../components/ui/QuickAccessCard";
import { VET_NAV } from "../../shared/constants/navigation";

const MOCK_APPOINTMENTS = [
  { id: 1, time: "08:00", pet: "Max", owner: "Juan García", detail: "Consulta General · Labrador 3 años", status: "Activo" },
  { id: 2, time: "10:00", pet: "Michi", owner: "Ana López", detail: "Control de vacunas · Gato 1 año", status: "Pendiente" },
];

const STATUS_STYLES = {
  Activo: "bg-green-100 text-green-700",
  Pendiente: "bg-yellow-100 text-yellow-700",
  Rechazado: "bg-red-100 text-red-600",
};

export function VetDashboardPage({ doctorName = "Dr.", onLogout }) {
  const [activeNav, setActiveNav] = useState("inicio");
  const [date, setDate] = useState("2026-06-19");

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
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-dark">🏠 Panel Veterinario</h1>
          <p className="text-text-muted">Bienvenido de vuelta, {doctorName}</p>
        </div>
        <button className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-primary-dark">
          + Registrar Consulta
        </button>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard value={8} label="Citas Hoy" accent="orange" />
        <StatCard value={24} label="Pacientes Activos" accent="yellow" />
        <StatCard value={3} label="Confirmadas" accent="green" />
        <StatCard value={3} label="Pendientes" accent="blue" />
      </div>

      <p className="mb-3 text-xs font-semibold tracking-wide text-text-muted">ACCESOS RÁPIDOS</p>
      <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        <QuickAccessCard icon="📅" title="Mi Agenda" description="Citas del día" highlighted />
        <QuickAccessCard icon="🐾" title="Mis Pacientes" description="Historial y registros" />
        <QuickAccessCard icon="📋" title="Registrar Consulta" description="Diagnóstico y vacunas" />
        <QuickAccessCard icon="📊" title="Reportes" description="Estadísticas de pacientes" />
      </div>

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
    </DashboardLayout>
  );
}
