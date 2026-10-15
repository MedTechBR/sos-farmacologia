# Auditoria do conteúdo herdado (15/10/2026)

Os módulos de `conteudo/` vieram do SOS Farmácia Comercial (escritos em 08/10/2026 por agentes) e foram
reorganizados em 8 módulos. Antes de publicar, cada módulo passa por uma reconferência em fonte primária.
Leia `docs/BRIEF.md` inteiro (regras de rigor, de escrita e o formato do JSON) antes de começar.

## O que fazer no seu arquivo

1. Ler o módulo inteiro (resumos, mapas, tabelas, quadros, fluxos, checklists, cartões, questões).
2. Reconferir **toda dose, prazo, limite, lista da Portaria 344/98, número de norma/artigo, diretriz e ano**
   citados, contra a versão VIGENTE em outubro de 2026. Começar pelas pendências que a tarefa lista
   (vieram de `herdado/REVISAO-herdado.md`). Prioridade: o que muda conduta no balcão (dose máxima,
   receituário exigido, contraindicação, interação grave, conservação).
3. Corrigir no próprio JSON (Edit pontual; não reescrever o arquivo do zero). Ao lado de cada regra relevante,
   fonte e ano: "(Diretriz Brasileira de Hipertensão Arterial 2025)", "(RDC 471/2021, art. 6º)", "(bula do
   profissional, Fabricante, 2024)". Se não conseguir confirmar um dado, reescreva para não depender dele
   ("conforme a bula do produto") ou retire. Nunca invente número, artigo, URL, dose ou ano.
4. Função renal: TFG por **CKD-EPI 2021 (sem raça)**. Se o texto usar Cockcroft-Gault como padrão, corrija
   (pode mencionar que algumas bulas antigas ajustam por ClCr de Cockcroft-Gault, mas o padrão é CKD-EPI 2021).
5. Público de farmácia (não de medicina): o farmacêutico orienta, confere, reconhece risco e encaminha.
   Cada tópico clínico precisa de ao menos uma caixa `cx balcao`.
6. Questões: a correta não pode ser a alternativa mais longa (se for, encurte a correta ou alongue
   distratores plausíveis); distribua a correta entre as posições; comentário cita a fonte. Cartões curtos.
7. Escrita (BRIEF): sem travessão, sem metanarração, sem emoji, sem frase de efeito, títulos substantivos.
8. Atualize `fontes` do módulo: só o que foi de fato consultado (o herdado + o que você conferiu agora),
   com entidade, título, número/data e ano. Tire do `fontes` o que não tem relação com este módulo.
9. Rode `python3 ferramentas/checa.py conteudo/<arquivo>.json` até `OK`, sem aviso de "correta mais longa"
   nem de "correta concentrada".

## Limites

- **Cota: no máximo 18 WebSearch** (a sessão inteira tem teto de ~200 somando todos os agentes). Prefira
  WebFetch direto em fonte oficial: gov.br/anvisa, in.gov.br, cff.org.br, consultas.anvisa.gov.br (bulário),
  gov.br/saude (PCDT, RENAME, FTN), sociedades (SBC, SBD, SBEM, SBPT, ASBAI), GINA, GOLD, FDA (DailyMed),
  EMA, ISMP Brasil, AWaRe (OMS). Bula do profissional no Bulário Eletrônico quando der.
- Mexa só no(s) arquivo(s) da sua tarefa. Não apague tópicos nem blocos (pode corrigir, encurtar e acrescentar).
- Não publique nada, não faça git.

## Relatório final (resposta ao coordenador, curta)

1. Arquivo(s) e saída final do checa.py.
2. Correções feitas (lista: o que estava, o que ficou, fonte e ano).
3. Lista honesta do que **não** foi confirmado em fonte primária (com o motivo: fonte inacessível, só resumo
   secundário, divergência entre fontes).
4. Quantas WebSearch e WebFetch usou.
