/* CheckMyBurnout.com — Blog engine */
(function () {
  'use strict';
  let _cache = null;

  async function fetchPosts() {
    if (_cache) return _cache;
    try {
      const res = await fetch('data/posts.json');
      if (!res.ok) throw new Error('Failed');
      _cache = await res.json();
      return _cache;
    } catch (e) { console.error('[Blog]', e); return []; }
  }

  function fmtDate(iso) {
    return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  function slugUrl(id) { return `blog-post.html?slug=${encodeURIComponent(id)}`; }

  function esc(str) {
    const d = document.createElement('div'); d.textContent = str; return d.innerHTML;
  }

  function cardHtml(post) {
    return `<a class="post-card" href="${slugUrl(post.id)}">
      <div class="post-card-img"><img src="${post.image}" alt="${esc(post.title)}" loading="lazy"></div>
      <div class="post-card-body">
        <span class="post-cat">${esc(post.category)}</span>
        <h3>${esc(post.title)}</h3>
        <p>${esc(post.excerpt)}</p>
        <div class="post-meta"><span>${fmtDate(post.date)}</span><span>·</span><span>${esc(post.readTime)}</span></div>
      </div>
    </a>`;
  }

  async function renderHomeGrid(containerId, count) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const posts = await fetchPosts();
    el.innerHTML = posts.slice(0, count).map(cardHtml).join('');
  }

  async function renderBlogGrid(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const posts = await fetchPosts();
    if (!posts.length) { el.innerHTML = '<p style="color:var(--text-soft)">Unable to load posts. Please refresh.</p>'; return; }
    let html = '';
    posts.forEach((p, i) => {
      html += cardHtml(p);
      if ((i + 1) % 3 === 0 && i !== posts.length - 1) {
        html += `<div class="adsense-slot rectangle" data-slot="blog-grid-${i}" data-size="336x280" style="grid-column:span 1;"></div>`;
      }
    });
    el.innerHTML = html;
  }

  async function renderArticlePage() {
    const root = document.getElementById('articleRoot');
    if (!root) return;
    const slugId = new URLSearchParams(window.location.search).get('slug');
    const posts = await fetchPosts();
    if (!slugId || !posts.length) { root.innerHTML = '<p>Article not found. <a href="blog.html">Back to blog</a></p>'; return; }
    const idx = posts.findIndex(p => p.id === slugId);
    const post = posts[idx];
    if (!post) { root.innerHTML = '<p>Article not found. <a href="blog.html">Back to blog</a></p>'; return; }

    document.title = `${post.title} | CheckMyBurnout Blog`;
    setMeta('description', post.metaDescription || post.excerpt);
    setMeta('og:title', post.title, true);
    setMeta('og:description', post.metaDescription || post.excerpt, true);
    setMeta('og:image', post.image, true);

    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.textContent = JSON.stringify({
      '@context': 'https://schema.org', '@type': 'Article',
      headline: post.title, image: post.image, datePublished: post.date,
      author: { '@type': 'Organization', name: 'CheckMyBurnout' },
      publisher: { '@type': 'Organization', name: 'CheckMyBurnout' }
    });
    document.head.appendChild(ld);

    const content = post.content
      .replace(/\[AD1\]/g, `<div class="adsense-slot banner" data-slot="article-ad-1" data-size="responsive"></div>`)
      .replace(/\[AD2\]/g, `<div class="adsense-slot banner" data-slot="article-ad-2" data-size="responsive"></div>`);

    const wrapper = document.createElement('div');
    wrapper.innerHTML = content;
    const headings = wrapper.querySelectorAll('h2[id]');
    const toc = headings.length ? `<nav class="toc"><h2>On this page</h2><ol>${
      Array.from(headings).map(h => `<li><a href="#${h.id}">${h.textContent}</a></li>`).join('')
    }</ol></nav>` : '';

    const prev = posts[idx + 1];
    const next = posts[idx - 1];
    const related = posts.filter(p => p.id !== post.id && p.category === post.category).slice(0, 3);
    const extra = posts.filter(p => p.id !== post.id && p.category !== post.category).slice(0, 3 - related.length);
    const relPosts = [...related, ...extra];

    root.innerHTML = `
      <div class="article-header">
        <span class="eyebrow">${esc(post.category)}</span>
        <h1>${esc(post.title)}</h1>
        <div class="article-meta"><span>${fmtDate(post.date)}</span><span>·</span><span>${esc(post.readTime)}</span></div>
      </div>
      <div class="article-cover"><img src="${post.image}" alt="${esc(post.title)}"></div>
      <div class="article-layout">
        <div>
          ${toc}
          <div class="article-body">${content}</div>
          <div class="tags">${(post.tags||[]).map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div>
          <div class="share-row">
            <span>Share:</span>
            <a class="share-btn" target="_blank" rel="noopener" href="https://twitter.com/intent/tweet?url=${encodeURIComponent(location.href)}&text=${encodeURIComponent(post.title)}"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.6 8.7L23.3 22H16.8l-5.2-6.8L5.6 22H2.5l8.2-9.3L1.7 2h6.7l4.7 6.2L18.9 2zm-1.2 18h1.7L7.4 4H5.6l12.1 16z"/></svg></a>
            <a class="share-btn" target="_blank" rel="noopener" href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(location.href)}"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.25h4V23h-4V8.25zM8.5 8.25h3.83v2.01h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13V23h-4v-6.7c0-1.6-.03-3.66-2.23-3.66-2.24 0-2.58 1.75-2.58 3.55V23h-4V8.25z"/></svg></a>
          </div>
          <div class="author-box">
            <div class="author-avatar">CB</div>
            <div><h4>CheckMyBurnout Team</h4><p>Evidence-based guides on burnout prevention, recovery, and workplace wellbeing.</p></div>
          </div>
          <div class="prev-next">
            ${prev ? `<a class="pn-card prev" href="${slugUrl(prev.id)}"><span>← Previous</span><h4>${esc(prev.title)}</h4></a>` : '<div></div>'}
            ${next ? `<a class="pn-card next" href="${slugUrl(next.id)}"><span>Next →</span><h4>${esc(next.title)}</h4></a>` : '<div></div>'}
          </div>
        </div>
        <aside>
          <div class="sidebar-widget">
            <div class="adsense-slot rectangle" data-slot="sidebar-1" data-size="336x280"></div>
          </div>
          <div class="sidebar-widget">
            <h3>Take the Quiz</h3>
            <p style="font-size:0.85rem;color:var(--text-soft);margin-bottom:14px;">Free 5-minute burnout assessment. No sign-up. Results stay on your device.</p>
            <a href="index.html#quizSection" class="btn btn-indigo btn-block">Start Free Assessment</a>
          </div>
          ${relPosts.length ? `<div class="sidebar-widget"><h3>Related Articles</h3>
            ${relPosts.map(p=>`<a class="related-post" href="${slugUrl(p.id)}"><img src="${p.image}" alt="${esc(p.title)}" loading="lazy"><h5>${esc(p.title)}</h5></a>`).join('')}
          </div>` : ''}
        </aside>
      </div>`;

    document.querySelectorAll('.adsense-slot').forEach(s => {
      if (!s.textContent.trim()) s.textContent = `Ad · ${s.dataset.slot||''} · ${s.dataset.size||''}`;
    });
  }

  function setMeta(name, content, isProp) {
    const attr = isProp ? 'property' : 'name';
    let el = document.querySelector(`meta[${attr}="${name}"]`);
    if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el); }
    el.setAttribute('content', content);
  }

  window.BurnoutBlog = { fetchPosts, renderHomeGrid, renderBlogGrid, renderArticlePage };
})();
