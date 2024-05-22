(()=>{"use strict";var e=document.querySelector("#card-template").content,t={handleDelete:function(e){e.target.closest(".card").remove()},handleLike:function(e){e.target.classList.toggle("card__like-button_is-active")}};function n(t,n){var r=e.cloneNode(!0);r.querySelector(".card__title").textContent=t.name;var o=r.querySelector(".card__image");return o.src=t.link,o.alt=t.name,r.querySelector(".card__delete-button").addEventListener("click",n.handleDelete),r.querySelector(".card__like-button").addEventListener("click",n.handleLike),r}function r(e,r,o){"start"===r?e.prepend(n(o,t)):e.append(n(o,t))}function o(e){d(e.target)}function c(e){"Escape"===e.key&&d(document.querySelector(".popup_is-opened"))}function a(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",c),e.addEventListener("click",o)}function d(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",c),e.removeEventListener("click",o)}var l=document.querySelector(".places__list"),i=document.querySelector(".profile__edit-button"),p=document.querySelector(".popup_type_edit"),s=document.querySelector(".profile__add-button"),u=document.querySelector(".popup_type_new-card"),m=document.querySelectorAll(".popup__close"),_=document.querySelector(".profile__title"),v=document.querySelector(".profile__description"),f=document.forms["edit-profile"],y=f.name,k=f.description,g=document.forms["new-place"],q=g["place-name"],S=g.link,L=document.querySelector(".popup_type_image"),h=L.querySelector(".popup__image"),E=L.querySelector(".popup__caption");function x(e){h.src=e.target.src,h.alt=e.target.alt,E.textContent=e.target.alt,a(L)}i.addEventListener("click",(function(){y.value=_.textContent,k.value=v.textContent,a(p)})),s.addEventListener("click",(function(){return a(u)})),m.forEach((function(e){e.addEventListener("click",(function(e){return d(e.target.closest(".popup"))}))})),f.addEventListener("submit",(function(e){e.preventDefault(),_.textContent=y.value,v.textContent=k.value,d(e.target.closest(".popup"))})),g.addEventListener("submit",(function(e){e.preventDefault();var t=q.value,n=S.value;r(l,"start",{name:t,link:n}),d(e.target.closest(".popup")),g.reset(),document.querySelector(".card__image").addEventListener("click",x)})),[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){r(l,"end",e)})),document.querySelectorAll(".card__image").forEach((function(e){return e.addEventListener("click",x)}))})();