# User Story Mapping

## HealthConnect

A “HealthConnect” é uma empresa fictícia que busca transformar a experiência digital de saúde
em uma rede ampla de clínicas e hospitais. Este estudo de caso foi elaborado para proporcionar
aos estudantes uma compreensão profunda dos desafios e oportunidades de um ecossistema de
saúde distribuído, com foco na construção de um User Story Mapping (USM) robusto e orientado
ao valor entregue a pacientes, profissionais e gestores.




<img src="../../imgs/usmframe1.webp" alt="image" class="centered-img"> 

<img src="../../imgs/usmfram2.webp" alt="image" class="centered-img"> 



## Critérios de validação 

# USM - Requisitos Funcionais

| Release | Item | História de Usuário | Critérios de Validação |
|----------|------|--------------------|------------------------|
| **Release 1 (MVP)** | **RF01 - Buscar paciente em base única (CPF/Nome)** | Como Recepcionista, eu quero buscar um paciente na base única usando CPF ou nome, para que possa identificá-lo rapidamente e iniciar o atendimento ou agendamento. | - O sistema deve permitir a busca por CPF (números exatos).<br>- O sistema deve permitir a busca por nome (parcial ou completo).<br>- Se nenhum paciente for encontrado, o sistema deve exibir "Paciente não encontrado" e oferecer "Cadastrar novo paciente".<br>- Se múltiplos pacientes forem encontrados, deve exibir lista com nome, CPF e data de nascimento. |
| | **RF02 - Cadastrar novo paciente (dados essenciais)** | Como Recepcionista, eu quero cadastrar um novo paciente informando nome, CPF, data de nascimento e telefone, para que ele possa ser atendido e ter seu prontuário iniciado. | - Campos obrigatórios: Nome Completo, CPF, Data de Nascimento, Telefone.<br>- O sistema deve validar o formato do CPF e verificar duplicidade.<br>- Se o CPF já existir, deve direcionar ao perfil existente. |
| | **RF03 - Registrar consentimento LGPD no ato do cadastro** | Como Recepcionista, eu quero registrar o consentimento LGPD do paciente durante o cadastro, para que a clínica esteja em conformidade legal. | - Checkbox para “Paciente deu consentimento (LGPD)”.<br>- Registrar data, hora e usuário que marcou.<br>- Status do consentimento visível no perfil do paciente. |
| | **RF04 - Acessar e editar seus dados cadastrais básicos** | Como Paciente, eu quero acessar e editar meus dados cadastrais básicos (telefone, endereço) via portal/app, para manter informações atualizadas. | - Paciente deve estar logado.<br>- Área "Meu Perfil" permite editar Telefone, E-mail e Endereço.<br>- Nome e CPF não editáveis.<br>- Atualização confirmada e refletida no sistema interno. |
| | **RF05 - Visualizar horários disponíveis** | Como Paciente, eu quero visualizar horários disponíveis dos médicos, para escolher o melhor momento da consulta. | - Filtro por especialidade ou médico.<br>- Exibir calendário com dias e horários.<br>- Mostrar apenas horários livres. |
| | **RF06 - Agendar consulta online** | Como Paciente, eu quero agendar uma consulta online, para marcar meu atendimento com autonomia. | - Após visualizar horários, o paciente escolhe um horário.<br>- Sistema solicita confirmação.<br>- Ao confirmar, o horário é bloqueado e mostra "Agendamento confirmado". |
| | **RF07 - Visualizar agenda unificada (médicos da unidade)** | Como Recepcionista/Coordenador, eu quero visualizar uma agenda unificada, para gerenciar agendamentos e a operação. | - Exibir visualização diária/semanal com colunas de médicos.<br>- Status claros (livre, agendado, confirmado, check-in) com cores diferentes. |
| | **RF08 - Realizar agendamento/encaixe (balcão)** | Como Recepcionista, eu quero agendar ou encaixar pacientes presencialmente, para atender no balcão. | - Selecionar médico e dia.<br>- Escolher horário vago ou forçar encaixe (com confirmação).<br>- Agendamento vinculado ao cadastro do paciente. |
| | **RF09 - Receber confirmação/lembrete automático (push/e-mail)** | Como Paciente, eu quero receber confirmação e lembrete de consulta, para não esquecer o compromisso. | - Enviar e-mail/push de confirmação ao agendar.<br>- Lembrete automático 24h antes.<br>- Conteúdo: médico, data, hora e local. |
| | **RF10 - Realizar check-in do paciente (confirmação)** | Como Recepcionista, eu quero realizar o check-in do paciente, para registrar presença e notificar o médico. | - Localizar agendamento do dia.<br>- Botão “Realizar Check-in”.<br>- Status muda para “Em espera” e médico é notificado. |
| | **RF11 - Acessar prontuário único (histórico de consultas)** | Como Médico Clínico, eu quero acessar o prontuário único do paciente, para visualizar histórico de consultas. | - Ao abrir o atendimento, o prontuário deve carregar o histórico.<br>- Exibir linha do tempo ou lista de evoluções passadas. |
| | **RF12 - Registrar alergias** | Como Médico Clínico, eu quero registrar alergias do paciente, para evitar riscos na prescrição. | - Seção “Alergias” no prontuário.<br>- Permitir múltiplas alergias.<br>- Banner vermelho em caso de alergias.<br>- Opção “Nega alergias”. |
| | **RF13 - Registrar evolução da consulta (texto simples)** | Como Médico Clínico, eu quero registrar a evolução da consulta, para documentar o atendimento. | - Campo de texto livre “Evolução”.<br>- Ao finalizar, salvar com data, hora e login do médico. |
| | **RF14 - Gestão básica de usuários, senhas e perfis (Login)** | Como Diretor de Tecnologia, eu quero gestão de usuários e perfis, para controlar o acesso. | - Tela de login (usuário e senha).<br>- Criar/inativar usuários.<br>- Associar perfis (Recepcionista, Médico, Admin).<br>- Função “Esqueci minha senha”. |
| | **RF15 - Log de auditoria (LGPD - quem acessou)** | Como Diretor de Tecnologia, eu quero logs de acesso, para monitorar acessos a dados sensíveis. | - Registrar acessos de leitura a prontuários.<br>- Log: Usuário, Paciente, Data/Hora, Ação.<br>- Relatórios de auditoria exportáveis. |
| **Release 2 (R2)** | **RF16 - Cancelar / Remarcar consulta** | Como Paciente, eu quero cancelar ou remarcar consultas futuras, para ter autonomia. | - Visualizar consultas futuras em “Meus Agendamentos”.<br>- Botões “Cancelar” e “Remarcar”.<br>- Cancelamento permitido até X horas antes.<br>- Remarcação redireciona a novos horários.<br>- Agenda do médico atualizada. |
| | **RF17 - Configurar regras de agenda (bloqueios, horários)** | Como Coordenador, eu quero configurar regras de agenda, para refletir disponibilidade real. | - Selecionar médico.<br>- Definir horários recorrentes e bloqueios.<br>- Bloqueios não aparecem para pacientes. |
| | **RF18 - Visualizar histórico de prescrições e exames** | Como Médico Clínico, eu quero visualizar histórico de prescrições e exames, para entender tratamentos anteriores. | - Abas “Prescrições” e “Exames” no prontuário.<br>- Lista cronológica (mais recente primeiro).<br>- Clicar para ver detalhes. |
| | **RF19 - Alertas visuais de alergias** | Como Médico Clínico, eu quero ver alertas de alergias durante a prescrição, para evitar reações adversas. | - Banner com alergias na tela de prescrição. |
| | **RF20 - Gerar prescrição eletrônica (base de medicamentos)** | Como Médico Clínico, eu quero gerar prescrição eletrônica, para padronizar e garantir legibilidade. | - Buscar medicamentos por nome.<br>- Adicionar dose, frequência e duração.<br>- Gerar PDF assinado digitalmente. |
| | **RF21 - Receber prescrição eletrônica (fila de atendimento)** | Como Farmacêutica, eu quero visualizar prescrições eletrônicas pendentes, para organizar dispensação. | - Fila de prescrições pendentes com paciente, médico e horário.<br>- Visualizar detalhes. |
| | **RF22 - Registrar dispensação (baixa simples)** | Como Farmacêutica, eu quero registrar dispensação de medicamentos, para atualizar prontuário. | - Botão “Dispensar”.<br>- Marcar itens dispensados.<br>- Status muda para “Dispensada”. |
| | **RF23 - Visualizar prescrição ativa** | Como Paciente, eu quero visualizar minhas prescrições, para consultar posologia. | - Seção “Minhas Prescrições”.<br>- Prescrição mais recente disponível (PDF ou visualização). |
| | **RF24 - Solicitar exames (formulário digital)** | Como Médico Clínico, eu quero solicitar exames via formulário digital, para registrar pedidos estruturados. | - Buscar exames por nome/código.<br>- Adicionar múltiplos exames e indicações.<br>- Registro no histórico do paciente. |
| | **RF25 - Acesso a resultados de exame** | Como Paciente, eu quero acessar resultados de exames, para acompanhar minha saúde. | - Seção “Meus Exames”.<br>- Exibir e permitir download dos resultados. |
| | **RF26 - Visualizar resultados anexados ao prontuário** | Como Médico Clínico, eu quero visualizar resultados dentro do prontuário, para análise clínica. | - Anexar e abrir arquivos de resultados no prontuário. |
| | **RF27 - Dashboard operacional básico** | Como Gestora de Operações, eu quero visualizar indicadores operacionais, para monitorar eficiência. | - Exibir total de agendamentos, taxa de No-Show e atendimentos concluídos.<br>- Filtragem por período (hoje, semana, mês). |
| **Release 3 (R3)** | **RF28 - Checklist de documentos e paridade de unidades** | Como Recepcionista, eu quero checklist de documentos no cadastro, para garantir documentação completa. | - Seção “Documentos/Paridade” no perfil.<br>- Marcar itens como “Coletado” ou “Pendente”.<br>- Alertas visuais para pendências. |
| | **RF29 - Gestão de fila de espera e reacomodação dinâmica** | Como Coordenador, eu quero gerenciar fila de espera e reacomodação, para otimizar a agenda. | - Adicionar paciente à fila de espera.<br>- Ao cancelar horário, sugerir primeiro da fila. |
| | **RF30 - Dashboard de indicadores de agendamento** | Como Coordenador, eu quero indicadores de ocupação e não comparecimento, para análise de performance. | - Mostrar taxa de ocupação e de faltas por médico.<br>- Filtragem por período e médico. |
| | **RF31 - Usar modelos (templates) de evolução/anamnese** | Como Médico Clínico, eu quero criar e usar modelos de evolução, para agilizar consultas. | - Criar/salvar modelos de texto.<br>- Selecionar modelo ao iniciar nova evolução.<br>- Texto carregado e editável. |
| | **RF32 - Suporte a CID / SNOMED (classificação)** | Como Médico Clínico, eu quero usar códigos CID-10/11, para estruturar diagnósticos. | - Campo “Diagnóstico (CID)” com autocomplete.<br>- Salvar código e descrição. |
| | **RF33 - Checagem de interações medicamentosas** | Como Médico/Farmacêutica, eu quero alertas de interações medicamentosas, para evitar reações adversas. | - Sistema alerta se medicamento interagir com outro em uso. |
| | **RF34 - Histórico de dispensações** | Como Farmacêutica, eu quero visualizar histórico de dispensações, para controle de tratamento. | - Lista cronológica de medicamentos dispensados, com data e responsável. |
| | **RF35 - Integração com estoque (lotes/validade)** | Como Farmacêutica, eu quero integração com estoque, para controle de lotes e validade. | - Solicitar lote/validade ao dispensar.<br>- Baixa automática no estoque.<br>- Alerta para lote vencido. |
| | **RF36 - Integração com laboratórios (API/HL7/FHIR)** | Como Diretor de Tecnologia, eu quero integração com laboratórios, para receber resultados estruturados. | - Receber mensagens HL7 ORU.<br>- Armazenar resultados numéricos estruturados.<br>- Eliminar uploads manuais de PDF. |
| | **RF37 - Comparativo histórico de resultados de exames** | Como Médico Clínico, eu quero comparar resultados de exames, para avaliar evolução do paciente. | - Exibir resultados anteriores em lista ou gráfico. |
| | **RF38 - Relatórios regulatórios e de conformidade (LGPD)** | Como Diretor de Tecnologia, eu quero gerar relatórios LGPD, para auditorias e solicitações. | - Extrato de acessos a um paciente.<br>- Relatório de consentimentos. |
| | **RF39 - Dashboards de qualidade e segurança do paciente** | Como Gestora de Operações, eu quero dashboards de qualidade, para monitorar aderência a protocolos. | - Exibir tempo médio de espera e % de pacientes com alergias registradas.<br>- Dados agregados/anônimos. |
| | **RF40 - Integração com Operadoras (faturamento)** | Como Diretor de Tecnologia, eu quero integração com operadoras de saúde, para automatizar faturamento. | - Gerar lote XML TISS com CID e procedimentos.<br>- Enviar para operadora. |
| | **RF41 - Monitoramento proativo de performance e segurança** | Como Diretor de Tecnologia, eu quero monitoramento proativo, para garantir estabilidade e segurança. | - Alertas de tempo de resposta lento (>3s).<br>- Alertas de falhas de login repetidas.<br>- Monitorar CPU e memória. |




# Critérios de Aceitação Principais

###  Persona: Paciente

#### Agendar horário (leva guia física posteriormente)
* **AC01:** O sistema deve permitir o agendamento de uma consulta selecionando: Especialidade, Médico, Data e Hora.
* **AC02:** Deve haver um checkbox: "Vou apresentar a guia física no momento do atendimento".
* **AC03:** Ao selecionar essa opção, o sistema não deve exigir upload de arquivo para confirmar o agendamento.
* **AC04:** O status do agendamento deve ser salvo como "Confirmado - Pendente de Guia".

#### Baixar PDF de resultados
* **AC01:** O paciente deve visualizar uma lista de exames com status "Concluído".
* **AC02:** Ao clicar em "Baixar", o sistema deve gerar um arquivo `.pdf` contendo o laudo assinado digitalmente.
* **AC03:** O PDF deve conter cabeçalho com logo da clínica, dados do paciente e rodapé com registro do médico responsável.
* **AC04:** O sistema deve bloquear o download de exame com status "Em análise" ou "Pendente".

---

### Persona: Recepcionista

#### Buscar CPF por informações e consultas passadas
* **AC01:** O campo de busca deve aceitar apenas input numérico (11 dígitos), com máscara automática de CPF.
* **AC02:** Ao inserir um CPF válido, o sistema deve retornar: Nome Completo, Data de Nascimento e Convênio.
* **AC03:** Deve exibir uma aba ou seção "Últimas Consultas" contendo data e especialidade.
* **AC04:** Caso o CPF não exista na base, deve exibir a mensagem "Paciente não encontrado" e oferecer atalho para "Novo Cadastro".

#### Marcar "Aceite Físico" no sistema
* **AC01:** Na tela de admissão (check-in), deve haver um checkbox: "Termos assinados fisicamente".
* **AC02:** O sistema deve registrar internamente o `user_id` da recepcionista que marcou a opção e o *timestamp*.
* **AC03:** O sistema só deve permitir avançar o status do paciente para "Em Espera" se este campo estiver marcado (ou se houver assinatura digital prévia).

---

### Persona: Coordenador de Agendamento

#### Criar grade manual
* **AC01:** O usuário deve selecionar: Médico, Unidade, Data de Início/Fim e Dias da Semana.
* **AC02:** Deve permitir definir o tempo de duração de cada slot (ex: 15min, 30min).
* **AC03:** O sistema deve impedir a criação de grades sobrepostas para o mesmo médico no mesmo horário (conflito de agenda).
* **AC04:** Ao salvar, os slots devem ficar imediatamente visíveis para busca na recepção.

#### Inserir encaixes manuais (dinâmicos)
* **AC01:** O sistema deve permitir agendar um paciente em um horário onde não existe slot configurado ou onde o slot já está ocupado.
* **AC02:** Deve exibir um alerta visual "Atenção: Sobrelotação de agenda" antes de confirmar.
* **AC03:** O agendamento de encaixe deve ter uma identificação visual diferenciada (ex: cor ou ícone) na visualização da agenda do dia.

---

### Persona: Médico Clínico

#### Ler dados dos pacientes e alertas de alergias
* **AC01:** Ao abrir o prontuário, o "Header" do paciente deve ser fixo e visível em todas as abas.
* **AC02:** Se o paciente tiver alergias cadastradas, deve haver uma tag vermelha/destacada: "ALÉRGICO A: [Substância]".
* **AC03:** Deve exibir os últimos 3 sinais vitais registrados (se houver) na tela inicial do atendimento.

#### Prescrever em campo estruturado
* **AC01:** A prescrição deve ser composta por campos obrigatórios separados: Medicamento, Dosagem, Via de Administração, Frequência e Duração.
* **AC02:** O campo de "Observações" deve ser livre (texto), mas limitado a 500 caracteres.
* **AC03:** O sistema deve impedir o salvamento da prescrição se algum campo estruturado obrigatório estiver vazio.

#### Selecionar em lista padrão
* **AC01:** O campo "Medicamento" deve ser um *type-ahead* (autocompletar) conectado à base de medicamentos ativos da clínica.
* **AC02:** Ao selecionar o medicamento, o sistema deve sugerir automaticamente a unidade padrão (ex: mg, ml, cp) se configurada.
* **AC03:** Não deve ser permitido digitar um nome de medicamento que não exista na base (para garantir integridade de dados para analytics e estoque).

---

### Persona: Farmacêutica

#### Ler alerta visual de alergia
* **AC01:** Na tela de dispensação, se o medicamento prescrito pertencer a uma classe que o paciente é alérgico, o sistema deve exibir um Modal de bloqueio ou aviso crítico.
* **AC02:** O alerta deve exigir uma justificativa ou confirmação de "Ciente do Risco" para prosseguir (caso seja um aviso de nível médio).
* **AC03:** O alerta deve ser exibido antes da confirmação da baixa do estoque.

#### Receber prescrição padronizada
* **AC01:** A tela de farmácia deve listar as prescrições com status "Pendente de Dispensação".
* **AC02:** A visualização deve ser somente leitura (*read-only*), impedindo alteração da dose prescrita pelo médico.
* **AC03:** Deve agrupar os itens por paciente e exibir a data/hora da prescrição.

#### Localizar itens
* **AC01:** Ao lado de cada item da prescrição, o sistema deve exibir o código de localização (ex: Prateleira A, Gaveta 2).
* **AC02:** Se o saldo do item for zero, deve exibir indicador visual "Sem Estoque" em vermelho.

---

### Persona: Gestora de Operações

#### Ver total atendimentos/dia
* **AC01:** O dashboard deve exibir um card com o número inteiro de atendimentos com status "Finalizado" na data corrente.
* **AC02:** O dado deve ser atualizado em tempo real (ou com delay máximo de 5 minutos).
* **AC03:** Deve permitir clicar no card para ver a lista detalhada dos pacientes atendidos.

#### Ver taxa de ocupação médica
* **AC01:** O cálculo deve ser: $$(Total Slots Agendados / Total Slots Disponíveis) * 100$$.
... (16 linhas)

<iframe width="768" height="432" src="https://miro.com/app/live-embed/uXjVJu-SXzQ=/?embedMode=view_only_without_ui&moveToViewport=-1199,-1167,3440,2110&embedId=505444342395" frameborder="0" scrolling="no" allow="fullscreen; clipboard-read; clipboard-write" allowfullscreen></iframe>