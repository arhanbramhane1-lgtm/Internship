// ---------- Sample seed data ----------
  let students = [
    { id: 1, name: "Asha Verma", roll: "S101", subject: "Mathematics", score: 92 },
    { id: 2, name: "Rohan Mehta", roll: "S102", subject: "Science", score: 78 },
    { id: 3, name: "Priya Nair", roll: "S103", subject: "English", score: 85 },
    { id: 4, name: "Karan Singh", roll: "S104", subject: "Mathematics", score: 64 },
  ];
  let nextId = 5;

  const tableBody = document.getElementById('tableBody');
  const emptyState = document.getElementById('emptyState');
  const searchInput = document.getElementById('searchInput');
  const studentForm = document.getElementById('studentForm');

  function getGrade(score){
    if(score >= 85) return { label:'A', cls:'grade-A' };
    if(score >= 60) return { label:'B', cls:'grade-B' };
    return { label:'C', cls:'grade-C' };
  }

  function getTopperId(){
    if(students.length === 0) return null;
    return students.reduce((top, s) => s.score > top.score ? s : top, students[0]).id;
  }

  function render(){
    const query = searchInput.value.trim().toLowerCase();
    const filtered = students.filter(s =>
      s.name.toLowerCase().includes(query) ||
      s.roll.toLowerCase().includes(query) ||
      s.subject.toLowerCase().includes(query)
    );

    const topperId = getTopperId();

    tableBody.innerHTML = '';
    if(filtered.length === 0){
      emptyState.style.display = 'block';
    } else {
      emptyState.style.display = 'none';
      filtered
        .slice()
        .sort((a,b) => b.score - a.score)
        .forEach(s => {
          const grade = getGrade(s.score);
          const isTopper = s.id === topperId;
          const tr = document.createElement('tr');
          if(isTopper) tr.classList.add('topper-row');
          tr.innerHTML = `
            <td><span class="name-cell">${isTopper ? '<span class="ribbon" title="Class topper">🏆</span>' : ''}${escapeHtml(s.name)}</span></td>
            <td>${escapeHtml(s.roll || '—')}</td>
            <td>${escapeHtml(s.subject)}</td>
            <td>${s.score}%</td>
            <td><span class="grade-pill ${grade.cls}">${grade.label}</span></td>
            <td>
              <div class="row-actions">
                <button class="btn btn-ghost btn-small" data-action="edit" data-id="${s.id}">Edit</button>
                <button class="btn btn-danger btn-small" data-action="delete" data-id="${s.id}">Delete</button>
              </div>
            </td>
          `;
          tableBody.appendChild(tr);
        });
    }

    updateStats(topperId);
  }

  function updateStats(topperId){
    document.getElementById('statTotal').textContent = students.length;
    const avg = students.length
      ? Math.round(students.reduce((sum,s) => sum + s.score, 0) / students.length)
      : 0;
    document.getElementById('statAvg').textContent = avg + (students.length ? '%' : '');
    const topper = students.find(s => s.id === topperId);
    document.getElementById('statTopper').textContent = topper ? topper.name : '—';
    const subjects = new Set(students.map(s => s.subject.trim().toLowerCase()));
    document.getElementById('statSubjects').textContent = subjects.size;
  }

  function escapeHtml(str){
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  studentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('inpName').value.trim();
    const subject = document.getElementById('inpSubject').value.trim();
    const score = Number(document.getElementById('inpScore').value);
    const roll = document.getElementById('inpRoll').value.trim() || ('S' + (100 + nextId));

    if(!name || !subject || isNaN(score)) return;

    students.push({ id: nextId++, name, roll, subject, score: Math.max(0, Math.min(100, score)) });
    studentForm.reset();
    render();
  });

  tableBody.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if(!btn) return;
    const id = Number(btn.dataset.id);

    if(btn.dataset.action === 'delete'){
      students = students.filter(s => s.id !== id);
      render();
    }

    if(btn.dataset.action === 'edit'){
      const s = students.find(s => s.id === id);
      if(!s) return;
      const newScore = prompt(`Update score for ${s.name} (current: ${s.score}%)`, s.score);
      if(newScore !== null && !isNaN(Number(newScore))){
        s.score = Math.max(0, Math.min(100, Number(newScore)));
        render();
      }
    }
  });

  searchInput.addEventListener('input', render);

  document.getElementById('clearAllBtn').addEventListener('click', () => {
    if(students.length === 0) return;
    if(confirm('Remove all student records?')){
      students = [];
      render();
    }
  });

  // ---------- Live clock ----------
  function updateClock(){
    const now = new Date();
    const dateOpts = { weekday:'short', year:'numeric', month:'short', day:'numeric' };
    document.getElementById('dateStr').textContent = now.toLocaleDateString(undefined, dateOpts);
    document.getElementById('timeStr').textContent = now.toLocaleTimeString(undefined, { hour:'2-digit', minute:'2-digit', second:'2-digit' });
  }
  updateClock();
  setInterval(updateClock, 1000);

  // ---------- Theme toggle ----------
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const themeLabel = document.getElementById('themeLabel');

  function setTheme(theme){
    document.body.setAttribute('data-theme', theme);
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeLabel.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
  }

  themeToggle.addEventListener('click', () => {
    const current = document.body.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  // Respect system preference on first load
  if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
    setTheme('dark');
  }

  render();