const STORAGE_KEY = 'injection_demo_v1';
const MACHINE_KEY = 'injection_machines_v1';
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const today = () => new Date().toISOString().slice(0,10);
const nowTime = () => new Date().toTimeString().slice(0,5);
const num = (v) => Number(v || 0);
const fmt = (n) => num(n).toLocaleString('vi-VN');
let records = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
let machines = JSON.parse(localStorage.getItem(MACHINE_KEY) || '["INJ-01","INJ-02","INJ-03"]');
function save(){localStorage.setItem(STORAGE_KEY, JSON.stringify(records));}
function saveMachines(){localStorage.setItem(MACHINE_KEY, JSON.stringify(machines));}
function setDefaultDates(){
  $('#dashboardDate').value = today(); $('#reportDate').value = today();
  const f = $('#productionForm'); f.date.value = today(); f.time.value = nowTime();
}
function switchView(id){$$('.view').forEach(v=>v.classList.toggle('active', v.id===id));$$('.nav').forEach(b=>b.classList.toggle('active', b.dataset.view===id));renderAll();}
function renderMachines(){
  $('#machineSelect').innerHTML = machines.map(m=>`<option>${m}</option>`).join('');
  $('#machineList').innerHTML = machines.map(m=>`<span class="chip">${m}<button onclick="removeMachine('${m}')">x</button></span>`).join('') || '<div class="empty">Chưa có máy</div>';
}
window.removeMachine = (m) => { if(confirm('Xóa máy '+m+'?')){ machines = machines.filter(x=>x!==m); saveMachines(); renderMachines(); }};
function getByDate(date){return records.filter(r=>r.date===date)}
function calc(list){
  const plan = list.reduce((s,r)=>s+num(r.plan),0), ok = list.reduce((s,r)=>s+num(r.ok),0), ng = list.reduce((s,r)=>s+num(r.ng),0);
  const total = ok + ng, yieldRate = total ? (ok/total*100) : 0;
  return {plan, ok, ng, total, yieldRate};
}
function renderDashboard(){
  const list = getByDate($('#dashboardDate').value); const s = calc(list);
  $('#sumPlan').textContent=fmt(s.plan); $('#sumTotal').textContent=fmt(s.total); $('#sumOk').textContent=fmt(s.ok); $('#sumNg').textContent=fmt(s.ng); $('#sumYield').textContent=s.yieldRate.toFixed(2)+'%';
  const byMachine = {}; list.forEach(r=>{byMachine[r.machine]=(byMachine[r.machine]||0)+num(r.ok)+num(r.ng)}); const max = Math.max(...Object.values(byMachine),1);
  $('#machineBars').innerHTML = Object.entries(byMachine).map(([m,v])=>`<div class="barRow"><strong>${m}</strong><div class="bar"><div style="width:${v/max*100}%"></div></div><span>${fmt(v)} đôi</span></div>`).join('') || '<div class="empty">Chưa có dữ liệu hôm nay</div>';
  const byDefect = {}; list.forEach(r=>{ if(r.defect && num(r.ng)>0) byDefect[r.defect]=(byDefect[r.defect]||0)+num(r.ng)});
  $('#defectList').innerHTML = Object.entries(byDefect).sort((a,b)=>b[1]-a[1]).map(([d,v])=>`<span class="pill ng">${d}: ${fmt(v)} đôi</span>`).join('') || '<div class="empty">Chưa ghi nhận lỗi</div>';
}
function tableHtml(list, withAction=false){
  const head = '<tr><th>Ngày</th><th>Giờ</th><th>Ca</th><th>Máy</th><th>Model</th><th>Size</th><th>Plan</th><th>OK</th><th>NG</th><th>Yield</th><th>Lỗi</th><th>Ghi chú</th>'+(withAction?'<th></th>':'')+'</tr>';
  const rows = list.map(r=>{const t=num(r.ok)+num(r.ng); const y=t?(num(r.ok)/t*100).toFixed(2)+'%':'0%'; return `<tr><td>${r.date}</td><td>${r.time}</td><td>${r.shift}</td><td>${r.machine}</td><td>${r.model}</td><td>${r.size||''}</td><td>${fmt(r.plan)}</td><td>${fmt(r.ok)}</td><td>${fmt(r.ng)}</td><td>${y}</td><td>${r.defect||''}</td><td>${r.note||''}</td>${withAction?`<td class="rowActions"><button onclick="deleteRecord('${r.id}')">Xóa</button></td>`:''}</tr>`}).join('');
  return head + (rows || '<tr><td colspan="13" class="empty">Chưa có dữ liệu</td></tr>');
}
function renderEntry(){ $('#entryTable').innerHTML = tableHtml(records.slice().reverse().slice(0,50), true); }
function renderReport(){ $('#reportTable').innerHTML = tableHtml(getByDate($('#reportDate').value), false); }
window.deleteRecord = (id) => { if(confirm('Xóa dòng này?')){records=records.filter(r=>r.id!==id);save();renderAll();}};
function renderAll(){renderMachines();renderDashboard();renderEntry();renderReport();}
$('#productionForm').addEventListener('submit', e=>{e.preventDefault(); const f=e.target; records.push({id:crypto.randomUUID(),date:f.date.value,time:f.time.value,shift:f.shift.value,machine:f.machine.value,model:f.model.value,size:f.size.value,plan:num(f.plan.value),ok:num(f.ok.value),ng:num(f.ng.value),defect:f.defect.value,note:f.note.value}); save(); f.ok.value=0; f.ng.value=0; f.note.value=''; renderAll(); alert('Đã lưu sản lượng');});
$$('.nav').forEach(b=>b.addEventListener('click',()=>switchView(b.dataset.view)));
$('#dashboardDate').addEventListener('change', renderDashboard); $('#reportDate').addEventListener('change', renderReport);
$('#addMachine').addEventListener('click',()=>{const m=$('#newMachine').value.trim().toUpperCase(); if(!m) return; if(!machines.includes(m)) machines.push(m); $('#newMachine').value=''; saveMachines(); renderMachines();});
$('#clearData').addEventListener('click',()=>{if(confirm('Xóa toàn bộ dữ liệu test?')){records=[];save();renderAll();}});
$('#fillSample').addEventListener('click',()=>{const d=today(); records.push({id:crypto.randomUUID(),date:d,time:'08:00',shift:'A',machine:'INJ-01',model:'Adidas A',size:'42',plan:500,ok:480,ng:20,defect:'Bubble',note:''},{id:crypto.randomUUID(),date:d,time:'09:00',shift:'A',machine:'INJ-02',model:'Adidas A',size:'41',plan:500,ok:492,ng:8,defect:'Flash',note:''},{id:crypto.randomUUID(),date:d,time:'10:00',shift:'A',machine:'INJ-03',model:'Nike B',size:'40',plan:500,ok:470,ng:30,defect:'Short Shot',note:'Kiểm tra nhiệt'});save();renderAll();});
$('#exportCsv').addEventListener('click',()=>{const list=getByDate($('#reportDate').value); const header=['Date','Time','Shift','Machine','Model','Size','Plan','OK','NG','Defect','Note']; const csv=[header.join(',')].concat(list.map(r=>header.map(h=>'"'+String(r[h.toLowerCase()]||'').replaceAll('"','""')+'"').join(','))).join('\n'); const blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8;'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='injection-report-'+$('#reportDate').value+'.csv'; a.click();});
setDefaultDates(); renderAll();
