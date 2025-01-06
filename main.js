(()=>{"use strict";var e="";const t=e+"75438e944a43e4c0b404.svg",n=e+"49570bcb1d637fdb38e5.svg";function r(e,r){var o=e.name,c=e.link,u=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),p=u.querySelector(".card__image"),a=u.querySelector(".card__title"),i=u.querySelector(".card__delete-button"),d=u.querySelector(".card__like-button");return p.src=c,p.alt=o,a.textContent=o,d.style.backgroundImage="url(".concat(n,")"),d.addEventListener("click",(function(){return function(e){var r=e.classList.toggle("card__like-button_is-active");e.style.backgroundImage="url(".concat(r?t:n,")")}(d)})),i.addEventListener("click",(function(){return function(e){e.remove()}(u)})),p.addEventListener("click",(function(){return r(o,c)})),u}function o(e){e.classList.add("popup_is-opened"),e.classList.remove("popup_is-animated"),document.addEventListener("keydown",u)}function c(e){e.classList.add("popup_is-animated"),e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",u)}function u(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&c(t)}}var p=document.querySelector(".places__list"),a=document.querySelector(".profile__add-button"),i=document.querySelector(".popup_type_new-card"),d=i.querySelector(".popup__close"),l=i.querySelector("form"),s=l.querySelector('input[name="place-name"]'),_=l.querySelector('input[name="link"]'),m=document.querySelector(".profile__edit-button"),y=document.querySelector(".popup_type_edit"),v=y.querySelector("form"),f=v.querySelector('input[name="name"]'),q=v.querySelector('input[name="description"]'),g=document.querySelector(".profile__title"),S=document.querySelector(".profile__description"),k=y.querySelector(".popup__close"),L=document.querySelector(".popup_type_image"),h=L.querySelector(".popup__image"),b=L.querySelector(".popup__caption"),x=L.querySelector(".popup__close");function E(e,t,n){var r=e.value.trim(),o="";return n.required&&!r?o="Это поле обязательно для заполнения.":n.minLength&&r.length<n.minLength?o="Минимальная длина — ".concat(n.minLength," символа."):n.maxLength&&r.length>n.maxLength?o="Максимальная длина — ".concat(n.maxLength," символов."):n.pattern&&!n.pattern.test(r)&&(o="Неверный формат данных."),t.textContent=o,e.classList.toggle("popup__input_type_error",!!o),!o}function C(){var e=E(f,v.querySelector(".popup__input-error_type_name"),{required:!0,minLength:2,maxLength:40,pattern:/^[a-zA-Zа-яА-ЯёЁ\s-]+$/}),t=E(q,v.querySelector(".popup__input-error_type_description"),{required:!0,minLength:2,maxLength:200,pattern:/^[a-zA-Zа-яА-ЯёЁ\s-]+$/});v.querySelector(".popup__button").disabled=!(e&&t)}function j(e,t){h.src=t,h.alt=e,b.textContent=e,o(L)}l.addEventListener("submit",(function(e){e.preventDefault();var t=r({name:s.value,link:_.value},j);p.prepend(t),c(i),l.reset()})),a.addEventListener("click",(function(){return o(i)})),d.addEventListener("click",(function(){return c(i)})),m.addEventListener("click",(function(){var e;f.value=g.textContent,q.value=S.textContent,(e=v).querySelectorAll(".popup__input-error").forEach((function(e){e.textContent=""})),e.querySelectorAll(".popup__input").forEach((function(e){e.classList.remove("popup__input_type_error")})),e.querySelector(".popup__button").disabled=!1,C(),o(y)})),k.addEventListener("click",(function(){return c(y)})),v.addEventListener("submit",(function(e){e.preventDefault(),g.textContent=f.value,S.textContent=q.value,c(y)})),v.addEventListener("input",C),x.addEventListener("click",(function(){return c(L)})),document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("mousedown",(function(t){t.target===e&&c(e)}))})),[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){var t=r(e,j);p.append(t)}))})();