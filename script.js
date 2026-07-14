const listaPosts = document.getElementById("listaPosts");
const template = document.getElementById("templatePost");

let posts = JSON.parse(localStorage.getItem("posts")) || [];

function salvarPosts(){
    localStorage.setItem("posts", JSON.stringify(posts));
}

function estrelas(nota){
    return "⭐".repeat(Number(nota));
}

function renderizar(){

    listaPosts.innerHTML="";

    posts.forEach((post,index)=>{

        const clone = template.content.cloneNode(true);

        clone.querySelector(".foto").src = post.imagem || "https://via.placeholder.com/600x400?text=Produto";
        clone.querySelector(".titulo").textContent = post.titulo;
        clone.querySelector(".nota").textContent = estrelas(post.nota);
        clone.querySelector(".preco").textContent = "💰 Preço: " + post.preco;
        clone.querySelector(".entrega").textContent = "📦 Entrega: " + post.entrega;

        clone.querySelector(".pros").textContent = post.pros;
        clone.querySelector(".contras").textContent = post.contras;
        clone.querySelector(".descricao").textContent = post.descricao;

        clone.querySelector(".comprar").href = post.link;

        clone.querySelector(".excluir").onclick = ()=>{

            if(confirm("Excluir esta avaliação?")){

                posts.splice(index,1);

                salvarPosts();

                renderizar();

            }

        };

        listaPosts.appendChild(clone);

    });

}

document.getElementById("publicar").onclick = ()=>{

    const titulo = document.getElementById("titulo").value.trim();

    if(titulo===""){

        alert("Digite um título.");

        return;

    }

    posts.unshift({

        titulo: titulo,

        imagem: document.getElementById("imagem").value,

        link: document.getElementById("link").value,

        preco: document.getElementById("preco").value,

        entrega: document.getElementById("entrega").value,

        nota: document.getElementById("nota").value,

        pros: document.getElementById("pros").value,

        contras: document.getElementById("contras").value,

        descricao: document.getElementById("descricao").value

    });

    salvarPosts();

    renderizar();

    document.querySelectorAll("input, textarea").forEach(campo=>{

        campo.value="";

    });

    document.getElementById("nota").value="5";

};

document.getElementById("limpar").onclick=()=>{

    document.querySelectorAll("input, textarea").forEach(campo=>{

        campo.value="";

    });

    document.getElementById("nota").value="5";

};

renderizar();
