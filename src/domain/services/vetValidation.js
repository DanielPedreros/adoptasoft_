// src/domain/services/vetValidation.js

export function validateVetForm({ name, specialty, clinic }) {
  const errors = {
    name: !name?.trim() ? "El nombre es obligatorio." : null,
    specialty: !specialty ? "Selecciona una especialidad." : null,
    clinic: !clinic?.trim() ? "La clínica es obligatoria." : null,
  };
  const isValid = Object.values(errors).every((e) => e === null);
  return { isValid, errors };
}
