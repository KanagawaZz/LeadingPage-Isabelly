# Registro de decisões

## Decisões aprovadas

- Stack inicial: React + Vite + CSS puro.
- A página será mobile-first, porque será divulgada principalmente pelo Instagram e por anúncios.
- Objetivo principal: levar o visitante ao catálogo e ao WhatsApp da Isabelly.
- Objetivo secundário: captar nome e WhatsApp para novidades e promoções.
- A página não terá venda online; o fechamento será presencial.
- Atendimento para todo o Brasil.
- Direção visual: elegante, moderna, minimalista, em azul-marinho, com pouco texto e linguagem profissional/descontraída.
- Número do WhatsApp: +55 65 8131-3761.
- Prazo de referência: campanha de Black Friday a partir de 1º de novembro.
- Direção de animação aprovada: elegante e discreta, com entrada suave ao rolar, microanimações nos cards, parallax sutil no hero e WhatsApp flutuante.
- Fotos organizadas em uma pasta por grupo, com carrossel/galeria quando houver mais de uma foto por categoria.

- Apenas dois pontos de contato com o WhatsApp na página: o link do cabeçalho (topo) e o botão flutuante. Removidos os botões extras (hero, cards do catálogo e seção final de contato) para reduzir a poluição visual.

## Decisões tomadas sozinho

- Estrutura inicial com hero, catálogo por categorias, diferenciais do atendimento e chamada para WhatsApp.
- Fotos organizadas em `src/assets/maquinas/<pasta-do-grupo>/`, com uma pasta por categoria e nomes numerados para facilitar a identificação de onde cada foto entra:
  - `1-foto-perfil-isabelly/` (apenas 1 foto da Isabelly, exibida no topo; sem foto, mostra a letra "I")
  - `2-foto-principal-topo-pagina/` (apenas 1 foto, para o topo da página)
  - `3-fotos-linha-amarela/`
  - `4-fotos-linha-verde/`
  - `5-fotos-caminhoes-e-carretas/`
- As fotos de cada pasta aparecem automaticamente na página (sem precisar editar código); basta nomear com números (`01.jpg`, `02.jpg`, ...) para controlar a ordem, conforme o guia em `src/assets/maquinas/LEIA-ME.txt`.
- As fotos das categorias aparecem em um carrossel com uma imagem em destaque, setas e indicadores de navegação.
- Uso de placeholders visuais enquanto logo, fotos definitivas, modelos, preços e identidade final não forem definidos.
- O nome exibido provisoriamente é `ISABELLY`, sem tratar isso como nome oficial da marca.

## Pendências

- Nome oficial da marca.
- Logo e identidade visual final.
- Modelos, fotos definitivas, preços ou indicação de “consulte”.
- @ do Instagram.
- Definição do formulário de captação (serviço de envio/armazenamento dos contatos).
- Provas sociais e quantidade exata de clientes atendidos.
- Confirmação do texto e da mecânica da campanha de Black Friday.

## Placeholders ainda em uso

- Foto principal da hero: já adicionada por você em `2-foto-principal-topo-pagina/`.
- Fotos das categorias do catálogo (pastas `3-fotos-linha-amarela/`, `4-fotos-linha-verde/`, `5-fotos-caminhoes-e-carretas/` ainda vazias).
- Marca/logotipo.
- Modelos e preços.
- @ do Instagram.
- Formulário de nome e WhatsApp.
- Provas sociais.
