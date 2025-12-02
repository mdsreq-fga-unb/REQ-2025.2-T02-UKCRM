# Product Backlog Building

## CulturaViva

A ‘CulturaViva’ é uma rede que conecta centros culturais, teatros, museus, bibliotecas e coletivos
artísticos espalhados por diversas cidades brasileiras. Apesar de sua relevância social e potencial
de impacto, a rede enfrenta sérios desafios de gestão e integração tecnológica. Cada espaço adota
ferramentas diferentes para administrar programações, bilheterias, inscrições, artistas e
divulgação, o que gera fragmentação e ineficiência.


<img src="../../imgs/problemaexpectativa.png" alt="image" class="centered-img"> 

<img src="../../imgs/personas1.png" alt="image" class="centered-img"> 
<img src="../../imgs/funcionalidades1.png" alt="image" class="centered-img"> 
<img src="../../imgs/pbi1.png" alt="image" class="centered-img"> 
<img src="../../imgs/us1.jpg" alt="image" class="centered-img"> 

<img src="../../imgs/prfun.jpg" alt="image" class="centered-img"> 
<img src="../../imgs/pbi2.jpg" alt="image" class="centered-img"> 
<img src="../../imgs/us2.jpg" alt="image" class="centered-img"> 



<iframe width="768" height="432" src="https://miro.com/app/live-embed/uXjVJsvalhk=/?embedMode=view_only_without_ui&moveToViewport=-11215,-11472,17848,9771&embedId=460956883846" frameborder="0" scrolling="no" allow="fullscreen; clipboard-read; clipboard-write" allowfullscreen></iframe>

## Critérios de validação 

# PBB - Requisitos Funcionais

| Item PBB | História de Usuário | Critérios de Validação |
|-----------|---------------------|------------------------|
| **Permitir o cadastro, edição e visualização de eventos culturais em uma agenda única e integrada, acessível por todas as unidades.** | Como Gestora Cultural, eu quero cadastrar, editar e visualizar eventos em uma agenda única e integrada, para que todas as unidades tenham acesso à programação atualizada e centralizada. | - Crie um novo evento com título, data, local e descrição.<br>- Edite um evento existente e confirme a atualização na agenda.<br>- Exclua (ou arquive) um evento.<br>- Verifique se usuários de diferentes unidades (com permissão) visualizam a mesma agenda.<br>- Filtre a agenda por data, unidade e categoria. |
| **Implementar um módulo para controle de orçamento, despesas e receitas associadas a cada evento.** | Como Gestora Cultural, eu quero controlar o orçamento, despesas e receitas de cada evento, para que eu possa gerenciar a saúde financeira dos projetos. | - Associe um orçamento inicial a um evento.<br>- Registre novas despesas (com categoria e valor) vinculadas ao evento.<br>- Registre receitas (ex: bilheteria) vinculadas ao evento.<br>- Visualize um resumo (Orçado vs. Realizado) para o evento. |
| **Gerar automaticamente relatórios de público, orçamento e participação de artistas.** | Como Gestora Cultural, eu quero gerar relatórios automáticos de público, orçamento e participação de artistas, para que eu possa analisar o desempenho e prestar contas de forma eficiente. | - Gere um relatório de público por período ou evento.<br>- Gere um relatório financeiro (orçamento vs. realizado) por evento.<br>- Gere um relatório de participação de artistas (quantos artistas, cachês).<br>- Exporte os relatórios gerados em PDF e CSV. |
| **Criar um sistema interno de mensagens e notificações para comunicação entre unidades e com artistas.** | Como Gestora Cultural, eu quero um sistema interno de mensagens e notificações, para que eu possa me comunicar de forma ágil com outras unidades e artistas. | - Envie uma mensagem direta para outro usuário (outra unidade).<br>- Envie uma mensagem para um grupo de artistas de um evento.<br>- Receba uma notificação (visual na plataforma) ao receber uma nova mensagem. |
| **Desenvolver um banco de dados centralizado que armazene todas as informações de eventos, públicos, artistas e orçamentos.** | Como Gestora Cultural, eu quero um banco de dados centralizado, para que todas as informações (eventos, públicos, artistas, orçamentos) estejam seguras e integradas como fonte única da verdade. | - Confirme se dados de um novo evento são salvos na base central.<br>- Confirme se dados de um novo artista podem ser vinculados a um evento.<br>- Garanta que a exclusão de um evento não exclua o artista (integridade referencial). |
| **Criar um painel visual com indicadores de desempenho, mostrando dados de eventos, públicos e finanças.** | Como Gestora Cultural, eu quero um painel visual (dashboard) com indicadores de desempenho, para que eu possa monitorar rapidamente os dados principais de eventos, públicos e finanças. | - Acesse o dashboard.<br>- Visualize um gráfico de "Eventos Realizados vs. Planejados".<br>- Visualize um indicador de "Público Total" no período.<br>- Visualize um medidor de "Orçamento Executado (%)" geral.<br>- Filtre o dashboard por um período (ex: últimos 30 dias). |
| **Definir ingressos com preços, lotes e descontos para minhas produções.** | Como Produtor Independente, eu quero definir preços, lotes e descontos para os ingressos, para que eu possa gerenciar a estratégia de vendas e maximizar a receita. | - Crie um tipo de ingresso (ex: "Inteira") com preço fixo.<br>- Crie um segundo lote ativo após o primeiro esgotar (ou em data específica).<br>- Crie um cupom de desconto (ex: "PROMO10") com 10% de desconto.<br>- Defina a quantidade total de ingressos disponíveis. |
| **Submeter propostas de projetos culturais por formulário padronizado.** | Como Produtor Independente, eu quero submeter propostas por formulário padronizado, para que o processo de inscrição em editais seja claro e eficiente. | - Acesse "Editais Abertos" e inicie uma submissão.<br>- Preencha campos obrigatórios.<br>- Anexe documentos exigidos (PDF, planilhas).<br>- Envie a proposta e receba e-mail de confirmação.<br>- Salve como rascunho antes de enviar. |
| **Disponibilizar um link de compra direta para o público.** | Como Produtor Independente, eu quero um link de compra direta para meu evento, para que eu possa divulgá-lo facilmente. | - Após criar o evento e definir ingressos, localize o link de compra.<br>- Copie o link gerado.<br>- Acesse o link anonimamente e verifique se abre o evento correto. |
| **Visualizar portfólio com artistas e grupos com quem trabalho (com histórico e necessidades técnicas).** | Como Produtor Independente, eu quero visualizar um portfólio de artistas, para acessar rapidamente seus históricos e necessidades técnicas. | - Acesse "Meus Artistas".<br>- Adicione um novo artista com informações de contato.<br>- Adicione notas de "Necessidades Técnicas" (Rider Técnico).<br>- Visualize histórico de eventos do artista. |
| **Permitir acompanhar as vendas em tempo real.** | Como Produtor Independente, eu quero acompanhar as vendas em tempo real, para tomar decisões rápidas sobre marketing e lotes. | - Acesse o painel do evento.<br>- Visualize ingressos vendidos e receita atualizada.<br>- Simule nova compra e verifique atualização dos dados (em até 1 minuto). |
| **Buscar e visualizar todas as oportunidades abertas em uma única listagem.** | Como Artista Visual, eu quero buscar e visualizar oportunidades abertas, para encontrar novos projetos e me candidatar. | - Acesse "Oportunidades" ou "Editais".<br>- Visualize lista de editais "Abertos".<br>- Filtre por categoria e prazo de inscrição. |
| **Receber notificações automáticas (via plataforma e e-mail) sobre mudanças de status nas minhas propostas ou prazos importantes.** | Como Artista Visual, eu quero receber notificações sobre mudanças de status, para não perder atualizações importantes. | - Submeta uma proposta (simulação).<br>- (Admin) altere status para "Em Análise".<br>- Verifique notificação na plataforma e e-mail. |
| **Preencher formulário padrão que anexa meu portfólio salvo com um clique.** | Como Artista Visual, eu quero anexar meu portfólio salvo com um clique, para agilizar inscrições em editais. | - Inicie inscrição em edital.<br>- Localize campo "Portfólio".<br>- Clique em "Anexar Portfólio da Plataforma".<br>- Verifique se foi anexado corretamente. |
| **Alertas proativos sobre o andamento dos editais.** | Como Artista Visual, eu quero alertas proativos sobre o andamento dos editais que sigo, para acompanhar as fases. | - "Siga" um edital de interesse.<br>- (Admin) mude fase para "Em Análise".<br>- Verifique se notificação foi enviada ao artista seguidor. |
| **Gerenciar (criar, editar, salvar) meu portfólio digital dentro da plataforma.** | Como Artista Visual, eu quero gerenciar meu portfólio (bio, currículo, uploads), para mantê-lo atualizado. | - Acesse "Meu Portfólio".<br>- Edite "Biografia".<br>- Faça upload de imagem (JPG/PNG).<br>- Faça upload de PDF (Currículo).<br>- Adicione link de vídeo (YouTube/Vimeo). |
| **Visualizar um dashboard analítico com os dados agregados da rede.** | Como Gestor Público de Cultura, eu quero visualizar um dashboard com dados agregados da rede, para ter visão macro do impacto cultural. | - Acesse dashboard de gestão.<br>- Visualize número total de eventos e público agregado no trimestre.<br>- Veja mapa de calor por região. |
| **Gerar e exportar relatórios padronizados (por período, região ou tipo de evento).** | Como Gestor Público de Cultura, eu quero gerar relatórios padronizados, para analisar dados por período, região ou tipo. | - Acesse "Relatórios Gerenciais".<br>- Gere relatório filtrando por região e período.<br>- Exporte relatório em PDF e CSV. |
| **Gráficos e métricas sobre frequência total, diversidade de público, acessibilidade e número de eventos realizados.** | Como Gestor Público de Cultura, eu quero gráficos sobre frequência e acessibilidade, para avaliar políticas de inclusão. | - Visualize gráfico de pizza da "Diversidade de Público".<br>- Veja indicador "% de Eventos com Acessibilidade".<br>- Veja gráfico de linha da "Frequência Total" (últimos 12 meses). |
| **Cruzar dados de público (gastos com bilhetes e outros) com os custos dos eventos.** | Como Gestor Público de Cultura, eu quero cruzar dados de público e custos, para avaliar o impacto econômico. | - Gere relatório com Evento, Custo Total, Receita e Público.<br>- Calcule "Custo por Espectador".<br>- Visualize "Ticket Médio". |
| **Visualizar indicadores ROI das ações fomentadas.** | Como Gestor Público de Cultura, eu quero visualizar indicadores de ROI, para justificar investimentos e otimizar recursos. | - Exibir "ROI Financeiro" (Receita/Investimento).<br>- Exibir "ROI Social" (Custo por Pessoa Impactada).<br>- Filtrar por tipo de fomento. |
| **Realizar um rápido onboarding no primeiro acesso.** | Como Espectadora, eu quero realizar um onboarding inicial, para selecionar interesses e locais preferidos. | - Crie conta.<br>- Verifique tela de onboarding.<br>- Selecione categorias e locais preferidos.<br>- Conclua onboarding e verifique persistência. |
| **Navegar por uma agenda cultural unificada, com filtros de data, categoria e preço.** | Como Espectadora, eu quero navegar pela agenda cultural unificada, para encontrar eventos de interesse. | - Acesse "Agenda".<br>- Filtre por data, categoria e preço.<br>- Verifique se resultados correspondem aos filtros. |
| **Salvar essas preferências.** | Como Espectadora, eu quero salvar minhas preferências de filtro, para reutilizá-las automaticamente. | - Aplique filtros e clique "Salvar Filtros".<br>- Faça logout/login e verifique se foram aplicados. |
| **Submeter avaliação de feedback sobre eventos que participei.** | Como Espectadora, eu quero avaliar eventos que participei, para compartilhar minha opinião. | - Acesse evento passado.<br>- Atribua nota (1 a 5 estrelas).<br>- Escreva e envie comentário.<br>- Verifique se avaliação é pública. |
| **Receber sugestões proativas de eventos com base no meu histórico.** | Como Espectadora, eu quero receber sugestões personalizadas, para descobrir novos eventos relevantes. | - Após participar de 3 eventos de "Música Clássica", acesse o feed.<br>- Verifique se aparecem eventos similares recomendados. |
| **Garantir que o feed e as recomendações futuras sejam relevantes.** | Como Espectadora, eu quero um feed personalizado de acordo com preferências, para ver conteúdo relevante. | - Após selecionar "Teatro" e "Dança" no onboarding, verifique se o feed mostra majoritariamente essas categorias. |
| **Acessar histórico dos eventos que frequentei e que vou participar.** | Como Espectadora, eu quero acessar histórico de eventos passados e futuros, para me organizar. | - Acesse "Meus Ingressos".<br>- Veja abas "Próximos Eventos" e "Eventos Passados". |
| **Selecionar um evento e realizar a compra de ingresso dentro da plataforma.** | Como Espectadora, eu quero comprar ingressos diretamente na plataforma, para um processo seguro e rápido. | - Selecione evento.<br>- Escolha ingresso e quantidade.<br>- Faça checkout e pagamento.<br>- Receba e-mail de confirmação.<br>- Verifique ingresso em "Meus Ingressos". |
| **Receber notificações sobre eventos que salvei e eventos que comprei.** | Como Espectadora, eu quero notificações sobre eventos salvos ou comprados, para ser lembrada de datas e mudanças. | - Favorite um evento.<br>- Receba notificação quando estiver quase esgotando.<br>- Receba lembrete 24h antes do evento comprado. |
| **Receber notificações sobre atividades dos meus locais preferidos.** | Como Espectadora, eu quero notificações sobre novas atividades dos meus locais preferidos, para acompanhar a programação. | - Marque "Centro Cultural X" como preferido.<br>- (Admin) Cadastre novo evento nesse local.<br>- Verifique se a espectadora recebe notificação. |
| **Permitir o agendamento e a publicação automática de postagens em múltiplas redes sociais.** | Como Analista de Comunicação, eu quero agendar e publicar postagens em múltiplas redes, para otimizar o tempo e manter a cadência. | - Conecte contas do Instagram e Facebook.<br>- Crie e agende postagem.<br>- Verifique publicação nas redes no horário agendado. |
| **Integrar os principais canais de comunicação (redes sociais, site institucional e newsletter) em uma única interface.** | Como Analista de Comunicação, eu quero integrar canais em uma interface única, para gerenciar toda a comunicação centralizadamente. | - Verifique se painel de agendamento é o mesmo da plataforma.<br>- Crie banner e confirme exibição no site.<br>- Crie campanha de e-mail e envie teste. |
| **Disponibilizar uma área para armazenar e organizar materiais de comunicação.** | Como Analista de Comunicação, eu quero uma área de armazenamento e organização de mídia, para reutilizar assets facilmente. | - Acesse "Biblioteca de Mídia".<br>- Faça upload de imagem com tags.<br>- Crie grupo de hashtags.<br>- Ao postar, importe imagem e hashtags. |
| **Criar um painel de métricas consolidado (alcance, curtidas, compartilhamentos, comentários).** | Como Analista de Comunicação, eu quero visualizar métricas agregadas de redes, para analisar desempenho geral. | - Acesse "Dashboard de Métricas".<br>- Visualize Engajamento e Alcance Totais.<br>- Filtre por rede social (ex: Instagram). |
| **Gerar relatórios periódicos com indicadores e recomendações.** | Como Analista de Comunicação, eu quero gerar relatórios periódicos, para apresentar resultados e otimizar estratégias. | - Gere relatório mensal.<br>- Verifique métricas e "Top Posts".<br>- Exporte em PDF. |
| **Implementar um sistema de recomendação com base em desempenho anterior.** | Como Analista de Comunicação, eu quero recomendações automáticas de horários, conteúdos e hashtags, para otimizar engajamento. | - Ao criar postagem, veja sugestão de "Melhor horário".<br>- Veja painel de "Insights".<br>- Verifique quais tipos e hashtags geram mais engajamento. |

# Critérios de aceitação 

## Funcionalidade 1: Administrar Eventos

**CENÁRIO:** Visualização da agenda com eventos<br>
**Dado que** existem 3 eventos cadastrados para a semana atual<br>
**Quando** Mariana acessa a tela "Agenda Cultural"<br>
**E** ela seleciona a visualização "Semanal"<br>
**Então** ela deve ver os 3 eventos representados visualmente nos seus respectivos dias e horários.

**CENÁRIO:** Identificação de conflito de horário<br>
**Dado que** Mariana está cadastrando um "Novo Evento" no "Auditório Principal" para "15/11/2025 às 20h"<br>
**E** já existe um evento agendado para o "Auditório Principal" no mesmo dia e horário<br>
**Quando** ela tenta salvar o novo evento<br>
**Então** o sistema deve exibir um alerta: "Conflito de agenda. Já existe um evento neste local e horário."<br>


**CENÁRIO:** Edição de horário de um evento publicado<br>
**Dado que** o "Concerto de Primavera" está publicado<br>
**Quando** Mariana edita o evento e altera o horário de "20:00" para "21:00"<br>
**E** clica em "Salvar Alterações"<br>
**Então** as informações do evento na agenda pública devem ser atualizadas para "21:00".

**CENÁRIO** (Exceção): Edição de evento publicado que causa novo conflito de agenda<br>
**Dado que** o evento "Concerto A" está publicado para o "Auditório Principal" às 20h<br>
**E** o evento "Peça B" está publicado para a "Sala Anexa" às 20h<br>
E Mariana já sabe que o "Auditório Principal" está ocupado às 20h<br>
**Quando** ela tenta editar a "Peça B" e alterar o local para "Auditório Principal" (mantendo as 20h)
E clica em "Salvar Alterações"<br>
**Então** o sistema deve exibir o alerta: "Conflito de agenda. O 'Auditório Principal' já está em uso neste horário pelo 'Concerto A'."
E a alteração não deve ser salva.


**CENÁRIO:** Publicar um evento em rascunho<br>
**Dado que** Mariana está no painel de gerenciamento do evento "Concerto de Primavera" (status "Rascunho")<br>
**Quando** ela clica no botão "Publicar Evento"<br>
**Então** o status do evento deve mudar para "Publicado"<br>
**E** o evento deve se tornar visível na agenda pública para a Beatriz (Espectadora).<br>

**CENÁRIO (Exceção):** Tentativa de publicar evento com informações essenciais faltando<br>
**Dado que** Mariana está a gerir um evento em "Rascunho"<br>
**E** o evento tem Título e Data, mas o campo "Local" está vazio<br>
**Quando** ela clica no botão "Publicar Evento"<br>
**Então** o sistema deve exibir uma mensagem de erro: "Não é possível publicar. Preencha os campos obrigatórios: Local e Categoria."<br>
**E** o status do evento deve permanecer "Rascunho".<br>

## Funcionalidade 2: Comercializar Ingressos

**CENÁRIO:** Configuração de venda de ingressos com lotes<br>
**Dado que** Rafael (Produtor) está na página de gerenciamento do seu evento<br>
**Quando** ele acessa a aba "Ingressos"<br>
**E** ele cria um ingresso "Lote 1" com preço "R$ 50,00" e quantidade "100"<br>
**E** ele cria um ingresso "Lote 2" com preço "R$ 70,00" e quantidade "50"<br>
**E** ele ativa a venda de ingressos<br>
**Então** a página pública do evento deve exibir "Ingressos Lote 1 - R$ 50,00".<br>

**CENÁRIO (Exceção):** Tentativa de criar ingresso com preço negativo ou inválido<br>
**Dado que** Rafael (Produtor) está na tela de configuração de ingressos<br>
**Quando** ele tenta criar um "Lote 1" com o preço "-R$ 50,00"<br>
**E** clica em "Salvar Ingresso"<br>
**Então** o sistema deve exibir uma mensagem de erro: "O preço deve ser um valor positivo."<br>
**E** o ingresso não deve ser criado.<br>

**CENÁRIO (Exceção):** Tentativa de ativar vendas sem ter criado ingressos<br>
**Dado que** Rafael está na página do seu evento, que ainda não tem ingressos configurados<br>
**Quando** ele tenta mudar o toggle de "Vendas Inativas" para "Vendas Ativas"<br>
**Então** o sistema deve impedi-lo e exibir a mensagem: "Crie pelo menos um tipo de ingresso antes de ativar as vendas."<br>
**E** o toggle deve permanecer como "Vendas Inativas".<br>


**CENÁRIO:** Compartilhamento do link de venda<br>
**Dado que** Rafael configurou os ingressos do seu evento<br>
**Quando** ele clica no botão "Compartilhar" no painel do evento<br>
**Então** o sistema deve exibir uma URL única<br>
**E** ele pode copiar essa URL para divulgar.<br>


**CENÁRIO:** Verificação de vendas no dashboard<br>
**Dado que** o evento de Rafael já vendeu 30 ingressos do "Lote 1"<br>
**Quando** Rafael acessa o painel do seu evento<br>
**Então** ele deve ver um widget "Relatório de Vendas"<br>
**E** o widget deve exibir "30/100 ingressos vendidos (Lote 1)" e "Receita Bruta: R$ 1.500,00".<br>

**CENÁRIO (Alternativo):** Visualização de vendas de um lote esgotado<br>
**Dado que** o "Lote 1" (100 ingressos) do evento de Rafael está esgotado<br>
**E** o "Lote 2" (50 ingressos) já vendeu 10<br>
**Quando** Rafael acede ao painel do seu evento<br>
**Então** o widget "Relatório de Vendas" deve exibir:
"Lote 1: 100/100 (Esgotado)"
"Lote 2: 10/50"
"Total Arrecadado: (Soma do valor dos 110 ingressos)"<br>

## Funcionalide 3: Centralizar inscrições e portfólios

**CENÁRIO:** Inscrição em edital usando o portfólio salvo<br>
**Dado que** Lígia está logada e possui seu portfólio completo<br>
**E** ela acessa a página do "Edital de Artes Visuais"<br>
**Quando** ela clica em "Inscrever-me"<br>
**E** o sistema pergunta "Deseja importar dados do seu perfil?" e ela clica "Sim"<br>
**Então** os campos "Nome", "Biografia" e "Anexos de Portfólio" do formulário devem ser preenchidos automaticamente.<br>

**CENÁRIO (Alternativo):** Inscrição em edital sem ter um portfólio salvo<br>
**Dado que** Lígia (uma nova artista) ainda não preencheu o seu portfólio<br>
**E** ela acede à página do "Edital de Artes Visuais"<br>
**Quando** ela clica em "Inscrever-me"<br>
**Então** o sistema não deve exibir o pop-up "Deseja importar dados?"<br>
**E** o formulário de inscrição deve ser exibido com todos os campos em branco, pronto para preenchimento manual.<br>


**CENÁRIO:** Criação de perfil de portfólio<br>
**Dado que** Lígia (Artista) está logada e acessa "Meu Perfil"<br>
**Quando** ela preenche sua "Biografia"<br>
**E** faz upload de 3 arquivos (PDF, JPG, PNG) na seção "Galeria de Trabalhos"<br>
**E** adiciona um link do YouTube na seção "Vídeos"<br>
**E** clica em "Salvar Perfil"<br>
**Então** seu perfil público deve exibir a biografia, as 3 imagens da galeria e o vídeo incorporado.<br>

**CENÁRIO (Exceção):** Tentativa de upload de tipo de arquivo não suportado<br>
**Dado que** Lígia está a editar o seu portfólio na seção "Galeria de Trabalhos"<br>
**E** o sistema só aceita JPG, PNG e PDF<br>
**Quando** ela tenta fazer o upload de um arquivo chamado "meu_trabalho.zip"<br>
**Então** o sistema deve exibir uma mensagem de erro: "Tipo de arquivo inválido. Apenas JPG, PNG e PDF são permitidos."<br>
**E** o arquivo "meu_trabalho.zip" não deve ser adicionado à galeria.<br>

**CENÁRIO:** Recebimento de notificação de aprovação<br>
**Dado que** Lígia se inscreveu no "Edital de Artes Visuais"<br>
**E** uma Gestora (Mariana) alterou o status da inscrição de Lígia para "Aprovada"<br>
**Quando** Lígia acessar a plataforma<br>
**Então** ela deve ver um ícone de notificação "!" no sino<br>
**E** ao clicar, deve ver a mensagem: "Sua inscrição no 'Edital de Artes Visuais' foi Aprovada.<br>

**CENÁRIO (Alternativo):** Artista com notificações por e-mail desativadas<br>
**Dado que** Lígia se inscreveu no "Edital de Artes Visuais"<br>
**E** nas suas configurações de perfil, ela desmarcou a opção "Receber notificações por e-mail"<br>
**E** uma Gestora (Mariana) alterou o status da inscrição de Lígia para "Reprovada"<br>
**Quando** Lígia aceder à plataforma<br>
**Então** ela deve ver a notificação "!" no sino (notificação in-app)
Mas o sistema não deve enviar nenhuma mensagem para o e-mail de Lígia.<br>


## Funcionalidade 5: Pescar ingressos

**CENÁRIO:** Primeiro acesso com seleção de preferências<br>
**Dado que** Beatriz acabou de criar sua conta e está fazendo o primeiro login<br>
**Quando** o sistema apresenta a tela de Onboarding<br>
**E** ela seleciona as categorias "Teatro" e "Música"<br>
**E** ela clica em "Concluir"<br>
**Então** ela deve ser levada para a Home<br>
**E** os eventos exibidos na Home devem ser primariamente de "Teatro" e "Música".  CENÁRIO (Alternativo): Pular a etapa de onboarding<br>
**Dado que** Beatriz está na tela de Onboarding (seleção de categorias)<br>
**Quando** ela clica no botão "Pular" ou "Fazer depois"<br>
**E** ela é levada para a Home<br>
**Então** a Home deve exibir os eventos mais populares ou próximos, sem personalização por categoria.<br>


**CENÁRIO:** Busca de eventos gratuitos para o fim de semana<br>
**Dado que** Beatriz está na tela "Agenda Cultural"<br>
**Quando** ela aplica o filtro "Preço: Gratuito"<br>
**E** ela aplica o filtro "Data: Este Fim de Semana"<br>
**Então** a lista de eventos deve ser atualizada para mostrar apenas eventos que satisfaçam ambos os critérios.<br>

**CENÁRIO (Alternativo):** Busca de eventos com filtros que não retornam resultados<br>
**Dado que** Beatriz está na tela "Agenda Cultural"<br>
**Quando** ela aplica o filtro "Categoria: Ópera"<br>
**E** ela aplica o filtro "Local: Meu Bairro"<br>
**E** não existem eventos que satisfaçam ambos os critérios<br>
**Então** a lista de eventos deve ficar vazia<br>
**E** o sistema deve exibir uma mensagem amigável: "Nenhum evento encontrado. Tente ampliar sua busca ou remover alguns filtros."<br>


**CENÁRIO:** Compra de ingresso com sucesso (PIX)<br>
**Dado que** Beatriz está logada e na página do "Concerto de Primavera"<br>
**E** o preço do ingresso é "R$ 50,00"<br>
**Quando** ela seleciona "1" ingresso e clica em "Comprar"<br>
**E** ela escolhe "PIX" como forma de pagamento<br>
**E** ela confirma o pagamento<br>
**Então** ela deve ser redirecionada para a tela "Meus Ingressos"<br>
**E** um QR Code de ingresso válido deve estar disponível para o "Concerto de Primavera".<br>

**CENÁRIO (Exceção):** Tentativa de compra com cartão de crédito recusado (Sem Saldo)<br>
**Dado que** Beatriz está na tela de checkout para o "Concerto de Primavera"<br>
**Quando** ela preenche os dados de um cartão de crédito válido, mas que está sem saldo<br>
**E** ela clica em "Pagar"<br>
**Então** o sistema (via gateway de pagamento) deve exibir a mensagem: "Pagamento não autorizado. Verifique seu saldo ou tente outro cartão."<br>
**E** o ingresso não deve ser emitido e seu carrinho deve permanecer ativo.<br>

**CENÁRIO** (Exceção): Tentativa de compra de ingresso esgotado (Disputa de Estoque)<br>
**Dado que** Beatriz está na página do evento "Show de Jazz", que tem apenas "1" ingresso restante<br>
**E** outro usuário compra esse último ingresso<br>
**Quando** Beatriz (que ainda via "1" ingresso) clica em "Comprar"<br>
**Então**  o sistema deve exibir uma mensagem: "Ingresso indisponível. O último ingresso acabou de ser vendido."<br>
**E**  ela deve ser impedida de prosseguir para <br>

**CENÁRIO:**  Acessar ingresso comprado<br>
**Dado que** Beatriz comprou um ingresso para o "Concerto de Primavera" que ocorre hoje
**E o evento começa às "21:00"<br>
**E** a hora atual do sistema é "20:00" (1 hora antes)<br>
**Quando** Beatriz verificar seu celular<br>
**Então** ela deve ter recebido uma notificação push com o texto "Lembrete: Seu evento 'Concerto de Primavera' começa em 1 hora!"<br>


**CENÁRIO:** Acessar ingresso comprado<br>
**Dado que** Beatriz comprou um ingresso para o "Concerto de Primavera"<br>
**Quando** ela acessa seu perfil e clica na aba "Meus Ingressos"<br>
**Então** ela deve ver uma seção "Próximos Eventos"<br>
**E** o ingresso do "Concerto de Primavera" deve estar listado ali.<br>


## Funcionalidade 6: Centralizar a automação de postagens

**CENÁRIO:** Agendamento de ou as contas do Instagram e Facebook<br>
**Quando** ela seleciona o evento "Show de Jazz"<br>
**E** ela escreve o texto "Últimos ingressos!" e anexa uma imagem<br>
**E** ela seleciona as redes "Instagram" e "Facebook"<br>
**E** ela define a data de publicação para "15/11/2025" às "18:00"<br>
**E** ela clica em "Agendar"<br>
**Então** o sistema deve exibir a mensagem "Postagem agendada com sucesso"<br>
**E** a postagem deve aparecer no calendário de agendamento na data e hora corretas.<br>

**CENÁRIO:** Tentativa de agendamento sem selecionar rede social<br>
**Dado que** Renata está na tela "Agendador de Mídia Social"<br>
**Quando** ela escreve o texto e anexa a imagem<br>
**E** ela não seleciona nenhuma rede social<br>
**E** ela clica em "Agendar"<br>
**Então** o sistema deve exibir uma mensagem de erro "Selecione pelo menos uma rede social para publicar."<br>
**E** a postagem não deve ser agendada.<br>