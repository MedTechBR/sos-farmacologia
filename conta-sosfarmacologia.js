/* conta-sosfarmacologia.js — conta MedTech e compra no SOS Farmacologia (15/10/2026).
   Mesma mecânica do SOS Farmácia Comercial (conta-sos.js de lá): produto "sosfarmacologia" do planos.json do site.
   Só entra quando o app é aberto pelo site: o casca.html escreve mtsync.js (portão de login), /_mtacesso.js
   (compra e tela de assinatura) e este arquivo. Aberto do computador (file://) ou no localhost, nada disso
   carrega e o app é a ferramenta do dono.

   - Login obrigatório com a conta MedTech (mtsync.js, cópia sem mudança de ~/Documents/Claude/_mtsync/).
   - Depois do login, MTAcesso.verificar: conta sem CPF completa o cadastro; sem compra, tela de assinatura
     com os preços do planos.json; administração entra liberada.
   - Administração (claim mt.adm): modo edição, "Salvar arquivo", importar/exportar e marca-d'água livres
     (SOS.liberarEdicao). Cliente: leitura, estudo e PDF com marca-d'água "Licenciado para <e-mail>".

   REGRA DO DONO: nada que está salvo no aparelho é apagado por causa da conta. O progresso (tópicos
   estudados, respostas, cartões, checklists, tema, rascunho de edição) fica só no aparelho, nas chaves
   "sos-farmacologia:*" do localStorage, e não sobe para a nuvem: o motor de sincronização roda sem coleções.
   Sair da conta e troca de conta não limpam nada (limparLocal vazio); o mtsync só mexe nas chaves dele,
   "sos-farmacologia:mts" e "sos-farmacologia:mts_uid". */
(function () {
  "use strict";
  const APP = "sosfarmacologia", NOME = "SOS Farmacologia", PREF = "sos-farmacologia:";
  if (!window.MTS) { console.warn("SOS: módulo da conta não carregou; app aberto sem conta"); return }

  /* A tela de entrar do mtsync diz que o progresso fica salvo na conta; aqui ele fica só no aparelho.
     Troca só essa frase, sem mexer na cópia do mtsync.js. */
  const FRASE = "Entre com sua conta MedTech. Seu progresso fica salvo nela e aparece em qualquer aparelho.";
  const corrige = () => { const s = document.querySelector("#mtsPortao .sub"); if (s && s.textContent === FRASE) s.textContent = "Entre com sua conta MedTech para abrir o SOS Farmacologia." };
  new MutationObserver(corrige).observe(document.documentElement, { childList: true, subtree: true });

  function emBreve(u) {
    if (document.getElementById("sosEmBreve")) return;
    const d = document.createElement("div"); d.id = "sosEmBreve"; d.setAttribute("role", "dialog"); d.setAttribute("aria-modal", "true");
    d.style.cssText = "position:fixed;inset:0;z-index:2147483000;background:var(--papel,#F5F6FB);color:var(--ink,#141827);display:grid;place-items:center;padding:24px;font:15px/1.55 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif";
    d.innerHTML = '<div style="max-width:440px;text-align:center"><div style="width:64px;height:64px;border-radius:50%;background:#0E9384;color:#fff;display:grid;place-items:center;margin:0 auto 18px;font-size:30px"><i class="ti ti-pills" aria-hidden="true"></i></div>' +
      '<h2 style="margin:0 0 8px;font-size:22px;letter-spacing:-.02em">SOS Farmacologia chega em breve</h2>' +
      '<p style="margin:0 0 20px;color:var(--ink2,#5D6579)">O material está em revisão final. Você entrou como ' + (u.email || "") + '; quando abrirmos, o acesso aparece aqui.</p>' +
      '<button type="button" style="border:0;border-radius:999px;padding:10px 20px;background:#0B7A6E;color:#fff;font-weight:600;cursor:pointer">Sair da conta</button></div>';
    d.querySelector("button").onclick = () => MTS.sair();
    document.body.appendChild(d);
  }

  function inicia() {
    const cs = getComputedStyle(document.documentElement), g = n => cs.getPropertyValue(n).trim();
    const t = document.documentElement.dataset.tema;
    const escuro = t === "escuro" || (!t && matchMedia("(prefers-color-scheme: dark)").matches);
    MTS.iniciar({
      app: APP, nome: NOME, pref: PREF, vendor: "/vendor/firebase/",
      /* verde-azulado da marca escurecido para o botão: #0B7A6E dá 5,2:1 com texto branco; no escuro,
         #5FD4C4 com texto preto (11,7:1). O mtsync escolhe a cor do texto do botão pelo contraste. */
      cores: { cor: escuro ? "#5FD4C4" : "#0B7A6E", fundo: g("--papel") || (escuro ? "#0D1017" : "#F5F6FB"), texto: g("--ink") || (escuro ? "#EDF0F7" : "#141827"),
        suave: g("--ink2") || (escuro ? "#A3ABBE" : "#5D6579"), borda: g("--linhaF") || (escuro ? "#343D51" : "#D3D8E5"), campo: g("--sup") || (escuro ? "#161B26" : "#fff"),
        erro: escuro ? "#FF9B9B" : "#B42318", ok: escuro ? "#5EE6A8" : "#067647" },
      colecoes: {},
      ler() { return undefined },
      gravar() {},
      aoReceber() {},
      async limparLocal() { /* nada é apagado (regra do dono) */ },
      aoEntrar(u) {
        const S = window.SOS, M = window.MTAcesso;
        if (!S) return;
        S.cliente(u.email || u.displayName || "");
        if (!M) return;   /* falha aberta, como nos outros apps: sem o módulo de compra, só leitura */
        const libera = () => S.liberarEdicao();
        /* Pré-lançamento (15/10/2026): enquanto o produto "sosfarmacologia" não tiver checkout no planos.json,
           o MTAcesso devolve "livre" para qualquer conta. Aí só a administração entra; os demais veem "em breve".
           Quando a venda for ligada, o motivo passa a ser plano/assinar/teste e esta trava some sozinha. */
        const adm = M.lerMt(u, false).then(mt => !!(mt && mt.adm)).catch(() => false);
        adm.then(a => { if (a) libera() });
        M.verificar({ appId: APP, user: u, signOut: () => MTS.sair() })
          .then(r => adm.then(a => { if (a || (r && r.motivo === "admin")) libera(); else if (r && r.motivo === "livre") emBreve(u) }))
          .catch(() => {});
      }
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", inicia, { once: true });
  else inicia();
})();
