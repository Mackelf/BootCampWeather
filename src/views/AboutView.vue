<script setup>
// sin lógica, vista estática
</script>

<template>
  <section class="container py-4">

    <div class="about-card mb-4">
      <div class="d-flex align-items-center gap-3 mb-4">
        <i class="bi bi-person-circle icon-theme"></i>
        <div>
          <h2 class="mb-0 text-theme-primary">Mario Canto</h2>
          <div class="about-muted">Frontend Developer en formación</div>
        </div>
      </div>

      <div class="about-content">
        <p>
          Este proyecto es para portfolio, evidencia de lo aprendido en un curso de Sence,
          un Bootcamp por <strong>Talento Digital</strong>.
        </p>

        <p>
          La mayor parte de mi vida profesional la he ejercido en el área de T.I. Hice soporte
          en terreno, diagnosticando y reparando PC, desktop, notebook y periféricos. También
          resolviendo problemas de software; en fin, cada aspecto en donde un cliente necesite
          continuidad operativa.
        </p>

        <p>
          Ahora tengo la oportunidad de crecer en el área como Developer Frontend, algo que me
          ha atraído bastante. Espero que este y otros proyectos que comparta sean reflejo de
          lo que podría hacer profesionalmente en un futuro cercano.
        </p>
      </div>
    </div>

    <div class="about-card">
      <h3 class="about-section-title mb-3">Stack aprendido en el Bootcamp</h3>
      <div class="d-flex flex-wrap gap-2">
        <span class="about-tag">HTML5</span>
        <span class="about-tag">CSS3</span>
        <span class="about-tag">SCSS</span>
        <span class="about-tag">JavaScript</span>
        <span class="about-tag">Vue.js 3</span>
        <span class="about-tag">Vue Router</span>
        <span class="about-tag">Bootstrap 5</span>
        <span class="about-tag">Git / GitHub</span>
        <span class="about-tag">REST APIs</span>
        <span class="about-tag">Vite</span>
      </div>
    </div>

  </section>
</template>
<style scoped lang="scss">
.about-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 1rem;
  padding: 2rem;
  color: var(--card-text-primary);
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.icon-theme {
  font-size: 3.5rem;
  color: var(--card-link);
}

.text-theme-primary {
  color: var(--card-text-primary);
  font-weight: 700;
}

.about-muted {
  color: var(--card-text-secondary);
  font-size: 0.95rem;
}

.about-section-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--card-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.about-content {
  p {
    color: var(--card-text-primary);
    line-height: 1.8;
    margin-bottom: 1.2rem;
    font-size: 1.05rem;
    opacity: 0.9;

    &:last-of-type {
      margin-bottom: 0;
    }

    strong {
      color: var(--card-link);
      font-weight: 600;
    }
  }
}

.about-tag {
  background: rgba(74, 158, 221, 0.1);
  border: 1px solid var(--card-border);
  border-radius: 0.5rem;
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--card-link);
  transition: all 0.2s ease;

  &:hover {
    background: var(--card-link);
    color: #ffffff;
    transform: translateY(-2px);
  }
}
</style>