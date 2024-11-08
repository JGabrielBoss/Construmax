//Carrinho de compra
let cart = []; // Array para armazenar os itens do carrinho
let total = 0; // Variável para armazenar o total

// Função para formatar o preço
function formatPrice(value) {
  return `R$ ${value
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    .replace(".", ",")}`;
}

// Função para adicionar itens ao carrinho
function addToCart(name, price) {
  cart.push({ name, price }); // Adiciona o item ao carrinho
  total += price; // Atualiza o total
  updateCart(); // Atualiza a exibição do carrinho
}

// Função para remover itens do carrinho
function removeFromCart(index) {
  total -= cart[index].price; // Atualiza o total
  cart.splice(index, 1); // Remove o item do carrinho
  updateCart(); // Atualiza a exibição do carrinho
}

// Função para atualizar a exibição do carrinho
function updateCart() {
  const cartItemsDiv = document.getElementById("cart_items");
  cartItemsDiv.innerHTML = ""; // Limpa os itens do carrinho

  // Adiciona cada item do carrinho à exibição
  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    // Formata o preço usando a função formatPrice
    itemDiv.textContent = `${item.name} - ${formatPrice(item.price)}`; // Formata o preço

    // Cria o botão de remoção
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remover";
    removeButton.className = "remove-button";
    removeButton.onclick = () => removeFromCart(index); // Ação ao clicar no botão

    itemDiv.appendChild(removeButton); // Adiciona o botão ao item
    cartItemsDiv.appendChild(itemDiv); // Adiciona o item à exibição do carrinho
  });

  // Atualiza o total do carrinho usando a função formatPrice
  document.getElementById("total_price").textContent = `Total: ${formatPrice(
    total
  )}`;
}

//Carregar o header dinamicamente
document.addEventListener("DOMContentLoaded", function () {
  const headerPlaceholder = document.getElementById("header_placeholder");
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      headerPlaceholder.innerHTML = data;

      // Navbar dinamica
      const header = document.querySelector("header");
      let lastScrollTop = 0;

      window.addEventListener("scroll", function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
          header.style.top = "-70px";
        } else {
          header.style.top = "0";
        }

        lastScrollTop = scrollTop;
      });

      // Configura o menu mobile somente após o header ser carregado
      const mobileBtn = document.getElementById("mobile_btn");
      const mobileMenu = document.getElementById("mobile_menu");

      if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener("click", function () {
          mobileMenu.classList.toggle("active");

          // Congela a tela se o menu estiver visível
          if (mobileMenu.classList.contains("active")) {
            document.body.classList.add("freeze"); // Adiciona a classe ao body
          } else {
            document.body.classList.remove("freeze"); // Remove a classe do body
          }
        });
      }
      // Carregar o cart após o header estar carregado
      loadCart();
    })
    .catch((error) => console.error("Erro ao carregar o header:", error));
});

// Função para carregar o carrinho de compras
function loadCart() {
  const cartPlaceholder = document.getElementById("cart_placeholder");
  fetch("cart.html")
    .then((response) => response.text())
    .then((data) => {
      cartPlaceholder.innerHTML = data;

      const cartButton = document.getElementById("cart_button");
      const shoppingCart = document.getElementById("shopping_cart");
      const closeCart = document.getElementById("close_cart");
      const buyButton = document.getElementById("checkout_button");

      if (cartButton && shoppingCart) {
        cartButton.onclick = (event) => {
          event.stopPropagation(); // Impede o clique de se propagar
          shoppingCart.classList.toggle("show");
        };

        if(buyButton){
          buyButton.addEventListener("click", () => {
            if(cart.length === 0){
              alert("Carrinho vazio! Adicione itens ao carrinho antes de comprar.");
            } else {
              alert("Compra realizada com sucesso! Obrigado pela sua compra.");
            }
          });
        } else {
          console.error("Botão de compra não encontrado.");
        }

        // Impede o fechamento ao clicar dentro do carrinho
        shoppingCart.addEventListener("click", (event) => {
          event.stopPropagation();
        });

        // Fecha o carrinho ao clicar fora
        document.addEventListener("click", function (event) {
          if (
            shoppingCart.classList.contains("show") &&
            !shoppingCart.contains(event.target)
          ) {
            shoppingCart.classList.remove("show");
          }
        });
        // Adicione o evento de clique no X após carregar o cart
        if (closeCart) {
          closeCart.addEventListener("click", () => {
            shoppingCart.classList.remove("show");
            console.log("Carrinho fechado pelo X");
          });
        } else {
          console.error("Elemento closeCart não encontrado.");
        }
      } else {
        console.error("Elemento cartButton ou shoppingCart não encontrado.");
      }

      loadFooter();
    })
    .catch((error) => console.error("Erro ao carregar o cart:", error));
}

// Função para carregar o footer dinamicamente
function loadFooter() {
  const footerPlaceholder = document.getElementById("footer_placeholder");
  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => {
      footerPlaceholder.innerHTML = data;
    })
    .catch((error) => console.error("Erro ao carregar o footer:", error));
}

// Função para abrir a modal
function openModal(serviceName) {
  const modal = document.getElementById("serviceModal");
  const modalTitle = document.getElementById("modalTitle");
  const serviceForm = document.getElementById("serviceForm");

  // Define o título da modal com base no serviço
  modalTitle.textContent = `Formulário - ${serviceName}`;

  //congela a modal
  document.body.classList.add("freeze");

  // Abre a modal
  modal.style.display = "block";

  // Fecha a modal ao clicar no "X"
  document.getElementById("closeModal").onclick = function () {
      modal.style.display = "none";
      document.body.classList.remove("freeze");
  };

  // Fecha a modal ao clicar fora dela
  window.onclick = function (event) {
      if (event.target === modal) {
          modal.style.display = "none";
          document.body.classList.remove("freeze");
      }
  };

  // Limpa o formulário ao fechar a modal
  serviceForm.reset();
}

// Adiciona o evento de clique aos botões de contato
document.addEventListener("DOMContentLoaded", () => {

  const serviceForm = document.getElementById("serviceForm");

  serviceForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Formulário enviado com sucesso!");
    
    // Fecha a modal e limpa o formulário
    document.getElementById("serviceModal").style.display = "none";
    document.body.classList.remove("freeze");
    serviceForm.reset();
  });

  const serviceButtons = document.querySelectorAll("#service");

  serviceButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
          event.preventDefault();

          // Define o nome do serviço com base no texto do botão
          const serviceName = button.textContent.replace("CONTATO ", "");
          openModal(serviceName);
      });
  });
});

