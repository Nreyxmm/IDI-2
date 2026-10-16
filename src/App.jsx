import React, { useMemo, useState } from 'react';
import { Search, GraduationCap, ExternalLink, CheckCircle2, FileText, Clock3, ArrowRight, Info, ListChecks } from 'lucide-react';

const tramites = [
  {
    id: 'ACAD-102',
    titulo: 'Cancelar asignatura',
    aliases: ['retirar materia', 'cancelar materia', 'retirar asignatura'],
    categoria: 'Académico',
    periodo: 'Ejemplo académico',
    fechaLimite: 'Verificar en la fuente oficial',
    estado: 'Consultar plazo oficial',
    descripcion: 'Orientación de ejemplo para localizar el procedimiento de cancelación de una asignatura.',
    pasos: [
      'Verifica las fechas y condiciones publicadas por la institución.',
      'Reúne los documentos solicitados para tu caso.',
      'Revisa que la información corresponda al periodo académico vigente.',
      'Continúa en el formulario o canal oficial de la universidad.'
    ],
    documentos: [
      { id: 1, nombre: 'Documento de identidad, si aplica', requerido: true },
      { id: 2, nombre: 'Justificación de la solicitud, si aplica', requerido: true },
      { id: 3, nombre: 'Paz y salvo o solvencia, si la institución lo exige', requerido: true },
      { id: 4, nombre: 'Formulario oficial vigente', requerido: true }
    ],
    urlOficial: 'https://www.ecci.edu.co/'
  },
  {
    id: 'ACAD-201',
    titulo: 'Consultar certificados académicos',
    aliases: ['certificado de estudio', 'constancia de estudios', 'certificados'],
    categoria: 'Académico',
    periodo: 'Ejemplo académico',
    fechaLimite: 'Consultar condiciones oficiales',
    estado: 'Información por confirmar',
    descripcion: 'Guía de demostración para encontrar el canal institucional de solicitud de certificados.',
    pasos: [
      'Identifica el tipo de certificado que necesitas.',
      'Consulta requisitos, tiempos y costos en el canal oficial.',
      'Prepara los datos y soportes solicitados.',
      'Radica la solicitud en el medio institucional autorizado.'
    ],
    documentos: [
      { id: 1, nombre: 'Documento de identidad, si aplica', requerido: true },
      { id: 2, nombre: 'Datos de identificación académica', requerido: true },
      { id: 3, nombre: 'Comprobante de pago, si aplica', requerido: true }
    ],
    urlOficial: 'https://www.ecci.edu.co/'
  },
  {
    id: 'ADM-101',
    titulo: 'Consultar calendario y fechas académicas',
    aliases: ['fechas de matrícula', 'calendario', 'fechas límite'],
    categoria: 'Administrativo',
    periodo: 'Consultar calendario vigente',
    fechaLimite: 'Depende del calendario oficial',
    estado: 'Consultar fuente oficial',
    descripcion: 'Acceso orientativo a la consulta de fechas y periodos institucionales.',
    pasos: [
      'Selecciona el periodo académico correspondiente.',
      'Busca la actividad que necesitas realizar.',
      'Confirma la fecha en la publicación institucional vigente.'
    ],
    documentos: [
      { id: 1, nombre: 'Identificar el programa académico', requerido: true },
      { id: 2, nombre: 'Confirmar el periodo académico', requerido: true }
    ],
    urlOficial: 'https://www.ecci.edu.co/'
  }
];

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState('ACAD-102');
  const [checked, setChecked] = useState({});
  const [showNotice, setShowNotice] = useState(true);
  const selected = tramites.find(t => t.id === selectedId) || tramites[0];

  const results = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('es');
    if (!q) return tramites;
    return tramites.filter(t =>
      [t.titulo, t.id, t.categoria, ...t.aliases].join(' ').toLocaleLowerCase('es').includes(q)
    );
  }, [query]);

  const checkedCount = selected.documentos.filter(d => checked[`${selected.id}-${d.id}`]).length;
  const progress = Math.round((checkedCount / selected.documentos.length) * 100);
  const toggleDoc = id => setChecked(prev => ({ ...prev, [`${selected.id}-${id}`]: !prev[`${selected.id}-${id}`] }));

  return <div className="app-shell">
    <header className="topbar">
      <div className="brand"><div className="brand-icon"><GraduationCap size={24}/></div><div><strong>SITU</strong><span>Sistema Inteligente de Trámites Universitarios</span></div></div>
      <span className="demo-pill">DEMO MVP</span>
    </header>
    <main>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">ORIENTACIÓN UNIVERSITARIA EN UN SOLO LUGAR</span>
          <h1>Encuentra tu trámite.<br/><em>Prepárate con claridad.</em></h1>
          <p>Consulta una ficha organizada con pasos, requisitos y acceso a la fuente institucional.</p>
          <div className="searchbar"><Search size={21}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Prueba: retirar materia, certificados…" aria-label="Buscar trámites"/><span className="search-hint">Buscar</span></div>
        </div>
        <div className="hero-art"><div className="orb orb1"></div><div className="orb orb2"></div><div className="mini-card"><div className="mini-check"><CheckCircle2 size={20}/></div><div><b>Tu siguiente paso</b><span>Revisa los requisitos antes de iniciar.</span></div></div><div className="hero-stamp">SITU<br/><small>TRÁMITES</small></div></div>
      </section>

      {showNotice && <div className="notice"><Info size={18}/><span><b>Prototipo demostrativo:</b> los trámites, requisitos y fechas son ejemplos. Confirma siempre los datos en la fuente oficial antes de realizar una solicitud.</span><button onClick={() => setShowNotice(false)} aria-label="Cerrar aviso">×</button></div>}

      <section className="workspace">
        <aside className="results-panel">
          <div className="section-heading"><div><span className="eyebrow">CATÁLOGO</span><h2>Trámites disponibles</h2></div><span className="count">{results.length}</span></div>
          <div className="result-list">
            {results.map(t => <button key={t.id} className={`result-card ${selected.id === t.id ? 'active' : ''}`} onClick={() => setSelectedId(t.id)}>
              <div className="result-icon"><FileText size={20}/></div><div className="result-content"><span className="category">{t.categoria} · {t.id}</span><strong>{t.titulo}</strong><small>{t.aliases[0]}</small></div><ArrowRight size={17} className="result-arrow"/>
            </button>)}
            {results.length === 0 && <div className="empty"><Search size={24}/><b>No encontramos ese término</b><span>Prueba con palabras como “materia”, “certificado” o “calendario”.</span></div>}
          </div>
          <p className="panel-foot">Los resultados de esta demo usan datos de ejemplo.</p>
        </aside>

        <section className="detail-panel">
          <div className="detail-top"><div><span className="eyebrow">FICHA DEL TRÁMITE</span><div className="title-row"><h2>{selected.titulo}</h2><span className="status">{selected.estado}</span></div><p className="detail-description">{selected.descripcion}</p></div><div className="code-tag">{selected.id}</div></div>
          <div className="meta-grid"><div className="meta"><Clock3 size={18}/><div><span>Fecha límite</span><b>{selected.fechaLimite}</b></div></div><div className="meta"><FileText size={18}/><div><span>Periodo / vigencia</span><b>{selected.periodo}</b></div></div></div>

          <div className="two-col">
            <section className="inner-section"><div className="subhead"><span className="number">01</span><h3>Pasos del procedimiento</h3></div><ol className="steps">{selected.pasos.map((p,i)=><li key={p}><span>{i+1}</span><p>{p}</p></li>)}</ol></section>
            <section className="inner-section checklist-section"><div className="subhead"><span className="number teal">02</span><h3>Checklist de preparación</h3></div><div className="progress-row"><span>Tu preparación</span><b>{progress}%</b></div><div className="progress-track"><div style={{width:`${progress}%`}}/></div><p className="small-muted">{checkedCount} de {selected.documentos.length} elementos revisados</p><div className="documents">{selected.documentos.map(d=><label key={d.id} className={`document ${checked[`${selected.id}-${d.id}`] ? 'done' : ''}`}><input type="checkbox" checked={!!checked[`${selected.id}-${d.id}`]} onChange={() => toggleDoc(d.id)}/><span className="fake-check">{checked[`${selected.id}-${d.id}`] && <CheckCircle2 size={16}/>}</span><span>{d.nombre}</span></label>)}</div></section>
          </div>

          <div className="official-box"><div className="official-icon"><ExternalLink size={20}/></div><div><b>Continúa en la fuente institucional</b><span>Verifica la información vigente en el sitio oficial antes de enviar documentos.</span></div><a href={selected.urlOficial} target="_blank" rel="noreferrer">Abrir sitio oficial <ExternalLink size={15}/></a></div>
          <p className="disclaimer">Este MVP no radica solicitudes ni consulta sistemas internos. El checklist es local a esta sesión y los datos deben reemplazarse por información institucional validada.</p>
        </section>
      </section>
    </main>
    <footer><span>© SITU · Prototipo académico</span><span>Diseñado para reducir la dispersión de información</span></footer>
  </div>;
}
