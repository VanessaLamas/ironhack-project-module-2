// setting the dogs api
// breedPetApi --> el id que le estoy dando 
const getBreedPetApi = breedPet => {
    axios
      .get(`https://api.api-ninjas.com/v1/dogs?name=${breedPet}`)
      .then(response => {
        console.log('Response from API is: ', response);
        const petDetail = response.data[0];
        console.log('a single pet detail: ', petDetail);
      })
      .catch(err => console.log(err));
  };  
    document.getElementById('get-pet-breed').addEventListener('click', () => {
      const userInput = document.getElementById('pet-breed-input').value;
      getCountryInfo(userInput);
  });
