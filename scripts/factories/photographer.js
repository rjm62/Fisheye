
function photographerFactory(data) {
    const {id, name, portrait, city, country, tagline, price} = data;

 const picture = `assets/photographers/${portrait}`;

   
    function getUserCardDOM() {

        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.style.borderRadius="50%";
        img.style.objectFit="cover"
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        var a = document.createElement("a");
        a.href = ref="photographer.html?"+id;
        a.style.textDecoration ="none";
        a.style.display ="flex";
        a.style.flexDirection ="column";
        a.style.alignItems = "center";
        a.style.justifyContent ="center";
        a.value = id;
        a.appendChild(img);
        a.appendChild(h2); 
        article.appendChild(a);
       
 
        const figcaption = document.createElement("figcation");
        figcaption.style.marginTop = "-30px"
        
        figcaption.style.textAlign="center";
        figcaption.style.paddingTop= "0";
        const pCityCountry = document.createElement('p');
        pCityCountry.textContent = city+", "+country;
        pCityCountry.style.color = "#d3573c"
        pCityCountry.style.margin = "0";
        const pTagline = document.createElement('p');
        pTagline.textContent = tagline;
        pTagline.style.margin = "0";
        const pPrice = document.createElement('p');
        pPrice.textContent = price +"€/jour"
        pPrice.style.color ="grey"
        pPrice.style.margin = "0";
        figcaption.appendChild(pCityCountry);
        figcaption.appendChild(pTagline); 
        figcaption.appendChild(pPrice);
        article.appendChild(figcaption);
       

        return (article); 
    }

    return { id,name, picture, city, country, tagline, price, getUserCardDOM}
}

