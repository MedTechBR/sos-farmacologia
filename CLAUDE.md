# SOS Farmacologia

Farmacologia para alunos do 9º/10º semestre de Farmácia e recém-formados
(público de farmácia, não de medicina). Criado em 15/10/2026 como irmão do SOS Farmácia Comercial
(`~/Documents/Claude/sos-farmacia/`), com o mesmo motor e o mesmo visual (sistema FarmaUTI), cor própria
verde-azulada `--marca:#0E9384` e logo `ti-pills`. Conteúdo herdado dos módulos de farmacologia que saíram do SOS
Farmácia em 15/10/2026 (`herdado/`: JSONs, PDFs antigos e `REVISAO-herdado.md`), reorganizado e reconferido.
Endereço: https://medtechbr.com.br/sos-farmacologia/ (repo público MedTechBR/sos-farmacologia, Pages da main na raiz).
Publicar: `python3 monta.py && cp SOS-Farmacologia.html index.html`, commit e push; conferir por hash.

- Entregável: `SOS-Farmacologia.html` (arquivo único, offline, editável no próprio app, "Salvar arquivo"
  regrava o HTML com os dados novos). PDFs em `pdf/` (marca-d'água em toda página, mapas em página paisagem).
- Fonte: `conteudo/mNN.json` + `fonte/` (casca, CSS, JS). Cor, ícone e nome curto de cada módulo: `MODULOS` no monta.py.
- Fluxo: `python3 ferramentas/checa.py conteudo/*.json` → `python3 monta.py` → `python3 ferramentas/gera_pdfs.py`.
  Se o dono editou e salvou pelo app: `python3 ferramentas/importa.py` ANTES do monta (o monta recusa sem isso).
- Teste de montagem: `SOS_SAIDA=_teste/teste.html python3 monta.py`. Preview: entrada `sos-farmacologia`
  (porta 8797) no ~/.claude/launch.json.
- Regras de conteúdo e escrita: `docs/BRIEF.md`. Roteiro da reconferência: `docs/AUDITORIA.md`.
  Pendências que ficaram sem fonte primária: `docs/REVISAO.md`.

## Módulos (22/10/2026: reformulação em 17, pedido do dono; roteiro em docs/ESCRITA-2026-10.md)
Ordem (num) e id do arquivo: 1 Farmacocinética e farmacodinâmica (m01) · 2 Cardiovascular: anti-hipertensivos e
antiarrítmicos (m04) · 3 Renal: diuréticos (m09) · 4 Respiratório (m07) · 5 Gastrointestinal (m10) · 6 Endócrino:
insulinas, hormônios sexuais e tireoide (m05) · 7 SNC (m02) · 8 Antimicrobianos (m03) · 9 Antifúngicos (m11) ·
10 Antivirais (m12) · 11 Antiparasitários (m13) · 12 Quimioterapia antineoplásica (m14) · 13 Imunofarmacologia (m15)
· 14 Anti-inflamatórios e coxibes (m06) · 15 Antialérgicos (m16) · 16 Glicocorticoides (m17) · 17 Interações (m08).
**Ids mantidos de propósito** (o app já era vendido; progresso no aparelho é por id de tópico e de bloco): tópicos
que mudaram de módulo ficaram com o id antigo (ex.: `m04-diureticos` em m09.json, `m06-corticoides-*` em m17.json),
por isso o checa.py aceita qualquer prefixo `mNN-` e o monta.py recusa id repetido entre módulos. Blocos de cartões e
questões que foram divididos ganharam id novo (`m04-questoes-cv`, `m09-questoes`…), para resposta antiga não cair
na questão errada. Remissão entre módulos pelo nome ("módulo Sistema respiratório"), nunca pelo número.
O antigo tópico de antifúngicos, antivirais e antiparasitários do m03 virou semente (`trabalho/semente-antiinfecciosos.json`)
dos módulos m11, m12 e m13.

## Diferenças do motor em relação ao SOS Farmácia
- Sem Gestão da farmácia (gestao/), sem bulário, calculadora e simuladores (os tipos de bloco seguem no app.js,
  sem uso). O grupo "Ferramentas" da barra lateral só aparece se algum módulo tiver bloco de ferramenta.
- Chaves do aparelho `sos-farmacologia:*`. Quarto número do início: cartões de revisão (no lugar de "modelos de
  receita e POPs").
- Armadilhas do motor (iguais às do SOS Farmácia): app.js nunca pode conter `</script` literal; "Salvar arquivo"
  usa a cópia ORIGEM tirada antes do primeiro desenho; Chrome headless às vezes não encerra depois do PDF (o
  gera_pdfs mata); aba em segundo plano congela requestAnimationFrame (mapa aparece em branco em print de aba oculta).

## Conta e venda
- `fonte/casca.html` carrega, só em http(s) fora do localhost (ou com `?portao=1`), `mtsync.js` (cópia sem mudança
  de `~/Documents/Claude/_mtsync/`), `/_mtacesso.js?v=N` e `conta-sosfarmacologia.js` (appId `sosfarmacologia`).
  Mesma mecânica do conta-sos.js: administração (claim `mt.adm`) edita, cliente lê e gera PDF com "Licenciado para <e-mail>".
- **PROGRESSO NA CONTA (22/10/2026, decisão do dono; substitui a regra antiga "nada salvo no aparelho é apagado"):**
  "o progresso em todos os apps tem que ser na conta, não no aparelho". No site, `conta-sosfarmacologia.js` liga o motor
  do mtsync com 4 coleções `mapa` em `users/{uid}/apps/sosfarmacologia/sync`: `estudado` e `vistos` (listas de ids no
  app, viram {id:1}), `resp` e `check`. Valor vai como texto JSON no campo `j`; id no nome do documento (ponto vira %2E).
  Primeiro login: reserva imutável de todas as chaves `sos-farmacologia:*` no IndexedDB `sos-farmacologia-reserva`
  ("antes-da-conta") e o que estava no aparelho SOBE (com carimbo antigo: perde para o que a nuvem já tiver; a chave
  `sos-farmacologia:mts_cols` marca que o `inicio` antigo do motor já foi tirado). Sair/troca de conta: mtsync espera a
  fila subir, reserva "saida-<uid>-<momento>" e remove as 4 chaves com o removeItem original (sem lápide). Ficam no
  aparelho: tema, vista do mapa e rascunho de edição. Trava: coleção com 3+ itens que esvazia sem "Zerar meu progresso"
  (`window.__sosZerou`) não vira lápide. `SOS.recarrega()` redesenha quando chega dado de outro aparelho. Fora do site
  (file://, localhost sem `?portao=1`) o progresso continua só no aparelho. Teste: cópia com fake-firebase.js + stub do
  `/_mtacesso.js` (com `lerMt`), cenários 0-4 aprovados em 22/10/2026.
- **Venda ligada em 15/10/2026** (pedido do dono: igual ao SOS Farmácia): produto `sosfarmacologia` no planos.json do
  site, linha provas, `publico:"farmacia"` (linha MedTech Multi na vitrine), R$ 49,90/mês ou R$ 397/ano, checkout "mp".
  Aparece no portal Provas (app.html → provas.html gerado), no trocador (`_mtauth.js` MT_FUNCS), no admin (admin.js),
  no `_mtacesso.js` (NOMES), na vitrine (vitrine.js, medtech-multi, index, ajuda, menu do header), em termos e
  privacidade, com print `img/vitrine/sosfarmacologia-390*.webp`. IAs do backend (MedTech/backend/functions):
  atendente lê a vitrine ao vivo (PAGINAS_BASE ganhou medtech-multi) e o curador de conteúdo indexa
  `/sos-farmacologia/` (formato "sos", sem errata).
- Trava de pré-lançamento (`emBreve` no conta-sosfarmacologia.js): só aparece se o MTAcesso devolver "livre" (produto
  sem checkout). Com a venda ligada ela não aparece; ficou no código como proteção.
