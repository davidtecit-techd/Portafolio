const grid = document.querySelector('#projects-grid');
const filters = document.querySelector('#filters');
let projects = [];
 
const fallbackProjects = [
  {
    "title": "Sistema Contabilidad",
    "category": "Sistemas",
    "year": "2026",
    "description": "Aplicación de escritorio...",
    "image": "images/SistemaContabilidad.png",
    "video": "",
    "github": "https://github.com/davidtecit-techd/SistemaContabilidad",
    "color": "#b29df9"
  }, 
  { title: 'Sistema Contabilidad', category: 'Sistemas', year: '2026', description: 'Aplicación de escritorio para registrar ingresos y gastos de un negocio.', color: '#d9f99d', link: '#contacto',image: 'https://juande.tech/content/images/2024/01/DALL-E-2024-01-09-23.04.44---Illustration-of-a-computer-program-and-web-database-concept-for-a-business-and-technology-blog.-The-image-should-feature-a-central-computer-screen-dis.webp'},
  { title: 'Marea', category: 'IA', year: '2025', description: 'Tienda digital enfocada en productos de diseño y una compra sin fricción.', color: '#bfdbfe', link: '#contacto',image: 'assets/marea.png'}
];


function renderProjects(category = 'Todos') {
  const visible = category === 'Todos' ? projects : projects.filter((project) => project.category === category);
  grid.innerHTML = visible.map((project, index) => `
    <a
    href="${project.link}"
    class="project-visual"
    style="
        --project-color:${project.color};
        background-image:url('${project.image}');
        background-size:cover;
        background-position:center;
        background-repeat:no-repeat;
    "
    aria-label="Ver ${project.title}">
    <span>${String(index + 1).padStart(2, '0')}</span>
    <strong></strong>
    <i>↗</i>
</a>
      </a>
      <div class="project-meta"><div><p>${project.category} · ${project.year}</p><h3>${project.title}</h3></div><p class="project-description">${project.description}</p></div>
    </article>`).join('');
}

function renderFilters() {
  const categories = ['Todos', ...new Set(projects.map((project) => project.category))];
  filters.innerHTML = categories.map((category, index) => `<button class="filter ${index === 0 ? 'active' : ''}" data-category="${category}">${category}</button>`).join('');
  filters.addEventListener('click', (event) => {
    const button = event.target.closest('.filter');
    if (!button) return;
    document.querySelectorAll('.filter').forEach((item) => item.classList.toggle('active', item === button));
    renderProjects(button.dataset.category);
  });
}

async function loadProjects() {
  try {
    const response = await fetch('data/projects.json');
    if (!response.ok) throw new Error('No se pudo cargar el contenido');
    projects = await response.json();
  } catch {
    projects = fallbackProjects;
  }
  renderFilters();
  renderProjects();
}

document.querySelector('.menu-button').addEventListener('click', (event) => {
  const open = document.body.classList.toggle('menu-open');
  event.currentTarget.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.nav a').forEach((link) => link.addEventListener('click', () => document.body.classList.remove('menu-open')));
document.querySelector('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const subject = encodeURIComponent(`Consulta de portafolio: ${form.nombre.value}`);
  const body = encodeURIComponent(`Nombre: ${form.nombre.value}\nCorreo: ${form.correo.value}\n\n${form.mensaje.value}`);
  document.querySelector('#form-message').textContent = 'Abriendo tu aplicación de correo…';
  window.location.href = `mailto:david.tec.it@gmail.com?subject=${subject}&body=${body}`;
});
document.querySelector('#year').textContent = new Date().getFullYear();
loadProjects();
