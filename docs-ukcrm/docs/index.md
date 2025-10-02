# Apresentação 
<a href="https://ukmarketingdigital.com.br">
  <img src="../imgs/uk.webp" alt="image" class="centered-img"> 
</a>

**UK CRM** é uma aplicação web desenvolvida por alunos da **FCTE - UnB** cursando a disciplina **Requisitos de Software - Turma 02** no semestre **2025.2**.

A UK Marketing Digital, agência com mais de 9 anos de atuação nacional fundada em Brasília, atende empresas locais e do setor de saúde no modelo B2B. Então, o software feito para ela tem objetivo de aprimorar a gestão de vendas, fortalecer o relacionamento e fidelização de clientes e impulsionar resultados por meio de um sistema próprio de CRM que organiza informações, otimiza processos e avalia a eficácia do marketing aplicado.

Na barra lateral, você encontra a documentação e outras informações relevantes para o desenvolvimento da aplicação, isso inclui: visão geral do produto, requisitos, atas de reuniões e etc.

# Membros

<div class="team-container">
  {% for member in extra.team %}
    <a class="team-card" href="https://github.com/{{ member.username }}" target="_blank" rel="noopener">
      <img src="https://avatars.githubusercontent.com/{{ member.username }}?s=120" alt="{{ member.name }}">
      <p>{{ member.name }}</p>
    </a>
  {% endfor %}
</div>
