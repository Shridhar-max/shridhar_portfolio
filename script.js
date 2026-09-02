document.addEventListener('DOMContentLoaded',function(){
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  toggle && toggle.addEventListener('click',()=>{
    links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
  });

  // Smooth reveal on scroll
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add('visible');
    });
  },{threshold:0.12});
  document.querySelectorAll('.section, .card, .project, .skill-card, .timeline-item').forEach(el=>{
    el.classList.add('reveal'); io.observe(el);
  });

  // Smooth anchor scrolling (handles offset if header is fixed)
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(!href || href==='#') return;
      const target = document.querySelector(href);
      if(target){
        e.preventDefault();
        const offset = 12;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({top,behavior:'smooth'});
        // close mobile nav
        if(window.innerWidth<700){ document.querySelector('.nav-links').style.display='none'; }
      }
    });
  });

  // Open a prefilled Gmail draft when no server-side form service is configured.
  const contactForm = document.querySelector('#contact-form');
  contactForm && contactForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    const formData = new FormData(contactForm);
    const status = contactForm.querySelector('.form-status');
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();
    const subject = `Portfolio enquiry from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=shridharshri7483@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if(status) status.textContent = 'Opening Gmail...';
    window.location.href = gmailUrl;
  });
});
