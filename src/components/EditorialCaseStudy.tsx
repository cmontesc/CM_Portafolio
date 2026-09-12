import React from 'react';
import type { Project } from '../types';
import { safeUrl, visibleResults } from '../projectEditorial';

const panel = 'p-5 sm:p-6 rounded-[4px] border border-[#e5edf5] bg-[#f8fafd]';
const grid = 'grid grid-cols-1 sm:grid-cols-2 gap-4';
const heading = 'text-[22px] font-light text-[#061b31] tracking-tight';
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="space-y-5"><h2 className={heading}>{title}</h2>{children}</section>;
}
function Copy({ text }: { text?: string }) {
  if (!text?.trim()) return null;
  const parts = text.split(/\n\s*\n/);
  return <div className="space-y-4 text-[14px] sm:text-[16px] leading-relaxed text-[#50617a] font-light max-w-4xl">{parts.map((p, i) => p.trim().startsWith('- ') ? <ul key={i} className="list-disc pl-5 space-y-2">{p.split('\n').filter(Boolean).map((line,j)=><li key={j}>{line.replace(/^- /,'')}</li>)}</ul> : <p key={i}>{p}</p>)}</div>;
}
function Picture({ src, alt, caption }: { src?: string; alt?: string; caption?: string }) {
  const url = safeUrl(src, true);
  if (!url || !alt?.trim()) return null;
  return <figure className="space-y-2 min-w-0"><div className="aspect-video overflow-hidden rounded-[4px] border border-[#e5edf5] bg-white"><img src={url} alt={alt} loading="lazy" className="w-full h-full object-contain" /></div>{caption?.trim() && <figcaption className="text-[13px] text-[#64748d] leading-relaxed">{caption}</figcaption>}</figure>;
}
export function EditorialCaseStudy({ project }: { project: Project }) {
  const c = project.caseStudy, e = c.editorial;
  if (!e) return null;
  const audiences = e.audiences?.filter(a=>a.name?.trim() && a.objective?.trim() && a.need?.trim()) || [];
  const decisions = e.decisionCases?.filter(d=>d.finding?.trim() && d.decision?.trim() && d.solution?.trim()) || [];
  const steps = e.processSteps?.filter(s=>s.title?.trim() && s.description?.trim()) || [];
  const highlights = c.designHighlights.map(h=>h.split('|').map(s=>s.trim())).filter(h=>h[0] && h[1]);
  const results = visibleResults(e);
  const gallery = e.gallery !== undefined ? e.gallery.filter(g=>g.isPublic && safeUrl(g.src,true) && g.alt?.trim()).slice().sort((a,b)=>a.order-b.order) : (c.interfaceImages || []).map((src,i)=>({src,alt:`${project.title}, interfaz ${i+1}`,title:'',description:'',category:'',featured:false}));
  const comparisons = e.beforeAfter?.filter(b=>b.title?.trim() && b.problem?.trim() && b.change?.trim() && b.benefit?.trim() && safeUrl(b.beforeImage,true) && safeUrl(b.afterImage,true) && b.beforeAlt?.trim() && b.afterAlt?.trim()) || [];
  const architecture = e.informationArchitecture;
  const testimony = e.testimonial;
  const research = c.researchMethodology.filter(s=>s.trim());
  const insights = c.keyInsights.filter(s=>s.trim());
  return <div className="flex flex-col gap-12 min-w-0">
    {gallery.some(g=>g.featured) && <Section title="La plataforma en uso"><div className={grid}>{gallery.filter(g=>g.featured).slice(0,2).map((g,i)=><Picture key={i} src={g.src} alt={g.alt} caption={g.title} />)}</div></Section>}
    {c.overview?.trim() && <Section title="Contexto del producto"><Copy text={c.overview}/></Section>}
    {c.problem?.trim() && <Section title="Problema y desafío"><Copy text={c.problem}/></Section>}
    {!!audiences.length && <Section title="Audiencias del proyecto"><div className={`${grid} lg:grid-cols-4`}>{audiences.map((a,i)=><article key={i} className={panel}><h3 className="font-medium mb-3">{a.name}</h3><dl className="text-sm space-y-2"><dt className="font-medium">Objetivo</dt><dd className="text-[#50617a]">{a.objective}</dd><dt className="font-medium">Necesidad</dt><dd className="text-[#50617a]">{a.need}</dd></dl></article>)}</div></Section>}
    {c.myRole?.trim() && <Section title="Mi rol en detalle"><Copy text={c.myRole}/></Section>}
    {!!research.length && <Section title="Metodología de investigación"><ul className="space-y-3 list-disc pl-5 max-w-4xl text-[#50617a] leading-relaxed">{research.map((s,i)=><li key={i}>{s}</li>)}</ul></Section>}
    {!!steps.length && <Section title="Proceso del proyecto"><ol className={`${grid} lg:grid-cols-4`}>{steps.map((s,i)=><li key={i} className={panel}><span className="text-[#533afd] text-sm">{String(i+1).padStart(2,'0')}</span><h3 className="font-medium my-2">{s.title}</h3><Copy text={s.description}/>{s.deliverable?.trim() && <p className="text-sm mt-3"><strong>Entregable:</strong> {s.deliverable}</p>}<Picture src={s.image} alt={s.alt}/></li>)}</ol></Section>}
    {!!insights.length && <Section title="Hallazgos e insights clave"><ol className="list-decimal pl-5 space-y-4 max-w-4xl text-[#50617a] leading-relaxed">{insights.map((s,i)=><li key={i}>{s}</li>)}</ol></Section>}
    {!!decisions.length && <Section title="Hallazgo → decisión → solución"><div className="divide-y divide-[#e5edf5]">{decisions.map((d,i)=><article key={i} className="py-5 first:pt-0"><dl className="grid grid-cols-1 md:grid-cols-3 gap-4">{[['Hallazgo',d.finding],['Decisión UX',d.decision],['Solución implementada',d.solution]].map(([label,text])=><div key={label}><dt className="text-xs uppercase tracking-wide text-[#533afd] mb-2">{label}</dt><dd className="text-[#50617a] leading-relaxed">{text}</dd></div>)}</dl><Picture src={d.image} alt={d.alt}/></article>)}</div></Section>}
    {architecture && (architecture.intro?.trim() || architecture.principles?.some(p=>p.trim()) || (safeUrl(architecture.afterImage,true)&&architecture.afterAlt?.trim()) || (safeUrl(architecture.beforeImage,true)&&architecture.beforeAlt?.trim())) && <Section title="Arquitectura de información"><Copy text={architecture.intro}/><ul className="list-disc pl-5 space-y-2 text-[#50617a]">{architecture.principles?.filter(p=>p.trim()).map((p,i)=><li key={i}>{p}</li>)}</ul><div className={grid}><Picture src={architecture.beforeImage} alt={architecture.beforeAlt} caption={architecture.caption}/><Picture src={architecture.afterImage} alt={architecture.afterAlt} caption={architecture.caption}/></div></Section>}
    {!!highlights.length && <Section title="Decisiones de interfaz y sistema"><ol className={grid}>{highlights.map(([title,description],i)=><li key={i} className={panel}><div className="flex items-start gap-3"><span className="text-[#533afd] text-sm shrink-0">{String(i+1).padStart(2,'0')}</span><div><h3 className="font-medium mb-2">{title}</h3><Copy text={description}/></div></div></li>)}</ol></Section>}
    {!!comparisons.length && <Section title="Antes y después">{comparisons.map((b,i)=><article key={i} className="space-y-4"><h3 className="text-lg">{b.title}</h3><div className={grid}><Picture src={b.beforeImage} alt={b.beforeAlt} caption="Antes"/><Picture src={b.afterImage} alt={b.afterAlt} caption="Después"/></div><dl className="space-y-2">{[['Problema',b.problem],['Cambio',b.change],['Beneficio',b.benefit]].map(([label,text])=><div key={label}><dt className="font-medium">{label}</dt><dd className="text-[#50617a]">{text}</dd></div>)}</dl></article>)}</Section>}
    {!!gallery.length && <Section title="Evidencias de diseño y desarrollo"><div className={grid}>{gallery.map((g,i)=><article key={i} className="min-w-0 space-y-3">{g.title && <h3 className="font-medium">{g.title}</h3>}{g.category && <p className="text-xs text-[#533afd]">{g.category}</p>}<Picture src={g.src} alt={g.alt} caption={g.description}/></article>)}</div></Section>}
    {e.constraints?.trim() && <Section title="Restricciones y decisiones de alcance"><Copy text={e.constraints}/></Section>}
    {(results.length>0 || (e.results === undefined && c.metrics.some(m=>m.label?.trim() && m.description?.trim()))) && <Section title="Resultados y señales de impacto"><div className={`${grid} lg:grid-cols-4`}>{results.map((r,i)=><article className={panel} key={i}><p className="text-xs text-[#64748d] mb-3">{{quantitative:'Cuantitativo',operational:'Operativo',organizational:'Organizacional'}[r.type]}</p>{r.verified && r.value?.trim() && <p className="text-3xl text-[#533afd] mb-2">{r.value}</p>}<h3 className="font-medium mb-2">{r.label}</h3><Copy text={r.description}/>{r.source?.trim() && <p className="mt-3 text-xs text-[#64748d]">Fuente: {r.source}</p>}{r.comparisonPeriod?.trim() && <p className="text-xs text-[#64748d]">Periodo: {r.comparisonPeriod}</p>}</article>)}{e.results===undefined && c.metrics.filter(m=>m.label?.trim() && m.description?.trim()).map((m,i)=><article key={i} className={panel}><h3>{m.label}</h3><p>{m.metric}</p><Copy text={m.description}/></article>)}</div></Section>}
    {e.learnings?.trim() && <Section title="Aprendizajes"><Copy text={e.learnings}/></Section>}
    {testimony?.authorized === true && testimony.quote?.trim() && testimony.author?.trim() && <Section title="Testimonio"><figure className={panel}><blockquote><Copy text={testimony.quote}/></blockquote><figcaption className="mt-4 text-sm">{testimony.author}{testimony.role?.trim() && ` · ${testimony.role}`}</figcaption></figure></Section>}
    {!!project.tags.length && <Section title="Métodos y tecnologías"><ul className="flex flex-wrap gap-2">{project.tags.map(tag=><li className="whitespace-nowrap text-xs px-3 py-1 border border-[#e5edf5] rounded-full" key={tag}>{tag}</li>)}</ul></Section>}
  </div>;
}
