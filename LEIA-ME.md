# SOS Farmacologia

Farmacologia aplicada ao balcão e à dispensação, para alunos do 9º e 10º semestres de Farmácia e farmacêuticos
recém-formados. 17 módulos, cada um com **Resumo para leitura**, **Mapa mental** e **Material de apoio**
(tabelas, quadros, fluxos, checklists, cartões e questões comentadas). Irmão do SOS Farmácia Comercial.

1. Farmacocinética e farmacodinâmica · 2. Sistema cardiovascular (anti-hipertensivos e antiarrítmicos) ·
3. Sistema renal (diuréticos) · 4. Sistema respiratório · 5. Sistema gastrointestinal ·
6. Sistema endócrino (insulinas, hormônios sexuais e tireoide) · 7. Sistema nervoso central · 8. Antimicrobianos ·
9. Antifúngicos · 10. Antivirais · 11. Antiparasitários · 12. Quimioterapia antineoplásica · 13. Imunofarmacologia ·
14. Anti-inflamatórios e coxibes · 15. Antialérgicos · 16. Glicocorticoides · 17. Interações medicamentosas

## O arquivo

`SOS-Farmacologia.html`: é o aplicativo inteiro, em um arquivo só, que funciona sem internet.
Abra com dois cliques (Chrome ou Edge recomendados). Pode copiar para pendrive, Drive ou mandar por e-mail.

## No site (medtechbr.com.br/sos-farmacologia/)

No site ele pede login com a conta MedTech. Só a conta de administração vê Modo edição e Salvar arquivo; o cliente
lê, estuda e gera PDF com a marca-d'água "Licenciado para" o e-mail dele. O progresso fica no aparelho.
Enquanto a venda não estiver ligada no planos.json, quem não é administração vê a tela "chega em breve".
O arquivo aberto do computador funciona sem login.

## Modificar o conteúdo

1. Clique em **Modo edição** (barra da esquerda).
2. No **Resumo**: clique no texto e edite. A barra preta tem negrito, itálico, subtítulo, listas, as caixas
   (Ponto-chave, Atenção, No balcão, Norma, Caso) e tabela. Os botões ao lado do título sobem, descem ou
   excluem o tópico. No fim da página: **Novo tópico**.
3. No **Mapa mental**: o lápis abre o mapa como texto (linha sem traço = ramo; `- item`; `-- subitem`).
4. No **Material de apoio**: o lápis abre cada bloco em texto simples (a ajuda aparece em cima do campo).
   No fim da página dá para criar bloco novo de qualquer tipo.
5. Clique em **Salvar arquivo**. O navegador pergunta onde gravar: escolha o mesmo
   `SOS-Farmacologia.html` para substituir (ou outro nome para guardar uma versão).

Enquanto você não salva, as mudanças ficam guardadas no navegador e aparece um aviso amarelo.
Se fechar sem salvar, ao abrir de novo o app oferece **Recuperar alterações**.
Em **Ajustes** dá para exportar e importar o conteúdo (.json) como cópia de segurança.

## Gerar PDF

Botão **Gerar PDF**: escolha o módulo (ou todos), as partes (capa, resumo, mapas, apoio, gabarito) e o
texto da marca-d'água. Na janela que abre, destino **Salvar como PDF**. Todo PDF sai com marca-d'água em
todas as páginas, numeração e mapas mentais em página deitada. Mesmo o Ctrl/Cmd+P comum sai com marca-d'água.

PDFs prontos ficam na pasta `pdf/` (um por módulo e um completo).

## Para quem mantém pelo computador (pasta do projeto)

- `conteudo/mNN.json`: conteúdo de cada módulo (fonte). `fonte/`: código do app.
- `python3 monta.py`: gera o `SOS-Farmacologia.html`.
- `python3 ferramentas/importa.py`: traz para `conteudo/` as edições feitas dentro do app
  (rodar antes do `monta.py` quando alguém editou e salvou pelo app).
- `python3 ferramentas/gera_pdfs.py`: gera todos os PDFs em `pdf/` (aceita `--marca2 "Licenciado para ..."`).
- `python3 ferramentas/checa.py conteudo/*.json`: valida o conteúdo (formato, travessão, frases proibidas).
- `docs/BRIEF.md`: regras de conteúdo e escrita. `docs/REVISAO.md`: pontos para revisão humana.
