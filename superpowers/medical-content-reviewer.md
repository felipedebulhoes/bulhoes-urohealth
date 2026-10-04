# Superpower: Medical Content Reviewer

> **Especialidade:** Auditoria Ética, Validação Regulatória (CFM 2.336/2023) e Consistência Científica (EAU / AUA / SBU)  
> **Escopo:** Páginas de especialidades, artigos de blog, respostas do assistente virtual (AIChatWidget) e copys de conversão.

---

## 1. Identidade Médica Obrigatória

Sempre que um conteúdo clínico for gerado, atualizado ou assinado, deve conter explicitamente a assinatura do Dr. Felipe de Bulhões com os dados cadastrais corretos:

```markdown
Dr. Felipe de Bulhões Ojeda
Urologista e Cirurgião Geral
CRM-SP 202291 | RQE 146538 (Urologia) | RQE 114019 (Cirurgia Geral)
Membro Titular do Colégio Brasileiro de Cirurgiões (TCBC)
Membro da Sociedade Brasileira de Urologia (SBU), American Urological Association (AUA) e European Association of Urology (EAU)
```

---

## 2. Checklist Regulatório CFM (Resolução nº 2.336/2023)

O Conselho Federal de Medicina estabelece parâmetros claros para a publicidade médica. Qualquer agente deve validar os 7 pontos fundamentais antes de publicar um texto:

- [ ] **1. Não prometer resultados:** É terminantemente proibido o uso de expressões como *"cura garantida"*, *"procedimento sem falhas"*, *"resultado definitivo comprovado"*. Use termos adequados como: *"taxas elevadas de sucesso na literatura"*, *"alternativa eficaz para casos selecionados"*, *"indicado conforme avaliação clínica individualizada"*.
- [ ] **2. Não exibir antes/depois de pacientes:** Fotos reais de pré e pós-operatório não devem ser utilizadas no site ou em cards visuais. Em vez disso, use ilustrações anatômicas esquemáticas ou imagens conceituais.
- [ ] **3. Identificação clara da especialidade registrada:** Apenas anunciar Urologia e Cirurgia Geral, com seus respectivos números de RQE. Não utilizar titulações não reconhecidas pelo CFM.
- [ ] **4. Caráter informativo e educativo:** Todo conteúdo de patologias (HPB, litíase, câncer de próstata, disfunção erétil) deve visar à conscientização pública e à saúde preventiva.
- [ ] **5. Menção de riscos e limitações:** Procedimentos cirúrgicos (como HoLEP, Rezum, cirurgia robótica) devem mencionar que a indicação depende de avaliação urológica e exames complementares.
- [ ] **6. Proibição de autopromoção sensacionalista:** Evitar palavras como *"o melhor de Campinas"*, *"o cirurgião número 1"*, *"pioneiro absoluto"*. Adotar tom sóbrio: *"especialista dedicado"*, *"ampla experiência em cirurgia minimamente invasiva"*.
- [ ] **7. Disclaimer legal em páginas clínicas:** Manter o rodapé/disclaimer informativo:  
  *“As informações contidas neste site possuem caráter exclusivamente informativo e educativo, não substituindo a consulta médica individualizada.”*

---

## 3. Diretrizes Clínicas Internacionais de Referência

Ao redigir sobre procedimentos ou patologias, baseie-se estritamente nas seguintes entidades:

1. **EAU (European Association of Urology Guidelines):**
   - Diretrizes de HPB masculina (Male LUTS): HoLEP, ThuLEP, RTU bipolar, Rezum, enucleação com laser de Holmium.
   - Urolitíase: litotripsia flexível com fibra laser (Holmium/Thulium), aspiração por bainha de ureteroscopia (FANS/ClearPetra).
   - Uro-oncologia: biópsia de próstata por fusão de ressonância magnética, estadiamento e prostatectomia radical assistida por robô (RARP).
2. **AUA (American Urological Association):**
   - Diretrizes de saúde sexual masculina, reposição hormonal guiada (TRH com critérios laboratoriais rígidos), disfunção erétil e doença de Peyronie.
3. **SBU (Sociedade Brasileira de Urologia):**
   - Orientações nacionais de rastreamento de câncer de próstata (homens a partir dos 50 anos, ou 45 anos com fatores de risco como afrodescendência ou histórico familiar de primeiro grau).

---

## 4. Vocabulário Clínico de Alta Precisão

| Evitar (Linguagem Vulgar ou Imprecisa) | Preferir (Linguagem Médica Humanizada) |
|---|---|
| "Quebrar pedras nos rins" | "Fragmentação e aspiração de cálculos renais por laser" |
| "Remédio para aumentar libido" | "Avaliação hormonal e terapêutica individualizada para saúde sexual" |
| "Cura do aumento da próstata" | "Tratamento minimamente invasivo da Hiperplasia Prostática Benigna (HPB)" |
| "Cirurgia sem cortes" | "Cirurgia endoscópica / minimamente invasiva por orifícios naturais" |
| "Robô que opera sozinho" | "Cirurgia robótica com comando milimétrico pelo cirurgião urologista" |

---

## 5. Protocolo de Revisão Automática

Ao revisar um arquivo `.tsx` ou `.md` de conteúdo:
1. Buscar termos proibidos por regex: `/(garantia de cura|o melhor de|antes e depois|100% garantido)/i`.
2. Verificar se o componente contém a menção de CRM e RQE quando assinado.
3. Executar `npm run check` para garantir que as alterações não quebraram nenhuma tag de renderização.
