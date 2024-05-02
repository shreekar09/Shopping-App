
function openCategory(evt, categoryName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(categoryName).style.display = "block";
    evt.currentTarget.className += " active";


    fetchProducts(categoryName);
}


function fetchProducts(categoryName) {
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
    .then(response => response.json())
    .then(data => {
    
        const categoryData = data.categories.find(category => category.category_name.toLowerCase() === categoryName.toLowerCase());

    
        if (!categoryData) {
            console.error('Category data not found');
            return;
        }

        
        const container = document.getElementById(categoryName);
        container.innerHTML = '';


        categoryData.category_products.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('product-card');

            const image = document.createElement('img');
            image.src = product.image;
            card.appendChild(image);

            const badge = document.createElement('div');
            badge.classList.add('badge');
            if (product.badge_text) {
                badge.innerText = product.badge_text;
            }
            card.appendChild(badge);

            const title = document.createElement('div');
            title.classList.add('product-info');
            title.innerText = product.title;
            card.appendChild(title);

            const vendor = document.createElement('div');
            vendor.classList.add('product-info');
            vendor.innerText = `Vendor: ${product.vendor}`;
            card.appendChild(vendor);

            const price = document.createElement('div');
            price.classList.add('product-info');
            price.innerText = `Price: Rs ${product.price}`;
            card.appendChild(price);

            const comparePrice = document.createElement('div');
            comparePrice.classList.add('product-info');
            comparePrice.innerText = `Compare at price: Rs ${product.compare_at_price}`;
            card.appendChild(comparePrice);

            const discount = document.createElement('div');
            discount.classList.add('product-info');
            const discountPercent = Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100);
            discount.innerText = `${discountPercent}% Off`;
            card.appendChild(discount);

            const addButton = document.createElement('button');
            addButton.innerText = 'Add to Cart';
            addButton.classList.add('add-to-cart');
            card.appendChild(addButton);

            container.appendChild(card);
        });
    })
    .catch(error => console.error('Error fetching products:', error));
}


document.getElementsByClassName("tablinks")[0].click();
