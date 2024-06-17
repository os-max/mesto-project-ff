(()=>{"use strict";var e=document.querySelector("#card-template").content;function t(e){e.currentTarget.querySelector(".popup__content").contains(e.target)||o(e.target)}function n(e){"Escape"===e.key&&o(document.querySelector(".popup_is-opened"))}function r(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n),e.addEventListener("click",t)}function o(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n),e.removeEventListener("click",t)}function c(e,t){e.classList.add(t.inactiveButtonClass),e.disabled=!0}function a(e,t,n){var r=e.querySelector(".".concat(t.id,"_error"));t.classList.remove(n.inputErrorClass),r.textContent=""}function i(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(n){return a(e,n,t)})),c(e.querySelector(t.submitButtonSelector),t)}var u={baseUrl:"https://nomoreparties.co/v1/wff-cohort-16/",headers:{authorization:"d59d3d9d-a030-463c-bab7-37a80825e20e","Content-Type":"application/json"}};function l(e){return e.ok?e.json():Promise.reject(e.status)}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var d="",p=document.querySelector(".places__list"),f=document.querySelector(".profile__edit-button"),m=document.querySelector(".popup_type_edit"),v=document.querySelector(".profile__add-button"),_=document.querySelector(".popup_type_new-card"),h=document.querySelectorAll(".popup__close"),y=document.querySelector(".profile__title"),b=document.querySelector(".profile__description"),S=document.querySelector(".profile__image"),C=document.forms["edit-profile"],k=C.name,g=C.description,E=C.querySelector(".popup__button"),q=document.forms["new-place"],L=q["place-name"],x=q.link,A=q.querySelector(".popup__button"),T=document.querySelector(".popup_type_image"),U=T.querySelector(".popup__image"),w=T.querySelector(".popup__caption"),D=document.querySelector(".popup_type_avatar"),j=document.forms["change-avatar"],O=j.avatar,B=j.querySelector(".popup__button"),P=document.querySelector(".popup_type_confirm"),I=P.querySelector(".popup__button"),M={handleDelete:function(e,t,n){n(t,e.target.closest(".card"))},handleLike:function(e,t,n,r,o,c){t.classList.contains("card__like-button_is-active")?c(r).then((function(e){t.classList.remove("card__like-button_is-active"),n.textContent=e.likes.length})).catch((function(e){return console.log("Ошибка при попытке дизлайка карточки: ".concat(e))})):o(r).then((function(e){t.classList.add("card__like-button_is-active"),n.textContent=e.likes.length})).catch((function(e){return console.log("Ошибка при попытке лайка карточки: ".concat(e))}))},handleImageClick:function(e,t){U.src=e,U.alt=t,w.textContent=t,r(T)},likeCard:function(e){return fetch("".concat(u.baseUrl,"cards/likes/").concat(e),{method:"PUT",headers:u.headers}).then(l)},dislikeCard:function(e){return fetch("".concat(u.baseUrl,"cards/likes/").concat(e),{method:"DELETE",headers:u.headers}).then(l)},setupCardDelete:function(e,t){r(P),J=e,G=t}},N={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup_input_error"},J=void 0,G=void 0;function H(t,n,r){var o=function(t,n,r){var o=t.owner._id===r,c=t.likes.some((function(e){return e._id===r})),a=e.cloneNode(!0);a.querySelector(".card__title").textContent=t.name;var i=a.querySelector(".card__image");i.src=t.link,i.alt=t.name,i.addEventListener("click",(function(){n.handleImageClick(i.src,i.alt)}));var u=a.querySelector(".card__delete-button");o?u.addEventListener("click",(function(e){n.handleDelete(e,t._id,n.setupCardDelete)})):u.remove();var l=a.querySelector(".card__like-button"),s=a.querySelector(".card__like-counter");return c?l.classList.add("card__like-button_is-active"):l.classList.remove("card__like-button_is-active"),s.textContent=t.likes.length,l.addEventListener("click",(function(e){n.handleLike(e,l,s,t._id,n.likeCard,n.dislikeCard)})),a}(r,M,d);"start"===n?t.prepend(o):t.append(o)}f.addEventListener("click",(function(){k.value=y.textContent,g.value=b.textContent,r(m),i(m,N)})),v.addEventListener("click",(function(){return r(_)})),S.addEventListener("click",(function(){return r(D)})),h.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){return o(t)}))})),C.addEventListener("submit",(function(e){var t,n;e.preventDefault(),E.textContent="Сохранение...",(t=k.value,n=g.value,fetch("".concat(u.baseUrl,"users/me"),{method:"PATCH",headers:u.headers,body:JSON.stringify({name:"".concat(t),about:"".concat(n)})}).then(l)).then((function(e){y.textContent=k.value,b.textContent=g.value,o(m)})).catch((function(e){console.log("Ошибка при отправке данных о пользователе: ".concat(e))})).finally((function(){return E.textContent="Сохранить"}))})),q.addEventListener("submit",(function(e){e.preventDefault();var t=L.value,n=x.value;A.textContent="Сохранение...",function(e,t){return fetch("".concat(u.baseUrl,"cards"),{method:"POST",headers:u.headers,body:JSON.stringify({name:"".concat(e),link:"".concat(t)})}).then(l)}(t,n).then((function(e){H(p,"start",e),q.reset(),o(_),i(_,N)})).catch((function(e){console.log("Ошибка при отправке карточки: ".concat(e))})).finally((function(){return A.textContent="Сохранить"}))})),j.addEventListener("submit",(function(e){var t;e.preventDefault(),B.textContent="Сохранение...",(t=O.value,fetch("".concat(u.baseUrl,"users/me/avatar"),{method:"PATCH",headers:u.headers,body:JSON.stringify({avatar:"".concat(t)})}).then(l)).then((function(e){S.setAttribute("style","background-image: url(".concat(O.value,");")),o(D),j.reset(),i(j,N)})).catch((function(e){console.log("Ошибка при изменении аватара: ".concat(e))})).finally((function(){return B.textContent="Сохранить"}))})),P.addEventListener("submit",(function(e){var t;e.preventDefault(),I.textContent="Удаление...",(t=J,fetch("".concat(u.baseUrl,"cards/").concat(t),{method:"DELETE",headers:u.headers}).then(l)).then((function(e){G.remove(),o(P)})).catch((function(e){console.log("Не удалось удалить карточку, ошибка: ".concat(e))})).finally((function(){return I.textContent="Да"}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector));n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?a(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"_error"));t.classList.add(r.inputErrorClass),o.textContent=n}(e,t,t.validationMessage,n)}(e,r,t),function(e,t,n){var r=e.querySelector(n.submitButtonSelector);!function(e){return e.some((function(e){return!e.validity.valid}))}(t)?(r.classList.remove(n.inactiveButtonClass),r.disabled=!1):c(r,n)}(e,n,t)}))}))}(t,e)}))}(N),Promise.all([fetch("".concat(u.baseUrl,"users/me"),{method:"GET",headers:u.headers}).then(l),fetch("".concat(u.baseUrl,"cards"),{method:"GET",headers:u.headers}).then(l)]).then((function(e){var t,n,r,o,c,a=(c=2,function(e){if(Array.isArray(e))return e}(o=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(o,c)||function(e,t){if(e){if("string"==typeof e)return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(e,t):void 0}}(o,c)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=a[0],u=a[1];d=i._id,t=i.name,n=i.about,r=i.avatar,y.textContent=t,b.textContent=n,S.setAttribute("style","background-image: url(".concat(r,");")),function(e){e.forEach((function(e){H(p,"end",e)}))}(u)})).catch((function(e){return console.log("Ошибка при загрузке данных пользователя/карточек: ".concat(e))}))})();