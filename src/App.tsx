/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { HomeView } from './views/HomeView';
import { CurriculumView } from './views/CurriculumView';
import { ProjectsView } from './views/ProjectsView';
import { ProjectDetailView } from './views/ProjectDetailView';
import { ContactView } from './views/ContactView';
import { DesignSystemView } from './views/DesignSystemView';
import { AppView, Project } from './types';
import { usePortfolioData } from './context/PortfolioDataContext';

export default function App() {
  const { projects } = usePortfolioData();
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0] || {} as Project);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Keep selected project in sync if data changes
  useEffect(() => {
    if (projects.length > 0 && (!selectedProject || !projects.some(p => p.id === selectedProject.id))) {
      setSelectedProject(projects[0]);
    }
  }, [projects, selectedProject]);

  // Scroll to top and update document title & meta tags when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let viewTitle = 'Carlos Montes — Senior Product Designer | UX Strategy & Product Discovery';
    let viewDesc = 'Portafolio profesional de Carlos Montes, Senior Product Designer con +15 años de experiencia liderando UX Strategy, Product Discovery, Healthtech y Fintech.';

    switch (currentView) {
      case 'home':
        viewTitle = 'Carlos Montes — Senior Product Designer | UX Strategy, Discovery & Design Systems';
        viewDesc = 'Portafolio profesional y casos de estudio destacados de diseño de producto UX/UI por Carlos Montes.';
        break;
      case 'curriculum':
        viewTitle = 'Currículum Vitae — Carlos Montes | Senior Product Designer';
        viewDesc = 'Trayectoria profesional, competencias en UX Discovery, investigación de usuarios, formación académica y empresas de Carlos Montes.';
        break;
      case 'projects':
        viewTitle = 'Casos de estudio y proyectos UX/UI — Carlos Montes';
        viewDesc = 'Catálogo completo de proyectos de diseño de productos digitales, plataformas móviles, healthtech y fintech.';
        break;
      case 'project-detail':
        if (selectedProject?.title) {
          viewTitle = `${selectedProject.title} — Caso de Estudio UX/UI | Carlos Montes`;
          viewDesc = selectedProject.subtitle || selectedProject.summary || viewDesc;
        }
        break;
      case 'contact':
        viewTitle = 'Contacto & Disponibilidad — Carlos Montes | Senior Product Designer';
        viewDesc = 'Contacta directamente a Carlos Montes por WhatsApp, teléfono o correo para nuevas oportunidades de liderazgo en diseño de producto.';
        break;
      case 'design-system':
        viewTitle = 'Design System Olivia — Carlos Montes';
        viewDesc = 'Documentación oficial de tokens de diseño, tipografía de precisión del sistema Olivia, paleta de colores y componentes UI.';
        break;
    }

    document.title = viewTitle;

    const metaDescriptionEl = document.querySelector('meta[name="description"]');
    if (metaDescriptionEl) {
      metaDescriptionEl.setAttribute('content', viewDesc);
    }
  }, [currentView, selectedProject]);

  const handleNavigate = (view: AppView) => {
    setCurrentView(view);
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentView('project-detail');
  };

  const handleShowToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-white text-[#061b31] font-sans antialiased selection:bg-[#e8e9ff] selection:text-[#533afd] flex flex-col justify-between">
      {/* 1. Global Navigation Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      {/* 2. Main Content View Container (Strict 80px+ horizontal padding on desktop & 1320px max-width) */}
      <main className="max-w-[1320px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 w-full flex-1">
        {/* Screen 1: Home */}
        {currentView === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onSelectProject={handleSelectProject}
          />
        )}

        {/* Screen 2: Curriculum */}
        {currentView === 'curriculum' && (
          <CurriculumView
            onNavigate={handleNavigate}
          />
        )}

        {/* Screen 3: Catálogo de Proyectos con Filtros y Empty State */}
        {currentView === 'projects' && (
          <ProjectsView
            onSelectProject={handleSelectProject}
            onNavigate={handleNavigate}
          />
        )}

        {/* Screen 3 Detalle: Ficha de Proyecto */}
        {currentView === 'project-detail' && (
          <ProjectDetailView
            project={selectedProject}
            onNavigate={handleNavigate}
            onSelectProject={handleSelectProject}
          />
        )}

        {/* Screen 4: Contacto */}
        {currentView === 'contact' && (
          <ContactView
            onNavigate={handleNavigate}
            onShowToast={handleShowToast}
          />
        )}

        {/* Screen 5: Design System Documentation */}
        {currentView === 'design-system' && (
          <DesignSystemView
            onShowToast={handleShowToast}
          />
        )}

      </main>

      {/* 3. Global Minimalist Footer */}
      <Footer
        onNavigate={handleNavigate}
        onShowToast={handleShowToast}
      />

      {/* 4. Action Toast Feedback */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
