
function renderFromData(data){
  const container = document.getElementById("content");
  container.innerHTML = "";
  const h2 = document.createElement("h2");
  h2.textContent = data.title || "";
  container.appendChild(h2);
  if(data.description){
    const p=document.createElement("p"); p.textContent=data.description; container.appendChild(p);
  }
  (data.blocks||[]).forEach((block, idx)=>{
    const card=document.createElement("section"); card.className="card";
    const h3=document.createElement("h3"); h3.textContent=(idx+1)+". "+(block.heading||block.type); card.appendChild(h3);
    if(block.type==="choice"){
      const q=document.createElement("div"); q.className="question"; q.textContent=block.question; card.appendChild(q);
      const choices=document.createElement("div"); choices.className="choices";
      const fb=document.createElement("div"); fb.className="feedback";
      (block.choices||[]).forEach((c,i)=>{
        const btn=document.createElement("button"); btn.type="button"; btn.className="choice"; btn.textContent=c;
        btn.addEventListener("click",()=>{
          [...choices.children].forEach(ch=>ch.classList.remove("selected"));
          btn.classList.add("selected");
          fb.textContent=(i===block.answerIndex)?"정답입니다! ✅":"다시 생각해 보세요. ❌";
        });
        choices.appendChild(btn);
      });
      card.appendChild(choices); card.appendChild(fb);
    }
    if(block.type==="truefalse"){
      (block.items||[]).forEach((item,k)=>{
        const row=document.createElement("div"); row.style.margin=".4rem 0";
        row.textContent=(k+1)+") "+item.statement+" ";
        const btnO=document.createElement("button"); btnO.className="btn"; btnO.textContent="○";
        const btnX=document.createElement("button"); btnX.className="btn"; btnX.textContent="×";
        const fb=document.createElement("span"); fb.className="feedback"; fb.style.marginLeft=".5rem";
        btnO.addEventListener("click",()=>{ fb.textContent=(item.answer===true)?"정답(○)":"오답"; });
        btnX.addEventListener("click",()=>{ fb.textContent=(item.answer===false)?"정답(×)":"오답"; });
        row.appendChild(btnO); row.appendChild(btnX); row.appendChild(fb);
        card.appendChild(row);
      });
    }
    if(block.type==="fill"){
      (block.items||[]).forEach((it,k)=>{
        const wrap=document.createElement("div"); wrap.style.margin=".5rem 0";
        const label=document.createElement("div"); label.textContent=(k+1)+") "+it.prompt;
        const input=document.createElement("input"); input.className="fill-input"; input.placeholder="정답 입력";
        const checkBtn=document.createElement("button"); checkBtn.className="btn"; checkBtn.textContent="정답 확인";
        const fb=document.createElement("div"); fb.className="feedback";
        checkBtn.addEventListener("click",()=>{
          const user=(input.value||"").trim();
          const answers=(Array.isArray(it.answer)?it.answer:[it.answer]).map(a=>a.toString().trim());
          fb.textContent=answers.includes(user)?"정답입니다! ✅":`정답: ${answers.join(" / ")}`;
        });
        wrap.appendChild(label); wrap.appendChild(input); wrap.appendChild(checkBtn); wrap.appendChild(fb);
        card.appendChild(wrap);
      });
    }
    container.appendChild(card);
  });
}

/* basePath:
 * - index.html에서 호출: "./pages"  → ./pages/pageN.html
 * - 각 pageN.html에서 호출: "."      → ./pageN.html
 */
function buildGNB(active, basePath="."){
  const nav=document.getElementById("gnb");
  ["page1","page2","page3","page4","page5","page6","page7"].forEach(p=>{
    const a=document.createElement("a");
    a.href=`${basePath}/${p}.html`;
    a.textContent=p.toUpperCase();
    if(p===active) a.className="active";
    nav.appendChild(a);
  });
}
