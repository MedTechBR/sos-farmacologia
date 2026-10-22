# Reformulação em 17 módulos (22/10/2026)

Pedido do dono: o SOS Farmacologia passa a seguir esta lista de módulos, nesta ordem (num):

1 Farmacocinética e farmacodinâmica (m01) · 2 Sistema cardiovascular: anti-hipertensivos e antiarrítmicos (m04)
· 3 Sistema renal: diuréticos (m09) · 4 Sistema respiratório (m07) · 5 Sistema gastrointestinal (m10)
· 6 Sistema endócrino: insulinas, hormônios sexuais e tireoide (m05) · 7 Sistema nervoso central: anestésicos,
analgésicos opioides, ansiolíticos, antidepressivos, antipsicóticos, fármacos para Parkinson e Alzheimer, drogas de abuso (m02)
· 8 Antimicrobianos (m03) · 9 Antifúngicos (m11) · 10 Antivirais (m12) · 11 Antiparasitários (m13)
· 12 Quimioterapia antineoplásica (m14) · 13 Imunofarmacologia (m15) · 14 Anti-inflamatórios e coxibes (m06)
· 15 Antialérgicos (m16) · 16 Glicocorticoides (m17) · 17 Interações medicamentosas (m08).

Leia `docs/BRIEF.md` inteiro (rigor, escrita, formato do JSON) e `docs/AUDITORIA.md` (o mesmo padrão de conferência).
Para ver o tom e a profundidade, abra um módulo pronto (ex.: `conteudo/m03.json`, `conteudo/m07.json`).

## Público e enfoque

Alunos de Farmácia do 9º e 10º semestres e farmacêuticos recém-formados (público de farmácia, não de medicina).
É farmacologia de curso de graduação aplicada à prática do farmacêutico: mecanismo, classes, usos, efeitos adversos,
interações, contraindicações, monitorização e o que o farmacêutico faz (orientar, conferir a prescrição, reconhecer
risco, encaminhar). A caixa `cx balcao` continua obrigatória em todo tópico; nos temas hospitalares (quimioterapia,
imunobiológicos, antiarrítmicos) ela trata da dispensação, da conferência da prescrição e da orientação ao paciente.

## Regras de ids

- Arquivo novo: `conteudo/mNN.json` com `id`, `num`, `titulo` e `escopo` dados na sua tarefa; ids internos com o prefixo
  do módulo (`m10-...`). Arquivo existente: acrescente itens com o prefixo do próprio arquivo; NÃO mude ids que já
  existem (o progresso salvo no aparelho dos clientes é por id). Alguns arquivos têm tópicos com prefixo de outro
  módulo (ex.: `m04-diureticos` dentro de `m09.json`): isso é de propósito, não renomeie.
- Bloco de questões ou cartões que já existe: pode ACRESCENTAR itens no fim; não reordene nem apague os que existem.

## Extensão e mínimos por módulo novo

- 5 a 7 tópicos de 900 a 1.400 palavras cada (começo com o conceito, meio técnico, o que o farmacêutico faz),
  com tabelas no texto onde couber e as caixas do BRIEF (ao menos uma `cx balcao` por tópico).
- 2 a 3 mapas mentais (4 a 6 ramos, 2 a 5 itens curtos).
- Material de apoio: ao menos 2 tabelas, 1 fluxo, 1 checklist, 1 bloco de 14 a 18 cartões e 1 bloco de 10 a 12
  questões (casos, correta distribuída entre as posições e NUNCA a mais longa nem empatada com a mais longa).
- `fontes` só com o que foi consultado, com entidade, título, número/data e ano.

## Rigor

- Dose, prazo, lista da Portaria 344/98 (lista vigente: RDC 1.036/2026, Atualização n. 101, DOU 13/07/2026),
  regra de receita (antimicrobianos: RDC 471/2021 e IN 360/2025), PCDT e diretriz: versão vigente em outubro de
  2026, com fonte e ano ao lado. Função renal por CKD-EPI 2021, nunca Cockcroft-Gault como padrão.
- O Bulário Eletrônico da Anvisa (consultas.anvisa.gov.br) bloqueia acesso automático (403): use PDF de bula do
  fabricante, DailyMed/FDA, EMA, PCDT e protocolos do Ministério da Saúde (gov.br/saude, gov.br/conitec), RENAME,
  sociedades. Se não confirmar um dado, escreva sem depender dele ("conforme a bula do produto") ou retire.
- Cota de buscas: a da sua tarefa (a sessão inteira tem teto de ~200). Prefira WebFetch direto em fonte oficial.

## Antes de entregar

`python3 ferramentas/checa.py conteudo/<arquivo>.json` até `OK`, sem aviso de correta mais longa, empatada ou
concentrada. Não mexa em arquivos que não são da sua tarefa. Não publique, não faça git.
Relatório final curto: arquivos, contagens (tópicos, palavras, mapas, tabelas, questões, cartões), fontes principais,
lista honesta do que não foi confirmado em fonte primária e buscas usadas.
