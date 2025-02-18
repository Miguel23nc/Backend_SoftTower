//aquí el sincronizado
export const sincronizarAsistencias = async () => {
    const asistencias = await obtenerAsistenciasOffline();
    if (navigator.onLine && asistencias.length > 0) {
      await fetch('/api/asistencias/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(asistencias),
      });
      console.log('Asistencias sincronizadas');
    }
  };
  
  window.addEventListener('online', sincronizarAsistencias);
  