# **Gerenciar Campanhas**

## **1. Introdução**

### **1.1. Breve Descrição**
Este caso de uso permite às organizações parceiras (ONGs, hospitais, governo) cadastrar e manter iniciativas de saúde. A funcionalidade possibilita definir os detalhes da ação (como vacinação, mutirões de atendimento ou palestras educativas) e segmentar o público-alvo (por idade, localização ou condição de saúde) para garantir uma divulgação direcionada aos pacientes da Vila Esperança.

### **1.2. Atores** 
* Organização Parceira (Ator Principal)

## **2. Fluxo de eventos** 
Este caso de uso é iniciado quando a Organização Parceira acessa a área de gestão de iniciativas e seleciona a opção “Gerenciar Campanhas”.

### **2.1. Fluxo Principal**
#### **2.1.1.** O sistema apresenta a lista de campanhas já cadastradas pela organização e as seguintes opções: 
* Nova Campanha; 
* Editar Campanha **\[FA01\]**
#### **2.1.2.** A Organização seleciona a opção “Nova Campanha”. 
#### **2.1.3.** O sistema solicita os dados da campanha (título, tipo de ação, descrição, data, horário e localização) e os critérios de segmentação do público-alvo. 
#### **2.1.4.** A Organização insere as informações da campanha e define os filtros de público-alvo (faixa etária, localização geográfica, condições de saúde) **\[RN01\]**. 
#### **2.1.5.** O sistema valida os dados inseridos e verifica a disponibilidade do local ou conflitos de agendamento **\[RN02\]\[FE01\]**. 
#### **2.1.6.** O sistema apresenta uma estimativa do alcance da campanha baseada na segmentação escolhida. 
#### **2.1.7.** A Organização confirma o cadastro da campanha. 
#### **2.1.8.** O sistema registra a campanha, agenda a divulgação automática para os usuários qualificados e gera o identificador único da ação **\[RN03\]**. 
#### **2.1.9.** O sistema exibe mensagem de sucesso confirmando o cadastro. 
#### **2.1.10.** O caso de uso é encerrado.

### **2.2. Fluxos alternativos**
#### **2.2.1. \[FA01\]** Editar Campanha Existente 
* **Origem:** Passo 2.1.1 do Fluxo Principal (A Organização opta por alterar uma campanha).
##### **2.2.1.1.** A Organização seleciona uma campanha ativa na lista. 
##### **2.2.1.2.** O sistema apresenta os dados atuais da campanha editáveis. 
##### **2.2.1.3.** A Organização realiza as alterações necessárias e confirma **\[FE01\]**. 
##### **2.2.1.4.** O sistema atualiza o registro da campanha e notifica os participantes já inscritos sobre as alterações relevantes **\[RN03\]**.
##### **2.2.1.5.** **Retorna ao passo 2.1.9.**

### **2.3. Fluxos de Exceção** 
#### **2.3.1. \[FE01\]** Dados Inválidos ou Incompletos 
* **Origem:** Passo 2.1.5 ou 2.2.1.3. 
* **Condição:** O sistema identifica que campos obrigatórios não foram preenchidos ou que a data/horário é inválido (ex: data no passado).
##### **2.3.1.1.** O sistema exibe uma mensagem de erro indicando os campos problemáticos e solicita correção. 
##### **2.3.1.2.** **O sistema retorna ao passo de preenchimento (2.1.4 ou 2.2.1.2).**

## **3. Requisitos Especiais**
### **3.1.** A interface de cadastro deve permitir a seleção de localização através de mapa interativo para precisão geográfica na comunidade. 

## **4. Regras de Negócio**
### **4.1. \[RN01\]** Segmentação de Público 
O sistema deve permitir filtrar os destinatários da campanha combinando critérios como: localização geográfica (raio de distância), faixa etária e condições de saúde preexistentes registradas no perfil do paciente. 

### **4.2. \[RN02\]** Validação de Prazos 
O sistema não deve permitir o cadastro de campanhas com data de início anterior à data atual. 

### **4.3. \[RN03\]** Divulgação Automática e Notificações 
Ao cadastrar ou alterar uma campanha, o sistema deve automaticamente gerar o gatilho para notificações push ou alertas para os usuários que se encaixam no perfil segmentado **\[RN01\]**.

## **5. Precondições** 
### **5.1.** A Organização Parceira deve estar autenticada e com cadastro ativo no sistema ConnectCare.

## **6. Pós-condições** 
### **6.1.** A campanha é gravada no banco de dados e tornada visível para o público-alvo selecionado.
### **6.2.** Um registro de auditoria da criação ou alteração é salvo no sistema.

## **7. Pontos de Extensão** 
### **7.1.** -