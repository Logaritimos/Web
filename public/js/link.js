

document.addEventListener('DOMContentLoaded', () => {
  const link = document.getElementById('link-angular');
  if (!link) return;

  link.addEventListener('click', (e) => {
    e.preventDefault();

    const userId = sessionStorage.getItem('ID_USUARIO');
    const fkEmpresa = sessionStorage.getItem('FK_EMPRESA'); 
    console.log('ID DO USUARIO' + userId)
       console.log('FK EMPRESA' + fkEmpresa)
    


    if (!userId) {
      alert('ID_USUARIO não encontrado no sessionStorage do Node');
      return;
    }

    const url = `http://98.95.225.112:4200/?userId=${encodeURIComponent(
      userId
    )}&fkEmpresa=${encodeURIComponent(fkEmpresa || "")}`;

   
    window.location.href = url;
   
  });
})