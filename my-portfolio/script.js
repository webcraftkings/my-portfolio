// Main interactive behaviors: tabs, modal, mobile nav, theme, form validation, smooth scroll
document.addEventListener('DOMContentLoaded', function () {
	// Tabs filtering
	const tabs = document.querySelectorAll('.tab');
	const projects = document.querySelectorAll('.project');
	tabs.forEach(tab => {
		tab.addEventListener('click', () => {
			tabs.forEach(t => t.classList.remove('active'));
			tab.classList.add('active');
			const category = tab.dataset.category;
			projects.forEach(p => {
				if (category === 'all' || p.dataset.category === category) {
					p.style.display = '';
				} else {
					p.style.display = 'none';
				}
			});
		});
	});

	// Project modal (single reuse)
	const modal = document.getElementById('project-modal');
	const modalTitle = document.getElementById('modal-title');
	const modalBody = document.getElementById('modal-body');
	const modalClose = document.getElementById('modal-close');
	projects.forEach(p => {
		p.style.cursor = 'pointer';
		p.addEventListener('click', () => {
			const titleEl = p.querySelector('h3');
			const descEl = p.querySelector('p');
			modalTitle.textContent = titleEl ? titleEl.textContent : 'Project';
			modalBody.textContent = descEl ? descEl.textContent : '';
			modal.setAttribute('aria-hidden', 'false');
		});
	});
	function closeModal() {
		if (modal) modal.setAttribute('aria-hidden', 'true');
	}
	if (modalClose) modalClose.addEventListener('click', closeModal);
	document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

	// Mobile nav toggle
	const menuToggle = document.getElementById('menu-toggle');
	const mainNav = document.getElementById('main-nav');
	if (menuToggle && mainNav) {
		menuToggle.addEventListener('click', () => {
			mainNav.classList.toggle('open');
			const expanded = mainNav.classList.contains('open');
			menuToggle.setAttribute('aria-expanded', expanded);
		});
	}

	// Theme toggle with localStorage
	const themeToggle = document.getElementById('theme-toggle');
	const body = document.body;
	const storedTheme = localStorage.getItem('site-theme');
	if (storedTheme === 'light') body.classList.add('light');
	if (themeToggle) themeToggle.addEventListener('click', () => {
		const isLight = body.classList.toggle('light');
		localStorage.setItem('site-theme', isLight ? 'light' : 'dark');
	});

	// Smooth scrolling for in-page links
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			const href = this.getAttribute('href');
			if (href.length > 1) {
				const target = document.querySelector(href);
				if (target) {
					e.preventDefault();
					target.scrollIntoView({ behavior: 'smooth', block: 'start' });
					// Close mobile nav on navigation
					if (mainNav && mainNav.classList.contains('open')) mainNav.classList.remove('open');
				}
			}
		});
	});

	// Contact form validation (client-only)
	const form = document.getElementById('contact-form');
	const formMsg = document.getElementById('form-msg');
	if (form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			const name = document.getElementById('name');
			const email = document.getElementById('email');
			const message = document.getElementById('message');
			if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
				formMsg.textContent = 'Please fill in all fields.';
				formMsg.style.color = 'salmon';
				return;
			}
			// simple email check
			const emailRe = /\S+@\S+\.\S+/;
			if (!emailRe.test(email.value)) {
				formMsg.textContent = 'Please enter a valid email.';
				formMsg.style.color = 'salmon';
				return;
			}
			// Simulate send
			formMsg.textContent = 'Message sent. Thank you!';
			formMsg.style.color = '#90ee90';
			form.reset();
			setTimeout(() => formMsg.textContent = '', 3000);
		});
	}

	// Testimonial submission form
	const testimonialForm = document.getElementById('testimonial-form');
	const testimonialMsg = document.getElementById('testimonial-msg');
	if (testimonialForm) {
		testimonialForm.addEventListener('submit', (e) => {
			e.preventDefault();
			const name = document.getElementById('testimonial-name');
			const role = document.getElementById('testimonial-role');
			const email = document.getElementById('testimonial-email');
			const text = document.getElementById('testimonial-text');
			const rating = document.querySelector('input[name="rating"]:checked');

			if (!name.value.trim() || !role.value.trim() || !email.value.trim() || !text.value.trim()) {
				testimonialMsg.textContent = 'Please fill in all fields.';
				testimonialMsg.style.color = 'salmon';
				return;
			}

			const emailRe = /\S+@\S+\.\S+/;
			if (!emailRe.test(email.value)) {
				testimonialMsg.textContent = 'Please enter a valid email.';
				testimonialMsg.style.color = 'salmon';
				return;
			}

			if (!rating) {
				testimonialMsg.textContent = 'Please select a star rating.';
				testimonialMsg.style.color = 'salmon';
				return;
			}

			// Simulate sending testimonial
			testimonialMsg.textContent = 'Thank you! Your testimonial has been submitted successfully. 🎉';
			testimonialMsg.style.color = '#90ee90';
			testimonialForm.reset();
			setTimeout(() => testimonialMsg.textContent = '', 4000);
		});
	}

	// Back to top button
	const backToTop = document.getElementById('back-to-top');
	window.addEventListener('scroll', () => {
		if (backToTop) {
			if (window.scrollY > 300) backToTop.style.display = 'block'; else backToTop.style.display = 'none';
		}
	});
	if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

	// Fill current year in footer
	const yearEl = document.getElementById('year');
	if (yearEl) yearEl.textContent = new Date().getFullYear();

	// Chat widget behavior
	const chatToggle = document.getElementById('chat-toggle');
	const chatWidget = document.getElementById('chat-widget');
	const chatClose = document.getElementById('chat-close');
	const chatForm = document.getElementById('chat-form');
	const chatInput = document.getElementById('chat-input');
	const chatMessages = document.getElementById('chat-messages');

	function appendChatMessage(kind, text, isHtml = false) {
		if (!chatMessages) return;
		const el = document.createElement('div');
		el.className = 'chat-message ' + (kind === 'user' ? 'user' : 'bot');
		if (isHtml) el.innerHTML = text; else el.textContent = text;
		chatMessages.appendChild(el);
		chatMessages.scrollTop = chatMessages.scrollHeight;
	}

	function openChat() {
		if (!chatWidget) return;
		chatWidget.setAttribute('aria-hidden', 'false');
		if (chatInput) chatInput.focus();
		if (chatToggle) chatToggle.style.display = 'none';
	}

	function closeChat() {
		if (!chatWidget) return;
		chatWidget.setAttribute('aria-hidden', 'true');
		if (chatToggle) chatToggle.style.display = 'block';
	}

	if (chatToggle) chatToggle.addEventListener('click', openChat);
	if (chatClose) chatClose.addEventListener('click', closeChat);

	// Helper: find social links from page anchors
	function findSocialLink(domain) {
		const anchors = document.querySelectorAll('a[href]');
		for (const a of anchors) {
			try {
				const href = a.getAttribute('href');
				if (!href) continue;
				if (href.includes(domain)) return href;
			} catch (err) {
				continue;
			}
		}
		return null;
	}

	// Generate bot response based on keywords (client-side, no backend)
	function getBotResponse(message) {
		const m = message.toLowerCase();
		const wa = findSocialLink('wa.me') || findSocialLink('api.whatsapp.com') || findSocialLink('whatsapp');
		const ig = findSocialLink('instagram.com') || findSocialLink('instagram');

		if (/(hi|hello|hey|help)\b/.test(m)) {
			return `Hello! 👋 I can help with services, packages, pricing, or how to reach me. Try "services" or "contact".`;
		}

		if (/(service|design|development|offer)/.test(m)) {
			return `I offer Web Design ($500), Web Development ($1,200), and UI/UX Design ($800). Would you like details on any of these?`;
		}

		if (/(package|plan|tier|option)/.test(m)) {
			return `We have 4 packages: Basic ($300), Standard ($700), Premium ($1,500), and Silver ($1,000). Which one interests you?`;
		}

		if (/(price|cost|how much|fee|dollar|naira)/.test(m)) {
			return `Prices are shown in USD and Naira on the Services section. For example, Web Design: $500 (approx ₦750,000). Need a quote?`;
		}

		if (/(contact|reach|whatsapp|instagram|message|chat)/.test(m)) {
			// Build HTML with available links
			const parts = [];
			if (wa) parts.push(`<a href="${wa}" target="_blank" rel="noopener noreferrer">WhatsApp</a>`);
			if (ig) parts.push(`<a href="${ig}" target="_blank" rel="noopener noreferrer">Instagram</a>`);
			if (parts.length) {
				return `You can reach me on: ${parts.join(' | ')}. I usually reply fastest on WhatsApp.`;
			}
			return `You can submit the testimonial/inquiry on the Testimonials page or leave a message here.`;
		}

		if (/(project|portfolio|work|example|case study)/.test(m)) {
			return `I have experience with e-commerce sites, mobile apps and UI/UX. Check the Featured Projects section for examples.`;
		}

		// Default fallback friendly message
		return `Thanks for your message! I can help with questions about services, packages, pricing, and projects. How can I help?`;
	}

	if (chatForm) {
		chatForm.addEventListener('submit', (e) => {
			e.preventDefault();
			if (!chatInput) return;
			const text = chatInput.value.trim();
			if (!text) return;
			appendChatMessage('user', text);
			chatInput.value = '';

			// Typing indicator
			const typingEl = document.createElement('div');
			typingEl.className = 'chat-message bot typing';
			typingEl.innerHTML = '<span>.</span><span>.</span><span>.</span>';
			chatMessages.appendChild(typingEl);
			chatMessages.scrollTop = chatMessages.scrollHeight;

			// Simulate response delay and then append bot message
			setTimeout(() => {
				if (typingEl.parentNode) typingEl.parentNode.removeChild(typingEl);
				const reply = getBotResponse(text);
				const isHtml = /<a\s+href=/.test(reply);
				appendChatMessage('bot', reply, isHtml);
			}, 700 + Math.min(2000, text.length * 30));
		});
	}

	// Close chat with Escape key
	document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeChat(); });

	// Packages CTA: open chat if available, otherwise navigate to testimonial submission
	document.querySelectorAll('.btn-get-started').forEach(btn => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			if (typeof openChat === 'function' && chatWidget) {
				openChat();
				return;
			}
			// fallback: navigate to testimonial submission page/anchor
			window.location.href = 'testimonial.html#submit-testimonial';
		});
	});

});

