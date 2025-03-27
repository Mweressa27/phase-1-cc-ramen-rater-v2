



const handleClick = (ramen) => {
  const ramenDetail = document.getElementById('ramen-detail');
  
  ramenDetail.querySelector('.detail-image').src = ramen.image;
  ramenDetail.querySelector('.name').textContent = ramen.name;
  ramenDetail.querySelector('.restaurant').textContent = ramen.restaurant;
  document.getElementById('rating-display').textContent = ramen.rating;
  document.getElementById('comment-display').textContent = ramen.comment;
};

const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('new-name').value;
    const restaurant = document.getElementById('new-restaurant').value;
    const image = document.getElementById('new-image').value;
    const rating = document.getElementById('new-rating').value;
    const comment = document.getElementById('new-comment').value;

    const newRamen = {
      name,
      restaurant,
      image,
      rating,
      comment,
    };

    const ramenMenu = document.getElementById('ramen-menu');
    
    const ramenImg = document.createElement('img');
    ramenImg.src = newRamen.image;
    ramenImg.alt = newRamen.name;
    ramenImg.addEventListener('click', () => handleClick(newRamen));
    
    ramenMenu.appendChild(ramenImg);

    form.reset();
  });
};

const displayRamens = () => {
    fetch('http://localhost:3000/ramens')
    .then((response) => response.json())
    .then((ramens) => {
      const ramenMenu = document.getElementById('ramen-menu');
      ramenMenu.innerHTML = '';

      ramens.forEach((ramen) => {
        const ramenImg = document.createElement('img');
        ramenImg.src = ramen.image;
        ramenImg.alt = ramen.name;
        ramenImg.dataset.id = ramen.id;

        ramenImg.addEventListener('click', () => handleClick(ramen));

        ramenMenu.appendChild(ramenImg);
      });

      if (ramens.length > 0) {
        handleClick(ramens[0]);
      }
    });
};

const main = () => {
    displayRamens();
  addSubmitListener();
}

main()


export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
