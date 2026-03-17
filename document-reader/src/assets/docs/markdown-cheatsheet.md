# Markdown Cheatsheet

Referência rápida de sintaxe Markdown.

---

## Títulos

```
# H1
## H2
### H3
#### H4
##### H5
###### H6
```

---

## Ênfase

```
*itálico* ou _itálico_
**negrito** ou __negrito__
***negrito e itálico***
~~tachado~~
```

**Resultado:**
- *itálico*
- **negrito**
- ***negrito e itálico***
- ~~tachado~~

---

## Listas

### Não Ordenada
```
- Item 1
- Item 2
  - Sub-item
- Item 3
```

### Ordenada
```
1. Primeiro
2. Segundo
3. Terceiro
```

### Checklist
- [x] Tarefa concluída
- [ ] Tarefa pendente
- [ ] Outra tarefa

---

## Links

```markdown
[Link simples](https://angular.io)
[Link com título](https://angular.io "Angular")
```

[Documentação Angular](https://angular.io)

---

## Imagens

```markdown
![Alt text](url-da-imagem)
```

---

## Código

### Inline
Use `` `código inline` `` para destacar código.

### Bloco de código
```javascript
function saudacao(nome) {
  return `Olá, ${nome}!`;
}

console.log(saudacao('Mundo'));
```

```python
def saudacao(nome):
    return f"Olá, {nome}!"

print(saudacao("Mundo"))
```

```html
<div class="container">
  <h1>Título</h1>
  <p>Parágrafo</p>
</div>
```

---

## Tabelas

```markdown
| Sintaxe   | Descrição |
| --------- | --------- |
| Header    | Title     |
| Paragraph | Text      |
```

| Linguagem  | Uso Principal      | Popularidade |
|------------|--------------------|--------------|
| TypeScript | Web Frontend       | ⭐⭐⭐⭐⭐       |
| Python     | Data Science / IA  | ⭐⭐⭐⭐⭐       |
| Java       | Backend Enterprise | ⭐⭐⭐⭐        |
| Rust       | Sistemas           | ⭐⭐⭐         |

---

## Citações

```markdown
> Esta é uma citação.
> 
> Pode ter múltiplos parágrafos.
```

> "A documentação é tão importante quanto o código."
> 
> — Todo desenvolvedor experiente

---

## Linha Horizontal

```markdown
---
***
___
```

---

## HTML Inline

Markdown suporta HTML inline quando necessário:

```html
<details>
  <summary>Clique para expandir</summary>
  Conteúdo oculto aqui!
</details>
```

---

## Referência Rápida

| Elemento      | Sintaxe                      |
|---------------|------------------------------|
| Título        | `# H1` `## H2` `### H3`     |
| Negrito       | `**texto**`                  |
| Itálico       | `*texto*`                    |
| Código inline | `` `código` ``               |
| Link          | `[texto](url)`               |
| Imagem        | `![alt](url)`                |
| Citação       | `> texto`                    |
| Lista         | `- item` ou `1. item`        |
