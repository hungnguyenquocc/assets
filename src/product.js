window.addEventListener("load", function(e) {
    /*============FIXED HEADER==============*/
    const headerFixed = document.querySelector(".header");
    window.addEventListener("scroll", function(e) {
        if (this.scrollY >= 100) {
            headerFixed.classList.add("is-fixed");
        } else {
            headerFixed.classList.remove("is-fixed");
        }
    })

    /* =======MENU TAB==============*/
    const menuBtn = document.querySelectorAll(".menu-btn");
    const menuItem = document.querySelectorAll(".menu-item");
    const list = document.querySelector(".menu-container__list");
    const menuLink = document.querySelectorAll(".menu-link");

    /*Show All Food*/
    [...menuItem].forEach((item) => {
        item.classList.add("active-food");
    });

    /* show active-food*/
    [...menuBtn].forEach((item) =>
        item.addEventListener("click", function(e) {    
            [...menuBtn].forEach((item) => item.classList.remove("active"));
            e.target.classList.add("active");

            // lấy data food

            const tabNumber = e.currentTarget.dataset.food;
            [...menuItem].forEach((item) => {
                item.classList.remove("active-food");

                if (tabNumber === "1") {
                    item.classList.add("active-food");
                }

                if (item.getAttribute("data-food") === tabNumber) {
                    item.classList.add("active-food");
                }
            });
        })
    );

/* Create Alert function*/
    function sweetAlert(title) {
        const template = ` <div class="sweet-alert">
        <i class="fa fa-check sweet-icon"></i>
        <p class="sweet-text">${title}</p>
        </div>`;
        document.body.insertAdjacentHTML("beforeend", template);
    }
    
//** Scroll-top */
    const scrollTop = document.querySelector(".scroll-top");
    window.addEventListener("scroll",function(e){
        if(this.scrollY >= 500){
            scrollTop.classList.add("scroll-top__active");
        }
        else{
            scrollTop.classList.remove("scroll-top__active");
        }
    });

////** TOGGLE MENU */
    const toggleMenu = document.querySelector(".menu-toggle");
    const headerMenu = document.querySelector(".main-menu");
    const itemLink = document.querySelectorAll(".item-link");
    toggleMenu.addEventListener("click", function(e) {
        headerMenu.classList.toggle("is-show");
        toggleMenu.classList.toggle("fa-bars");
        toggleMenu.classList.toggle("fa-times");
    });

    [...itemLink].forEach((item) =>
        item.addEventListener("click",function(e){
            headerMenu.classList.remove("is-show");
            toggleMenu.classList.toggle("fa-bars");
            toggleMenu.classList.toggle("fa-times");
        })
    );

    window.addEventListener("click",function(e){
        if(!headerMenu.contains(e.target) && !e.target.matches(".menu-toggle")){
            headerMenu.classList.remove("is-show");
            toggleMenu.classList.add("fa-bars");
            toggleMenu.classList.remove("fa-times");
        }
    });

    /** Add Cart number */
    [...menuLink].forEach((item)=>{
        item.addEventListener("click",function(e){
            e.preventDefault();
        });
    });

    let carts = document.querySelectorAll(".menu-link");
    let product = [
        {
            name: "Barbecue salad",
            tag: "plate1",
            price: 22,
            inCarrt: 0,
        },
        {
            name: "Barbecue salad",
            tag: "plate2",
            price: 16,
            inCarrt: 0,
        },
        {
            name: "Barbecue salad",
            tag: "plate3",
            price: 14,
            inCarrt: 0,
        },
        {
            name: "Barbecue salad",
            tag: "plate1",
            price: 26,
            inCarrt: 0,
        },
        {
            name: "Barbecue salad",
            tag: "plate2",
            price: 15,
            inCarrt: 0,
        },
        {
            name: "Barbecue salad",
            tag: "plate1",
            price: 12,
            inCarrt: 0,
        },
        {
            name: "Barbecue salad",
            tag: "plate3",
            price: 32,
            inCarrt: 0,
        },
        {
            name: "Barbecue salad",
            tag: "plate2",
            price: 25,
            inCarrt: 0,
        },
    ];

    for(let i = 0; i < carts.length;i++){
        carts[i].addEventListener("click",function(){
            cartNumber(product[i]);
            totalCost(product[i]);
        })
    }

    function onLoadCartNumber(){
        let productNumber = localStorage.getItem("cartNumber");
        if(cartNumber){
            document.querySelector(".number").textContent = productNumber;
        }
    }

    function cartNumber(product){
        let productNumber = localStorage.getItem("cartNumber");
        productNumber = parseInt(productNumber);
        if(productNumber){
            localStorage.setItem("cartNumber",productNumber + 1);
            document.querySelector(".number").textContent = productNumber + 1;
        }
        else{
            localStorage.setItem("cartNumber",1);
            document.querySelector(".number").textContent = 1;
        }
        // Notice when you adding product //
        const alertCart = document.querySelector(".sweet-alert");
        if(alertCart){
            alertCart.parentNode.removeChild(alertCart);
        }
        if(alertCart){
            setTimeout(function(){
                sweetAlert("Add new 1 Cart")
            },0);
        }
        setItems(product);
    }

    function setItems(product){
        let cartItems = localStorage.getItem("productsIncart");
        cartItems = JSON.parse(cartItems);
        if(cartItems){
            if(cartItems[product.tag] == undefined){
                cartItems ={
                    ...cartItems,
                    [product.tag]:product,
                };
            }
            cartItems[product.tag].inCarrt += 1;
        }
        else{
            product.inCarrt = 1;
            cartItems = {
                [product.tag]: product,
            }
        }
        localStorage.setItem("productsIncart",JSON.stringify(cartItems));
    }

    function totalCost(product){
        let cartCost = localStorage.getItem("totalCost");
        console.log("My cartCost", cartCost);
        if(cartCost){
            cartCost = parseInt(cartCost);
            localStorage.setItem("totalCost", cartCost + product.price);
        }
        else{
            localStorage.setItem("totalCost", product.price);
        }
    }
    
    function displatCart() {
        let cartItems = localStorage.getItem("productsIncart");
        let cartCost = localStorage.getItem("totalCost");
        cartItems = JSON.parse(cartItems);
        let products = document.querySelector(".products");
        if (cartItems && products) {
            products.innerHTML = "";
            Object.values(cartItems).map((item) => {
                products.innerHTML += `
            <div class="todo">
                <div class="product">
                    <i class="fa fa-times-circle icon-times" aria-hidden="true"></i>
                    <img src="../Images1/${
                      item.tag
                    }.png" alt="" class="menu-image">
                    <span>${item.name}</span>
                </div>
                <div class="price">
                    $${item.price},00
                </div>
                <div class="quanlity">
                    ${item.inCarrt}
                </div>
                <div class="total">
                   $${item.inCarrt * item.price},00
                </div>
            </div>
        `;
            });

            products.innerHTML += `
            <div class = "basketTotalContainer">
                <h4 class = "backet-title">
                    Basket Total
                </h4>
                <h4 class= "basketTotal">
                    $${cartCost},00
                </h4>
            <div>
        `;
        }
    }
    onLoadCartNumber();
    displatCart();

    const productsRemove = document.querySelector(".products");
    let cartItemsK =
        localStorage.length > 0 ?
        JSON.parse(localStorage.getItem("productsIncart")) :
        [];

    if (Array.isArray(cartItemsK) && cartItemsK.length > 0) {
        [...cartItemsK].forEach((item) => todo(item.tag));
    }
    productsRemove.addEventListener("click", function(e) {
        if (e.target.matches(".icon-times")) {
            const productList = e.target.parentNode.parentNode;
            productList.parentNode.removeChild(productList);

            localStorage.removeItem("productsIncart");
            localStorage.removeItem("totalCost");
            localStorage.setItem("cartNumber",0);
        }
    });
});