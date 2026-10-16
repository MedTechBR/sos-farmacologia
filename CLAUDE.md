# SOS Farmacologia

Farmacologia aplicada ao balcão e à dispensação, para alunos do 9º/10º semestre de Farmácia e recém-formados
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

## Módulos (ids renumerados em 15/10/2026; ninguém tinha progresso salvo)
1 Princípios de farmacologia para o balcão (m01, ex-m03a parte 1) · 2 Sistema nervoso central (m02, ex-m03a parte 2)
· 3 Antimicrobianos (m03, ex-m03b) · 4 Cardiovascular e renal (m04) · 5 Endócrino (m05) · 6 AINEs, corticosteroides
e antialérgicos (m06) · 7 Respiratório (m07) · 8 Interações na atenção básica (m08, ex-m09).

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
  Mesma mecânica do conta-sos.js: progresso só no aparelho, administração (claim `mt.adm`) edita, cliente lê e gera
  PDF com "Licenciado para <e-mail>". REGRA DO DONO: nada salvo no aparelho é apagado por causa da conta.
- **Venda ligada em 15/10/2026** (pedido do dono: igual ao SOS Farmácia): produto `sosfarmacologia` no planos.json do
  site, linha provas, `publico:"farmacia"` (linha MedTech Multi na vitrine), R$ 49,90/mês ou R$ 397/ano, checkout "mp".
  Aparece no portal Provas (app.html → provas.html gerado), no trocador (`_mtauth.js` MT_FUNCS), no admin (admin.js),
  no `_mtacesso.js` (NOMES), na vitrine (vitrine.js, medtech-multi, index, ajuda, menu do header), em termos e
  privacidade, com print `img/vitrine/sosfarmacologia-390*.webp`. IAs do backend (MedTech/backend/functions):
  atendente lê a vitrine ao vivo (PAGINAS_BASE ganhou medtech-multi) e o curador de conteúdo indexa
  `/sos-farmacologia/` (formato "sos", sem errata).
- Trava de pré-lançamento (`emBreve` no conta-sosfarmacologia.js): só aparece se o MTAcesso devolver "livre" (produto
  sem checkout). Com a venda ligada ela não aparece; ficou no código como proteção.
