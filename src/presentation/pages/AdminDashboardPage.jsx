// src/presentation/pages/AdminDashboardPage.jsx
import { useState } from "react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { StatCard } from "../components/ui/StatCard";
import { QuickAccessCard } from "../components/ui/QuickAccessCard";
import { CreateUserForm } from "../components/forms/CreateUserForm";
import { VeterinariansSection } from "../components/sections/VeterinariansSection";
import { ADMIN_NAV } from "../../shared/constants/navigation";
import { ROLES } from "../../domain/entities/User";
import { Veterinarian, VET_STATUS } from "../../domain/entities/Veterinarian";

const MOCK_USERS = [
  { id: 1, name: "Paula Rodríguez", subtitle: "rodriguezdiazmariapaula@gmail.com · CC 1013592860", role: ROLES.OWNER },
  { id: 2, name: "Dr. Carlos Ramírez", subtitle: "c.ramirez@vet.com · RM 2045", role: ROLES.VET },
];

const MOCK_VETS = [
  new Veterinarian({
    id: 1,
    name: "Dr. Carlos Ramírez",
    specialty: "Medicina General",
    clinic: "Clínica VetCare",
    medicalLicense: "RM 2045",
    scheduleStart: "8:00 a.m.",
    scheduleEnd: "5:00 p.m.",
    status: VET_STATUS.ACTIVE,
  }),
  new Veterinarian({
    id: 2,
    name: "Dra. Laura Torres",
    specialty: "Cirugía",
    clinic: "Animal Hospital",
    medicalLicense: "RM 3310",
    scheduleStart: "9:00 a.m.",
    scheduleEnd: "6:00 p.m.",
    status: VET_STATUS.ACTIVE,
  }),
];

export function AdminDashboardPage({ onLogout }) {
  const [activeNav, setActiveNav] = useState("inicio");
  const [users] = useState(MOCK_USERS);
  const [vets, setVets] = useState(MOCK_VETS);

  function handleCreateVet(formData) {
    const newVet = new Veterinarian({ id: Date.now(), ...formData, status: VET_STATUS.ACTIVE });
    setVets((prev) => [newVet, ...prev]);
  }

  function goTo(nav) {
    setActiveNav(nav);
  }

  const ownersCount = users.filter((u) => u.role === ROLES.OWNER).length;

  function renderSection() {
    switch (activeNav) {
      case "usuarios":
        return (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-text-dark">👥 Usuarios</h1>
              <p className="text-text-muted">Gestión de todos los usuarios del sistema</p>
            </div>
            <CreateUserForm initialUsers={users} />
          </>
        );

      case "veterinarios":
        return <VeterinariansSection vets={vets} onCreateVet={handleCreateVet} />;

      default:
        return null;
    }
  }

  return (
    <DashboardLayout
      subtitle="Panel de Administración"
      roleLabel="Administrador"
      roleIcon="🛡️"
      navItems={ADMIN_NAV}
      activeNav={activeNav}
      onNavigate={setActiveNav}
      onLogout={onLogout}
    >
      {activeNav === "inicio" && (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-text-dark">🛡️ Panel de Administración</h1>
            <p className="text-text-muted">Gestión global del sistema</p>
          </div>

          <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatCard value={users.length} label="Usuarios Totales" accent="orange" />
            <StatCard value={vets.length} label="Veterinarios" accent="yellow" />
            <StatCard value={ownersCount} label="Dueños" accent="green" />
            <StatCard value="98%" label="Uptime" accent="blue" />
          </div>

          <p className="mb-3 text-xs font-semibold tracking-wide text-text-muted">PANEL DE ADMINISTRACIÓN</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <QuickAccessCard
              icon="👥"
              title="Gestión de Usuarios"
              description="Crear, editar, suspender"
              highlighted
              onClick={() => goTo("usuarios")}
            />
            <QuickAccessCard icon="🩺" title="Veterinarios" description="Gestionar especialistas" onClick={() => goTo("veterinarios")} />
            <QuickAccessCard icon="📊" title="Reportes Globales" description="Estadísticas del sistema" />
            <QuickAccessCard icon="⚙️" title="Configuración" description="Sistema y seguridad" />
            <QuickAccessCard icon="🔔" title="Notificaciones del Sistema" description="Alertas y avisos" badge={3} />
          </div>
        </>
      )}

      {renderSection()}
    </DashboardLayout>
  );
}
