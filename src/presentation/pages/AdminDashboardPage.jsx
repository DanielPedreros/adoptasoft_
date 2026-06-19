// src/presentation/pages/AdminDashboardPage.jsx
import { useState } from "react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { CreateUserForm } from "../components/forms/CreateUserForm";
import { ADMIN_NAV } from "../../shared/constants/navigation";

const MOCK_USERS = [
  { id: 1, name: "Paula Rodríguez", subtitle: "rodriguezdiazmariapaula@gmail.com · CC 1013592860", role: "dueño" },
  { id: 2, name: "Dr. Carlos Ramírez", subtitle: "c.ramirez@vet.com · RM 2045", role: "veterinario" },
];

export function AdminDashboardPage({ onLogout }) {
  const [activeNav, setActiveNav] = useState("usuarios");

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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-dark">👥 Usuarios</h1>
        <p className="text-text-muted">Gestión de todos los usuarios del sistema</p>
      </div>

      <CreateUserForm initialUsers={MOCK_USERS} />
    </DashboardLayout>
  );
}
