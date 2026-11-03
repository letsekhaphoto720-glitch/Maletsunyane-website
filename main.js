const $=id=>document.getElementById(id);
const form=$('registrationForm');
if(form){
  const today=new Date().toISOString().split('T')[0];$('checkin').min=today;
  const rules={
    name:v=>v.trim().length>=3||'Enter your full name (at least 3 characters).',
    email:v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())||'Enter a valid email, like name@example.com.',
    phone:v=>/^\+?[\d\s]{8,15}$/.test(v.trim())||'Enter 8 to 15 digits, for example +266 5812 3456.',
    checkin:v=>(v&&v>=today)||'Choose a check-in date from today onward.',
    message:v=>v.trim().length>=10||'Tell us a little more (at least 10 characters).'
  };
  const check=k=>{const r=rules[k]($(k).value);$(k+'Error').textContent=r===true?'':r;return r===true};
  Object.keys(rules).forEach(k=>$(k).addEventListener('blur',()=>check(k)));
  form.addEventListener('submit',e=>{
    e.preventDefault();$('formSuccess').style.display='none';
    const ok=Object.keys(rules).map(check).every(Boolean);
    if(ok){$('formSuccess').textContent='Request sent. The lodge will reply to '+$('email').value.trim()+' to confirm your dates.';$('formSuccess').style.display='block';form.reset()}
  });
}
const figs=[...document.querySelectorAll('.grid figure')],dlg=$('lb');
if(dlg&&figs.length){
  let i=0;const show=n=>{i=(n+figs.length)%figs.length;const f=figs[i];$('lbImg').src=f.querySelector('img').src;$('lbImg').alt=f.querySelector('img').alt;$('lbCap').textContent=f.querySelector('figcaption').textContent};
  figs.forEach((f,n)=>f.addEventListener('click',()=>{show(n);dlg.showModal()}));
  $('prev').onclick=()=>show(i-1);$('next').onclick=()=>show(i+1);$('close').onclick=()=>dlg.close();
  dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close()});
  document.addEventListener('keydown',e=>{if(!dlg.open)return;if(e.key==='ArrowLeft')show(i-1);if(e.key==='ArrowRight')show(i+1)});
}
