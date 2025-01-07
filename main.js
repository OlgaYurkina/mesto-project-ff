(()=>{"use strict";var e="",t="88b11ee7-a8a1-438d-9ad0-3ad46297d70f",r="https://nomoreparties.co/v1/".concat("wff-cohort-29","/");const n=e+"75438e944a43e4c0b404.svg",o=e+"49570bcb1d637fdb38e5.svg";function c(e,t){var r=e.name,c=e.link,u=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),i=u.querySelector(".card__image"),a=u.querySelector(".card__title"),l=u.querySelector(".card__delete-button"),s=u.querySelector(".card__like-button");return i.src=c,i.alt=r,a.textContent=r,s.style.backgroundImage="url(".concat(o,")"),s.addEventListener("click",(function(){return function(e){var t=e.classList.toggle("card__like-button_is-active");e.style.backgroundImage="url(".concat(t?n:o,")")}(s)})),l.addEventListener("click",(function(){return function(e){e.remove()}(u)})),i.addEventListener("click",(function(){return t(r,c)})),u}function u(e){e.classList.add("popup_is-opened"),e.classList.remove("popup_is-animated"),document.addEventListener("keydown",a)}function i(e){e.classList.add("popup_is-animated"),e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",a)}function a(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&i(t)}}function l(e,t,r){var n=e.closest(r.formSelector).querySelector("#".concat(e.id,"-error"));e.classList.add(r.inputErrorClass),n.textContent=t,n.classList.add(r.errorClass)}function s(e,t){e.validity.valid?function(e,t){var r=e.closest(t.formSelector).querySelector("#".concat(e.id,"-error"));e.classList.remove(t.inputErrorClass),r.classList.remove(t.errorClass),r.textContent=""}(e,t):l(e,e.validationMessage,t)}function d(e,t,r){var n=e.every((function(e){return e.validity.valid}));t.disabled=!n,t.classList.toggle(r.inactiveButtonClass,!n)}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}var f,m=document.querySelector(".places__list"),y=document.querySelector(".profile__add-button"),v=document.querySelector(".popup_type_new-card"),_=v.querySelector(".popup__close"),S=v.querySelector("form"),h=S.querySelector('input[name="place-name"]'),b=S.querySelector('input[name="link"]'),q=document.querySelector(".profile__edit-button"),E=document.querySelector(".popup_type_edit"),g=E.querySelector("form"),L=g.querySelector('input[name="name"]'),k=g.querySelector('input[name="description"]'),C=document.querySelector(".profile__title"),w=document.querySelector(".profile__description"),A=E.querySelector(".popup__close"),j=document.querySelector(".popup_type_image"),x=j.querySelector(".popup__image"),O=j.querySelector(".popup__caption"),z=j.querySelector(".popup__close");function I(e,t){x.src=t,x.alt=e,O.textContent=e,u(j)}y.addEventListener("click",(function(){return u(v)})),_.addEventListener("click",(function(){return i(v)})),q.addEventListener("click",(function(){L.value=C.textContent,k.value=w.textContent,u(E)})),A.addEventListener("click",(function(){return i(E)})),g.addEventListener("submit",(function(e){var n,o;e.preventDefault(),(n=L.value,o=k.value,fetch("".concat(r,"users/me"),{method:"PATCH",headers:{authorization:t,"Content-Type":"application/json"},body:JSON.stringify({name:n,about:o})}).then((function(e){if(!e.ok)throw new Error("Ошибка при обновлении данных пользователя");return e.json()})).catch((function(e){return console.error(e)}))).then((function(e){C.textContent=e.name,w.textContent=e.about,i(E)})).catch((function(e){return console.log("Ошибка при обновлении данных пользователя:",e)}))})),z.addEventListener("click",(function(){return i(j)})),document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("mousedown",(function(t){t.target===e&&i(e)}))})),f={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},Array.from(document.querySelectorAll(f.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){return e.preventDefault()}));var t=Array.from(e.querySelectorAll(f.inputSelector)),r=e.querySelector(f.submitButtonSelector);t.forEach((function(e){e.addEventListener("input",(function(){"place-name"===e.name||"name"===e.name?function(e,t){var r=e.value.trim(),n="Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы";r&&!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(r)?(e.setCustomValidity(n),l(e,n,t)):(e.setCustomValidity(""),s(e,t))}(e,f):s(e,f),d(t,r,f)}))})),d(t,r,f)})),S.addEventListener("submit",(function(e){var n;e.preventDefault(),(n={name:h.value,link:b.value},fetch("".concat(r,"cards"),{method:"POST",headers:{"Content-Type":"application/json",authorization:t},body:JSON.stringify(n)}).then((function(e){if(!e.ok)throw new Error("Ошибка при добавлении карточки");return e.json()})).catch((function(e){return console.error(e)}))).then((function(e){e.owner._id;var t=c(e,I);m.prepend(t),i(v),S.reset()})).catch((function(e){return console.log("Ошибка при добавлении карточки:",e)}))})),Promise.all([fetch("".concat(r,"users/me"),{headers:{authorization:t}}).then((function(e){if(!e.ok)throw new Error("Ошибка при получении данных пользователя");return e.json()})).catch((function(e){return console.error(e)})),fetch("".concat(r,"cards"),{headers:{authorization:t}}).then((function(e){if(!e.ok)throw new Error("Ошибка при получении карточек");return e.json()})).catch((function(e){return console.error(e)}))]).then((function(e){var t,r,n=(r=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,c,u,i=[],a=!0,l=!1;try{if(c=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;a=!1}else for(;!(a=(n=c.call(r)).done)&&(i.push(n.value),i.length!==t);a=!0);}catch(e){l=!0,o=e}finally{try{if(!a&&null!=r.return&&(u=r.return(),Object(u)!==u))return}finally{if(l)throw o}}return i}}(t,r)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?p(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=n[0],u=n[1];o._id,function(e){e.forEach((function(e){var t=c(e,I);m.append(t)}))}(u)})).catch((function(e){return console.log("Ошибка при загрузке данных:",e)}))})();