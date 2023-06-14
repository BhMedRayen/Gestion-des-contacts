afficher();
addContact();
function addContact()
{
let NVContact = [];
let id=0;
document.getElementById('ContactForm').addEventListener("submit", function(event) {
  event.preventDefault();
  let nom = document.getElementsByName('nom')[0].value;
  let prenom = document.getElementsByName('prenom')[0].value;
  let mail = document.getElementsByName('mail')[0].value;
  let cin = document.getElementsByName('cin')[0].value;
  let genre = document.getElementsByName('genre');
  let g = "";   
  for (let i = 0; i < genre.length; i++) {
    if (genre[i].checked) {
      g = genre[i].value;
    }
  }
  let ContactStockee = localStorage.getItem('contact');
  let TableauContactStocke = JSON.parse(ContactStockee) || [];
  while(existe(id))
  {
    id+=1;
  }

  let NVContact = {
        ID :id,
        nom: nom,
        prenom: prenom,
        mail: mail,
        cin: cin,
        genre: g,
      };

  TableauContactStocke.push(NVContact);
  let CNCT = JSON.stringify(TableauContactStocke);
  localStorage.setItem("contact", CNCT);
  afficher();
  let alert=document.getElementById('alert');
  alert.classList.remove("alerte");
  alert.innerHTML=`<div class="alert alert-success" role="alert">
  Ajout avec succes
</div>`;
resetForm();
});
}
function resetForm()
{
    document.getElementById('ContactForm').reset();
}
function afficher ()
{
    if(typeof localStorage != undefined)
    {
        let ContactString = localStorage.getItem('contact');
        let TBContact = JSON.parse(ContactString);
        let card=document.getElementById("card");
        card.innerHTML = '';
        if(TBContact && TBContact.length>0)
        {
            for(let contact of TBContact)
             {
                  card.innerHTML+=`
                                    <div class="col">
                                        <div class="card mb-4" style="width: 18rem;">
                                            <div class="card-body">
                                                <h5 class="card-title">Contact</h5>
                                                <h6>Nom</h6>
                                                <p>${contact.nom}</p>
                                                <h6>Prenom</h6>
                                                <p>${contact.prenom}</p>
                                                <h6>Email</h6>
                                                <p>${contact.mail}</p>
                                                <h6>NumCin</h6>
                                                <p>${contact.cin}</p>
                                                <h6>Genre</h6>
                                                <p>${contact.genre}</p>
                                                <button type="submit" class="btn btn-warning m-2"onclick="update(${contact.ID})">Modifier</button>
                                                <button type="reset" class="btn btn-danger m-2"  onclick="deleteContact(${contact.ID})">Supprimer</button>
                                            </div>
                                            </div>`
             }
        }
        
    }
}
function deleteContact(ContactId)
{
  Swal.fire({
    title: 'Confirmation',
    text: 'Êtes-vous sûr de vouloir supprimer ce contact ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler'}).then( (result)=> {if(result.isConfirmed)
       {
        let ContactString=localStorage.getItem('contact');
        let TBContact=JSON.parse(ContactString);
        let i=-1;
        for(let contact of TBContact)
        {
            i+=1;
            let id=parseInt(contact.ID);
            if(ContactId==id)
             {
                TBContact.splice(i,1)
                 let con=JSON.stringify(TBContact);
                localStorage.setItem('contact',con);
             }
             Swal.fire('Supprimé', 'L\'élément a été supprimé avec succès.', 'success');
             afficher();
        }
    }})  
}
function existe(id) {
    let ContactString = localStorage.getItem('contact');
    let TBContact = JSON.parse(ContactString);
    if (Array.isArray(TBContact)) {
      for (let contact of TBContact) {
        if (contact.ID == id) {
          return true;
        }
      }
    }
    return false;
  }

function verifNom() {
    let nom =document.getElementsByName('nom')[0].value;
    for (let i = 0; i < nom.length; i++) {
        let majus = nom[i].toUpperCase();
        let charCode = majus.charCodeAt(0);
        if (charCode < 65 || charCode > 90 || charCode !== 32) {
            return false; 
        }
    }
    return true; 
 }
 
 function update(id)
 {    let ContactString=localStorage.getItem('contact');
      let TBContact=JSON.parse(ContactString)
      if(Array.isArray(TBContact))
      {
        for(let contact of TBContact)
        {
          if(contact.ID==id)
          {
            nom=contact.nom;
            prenom=contact.prenom;
            mail=contact.mail;
            cin=contact.cin;
            genre=contact.genre;
            let div=document.getElementById('update');
            div.style.display='flex';
            div.style.left="25";
            let card=document.getElementById('card');
            let col=document.getElementById('col');
            col.style.display='none';
            card.style.display='none';
            div.innerHTML=`<div class="shadow-none p-3 mb-5 bg-body-tertiary rounded">
            <form id="ContactForm">
              <div class="alerte" id="alert"></div>
                <div class="mb-3">
                    <label for="exampleInputName" class="form-label" >Nom</label>
                    <input type="text" name="nom" class="form-control" id="nom" aria-describedby="nameHelp" required> 
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputName" class="form-label">Prenom</label>
                    <input type="text" name="prenom"  class="form-control" id="Prenom" aria-describedby="nameHelp" required>
                  </div>
      
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Email address</label>
                  <input type="email" name="mail" class="form-control" id="mail" aria-describedby="emailHelp" required>
                  <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
              
                <div class="mb-3">
                    <label for="exampleInputName"  class="form-label">NumCin</label>
                    <input type="number" class="form-control" name="cin" id="cin" aria-describedby="nameHelp" required>
                  </div>
                  <div class="genre">
                  <label for="Genre" class="form-label">Genre</label>
                  <div>
                    <input class="form-check-input"  type="radio" name="genree" value="homme" id="homme" required>
                    <label class="form-check-label ml-4" for="flexRadioDefault1">
                      Homme
                    </label>
                  </div>
                  <div class="">
                    <input class="form-check-input" type="radio" name="genree" value="femme" id="femme" checked required>
                    <label class="form-check-label ml-4" for="flexRadioDefault2">
                      Femme
                    </label>
                  </div>
                  </div>
                  <br>
                  <div class="butto">
                <button type="submit" class="btn btn-success m-2" id="confirm">Confirmer le mise à jour</button>
                <button type="reset" class="btn btn-danger m-2" id="annuler" >Annuler</button>
                </div>
              </form>
            </div>`
          } 
          document.getElementsByName('nom')[0].value=nom;
          document.getElementsByName('prenom')[0].value=prenom;
          document.getElementsByName('mail')[0].value=mail;
          document.getElementsByName('cin')[0].value=cin;
          if(genre=="femme")
          {
             document.getElementsByName('genree')[1].checked=true
            
          }
          else 
          {
            document.getElementsByName('genree')[0].checked=true;
          }
          document.getElementById('confirm').addEventListener('click',function(event) {
            event.preventDefault();
          let nvnom=document.getElementsByName('nom')[0].value;
          let nvprenom=document.getElementsByName('prenom')[0].value;
          let nvmail=document.getElementsByName('mail')[0].value;
          let nvcin=document.getElementsByName('cin')[0].value;
          function retgenre()
          {
            let genre = document.getElementsByName('genree');
            for (let i = 0; i < genre.length; i++) {
              if (genre[i].checked) {
                     
                    return genre[i].value;
                   
              }
            }
          }
            let contacts=localStorage.getItem('contact');
            let TBContact=JSON.parse(contacts)
            for(let contact of TBContact)
            {
              if(contact.ID==id)
              {
                contact.nom=nvnom;
                contact.prenom=nvprenom;
                contact.mail=nvmail;
                contact.cin=nvcin;
                contact.genre=retgenre(); 
              }

            }
            let NVContact=JSON.stringify(TBContact)
            localStorage.setItem('contact',NVContact);
            let card=document.getElementById('card');
            let col=document.getElementById('col');
            let div=document.getElementById('update');
            div.style.display=null;
            col.style.display=null;
            card.style.display=null;
            swal.fire("Modification avec succes") ;        
          })
      
            document.getElementById('annuler').addEventListener('click',function() {
            let card=document.getElementById('card');
            let col=document.getElementById('col');
            let div=document.getElementById('update');
            div.style.display=null;
            col.style.display=null;
            card.style.display=null;
          })

        }
      }
     
 }
