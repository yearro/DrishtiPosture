/**
 * Reemplaza el placeholder `{delta}` en una plantilla de mensaje con el valor absoluto
 * redondeado de la desviación angular.
 *
 * @param template Plantilla del mensaje (ej: "Dobla la rodilla derecha {delta}° más")
 * @param delta Desviación en grados (positiva o negativa)
 * @returns Mensaje interpolado listo para mostrar al usuario
 */
export function interpolateFeedback(template: string, delta: number): string {
  const absDelta = Math.abs(Math.round(delta));
  return template.replace(/\{delta\}/g, absDelta.toString());
}
